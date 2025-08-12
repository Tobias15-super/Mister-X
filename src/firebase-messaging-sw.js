// src/firebase-messaging-sw.js
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


onBackgroundMessage(messaging, async (payload) => {
  console.log('[SW] Nachricht empfangen:', payload);

  const title = payload.data.title ?? 'Neue Nachricht';
  const messageId = payload.data.messageId;
  const options = {
    body: payload.data.body || '',
    icon: 'icons/android-chrome-192x192.png',
    badge: 'icons/android-chrome-192x192.png',
    data: { url: payload.data.url || '/Mister-X/' }
  };

  // ✅ Status in RTDB auf true setzen
  try {
    const deviceName = await getDeviceName(); // Funktion, die du implementierst (z.B. aus IndexedDB)
    if (messageId && deviceName) {
      await fetch(`https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app/notifications/${messageId}/status/${deviceName}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(true)
      });
    }
  } catch (err) {
    console.error("Fehler beim Update in RTDB:", err);
  }

  self.registration.showNotification(title, options);
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

// Hilfsfunktion: Device-Name aus IndexedDB oder localStorage holen
async function getDeviceName() {
  return new Promise((resolve) => {
    const openReq = indexedDB.open('app-db', 1);
    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const req = store.get('deviceName');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    };
    openReq.onerror = () => resolve(null);
  });
}
