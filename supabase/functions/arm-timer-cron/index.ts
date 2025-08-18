// supabase/functions/arm-timer-cron/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url  = Deno.env.get("SUPABASE_URL")!;
const key  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supa = createClient(url, key);


const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tobias15-super.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-sms-secret",
  "Access-Control-Max-Age": "86400"
};



type Payload = {
  // Pflicht
  title: string;
  body: string;
  dueInSec: number;               // z.B. 25*60
  messageId?: string;
  // Optional / kompatibel zu deinem Code
  link?: string;
  recipientDeviceNames?: string[];
  tokens?: string[];
  rtdbBase?: string;
};

serve(async (req) => {
  // ✅ Preflight beantworten – sonst blockt der Browser
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }


  try {
    const p = (await req.json()) as Payload;
    const now = new Date();
    const dueAt = new Date(now.getTime() + (p.dueInSec ?? 1500) * 1000);

    const messageId = p.messageId ?? crypto.randomUUID();

    // 1) Job persistieren
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
    if (insErr) throw insErr;

    // 2) Cron alle 10s sicherstellen (legt ihn nur an, wenn nicht vorhanden)
    const { error: cronErr } = await supa.rpc("ensure_timer_tick_schedule");
    if (cronErr) throw cronErr;

    return new Response(JSON.stringify({ ok: true, messageId, dueAt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },

  });
}
});
