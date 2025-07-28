import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { SignJWT, importPKCS8 } from "https://deno.land/x/jose@v4.13.1/index.ts";

console.log("🚀 send-to-all/index.ts wurde geladen");

const SERVICE_ACCOUNT = {
  client_email: Deno.env.get("CLIENT_EMAIL")!,
  private_key: Deno.env.get("PRIVATE_KEY")!,
  project_id: Deno.env.get("PROJECT_ID")!,
};

const supabaseUrl = Deno.env.get("PROJECT_URL")!;
const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY")!;

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

serve(async (req) => {
  let data;
  try {
    await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid or missing JSON body" }), { status: 400 });
  }

  const { title, body, tokens: providedTokens } = data;

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
          token,
          webpush: {
            fcm_options: {
              link: "https://tobias15-super.github.io/Mister-X/"
            }
          }
        }
      })
    });

    return {
      token,
      status: res.status,
      success: res.ok,
      body: await res.text()
    };
  }));

  const failedTokens = results.filter(r => !r.success).map(r => r.token);

  return new Response(JSON.stringify({ ok: true, results, failedTokens }), { status: 200 });
});
