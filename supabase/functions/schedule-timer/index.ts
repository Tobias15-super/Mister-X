import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { endTime } = await req.json();
  const delayMs = Math.max(endTime - Date.now(), 0);

  const response = await fetch("https://qstash.upstash.io/v2/schedules", {
    method: "POST",
    headers: {
      "Authorization": "Bearer DEIN_QSTASH_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      destination: "https://axirbthvnznvhfagduyj.functions.supabase.co/send-timer-message",
      delay: delayMs,
      body: JSON.stringify({ timerId: "main" })
    })
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), { status: 200 });
});
