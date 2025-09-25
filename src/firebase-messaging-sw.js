/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage} from 'firebase/messaging/sw';
import { precacheAndRoute } from 'workbox-precaching';

// Workbox: damit Icons offline/schnell verfügbar sind
precacheAndRoute(self.__WB_MANIFEST || []);

// --- Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// --- Helpers ---
const RTDB_BASE = firebaseConfig.databaseURL;

// --- ACK-Queue (IndexedDB) ------------------------------------
async function queueAck(entry) {
  const db = await openDbEnsureStore('app-db', 'ack-queue');
  await new Promise((res, rej) => {
    const tx = db.transaction('ack-queue', 'readwrite');
    const store = tx.objectStore('ack-queue');
    // Key explizit vergeben (timestamp + random)
    const key = Date.now() + Math.random();
    store.add({ key, entry, ts: Date.now() }, key);
    tx.oncomplete = () => { db.close(); res(); };
    tx.onerror = () => { db.close(); rej(tx.error); };
  });
}


async function flushQueuedAcks() {
  const db = await openDbEnsureStore('app-db', 'ack-queue');
  const items = await new Promise((res, rej) => {
    const tx = db.transaction('ack-queue', 'readonly');
    const store = tx.objectStore('ack-queue');
    const req = store.getAll();
    req.onsuccess = () => res(req.result || []);
    req.onerror = () => rej(req.error);
  });

  if (!items.length) { db.close(); return; }

  for (const it of items) {
    try {
      await sendAckNow(it.entry); // siehe markDelivered -> ausgelagert
      // bei Erfolg löschen
      await new Promise((res, rej) => {
        const tx = db.transaction('ack-queue', 'readwrite');
        tx.objectStore('ack-queue').delete(it.key);
        tx.oncomplete = () => res();
        tx.onerror = () => rej(tx.error);
      });
    } catch (e) {
      // Abbruch: Beim ersten Fehler aufhören => späterer Versuch
      break;
    }
  }
  db.close();
}


async function sendAckNow(payload) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch("https://axirbthvnznvhfagduyj.functions.supabase.co/rtdb-ack", {
      method: "POST",
      body: JSON.stringify(payload),
      // mode: "no-cors", // entfernt!
      signal: ctrl.signal,
      cache: "no-store",
      credentials: "omit",
    });
    const txt = await res.text().catch(() => "");
    swLog("[SW] ACK fetch sent", { status: res.status, ok: res.ok, body: txt.slice(0, 300) });
  } catch (err) {
    swLog("[SW] ACK fetch failed", err);
    throw err;
  } finally {
    clearTimeout(t);
  }
}


self.addEventListener('message', async (event) => {
  if (event?.data?.type === 'PUSH') {
    const payload = event.data.payload || {};
    const d = payload.data || {};
    const title = d.title ?? 'Neue Nachricht';
    const body  = d.body  ?? '';
    const url   = d.url   ?? '/Mister-X/';
    const messageId = d.messageId || String(Date.now());
    const token = d.token || null;
    const tagBase = d.tag || 'mrx';
    const bgTag = `${tagBase}-${messageId}`;

    // Prüfe, ob iOS/Safari (mustPresentOnThisPlatform)
    const ua = event.data.userAgent || (event.source && event.source.userAgent) || '';
    if (mustPresentOnThisPlatform(ua || navigator.userAgent)) {
      // Zeige Notification auch im Vordergrund
      const opts = {
        body,
        icon:  '/Mister-X/icons/android-chrome-192x192.png',
        badge: '/Mister-X/icons/Mister_X_Badge.png',
        tag: bgTag,
        renotify: true,
        silent: true,
        requireInteraction: false,
        vibrate: d.vibrate ?? [200, 100, 200],
        timestamp: d.timestamp ? Number(d.timestamp) : Date.now(),
        data: { url, messageId, tag: bgTag, fg: true }
      };
      try { await self.registration.showNotification(title, opts); } catch (e) {
        swLog('[SW] showNotification (fg) failed', e);
      }
      await new Promise(r => setTimeout(r, 900));
      (await self.registration.getNotifications({ tag: bgTag })).forEach(n => n.close());
    }
    // ACK wie gehabt
    try { await markDelivered(messageId, token); }
    catch (e) { swLog('[SW] markDelivered (fg) failed:', e); }
  }
});



// --- SW-Log-Pufferung und Übertragung an die Seite ---

// 1. SW: Log-Messages in IndexedDB speichern
async function swLogStore(msg) {
  try {
    const db = await openDbEnsureStore('app-db', 'sw-logs');
    const tx = db.transaction('sw-logs', 'readwrite');
    const store = tx.objectStore('sw-logs');
    const entry = { msg, ts: Date.now() };

    // WICHTIG: Store wurde ohne keyPath/autoIncrement angelegt -> Key mitgeben!
    // Nutze den Zeitstempel als eindeutigen Schlüssel (bei Kollision: + Math.random()).
    let key = entry.ts;
    try {
      store.add(entry, key);
    } catch {
      key = entry.ts + Math.random();
      store.add(entry, key);
    }

    tx.oncomplete = () => db.close();
    tx.onerror = () => db.close();
  } catch (e) {
    // Fallback: nichts tun
  }
}


