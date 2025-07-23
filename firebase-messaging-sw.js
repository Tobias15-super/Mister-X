importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyC-jTMiDjHNTC6cvSKUU44mVbWwT-ToLxQ",
  authDomain: "mister-x-d6b59.firebaseapp.com",
  projectId: "mister-x-d6b59",
  storageBucket: "mister-x-d6b59.firebasestorage.app",
  messagingSenderId: "616391598963",
  appId: "1:616391598963:web:da07882b0f481d3000db06"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Hintergrundnachricht:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
