/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { precacheAndRoute } from 'workbox-precaching';

// Workbox: damit auch Icons offline/schnell verfügbar sind
precacheAndRoute(self.__WB_MANIFEST);

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
const RTDB_BASE = `${firebaseConfig.databaseURL}`;

function sanitizeKey(key) {
  return (key || '').replace(/[.#$/\[\]\/]/g, '_');
}

async function openDbEnsureStore(dbName, storeName) {
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
      if (db.objectStoreNames.contains(storeName)) return resolve(db);
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

// --- iOS-/Safari-fester Push-Handler ---
// Zeigt IMMER eine sichtbare Notification und kapselt alles in waitUntil(...).
self.addEventListener('push', (event) => {
  const payload = event.data ? (() => {
    try { return event.data.json(); } catch { return {}; }
  })() : {};

  // Unterstütze sowohl "notification" als auch "data" Payloads
  const n = payload.notification || {};
  const d = payload.data || payload;

  const title = n.title || d.title || 'Neue Nachricht';
  const body  = n.body  || d.body  || '';
  const url   = d.url || n.click_action || '/Mister-X/';

  // *** ACHTUNG: absolute Pfade, unter deinem SW-Scope erreichbar! ***
  const icon  = '/Mister-X/icons/android-chrome-192x192.png';
  // Badge: monochrom/transparenter PNG, ~96x96 wird auf Android gut verarbeitet
  const badge = '/Mister-X/icons/Mister_X_Badge.png';

  const showPromise = self.registration.showNotification(title, {
    body,
    icon,
    badge,
    data: { url, messageId: d.messageId || null },
  });

  const afterShow = (async () => {
    const deviceName = await getDeviceName();
    if (d.messageId && deviceName) {
      await markDelivered(d.messageId, deviceName);
    }
  })();

  event.waitUntil(Promise.all([showPromise, afterShow]));
});

// Klickverhalten
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const url = event.notification.data?.url || '/Mister-X/';
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      if ('focus' in client && client.url.includes('/Mister-X/')) {
        return client.focus();
      }
    }
    if (clients.openWindow) return clients.openWindow(url);
  })());
});

// Soft-Update Kontrollfluss
self.addEventListener('message', (event) => {
  if (event?.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
