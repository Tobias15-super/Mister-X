// Firebase-Konfiguration (dein bestehendes Projekt)
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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Service Worker registrieren
navigator.serviceWorker.register('firebase-messaging-sw.js')
  .then((registration) => {
    messaging.useServiceWorker(registration);
  });

// Berechtigung anfragen und Token holen
function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      messaging.getToken({
        vapidKey: "BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"
      }).then((currentToken) => {
        if (currentToken) {
          console.log("Token:", currentToken);
          alert("Token in der Konsole!");
        } else {
          console.warn("Kein Token erhalten.");
        }
      }).catch((err) => {
        console.error("Fehler beim Token holen:", err);
      });
    } else {
      console.warn("Benachrichtigungen nicht erlaubt.");
    }
  });
}

// Optional: Nachrichten empfangen, wenn Seite offen ist
messaging.onMessage((payload) => {
  console.log("Nachricht empfangen:", payload);
  alert("Nachricht: " + payload.notification.title);
});
