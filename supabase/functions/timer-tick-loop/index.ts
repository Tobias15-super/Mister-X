// supabase/functions/timer-tick-loop/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TICK_URL = "https://axirbthvnznvhfagduyj.supabase.co/functions/v1/timer-tick";

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

      const json = await res.json();
      console.log(`[tick-loop] Tick ${i + 1}/6`, json);

      // Optional: abbrechen, wenn keine Jobs mehr da sind
      if (json?.claimed === 0) {
        console.log("[tick-loop] No jobs claimed – stopping early");
        break;
      }
    } catch (e) {
      console.error(`[tick-loop] Error in tick ${i + 1}:`, e);
    }

    // 10 Sekunden warten
    await new Promise((r) => setTimeout(r, 10000));
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
