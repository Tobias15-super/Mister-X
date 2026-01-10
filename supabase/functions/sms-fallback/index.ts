// supabase/functions/sms-fallback/index.ts
// Deno + Supabase Edge Function (TypeScript) – RTDB-REST via Service-Account-OAuth (App-Check-kompatibel)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as jose from "https://esm.sh/jose@5.8.0";

// -------------------- CORS --------------------
const ALLOW_ORIGINS = new Set([
  "https://tobias15-super.github.io",
  // weitere erlaubte Origins hier
]);
function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowOrigin = ALLOW_ORIGINS.has(origin) ? origin : ""; // leer = kein ACAO
  const reqHeaders = req.headers.get("Access-Control-Request-Headers") ?? "";
  const base: Record<string, string> = {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
  base["Access-Control-Allow-Headers"] = reqHeaders
    ? reqHeaders
    : "authorization, apikey, content-type, x-client-info, x-sms-secret";
  return base;
}
function jsonWithCors(req: Request, data: unknown, init: ResponseInit = {}) {
  const headers = { ...(init.headers ?? {}), ...buildCorsHeaders(req) };
  return Response.json(data, { ...init, headers });
}

// -------------------- Types --------------------
type FallbackRequest = {
  messageId: string;
  recipientDeviceNames: string[]; // DEVICE-NAMES, nicht Tokens
  smsText: string;
  waitSec?: number; // default 15
  rtdbBase?: string; // z.B. https://<db>.europe-west1.firebasedatabase.app
  rolesPath?: string; // default 'roles'
  recipientsPath?: string; // default 'notifications'
  idempotencyFlag?: string; // default 'smsTriggered'
  rtdbAuth?: string; // optionaler Alt-Fallback: ?auth=...
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

// -------------------- Utilities --------------------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sanitizeKey = (s: string) => s.replace(/[.#$/\[\]]/g, "_"); // RTDB verbotene Zeichen
const isValidE164 = (s?: string | null) => !!s && /^\+[1-9]\d{6,14}$/.test(s);
const unique = <T,>(arr: T[]) => [...new Set(arr)];

function appendAuthQuery(url: string, auth?: string) {
  if (!auth) return url;
  const u = new URL(url);
  u.searchParams.set("auth", auth);
  return u.toString();
}

// -------------------- Firebase / RTDB ENV (NEU) --------------------
const RTDB_BASE_FALLBACK = Deno.env.get("RTDB_BASE") ?? "";
const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID") ?? "";
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON") ?? "";

// --- Service-Account OAuth (Access Token holen + Cache) ---
let _cachedAccessToken: { token: string; exp: number } | null = null;

async function getGoogleAccessTokenFromSA(scopes: string[]): Promise<string> {
  if (!GCP_SA_JSON) throw new Error("Missing GCP_SA_JSON");
  const now = Math.floor(Date.now() / 1000);
  if (_cachedAccessToken && _cachedAccessToken.exp - 60 > now) {
    return _cachedAccessToken.token;
  }
  const sa = JSON.parse(GCP_SA_JSON) as {
    client_email: string;
    private_key: string;
    token_uri?: string;
  };
  const aud = "https://oauth2.googleapis.com/token";
  const pk = await jose.importPKCS8(sa.private_key, "RS256");
  const assertion = await new jose.SignJWT({
    iss: sa.client_email,
    sub: sa.client_email,
    aud,
    iat: now,
    exp: now + 3600,
    scope: scopes.join(" "),
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(pk);

  const res = await fetch(sa.token_uri || aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`OAuth token exchange failed: ${res.status} ${res.statusText} – ${t}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in?: number };
  const token = json.access_token;
  const exp = now + (json.expires_in ?? 3600);
  _cachedAccessToken = { token, exp };
  return token;
}

// --- RTDB Fetch Helpers (Authorization Header setzen) ---
async function rtdbGetJson<T>(
  urlWithJson: string,
  bearer?: string,
  extraHeaders?: HeadersInit,
): Promise<T | null> {
  const headers: HeadersInit = { "Cache-Control": "no-store", ...(extraHeaders ?? {}) };
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${urlWithJson}`);
  return (await res.json()) as T;
}

async function rtdbGetWithEtag<T>(
  urlWithJson: string,
  bearer?: string,
): Promise<{ value: T | null; etag: string | null }> {
  const headers: HeadersInit = { "X-Firebase-ETag": "true", "Cache-Control": "no-store" };
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} (GET ETag)`);
  const etag = res.headers.get("ETag");
  const txt = await res.text();
  const value = txt ? (JSON.parse(txt) as T) : null;
  return { value, etag };
}

async function rtdbConditionalPut(
  urlWithJson: string,
  body: unknown,
  etag?: string | null,
  bearer?: string,
) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (etag) (headers as any)["If-Match"] = etag;
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  return res;
}

async function rtdbPatch(
  urlWithJson: string,
  body: unknown,
  bearer?: string,
) {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
  return res;
}

// -------------------- SMS provider (TextBee – Platzhalter) --------------------
async function sendSmsViaTextBee(
  recipients: string[],
  message: string
): Promise<{ ok: boolean; status: number; bodyText: string }> {
  const deviceId = Deno.env.get("TEXTBEE_DEVICE_ID") ?? "";
  const apiKey = Deno.env.get("TEXTBEE_API_KEY") ?? "";
  if (!deviceId || !apiKey) {
    throw new Error("TEXTBEE_DEVICE_ID/TEXTBEE_API_KEY fehlen");
  }
  const url = `https://api.textbee.dev/api/v1/gateway/devices/${encodeURIComponent(deviceId)}/send-sms`;
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

// -------------------- Auth / Secrets --------------------
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SMS_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const supa = SUPABASE_URL && SERVICE_KEY ? createClient(SUPABASE_URL, SERVICE_KEY) : null;

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
 * - Service-Role-JWT (Authorization: Bearer ... ODER apikey: ...)
 * - ODER (optional) x-sms-secret (falls gesetzt)
 */
async function isAuthorized(req: Request) {
  if (SMS_SECRET && req.headers.get("x-sms-secret") === SMS_SECRET) return true;
  const bearerToken = getHeaderToken(req, "authorization");
  const apikeyToken = getHeaderToken(req, "apikey");
  if ((bearerToken && isServiceRoleJwt(bearerToken)) || (apikeyToken && isServiceRoleJwt(apikeyToken))) {
    return true; // Service-Role
  }
  // Endnutzer (Browser)
  const authHeader = req.headers.get("Authorization") ?? "";
  if (SUPABASE_URL && ANON_KEY && authHeader) {
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } });
    const { data, error } = await userClient.auth.getUser();
    if (!error && data?.user) return true;
  }
  // Optional: Anon erlauben, aber nur für whitelisted Origins
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
  } catch {
    return "invalid";
  }
}

