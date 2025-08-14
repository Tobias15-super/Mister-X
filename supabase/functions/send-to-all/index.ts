// supabase/functions/send-to-all/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SignJWT, importPKCS8 } from "https://deno.land/x/jose@v4.13.1/index.ts";

// 🔐 Service Account aus Umgebungsvariablen laden
const SERVICE_ACCOUNT = {
  client_email: Deno.env.get("CLIENT_EMAIL")!,
  private_key: Deno.env.get("PRIVATE_KEY")!,
  project_id: Deno.env.get("PROJECT_ID")!,
};

// 🔐 Supabase-Zugangsdaten
const supabaseUrl = Deno.env.get("PROJECT_URL")!;
const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY")!;

// 🔧 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tobias15-super.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 🔧 RTDB-Basis-URL (außerhalb des Handlers, damit Helper darauf zugreifen können)
const rtdbBase =
  "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";

// 🔑 Access Token für FCM holen
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: SERVICE_ACCOUNT.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  // Wichtig: \n im Private Key ersetzen
  const rawKey = SERVICE_ACCOUNT.private_key.replace(/\\n/g, "\n");
  const pkcs8 = await importPKCS8(rawKey, "RS256");
  const jwt = await new SignJWT(payload).setProtectedHeader({ alg: "RS256" }).sign(pkcs8);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`FCM token error: ${res.status} ${JSON.stringify(data)}`);
  return data.access_token as string;
}

// Hilfsfunktion: ungültige Firebase-Keys entschärfen
function sanitizeKey(key: string) {
  // Verboten in Firebase RTDB: . # $ [ ] /
  return key.replace(/[.#$/\[\]\/]/g, "_");
}

// 🧹 Cleanup: Alle /notifications älter als 5 Minuten löschen
async function cleanupOldNotifications(maxAgeMs = 5 * 60 * 1000) {
  const cutoff = Date.now() - maxAgeMs;

  // RTDB-REST-Query: orderBy="timestamp"&endAt=<cutoff>
  // Achtung: "timestamp" muss URL-quoted in Anführungszeichen stehen.
  const listUrl =
    `${rtdbBase}/notifications.json?orderBy=${encodeURIComponent('"timestamp"')}&endAt=${cutoff}`;
  const res = await fetch(listUrl, { method: "GET" });

  if (!res.ok) {
    const txt = await res.text();
    console.warn("Cleanup list failed:", txt);
    return { deleted: 0, details: "list_failed" as const };
  }

  const oldItems = await res.json() as Record<string, { timestamp?: number }>|null;

  if (!oldItems || typeof oldItems !== "object") {
    return { deleted: 0, details: "nothing_to_delete" as const };
  }

  const deletions: Record<string, null> = {};
  for (const id of Object.keys(oldItems)) {
    deletions[id] = null; // PATCH mit null => löschen
  }

  const toDelete = Object.keys(deletions).length;
  if (toDelete === 0) {
    return { deleted: 0, details: "empty" as const };
  }

  const patchRes = await fetch(`${rtdbBase}/notifications.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deletions),
  });

  if (!patchRes.ok) {
    const txt = await patchRes.text();
    console.warn("Cleanup delete failed:", txt);
    return { deleted: 0, details: "delete_failed" as const };
  }

  return { deleted: toDelete, details: "ok" as const };
}

// (Optional) kleiner Helper um Cleanup nicht länger als X ms zu blockieren
function withTimeout<T>(p: Promise<T>, ms: number, onTimeout?: () => void): Promise<void> {
  return new Promise<void>((resolve) => {
    const t = setTimeout(() => {
      try { onTimeout?.(); } catch {}
      resolve(); // Zeit abgelaufen => nicht warten
    }, ms);
    p.then(() => { clearTimeout(t); resolve(); })
     .catch(() => { clearTimeout(t); resolve(); });
  });
}

// ===== Modulweite Utilities & Cache (persistiert über "warme" Edge-Invocations) =====
let cachedToken: { token: string; exp: number } | null = null;

async function getAccessTokenCached() {
  const now = Date.now();
  if (cachedToken && now < cachedToken.exp) return cachedToken.token;
  const token = await getAccessToken();               // <- dein vorhandener Flow
  cachedToken = { token, exp: now + 55 * 60 * 1000 }; // ~55 Min Cache
  return token;
}

// Utility: Name-Mapping für eine gegebene Tokenliste aus Supabase holen
// Holt device_name für eine gegebene Tokenliste – robust mit IN-Filter
async function fetchNamesForTokens(tokenList: string[]) {
  if (tokenList.length === 0) return {} as Record<string, string>;

  // Strings für IN() korrekt quoten und encoden
  const quoted = tokenList
    .map(t => `"${String(t).replace(/"/g, '""')}"`) // Quotes escapen
    .join(',');

  // Wert IN(...) als Ganzes URL-encoden (ohne "token=in.")
  const inValues = encodeURIComponent(quoted);

  const url = `${supabaseUrl}/rest/v1/fcm_tokens`
            + `?select=token,device_name`
            + `&token=in.(${inValues})`;

  const res = await fetch(url, { headers: { apikey: supabaseKey } });
  if (!res.ok) {
    throw new Error(`Supabase name fetch failed: ${res.status} ${await res.text()}`);
  }

  const rows = await res.json() as Array<{ token: string; device_name: string | null }>;
  const map: Record<string, string> = {};
  for (const r of rows) {
    if (r.token && r.device_name) map[r.token] = r.device_name;
  }
  return map;
}



async function withBackoff<T>(fn: () => Promise<T>, max = 5) {
  let delay = 250;
  for (let i = 0; i < max; i++) {
    try { return await fn(); }
    catch (e) {
      if (i === max - 1) throw e;
      await new Promise(r => setTimeout(r, delay));
      delay = Math.min(delay * 2, 5000);
    }
  }
  throw new Error("unreachable");
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (x: T) => Promise<R>
) {
  const ret: R[] = [];
  let i = 0;
  const run = async () => {
    while (i < items.length) {
      const idx = i++;
      ret[idx] = await worker(items[idx]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return ret;
}

type FcmV1Error = { error?: { status?: string; message?: string } };

// ===== Ein Sender für genau EIN Token mit Fehlerauswertung + Token-Cleanup =====
async function sendToToken(
  token: string,
  accessToken: string,
  payload: {
    title: string;
    body: string;
    messageId: string;
    senderName: string;
    link: string;
  },
  supabaseUrl: string,
  supabaseKey: string,
  projectId: string
) {
  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          token,
          data: {
            title: payload.title,
            body: payload.body,
            url: payload.link,
            messageId: payload.messageId,
            senderName: payload.senderName,
            timestamp: String(Date.now()),
          },
          android: { priority: "high", ttl: "60s" },
          webpush: {
            headers: { Urgency: "high", TTL: "60" },
            fcm_options: { link: payload.link }
            // Optionaler Fail-Open-Pfad (nur aktivieren, wenn du im SW Duplikate verhinderst):
            // notification: { icon: "/icons/android-chrome-192x192.png", badge: "/icons/android-chrome-192x192.png" }
          },
          apns: { headers: { "apns-priority": "10" } },
        },
      }),
    }
  );

  const bodyText = await res.text();
  let err: FcmV1Error | null = null;
  try { err = JSON.parse(bodyText); } catch {}

  if (!res.ok) {
    const status = err?.error?.status || "";
    // Ungültige / verwaiste Tokens säubern
    if (["UNREGISTERED", "INVALID_ARGUMENT", "SENDER_ID_MISMATCH"].includes(status)) {
      await fetch(`${supabaseUrl}/rest/v1/fcm_tokens?token=eq.${encodeURIComponent(token)}`, {
        method: "DELETE",
        headers: { apikey: supabaseKey },
      });
    }
  }

  return { token, status: res.status, success: res.ok, body: bodyText };
}

