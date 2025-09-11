/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
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
getMessaging(app); // Initialisiert FCM im SW-Kontext (keinen Listener hier registrieren)

// --- Helpers ---
const RTDB_BASE = firebaseConfig.databaseURL;

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
  const msg = args.map(a => {
    if (typeof a === 'object') {
      try { return JSON.stringify(a); } catch { return '[object]'; }
    }
    return String(a);
  }).join(' ');
  // Immer in der Konsole (für DevTools)
  console.log('[SW]', msg);
  // Immer in IndexedDB speichern
  swLogStore(msg);
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

  // Optional: PING → PONG zum Schnelltest der Verbindung
  if (event.data.type === 'PING') {
    (async () => {
      await reply({ type: 'PONG', ts: Date.now() });
    })();
  }
});



function sanitizeKey(key) {
  return (key || '').replace(/[.#$/\[\]\/]/g, '_');
}

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

async function getDeviceName() {
  try {
    const db = await openDbEnsureStore('app-db', 'settings');
    return await new Promise((resolve) => {
      const tx = db.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const req = store.get('deviceName');
      req.onsuccess = () => { db.close(); resolve(req.result || null); };
      req.onerror = () => { db.close(); resolve(null); };
    });
  } catch {
    return null;
  }
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




async function markDelivered(messageId, deviceName) {
  const payload = { messageId, deviceName, timestamp: Date.now() };
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000); // 8s Safety Timeout
    await fetch("https://axirbthvnznvhfagduyj.functions.supabase.co/rtdb-ack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
      keepalive: true,
      signal: ctrl.signal
    });
    clearTimeout(t);
    swLog("[SW] ack ok");
  } catch (e) {
    swLog("[SW] ack failed, queuing:", e);
    // Hier: in IndexedDB ablegen & später flushen
    await queueAck(payload).catch(() => {});
    // Optional: Background Sync anstoßen, wenn verfügbar
    if (self.registration.sync) {
      try { await self.registration.sync.register('flush-acks'); } catch {}
    }
  }
}




// --- iOS-/Safari-Erkennung (Heuristik) ---
function isIOSLikeUA(ua) {
  const s = ua || '';
  const isiOSDevice = /iPhone|iPad|iPod/.test(s);
  const isMacWithTouch = /Macintosh/.test(s) && /Mobile/.test(s); // iPadOS meldet sich oft so
  return isiOSDevice || isMacWithTouch;
}


self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    swLog('[SW] activate - ready');
    await self.clients.claim();
  })());
});


// --- Push-Handler ---

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    // Payload robust parsen
    const payload = event.data ? (() => { try { return event.data.json(); } catch { return {}; } })() : {};
    const n = payload.notification ?? {};
    const d = payload.data ?? payload ?? {};

    const title = n.title ?? d.title ?? 'Neue Nachricht';
    const body = n.body ?? d.body ?? '';
    const url = d.url ?? n.click_action ?? '/Mister-X/';
    const messageId = d.messageId ?? d.id ?? n.tag ?? String(Date.now());
    const tagBase = d.tag ?? 'mrx';

    // Sichtbarer Client?
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const visibleClient = windows.find((w) => w.visibilityState === 'visible');

    // Safari/iOS? -> muss sichtbar präsentiert werden
    const ua = (self.navigator && self.navigator.userAgent) ? self.navigator.userAgent : '';
    const mustShow = mustPresentOnThisPlatform(ua);

    if (visibleClient) {
      // Seite informieren (UI-Update etc.)
      try { visibleClient.postMessage({ type: 'PUSH', payload: d }); } catch {}

      // *** IMMER ACKEN – auch ohne OS-Banner (Android/Chrome) ***
      try { await markDelivered(messageId, await getDeviceName()); }
      catch (e) { swLog('[SW] markDelivered (fg) failed:', e); }

      // Nur Safari/iOS: kurze, lautlose Sichtbarkeits-Noti
      if (mustShow) {
        const fgTag = `${tagBase}-fg`;
        const opts = {
          body,
          icon: '/Mister-X/icons/android-chrome-192x192.png',
          badge: '/Mister-X/icons/Mister_X_Badge.png',
          tag: fgTag,
          renotify: true,
          silent: true,
          requireInteraction: false,
          timestamp: d.timestamp ?? Date.now(),
          data: { url, messageId, tag: fgTag, fg: true }
        };
        await self.registration.showNotification(title, opts);
        // Sichtbarkeit best-effort abwarten und wieder schließen
        await waitUntilNotificationVisible(fgTag, { tries: 10, intervalMs: 50 }).catch(() => {});
        await new Promise(r => setTimeout(r, 900));
        (await self.registration.getNotifications({ tag: fgTag })).forEach(n => n.close());
      }
      return; // Foreground fertig
    }

    // --- BACKGROUND ---
    const bgTag = `${tagBase}-${messageId}`;
    const opts = {
      body,
      icon: '/Mister-X/icons/android-chrome-192x192.png',
      badge: '/Mister-X/icons/Mister_X_Badge.png',
      tag: bgTag,
      renotify: true,
      silent: d.silent !== undefined ? !!d.silent : false,
      requireInteraction: d.requireInteraction ?? true,
      vibrate: d.vibrate ?? [200, 100, 200],
      timestamp: d.timestamp ?? Date.now(),
      data: { url, messageId, tag: bgTag, fg: false }
    };

    await self.registration.showNotification(title, opts);

    // Sichtbarkeit nur best-effort, nicht blockierend
    safeWaitForVisible(bgTag, { tries: 10, intervalMs: 100 }).catch(() => {});

    // ACK im Hintergrund ebenfalls IMMER
    try { await markDelivered(messageId, await getDeviceName()); }
    catch (e) { swLog('[SW] markDelivered (bg) failed:', e); }
  })());
});


// Klickverhalten
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
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

// Soft-Update
self.addEventListener('message', (event) => {
  if (event && event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
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


