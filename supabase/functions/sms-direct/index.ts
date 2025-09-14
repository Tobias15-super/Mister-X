// supabase/functions/sms-direct/index.ts
// Deno + Supabase Edge Function — "direkt senden" + RTDB delivered markieren

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as jose from "https://esm.sh/jose@5.8.0";

/* ------------------------------ CORS ---------------------------------- */

const ALLOW_ORIGINS = (() => {
  const raw = Deno.env.get("ALLOW_ORIGINS")?.trim() ?? "";
  try {
    if (raw.startsWith("[")) return new Set<string>(JSON.parse(raw));
  } catch {}
  return new Set<string>(
    raw.split(",").map((s) => s.trim()).filter(Boolean),
  );
})();

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowOrigin = ALLOW_ORIGINS.has(origin) ? origin : "";
  const reqHeaders = req.headers.get("Access-Control-Request-Headers");
  const base: Record<string, string> = {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin, "Vary": "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
  base["Access-Control-Allow-Headers"] =
    reqHeaders ?? "authorization, apikey, content-type, x-client-info";
  return base;
}
function jsonWithCors(req: Request, data: unknown, init: ResponseInit = {}) {
  const headers = { ...(init.headers ?? {}), ...buildCorsHeaders(req) };
  return Response.json(data, { ...init, headers });
}

/* ------------------------------ Types --------------------------------- */

type DirectRequest = {
  messageId: string;                 // NEU: notwendig zum Markieren
  recipientDeviceNames: string[];
  smsText: string;
  // RTDB / Rollen
  rtdbBase?: string;
  rolesPath?: string;                // default 'roles'
  rtdbAuth?: string;                 // optionales ?auth=...
  recipientsPath?: string;           // default 'notifications' (Pfad, in den delivered geschrieben wird)
  // Verhalten
  requireConsent?: boolean;          // default true
  maxRecipientsPerCall?: number;
  writeDeliveredTimestamp?: boolean; // default false -> schreibt timestamps/{device} = Date.now()
};

type TelRole = {
  allowSmsFallback?: boolean;
  tel?: string;
};

type SendResult = {
  ok: boolean;
  sent: number;
  numbers?: string[];
  rejectedDevices?: { deviceName: string; reason: string }[];
  provider?: { status?: number; bodyText?: string };
  deliveredMarked?: number;
  deliverWriteErrors?: { deviceName: string; status?: number; body?: string; error?: string }[];
};

/* ------------------------------ Utils --------------------------------- */

const sanitizeKey = (s: string) => s.replace(/[.\#$\[\]\/]/g, "_"); // erweitert um "/" wie in deiner rtdb-ack
const isValidE164 = (s?: string | null) => !!s && /^\+[1-9]\d{6,14}$/.test(s);
const unique = <T>(arr: T[]) => [...new Set(arr)];

function getHeaderToken(req: Request, headerName: string) {
  const v = req.headers.get(headerName);
  if (!v) return;
  if (headerName.toLowerCase() === "authorization" && v.toLowerCase().startsWith("bearer ")) {
    return v.slice(7);
  }
  return v;
}
function roleFromJwt(jwt?: string) {
  try {
    if (!jwt) return "none";
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    return payload.role ?? "unknown";
  } catch {
    return "invalid";
  }
}
function isServiceRoleJwt(jwt?: string) {
  try {
    if (!jwt) return false;
    const payload = JSON.parse(atob(jwt.split(".")[1]));
    return payload.role === "service_role";
  } catch {
    return false;
  }
}

/* ----------------------- Env & Supabase Client ------------------------ */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const RTDB_BASE_ENV = (Deno.env.get("RTDB_BASE") ?? "").replace(/\/+$/, "") + "/";
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON") ?? "";
const ALLOW_ANON_INVOKE = (Deno.env.get("ALLOW_ANON_INVOKE") ?? "").toLowerCase() === "true";

const supabaseUserClientFromAuthHeader = (authHeader?: string) =>
  SUPABASE_URL && ANON_KEY && authHeader
    ? createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } })
    : null;

/* ----------------------- Google SA OAuth for RTDB --------------------- */

