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
async function getAccessToken(): Promise<string> {
  const jwt = await createJWT();
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

// 🚀 Hauptfunktion
serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://tobias15-super.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // CORS Preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    const data = await req.json();
    const { title, body, tokens: providedTokens } = data;

    // Tokenliste holen
    let tokenList: string[] = [];

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
            /*notification: { title, body },*/
            token, 
            webpush: {
              fcm_options: {
                link: "https://tobias15-super.github.io/Mister-X/",
              },
              headers: {
                Urgency: "high" // Für Web Push wichtig
              }
            },
            android: {
              priority: "high"
            },
            apns: {
              headers: {
                "apns-priority": "10" // 10 = sofortige Zustellung

              },
            },
          },
        }),
      });

      return {
        token,
        status: res.status,
        success: res.ok,
        body: await res.text(),
      };
    }));

    const failedTokens = results.filter(r => !r.success).map(r => r.token);

    return new Response(JSON.stringify({ ok: true, results, failedTokens }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (err) {
    console.error("❌ Fehler in der Funktion:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: String(err) }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