// -------------------- Handler --------------------
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
    rtdbAuth, // Alt-Fallback
  } = payload ?? {};

  // 4) Validierung
  if (!messageId || !Array.isArray(recipientDeviceNames) || recipientDeviceNames.length === 0) {
    return jsonWithCors(req, { ok: false, error: "Missing messageId or recipientDeviceNames" }, { status: 400 });
  }
  const baseUrl = (rtdbBase?.trim() || RTDB_BASE_FALLBACK.trim()).replace(/\/$/, "");
  if (!baseUrl) {
    return jsonWithCors(req, { ok: false, error: "Missing RTDB base (payload.rtdbBase or RTDB_BASE env)" }, { status: 400 });
  }
  if (!smsText) {
    return jsonWithCors(req, { ok: false, error: "Missing smsText" }, { status: 400 });
  }

  // 4b) Access Token für RTDB (bevorzugt OAuth; optional Fallback ?auth=...)
  let bearer: string | undefined;
  try {
    if (GCP_SA_JSON) {
      bearer = await getGoogleAccessTokenFromSA([
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/firebase.database",
      ]);
    }
  } catch (e) {
    console.warn("[sms-fallback] OAuth token error:", e);
  }

  // 5) Serverseitig warten (Edge-Timeouts beachten -> Deckel, z. B. 55s)
  const waitMs = Math.max(0, Math.min(Number.isFinite(waitSec) ? (waitSec as number) : DEFAULTS.waitSec, 55)) * 1000;
  if (waitMs > 0) await sleep(waitMs);

  // 6) Idempotenz prüfen (frisch, nach dem Delay)
  const messageKey = sanitizeKey(messageId);
  const idemPath = `${baseUrl}/${recipientsPath}/${messageKey}/${idempotencyFlag}.json`;

  try {
    let idemRes: { value: boolean | null; etag: string | null };
    if (bearer) {
      idemRes = await rtdbGetWithEtag<boolean>(idemPath, bearer);
    } else if (rtdbAuth) {
      idemRes = await rtdbGetWithEtag<boolean>(appendAuthQuery(idemPath, rtdbAuth));
    } else {
      throw new Error("No server auth available for RTDB (need GCP_SA_JSON or rtdbAuth)");
    }

    const { value: alreadyTriggered, etag: idemEtag } = idemRes;
    if (alreadyTriggered === true) {
      return jsonWithCors(req, { ok: true, skipped: "already_triggered" });
    }

    // Konditionelles Setzen mit If-Match (ETag vorhanden?)
    let putRes: Response;
    if (bearer) {
      putRes = await rtdbConditionalPut(idemPath, true, idemEtag, bearer);
    } else {
      // Fallback ?auth
      putRes = await fetch(appendAuthQuery(idemPath, rtdbAuth), {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(idemEtag ? { "If-Match": idemEtag } : {}) },
        body: JSON.stringify(true),
      });
    }

    if (putRes.status === 412) {
      // Lost the race
      return jsonWithCors(req, { ok: true, skipped: "lost_race" });
    }
    if (!putRes.ok) {
      const msg = await putRes.text().catch(() => "");
      return jsonWithCors(req, { ok: false, error: `Failed to set idempotency: ${putRes.status} ${msg}` }, { status: 500 });
    }
  } catch (e) {
    return jsonWithCors(req, { ok: false, error: `RTDB flag error: ${String(e)}` }, { status: 500 });
  }

  // 7) Recipients laden und offene Device-Namen bestimmen
  try {
    const recipientsUrl = `${baseUrl}/${recipientsPath}/${messageKey}/recipients.json`;
    const recMap =
      (bearer
        ? await rtdbGetJson<Record<string, unknown> | null>(recipientsUrl, bearer)
        : await rtdbGetJson<Record<string, unknown> | null>(appendAuthQuery(recipientsUrl, rtdbAuth))) || {};
    const pendingDevices = recipientDeviceNames.filter((dn) => !recMap?.[sanitizeKey(dn)]);
    if (pendingDevices.length === 0) {
      return jsonWithCors(req, { ok: true, skipped: "all_delivered" });
    }

    // 8) Telefonnummern aus /tels/<deviceName> holen; consent (allowSmsFallback) bleibt in roles
    const deviceTelPromises = pendingDevices.map(async (dn) => {
      const roleUrl = `${baseUrl}/${rolesPath}/${encodeURIComponent(dn)}.json`;
      const telUrl = `${baseUrl}/tels/${encodeURIComponent(dn)}.json`;
      try {
        const roleData =
          (bearer
            ? await rtdbGetJson<TelRole | null>(roleUrl, bearer)
            : await rtdbGetJson<TelRole | null>(appendAuthQuery(roleUrl, rtdbAuth))) || {};
        const telData =
          (bearer
            ? await rtdbGetJson<{ tel?: string } | null>(telUrl, bearer)
            : await rtdbGetJson<{ tel?: string } | null>(appendAuthQuery(telUrl, rtdbAuth))) || {};
        const tel = roleData.allowSmsFallback && isValidE164(telData?.tel) ? telData!.tel! : null;
        return { deviceName: dn, tel };
      } catch {
        return { deviceName: dn, tel: null };
      }
    });

    const deviceResults = await Promise.all(deviceTelPromises);
    const valid = deviceResults.filter((r) => !!r.tel) as { deviceName: string; tel: string }[];
    if (valid.length === 0) {
      return jsonWithCors(req, { ok: true, skipped: "no_tel_or_consent" });
    }

    const tels = unique(valid.map((r) => r.tel));
    const devicesSent = valid.map((r) => r.deviceName);

    // 9) SMS senden
    const trimmedSms = smsText.slice(0, 280);
    await sendSmsViaTextBee(tels, trimmedSms);

    // 10) (Optional) Log & fallbackTargets zurückschreiben
    const logUrl = `${baseUrl}/${recipientsPath}/${messageKey}.json`;
    const patchBody: any = { smsCount: tels.length, smsAt: Date.now(), smsSentTo: devicesSent };
    if (bearer) {
      rtdbPatch(logUrl, patchBody, bearer).catch(() => {});
      // Patch fallbackTargets per device
      const fallbackMap = Object.fromEntries(devicesSent.map(d => [sanitizeKey(d), true]));
      const fallbackUrl = `${baseUrl}/${recipientsPath}/${messageKey}/fallbackTargets.json`;
      rtdbPatch(fallbackUrl, fallbackMap, bearer).catch(() => {});
    } else if (rtdbAuth) {
      fetch(appendAuthQuery(logUrl, rtdbAuth), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchBody),
      }).catch(() => {});
      const fallbackMap = Object.fromEntries(devicesSent.map(d => [sanitizeKey(d), true]));
      const fallbackUrl = `${baseUrl}/${recipientsPath}/${messageKey}/fallbackTargets.json`;
      fetch(appendAuthQuery(fallbackUrl, rtdbAuth), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fallbackMap),
      }).catch(() => {});
    }

    return jsonWithCors(req, { ok: true, sent: tels.length, devices: devicesSent });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonWithCors(req, { ok: false, error: message }, { status: 500 });
  }
});