let _cachedAccessToken: { token: string; exp: number } | null = null;
async function getGoogleAccessTokenFromSA(scopes: string[]): Promise<string> {
  if (!GCP_SA_JSON) throw new Error("Missing GCP_SA_JSON");
  const now = Math.floor(Date.now() / 1000);
  if (_cachedAccessToken && _cachedAccessToken.exp - 60 > now) return _cachedAccessToken.token;

  const sa = JSON.parse(GCP_SA_JSON) as { client_email: string; private_key: string; token_uri?: string };
  const aud = "https://oauth2.googleapis.com/token";
  const pk = await jose.importPKCS8(sa.private_key, "RS256");
  const assertion = await new jose.SignJWT({
    iss: sa.client_email,
    sub: sa.client_email,
    aud,
    iat: now,
    exp: now + 3600,
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/firebase.database"].join(" "),
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(pk);

  const res = await fetch(sa.token_uri ?? aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`OAuth token exchange failed ${res.status} ${res.statusText} – ${t}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  const token = json.access_token;
  const exp = now + (json.expires_in || 3600);
  _cachedAccessToken = { token, exp };
  return token;
}

/* --------------------------- RTDB Helpers ----------------------------- */

async function rtdbGetJson<T>(urlWithJson: string, bearer?: string): Promise<T | null> {
  const headers: HeadersInit = { "Cache-Control": "no-store" };
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${urlWithJson}`);
  return (await res.json()) as T;
}
async function rtdbPut(
  urlWithJson: string,
  body: unknown,
  bearer?: string,
): Promise<{ ok: boolean; status: number; bodyText: string }> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };
  if (bearer) (headers as any).Authorization = `Bearer ${bearer}`;
  const res = await fetch(urlWithJson, { method: "PUT", headers, body: JSON.stringify(body) });
  const bodyText = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, bodyText };
}
function appendAuthQuery(url: string, auth?: string) {
  if (!auth) return url;
  const u = new URL(url);
  u.searchParams.set("auth", auth); // klassisches ?auth=...
  return u.toString();
}

/* ---------------------- SMS Provider (TextBee) ------------------------ */

async function sendSmsViaTextBee(
  recipients: string[],
  message: string,
): Promise<{ status: number; bodyText: string }> {
  const deviceId = Deno.env.get("TEXTBEE_DEVICE_ID") ?? "";
  const apiKey = Deno.env.get("TEXTBEE_API_KEY") ?? "";
  if (!deviceId || !apiKey) throw new Error("TEXTBEE_DEVICE_ID/TEXTBEE_API_KEY fehlen");

  const url = `https://api.textbee.dev/api/v1/gateway/devices/${encodeURIComponent(deviceId)}/send-sms`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ recipients, message }),
  });
  const bodyText = await res.text().catch(() => "");
  if (!res.ok) throw new Error(`TextBee HTTP ${res.status} ${bodyText}`);
  return { status: res.status, bodyText };
}

/* ------------------------------ Auth ---------------------------------- */

async function isAuthorized(req: Request): Promise<boolean> {
  // Service‑Role via Authorization/apikey?
  const bearerToken = getHeaderToken(req, "authorization");
  const apikeyToken = getHeaderToken(req, "apikey");
  if ((bearerToken && isServiceRoleJwt(bearerToken)) || (apikeyToken && isServiceRoleJwt(apikeyToken))) return true;

  // Gültige User‑Session?
  const authHeader = req.headers.get("Authorization") ?? undefined;
  const userClient = supabaseUserClientFromAuthHeader(authHeader);
  if (userClient) {
    const { data, error } = await userClient.auth.getUser();
    if (!error && data.user) return true;
  }

  // Optional anonym, aber nur von erlaubter Origin
  if (ALLOW_ANON_INVOKE) {
    const origin = req.headers.get("Origin") ?? "";
    if (ALLOW_ORIGINS.has(origin)) return true;
  }
  return false;
}

/* ----------------------- Delivered markieren -------------------------- */

async function markDeliveredForDevices(params: {
  baseUrl: string;                    // mit abschließendem /
  recipientsPath: string;             // z.B. "notifications"
  messageId: string;
  deviceNames: string[];              // bereits gefiltert: nur wirklich gesendete Geräte
  bearer?: string;
  rtdbAuth?: string;
  writeTimestamp?: boolean;
}) {
  const {
    baseUrl, recipientsPath, messageId, deviceNames, bearer, rtdbAuth, writeTimestamp,
  } = params;

  const results: { ok: boolean; deviceName: string; status?: number; body?: string; error?: string }[] = [];
  const msg = encodeURIComponent(messageId);

  for (const dn of deviceNames) {
    const safe = sanitizeKey(dn);
    const deliveredUrl = `${baseUrl}${recipientsPath}/${msg}/recipients/${encodeURIComponent(safe)}.json`;
    const urlWithAuth = bearer ? deliveredUrl : appendAuthQuery(deliveredUrl, rtdbAuth);

    // 1) delivered = true
    const put1 = await rtdbPut(urlWithAuth, true, bearer);
    if (!put1.ok) {
      results.push({ ok: false, deviceName: dn, status: put1.status, body: put1.bodyText });
      continue;
    }

    // 2) optionaler Timestamp
    if (writeTimestamp) {
      const tsUrl = `${baseUrl}${recipientsPath}/${msg}/timestamps/${encodeURIComponent(safe)}.json`;
      const tsWithAuth = bearer ? tsUrl : appendAuthQuery(tsUrl, rtdbAuth);
      const put2 = await rtdbPut(tsWithAuth, Date.now(), bearer);
      if (!put2.ok) {
        results.push({ ok: false, deviceName: dn, status: put2.status, body: put2.bodyText });
        continue;
      }
    }

    results.push({ ok: true, deviceName: dn });
  }

  const deliveredMarked = results.filter(r => r.ok).length;
  const deliverWriteErrors = results.filter(r => !r.ok).map(r => ({
    deviceName: r.deviceName,
    status: r.status,
    body: r.body,
  }));

  return { deliveredMarked, deliverWriteErrors };
}

