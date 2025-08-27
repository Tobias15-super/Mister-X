// Deno Deploy (Supabase Edge Functions)
// Minimaler Endpoint: schreibt delivered=true nach RTDB unter
// /notifications/{messageId}/recipients/{deviceNameSanitized}

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FIREBASE_PROJECT_ID = Deno.env.get("FIREBASE_PROJECT_ID")!;
const GCP_SA_JSON = Deno.env.get("GCP_SA_JSON")!; // Service-Account JSON als ENV (string)
const RTDB_BASE = (Deno.env.get("RTDB_BASE") ?? "").replace(/\/$/, ""); // z.B. https://<db>.europe-west1.firebasedatabase.app

// Fallback: wenn RTDB_BASE nicht gesetzt ist, aus Project ableiten (nur falls DB in default Host liegt)
const rtdbBase = RTDB_BASE || `https://${FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`;

type AckBody = { messageId?: string; deviceName?: string; timestamp?: number };

function sanitizeKey(key = "") {
  return key.replace(/[.#$/\[\]\/]/g, "_");
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
    exp: now + 5 * 60, // 5 Minuten
  };

  const enc = (obj: unknown) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(obj))))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const unsigned = `${enc(header)}.${enc(claim)}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    (() => {
      // PEM -> ArrayBuffer
      const pem = sa.private_key as string;
      const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
      const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
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
  if (!res.ok) throw new Error(`token exchange failed: HTTP ${res.status} ${await res.text()}`);
  const json = await res.json();
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
    const accessToken = await getAccessToken([
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/firebase.database",
    ]);

    const url = `${rtdbBase}/notifications/${encodeURIComponent(messageId)}/recipients/${encodeURIComponent(safeDevice)}.json`;
    const body = true; // knapp: nur Flag setzen; optional timestamp separat schreiben

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return new Response(JSON.stringify({ error: `RTDB write failed: ${res.status} ${txt}` }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional: zweiten Write mit timestamp
    if (typeof timestamp === "number") {
      await fetch(`${rtdbBase}/notifications/${encodeURIComponent(messageId)}/timestamps/${encodeURIComponent(safeDevice)}.json`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(timestamp),
      }).catch(() => {});
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
