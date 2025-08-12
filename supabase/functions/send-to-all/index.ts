import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SignJWT, importPKCS8 } from "https://deno.land/x/jose@v4.13.1/index.ts";
/*import { url } from "inspector";*/

// 🔐 Service Account aus Umgebungsvariablen laden
const SERVICE_ACCOUNT = {
  client_email: Deno.env.get("CLIENT_EMAIL")!,
  private_key: Deno.env.get("PRIVATE_KEY")!,
  project_id: Deno.env.get("PROJECT_ID")!,
};

// 🔐 Supabase-Zugangsdaten
const supabaseUrl = Deno.env.get("PROJECT_URL")!;
const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY")!;

// 🔧 CORS-Header definieren
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tobias15-super.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 🔐 JWT für FCM erstellen
async function createJWT(): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const rawKey = SERVICE_ACCOUNT.private_key.replace(/\\n/g, "\n");
  const key = await importPKCS8(rawKey, "RS256");

  return await new SignJWT({
    scope: "https://www.googleapis.com/auth/firebase.messaging",
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuer(SERVICE_ACCOUNT.client_email)
    .sign(key);
}

// 🔑 Access Token holen

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: SERVICE_ACCOUNT.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();
  const pkcs8 = await importPKCS8(SERVICE_ACCOUNT.private_key, "RS256");
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .sign(pkcs8);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { title, body, tokens: providedTokens, sender = "Admin" } = await req.json();

    tokenList: string[] = [];
    if (Array.isArray(providedTokens) && providedTokens.length > 0) {
      tokenList = providedTokens;
    } else {
      const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
        headers: { apikey: supabaseKey },
      });
      const tokens = await tokensRes.json();
      tokenList = tokens.map((t: any) => t.token).filter(Boolean);
    }

    if (tokenList.length === 0) {
      return new Response(JSON.stringify({ error: "No tokens found" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Namen zu Tokens auflösen
    const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
      headers: { apikey: supabaseKey },
    });
    const tokensData = await tokensRes.json();
    const nameMap: Record<string, string> = {};
    tokensData.forEach((t: any) => {
      nameMap[t.token] = t.device_name;
    });

    const recipients = tokenList.map(token => nameMap[token] || token);

    // messageId generieren
    const messageId = crypto.randomUUID();

    // RTDB-Eintrag erstellen
    await fetch(`https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app/notifications/${messageId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender,
        recipients,
        status: Object.fromEntries(recipients.map(name => [name, false])),
        title,
        body,
        timestamp: Date.now()
      })
    });

    // Push senden
    const accessToken = await getAccessToken();
    const results = await Promise.all(tokenList.map(async (token: string) => {
      const res = await fetch(`https://fcm.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/messages:send`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            data: {
              title,
              body,
              url: "https://tobias15-super.github.io/Mister-X/",
              messageId
            },
            token,
            webpush: {
              fcm_options: { link: "https://tobias15-super.github.io/Mister-X/" },
              headers: { Urgency: "high" }
            },
            android: { priority: "high" },
            apns: { headers: { "apns-priority": "10" } }
          }
        }),
      });

      return { token, status: res.status, success: res.ok, body: await res.text() };
    }));

    const failedTokens = results.filter(r => !r.success).map(r => r.token);

    return new Response(JSON.stringify({ ok: true, messageId, results, failedTokens }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (err) {
    console.error("❌ Fehler:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});