// 2. SW: Log-Funktion, die auch im Hintergrund funktioniert

function swLog(...args) {
  const printable = args.map(a => {
    if (a instanceof Error) {
      return { name: a.name, message: a.message, stack: a.stack };
    }
    // DOMException oder error-ähnlich:
    if (a && typeof a === 'object' && ('name' in a || 'message' in a)) {
      return { name: a.name, message: a.message, code: a.code, stack: a.stack };
    }
    return a;
  });

  try { console.log('[SW]', ...printable); } catch {}
  // Für deinen IndexedDB-Store in String wandeln
  const msg = printable.map(x => typeof x === 'string' ? x : (() => {
    try { return JSON.stringify(x); } catch { return String(x); }
  })()).join(' ');
  swLogStore(msg).catch(()=>{});
}


// 4. SW: Bei Seitenstart alle Logs an die Seite schicken

self.addEventListener('message', (event) => {
  if (!event || !event.data) return;

  // kleine Hilfsfunktion für gezielte Antwort
  const reply = async (payload) => {
    // 1) Wenn die Seite einen MessageChannel-Port mitgeschickt hat:
    if (event.ports && event.ports[0]) {
      try { event.ports[0].postMessage(payload); return; } catch {}
    }
    // 2) An die konkrete Quelle antworten (falls sichtbar):
    if (event.source && 'postMessage' in event.source) {
      try { event.source.postMessage(payload); return; } catch {}
    }
    // 3) Fallback: Broadcast an bekannte Clients
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    allClients.forEach(c => { try { c.postMessage(payload); } catch {} });
  };

  if (event.data.type === 'GET_SW_LOGS') {
    (async () => {
      try {
        const db = await openDbEnsureStore('app-db', 'sw-logs');
        const tx = db.transaction('sw-logs', 'readonly');
        const store = tx.objectStore('sw-logs');
        const req = store.getAll();
        req.onsuccess = async () => {
          const logs = req.result || [];
          await reply({ type: 'SW_LOGS', logs });
          db.close();
        };
        req.onerror = () => { db.close(); };
      } catch (e) {
        // Im Fehlerfall wenigstens eine leere Antwort schicken
        await reply({ type: 'SW_LOGS', logs: [] });
      }
    })();
  }

  if (event.data.type === 'CLEAR_SW_LOGS') {
    (async () => {
      try {
        const db = await openDbEnsureStore('app-db', 'sw-logs');
        const tx = db.transaction('sw-logs', 'readwrite');
        tx.objectStore('sw-logs').clear();
        tx.oncomplete = () => db.close();
        tx.onerror = () => db.close();
      } catch {}
    })();
  }

  if (event && event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // Optional: PING → PONG zum Schnelltest der Verbindung
  if (event.data.type === 'PING') {
    (async () => {
      await reply({ type: 'PONG', ts: Date.now() });
    })();
  }
});



function openDbEnsureStore(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const openReq = indexedDB.open(dbName);
    openReq.onupgradeneeded = () => {
      const db = openReq.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    openReq.onsuccess = () => {
      const db = openReq.result;
      if (db.objectStoreNames.contains(storeName)) {
        resolve(db);
        return;
      }
      const newVersion = db.version + 1;
      db.close();
      const upgradeReq = indexedDB.open(dbName, newVersion);
      upgradeReq.onupgradeneeded = () => {
        const udb = upgradeReq.result;
        if (!udb.objectStoreNames.contains(storeName)) {
          udb.createObjectStore(storeName);
        }
      };
      upgradeReq.onsuccess = () => resolve(upgradeReq.result);
      upgradeReq.onerror = () => reject(upgradeReq.error);
    };
    openReq.onerror = () => reject(openReq.error);
  });
}

function mustPresentOnThisPlatform(ua) {
  const s = ua || '';
  // „echtes“ Safari erkennen (kein Chrome/Edge/Firefox auf iOS)
  const isSafari = /Safari/i.test(s) && !/(Chrome|CriOS|EdgiOS|FxiOS)/i.test(s);
  // iOS-/iPadOS-Heuristik (inkl. iPadOS „Macintosh“ + „Mobile“)
  const isiOSLike = /iPhone|iPad|iPod/.test(s) || (/Macintosh/.test(s) && /Mobile/.test(s));
  // Auf Safari (macOS & iOS) gilt die „immer sichtbar“ Vorgabe
  return isSafari || isiOSLike;
}


