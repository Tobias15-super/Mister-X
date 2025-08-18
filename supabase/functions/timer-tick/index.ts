// supabase/functions/timer-tick/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const projectRef = new URL(SUPABASE_URL).host.split(".")[0];
const FUNCTIONS_BASE = `https://${projectRef}.functions.supabase.co`;

const SEND_ENDPOINT = `${FUNCTIONS_BASE}/send-to-all`;
const SMS_ENDPOINT  = `${FUNCTIONS_BASE}/sms-fallback`;


// Optional: Wenn du serverseitig ein Secret für SMS brauchst:
const SMS_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";

async function sendPushAndFallback(job: any) {
  const {
    title, body, link, tokens, recipient_device_names,
    rtdb_base, message_id
  } = job;

  const payload = {
    title,
    body,
    tokens: tokens ?? [],
    senderName: "cron",            // oder ein technischer Name
    link: link ?? "/Mister-X/",
    messageId: message_id,
    rtdbBase: rtdb_base ?? "",
    recipientDeviceNames: recipient_device_names ?? [],
    setRecipientsMode: "set_once",
    attempt: 1
  };

  // 1) Push
  const res = await fetch(SEND_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_KEY}`, // falls nötig
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json().catch(() => ({}));

  // 2) SMS-Fallback sofort "fire-and-forget" planen
  if ((recipient_device_names ?? []).length > 0) {
    const smsText =
      `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet.`.slice(0, 280);

    fetch(SMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SMS_SECRET ? { "x-sms-secret": SMS_SECRET } : {}),
        "Authorization": `Bearer ${SERVICE_KEY}`, // falls nötig
      },
      body: JSON.stringify({
        messageId: message_id,
        recipientDeviceNames: recipient_device_names,
        smsText,
        waitSec: 15,
        rtdbBase: rtdb_base ?? "",
        rolesPath: "roles",
        recipientsPath: "notifications",
        idempotencyFlag: "smsTriggered",
      }),
    })
    
    if (!smsRes.ok) {
      const errText = await smsRes.text().catch(() => "");
      console.error("SMS fallback failed", smsRes.status, errText);
    } else {
      console.log("SMS fallback scheduled ok");
    }


  }

  return { ok: res.ok, result };
}

serve(async () => {
  try {
    // 1) Claim fällige Timer (atomar)
    const { data: due, error: claimErr } = await supa
      .rpc("claim_due_timers", { limit_n: 10 });
    if (claimErr) throw claimErr;

    // 2) Nichts fällig? ggf. Cron deaktivieren, wenn auch keine armed mehr existieren
    if (!due || due.length === 0) {
      const { data: hasArmed } = await supa.rpc("has_armed_timers");
      if (hasArmed === false) {
        await supa.rpc("unschedule_timer_tick").catch(() => {});
      }
      return new Response(JSON.stringify({ ok: true, claimed: 0 }));
    }

    // 3) Für jeden Job senden
    for (const job of due) {
      try {
        const { ok, result } = await sendPushAndFallback(job);
        if (ok) {
          await supa.from("timer_jobs")
            .update({ status: "fired", fired_at: new Date().toISOString(), last_error: null })
            .eq("id", job.id);
        } else {
          await supa.from("timer_jobs")
            .update({ status: "armed", last_error: JSON.stringify(result).slice(0, 2000) })
            .eq("id", job.id);
        }
      } catch (e) {
        await supa.from("timer_jobs")
          .update({ status: "armed", last_error: String(e).slice(0, 2000) })
          .eq("id", job.id);
      }
    }

    // 4) Wenn jetzt keine armed mehr existieren: Cron abschalten
    const { data: hasArmed } = await supa.rpc("has_armed_timers");
    if (hasArmed === false) {
      await supa.rpc("unschedule_timer_tick").catch(() => {});
    }

    
    // 5) Alte Einträge löschen (älter als 5 Minuten)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { error: delErr, count: delCount } = await supa
      .from("timer_jobs")
      .delete({ count: "exact" }) // zählt die gelöschten Zeilen
      .lt("due_at", fiveMinutesAgo)
      .in("status", ["fired", "armed", "expired"]);

    if (delErr) {
      console.error("Cleanup delete failed:", delErr);
    } else {
      console.log(`Cleanup deleted ${delCount ?? 0} rows older than 5 min`);
    }



    return new Response(JSON.stringify({ ok: true, claimed: due.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
});
