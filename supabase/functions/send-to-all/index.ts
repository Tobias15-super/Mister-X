// supabase/functions/send-to-all/index.ts
// Deno Edge Function (TypeScript)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!; // oder SERVICE_ROLE_KEY falls nötig
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SERVICE_ROLE_KEY") ?? "";
const SMS_FALLBACK_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? Deno.env.get("SMS_SECRET") ?? "";

// const fcmKey = Deno.env.get("FCM_SERVER_KEY")!; // (legacy, nicht mehr benötigt für HTTP v1)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RTDB_BASE_FALLBACK = Deno.env.get("RTDB_BASE") ?? "";
const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID")!;
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON")!;

const FIVE_MIN = 60 * 60 * 1000; // 60 Minuten
const OAUTH_SCOPES = {
  FCM: ["https://www.googleapis.com/auth/firebase.messaging"],
  RTDB: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/firebase.database",
  ],
} as const;

const sa = JSON.parse(Deno.env.get("GCP_SA_JSON") ?? "{}");
if (sa.project_id && sa.project_id !== FIREBASE_PROJECT_ID) {
  console.error("Service-Account-Projekt passt nicht:", { saProject: sa.project_id, fcmProject: FIREBASE_PROJECT_ID });
  throw new Error(`Service account project (${sa.project_id}) != FIREBASE_PROJECT_ID (${FIREBASE_PROJECT_ID})`);
}

async function deleteOldNotifications(opts: {
  rtdbBase: string;
  cutoffMs: number;
  keep?: string[];
  batchSize?: number; // default 500
}) {
  const { rtdbBase, cutoffMs, keep = [], batchSize = 500 } = opts;
  const rtdbToken = await getAccessToken(OAUTH_SCOPES.RTDB);
  const headersBase = {
    "Cache-Control": "no-store",
    "Authorization": `Bearer ${rtdbToken}`,
  };
  const orderBy = encodeURIComponent('"timestamp"');
  let totalDeleted = 0;

  while (true) {
    const listUrl = `${rtdbBase}/notifications.json?orderBy=${orderBy}&endAt=${cutoffMs}&limitToFirst=${batchSize}`;
    const res = await fetch(listUrl, { headers: headersBase });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`cleanup list failed: HTTP ${res.status} ${txt}`);
    }
    const map = (await res.json()) as Record<string, { timestamp?: number }> | null;
    if (!map || Object.keys(map).length === 0) break;

    const ids = Object.keys(map).filter((id) => !keep.includes(id));
    if (ids.length === 0) break;

    const patch = Object.fromEntries(ids.map((id) => [id, null]));
    const patchUrl = `${rtdbBase}/notifications.json`;
    const delRes = await fetch(patchUrl, {
      method: "PATCH",
      headers: { ...headersBase, "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!delRes.ok) {
      const txt = await delRes.text().catch(() => "");
      throw new Error(`cleanup patch failed: HTTP ${delRes.status} ${txt}`);
    }
    totalDeleted += ids.length;
    if (ids.length < batchSize) break;
  }
  return totalDeleted;
}