async function safeWaitForVisible(tag, opts) {
  try {
    if (!self.registration || typeof self.registration.getNotifications !== 'function') {
      // API fehlt auf dieser Plattform -> nicht blockieren
      return false;
    }
    return await waitUntilNotificationVisible(tag, opts);
  } catch (e) {
    swLog('[SW] getNotifications failed or unsupported:', e);
    return false;
  }
}


// Helper: Warten bis Notification mit bestimmtem Tag sichtbar ist
async function waitUntilNotificationVisible(tag, {
  tries = 10,          // max. Versuche
  intervalMs = 100     // Abstand zwischen Versuchen
} = {}) {
  for (let i = 0; i < tries; i++) {
    const list = await self.registration.getNotifications({ tag });
    if (Array.isArray(list) && list.length > 0) return true;
    await new Promise(r => setTimeout(r, intervalMs));
  }
  return false; // ggf. Timeout -> Fallback-Entscheidung nötig
}





async function markDelivered(messageId, token) {
  const payload = { messageId, token, timestamp: Date.now() };
  swLog("[SW] ACK payload:", payload);
  try {
    await sendAckNow(payload);
    swLog("[SW] ack ok");
  } catch (e) {
    swLog("[SW] ack failed, queuing:", e);
    try {
      await queueAck(payload);
      if (self.registration.sync) {
        try { await self.registration.sync.register('flush-acks'); } catch {}
      }
    } catch (e2) {
      swLog("[SW] queueAck failed:", e2);
    }
  }
}




self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    swLog('[SW] activate - ready');
    await self.clients.claim();
    try { await flushQueuedAcks(); } catch {}
  })());
});





// --- Push-Handler ---


onBackgroundMessage(messaging, async (payload) => { // NEW
  try { await flushQueuedAcks(); } catch {}

  const d = payload?.data ?? {};
  const title = d.title ?? 'Neue Nachricht';
  const body  = d.body  ?? '';
  const url   = d.url   ?? '/Mister-X/';
  const messageId = d.messageId || String(Date.now());
  const token = d.token || null;
  const tagBase = d.tag || 'mrx';
  const bgTag = `${tagBase}-${messageId}`;

  // Anzeige (Background)
  const opts = {
    body,
    icon:  '/Mister-X/icons/android-chrome-192x192.png',
    badge: '/Mister-X/icons/Mister_X_Badge.png',
    tag: bgTag,
    renotify: true,
    silent: d.silent !== undefined ? !!d.silent : false,
    requireInteraction: d.requireInteraction ?? true,
    vibrate: d.vibrate ?? [200, 100, 200],
    timestamp: d.timestamp ? Number(d.timestamp) : Date.now(),
    data: { url, messageId, tag: bgTag, fg: false }
  };

  try { await self.registration.showNotification(title, opts); } catch (e) {
    swLog('[SW] showNotification failed', e);
  }

  // Best-effort Sichtbarkeit checken (blockiert nicht)
  safeWaitForVisible(bgTag, { tries: 10, intervalMs: 100 }).catch(()=>{});

  // ACK IMMER (Background)
  try { await markDelivered(messageId, token); }
  catch (e) { swLog('[SW] markDelivered (bg) failed:', e); }
});



// Klickverhalten
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    try { await flushQueuedAcks(); } catch {}
    const url = (event.notification && event.notification.data && event.notification.data.url) || '/Mister-X/';
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      if ('focus' in client && client.url.includes('/Mister-X/')) {
        return client.focus();
      }
    }
    if (clients.openWindow) return clients.openWindow(url);
  })());
});


self.addEventListener('sync', (event) => {
  if (event.tag === 'flush-acks') {
    event.waitUntil(flushQueuedAcks());
  }
});



async function setSwFlag(key, val) {
  const db = await openDbEnsureStore('app-db', 'sw-flags');
  await new Promise((res, rej) => {
    const tx = db.transaction('sw-flags', 'readwrite');
    tx.objectStore('sw-flags').put(val, key);
    tx.oncomplete = () => { db.close(); res(); };
    tx.onerror = () => { db.close(); rej(tx.error); };
  });
}


self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil((async () => {
    try {
      // Mit denselben Optionen neu subscriben (inkl. applicationServerKey)
      const newSub = await self.registration.pushManager.subscribe(
        event.oldSubscription ? event.oldSubscription.options : { userVisibleOnly: true /* + applicationServerKey */ }
      );

      // An Server melden (falls du VAPID/WebPush direkt nutzt)
      // await fetch('/api/push/subscribe', { method:'POST', body: JSON.stringify(newSub) });

      // Offene Clients informieren (für FCM-Token-Refresh im Fenster)
      const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      windows.forEach((c) => {
        try { c.postMessage({ type: 'PUSH_SUBSCRIPTION_CHANGED', payload: { /* optional: newSub */ } }); } catch {}
      });

      // Optional: Flag persistieren
      try { await setSwFlag('pushSubscriptionChangedAt', Date.now()); } catch {}
    } catch (err) {
      swLog('[SW] re-subscribe failed:', err);
    }
  })());
});


