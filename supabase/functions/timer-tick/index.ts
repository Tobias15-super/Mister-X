// supabase/functions/timer-tick/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// ✅ Supabase-Client anlegen (hat in deinem Snippet gefehlt)
const supa = createClient(SUPABASE_URL, SERVICE_KEY);

const projectRef = new URL(SUPABASE_URL).host.split(".")[0];
const FUNCTIONS_BASE = `https://${projectRef}.functions.supabase.co`;

const SEND_ENDPOINT = `${FUNCTIONS_BASE}/send-to-all`;
const SMS_ENDPOINT  = `${FUNCTIONS_BASE}/sms-fallback`;

// Optional: serverseitiges Secret für sms-fallback
const SMS_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";

async function sendPushAndFallback(job: any) {
const { title, body, link, tokens, recipient_device_names, rtdb_base, message_id } = job;

  const payload = {
    title,
    body,
    tokens: tokens ?? [],
    senderName: "cron",
    link: link ?? "/Mister-X/",
    messageId: message_id,
    rtdbBase: rtdb_base ?? "",
    recipientDeviceNames: recipient_device_names ?? [],
    setRecipientsMode: "set_once",
    attempt: 1
  };

  // 1) Push
  let pushHttpOk = false;
  let pushBody: any = null;
  try {
    const res = await fetch(SEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVICE_KEY}`,
        // Optional, falls benötigt:
        // "apikey": SERVICE_KEY,
      },
      body: JSON.stringify(payload)
    });
    const raw = await res.text().catch(() => "");
    try { pushBody = JSON.parse(raw); } catch { pushBody = { raw }; }
    pushHttpOk = res.ok;
    console.log("send-to-all", { status: res.status, ok: pushHttpOk, message_id, id: job.id });
  } catch (e) {
    pushBody = { error: String(e) };
    console.error("send-to-all threw", message_id, e);
  }

  const pushBodyOk = (pushBody?.ok !== undefined ? !!pushBody.ok : true);
  const hadDeliveryErrors = Array.isArray(pushBody?.errors) && pushBody.errors.length > 0;
  const shouldFallback = !pushHttpOk || !pushBodyOk || hadDeliveryErrors;

  // 2) SMS-Fallback nur wenn nötig


  const recipients = recipient_device_names ?? [];
  if (recipients.length > 0) {
    // Atomarer Guard gegen Doppelsendungen
    const { data: canSend, error: claimErr } = await supa
      .rpc('claim_sms_once', { p_message_id: message_id, p_source: 'timer-tick' });

    if (claimErr) {
      console.error('claim_sms_once failed:', claimErr);
      // Wenn Claim nicht geht, lieber ARMED lassen, damit wir später nochmal versuchen können.
      return { ok: false, result: { stage: 'claim', error: String(claimErr) } };
    }

    if (canSend === true) {
      const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet.`.slice(0, 280);

      // Tipp: Auf supabase-js umstellen, damit Header/Keys wie im Main-Skript gesetzt werden.
      const { data: smsData, error: smsErr } = await supa.functions.invoke('sms-fallback', {
        body: {
          messageId: message_id,
          recipientDeviceNames: recipients,
          smsText,
          waitSec: 15,
          rtdbBase: rtdb_base ?? "",
          rolesPath: "roles",
          recipientsPath: "notifications",
          idempotencyFlag: "smsTriggered"
        },
        headers: (SMS_SECRET ? { 'x-sms-secret': SMS_SECRET } : {})
      });

      if (smsErr) {
        console.error('SMS fallback failed:', smsErr);
        // Wichtig: Trotz Claim-true gab es Fehler beim Planen → lasse Job ARMED,
        // aber Idempotenz schützt vor Doppel-SMS beim nächsten Versuch.
        return { ok: false, result: { stage: 'sms', error: smsErr.message ?? String(smsErr) } };
      }

      console.log('SMS fallback scheduled ok:', smsData);
      // Ziel erreicht: mindestens SMS wurde geplant → Job kann als fired markiert werden
      return { ok: true, result: { stage: 'sms', scheduled: true, data: smsData } };
    } else {
      // Schon (früher) gescheduled → wir behandeln als erledigt:
      console.log('SMS already claimed earlier for', message_id);
      return { ok: true, result: { stage: 'sms', already: true } };
    }
  }

  // Falls keine Recipients: nur Push-Result zurückgeben
  return { ok: true, result: { stage: 'push_only' } };
}




serve(async () => {
  try {
    // 1) Claim fällige Timer atomar
    const { data: due, error: claimErr } = await supa
      .rpc("claim_due_timers", { limit_n: 10 });
    if (claimErr) throw claimErr;

    // 2) Nichts fällig? ggf. Cron deaktivieren, wenn keine armed mehr existieren
    if (!due || due.length === 0) {
      const { data: hasArmed } = await supa.rpc("has_armed_timers");
      if (hasArmed === false) {
        await supa.rpc("unschedule_timer_tick").catch(() => {});
      }
      return new Response(JSON.stringify({ ok: true, claimed: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3) Für jeden Job senden
    for (const job of due) {
      try {
        const { ok, result } = await sendPushAndFallback(job);

        const selectorCol = job.id ? "id" : "message_id";
        const selectorVal = job.id ?? job.message_id;

        if (ok) {
          await supa.from("timer_jobs")
            .update({
              status: "fired",
              fired_at: new Date().toISOString(),
              last_error: null
            })
            .eq(selectorCol, selectorVal);
        } else {
          await supa.from("timer_jobs")
            .update({
              status: "armed",
              last_error: JSON.stringify(result).slice(0, 2000)
            })
            .eq(selectorCol, selectorVal);
        }
      } catch (e) {
        const selectorCol = job.id ? "id" : "message_id";
        const selectorVal = job.id ?? job.message_id;

        await supa.from("timer_jobs")
          .update({
            status: "armed",
            last_error: String(e).slice(0, 2000)
          })
          .eq(selectorCol, selectorVal);
      }
    }

    // Cleanup – konservativer + korrektes count
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { error: delErr, count: delCount } = await supa
      .from("timer_jobs")
      .delete()
      .lt("due_at", fiveMinutesAgo)
      .in("status", ["fired", "expired"]) // <- 'armed' entfernt
      .select("*", { count: "exact", head: true });

    if (delErr) {
      console.error("Cleanup delete failed:", delErr);
    } else {
      console.log(`Cleanup deleted ${delCount ?? 0} rows older than 5 min`);
    }


    return new Response(JSON.stringify({ ok: true, claimed: due.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
