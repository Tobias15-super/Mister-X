// supabase/functions/send-to-all/index.ts
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

// 🔧 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tobias15-super.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// 🔧 RTDB-Basis-URL (außerhalb des Handlers, damit Helper darauf zugreifen können)
const rtdbBase =
  "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";

// 🔑 Access Token für FCM holen
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: SERVICE_ACCOUNT.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  // Wichtig: \n im Private Key ersetzen
  const rawKey = SERVICE_ACCOUNT.private_key.replace(/\\n/g, "\n");
  const pkcs8 = await importPKCS8(rawKey, "RS256");
  const jwt = await new SignJWT(payload).setProtectedHeader({ alg: "RS256" }).sign(pkcs8);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`FCM token error: ${res.status} ${JSON.stringify(data)}`);
  return data.access_token as string;
}

// Hilfsfunktion: ungültige Firebase-Keys entschärfen
function sanitizeKey(key: string) {
  // Verboten in Firebase RTDB: . # $ [ ] /
  return key.replace(/[.#$/\[\]\/]/g, "_");
}

// 🧹 Cleanup: Alle /notifications älter als 5 Minuten löschen
async function cleanupOldNotifications(maxAgeMs = 5 * 60 * 1000) {
  const cutoff = Date.now() - maxAgeMs;

  // RTDB-REST-Query: orderBy="timestamp"&endAt=<cutoff>
  // Achtung: "timestamp" muss URL-quoted in Anführungszeichen stehen.
  const listUrl =
    `${rtdbBase}/notifications.json?orderBy=${encodeURIComponent('"timestamp"')}&endAt=${cutoff}`;
  const res = await fetch(listUrl, { method: "GET" });

  if (!res.ok) {
    const txt = await res.text();
    console.warn("Cleanup list failed:", txt);
    return { deleted: 0, details: "list_failed" as const };
  }

  const oldItems = await res.json() as Record<string, { timestamp?: number }>|null;

  if (!oldItems || typeof oldItems !== "object") {
    return { deleted: 0, details: "nothing_to_delete" as const };
  }

  const deletions: Record<string, null> = {};
  for (const id of Object.keys(oldItems)) {
    deletions[id] = null; // PATCH mit null => löschen
  }

  const toDelete = Object.keys(deletions).length;
  if (toDelete === 0) {
    return { deleted: 0, details: "empty" as const };
  }

  const patchRes = await fetch(`${rtdbBase}/notifications.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deletions),
  });

  if (!patchRes.ok) {
    const txt = await patchRes.text();
    console.warn("Cleanup delete failed:", txt);
    return { deleted: 0, details: "delete_failed" as const };
  }

  return { deleted: toDelete, details: "ok" as const };
}

// (Optional) kleiner Helper um Cleanup nicht länger als X ms zu blockieren
function withTimeout<T>(p: Promise<T>, ms: number, onTimeout?: () => void): Promise<void> {
  return new Promise<void>((resolve) => {
    const t = setTimeout(() => {
      try { onTimeout?.(); } catch {}
      resolve(); // Zeit abgelaufen => nicht warten
    }, ms);
    p.then(() => { clearTimeout(t); resolve(); })
     .catch(() => { clearTimeout(t); resolve(); });
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { title, body, tokens: providedTokens, senderName } = await req.json();

    // 1) Tokenliste
    let tokenList: string[] = [];
    if (Array.isArray(providedTokens) && providedTokens.length > 0) {
      tokenList = providedTokens;
    } else {
      const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
        headers: { apikey: supabaseKey },
      });
      const tokens = await tokensRes.json();
      tokenList = (tokens as any[]).map((t) => t.token).filter(Boolean);
    }

    if (tokenList.length === 0) {
      // 🧹 Cleanup in Hintergrund (optional, blockiert nicht)
      // Wir warten hier maximal 150 ms darauf, sonst geht's weiter
      const cleanupPromise = cleanupOldNotifications().catch(console.error);
      await withTimeout(cleanupPromise, 150);

      return new Response(JSON.stringify({ error: "No tokens found" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // 2) Token -> Gerätename (via Supabase-Tabelle fcm_tokens)
    const mapRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens`, {
      headers: { apikey: supabaseKey },
    });
    const tokensData = await mapRes.json() as any[];
    const nameMap: Record<string, string> = {};
    tokensData.forEach((t) => {
      if (t.token && t.device_name) nameMap[t.token] = t.device_name;
    });

    // 3) Empfänger-Map aufbauen (name -> false)
    const recipientsMap: Record<string, boolean> = {};
    for (const token of tokenList) {
      const name = nameMap[token] ?? token; // Fallback: Token als Name (sollte selten sein)
      recipientsMap[sanitizeKey(name)] = false;
    }

    // 4) messageId & RTDB-Eintrag
    const messageId = crypto.randomUUID();
    const notif = {
      sender: senderName ?? "Unbekannt",
      recipients: recipientsMap,
      title,
      body,
      timestamp: Date.now(),
    };

    const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notif),
    });
    if (!putRes.ok) {
      const txt = await putRes.text();
      console.error("RTDB write failed:", txt);
    }

    // 🧹 Cleanup so früh wie möglich anstoßen, aber nicht auf Antwort warten
    // - Best effort im Hintergrund
    // - Optionaler kurzer Timeout, damit es bei schneller Ausführung mitgenommen wird
    const cleanupPromise = cleanupOldNotifications().catch(console.error);
    // Warte höchstens 150 ms auf Cleanup, um Latenz minimal zu halten:
    await withTimeout(cleanupPromise, 150);

    // 5) Push senden
    const accessToken = await getAccessToken();
    const results = await Promise.all(
      tokenList.map(async (token) => {
        const res = await fetch(
          `https://fcm.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/messages:send`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: {
                data: {
                  title,
                  body,
                  url: "https://tobias15-super.github.io/Mister-X/",
                  messageId,
                  senderName: senderName ?? "Unbekannt",
                },
                token,
                webpush: {
                  fcm_options: { link: "https://tobias15-super.github.io/Mister-X/" },
                  headers: { Urgency: "high" },
                },
                android: { priority: "high" },
                apns: { headers: { "apns-priority": "10" } },
              },
            }),
          }
        );

        return {
          token,
          status: res.status,
          success: res.ok,
          body: await res.text(),
        };
      })
    );

    const failedTokens = results.filter((r) => !r.success).map((r) => r.token);

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
