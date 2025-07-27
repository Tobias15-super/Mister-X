import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SignJWT, importPKCS8 } from "https://deno.land/x/jose@v4.13.1/index.ts";


console.log("🚀 send-to-all/index.ts wurde geladen");

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

  const rawKey = SERVICE_ACCOUNT.private_key.replace(/\\n/g, "\n");
  const key = await importPKCS8(rawKey, "RS256");


return await new SignJWT({
    scope: "https://www.googleapis.com/auth/firebase.messaging"
  })
  .setProtectedHeader({ alg: "RS256" })
  .setIssuedAt(iat)
  .setExpirationTime(exp)
  .setAudience("https://oauth2.googleapis.com/token")
  .setIssuer(SERVICE_ACCOUNT.client_email)
  .sign(key);

}


// Access Token holen
async function getAccessToken(): Promise<string> {
  const jwt = await createJWT();
  console.log("🔐 JWT:", jwt); // JWT anzeigen

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const text = await res.text();
  console.log("🔍 Access Token Response:", text); // Antwort von Google anzeigen

  const data = JSON.parse(text);
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
  console.log("📥 Neue Anfrage:", req.method, req.url);


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

  console.log("🔍 Header:", [...req.headers.entries()]);

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
    token,
    webpush: {
      fcm_options: {
        link: "https://tobias15-super.github.io/Mister-X/"
      }
    }
  }
})

    });
    return { token, status: res.status, body: await res.text() };
  }));

  return new Response(JSON.stringify({ ok: true, results }), { status: 200 });
});
