// supabase/functions/timer-tick/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Supabase Client (Service Role)
const supa = createClient(SUPABASE_URL, SERVICE_KEY);

// Edge Function Namen
const SEND_FN = "send-to-all";
const SMS_FN  = "sms-fallback";

// Optional: Secret für sms-fallback (falls du es mal aktivierst)
const SMS_SECRET = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";

/**
 * Bearbeitet einen Timer-Job:
 * - Push (Best-Effort) für Logging
 * - SMS IMMER, wenn Empfänger vorhanden (mit Idempotenz via claim_sms_once)
 */
async function handleJob(job: any) {
  const {
    title,
    body,
    link,
    tokens,
    recipient_device_names,
    rtdb_base,
    message_id,
    id: dbId,
  } = job;

  // Fallback-Schlüssel: nutze message_id, sonst auf DB id zurück
  const messageKey = message_id ?? dbId;

  // --- 1) Push senden (nur Best-Effort/Logging) ---
  let pushOk = false;
  let pushBody: any = null;
  try {
    const { data, error } = await supa.functions.invoke(SEND_FN, {
      body: {
        title,
        body,
        tokens: tokens ?? [],
        senderName: "cron",
        link: link ?? "/Mister-X/",
        messageId: messageKey,
        rtdbBase: rtdb_base ?? "",
        recipientDeviceNames: recipient_device_names ?? [],
        setRecipientsMode: "set_once",
        attempt: 1,
      },
      // Viele Middlewares erwarten Authorization; explizit setzen
      headers: { Authorization: `Bearer ${SERVICE_KEY}` },
    });

    pushOk = !error && (data?.ok ?? true);
    pushBody = error ? { error: error.message ?? String(error) } : data;
    console.log("send-to-all:", {
      ok: pushOk,
      statusInfo: pushBody?.status ?? null,
      message_id: messageKey,
    });
  } catch (e) {
    console.error("send-to-all threw:", e);
    pushBody = { error: String(e) };
  }

  // --- 2) SMS immer senden, wenn es Empfänger gibt ---
  const recipients: string[] = recipient_device_names ?? [];
  if (recipients.length > 0) {
    // Idempotenz: nur ERSTER gewinnt (Unique Guard)
    try {
      const { data: canSend, error: claimErr } = await supa.rpc("claim_sms_once", {
        p_message_id: messageKey,
        p_source: "timer-tick",
      });

      if (claimErr) {
        console.error("claim_sms_once failed:", claimErr);
        // armed lassen -> später neuer Versuch; dank Idempotenz keine Doppel-SMS
        return {
          ok: false,
          result: { stage: "claim", error: claimErr.message ?? String(claimErr) },
        };
      }

      if (canSend !== true) {
        // Bereits früher geplant; wir betrachten den Auftrag als erledigt
        console.log("SMS already claimed earlier for", messageKey);
        return { ok: true, result: { stage: "sms", already: true, pushOk, pushBody } };
      }
    } catch (e) {
      console.error("claim_sms_once threw:", e);
      return { ok: false, result: { stage: "claim", error: String(e) } };
    }

    // SMS-Text (auf 280 chars kürzen)
    const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet (unter Android kommt das unverhinderbar manchmal vor, unter iOS bitte einmal die App neu laden über den Knopf oben rechts)`.slice(
      0,
      280,
    );

    try {
      const { data: smsData, error: smsErr } = await supa.functions.invoke(SMS_FN, {
        body: {
          messageId: messageKey,
          recipientDeviceNames: recipients,
          smsText,
          waitSec: 15,
          rtdbBase: rtdb_base ?? "",
          rolesPath: "roles",
          recipientsPath: "notifications",
          idempotencyFlag: "smsTriggered",
          // Falls deine sms-fallback rtdbAuth erwartet, hier ergänzen:
          // rtdbAuth,
        },
        headers: {
          // Kritisch gegen 401: Service-Role explizit mitsenden
          Authorization: `Bearer ${SERVICE_KEY}`,
          // Optional: falls du den Secret-Guard nutzt
          ...(SMS_SECRET ? { "x-sms-secret": SMS_SECRET } : {}),
          // Optional (bei eigener Middleware): apikey
          // apikey: SERVICE_KEY,
        },
      });

      if (smsErr) {
        console.error("SMS fallback failed:", smsErr);
        // armed lassen -> späterer Retry; Doppel-SMS durch claim_sms_once verhindert
        return { ok: false, result: { stage: "sms", error: smsErr.message ?? String(smsErr) } };
      }

      console.log("SMS fallback scheduled:", smsData);
      // Erfolg: SMS geplant -> Auftrag 'fired'
      return { ok: true, result: { stage: "sms", scheduled: true, pushOk, pushBody } };
    } catch (e) {
      console.error("sms-fallback threw:", e);
      return { ok: false, result: { stage: "sms", error: String(e) } };
    }
  }

  // --- 3) Keine Empfänger: nur Push-Ergebnis zurückgeben ---
  return { ok: pushOk, result: { stage: "push_only", pushBody } };
}

serve(async () => {
  try {
    // 1) Fällige Timer claimen
    const { data: due, error: claimErr } = await supa.rpc("claim_due_timers", { limit_n: 10 });
    if (claimErr) throw claimErr;

    // 2) Keine fälligen? ggf. Cron unschedulen
    if (!due || due.length === 0) {
      const { data: hasArmed } = await supa.rpc("has_armed_timers");
      if (hasArmed === false) {
        await supa.rpc("unschedule_timer_tick").catch(() => {});
      }
      return new Response(JSON.stringify({ ok: true, claimed: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3) Jobs abarbeiten
    for (const job of due) {
      try {
        const { ok, result } = await handleJob(job);

        const selectorCol = job.id ? "id" : "message_id";
        const selectorVal = job.id ?? job.message_id;

        if (ok) {
          await supa
            .from("timer_jobs")
            .update({
              status: "fired",
              fired_at: new Date().toISOString(),
              last_error: null,
            })
            .eq(selectorCol, selectorVal);
        } else {
          await supa
            .from("timer_jobs")
            .update({
              status: "armed",
              last_error: JSON.stringify(result).slice(0, 2000),
            })
            .eq(selectorCol, selectorVal);
        }
      } catch (e) {
        const selectorCol = job.id ? "id" : "message_id";
        const selectorVal = job.id ?? job.message_id;
        await supa
          .from("timer_jobs")
          .update({
            status: "armed",
            last_error: String(e).slice(0, 2000),
          })
          .eq(selectorCol, selectorVal);
      }
    }

    // 4) Cleanup – lösche fired/expired/canceled, die älter als 5 Min sind
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: delRows, error: delErr, count: delCount } = await supa
      .from("timer_jobs")
      .delete()
      .lt("due_at", fiveMinutesAgo)
      .in("status", ["fired", "expired", "canceled"])
      .select("id", { count: "exact" }); // representation -> Count zuverlässig

    if (delErr) {
      console.error("Cleanup delete failed:", delErr);
    } else {
      console.log(`Cleanup deleted ${delCount ?? delRows?.length ?? 0} rows older than 5 min`);
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
