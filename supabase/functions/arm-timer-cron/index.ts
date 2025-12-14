// supabase/functions/arm-timer-cron/index.ts
// Edge Function: plant einen Timer-Job ein und sorgt (optional) für Cron

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- CORS ---
const ALLOW_ORIGINS = new Set([
  "https://tobias15-super.github.io",
  // "http://localhost:5173",
]);

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowOrigin = ALLOW_ORIGINS.has(origin) ? origin : "";
  const base: Record<string, string> = {
    ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sms-secret",
    "Access-Control-Max-Age": "86400",
  };
  return base;
}

function jsonWithCors(req: Request, data: unknown, init: ResponseInit = {}) {
  const headers = { ...(init.headers ?? {}), ...buildCorsHeaders(req) };
  return new Response(JSON.stringify(data), { ...init, headers: { "Content-Type": "application/json", ...headers } });
}

// --- ENV / Supabase Client ---
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("[arm-timer-cron] Missing envs", { hasUrl: !!SUPABASE_URL, hasServiceKey: !!SERVICE_KEY });
}

const supa = (SUPABASE_URL && SERVICE_KEY) ? createClient(SUPABASE_URL, SERVICE_KEY) : null;

// --- Types ---
type Payload = {
  title: string;
  body: string;
  dueInSec: number; // Pflicht
  messageId?: string;
  link?: string;
  recipientDeviceNames?: string[];
  tokens?: string[];
  rtdbBase?: string;

  // NEU:
  roles?: string[];                      // Rollen zur Auflösung beim Versand
  resolveRecipientsAtSendTime?: boolean; // Flag: true -> Empfänger erst zur Versandzeit ermitteln
};

// --- Handler ---
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { ...buildCorsHeaders(req), Allow: "POST, OPTIONS" },
    });
  }

  try {
    if (!supa) {
      return jsonWithCors(req, { ok: false, error: "Server misconfigured: missing SUPABASE_URL / SERVICE_ROLE_KEY" }, { status: 500 });
    }

    const ct = req.headers.get("Content-Type") ?? "";
    if (!/application\/json/i.test(ct)) {
      return jsonWithCors(req, { ok: false, error: "Content-Type must be application/json" }, { status: 400 });
    }

    let p: Payload;
    try {
      p = (await req.json()) as Payload;
    } catch (e) {
      return jsonWithCors(req, { ok: false, error: `Invalid JSON: ${String((e as Error)?.message ?? e)}` }, { status: 400 });
    }

    const missing: string[] = [];
    if (!p?.title) missing.push("title");
    if (!p?.body) missing.push("body");
    if (typeof p?.dueInSec !== "number") missing.push("dueInSec (number)");

    if (missing.length) {
      return jsonWithCors(req, { ok: false, error: `Missing/invalid fields: ${missing.join(", ")}` }, { status: 400 });
    }

    const now = new Date();
    const dueAt = new Date(now.getTime() + Math.max(0, p.dueInSec) * 1000);
    const messageId = p.messageId ?? crypto.randomUUID();

    // *** NEU: Atomar via RPC – existierende aktive canceln + neuen Job einfügen ***
    const { data: rpcData, error: rpcErr } = await supa.rpc("cancel_active_and_insert_timer_job", {
      p_message_id: messageId,
      p_title: p.title,
      p_body: p.body,
      p_link: p.link ?? "/Mister-X/",
      // Stelle sicher, dass es ein Array von Strings ist
      p_recipient_device_names: p.recipientDeviceNames ?? [], // bleibt ein Array
      p_tokens: p.tokens ?? [], // bleibt ein Array
      p_rtdb_base: p.rtdbBase ?? null,
      p_due_at: dueAt.toISOString(),

      // NEU: roles + resolveRecipientsAtSendTime weiterreichen
      p_roles: p.roles ?? [],
      p_resolve_recipients_at_send_time: !!p.resolveRecipientsAtSendTime,
    });
    console.log("recipientDeviceNames", p.recipientDeviceNames);
    console.log("[arm-timer-cron] cancel_active_and_insert_timer_job response:", { rpcData, rpcErr });

    if (rpcErr) {
      return jsonWithCors(req, {
        ok: false,
        error: "RPC cancel_active_and_insert_timer_job failed",
        details: rpcErr.message ?? String(rpcErr),
        hint: (rpcErr as any)?.hint,
        code: (rpcErr as any)?.code,
      }, { status: 500 });
    }

    // NEU: verify insertion by reading timer_jobs table
    try {
      const { data: insertedRow, error: selErr } = await supa
        .from("timer_jobs")
        .select("*")
        .eq("message_id", messageId)
        .maybeSingle();

      console.log("[arm-timer-cron] verify: timer_jobs lookup result:", { insertedRow, selErr });

      if (selErr) {
        // selErr may be null, but log if present
        console.warn("[arm-timer-cron] timer_jobs select returned error:", selErr);
      } else if (!insertedRow) {
        console.warn("[arm-timer-cron] No timer_jobs row found for messageId", messageId);
      }
    } catch (err) {
      console.error("[arm-timer-cron] verify query failed:", err);
    }

    // Cron/Schedule sicherstellen (wie gehabt)
    const { error: cronErr } = await supa.rpc("ensure_timer_tick_schedule");
    if (cronErr) {
      console.warn("[arm-timer-cron] ensure_timer_tick_schedule error:", cronErr);
      return jsonWithCors(req, {
        ok: false,
        error: "ensure_timer_tick_schedule RPC failed",
        details: cronErr.message ?? String(cronErr),
        hint: (cronErr as any)?.hint,
        code: (cronErr as any)?.code,
      }, { status: 500 });
    }

    return jsonWithCors(req, { ok: true, messageId, dueAt }, { status: 200 });
  } catch (e) {
    console.error("[arm-timer-cron] Unhandled:", e);
    return jsonWithCors(req, { ok: false, error: String((e as Error)?.message ?? e) }, { status: 500 });
  }
});