// ====== Dein HTTP-Handler ======
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { title, body, tokens: providedTokens, senderName } = await req.json();

    // 1) Tokenliste + (optional) Gerätenamen in EINEM Request holen

let tokenList: string[] = [];
if (Array.isArray(providedTokens) && providedTokens.length > 0) {
  tokenList = [...new Set(providedTokens)].filter(Boolean);
} else {
  const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens?select=token,device_name`, {
    headers: { apikey: supabaseKey },
  });
  if (!tokensRes.ok) throw new Error(`Token fetch failed: ${tokensRes.status} ${await tokensRes.text()}`);
  const rows = await tokensRes.json() as Array<{ token: string; device_name?: string | null }>;
  tokenList = [...new Set(rows.map(r => r.token).filter(Boolean))];
}


    // 2) Token -> Gerätename Map (falls vorhanden)
const nameMap = await fetchNamesForTokens(tokenList);


const orphanTokens = tokenList.filter(t => !nameMap[t]);
if (orphanTokens.length) {
  // Option A (empfohlen): diese Tokens überspringen und melden
  console.warn("⚠️ Tokens ohne device_name werden übersprungen:", orphanTokens.length);
  // Wenn du sie dennoch anschreiben willst, kannst du sie getrennt senden,
  // aber nicht in recipients map aufnehmen (sonst Markierung schlägt fehl).
}

// 3) recipientsMap ausschließlich mit Device-Names
const recipientsMap: Record<string, boolean> = {};
for (const token of tokenList) {
  const deviceName = nameMap[token];
  if (!deviceName) continue; // siehe orphanTokens
  recipientsMap[sanitizeKey(deviceName)] = false;
}


    // 4) RTDB-Eintrag anlegen
    const messageId = crypto.randomUUID();
    const notif = {
      sender: senderName ?? "Unbekannt",
      recipients: recipientsMap,
      title,
      body,
      timestamp: Date.now(),
    };

    const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notif),
    });
    if (!putRes.ok) {
      const txt = await putRes.text();
      console.error("RTDB write failed:", txt);
      // bewusst kein Abbruch: Push trotzdem versuchen
    }

    // 5) Cleanup früh anstoßen (non-blocking, max. 150ms warten)
    const cleanupPromise = cleanupOldNotifications().catch(console.error);
    await withTimeout(cleanupPromise, 150);

    // 6) Push senden (Concurrency + Backoff)
    const accessToken = await getAccessTokenCached();
    const payload = {
      title,
      body,
      messageId,
      senderName: senderName ?? "Unbekannt",
      link: "https://tobias15-super.github.io/Mister-X/",
    };

    const results = await mapWithConcurrency(
      tokenList,
      32, // Concurrency-Limit
      (t) => withBackoff(() =>
        sendToToken(t, accessToken, payload, supabaseUrl, supabaseKey, SERVICE_ACCOUNT.project_id)
      )
    );

    const failedTokens = results.filter((r) => !r.success).map((r) => r.token);

    return new Response(JSON.stringify({ ok: true, messageId, results, failedTokens }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("❌ Fehler:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
