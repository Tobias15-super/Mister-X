/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { precacheAndRoute } from 'workbox-precaching';

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

async function markDelivered(messageId, deviceName) {
  if (!messageId || !deviceName) return;
  const safeName = sanitizeKey(deviceName);
  const url = `${RTDB_BASE}/notifications/${messageId}/recipients/${safeName}.json`;
  try {
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(true),
    });
  } catch (e) {
    console.error('[SW] RTDB update failed:', e);
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
    const payload = event.data ? (function () { try { return event.data.json(); } catch { return {}; } })() : {};
    const n = payload.notification || {};
    const d = payload.data || payload || {};

    const title = n.title || d.title || 'Neue Nachricht';
    const body  = n.body  || d.body  || '';
    const url   = d.url || n.click_action || '/Mister-X/';
    const tag   = d.tag || 'mrx-fg'; // gleicher Tag zum gezielten Schließen
    const messageId = d.messageId || d.id || n.tag || String(Date.now());

    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const visibleClient = windows.find((w) => w.visibilityState === 'visible');

    const ua = (self.navigator && self.navigator.userAgent) ? self.navigator.userAgent : '';
    const isIOS = isIOSLikeUA(ua);

    // Zustellmarkierung nebenläufig
    markDelivered(messageId, await getDeviceName()).catch((e) => console.error('[SW] markDelivered failed:', e));

    if (visibleClient) {
      // Foreground: an die Seite posten -> dein Alert/Toast
      try {
        visibleClient.postMessage({ type: 'PUSH', payload: d });
      } catch {}

      // iOS verlangt sichtbare Notification -> kurz zeigen und sofort schließen
      if (isIOS) {
        const opts = {
          body,
          icon: '/Mister-X/icons/android-chrome-192x192.png',
          badge: '/Mister-X/icons/Mister_X_Badge.png',
          tag,
          renotify: false,
          silent: true,
          data: { url, messageId, tag, fg: true }
        };
        await self.registration.showNotification(title, opts);
        await new Promise((r) => setTimeout(r, 50));
        const notes = await self.registration.getNotifications({ tag });
        notes.forEach((n) => n.close());
      }

      // Auf Nicht‑iOS: KEINE Notification im Foreground -> keine Doppelung
      return;
    }

    // Background: "normale" sichtbare Notification
    const opts = {
      body,
      icon: '/Mister-X/icons/android-chrome-192x192.png',
      badge: '/Mister-X/icons/Mister_X_Badge.png',
      tag,
      renotify: false,
      silent: (d.silent !== undefined) ? !!d.silent : true,
      // vibrate: d.vibrate ?? undefined,  // optional
      data: { url, messageId, tag, fg: false }
    };

    await self.registration.showNotification(title, opts);
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
