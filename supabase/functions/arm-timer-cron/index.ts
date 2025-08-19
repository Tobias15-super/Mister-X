// supabase/functions/arm-timer-cron/index.ts
// Edge Function: plant einen Timer-Job ein und sorgt (optional) für Cron

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- CORS ---
const ALLOW_ORIGINS = new Set([
  "https://tobias15-super.github.io",
  // Für local dev ggf. ergänzen:
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
  // Früh loggen – sonst rätselt man lange
  console.error("[arm-timer-cron] Missing envs", { hasUrl: !!SUPABASE_URL, hasServiceKey: !!SERVICE_KEY });
}

// Client mit Service-Role – RLS wird damit übergangen (gewollt für Server-Operationen)
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
};

// --- Handler ---
Deno.serve(async (req) => {
  // Preflight
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

    // Content-Type prüfen (hilft bei „Unexpected end of JSON input“)
    const ct = req.headers.get("Content-Type") ?? "";
    if (!/application\/json/i.test(ct)) {
      return jsonWithCors(req, { ok: false, error: "Content-Type must be application/json" }, { status: 400 });
    }

    // Payload lesen & validieren
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

    // Insert
    const { error: insErr } = await supa
      .from("timer_jobs")
      .insert({
        message_id: messageId,
        title: p.title,
        body: p.body,
        link: p.link ?? "/Mister-X/",
        recipient_device_names: p.recipientDeviceNames ?? [],
        tokens: p.tokens ?? [],
        rtdb_base: p.rtdbBase ?? null,
        due_at: dueAt.toISOString(),
        status: "armed",
      });

    if (insErr) {
      // PostgREST-Fehler lesbar zurückgeben
      return jsonWithCors(req, {
        ok: false,
        error: "Insert failed",
        details: insErr.message ?? String(insErr),
        hint: (insErr as any)?.hint,
        code: (insErr as any)?.code,
      }, { status: 500 });
    }

    // RPC optional (kann man „soft“ behandeln, falls noch nicht angelegt)
    const { error: cronErr } = await supa.rpc("ensure_timer_tick_schedule");
    if (cronErr) {
      // Entweder „soft fail“ (nur warnen) ODER hard fail – ich zeig dir beides:
      console.warn("[arm-timer-cron] ensure_timer_tick_schedule error:", cronErr);
      // Soft-Fail: trotzdem 200 OK zurückgeben:
      // return jsonWithCors(req, { ok: true, messageId, dueAt, warn: "schedule rpc failed" });

      // Hard-Fail:
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
