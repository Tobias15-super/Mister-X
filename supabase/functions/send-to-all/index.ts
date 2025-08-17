// supabase/functions/send-to-all/index.ts
// Deno Edge Function (TypeScript)
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!; // oder SERVICE_ROLE_KEY falls nötig
const fcmKey = Deno.env.get("FCM_SERVER_KEY")!;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RTDB_BASE_FALLBACK = Deno.env.get("RTDB_BASE") ?? "";

function sanitizeKey(key: string) {
  return (key || '').replace(/[.#$/\[\]\/]/g, '_');
}

async function fetchNamesForTokens(tokens: string[]): Promise<Record<string, string>> {
  if (!tokens.length) return {};
  // Hole token -> device_name in einem Rutsch
  const url = `${supabaseUrl}/rest/v1/fcm_tokens?select=token,device_name&token=in.(${tokens.map(encodeURIComponent).join(",")})`;
  const res = await fetch(url, { headers: { apikey: supabaseKey } });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status} ${await res.text()}`);
  const rows = await res.json() as Array<{ token: string; device_name: string | null }>;
  const map: Record<string, string> = {};
  for (const r of rows) {
    if (r.token && r.device_name) map[r.token] = r.device_name;
  }
  return map;
}

async function sendFcmToTokens(title: string, body: string, link: string, tokens: string[]) {
  if (!tokens.length) return { successTokens: [], failedTokens: [] };
  const fcmUrl = "https://fcm.googleapis.com/fcm/send";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `key=${fcmKey}`
  };

  // Data-only Payload (empfohlen): SW rendert selbst
  const payload = {
    registration_ids: tokens,
    priority: "high",
    time_to_live: 120, // Sekunden
    data: {
      title,
      body,
      url: link,
      messageId: undefined, // wird vom Aufrufer gesetzt, optional
    }
  };

  const res = await fetch(fcmUrl, { method: "POST", headers, body: JSON.stringify(payload) });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`FCM error ${res.status}: ${txt}`);
  }
  const json = await res.json();

  const successTokens: string[] = [];
  const failedTokens: string[] = [];

  // Auswertung: FCM-Response hat i.d.R. results array pro token
  if (Array.isArray(json.results)) {
    json.results.forEach((r: any, idx: number) => {
      const t = tokens[idx];
      if (r && (r.message_id || r.success)) {
        successTokens.push(t);
      } else {
        failedTokens.push(t);
      }
    });
  }

  return { successTokens, failedTokens, raw: json };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const {
      title,
      body,
      tokens: providedTokens,
      senderName,
      link = "/Mister-X/",
      messageId: providedMessageId,
      rtdbBase = RTDB_BASE_FALLBACK,
      recipientDeviceNames = [],
      setRecipientsMode = "none", // 'set_once' | 'append' | 'none'
      attempt = 1,
    } = await req.json();

    if (!title || !body) {
      return new Response(JSON.stringify({ error: "title and body required" }), { status: 400, headers: corsHeaders });
    }
    if (!rtdbBase) {
      return new Response(JSON.stringify({ error: "rtdbBase missing" }), { status: 400, headers: corsHeaders });
    }

    // 1) Tokenliste holen (falls nicht geliefert)
    let tokenList: string[] = [];
    if (Array.isArray(providedTokens) && providedTokens.length > 0) {
      tokenList = [...new Set(providedTokens)].filter(Boolean);
    } else {
      const tokensRes = await fetch(`${supabaseUrl}/rest/v1/fcm_tokens?select=token,device_name`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });
      if (!tokensRes.ok) throw new Error(`Token fetch failed: ${tokensRes.status} ${await tokensRes.text()}`);
      const rows = await tokensRes.json() as Array<{ token: string; device_name?: string | null }>;
      tokenList = [...new Set(rows.map(r => r.token).filter(Boolean))];
    }

    // 2) Eine stabile messageId verwenden
    const messageId = providedMessageId || crypto.randomUUID();

    // 3) recipientsMap **nur** beim 1. Versuch setzen
    let recipientsMap: Record<string, boolean> | null = null;
    if (setRecipientsMode === "set_once") {
      // Empfänger aus Gerätesicht: nimm die übergebenen Namen (vollständig!)
      // → unabhängig davon, ob einzelne Tokens später fehlschlagen.
      const names = new Set<string>();
      for (const n of Array.isArray(recipientDeviceNames) ? recipientDeviceNames : []) {
        const safe = sanitizeKey(n);
        if (safe) names.add(safe);
      }
      if (names.size === 0) {
        // Fallback: aus Tokens die device_names auflösen (nur wenn unvermeidlich)
        const map = await fetchNamesForTokens(tokenList);
        Object.values(map).forEach(n => { if (n) names.add(sanitizeKey(n)); });
      }

      recipientsMap = {};
      names.forEach(n => { recipientsMap![n] = false; });
    }

    // 4) Notification-Dokument erstellen oder patchen (recipients nur einmal!)
    const notifBase = {
      sender: senderName ?? "Unbekannt",
      title,
      body,
    };

    const now = Date.now();

    // a) Existiert die Nachricht schon?
    const getRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`);
    const existing = getRes.ok ? await getRes.json() : null;

    if (!existing) {
      // Erst-Erstellung: PUT mit vollständigem Objekt
      const notif = {
        ...notifBase,
        recipients: recipientsMap ?? {}, // beim 1. Versuch expected, sonst leer
        timestamp: now,
        attempts: {
          [attempt]: {
            at: now,
            count: Array.isArray(tokenList) ? tokenList.length : 0,
          }
        },
        lastAttemptAt: now,
      };
      const putRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notif),
      });
      if (!putRes.ok) {
        console.error("RTDB initial write failed:", await putRes.text());
        // nicht abbrechen – Push trotzdem versuchen
      }
    } else {
      // Update: recipients **nicht überschreiben**
      const patch: any = {
        lastAttemptAt: now,
        [`attempts/${attempt}`]: {
          at: now,
          count: Array.isArray(tokenList) ? tokenList.length : 0,
        }
      };
      if (setRecipientsMode === "set_once" && recipientsMap) {
        // nur falls (ausnahmsweise) noch nicht gesetzt war – merge, nicht replace
        // wir mergen Empfänger keys auf true/false – bestehende bleiben erhalten
        Object.keys(recipientsMap).forEach((k) => {
          patch[`recipients/${k}`] = existing?.recipients?.[k] ?? false;
        });
      }
      


      const patchRes = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!patchRes.ok) {
        console.error("RTDB patch failed:", await patchRes.text());
      }
    }

    // 5) Senden
    const { successTokens, failedTokens, raw } = await sendFcmToTokens(title, body, link, tokenList);

    // 6) Versuchsergebnis protokollieren (PATCH, nicht überschreiben)
    const resultPatch: any = {
      lastAttemptAt: now,
      [`attempts/${attempt}/success`]: successTokens.length,
      [`attempts/${attempt}/failed`]: failedTokens.length,
    };

    // Optional: letzte Fehlerliste unter attempts speichern (klein halten!)
    if (failedTokens.length) {
      // Achtung: lange Arrays vermeiden
      resultPatch[`attempts/${attempt}/failedTokens`] = failedTokens.slice(0, 50);
    }

    const patchRes2 = await fetch(`${rtdbBase}/notifications/${messageId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultPatch),
    });
    if (!patchRes2.ok) {
      console.error("RTDB attempt result patch failed:", await patchRes2.text());
    }

    return new Response(
      JSON.stringify({ ok: true, messageId, successTokens, failedTokens, fcm: raw }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
