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

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Nachricht empfangen:', payload);

  const { title, body } = payload.notification;

  const options = {
    body,
    icon: 'icons/android-chrome-192x192.png', // optional: Icon für die Benachrichtigung
    badge: 'icons/android-chrome-192x192.png', // optional: kleines Symbol für Statusleiste
    data: {
      url: '/Mister-X/', // wohin soll die App springen?
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
