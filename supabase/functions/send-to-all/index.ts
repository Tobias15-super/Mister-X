// supabase/functions/send-to-all/index.ts
// Deno Edge Function (TypeScript)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!; // oder SERVICE_ROLE_KEY falls nötig
const fcmKey = Deno.env.get("FCM_SERVER_KEY")!;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RTDB_BASE_FALLBACK = Deno.env.get("RTDB_BASE") ?? "";

const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID")!;
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON")!; 


function sanitizeKey(key: string) {
  return (key || '').replace(/[.#$/\[\]\/]/g, '_');
}

async function fetchNamesForTokens(tokens: string[]): Promise<Record<string, string>> {
  if (!tokens.length) return {};
  // Hole token -> device_name in einem Rutsch
  const url = `${supabaseUrl}/rest/v1/fcm_tokens?select=token,device_name&token=in.(${tokens.map(encodeURIComponent).join(",")})`;
  const res = await fetch(url, { headers: { apikey: supabaseKey } });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status} ${await res.text()}`);
  const rows = await res.json() as Array<{ token: string; device_name: string | null }>;
  const map: Record<string, string> = {};
  for (const r of rows) {
    if (r.token && r.device_name) map[r.token] = r.device_name;
  }
  return map;
}

/**
 * Sendet Web/FCM-Nachrichten über den FCM HTTP v1 Endpoint.
 * Erwartet, dass FIREBASE_PROJECT_ID und getAccessToken() im Scope vorhanden sind.
 */
async function sendFcmToTokens(
  title: string,
  body: string,
  link: string,
  tokens: string[],
  messageId?: string
): Promise<{
  ok: boolean;
  successTokens: string[];
  failedTokens: string[];
  unregistered: string[];
  errorsByToken: Record<string, { status: number; errorCode?: string; message?: string; raw?: unknown }>;
}> {
  // --- 1) Tokenliste deduplizieren & grob validieren ---
  const deduped = [...new Set((tokens || []).filter(Boolean))];

  const looksLikeFcmToken = (t: string) =>
    typeof t === "string" && t.length > 100 && t.includes(":");

  const invalidTokens: string[] = [];
  const validTokens = deduped.filter((t) => {
    const ok = looksLikeFcmToken(t);
    if (!ok) invalidTokens.push(String(t));
    return ok;
  });

  // Wenn nach Filterung nichts übrig ist, früh zurückgeben
  if (validTokens.length === 0) {
    const errorsByToken = Object.fromEntries(
      invalidTokens.map((t) => [t, { status: 400, message: "invalid-token-shape" }])
    );
    return {
      ok: false,
      successTokens: [],
      failedTokens: invalidTokens,
      unregistered: [],
      errorsByToken,
    };
  }

  // --- 2) FCM v1 Endpoint & OAuth2 Access Token ---
  const fcmUrl = `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`;
  const accessToken = await getAccessToken();

  const toStr = (v: unknown) => (v == null ? "" : String(v));

  // Map für Fehlerdetails pro Token
  const errorsByToken: Record<
    string,
    { status: number; errorCode?: string; message?: string; raw?: unknown }
  > = {};

  // --- 3) Sende-Helfer pro Token (v1 fordert 1 Request je Ziel) ---
  const sendOne = async (token: string) => {
    const payload = {
      message: {
        token,
        // Data-only (Service Worker rendert selbst). Alternativ "notification" ergänzen.
        data: {
          title: toStr(title),
          body: toStr(body),
          url: toStr(link),
          messageId: toStr(messageId ?? ""),
        },
        webpush: {
          headers: { Urgency: "high", TTL: "120" }, // TTL in Sekunden
          fcm_options: { link },
        },
        // notification: { title, body }, // falls du native Anzeige ohne eigene SW-Logik möchtest
      },
    };

    const res = await fetch(fcmUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      // HTML oder leer -> belasse text als raw
    }

    if (!res.ok) {
      const errorCode = json?.error?.details?.[0]?.errorCode; // z.B. "UNREGISTERED", "SENDER_ID_MISMATCH", ...
      errorsByToken[token] = {
        status: res.status,
        errorCode: errorCode || undefined,
        message: json?.error?.message ?? text,
        raw: json ?? text,
      };
      throw new Error(`FCM v1 send failed (${res.status})`);
    }

    return { token, response: json };
  };

  // --- 4) Parallel senden & Ergebnisse einsammeln ---
  const results = await Promise.allSettled(validTokens.map(sendOne));

  const successTokens: string[] = [];
  const failedTokens: string[] = [...invalidTokens]; // von Anfang an als "failed" mitzählen
  const unregistered: string[] = [];

  results.forEach((r, idx) => {
    const token = validTokens[idx];
    if (r.status === "fulfilled") {
      successTokens.push(token);
    } else {
      failedTokens.push(token);
      const code = errorsByToken[token]?.errorCode;
      if (code === "UNREGISTERED") {
        unregistered.push(token); // -> im Backend löschen
      }
    }
  });

  const ok = successTokens.length > 0;

  return { ok, successTokens, failedTokens, unregistered, errorsByToken };
}






type SaJson = {
  client_email: string;
  private_key: string; // PEM
  token_uri?: string;  // optional, default oauth2.googleapis.com/token
};

let cachedAccessToken: { token: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && now < cachedAccessToken.exp - 60) {
    return cachedAccessToken.token;
  }

  const sa: SaJson = JSON.parse(GCP_SA_JSON);
  const iat = now;
  const exp = now + 3600;
  const scope = "https://www.googleapis.com/auth/firebase.messaging";
  const aud = sa.token_uri || "https://oauth2.googleapis.com/token";

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: sa.client_email,
    scope,
    aud,
    iat,
    exp,
  };

  const enc = (obj: any) =>
    b64url(new TextEncoder().encode(JSON.stringify(obj)));

  const unsigned = `${enc(header)}.${enc(payload)}`;
  const signature = await signWithPemRS256(sa.private_key, unsigned);
  const assertion = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`OAuth token fetch failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json() as { access_token: string; expires_in: number };
  cachedAccessToken = { token: json.access_token, exp: now + Math.min(json.expires_in ?? 3600, 3600) };
  return cachedAccessToken.token;
}

function b64url(input: Uint8Array) {
  return btoa(String.fromCharCode(...input))
    .replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function signWithPemRS256(pem: string, data: string): Promise<Uint8Array> {
  // PEM -> ArrayBuffer (PKCS8)
  const pkcs8 = pemToPkcs8(pem);
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pkcs8,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(data),
  );
  return new Uint8Array(sig);
}

function pemToPkcs8(pem: string): ArrayBuffer {
  const body = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s+/g, "");
  const raw = atob(body);
  const buf = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) buf[i] = raw.charCodeAt(i);
  return buf.buffer;
}






serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const {
      title,
      body,
      tokens: providedTokens,
      senderName,
      link = "/Mister-X/",
      messageId: providedMessageId,
      rtdbBase = RTDB_BASE_FALLBACK,
      recipientDeviceNames = [],
      setRecipientsMode = "none", // 'set_once' | 'append' | 'none'
      attempt = 1,
    } = await req.json();

    if (!title || !body) {
      return new Response(JSON.stringify({ error: "title and body required" }), { status: 400, headers: corsHeaders });
    }
    if (!rtdbBase) {
      return new Response(JSON.stringify({ error: "rtdbBase missing" }), { status: 400, headers: corsHeaders });
    }

    // 1) Tokenliste holen (falls nicht geliefert)
    let tokenList: string[] = [];
    if (Array.isArray(providedTokens) && providedTokens.length > 0) {
      tokenList = [...new Set(providedTokens)].filter(Boolean);
    } else {
      const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens?select=token,device_name`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });
      if (!tokensRes.ok) throw new Error(`Token fetch failed: ${tokensRes.status} ${await tokensRes.text()}`);
      const rows = await tokensRes.json() as Array<{ token: string; device_name?: string | null }>;
      tokenList = [...new Set(rows.map(r => r.token).filter(Boolean))];
    }

    // 2) Eine stabile messageId verwenden
    const messageId = providedMessageId || crypto.randomUUID();

    // 3) recipientsMap **nur** beim 1. Versuch setzen
    let recipientsMap: Record<string, boolean> | null = null;
    if (setRecipientsMode === "set_once") {
      // Empfänger aus Gerätesicht: nimm die übergebenen Namen (vollständig!)
      // → unabhängig davon, ob einzelne Tokens später fehlschlagen.
      const names = new Set<string>();
      for (const n of Array.isArray(recipientDeviceNames) ? recipientDeviceNames : []) {
        const safe = sanitizeKey(n);
        if (safe) names.add(safe);
      }
      if (names.size === 0) {
        // Fallback: aus Tokens die device_names auflösen (nur wenn unvermeidlich)
        const map = await fetchNamesForTokens(tokenList);
        Object.values(map).forEach(n => { if (n) names.add(sanitizeKey(n)); });
      }

      recipientsMap = {};
      names.forEach(n => { recipientsMap![n] = false; });
    }

    // 4) Notification-Dokument erstellen oder patchen (recipients nur einmal!)
    const notifBase = {
      sender: senderName ?? "Unbekannt",
      title,
      body,
    };

    const now = Date.now();

    // a) Existiert die Nachricht schon?
    const getRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`);
    const existing = getRes.ok ? await getRes.json() : null;

    if (!existing) {
      // Erst-Erstellung: PUT mit vollständigem Objekt
      const notif = {
        ...notifBase,
        recipients: recipientsMap ?? {}, // beim 1. Versuch expected, sonst leer
        timestamp: now,
        attempts: {
          [attempt]: {
            at: now,
            count: Array.isArray(tokenList) ? tokenList.length : 0,
          }
        },
        lastAttemptAt: now,
      };
      const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notif),
      });
      if (!putRes.ok) {
        console.error("RTDB initial write failed:", await putRes.text());
        // nicht abbrechen – Push trotzdem versuchen
      }
    } else {
      // Update: recipients **nicht überschreiben**
      const patch: any = {
        lastAttemptAt: now,
        [`attempts/${attempt}`]: {
          at: now,
          count: Array.isArray(tokenList) ? tokenList.length : 0,
        }
      };
      if (setRecipientsMode === "set_once" && recipientsMap) {
        // nur falls (ausnahmsweise) noch nicht gesetzt war – merge, nicht replace
        // wir mergen Empfänger keys auf true/false – bestehende bleiben erhalten
        Object.keys(recipientsMap).forEach((k) => {
          patch[`recipients/${k}`] = existing?.recipients?.[k] ?? false;
        });
      }
      


      const patchRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!patchRes.ok) {
        console.error("RTDB patch failed:", await patchRes.text());
      }
    }

    // 5) Senden
    const { successTokens, failedTokens, raw } = await sendFcmToTokens(title, body, link, tokenList);

    // 6) Versuchsergebnis protokollieren (PATCH, nicht überschreiben)
    const resultPatch: any = {
      lastAttemptAt: now,
      [`attempts/${attempt}/success`]: successTokens.length,
      [`attempts/${attempt}/failed`]: failedTokens.length,
    };

    // Optional: letzte Fehlerliste unter attempts speichern (klein halten!)
    if (failedTokens.length) {
      // Achtung: lange Arrays vermeiden
      resultPatch[`attempts/${attempt}/failedTokens`] = failedTokens.slice(0, 50);
    }

    const patchRes2 = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultPatch),
    });
    if (!patchRes2.ok) {
      console.error("RTDB attempt result patch failed:", await patchRes2.text());
    }

    return new Response(
      JSON.stringify({ ok: true, messageId, successTokens, failedTokens, fcm: raw }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
