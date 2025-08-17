// supabase/functions/sms-fallback/index.ts
// Deno + Supabase Edge Function (TypeScript)

type FallbackRequest = {
  messageId: string;
  recipientDeviceNames: string[];    // DEVICE-NAMES, nicht Tokens
  smsText: string;
  waitSec?: number;                  // default 15
  rtdbBase: string;                  // z.B. https://<db>.europe-west1.firebasedatabase.app
  rolesPath?: string;                // default 'roles'
  recipientsPath?: string;           // default 'notifications'
  idempotencyFlag?: string;          // default 'smsTriggered'
  rtdbAuth?: string;                 // optional: ?auth=...
};

type TelRole = {
  allowSmsFallback?: boolean;
  tel?: string;
};

const DEFAULTS = {
  waitSec: 15,
  rolesPath: 'roles',
  recipientsPath: 'notifications',
  idempotencyFlag: 'smsTriggered',
};

// ---- Utilities -------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const sanitizeKey = (s: string) =>
  s.replace(/[.#$/\[\]]/g, '_'); // RTDB verbotene Zeichen

const isValidE164 = (s?: string | null) => !!s && /^\+[1-9]\d{6,14}$/.test(s);

const unique = <T,>(arr: T[]) => [...new Set(arr)];

function withAuth(url: string, auth?: string) {
  if (!auth) return url;
  const u = new URL(url);
  u.searchParams.set('auth', auth);
  return u.toString();
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as T;
}

// ---- Firebase RTDB helpers (Idempotenz via ETag) --------------------------
// ETag-Doku: https://firebase.google.com/docs/reference/rest/database
// Blogpost: https://firebase.blog/posts/2017/07/introducing-conditional-rest-requests

async function getWithEtag<T>(url: string, auth?: string): Promise<{ value: T | null; etag: string | null }> {
  const res = await fetch(withAuth(url, auth), {
    headers: { 'X-Firebase-ETag': 'true', 'Cache-Control': 'no-store' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} (GET ETag)`);
  const etag = res.headers.get('ETag');
  const txt = await res.text();
  const value = txt ? (JSON.parse(txt) as T) : null;
  return { value, etag };
}

async function conditionalPut(url: string, body: unknown, etag: string, auth?: string) {
  const res = await fetch(withAuth(url, auth), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'If-Match': etag, // nur schreiben, wenn unverändert
    },
    body: JSON.stringify(body),
  });
  return res;
}

// ---- SMS provider (TextBee – Platzhalter; passt du an deine API an) ------

async function sendSmsViaTextBee(numbers: string[], text: string) {
  const apiBase = 'https://api.textbee.dev/api/v1';
  const apiKey = Deno.env.get('TEXTBEE_API_KEY') ?? '';
  if (!apiBase || !apiKey) throw new Error('TEXTBEE_API_BASE/TEXTBEE_API_KEY fehlen');

  const res = await fetch(`${apiBase.replace(/\/$/, '')}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ to: numbers, text }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`TextBee HTTP ${res.status}: ${msg}`);
  }
  return res.json().catch(() => ({}));
}

// ---- Security: Shared secret zwischen Funktionen/Client (optional, empfohlen)

function requireSecret(req: Request) {
  const want = Deno.env.get('SMS_FALLBACK_SECRET');
  if (!want) return; // nicht konfiguriert -> kein Check
  const got =
    req.headers.get('x-sms-secret') ||
    new URL(req.url).searchParams.get('secret') ||
    '';
  if (got !== want) throw new Response('Unauthorized', { status: 401 });
}

// ---- Handler --------------------------------------------------------------

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    requireSecret(req);

    const payload = (await req.json()) as FallbackRequest;

    const {
      messageId,
      recipientDeviceNames,
      smsText,
      waitSec = DEFAULTS.waitSec,
      rtdbBase,
      rolesPath = DEFAULTS.rolesPath,
      recipientsPath = DEFAULTS.recipientsPath,
      idempotencyFlag = DEFAULTS.idempotencyFlag,
      rtdbAuth,
    } = payload;

    if (!messageId || !Array.isArray(recipientDeviceNames) || !recipientDeviceNames.length) {
      return Response.json({ ok: false, error: 'Missing messageId or recipientDeviceNames' }, { status: 400 });
    }
    if (!rtdbBase || !smsText) {
      return Response.json({ ok: false, error: 'Missing rtdbBase or smsText' }, { status: 400 });
    }

    // 1) Serverseitig warten
    await sleep(Math.max(0, waitSec) * 1000);

    // 2) Idempotenz prüfen (frisch, nach dem Delay)
    const idemPath = `${rtdbBase}/${recipientsPath}/${messageId}/${idempotencyFlag}.json`;
    const { value: alreadyTriggered, etag: idemEtag } = await getWithEtag<boolean>(idemPath, rtdbAuth);
    if (alreadyTriggered === true) {
      return Response.json({ ok: true, skipped: 'already_triggered' });
    }

    // 3) Recipients laden und offene Device-Namen bestimmen
    const recipientsUrl = `${rtdbBase}/${recipientsPath}/${messageId}/recipients.json`;
    const recMap = (await getJson<Record<string, unknown> | null>(withAuth(recipientsUrl, rtdbAuth), {
      headers: { 'Cache-Control': 'no-store' },
    })) || {};

    const pendingDevices = recipientDeviceNames.filter((dn) => !recMap?.[sanitizeKey(dn)]);
    if (pendingDevices.length === 0) {
      return Response.json({ ok: true, skipped: 'all_delivered' });
    }

    // 4) Telefonnummern aus roles/<deviceName> holen
    const telPromises = pendingDevices.map(async (dn) => {
      const roleUrl = `${rtdbBase}/${rolesPath}/${encodeURIComponent(dn)}.json`;
      try {
        const data = (await getJson<TelRole | null>(withAuth(roleUrl, rtdbAuth), {
          headers: { 'Cache-Control': 'no-store' },
        })) || {};
        return data.allowSmsFallback && isValidE164(data.tel) ? data.tel! : null;
      } catch {
        return null;
      }
    });

    const tels = unique((await Promise.all(telPromises)).filter((x): x is string => !!x));
    if (tels.length === 0) {
      return Response.json({ ok: true, skipped: 'no_tel_or_consent' });
    }

    // 5) Idempotenz-Flag atomar setzen (Compare-And-Set per ETag)
    //    Falls jemand anderes in der Zwischenzeit gesetzt hat -> 412, dann abbrechen
    //    (Doku: ETag/If-Match konditionelle Writes)  // see citations in the answer text
    const etagToUse = idemEtag ?? '*'; // wenn Knoten noch nie existierte, liefert RTDB ein ETag; '*' akzeptiert nur, wenn existiert. Sicherer: hole vor dem PUT noch einmal ETag:
    const fresh = await getWithEtag<boolean>(idemPath, rtdbAuth);
    if (fresh.value === true) {
      return Response.json({ ok: true, skipped: 'already_triggered' });
    }
    const putRes = await conditionalPut(idemPath, true, fresh.etag ?? '', rtdbAuth);
    if (putRes.status === 412) {
      // Lost the race
      return Response.json({ ok: true, skipped: 'lost_race' });
    }
    if (!putRes.ok) {
      const msg = await putRes.text().catch(() => '');
      return Response.json({ ok: false, error: `Failed to set idempotency: ${putRes.status} ${msg}` }, { status: 500 });
    }

    // 6) SMS senden
    await sendSmsViaTextBee(tels, smsText);

    // (Optional) kleines Log zurückschreiben
    const logUrl = `${rtdbBase}/${recipientsPath}/${messageId}.json`;
    await fetch(withAuth(logUrl, rtdbAuth), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        smsCount: tels.length,
        smsAt: Date.now(),
      }),
    }).catch(() => { /* best effort */ });

    return Response.json({ ok: true, sent: tels.length, pendingDevices });
  } catch (err) {
    if (err instanceof Response) return err;
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
});