/* ------------------------------ Handler -------------------------------- */

Deno.serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { ...buildCorsHeaders(req), "Allow": "POST, OPTIONS" },
    });
  }

  // Auth
  if (!(await isAuthorized(req))) {
    return jsonWithCors(req, { ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Payload
  let payload: DirectRequest;
  try {
    payload = (await req.json()) as DirectRequest;
  } catch {
    return jsonWithCors(req, { ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const {
    messageId,
    recipientDeviceNames,
    smsText,
    rtdbBase,
    rolesPath = "roles",
    rtdbAuth,
    recipientsPath = "notifications",
    requireConsent = true,
    maxRecipientsPerCall,
    writeDeliveredTimestamp = false,
  } = payload ?? {};

  // Validierung
  if (!messageId) {
    return jsonWithCors(req, { ok: false, error: "Missing messageId" }, { status: 400 });
  }
  if (!Array.isArray(recipientDeviceNames) || recipientDeviceNames.length === 0) {
    return jsonWithCors(req, { ok: true, skipped: "no_recipients" });
  }
  if (!smsText) {
    return jsonWithCors(req, { ok: false, error: "Missing smsText" }, { status: 400 });
  }

  const baseUrl = ((rtdbBase?.trim() || RTDB_BASE_ENV.trim()) || "").replace(/\/+$/, "") + "/";
  if (!baseUrl) {
    return jsonWithCors(req, { ok: false, error: "Missing RTDB base (payload.rtdbBase or RTDB_BASE env)" }, { status: 400 });
  }

  // RTDB OAuth bevorzugt
  let bearer: string | undefined;
  try {
    if (GCP_SA_JSON) {
      bearer = await getGoogleAccessTokenFromSA([
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/firebase.database",
      ]);
    }
  } catch (e) {
    console.warn("[sms-direct] OAuth token error", e);
  }

  try {
    // 1) Rollen/Telefonnummern laden
    const lookups = recipientDeviceNames.map(async (dn) => {
      const roleUrl = `${baseUrl}${rolesPath}/${encodeURIComponent(dn)}.json`;
      try {
        const data = (await rtdbGetJson<TelRole>(
          bearer ? roleUrl : appendAuthQuery(roleUrl, rtdbAuth),
          bearer,
        )) ?? {};
        const tel = data.tel;
        const consentOk = requireConsent ? !!data.allowSmsFallback : true;
        if (!isValidE164(tel)) return { deviceName: dn, tel: null, reason: "no_or_invalid_e164" as const };
        if (!consentOk) return { deviceName: dn, tel: null, reason: "no_consent" as const };
        return { deviceName: dn, tel, reason: null as null };
      } catch {
        return { deviceName: dn, tel: null, reason: "lookup_failed" as const };
      }
    });

    const resolved = await Promise.all(lookups);
    const sendPairs = resolved.filter(r => !!r.tel) as { deviceName: string; tel: string; reason: null }[];
    const numbersDedup = unique(sendPairs.map(p => p.tel));
    const rejectedDevices = resolved
      .filter((r) => !r.tel)
      .map((r) => ({ deviceName: r.deviceName, reason: r.reason! }));

    if (numbersDedup.length === 0) {
      // Nichts zu senden -> optional trotzdem delivered=false NICHT schreiben
      return jsonWithCors(req, {
        ok: true,
        sent: 0,
        numbers: [],
        rejectedDevices,
        deliveredMarked: 0,
        info: "no_tel_or_consent",
      });
    }

    // 2) SMS senden (Chunking optional)
    const chunks: string[][] = [];
    const limit = Math.max(1, Math.min(Number(maxRecipientsPerCall || numbersDedup.length), numbersDedup.length));
    for (let i = 0; i < numbersDedup.length; i += limit) chunks.push(numbersDedup.slice(i, i + limit));

    let totalSent = 0;
    let lastProvider: { status?: number; bodyText?: string } | undefined;
    const message = smsText.slice(0, 280);

    for (const chunk of chunks) {
      const { status, bodyText } = await sendSmsViaTextBee(chunk, message);
      lastProvider = { status, bodyText };
      totalSent += chunk.length;
    }

    // 3) delivered=true in RTDB für ALLE Geräte, denen wir eine SMS geschickt haben
    //    (auch wenn wegen Dedup die gleiche Nummer mehrfach vorkam – wir markieren alle Geräte)
    const actuallySentDeviceNames = sendPairs.map(p => p.deviceName);
    const { deliveredMarked, deliverWriteErrors } = await markDeliveredForDevices({
      baseUrl,
      recipientsPath,
      messageId,
      deviceNames: actuallySentDeviceNames,
      bearer,
      rtdbAuth,
      writeTimestamp: writeDeliveredTimestamp,
    });

    const response: SendResult = {
      ok: true,
      sent: totalSent,
      numbers: numbersDedup,
      rejectedDevices,
      provider: lastProvider,
      deliveredMarked,
      ...(deliverWriteErrors.length ? { deliverWriteErrors } : {}),
    };
    return jsonWithCors(req, response);

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonWithCors(req, { ok: false, error: message }, { status: 500 });
  }
});
