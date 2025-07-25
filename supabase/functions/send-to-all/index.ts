import { serve } from "https://deno.land/std@0.203.0/http/server.ts";



// 🔐 Niemals öffentlich machen – Service Account sicher speichern!
const SERVICE_ACCOUNT = {
  client_email: 'firebase-adminsdk-fbsvc@mister-x-d6b59.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpbGqRRDYz7z0J\nteisTXgmNRUJZAmo03RRQ5bbgkXDvuLnAd+pjBAD34B0hkznqyApmyaB7OaIzMPG\nQl2Rj5MFk+piAhyh5jmCm+0s9J9TuN/Q5QivVH5y1HTqNeNA5b87ZhrUnNxbdsqP\nnvMjNp3LYI27xwwqE7/DFHfDfVO/uRNGFGn5FU7KT12jgnyIqQsHCy9QC3igmsBX\nUl2A3dCRvvfwxEUe8cnoCQAumoi3aeQGdfKv7RwuohOA4hXZ2HiaUid0rJoRrsY0\ni1mgpxHLceRac8FLaq6MinY9qt7QZzKjiuxtRxEqfQQNZ6wy6wdQERMVvHCtevQ/\nnZtoVvp5AgMBAAECggEANdj/WoSYVnG9rHRM+Raj/XhoYnKz8cDaB/cmIXxTeL0b\n3fumK5g2h5YzLW5f5l+pOz/h6b4LToqiLSXZLP+ohHRjcPmYvlZ8dN9gnurNqIQx\nCaEUWFIPG5FcaT1GMA3wCBVdYifPg8ALKYebAkgSrbyX5bYc3cYRikC6AhxyyfrI\noUNGkfnpPU2KskimiH7xtCzYqt4jN3HXjFKRlfPJbBuO+qw/aAvhRx18pH7ICv3a\nS0UIvVhUyRQX5gnyVhC4SLGkv6fBw2qIGqGirhBHb3SA2BPMfXR4cIeiOLAvdpPS\nq94YDZrmkw/iiGKU4b81OI83MBRzce0FwSjpi3RxqwKBgQD6LvwPeM6mwMXpi8Jw\nYMc/k17VayhBTZz05ykEoP+WG3V5mS6fcg/3Dswc/54UfLvezvZSxRHWczRPZ1FM\nLXcGpxb9BMlUfV/9y1/dj/PYzW1aJsY4V/A5V+Trtx95ewHp7r/VHSfOa5YDoWMK\nbqhPqqVhxepORSGH/SQ5yDUG6wKBgQDu2a5daMYBS58K/kTN80fFDJfoR3lkfcV3\nr2u78KaWyDEb0pb5nXw6rmJ5XsN7jnlWWUQA+Gj9dKJm/fnd80cZnwIT1cXeg6qK\nuLVFU4bGFxIsmpog9BJZAyrf/Sk5jJM6KoX0lIpOtZ2HOFzDWx9r2Zm4c9Wyx5Ju\n0mjPHaozKwKBgQDrxc+hvRXzLITXXfC1+16K2ZVrx3q+YChk3FxZkmiLzADfwa6g\ncNv+1qEhSvxtDkf26FBXHIV89kD7+8Av7EDZsioF9LbPuv/1q+4CXaFOVfqSFSyE\n+MrZH64LPh6ZW4UoMunyK3HSJK3RagxuTm6r9YO6KsxvStMY10WGdtkSVQKBgDXD\nihw8mVVxUDuJQLObL2yLiSYf8JNOPETUl8uWP+lw5pz8qj9F09DhsAjh697EE0v8\ni/Ir+HYU6vmD8dqkCD0cLbuJQyDzQlA3g5Y3Vv7/8ndX1ZnVVsvyipQgyEbL/df5\n+m0zgm51MyBc74SJ3mjIcnGyoUe85JlNg4obg1RBAoGAYvgLu9KZWKrQxkw7mOD2\ni3bgM4Mw7qUesvmLM3gHrvxhxtNrj1t5WQmygpzjUfNLYm9oEYZ1c8OyOvjONP90\n/ASTLEGsPI3hB6BkZNAg1vxLqDbuXcq5foARANwg69Vc9cXRVFY0rzJWd7wucyKh\nmpzGGc85nlGS+OyVOrmBkTI=\n-----END PRIVATE KEY-----\n',
  project_id: 'mister-x-d6b59'
};

// JWT erstellen für FCM-Zugriff
async function createJWT(serviceAccount: any): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp,
  };

  const encoder = new TextEncoder();
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const toSign = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    encoder.encode(serviceAccount.private_key),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(toSign));
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return `${toSign}.${encodedSignature}`;
}

// Access Token für FCM holen
async function getAccessToken(): Promise<string> {
  const jwt = await createJWT(SERVICE_ACCOUNT);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

// Serverfunktion
serve(async (req) => {
  let data;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid or missing JSON body" }), { status: 400 });
  }

  const { title, body } = data;

  const supabaseUrl = Deno.env.get("https://axirbthvnznvhfagduyj.supabase.co")!;
  const supabaseKey = Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzMwMjYxNywiZXhwIjoyMDY4ODc4NjE3fQ.1N-VomgkBBX5Xkra92tw4ClvMiU7bDLodOxljsqNg-0")!;

  const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  const tokens = await tokensRes.json();
  const tokenList = tokens.map((t: any) => t.token).filter(Boolean);

  if (tokenList.length === 0) {
    return new Response(JSON.stringify({ error: "No tokens found" }), { status: 200 });
  }

  const accessToken = await getAccessToken();

  // Nachrichten an alle Tokens senden
  await Promise.all(tokenList.map(async (token: string) => {
    await fetch(`https://fcm.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/messages:send`, {
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
  }));

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});
