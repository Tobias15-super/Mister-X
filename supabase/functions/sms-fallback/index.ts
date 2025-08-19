// supabase/functions/sms-fallback/index.ts
// Deno + Supabase Edge Function (TypeScript)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------- CORS ----------------

const ALLOW_ORIGINS = new Set([
  "https://tobias15-super.github.io",
  // weitere erlaubte Origins hier
]);
const ALLOW_ANON_INVOKE = (Deno.env.get("ALLOW_ANON_INVOKE") ?? "").toLowerCase() === "true";

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowOrigin = ALLOW_ORIGINS.has(origin) ? origin : ""; // leer = kein ACAO

  // Echo der vom Browser angefragten Header
  const reqHeaders = req.headers.get("Access-Control-Request-Headers") ?? "";

  const base: Record<string, string> = {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };

  // Wenn Preflight Header anfragt, spiegeln
  if (reqHeaders) base["Access-Control-Allow-Headers"] = reqHeaders;
  else
    base["Access-Control-Allow-Headers"] =
      "authorization, apikey, content-type, x-client-info, x-sms-secret";

  // Falls du Cookies/Credentials brauchst:
  // base['Access-Control-Allow-Credentials'] = 'true';

  return base;
}

// JSON Helper: sorgt dafür, dass alle Antworten CORS haben
function jsonWithCors(req: Request, data: unknown, init: ResponseInit = {}) {
  const headers = { ...(init.headers ?? {}), ...buildCorsHeaders(req) };
  return Response.json(data, { ...init, headers });
}

// -------------- Types -----------------

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
  rolesPath: "roles",
  recipientsPath: "notifications",
  idempotencyFlag: "smsTriggered",
};

// ---- Utilities -------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const sanitizeKey = (s: string) => s.replace(/[.#$/\[\]]/g, "_"); // RTDB verbotene Zeichen

const isValidE164 = (s?: string | null) => !!s && /^\+[1-9]\d{6,14}$/.test(s);

const unique = <T,>(arr: T[]) => [...new Set(arr)];

function withAuth(url: string, auth?: string) {
  if (!auth) return url;
  const u = new URL(url);
  u.searchParams.set("auth", auth);
  return u.toString();
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as T;
}

// ---- Firebase RTDB helpers (Idempotenz via ETag) --------------------------

