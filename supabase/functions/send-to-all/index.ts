import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SignJWT } from "https://deno.land/x/jose@v5.0.5/index.ts";
import { importPKCS8 } from "https://deno.land/x/jose@v5.0.5/key/import.ts";

// 🔐 Service Account aus Umgebungsvariablen laden
const SERVICE_ACCOUNT = {
  client_email: Deno.env.get("CLIENT_EMAIL")!,
  private_key: Deno.env.get("PRIVATE_KEY")!,
  project_id: Deno.env.get("PROJECT_ID")!,
};

// 🔐 Supabase-Zugangsdaten
const supabaseUrl = Deno.env.get("PROJECT_URL")!;
const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY")!;

// JWT für FCM erstellen
async function createJWT(): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const key = await importPKCS8(SERVICE_ACCOUNT.private_key, "RS256");

  return await new SignJWT({
    iss: SERVICE_ACCOUNT.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp,
  })
    .setProtectedHeader({ alg: "RS256" })
    .sign(key);
}

// Access Token holen
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

// Hauptfunktion
serve(async (req) => {
  let data;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid or missing JSON body" }), { status: 400 });
  }

  const { title, body } = data;

  const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
    headers: {
      apikey: supabaseKey,
    },
  });

  const tokens = await tokensRes.json();
  const tokenList = tokens.map((t: any) => t.token).filter(Boolean);

  if (tokenList.length === 0) {
    return new Response(JSON.stringify({ error: "No tokens found" }), { status: 200 });
  }

  const accessToken = await getAccessToken();

  const results = await Promise.all(tokenList.map(async (token: string) => {
    const res = await fetch(`https://fcm.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/messages:send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: {
          notification: { title, body },
          token
        }
      })
    });
    return { token, status: res.status, body: await res.text() };
  }));

  return new Response(JSON.stringify({ ok: true, results }), { status: 200 });
});
