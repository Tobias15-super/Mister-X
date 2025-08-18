import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';


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

  // Firebase initialisieren
  export const app = initializeApp(firebaseConfig);

  export const rtdb = getDatabase(app);
  export const storage = getStorage(app);
  export const messaging = getMessaging(app);