import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

const firebaseConfig = {
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  databaseURL: "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06",
  measurementId: "G-W66SK677NG"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const RTDB_BASE = `${firebaseConfig.databaseURL}`;

function sanitizeKey(key) {
  return (key || "").replace(/[.#$/\[\]\/]/g, "_");
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
    return null; // Fallback: SW darf hier nicht crashen
  }
}

// Einmalig definieren (Window & SW gleich)
async function openDbEnsureStore(dbName, storeName) {
  return new Promise((resolve, reject) => {
    // 1) Erst ohne Versionsangabe öffnen
    const openReq = indexedDB.open(dbName);
    openReq.onupgradeneeded = () => {
      // Falls die DB noch nicht existierte, legen wir den Store direkt an
      const db = openReq.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    openReq.onsuccess = () => {
      const db = openReq.result;
      if (db.objectStoreNames.contains(storeName)) {
        return resolve(db);
      }
      // 2) Store fehlt -> DB schließen und Upgrade mit +1 fahren
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


async function markDelivered(messageId, deviceName) {
  if (!messageId || !deviceName) return;
  const safeName = sanitizeKey(deviceName);
  const url = `${RTDB_BASE}/notifications/${messageId}/recipients/${safeName}.json`;
  try {
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(true),
    });
  } catch (e) {
    console.error("[SW] RTDB update failed:", e);
  }
}


onBackgroundMessage(messaging, async (payload) => {
  const title = payload?.data?.title ?? 'Neue Nachricht';
  const body = payload?.data?.body ?? '';
  const url = payload?.data?.url ?? '/Mister-X/';
  const messageId = payload?.data?.messageId ?? null;


  await self.registration.showNotification(title, {
  body,
  icon: '/icons/android-chrome-192x192.png',
  badge: '/icons/Mister_X_Badge.png',
  data: { url },
});

  // Log + Zustellung markieren
  const deviceName = await getDeviceName();
  console.log('[SW] BG-Nachricht empfangen', { messageId, deviceName, payload });

  if (messageId && deviceName) {
    await markDelivered(messageId, deviceName);
  }

  // Notification anzeigen

});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const url = event.notification.data?.url || '/Mister-X/';
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      if ('focus' in client && client.url.includes('/Mister-X/')) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  })());
});

// a) Message-Handler, damit die Seite skipWaiting anstoßen kann
self.addEventListener('message', (event) => {
  if (event?.data?.type === 'SKIP_WAITING') {
    self.skipWaiting(); // neue SW sofort aktivieren
  }
});

// b) Beim Aktivieren alle offenen Clients sofort übernehmen
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // direkte Kontrolle der Seiten
});

