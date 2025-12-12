// supabase/functions/timer-tick/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- ENV ---
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SMS_SECRET   = Deno.env.get("SMS_FALLBACK_SECRET") ?? "";

// --- Supabase Client (Service-Role) ---
const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  global: { headers: { "X-Client-Info": "timer-tick/1.0" } },
});

// --- Edge Function Namen ---
const SEND_FN = "send-to-all";
const SMS_FN  = "sms-fallback";


// --- Helper: JSON Response ---
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// --- RPC-Helper: Stage-Claim (Idempotenz pro Stage, z. B. 'push') ---
async function claimStageOnce(messageId: string, stage: "push" | "sms" | string): Promise<boolean> {
  const { data, error } = await supa.rpc("claim_job_stage_once", {
    p_message_id: messageId,
    p_stage: stage,
  });
  if (error) throw error;
  return data === true;
}

/**
 * Bearbeitet einen Timer-Job:
 * - Push: jetzt idempotent via claim_job_stage_once('push') -> wird pro message_id nur 1x gesendet
 * - SMS: IMMER wenn Empfänger vorhanden, idempotent via claim_sms_once (bereits vorhanden)
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

    // NEU:
    roles,
    resolve_recipients_at_send_time,
  } = job;

  const messageKey: string = message_id ?? dbId;

  // --- 1) Push senden (idempotent) ---
  // ...
  if (shouldSendPush) {
    try {
      // Wenn wir zur Versandzeit Empfänger nach Rollen auflösen sollen:
      if (resolve_recipients_at_send_time && Array.isArray(roles) && roles.length > 0) {
        const resp = await supa.functions.invoke(SEND_FN, {
          body: {
            title,
            body,
            senderName: "cron",
            link: link ?? "/Mister-X/",
            messageId: messageKey,
            rtdbBase: rtdb_base ?? "",
            roles,                            // Rollen mitgeben
            resolveRecipientsAtSendTime: true,
            setRecipientsMode: "set_once",    // optional: damit recipients geschrieben werden wenn gewünscht
            attempt: 1,
          },
          headers: {
            Authorization: `Bearer ${SERVICE_KEY}`,
            apikey: SERVICE_KEY,
          },
        });

        // parse result
        const { data, error } = resp;
        pushOk = !error && (data?.ok === true);
        pushBody = error ? { error: error.message ?? String(error) } : data;
      } else {
        // Altes Verhalten: token + recipientDeviceNames weiterreichen
        const resp = await supa.functions.invoke(SEND_FN, {
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
          headers: {
            Authorization: `Bearer ${SERVICE_KEY}`,
            apikey: SERVICE_KEY,
          },
        });

        const { data, error } = resp;
        pushOk = !error && (data?.ok === true);
        pushBody = error ? { error: error.message ?? String(error) } : data;
      }

      console.log("send-to-all:", {
        ok: pushOk,
        statusInfo: pushBody?.status ?? null,
        message_id: messageKey,
      });
    } catch (e) {
      console.error("send-to-all threw:", e);
      pushBody = { error: String(e) };
      pushOk = false;
    }
  } else {
    // Push wurde bereits früher gesendet – als erfolgreich werten, um SMS-Flow nicht zu blockieren
    pushOk = true;
    pushBody = pushBody ?? { skipped: true, reason: "push-already-claimed" };
    console.log("Push already sent earlier for", messageKey);
  }

  // --- 2) SMS immer senden, wenn es Empfänger gibt (idempotent via claim_sms_once) ---
  const recipients: string[] = recipient_device_names ?? [];
  if (recipients.length > 0) {
    // Idempotenz-Guard: nur ERSTER gewinnt
    try {
      const { data: canSend, error: claimErr } = await supa.rpc("claim_sms_once", {
        p_message_id: messageKey,
        p_source: "timer-tick",
      });
      if (claimErr) {
        console.error("claim_sms_once failed:", claimErr);
        // armed lassen -> späterer Retry; keine Doppel-SMS
        return {
          ok: false,
          result: { stage: "claim", error: claimErr.message ?? String(claimErr) },
        };
      }
      if (canSend !== true) {
        console.log("SMS already claimed earlier for", messageKey);
        return { ok: true, result: { stage: "sms", already: true, pushOk, pushBody } };
      }
    } catch (e) {
      console.error("claim_sms_once threw:", e);
      return { ok: false, result: { stage: "claim", error: String(e) } };
    }

    // SMS-Text (auf 280 chars kürzen)
    const smsText = `${title}: ${body}
Diese Nachricht wurde automatisch gesendet.`.slice(0, 280);

    // Direkt per fetch rufen -> volle Header-Kontrolle
    try {
      const smsUrl = `${SUPABASE_URL}/functions/v1/${SMS_FN}`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-sms-secret": SMS_SECRET,
      };

      const resp = await fetch(smsUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          messageId: messageKey,
          recipientDeviceNames: recipients,
          smsText,
          waitSec: 15,
          rtdbBase: rtdb_base ?? "",
          rolesPath: "roles",
          recipientsPath: "notifications",
          idempotencyFlag: "smsTriggered",
          // rtdbAuth: ... // falls deine sms-fallback das erwartet
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        console.error("sms-fallback non-2xx", resp.status, resp.statusText, text);
        const retryable = resp.status >= 500 || resp.status === 0;
        return {
          ok: false,
          result: {
            stage: "sms",
            error: `HTTP ${resp.status} ${resp.statusText}`,
            body: text.slice(0, 500),
            retryable,
          },
        };
      }

      const smsData = await resp.json().catch(() => ({}));
      return { ok: true, result: { stage: "sms", pushOk, pushBody, smsData } };
    } catch (e) {
      console.error("SMS fetch threw:", e);
      return { ok: false, result: { stage: "sms", error: String(e), retryable: true } };
    }
  }

  // --- 3) Keine Empfänger: nur Push-Ergebnis zurückgeben ---
  return { ok: pushOk, result: { stage: "push_only", pushBody } };
}

// --- HTTP-Handler ---
serve(async (_req) => {
  try {
    // 1) Fällige Timer claimen
    // HINWEIS: Idealerweise macht dein claim_due_timers ein
    // "UPDATE ... WHERE id IN (SELECT ... FOR UPDATE SKIP LOCKED LIMIT n) RETURNING *"
    // (DB-seitig, nicht hier in JS), damit es keine Doppel-Claims gibt.
    const { data: due, error: claimErr } = await supa.rpc("claim_due_timers", {
      limit_n: 10,
    });
    if (claimErr) throw claimErr;

    // 2) Keine fälligen? ggf. Cron unschedulen
    if (!due || due.length === 0) {
      const { data: hasArmed, error: hasArmedErr } = await supa.rpc("has_armed_timers");
      if (hasArmedErr) {
        console.error("has_armed_timers failed:", hasArmedErr);
      } else if (hasArmed === false) {
        const { error: unschedErr } = await supa.rpc("unschedule_timer_tick");
        if (unschedErr) {
          console.warn("unschedule_timer_tick failed:", unschedErr);
        }
      }
      return json({ ok: true, claimed: 0 });
    }

    // 3) Jobs abarbeiten (seriell – gut für SMS-Anbieter)
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
              status: "armed", // Retry
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

    return json({ ok: true, claimed: due.length });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500);
  } finally {
    // 4) Cleanup – lösche fired/expired/canceled, die älter als 5 Min sind
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: delRows, error: delErr, count: delCount } = await supa
        .from("timer_jobs")
        .delete()
        .lt("due_at", fiveMinutesAgo)
        .in("status", ["fired", "expired", "canceled"])
        .select("id", { count: "exact" });

      if (delErr) {
        console.error("Cleanup delete failed:", delErr);
      } else {
        console.log(`Cleanup deleted ${delCount ?? delRows?.length ?? 0} rows older than 5 min`);
      }
    } catch (cleanupErr) {
      console.error("Cleanup failed:", cleanupErr);
    }
  }
});
