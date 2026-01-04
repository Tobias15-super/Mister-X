// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RTDB_BASE = Deno.env.get("RTDB_BASE") ?? "";
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON") ?? "";

// Minimal helpers copied from send-to-all for signed service account access
const tokenCache = new Map();
async function getAccessToken(scopes) {
  const scopeStr = Array.isArray(scopes) ? scopes.join(" ") : scopes;
  const now = Math.floor(Date.now() / 1000);
  const cached = tokenCache.get(scopeStr);
  if (cached && now < cached.exp - 60) return cached.token;

  const sa = JSON.parse(GCP_SA_JSON || "{}");
  const iat = now, exp = now + 3600;
  const aud = sa.token_uri ?? "https://oauth2.googleapis.com/token";
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iss: sa.client_email, scope: scopeStr, aud, iat, exp };

  const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const unsigned = `${enc(header)}.${enc(payload)}`;
  const signature = await signWithPemRS256(sa.private_key, unsigned);
  const assertion = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  if (!res.ok) throw new Error(`OAuth token fetch failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  tokenCache.set(scopeStr, { token: json.access_token, exp: now + Math.min(json.expires_in ?? 3600, 3600) });
  return json.access_token;
}

function b64url(input) {
  return btoa(String.fromCharCode(...input)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
async function signWithPemRS256(pem, data) {
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
function pemToPkcs8(pem) {
  const body = pem.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s+/g, "");
  const raw = atob(body);
  const buf = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) buf[i] = raw.charCodeAt(i);
  return buf.buffer;
}

function sanitizeKey(key) {
  return (key ?? "").replace(/[.\#\$\[\]\/]/g, "_");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });

  try {
    const payload = await req.json();
    const deviceIds = Array.isArray(payload.deviceIds) ? payload.deviceIds : (payload.deviceId ? [payload.deviceId] : []);
    const rtdbBase = payload.rtdbBase ?? RTDB_BASE;
    if (!rtdbBase) throw new Error('RTDB_BASE not configured');

    const rtdbToken = await getAccessToken([
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/firebase.database",
    ]);

    const headers = { Authorization: `Bearer ${rtdbToken}`, "Cache-Control": "no-store" };

    const results = {};
    for (const rawId of deviceIds) {
      const id = sanitizeKey(rawId);
      const url = `${rtdbBase}/roles/${encodeURIComponent(id)}.json`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        results[id] = { exists: false, allowSmsFallback: null };
        continue;
      }
      const data = await res.json();
      if (!data) {
        results[id] = { exists: false, allowSmsFallback: null };
      } else {
        // Return whether a tel exists and the current allowSmsFallback flag (no phone numbers).
        results[id] = {
          exists: !!data.tel,
          allowSmsFallback: (data.allowSmsFallback !== undefined) ? !!data.allowSmsFallback : null,
        };
      }
    }

    return new Response(JSON.stringify({ results }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
});

