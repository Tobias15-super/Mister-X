/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { precacheAndRoute } from 'workbox-precaching';
import { getDatabase, ref, set } from 'firebase/database';

// Workbox: damit auch Icons offline/schnell verfügbar sind
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
  try {
    await fetch("https://axirbthvnznvhfagduyj.functions.supabase.co/rtdb-ack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, deviceName, timestamp: Date.now() }),
    });
  } catch (e) {
    // Optional: in IndexedDB puffern und später erneut senden
    console.error("[SW] ack failed:", e);
  }
}



// --- iOS-/Safari-Erkennung (Heuristik) ---
function isIOSLikeUA(ua) {
  const s = ua || '';
  const isiOSDevice = /iPhone|iPad|iPod/.test(s);
  const isMacWithTouch = /Macintosh/.test(s) && /Mobile/.test(s); // iPadOS meldet sich oft so
  return isiOSDevice || isMacWithTouch;
}

// --- Push-Handler ---

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    const payload = event.data ? (() => { try { return event.data.json(); } catch { return {}; } })() : {};
    const n = payload.notification || {};
    const d = payload.data || payload || {};

    const title = n.title || d.title || 'Neue Nachricht';
    const body  = n.body  || d.body  || '';
    const url   = d.url || n.click_action || '/Mister-X/';
    const messageId = d.messageId || d.id || n.tag || String(Date.now());
    const tagBase = d.tag || 'mrx';

    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const visibleClient = windows.find((w) => w.visibilityState === 'visible');

    const ua = (self.navigator && self.navigator.userAgent) ? self.navigator.userAgent : '';
    const isIOS = isIOSLikeUA(ua);

    // --- FOREGROUND ---
    if (visibleClient) {
      try { visibleClient.postMessage({ type: 'PUSH', payload: d }); } catch {}

     
    if (isIOS) {
      const fgTag = `${tagBase}-fg`;
      const opts = {
        body,
        icon: '/Mister-X/icons/android-chrome-192x192.png',
        badge: '/Mister-X/icons/Mister_X_Badge.png',
        tag: fgTag,
        renotify: true,
        silent: true,
        requireInteraction: false,
        timestamp: d.timestamp || Date.now(),
        data: { url, messageId, tag: fgTag, fg: true }
      };

      await self.registration.showNotification(title, opts);                      // anzeigen  [4](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
      await waitUntilNotificationVisible(fgTag, { tries: 10, intervalMs: 50 });   // sichtbar?  [1](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications)
      // kurz zeigen und schließen (200–500ms sind oft zuverlässiger als 80ms)
      await new Promise(r => setTimeout(r, 250));
      const notes = await self.registration.getNotifications({ tag: fgTag });     //  [1](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications)
      notes.forEach(n => n.close());

      // Danach erst "delivered"
      try { await markDelivered(messageId, await getDeviceName()); } catch (e) {
        console.error('[SW] markDelivered failed:', e);
      }
      return;
    }}



    // --- BACKGROUND ---
    const bgTag = `${tagBase}-${messageId}`;
    const opts = {
      body,
      icon: '/Mister-X/icons/android-chrome-192x192.png',
      badge: '/Mister-X/icons/Mister_X_Badge.png',
      tag: bgTag,
      renotify: true,
      silent: (d.silent !== undefined) ? !!d.silent : false,
      requireInteraction: d.requireInteraction ?? true,
      vibrate: d.vibrate ?? [200, 100, 200],
      timestamp: d.timestamp || Date.now(),
      data: { url, messageId, tag: bgTag, fg: false }
    };

    await self.registration.showNotification(title, opts); // 1) Anzeige anstoßen  [4](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)

    // 2) Sichtbarkeit bestätigen (sofern Plattform es meldet)
    const shown = await waitUntilNotificationVisible(bgTag, { tries: 10, intervalMs: 100 }); // ~1s total  [1](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications)
    // 3) Erst jetzt "delivered" markieren (bei Timeout: optional trotzdem markieren)
    try {
      const name = await getDeviceName();
      await markDelivered(messageId, name);
    } catch (e) {
      console.error('[SW] markDelivered failed:', e);
    }
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


async function setSwFlag(key, val) {
  const db = await openDbEnsureStore('app-db', 'sw-flags');
  await new Promise((res, rej) => {
    const tx = db.transaction('sw-flags', 'readwrite');
    tx.objectStore('sw-flags').put(val, key);
    tx.oncomplete = () => { db.close(); res(); };
    tx.onerror = () => { db.close(); rej(tx.error); };
  });
}

// Wichtig: Token-/Subscription-Wechsel signalisieren **und** persistieren
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil((async () => {
    // Flag persistieren
    try { await setSwFlag('pushSubscriptionChangedAt', Date.now()); } catch {}

    // an offene Clients posten (falls vorhanden)
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    windows.forEach((c) => {
      try { c.postMessage({ type: 'PUSH_SUBSCRIPTION_CHANGED' }); } catch {}
    });
  })());
});