async function getWithEtag<T>(
  url: string,
  auth?: string
): Promise<{ value: T | null; etag: string | null }> {
  const res = await fetch(withAuth(url, auth), {
    headers: { "X-Firebase-ETag": "true", "Cache-Control": "no-store" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} (GET ETag)`);
  const etag = res.headers.get("ETag");
  const txt = await res.text();
  const value = txt ? (JSON.parse(txt) as T) : null;
  return { value, etag };
}

async function conditionalPut(url: string, body: unknown, etag: string, auth?: string) {
  const res = await fetch(withAuth(url, auth), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(etag ? { "If-Match": etag } : {}), // nur wenn wir ein ETag haben
    },
    body: JSON.stringify(body),
  });
  return res;
}

// ---- SMS provider (TextBee – Platzhalter; passt du an deine API an) ------

async function sendSmsViaTextBee(
  recipients: string[],
  message: string
): Promise<{ ok: boolean; status: number; bodyText: string }> {
  const deviceId = Deno.env.get("TEXTBEE_DEVICE_ID") ?? "";
  const apiKey = Deno.env.get("TEXTBEE_API_KEY") ?? "";

  if (!deviceId || !apiKey) {
    throw new Error("TEXTBEE_DEVICE_ID/TEXTBEE_API_KEY fehlen");
  }

  const url = `https://api.textbee.dev/api/v1/gateway/devices/${encodeURIComponent(
    deviceId
  )}/send-sms`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipients, message }),
  });

  const bodyText = await res.text().catch(() => "");

  if (!res.ok) {
    throw new Error(`TextBee HTTP ${res.status}: ${bodyText}`);
  }

  return { ok: res.ok, status: res.status, bodyText };
}

// ---- Auth / Secrets -------------------------------------------------------

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SMS_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

const supa =
  SUPABASE_URL && SERVICE_KEY ? createClient(SUPABASE_URL, SERVICE_KEY) : null;

function getHeaderToken(req: Request, name: string) {
  const h = req.headers.get(name);
  if (!h) return "";
  if (name.toLowerCase() === "authorization" && h.toLowerCase().startsWith("bearer ")) {
    return h.slice(7);
  }
  return h;
}

function isServiceRoleJwt(jwt: string) {
  try {
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    return payload?.role === "service_role";
  } catch {
    return false;
  }
}

/**
 * Erlaubt:
 *  - Service-Role-JWT (Authorization: Bearer ... ODER apikey: ...)
 *  - ODER (optional) x-sms-secret (falls gesetzt)
 */


async function isAuthorized(req: Request) {
  if (SMS_SECRET && req.headers.get("x-sms-secret") === SMS_SECRET) return true;

  const bearerToken = getHeaderToken(req, "authorization");
  const apikeyToken  = getHeaderToken(req, "apikey");
  if ((bearerToken && isServiceRoleJwt(bearerToken)) || (apikeyToken && isServiceRoleJwt(apikeyToken))) {
    return true; // Service-Role
  }

  // Endnutzer (Browser)
  const authHeader = req.headers.get("Authorization") ?? "";
  if (SUPABASE_URL && ANON_KEY && authHeader) {
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } });
    const { data, error } = await userClient.auth.getUser();
    if (!error && data?.user) return true; // optional: DB-Rollenprüfung hier
  }

  // Optional (bewusst): Anon erlauben, aber NUR für whitelisted Origins
  if ((Deno.env.get("ALLOW_ANON_INVOKE") ?? "").toLowerCase() === "true") {
    const origin = req.headers.get("Origin") ?? "";
    if (ALLOW_ORIGINS.has(origin)) return true;
  }

  return false;
}



/**
 * Optionaler DB-Guard für Idempotenz (wenn `claim_sms_once` als RPC existiert).
 * true  -> darf senden
 * false -> bereits gesendet/geplant
 * undefined -> Guard nicht verfügbar/Fehler
 */
async function tryDbClaim(messageId: string, source = "sms-fallback") {
  if (!supa) return undefined;
  try {
    const { data, error } = await supa.rpc("claim_sms_once", {
      p_message_id: messageId,
      p_source: source,
    });
    if (error) {
      console.warn("claim_sms_once error:", error.message ?? error);
      return undefined;
    }
    if (data === true) return true;
    if (data === false) return false;
    return undefined;
  } catch (e) {
    console.warn("claim_sms_once threw:", e);
    return undefined;
  }
}


function roleFromJwt(jwt?: string) {
  try {
    if (!jwt) return "none";
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    return payload?.role ?? "unknown";
  } catch { return "invalid"; }
}


// ---- Handler --------------------------------------------------------------

Deno.serve(async (req) => {

  const authHeader = req.headers.get("Authorization") ?? req.headers.get("authorization") ?? "";
  const apikeyHeader = req.headers.get("apikey") ?? "";

  console.log("[REQ AUTH]", {
    origin: req.headers.get("Origin"),
    hasAuth: !!authHeader,
    authRole: roleFromJwt(authHeader.replace(/^Bearer\s+/i, "")),
    hasApikey: !!apikeyHeader,
    apikeyRole: roleFromJwt(apikeyHeader),
    hasSecret: !!req.headers.get("x-sms-secret"),
  });

  // 1) Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { ...buildCorsHeaders(req), Allow: "POST, OPTIONS" },
    });
  }

  // 2) Auth
  if (!(await isAuthorized(req))) {
    return jsonWithCors(req, { ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 3) Payload
  let payload: FallbackRequest;
  try {
    payload = (await req.json()) as FallbackRequest;
  } catch {
    return jsonWithCors(req, { ok: false, error: "Invalid JSON" }, { status: 400 });
  }

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
  } = payload ?? {};

  // 4) Validierung
  if (!messageId || !Array.isArray(recipientDeviceNames) || recipientDeviceNames.length === 0) {
    return jsonWithCors(req, { ok: false, error: "Missing messageId or recipientDeviceNames" }, { status: 400 });
  }
  if (!rtdbBase || !smsText) {
    return jsonWithCors(req, { ok: false, error: "Missing rtdbBase or smsText" }, { status: 400 });
  }

  // Sanitize Schlüssel für RTDB
  const messageKey = sanitizeKey(messageId);
  const baseUrl = rtdbBase.replace(/\/$/, "");

  // 5) Serverseitig warten (Edge-Timeouts beachten -> Deckel, z. B. 55s)
  const waitMs = Math.max(0, Math.min(Number.isFinite(waitSec) ? waitSec! : DEFAULTS.waitSec, 55)) * 1000;
  if (waitMs > 0) await sleep(waitMs);

  // 6) Idempotenz prüfen (frisch, nach dem Delay)
  const idemPath = `${baseUrl}/${recipientsPath}/${messageKey}/${idempotencyFlag}.json`;
  try {
    const { value: alreadyTriggered, etag: idemEtag } = await getWithEtag<boolean>(idemPath, rtdbAuth);
    if (alreadyTriggered === true) {
      return jsonWithCors(req, { ok: true, skipped: "already_triggered" });
    }

    // Konditionelles Setzen mit If-Match (ETag vorhanden?)
    if (idemEtag) {
      const putRes = await conditionalPut(idemPath, true, idemEtag, rtdbAuth);
      if (putRes.status === 412) {
        // Lost the race
        return jsonWithCors(req, { ok: true, skipped: "lost_race" });
      }
      if (!putRes.ok) {
        const msg = await putRes.text().catch(() => "");
        return jsonWithCors(req, { ok: false, error: `Failed to set idempotency: ${putRes.status} ${msg}` }, { status: 500 });
      }
    } else {
      // Ohne ETag: versuche unbedingtes PUT; bei Race kann es 412 geben
      const res = await fetch(withAuth(idemPath, rtdbAuth), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(true),
      });
      if (res.status === 412) {
        return jsonWithCors(req, { ok: true, skipped: "lost_race" });
      }
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        return jsonWithCors(req, { ok: false, error: `RTDB flag set failed: ${res.status} ${msg}` }, { status: 500 });
      }
    }
  } catch (e) {
    return jsonWithCors(req, { ok: false, error: `RTDB flag error: ${String(e)}` }, { status: 500 });
  }

  // 7) Recipients laden und offene Device-Namen bestimmen
  try {
    const recipientsUrl = `${baseUrl}/${recipientsPath}/${messageKey}/recipients.json`;
    const recMap =
      (await getJson<Record<string, unknown> | null>(withAuth(recipientsUrl, rtdbAuth), {
        headers: { "Cache-Control": "no-store" },
      })) || {};

    const pendingDevices = recipientDeviceNames.filter((dn) => !recMap?.[sanitizeKey(dn)]);
    if (pendingDevices.length === 0) {
      return jsonWithCors(req, { ok: true, skipped: "all_delivered" });
    }

    // 8) Telefonnummern aus roles/<deviceName> holen
    const telPromises = pendingDevices.map(async (dn) => {
      const roleUrl = `${baseUrl}/${rolesPath}/${encodeURIComponent(dn)}.json`;
      try {
        const data = (await getJson<TelRole | null>(withAuth(roleUrl, rtdbAuth), {
          headers: { "Cache-Control": "no-store" },
        })) || {};
        return data.allowSmsFallback && isValidE164(data.tel) ? data.tel! : null;
      } catch {
        return null;
      }
    });

    const tels = unique((await Promise.all(telPromises)).filter((x): x is string => !!x));
    if (tels.length === 0) {
      return jsonWithCors(req, { ok: true, skipped: "no_tel_or_consent" });
    }

    // 9) SMS senden
    const trimmedSms = smsText.slice(0, 280);
    await sendSmsViaTextBee(tels, trimmedSms);

    // 10) (Optional) kleines Log zurückschreiben
    const logUrl = `${baseUrl}/${recipientsPath}/${messageKey}.json`;
    fetch(withAuth(logUrl, rtdbAuth), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        smsCount: tels.length,
        smsAt: Date.now(),
      }),
    }).catch(() => {
      /* best effort */
    });

    return jsonWithCors(req, { ok: true, sent: tels.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonWithCors(req, { ok: false, error: message }, { status: 500 });
  }
});
