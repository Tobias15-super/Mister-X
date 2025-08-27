// Deno Deploy (Supabase Edge Functions)
// Schreibt delivered=true nach RTDB unter
// /notifications/{messageId}/recipients/{deviceNameSanitized}

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};


const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID")!;
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON")!; // Service-Account JSON (als String)
const RTDB_BASE = (Deno.env.get("RTDB_BASE") ?? "").replace(/\/$/, ""); // z.B. https://<db>.europe-west1.firebasedatabase.app
const rtdbBase = RTDB_BASE || `https://${FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`;

type AckBody = { messageId?: string; deviceName?: string; timestamp?: number };

function sanitizeKey(key = "") {
  return key.replace(/[.#$/\[\]\/]/g, "_");
}

function log(...args: unknown[]) {
  console.log("[rtdb-ack]", ...args);
}

// --- Access Token aus Service Account erstellen (OAuth2 JWT Bearer) ---
async function getAccessToken(scopes: string[]): Promise<string> {
  const sa = JSON.parse(GCP_SA_JSON);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 5 * 60,
  };

  log("SA:", { client_email: sa.client_email, project_id: sa.project_id });
  log("JWT claim:", { aud: claim.aud, scopes: scopes });

  const enc = (obj: unknown) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(obj))))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const unsigned = `${enc(header)}.${enc(claim)}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    (() => {
      const pem = sa.private_key as string;
      const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
      const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      return raw.buffer;
    })(),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBuf = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const signature = btoa(String.fromCharCode(...new Uint8Array(sigBuf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const assertion = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-store" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const txt = await res.text();
  if (!res.ok) {
    log("OAuth token exchange failed:", res.status, txt);
    throw new Error(`token exchange failed: HTTP ${res.status} ${txt}`);
  }
  const json = JSON.parse(txt);
  log("OAuth token acquired, expires_in:", json.expires_in);

  return json.access_token as string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { ...corsHeaders, "Content-Type": "text/plain" } });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messageId, deviceName, timestamp }: AckBody = await req.json().catch(() => ({}));
    if (!messageId || !deviceName) {
      return new Response(JSON.stringify({ error: "messageId and deviceName are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const safeDevice = sanitizeKey(deviceName);
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/firebase.database",
    ];
    const accessToken = await getAccessToken(scopes);

    const path = `/notifications/${encodeURIComponent(messageId)}/recipients/${encodeURIComponent(safeDevice)}.json`;
    const urlWithQuery = `${rtdbBase}${path}?access_token=${encodeURIComponent(accessToken)}`;
    const urlForLog = `${rtdbBase}${path}?access_token=***`;
    log("RTDB_BASE:", rtdbBase);
    log("PUT url:", urlForLog);

    // 1) PUT delivered=true (mit Bearer + access_token)
    const res = await fetch(urlWithQuery, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(true),
    });

    const putTxt = await res.text();
    log("PUT status:", res.status, "body:", putTxt);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `RTDB write failed`, status: res.status, body: putTxt }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Optional: timestamp separat setzen
    if (typeof timestamp === "number") {
      const tsPath = `/notifications/${encodeURIComponent(messageId)}/timestamps/${encodeURIComponent(safeDevice)}.json`;
      const tsUrl = `${rtdbBase}${tsPath}?access_token=${encodeURIComponent(accessToken)}`;
      const tsRes = await fetch(tsUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify(timestamp),
      });
      const tsTxt = await tsRes.text();
      log("TS PUT status:", tsRes.status, "body:", tsTxt);
    }

    // 3) Verify (GET)
    const verifyUrl = `${rtdbBase}/notifications/${encodeURIComponent(messageId)}/recipients/${encodeURIComponent(safeDevice)}.json?access_token=${encodeURIComponent(accessToken)}`;
    const vRes = await fetch(verifyUrl, { headers: { "Authorization": `Bearer ${accessToken}` } });
    const vTxt = await vRes.text();
    log("VERIFY GET status:", vRes.status, "body:", vTxt);

    return new Response(JSON.stringify({ ok: true, verify: vTxt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

  } catch (err) {
    log("Error:", err);
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});