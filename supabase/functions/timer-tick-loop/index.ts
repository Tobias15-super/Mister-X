// supabase/functions/timer-tick-loop/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- ENV ---
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// --- Endpunkte ---
const TICK_URL = "https://axirbthvnznvhfagduyj.supabase.co/functions/v1/timer-tick";

// --- Supabase Client (Service-Role) ---
const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  global: { fetch },
  auth: { persistSession: false },
});

// --- Helper: JSON-safe parse ---
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    const text = await res.text().catch(() => "");
    return { ok: false, error: `Non-JSON response (${res.status}): ${text.slice(0, 500)}` };
  }
}

serve(async () => {
  for (let i = 0; i < 6; i++) {
    try {
      const res = await fetch(TICK_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const json: any = await safeJson(res);
      console.log(`[tick-loop] Tick ${i + 1}/6`, json);

      // Wenn timer-tick einen Fehler meldet, nicht sofort abbrechen – kurzer Retry erlaubt
      if (!res.ok || json?.ok === false) {
        console.warn(`[tick-loop] timer-tick returned error (HTTP ${res.status})`);
      }

      const claimed = Number(json?.claimed ?? 0);

      // Gegenregulation: Wenn nichts mehr claimed wurde, prüfen ob noch armed-Timer existieren
      if (claimed === 0) {
        const { data: hasArmed, error: armedErr } = await supa.rpc("has_armed_timers");
        if (armedErr) {
          console.error("[tick-loop] has_armed_timers failed:", armedErr);
        } else if (hasArmed === false) {
          console.log("[tick-loop] No armed timers left -> unscheduling cron job");
          const { error: unschedErr } = await supa.rpc("unschedule_timer_tick");
          if (unschedErr) {
            console.warn("[tick-loop] unschedule_timer_tick failed:", unschedErr);
          }
          break; // frühzeitig beenden – Loop muss nicht weiterlaufen
        }
      }
    } catch (e) {
      console.error(`[tick-loop] Error in tick ${i + 1}:`, e);
    }

    // 10 Sekunden warten
    await new Promise((r) => setTimeout(r, 10_000));
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