function sanitizeKey(key: string) {
  return (key ?? "").replace(/[.\#\$\[\]\/]/g, "_");
}

async function fetchNamesForTokens(tokens: string[]): Promise<Record<string, string>> {
  if (!tokens.length) return {};
  // Read token -> deviceName mapping from RTDB and invert
  const rtdbToken = await getAccessToken(OAUTH_SCOPES.RTDB);
  const url = `${RTDB_BASE_FALLBACK}/tokens.json`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${rtdbToken}`, "Cache-Control": "no-store" } });
  if (!res.ok) throw new Error(`RTDB token fetch failed: ${res.status} ${await res.text()}`);
  const map = (await res.json()) as Record<string, string> | null;
  const out: Record<string, string> = {};
  if (!map) return out;
  for (const [device, token] of Object.entries(map)) {
    if (token && tokens.includes(String(token))) out[String(token)] = device;
  }
  return out;
}

/**
 * Sendet Web/FCM-Nachrichten über den FCM HTTP v1 Endpoint.
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
  const deduped = [...new Set((tokens ?? []).filter(Boolean))];
  const looksLikeFcmToken = (t: string) => typeof t === "string" && t.length > 100 && t.includes(":");
  const invalidTokens: string[] = [];
  const validTokens = deduped.filter((t) => {
    const ok = looksLikeFcmToken(t);
    if (!ok) invalidTokens.push(String(t));
    return ok;
  });
  if (validTokens.length === 0) {
    const errorsByToken = Object.fromEntries(invalidTokens.map((t) => [t, { status: 400, message: "invalid-token-shape" }]));
    return { ok: false, successTokens: [], failedTokens: invalidTokens, unregistered: [], errorsByToken };
  }

  const fcmUrl = `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`;
  const accessToken = await getAccessToken(OAUTH_SCOPES.FCM); // <— FIX

  const toStr = (v: unknown) => (v == null ? "" : String(v));
  const errorsByToken: Record<string, { status: number; errorCode?: string; message?: string; raw?: unknown }> = {};

  const sendOne = async (token: string) => {
    const now = Date.now();
    const payload = {
      message: {
        token,
        data: {
          title: toStr(title),
          body: toStr(body),
          url: toStr(link),
          messageId: toStr(messageId ?? ""),
          token, // NEU: Token mitsenden!
          serverSentAt: String(now)
        },
        webpush: { headers: { Urgency: "high", TTL: "120" } },
      },
    };
    const res = await fetch(fcmUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch {}
    if (!res.ok) {
      const errorCode = json?.error?.details?.[0]?.errorCode;
      errorsByToken[token] = { status: res.status, errorCode, message: json?.error?.message ?? text, raw: json ?? text };
      throw new Error(`FCM v1 send failed (${res.status})`);
    }
    return { token, response: json };
  };

  const results = await Promise.allSettled(validTokens.map(sendOne));
  const successTokens: string[] = [];
  const failedTokens: string[] = [...invalidTokens];
  const unregistered: string[] = [];

  results.forEach((r, idx) => {
    const token = validTokens[idx];
    if (r.status === "fulfilled") {
      successTokens.push(token);
    } else {
      failedTokens.push(token);
      const code = errorsByToken[token]?.errorCode;
      if (code === "UNREGISTERED") unregistered.push(token);
    }
  });

  const ok = successTokens.length > 0;
  return { ok, successTokens, failedTokens, unregistered, errorsByToken };
}

type SaJson = { client_email: string; private_key: string; token_uri?: string };

const tokenCache = new Map<string, { token: string; exp: number }>();
async function getAccessToken(scopes: string | readonly string[]): Promise<string> {
  const scopeStr = Array.isArray(scopes) ? (scopes as readonly string[]).join(" ") : scopes;
  const now = Math.floor(Date.now() / 1000);
  const cached = tokenCache.get(scopeStr);
  if (cached && now < cached.exp - 60) return cached.token;

  const sa: SaJson = JSON.parse(GCP_SA_JSON);
  const iat = now, exp = now + 3600;
  const aud = sa.token_uri ?? "https://oauth2.googleapis.com/token";
  const header = { alg: "RS256", typ: "JWT" } as const;
  const payload = { iss: sa.client_email, scope: scopeStr, aud, iat, exp };

  const enc = (obj: unknown) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const unsigned = `${enc(header)}.${enc(payload)}`;
  const signature = await signWithPemRS256(sa.private_key, unsigned);
  const assertion = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  if (!res.ok) throw new Error(`OAuth token fetch failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache.set(scopeStr, { token: json.access_token, exp: now + Math.min(json.expires_in ?? 3600, 3600) });
  return json.access_token;
}

function b64url(input: Uint8Array) {
  return btoa(String.fromCharCode(...input))
    .replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
async function signWithPemRS256(pem: string, data: string): Promise<Uint8Array> {
  const pkcs8 = pemToPkcs8(pem);
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pkcs8,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(data));
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

function buildTimingSummary(timings: Record<string, number>) {
  const phases = [
    { key: 'payloadParsed', label: '📥 Payload parsed' },
    { key: 'rtdbTokenObtained', label: '🔑 RTDB token obtained' },
    { key: 'rolesResolved', label: '👥 Roles resolved (parallel)' },
    { key: 'allTokensFetched', label: '📲 All tokens fetched' },
    { key: 'settingsChecked', label: '⚙️  Settings checked' },
    { key: 'recipientsMapBuilt', label: '📋 Recipients map built' },
    { key: 'notificationWritten', label: '💾 Notification written' },
    { key: 'fcmSent', label: '🔔 FCM sent' },
    { key: 'fallbackScheduled', label: '📤 SMS fallback scheduled' },
    { key: 'instantSmsSent', label: '⚡ Instant SMS sent' },
    { key: 'resultAndCleanup', label: '🧹 Result patch + cleanup (parallel)' },
    { key: 'end', label: '✅ Done' }
  ];

  const summary: Record<string, string> = {};
  let prev = timings.start;

  phases.forEach(({ key, label }) => {
    if (timings[key]) {
      const delta = timings[key] - prev;
      summary[label] = `+${delta}ms`;
      prev = timings[key];
    }
  });

  return summary;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  const timings: Record<string, number> = { start: Date.now() };

  try {
    // --- parse payload ---
    const payload = await req.json();
    timings.payloadParsed = Date.now();

    const {
      title,
      body,
      tokens: providedTokens,
      senderName,
      link = "/Mister-X/",
      messageId: providedMessageId,
      rtdbBase = RTDB_BASE_FALLBACK,
      setRecipientsMode = "none", // 'set_once' | 'append' | 'none'
      attempt = 1,
      roles: providedRoles = [],  // NEU: Rollen optional
      resolveRecipientsAtSendTime = false, // NEU: Flag zur dynamischen Auflösung
    } = payload;

    // ensure messageId exists before any early uses
    const messageId = providedMessageId ?? crypto.randomUUID();

    // recipientDeviceNames may be reassigned later -> use let
    let recipientDeviceNames: string[] = Array.isArray(payload.recipientDeviceNames) ? payload.recipientDeviceNames : [];


    if (!title || !body) {
      return new Response(JSON.stringify({ error: "title and body required" }), { status: 400, headers: corsHeaders });
    }
    if (!rtdbBase) {
      return new Response(JSON.stringify({ error: "rtdbBase missing" }), { status: 400, headers: corsHeaders });
    }

    // RTDB-Access-Token vorab holen und Header zusammenstellen
    const rtdbAccessToken = await getAccessToken(OAUTH_SCOPES.RTDB);
    const rtdbAuthHeaders = { Authorization: `Bearer ${rtdbAccessToken}` };
    timings.rtdbTokenObtained = Date.now();

    // 1) Tokenliste holen (falls nicht geliefert oder "resolveRecipientsAtSendTime" gesetzt)
    let tokenList: string[] = [];
    let instantSmsCandidates: string[] = []; // NEU: Track instant SMS devices globally
    const rolesRequested = Array.isArray(providedRoles) && providedRoles.length > 0;

    if (!resolveRecipientsAtSendTime && Array.isArray(providedTokens) && providedTokens.length > 0) {
      tokenList = [...new Set(providedTokens)].filter(Boolean);
    } else if (resolveRecipientsAtSendTime && rolesRequested) {
      // Holen Tokens für die angegebenen Rollen ermitteln (dynamisch zur Versandzeit)
      // 1) Parallel fetch roles + tokens from RTDB
      const [rolesRes, tokensRes] = await Promise.all([
        fetch(`${rtdbBase}/roles.json`, { headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" } }),
        fetch(`${rtdbBase}/tokens.json`, { headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" } })
      ]);
      
      if (!rolesRes.ok) throw new Error(`RTDB roles fetch failed: ${rolesRes.status} ${await rolesRes.text().catch(() => '')}`);
      
      const [rolesMap, tokensMap] = await Promise.all([
        rolesRes.json().then(r => r || {}),
        tokensRes.ok ? tokensRes.json().then(r => r || {}) : Promise.resolve({})
      ]);
      
      const deviceNamesForPush: string[] = [];
      
      for (const dev of Object.keys(rolesMap)) {
        const r = rolesMap[dev];
        
        // 🚨 WICHTIG: notification:false → komplett ignorieren
        if (r?.notification === false) {
          // skip devices that disabled notifications
          continue;
        }
        
        // Nur wenn Rolle matcht
        if (r && r.role && providedRoles.includes(r.role)) {
          // 🟨 InstantSMS? → zur instantSmsCandidates, NICHT zu Push
          if (r.instantSMS === true) {
            instantSmsCandidates.push(dev);
          } else {
            // 🟦 Push-Kandidat (es sei denn, notification:false, was wir oben schon prüfen)
            deviceNamesForPush.push(dev);
          }
        }
      }

      // 2) Collect tokens NUR für Push-Kandidaten (instantSMS ausgeschlossen!)
      tokenList = [...new Set(deviceNamesForPush.map(d => tokensMap?.[d]).filter(Boolean))];
      timings.rolesResolved = Date.now();
      recipientDeviceNames = deviceNamesForPush.filter(Boolean) as string[];

      // Wenn KEINE Tokens und KEINE InstantSMS → Notification ohne Empfänger anlegen + return
      if (tokenList.length === 0 && instantSmsCandidates.length === 0) {
        const now = Date.now();
        const notif = {
          sender: senderName ?? "Unbekannt",
          title,
          body,
          recipients: {}, // KEINE Empfänger
          timestamp: now,
          attempts: { [attempt]: { at: now, count: 0 } },
          lastAttemptAt: now,
        };
        const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
          method: "PUT",
          headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
          body: JSON.stringify(notif),
        });

        if (!putRes.ok) {
          console.error("[send-to-all] Could not write notif while roles resolved to no recipients:", await putRes.text().catch(() => ""));
        } else {
          console.log("[send-to-all] roles resolved to no recipients -> notification written without recipients", { messageId, providedRoles });
        }

        return new Response(JSON.stringify({ ok: true, skipped: "no_recipients_for_roles", messageId }), {
          status: 200,
          headers: corsHeaders,
        });
      }
    } else {
      // fallback: hole alle Tokens aus RTDB
      const tokensRes = await fetch(`${rtdbBase}/tokens.json`, { headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" } });
      const tokensMap = tokensRes.ok ? await tokensRes.json() : {};
      tokenList = [...new Set((Object.values(tokensMap || {}) as string[]).filter(Boolean))];
      timings.allTokensFetched = Date.now();
    }


    // --- NEW: Check global setting in RTDB "settings/messages" ---
    try {
      const settingsUrl = `${rtdbBase}/settings/messages.json`;
      const settingsRes = await fetch(settingsUrl, { headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" } });
      if (settingsRes.ok) {
        const val = await settingsRes.json().catch(() => null);
        const messagesEnabled = val === null ? true : !!val;
        if (!messagesEnabled) {
          const now = Date.now();

          // Create an explicit notification entry with empty recipients
          const notif = {
            sender: senderName ?? "Unbekannt",
            title,
            body,
            recipients: {}, // NO recipients when messages are disabled
            timestamp: now,
            attempts: { [attempt]: { at: now, count: 0 } },
            lastAttemptAt: now,
          };

          const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
            method: "PUT",
            headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
            body: JSON.stringify(notif),
          });

          if (!putRes.ok) {
            console.error("[send-to-all] Could not write notif while messages disabled:", await putRes.text().catch(() => ""));
          } else {
            console.log("[send-to-all] messages disabled -> notification written without recipients", { messageId });
          }

          return new Response(JSON.stringify({ ok: true, skipped: "messages_disabled", messageId }), {
            status: 200,
            headers: corsHeaders,
          });
        }
      }
    } catch (err) {
      // If something goes wrong during read, continue with sending (fail-open)
      console.warn("[send-to-all] Could not read settings/messages - proceeding with send:", err);
    timings.settingsChecked = Date.now();
    }

    // 3) recipientsMap nur beim 1. Versuch setzen
    let recipientsMap: Record<string, boolean> | null = null;
    
    // 4) Notification-Check und FCM-Send können vorbereitet werden, während recipientsMap erstellt wird
    const notifCheckPromise = fetch(`${rtdbBase}/notifications/${messageId}.json`, {
      headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" },
    });

    if (setRecipientsMode === "set_once") {

      const names = new Set<string>();
      
      // 1) Push-Empfänger aus recipientDeviceNames
      for (const n of Array.isArray(recipientDeviceNames) ? recipientDeviceNames : []) {
        const safe = sanitizeKey(n);
        if (safe) names.add(safe);
      }
      
      // 2) Fallback: aus tokens Namen ableiten, falls recipientDeviceNames leer
      if (names.size === 0) {
        const map = await fetchNamesForTokens(tokenList);
        Object.values(map).forEach((n) => { if (n) names.add(sanitizeKey(n)); });
      }
      
      // 3) WICHTIG: InstantSMS-Geräte IMMER hinzufügen (getrennte Empfängerkategorie)
      instantSmsCandidates.forEach((n) => { if (n) names.add(sanitizeKey(n)); });
      
      recipientsMap = {};
      names.forEach((n) => { (recipientsMap as any)[n] = false; });
    timings.recipientsMapBuilt = Date.now();
    }

    // 5) Notification-Dokument erstellen oder patchen
    const notifBase = { sender: senderName ?? "Unbekannt", title, body };
    const now = Date.now();

    // a) existiert? (nutze vorbereiteten Request)
    {
      const getRes = await notifCheckPromise;
      const existing = getRes.ok ? await getRes.json() : null;

      if (!existing) {
        const notif = {
          ...notifBase,
          recipients: recipientsMap ?? {},
          timestamp: now,
          // Count basierend auf tokenList (Push-Versuche), InstantSMS wird separat getrackt
          attempts: { [attempt]: { at: now, count: Array.isArray(tokenList) ? tokenList.length : 0 } },
          lastAttemptAt: now,
        };
        const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
          method: "PUT",
          headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
          body: JSON.stringify(notif),
        });
        if (!putRes.ok) console.error("RTDB initial write failed:", await putRes.text());
      } else {
        const patch: any = {
          lastAttemptAt: now,
          [`attempts/${attempt}`]: { at: now, count: Array.isArray(tokenList) ? tokenList.length : 0 },
        };
        if (setRecipientsMode === "set_once" && recipientsMap) {
          Object.keys(recipientsMap).forEach((k) => {
            patch[`recipients/${k}`] = existing?.recipients?.[k] ?? false;
          });
        }
        const patchRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
          method: "PATCH",
          headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!patchRes.ok) console.error("RTDB patch failed:", await patchRes.text());
    timings.notificationWritten = Date.now();
      }
    }

    // 5) Senden
    timings.fcmSent = Date.now();
    const { ok, successTokens, failedTokens, unregistered, errorsByToken } =
      await sendFcmToTokens(title, body, link, tokenList, messageId);

    // 5a) SMS-Fallback triggern - prefer sending only to devices whose push failed
    // Reduce latency by only scheduling fallback for failed push recipients (shorter wait when possible)
    if (recipientDeviceNames.length > 0) {
      const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);

      // Map failed tokens back to device names (if possible)
      let fallbackRecipients = recipientDeviceNames;
      try {
        const failedDeviceMap = await fetchNamesForTokens(failedTokens);
        const mapped = Object.values(failedDeviceMap || {});
        if (mapped && mapped.length > 0) {
          // Only send fallback to genuinely failed devices
          fallbackRecipients = [...new Set(mapped)];
        }
      } catch (e) {
        console.warn('[send-to-all] Could not map failed tokens to device names, falling back to all push recipients:', e);
      }
      
      // 🚨 WICHTIG: Exkludiere instantSmsCandidates aus Fallback (sonst Doppel-SMS!)
      if (instantSmsCandidates.length > 0) {
        const instantSet = new Set(instantSmsCandidates);
        fallbackRecipients = fallbackRecipients.filter(d => !instantSet.has(d));
        console.log('[send-to-all] Excluded instant-SMS candidates from fallback:', { 
          excluded: instantSmsCandidates.length, 
          fallbackRemaining: fallbackRecipients.length 
        });
      }

      // Überspringe Fallback wenn keine Empfänger (z.B. alle sind instant-SMS)
      if (fallbackRecipients.length === 0) {
        console.log('[send-to-all] No fallback recipients after excluding instant-SMS - skipping fallback');
      } else {
        // Wait shorter if we already know which devices actually failed
        const waitSec = (Array.isArray(fallbackRecipients) && fallbackRecipients.length > 0 && fallbackRecipients.length < recipientDeviceNames.length) ? 10 : 15;

        const smsFallbackPayload = {
        messageId,
        recipientDeviceNames: fallbackRecipients, // Push failed recipients (or all if mapping failed)
        smsText,
        waitSec,
        rtdbBase,
        rolesPath: "roles",
        recipientsPath: "notifications",
      };

      try {
        const smsHeaders: Record<string,string> = { "Content-Type": "application/json" };
        if (SERVICE_KEY) {
          smsHeaders['Authorization'] = `Bearer ${SERVICE_KEY}`;
          smsHeaders['apikey'] = SERVICE_KEY;
        }
        if (SMS_FALLBACK_SECRET) smsHeaders['x-sms-secret'] = SMS_FALLBACK_SECRET;

        const fallbackRes = await fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/sms-fallback", {
          method: "POST",
          headers: smsHeaders,
          body: JSON.stringify(smsFallbackPayload),
        });

        if (!fallbackRes.ok) {
          const fbText = await fallbackRes.text().catch(() => "");
          console.error("[send-to-all] sms-fallback for push recipients failed:", { status: fallbackRes.status, text: fbText.slice(0, 200) });
        } else {
          const fbData = await fallbackRes.json().catch(() => ({}));
          console.log("[send-to-all] sms-fallback scheduled for push recipients:", { recipients: fallbackRecipients, waitSec, fbData });
        }
      } catch (err) {
        console.error("[send-to-all] sms-fallback invoke failed:", err);
    timings.fallbackScheduled = Date.now();
      }
      }
    }

    // 5b) NEU: Instant-SMS senden falls vorhanden
    if (instantSmsCandidates.length > 0) {
      const instantSmsStartTime = Date.now();
      console.log(`[send-to-all] Starting instant-SMS for ${instantSmsCandidates.length} recipients at ${new Date(instantSmsStartTime).toISOString()}`);
      const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);
      
      const smsDirectPayload = {
        messageId,
        recipientDeviceNames: instantSmsCandidates,
        smsText,
        rtdbBase,
        rolesPath: "roles",
        recipientsPath: "notifications",
        requireConsent: true,
        writeDeliveredTimestamp: true,
      };

      // Ensure a notification entry exists that includes instant-SMS recipients
      try {
        const notifUrl = `${rtdbBase}/notifications/${messageId}.json`;
        const getNotifRes = await fetch(notifUrl, { headers: { ...rtdbAuthHeaders, "Cache-Control": "no-store" } });
        const existingNotif = getNotifRes.ok ? await getNotifRes.json() : null;

        if (!existingNotif) {
          const recipientsMap: Record<string, boolean> = {};
          instantSmsCandidates.forEach(d => { const k = sanitizeKey(d); if (k) recipientsMap[k] = false; });
          const notif = {
            sender: senderName ?? "Unbekannt",
            title,
            body,
            recipients: recipientsMap,
            timestamp: Date.now(),
            attempts: { [attempt]: { at: Date.now(), count: Array.isArray(tokenList) ? tokenList.length : 0 } },
            lastAttemptAt: Date.now(),
          };
          const putRes = await fetch(notifUrl, {
            method: "PUT",
            headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
            body: JSON.stringify(notif),
          });
          if (!putRes.ok) console.error("[send-to-all] RTDB write for instant-sms notification failed:", await putRes.text().catch(() => ""));
        } else {
          const patch: any = {};
          instantSmsCandidates.forEach(d => {
            const k = sanitizeKey(d);
            if (k && existingNotif?.recipients?.[k] === undefined) patch[`recipients/${k}`] = false;
          });
          if (Object.keys(patch).length > 0) {
            const patchRes = await fetch(notifUrl, {
              method: "PATCH",
              headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
              body: JSON.stringify(patch),
            });
            if (!patchRes.ok) console.error("[send-to-all] RTDB patch for instant-sms recipients failed:", await patchRes.text().catch(() => ""));
          }
        }
      } catch (err) {
        console.warn("[send-to-all] Could not ensure notification entry for instant-sms:", err);
      }

      try {
        const smsHeaders: Record<string,string> = { "Content-Type": "application/json" };
        if (SERVICE_KEY) {
          smsHeaders['Authorization'] = `Bearer ${SERVICE_KEY}`;
          smsHeaders['apikey'] = SERVICE_KEY;
        }
        if (SMS_FALLBACK_SECRET) smsHeaders['x-sms-secret'] = SMS_FALLBACK_SECRET;

        // Fire-and-forget: sms-direct asynchron ausführen, um Response nicht zu blockieren
        fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/sms-direct", {
          method: "POST",
          headers: smsHeaders,
          body: JSON.stringify(smsDirectPayload),
        }).then(async (smsRes) => {
          const instantSmsElapsed = Date.now() - instantSmsStartTime;
          if (!smsRes.ok) {
            const smsText = await smsRes.text().catch(() => "");
            console.error("[send-to-all] sms-direct failed:", { status: smsRes.status, text: smsText.slice(0, 200), elapsed: instantSmsElapsed });
          } else {
            const smsData = await smsRes.json().catch(() => ({}));
            console.log("[send-to-all] sms-direct completed:", { sent: smsData?.sent, rejected: smsData?.rejectedDevices, elapsed: instantSmsElapsed });
          }
        }).catch((err) => {
          console.error("[send-to-all] sms-direct invoke failed:", err, { elapsed: Date.now() - instantSmsStartTime });
        });
        
        console.log("[send-to-all] sms-direct triggered in background for", instantSmsCandidates.length, "recipients");
      } catch (err) {
        console.error("[send-to-all] sms-direct setup failed:", err);
      }

      // 5c) NEU: Falls KEINE Tokens, aber Instant-SMS -> früh returnen
      if (tokenList.length === 0) {
        timings.end = Date.now();
        const duration = timings.end - timings.start;
        console.log("[send-to-all] Only instant SMS recipients - returning early");
        console.log(`[send-to-all] ⏱️ TIMING SUMMARY (total: ${duration}ms):`, buildTimingSummary(timings));
        return new Response(
          JSON.stringify({ ok: true, messageId, smsSent: instantSmsCandidates.length, note: "instant_sms_only" }),
          { status: 200, headers: corsHeaders },
        );
      }
    }
    timings.instantSmsSent = Date.now();

    // 6) Ergebnis protokollieren & Cleanup parallel starten
    const resultPatch: any = {
      lastAttemptAt: now,
      [`attempts/${attempt}/success`]: successTokens.length,
      [`attempts/${attempt}/failed`]: failedTokens.length,
    };
    if (failedTokens.length) resultPatch[`attempts/${attempt}/failedTokens`] = failedTokens.slice(0, 50);

    // Parallel: Result patchen & Cleanup
    const [patchRes2, cleanupResult] = await Promise.allSettled([
      fetch(`${rtdbBase}/notifications/${messageId}.json`, {
        method: "PATCH",
        headers: { ...rtdbAuthHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(resultPatch),
      }),
      (async () => {
        try {
          const cutoff = Date.now() - FIVE_MIN;
          const deleted = await deleteOldNotifications({ rtdbBase, cutoffMs: cutoff, keep: [messageId] });
          if (deleted > 0) console.log(`Cleanup: ${deleted} alte Notification(s) gelöscht (<= ${new Date(cutoff).toISOString()})`);
          return deleted;
        } catch (e) {
          console.warn("Cleanup fehlgeschlagen:", e);
          return 0;
        }
      })()
    ]);

    if (patchRes2.status === 'fulfilled' && !patchRes2.value.ok) {
      console.error("RTDB attempt result patch failed:", await patchRes2.value.text());
    }
    timings.resultAndCleanup = Date.now();

    // 7) Aufräumen (bereits oben parallel durchgeführt, entfernt den separaten Block)

    timings.end = Date.now();
    const totalDuration = timings.end - timings.start;
    
    // Detailliertes Timing-Log
    const timingSummary = buildTimingSummary(timings);
    console.log(`[send-to-all] ⏱️ TIMING SUMMARY (total: ${totalDuration}ms):`, timingSummary);

    return new Response(
      JSON.stringify({ ok, messageId, successTokens, failedTokens, unregistered, errorsByToken }),
      { status: 200, headers: corsHeaders },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
