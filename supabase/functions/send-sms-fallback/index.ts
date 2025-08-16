// supabase/functions/send-sms-fallback/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const API_BASE = "https://api.textbee.dev/api/v1";
const TEXTBEE_API_KEY = Deno.env.get("TEXTBEE_API_KEY")!;
const TEXTBEE_DEVICE_ID = Deno.env.get("TEXTBEE_DEVICE_ID")!;
const RTDB_BASE = Deno.env.get("RTDB_BASE")!; // https://<db>.europe-west1.firebasedatabase.app

// RTDB-Pfad-Vorlage zu den Ack-Flags; {messageId} wird ersetzt
const NOTIF_RECIPIENTS_TEMPLATE =
  Deno.env.get("NOTIF_RECIPIENTS_TEMPLATE") || "/notifications/{messageId}/recipients";

type RecipientsMap = Record<string, boolean>; // { <recipientKey>: delivered? }

function atE164(n: string): boolean {
  // Österreich: +43, nationale Länge 4–13 -> ^\+43\d{4,13}$
  return /^\+43\d{4,13}$/.test(n);
}

function joinPath(...p: string[]) {
  return p.map(s => s.replace(/^\/+|\/+$/g, "")).filter(Boolean).join("/");
}

async function getRecipientsMap(messageId: string): Promise<RecipientsMap> {
  const path = NOTIF_RECIPIENTS_TEMPLATE.replace(/\{messageId\}/g, encodeURIComponent(messageId));
  const url = `${RTDB_BASE}/${joinPath(path)}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RTDB recipients fetch failed: ${res.status}`);
  const data = await res.json();
  return (data && typeof data === "object") ? data : {};
}

// Rollen: wir nehmen den *gleichen* Key wie in recipients (device_name-saniert)
async function getRole(recipientKey: string): Promise<{ tel: string | null; allow: boolean }> {
  const url = `${RTDB_BASE}/roles/${encodeURIComponent(recipientKey)}.json`;
  const res = await fetch(url);
  if (!res.ok) return { tel: null, allow: false };
  const data = await res.json();
  return { tel: data?.tel ?? null, allow: !!data?.allowSmsFallback };
}

async function sendSmsViaTextBee(recipients: string[], message: string) {
  const url = `${API_BASE}/gateway/devices/${encodeURIComponent(TEXTBEE_DEVICE_ID)}/send-sms`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": TEXTBEE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipients, message }),
  });
  const bodyText = await res.text();
  return { ok: res.ok, status: res.status, bodyText };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { messageId, smsText } = await req.json();
    if (!messageId) {
      return new Response(JSON.stringify({ error: "messageId required" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    // 1) Pending Empfänger ermitteln
    const recipientsMap = await getRecipientsMap(messageId);
    const pendingKeys = Object.entries(recipientsMap)
      .filter(([, delivered]) => !delivered)
      .map(([k]) => k);

    if (pendingKeys.length === 0) {
      return new Response(JSON.stringify({ sent: 0, detail: "no pending recipients" }), {
        status: 200, headers: { "Content-Type": "application/json" }
      });
    }

    // 2) Rollen prüfen
    const roles = await Promise.all(pendingKeys.map(getRole));
    const candidates = roles
      .map(r => r.allow && typeof r.tel === "string" && atE164(r.tel) ? r.tel : null)
      .filter((t): t is string => !!t);

    const unique = [...new Set(candidates)];
    if (unique.length === 0) {
      return new Response(JSON.stringify({ sent: 0, detail: "no eligible AT recipients" }), {
        status: 200, headers: { "Content-Type": "application/json" }
      });
    }

    // 3) Senden
    const msg = String(smsText || "Neue Nachricht").slice(0, 300);
    const out = await sendSmsViaTextBee(unique, msg);

    // 4) Loggen
    const logUrl = `${RTDB_BASE}/sms_logs/${encodeURIComponent(messageId)}.json`;
    await fetch(logUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        at: Date.now(),
        to: unique,
        ok: out.ok,
        status: out.status,
        body: out.bodyText.slice(0, 2048),
      }),
    });

    return new Response(JSON.stringify({ sent: unique.length, ok: out.ok, status: out.status }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
});
