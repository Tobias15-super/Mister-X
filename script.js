let countdown;
let timerListenerRegistered = false;
let map;
let marker;
let historyMarkers = [];
let fotoHochgeladen = false;
let messaging
let postenLayer = null;
const postenMarkers = {};
let postenCache = null;
let selectedPost = null;

// ====== Benutzer-Standort ======
let userWatchId = null;
let userMarker = null;
let userAccuracyCircle = null;
let followMe = false;  // optional: Karte folgt der Position

const LS_SHOW_HEADER = "showNotifHeader";

// Optional: ein eigenes Icon für "ich" (sonst Leaflet-Default)
const meIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const spielbereich = L.polygon([
  [48.21778257924239,16.37016154994435],
  [48.217247563322225,16.37076456217454],
  [48.21741142779978,16.371253762059183],
  [48.216865105563464,16.37191529883514],
  [48.21581506144457,16.37290646405736],
  [48.21417125610604,16.373948000332064],
  [48.21430769576697,16.3745721914746],
  [48.21333498613118,16.37539386682008],
  [48.2122964590416,16.377294652276152],
  [48.211699711347876,16.38092342451245],
  [48.211941642178076,16.38467493512273],
  [48.20913524997675,16.384032997995277],
  [48.20434428995476,16.380677464805487],
  [48.20267440663029,16.378771628716105],
  [48.202516949057625,16.378787036085683],
  [48.2021791301039,16.378713275337773],
  [48.20032081399359,16.37673193693543],
  [48.20046567888107,16.376081501249317],
  [48.19981183801774,16.372899054744835,],
  [48.200631534154375,16.369653382537916],
  [48.20071916193201,16.369103424638855],
  [48.200163223194544,16.368756078571426],
  [48.19948213275357,16.368406050294983],
  [48.19950721778074,16.3679406870309],
  [48.1998469538764,16.366987161726104],
  [48.19976119600531,16.366945587486374],
  [48.199786280895815,16.366662614435302],
  [48.199852484835134,16.36658080706035],
  [48.199605825841886,16.366136901468384],
  [48.199689907919776,16.365894161552536],
  [48.199997462783195,16.365407340616333],
  [48.20007450484762,16.36539258846675],
  [48.200780727683785,16.364471249670135],
  [48.20235733493688,16.36143133067089],
  [48.202316181915776,16.361391179971125],
  [48.20252539808658,16.36095263879719],
  [48.202655955248034,16.360945933274653],
  [48.20475579365605,16.35819251441422],
  [48.20494354858451,16.357837121719747],
  [48.205074099582546,16.357685576910406],
  [48.20502589015989,16.357555489773183],
  [48.20506169808996,16.357492457861333],
  [48.205261965068914,16.357456248039632],
  [48.20626549207577,16.356030140071557],
  [48.20666774752276,16.35550308600013],
  [48.20697347295606,16.355354223399804],
  [48.20918910891197,16.354601648098285],
  [48.20921597664341,16.35491948986655],
  [48.20929110567211,16.354928877598102],
  [48.20938410911258,16.354983862882907],
  [48.212403444290665,16.35518085630021],
  [48.212634067324394,16.355560388875816],
  [48.214753862701514,16.35585677297196],
  [48.21482540908184,16.356370415998313],
  [48.21454632473899,16.35850592710254],
  [48.21435355993972,16.36025556372129],
  [48.21477999581608,16.361298310706765],
  [48.21461086605676,16.3615351876565],
  [48.214799725889385,16.361933238614775],
  [48.21476774885914,16.362013013827934],
  [48.214317217645544,16.362474541146735],
  [48.21554996828477,16.365200001058092],
  [48.21618181295601,16.36659154989541],
  [48.21691897070536,16.368248676490595],
  [48.21768157297474,16.36988155904141],
  [48.21778257924239,16.37016154994435]























])

const outerBounds = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180]
]

const mask = L.polygon([outerBounds, spielbereich],{

  color: 'red',
  weight: 2,
  fillColor: 'rgba(255, 0, 0, 0.3)', // leicht roter Schleier
  fillOpacity: 0.3,
  interactive: false,
  dashArray: '5, 5' // gestrichelte Linie
})

const COLOR_MAP = {
  blau:  "#1E90FF",
  gruen: "#2ECC71",
  rot:   "#FF5252",
  gelb:  "#F4D03F",
  orange:"#FF8C00",
  lila:"#8E44AD",
  schwarz:"#333333",
  grau:  "#7F8C8D"
};


import { app } from './firebase.js'
import { deleteToken, getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { rtdb, storage } from './firebase.js';
import { ref, child, set, get, onValue, remove, runTransaction, push, update, getDatabase, query, orderByChild, limitToLast } from 'firebase/database';
import * as supabase from '@supabase/supabase-js';








window.onerror = function(message, source, lineno, colno, error) {
  alert("JS-Fehler: " + message + " in " + source + " Zeile " + lineno);
};

  // Supabase initialisieren
const supabaseClient = supabase.createClient(
  'https://axirbthvnznvhfagduyj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc'
);


// Token speichern
async function saveTokenToSupabase(token) {
  let device_name = ""
  const deviceId = getDeviceId();

  const { error } = await supabaseClient
  .from('fcm_tokens')
  .delete()
  .eq('device_name', deviceId);
  if (error) {
    log("❌ Fehler beim Löschen aus Supabase:", error);
  } else {
    log("✅ Alter Token aus Supabase gelöscht.");
  }


  supabaseClient
    .from('fcm_tokens')
    .upsert({ token, device_name: deviceId })
    .then(({ error }) => {
      if (error) {
        log("Fehler beim Speichern des Tokens:", error);
      } else {
        log("Token erfolgreich gespeichert.");
      }
    });
}

function getDeviceId() {
  let id = localStorage.getItem("deviceId");
  while (!id || id.trim() === "") {
    id = prompt("Bitte gib deinen Namen ein");
    if (id === null) {
      alert("Du musst einen Namen eingeben, um fortzufahren.");
    }
  }
  localStorage.setItem("deviceId", id.trim());
  return id.trim();
}

try {
  localStorage.setItem("test", "1");
} catch (e) {
  alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.");
}

// Berechtigung anfragen und Token holen

async function requestPermission() {
  try {
    // 0) Umgebung prüfen
    const fcmSupported = await isSupported();
    if (!fcmSupported) {
      alert('❌ Push-Benachrichtigungen werden in diesem Browser/Modus nicht unterstützt.');
      return;
    }
    if (!('Notification' in window)) {
      alert('❌ Notification API nicht verfügbar.');
      return;
    }

    // 1) Permission anfordern (nur auf User-Geste!)
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      log('Benachrichtigungen nicht erlaubt:', permission);
      alert('⚠️ Benachrichtigungen wurden abgelehnt.');
      return;
    }

    // 2) Service Worker registrieren (Lazy)
    const registration = await ensureSWRegistration(); // deine bestehende Funktion
    log('Service Worker registriert mit Scope:', registration.scope);
    localStorage.setItem('serviceWorkerRegistered', 'true');

    // 3) Messaging initialisieren
    if (!messaging) messaging = getMessaging(app);


    // 4) Token holen (mit VAPID-Key und SW-Registration)
    const currentToken = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: 'BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE',
    });

    if (!currentToken) {
      log('Kein Token erhalten.');
      alert('⚠️ Kein Token erhalten. Bitte erneut versuchen.');
      return;
    }

    // 5) Token speichern (RTDB + Supabase)
    const deviceId = getDeviceId();
    localStorage.setItem('fcmToken', currentToken);
    log('Token:', currentToken);
    await set(ref(rtdb, `tokens/${deviceId}`), currentToken);
    await saveTokenToSupabase(currentToken);

    // 6) UI aktualisieren
    localStorage.setItem('nachrichtAktiv', 'true');
    const btn = document.getElementById('permissionButton');
    if (btn) btn.style.display = 'none';

    // 7) Speichern in IndexedDB
    saveDeviceName(deviceId)
    .then(() => {
    alert('✅ Benachrichtigungen aktiviert!');
    })  
  } catch (error) {
    log('Fehler bei Berechtigung/Registrierung/Token:', error);
    alert('❌ Fehler: ' + (error?.message ?? String(error)));
  }
}

// Speichert den Device-Namen in IndexedDB
async function saveDeviceName(deviceName) {
  const db = await openDbEnsureStore('app-db', 'settings');
  return new Promise((resolve, reject) => {
    const tx = db.transaction('settings', 'readwrite');
    const store = tx.objectStore('settings');
    store.put(deviceName, 'deviceName');
    tx.oncomplete = () => { db.close(); resolve(true); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}



async function refreshTokenIfPermitted() {
  if (
    typeof Notification === "undefined" ||
    Notification.permission !== "granted" ||
    localStorage.getItem("serviceWorkerRegistered") !== "true"
  ) {
    log("🔕 Token-Refresh übersprungen: Keine Berechtigung oder kein SW.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const newToken = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: "BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"
    });

    if (!newToken) {
      log("⚠️ Kein Token beim Refresh erhalten.");
      return;
    }

    const deviceId = getDeviceId();
    const oldToken = localStorage.getItem("fcmToken");

    if (newToken !== oldToken) {
      log("🔄 Token aktualisiert:", newToken);

      // Firebase Realtime Database
      await set(ref(rtdb, "tokens/" + deviceId), newToken);

      // Supabase: alten Token löschen
      const { error } = await supabaseClient
        .from('fcm_tokens')
        .delete()
        .eq('device_name', deviceId);

      if (error) {
        log("❌ Fehler beim Löschen aus Supabase:", error);
      } else {
        log("✅ Alter Token aus Supabase gelöscht.");
      }

      // Supabase: neuen Token speichern
      await saveTokenToSupabase(newToken);

      localStorage.setItem("fcmToken", newToken);
      localStorage.setItem("nachrichtAktiv", "true");
    } else {
      log("ℹ️ Token ist unverändert.");
    }
  } catch (err) {
    log("❌ Fehler beim Token-Refresh:", err);
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




async function removeNotificationSetup() {
  try {
    const supported = await isSupported().catch(() => false);
    if (!messaging) messaging = getMessaging(app);

    const deviceId = getDeviceId();
    const oldToken = localStorage.getItem('fcmToken');

    // 1) FCM-Token im Browser löschen (nicht getToken()!)
    if (supported) {
      try {
        await deleteToken(messaging);
        log('✅ deleteToken: lokaler FCM-Token invalidiert');
      } catch (e) {
        log('⚠️ deleteToken fehlgeschlagen:', e);
      }
    }

    // 2) Serverseitig aufräumen (RTDB + Supabase)
    try {
      await remove(ref(rtdb, `tokens/${deviceId}`));
      log('✅ RTDB-Token entfernt für', deviceId);
    } catch (e) {
      log('⚠️ RTDB-Remove fehlgeschlagen:', e);
    }

    try {
      // nach device_name ODER token löschen, damit nichts liegen bleibt
      const { error } = await supabaseClient
        .from('fcm_tokens')
        .delete()
        .or(`device_name.eq.${deviceId}${oldToken ? `,token.eq.${oldToken}` : ''}`);
      if (error) log('⚠️ Supabase-Delete Fehler:', error);
      else log('✅ Supabase-Einträge entfernt');
    } catch (e) {
      log('⚠️ Supabase-Delete (catch):', e);
    }

    // 3) Push-Subscription kündigen & SW-Registrierungen abmelden
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        try {
          const sub = await reg.pushManager.getSubscription();
          if (sub) {
            await sub.unsubscribe();
            log('✅ Push-Subscription gekündigt für', reg.scope);
          }
        } catch (e) {
          log('⚠️ unsubscribe warn:', e);
        }
      }
      await Promise.all(regs.map(r => r.unregister()));
      log('✅ Alle Service Worker unregistriert');
    }

    // 4) Caches löschen (Workbox-Precache etc.)
    try {
      if (window.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
        log('✅ Alle Caches gelöscht:', keys);
      }
    } catch (e) {
      log('⚠️ Cache cleanup warn:', e);
    }

    // 5) IndexedDB löschen (falls du deviceName o. ä. speicherst)
    try {
      indexedDB.deleteDatabase('app-db');
      log('✅ IndexedDB "app-db" gelöscht');
    } catch (e) {
      log('⚠️ IndexedDB delete warn:', e);
    }

    // 6) Lokale Flags bereinigen
    localStorage.removeItem('fcmToken');
    localStorage.removeItem('nachrichtAktiv');
    localStorage.removeItem('serviceWorkerRegistered');

    // 7) UI zurücksetzen
    try {
      const btn1 = document.getElementById('permissionButton');
      const btn2 = document.getElementById('permissionButton2');
      if (btn1) btn1.style.display = '';    // zeigen
      if (btn2) btn2.style.display = 'none';// verstecken
    } catch {}

    // 8) Einmal reloaden, damit kein alter SW mehr "controlled"
    setTimeout(() => {
      alert('🔕 Benachrichtigungen deaktiviert. Die Seite wird neu geladen…');
      location.reload();
    }, 150);
  } catch (e) {
    log(e);
    alert('❌ Deaktivieren fehlgeschlagen: ' + (e?.message ?? String(e)));
  }
}




async function sendNotificationToTokens(title, body, tokens = [], attempt = 1, maxAttempts = 20) {
  const senderName = getDeviceId();
  const res = await fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body, tokens, senderName })
  });

  const result = await res.json();
  log(`📦 Versuch ${attempt}:`, result);

  if (result.failedTokens && result.failedTokens.length > 0 && attempt < maxAttempts) {
    log(`🔁 Wiederhole für ${result.failedTokens.length} fehlgeschlagene Tokens in 10 Sekunden...`);
    setTimeout(() => {
      sendNotificationToTokens(title, body, result.failedTokens, attempt + 1, maxAttempts);
    }, 10000);
  } else if (attempt >= maxAttempts) {
    log("⏱️ Max. Anzahl an Versuchen erreicht.");
  } else {
    log("✅ Alle Benachrichtigungen erfolgreich gesendet.");
  }
}

async function sendNotificationToRoles(title, body, roles) {
  const rolesSnapshot = await get(ref(rtdb, "roles"));
  const tokensSnapshot = await get(ref(rtdb, "tokens"));

  const rolesData = rolesSnapshot.val();
  const tokensData = tokensSnapshot.val();

  const matchingTokens = new Set();

  const roleList = Array.isArray(roles) ? roles : [roles];

  for (const userId in tokensData) {
    const userRole = rolesData[userId]?.role;
    const notificationEnabled = rolesData[userId]?.notification;

    const shouldSend = 
      (roles === "all" || roleList.includes(userRole)) &&
      (notificationEnabled !== false); // true if undefined or true

    if (shouldSend) {
      matchingTokens.add(tokensData[userId]);
    }
  }

  if (matchingTokens.size === 0) {
    log(`⚠️ Keine passenden Tokens für Rollen "${roles}" gefunden.`);
    return;
  }

  sendNotificationToTokens(title, body, Array.from(matchingTokens));
}



function uploadToCloudinary(file, callback) {
  const cloudName = "ddvf141hb";
  const uploadPreset = "Misterx-upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  fetch(`https://api.cloudinary.com/v1_1/ddvf141hb/image/upload`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url && data.public_id) {
        callback({url: data.secure_url}); // Bild-URL zurückgeben
      } else {
        alert("Fehler beim Hochladen zu Cloudinary.");
      }
    })
    .catch(error => {
      log("Upload-Fehler:", error);
      alert("Fehler beim Hochladen zu Cloudinary.");
    });
}

async function sendLocationWithPhoto() {
  const file = document.getElementById("photoInput").files[0];
  const manualDescription = document.getElementById("manualLocationDescription").value.trim();
  const manualContainer = document.getElementById("manualLocationContainer");
  const statusEl = document.getElementById("status");

  const selectedPost = getselectedPost();
  if (!selectedPost) {
    alert("Bitte zuerst einen Posten auswählen.");
    return;
  }
  if (!file) {
    alert("Bitte ein Foto auswählen.");
    return;
  }

  const timestamp = Date.now();

  // 1) Standort bestimmen (nur wenn keine manuelle Beschreibung aktiv ist)
  let coords = { lat: null, lon: null, accuracy: null };
  if (!(manualContainer && manualContainer.style.display !== "none" && manualDescription !== "")) {
    // GPS-Variante
    if (navigator.geolocation) {
      try {
        const position = await getCurrentPositionPromise();
        const { latitude, longitude, accuracy } = position.coords;
        if (accuracy > 100) {
          statusEl.innerText = `⚠️ Standort ungenau (±${Math.round(accuracy)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`;
          manualContainer.style.display = "block";
          return;
        }
        coords = { lat: latitude, lon: longitude, accuracy };
      } catch (error) {
        showError?.(error);
        manualContainer.style.display = "block";
        // Wir lassen coords null -> wird als manueller Fall behandelt
      }
    } else {
      statusEl.innerText = "Geolocation wird nicht unterstützt.";
      manualContainer.style.display = "block";
    }
  }

  const { color, postId, title } = selectedPost;

  // 2) Farbe „claimen“ (active: true -> false) via Transaction,
  //    damit nicht mehrere Geräte gleichzeitig denselben Farb-Run abschließen.
  const activeRef = ref(rtdb, `posten/${color}/active`);
  statusEl.innerText = "⏳ Reserviere Farbe…";

  try {
    const txnRes = await runTransaction(activeRef, (current) => {
      if (current === true) return false; // claim -> setze auf false
      return current;                      // schon false -> keine Änderung
    });

    if (!txnRes.committed || txnRes.snapshot.val() !== false) {
      statusEl.innerText = "❌ Diese Farbe ist bereits inaktiv. Liste wird aktualisiert.";
      // Liste aktualisiert sich ohnehin via onValue
      return;
    }
  } catch (e) {
    statusEl.innerText = "❌ Konnte Farbe nicht reservieren.";
    log(e);
    return;
  }

  // 3) Den ausgewählten Posten auf visited:true setzen
  try {
    await update(ref(rtdb), {
      [`posten/${color}/${postId}/visited`]: true
    });
  } catch (e) {
    statusEl.innerText = "❌ Konnte Posten nicht auf 'visited' setzen.";
    log(e);
    return;
  }

  // 4) Location-Eintrag schreiben (ohne Foto-URL), dann Foto hochladen und URL nachtragen
  const locationData = {
    color,
    postId,
    title,
    timestamp,
    description: manualDescription || null,
    lat: coords.lat,
    lon: coords.lon
  };

  // locations/ pushen
  const locRef = push(ref(rtdb, "locations"), locationData);

  // 5) Benachrichtigung an Agents
  const notificationText = `${title} (${color.toUpperCase()})`;
  sendNotificationToRoles?.("Mister X hat sich gezeigt!", notificationText, "agent");

  // 6) Foto im Hintergrund hochladen und URL aktualisieren
  uploadToCloudinary(file, async ({ url }) => {
    try {
      await update(locRef, { photoURL: url });
    } catch (e) {
      log("Foto-URL konnte nicht gesetzt werden", e);
    }
  });

  // 7) UI Reset
  document.getElementById("photoInput").value = "";
  document.getElementById("manualLocationDescription").value = "";
  manualContainer.style.display = "none";
  document.getElementById("postenSearch").value = "";
  setSelectedPost(null);

  statusEl.innerText = "✅ Posten/Farbe gemeldet & Foto wird hochgeladen.";
  startTimer?.();
}





function showLocationHistory() {
  onValue(ref(rtdb, "locations"), (snapshot) => {
    if (!snapshot.exists()) {
      if (map) {
        map.remove();
        map = null;
      }
      document.getElementById("map").style.display = "none";
      document.getElementById("locationFeed").innerHTML = "";
      historyMarkers = [];
      return;
    }

    const data = snapshot.val();
    const entries = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
    const validEntries = entries.filter(e => e.lat != null && e.lon != null);

    if (validEntries.length > 0) {
      const { lat, lon } = validEntries[0];

      if (map) {
        map.remove();
        map = null;
      }

      map = L.map('map').setView([lat, lon], 15);
      ensurePostenLayer();
      renderPostenMarkersFromCache();
      reattachUserLocationOnMap();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      historyMarkers.forEach(marker => map.removeLayer(marker));
      historyMarkers = [];

      validEntries.forEach(loc => {
        const m = L.marker([loc.lat, loc.lon]).addTo(map).bindPopup(`📍 ${new Date(loc.timestamp).toLocaleTimeString()}`);
        historyMarkers.push(m);
      });

      // Linie zwischen den Standorten zeichnen
      const pathCoordinates = validEntries.map(loc => [loc.lat, loc.lon]);
      if (pathCoordinates.length > 1) {
        const pathLine = L.polyline(pathCoordinates, {
          color: 'blue',
          weight: 3,
          opacity: 0.7,
          smoothFactor: 1
        }).addTo(map);
      }

      mask.addTo(map);


      document.getElementById("map").style.display = "block";
    } else {
      if (map) {
        map.remove();
        map = null;
      }
      document.getElementById("map").style.display = "none";
    }

    const feed = document.getElementById("locationFeed");
    feed.innerHTML = "";

    entries.forEach((loc, index) => {
      const entryTitle = loc.title ? loc.title : "Automatischer Standort";
      const entryTime = loc.timestamp ? new Date(loc.timestamp).toLocaleTimeString() : "";
      const photoHTML = loc.photoURL ? `<img src="${loc.photoURL}" alt="Foto" class="zoomable-photo" style="max-width: 100%; max-height: 60vh; border: 1px solid #ccc; margin-top: 5px; cursor: zoom-in;" data-index="${index}">` : "";

      const entryDiv = document.createElement("div");
      entryDiv.style.marginBottom = "1em";
      entryDiv.innerHTML = `
        <strong class="location-title" data-lat="${loc.lat}" data-lon="${loc.lon}" style="cursor: pointer;">${entryTitle} (${entryTime})</strong><br>
        ${loc.description ? `<em>📍 ${loc.description}</em><br>` : ""}
        ${photoHTML}
      `;
      feed.appendChild(entryDiv);
    });

    // Titel-Klick → Karte zentrieren
    document.querySelectorAll(".location-title").forEach(el => {
      el.addEventListener("click", () => {
        const lat = parseFloat(el.dataset.lat);
        const lon = parseFloat(el.dataset.lon);
        if (map && !isNaN(lat) && !isNaN(lon)) {
          map.setView([lat, lon], 17);
        }
      });
    });

    // Bild-Klick → Zoom/Modal
    document.querySelectorAll(".zoomable-photo").forEach(img => {
      img.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.backgroundColor = "rgba(0,0,0,0.8)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = "9999";
        modal.innerHTML = `<img src="${img.src}" style="max-width: 90%; max-height: 90%; border: 2px solid white;">`;

        modal.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
      });
    });
  });
}

function startUserLocationTracking() {
  if (!navigator.geolocation) {
    alert('❌ Geolocation wird nicht unterstützt.');
    return;
  }
  if (userWatchId != null) {
    // Bereits aktiv
    return;
  }

  userWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      if (!map) return;

      const markerStyle = {
        radius: 7,
        color: "#007AFF",         // iOS-Blau
        fillColor: "#ffffffff",
        fillOpacity: 0.8,
        opacity: 1,
        weight: 2
      };

      const accuracyStyle = {
        radius: accuracy,
        color: "#007AFF",
        fillColor: "#007AFF",
        fillOpacity: 0.2,
        weight: 1,
        opacity: 0.4
      };

      // Marker anlegen oder aktualisieren
      if (!userMarker) {
        userMarker = L.circleMarker([latitude, longitude], markerStyle)
          .bindPopup(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(accuracy)} m`)
          .addTo(map);
      } else {
        userMarker.setLatLng([latitude, longitude]);
        if (userMarker.getPopup()) {
          userMarker.getPopup().setContent(`<strong>Dein Standort</strong><br>Genauigkeit: ±${Math.round(accuracy)} m`);
        }
      }

      // Genauigkeitskreis anlegen oder aktualisieren
      if (!userAccuracyCircle) {
        userAccuracyCircle = L.circle([latitude, longitude], accuracyStyle).addTo(map);
      } else {
        userAccuracyCircle.setLatLng([latitude, longitude]);
        userAccuracyCircle.setRadius(accuracy);
      }

      // Optional: Karte folgen lassen
      if (followMe) {
        const targetZoom = Math.max(map.getZoom(), 16);
        map.setView([latitude, longitude], targetZoom, { animate: true });
      }
    },
    (err) => {
      log('Geolocation-Fehler:', err);
      stopUserLocationTracking();
      alert('⚠️ Tracking gestoppt: ' + err.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
  );
}


function stopUserLocationTracking() {
  if (userWatchId != null) {
    navigator.geolocation.clearWatch(userWatchId);
    userWatchId = null;
  }

  if (map && userMarker) { map.removeLayer(userMarker); userMarker = null; }
  if (map && userAccuracyCircle) { map.removeLayer(userAccuracyCircle); userAccuracyCircle = null; }
}

function reattachUserLocationOnMap() {
  // Nach einem Neuaufbau der Karte (z. B. in showLocationHistory) Marker/Circle wieder anhängen
  if (!map) return;
  if (userMarker && !map.hasLayer(userMarker)) userMarker.addTo(map);
  if (userAccuracyCircle && !map.hasLayer(userAccuracyCircle)) userAccuracyCircle.addTo(map);
}

// --- Refresh-Button initialisieren ---

function initRefreshButton() {
  const btn = document.getElementById('refreshBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    btn.classList.add('updating');
    try {
      await forceUpdateAndReload({ timeoutMs: 2500 }); // -> Timeout-Fallback
    } catch (e) {
      log('[Refresh] Fehler im Update-Flow:', e);
      // Im Worst-Case: trotzdem neu laden
      window.location.reload();
    }
  });
}




async function forceUpdateAndReload({ timeoutMs = 2500 } = {}) {
  if (!('serviceWorker' in navigator)) {
    window.location.reload();
    return;
  }

  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) {
    log('[Refresh] Keine SW-Registration gefunden -> normaler Reload');
    window.location.reload();
    return;
  }

  log('[Refresh] Vor Update:', dumpReg(reg));

  // 1) Explizit Update anstoßen (lädt SW neu & installiert, wenn byte-different)
  await reg.update(); // MDN: versucht aktiv zu aktualisieren [3](https://stackoverflow.com/questions/57455849/chrome-autoplay-policy-chrome-76)

  // 2) Installierende / wartende SW finden
  let sw = reg.installing || reg.waiting || null;
  if (!sw) {
    // Fall: Update ist sehr schnell oder es gibt keines -> kurze Warte auf updatefound
    sw = await waitUpdateFound(reg, 800);
  }

  // 3) Falls eine neue Version wartet/installiert -> sofort aktivieren
  if (sw) {
    await waitInstalledOrActivated(sw);
    if (reg.waiting) {
      log('[Refresh] Sende SKIP_WAITING an Waiting-SW');
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  } else {
    log('[Refresh] Keine neue SW gefunden -> normaler Reload');
  }

  // 4) Auf controllerchange ODER Timeout warten, dann reloaden
  await waitControllerChangeOrTimeout(timeoutMs); // MDN: controllerchange-Event [4](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
  window.location.reload();
}


function waitUpdateFound(reg, ms) {
  return new Promise(resolve => {
    let t;
    const onUF = () => {
      reg.removeEventListener('updatefound', onUF);
      clearTimeout(t);
      resolve(reg.installing || reg.waiting || null);
    };
    reg.addEventListener('updatefound', onUF);
    t = setTimeout(() => {
      reg.removeEventListener('updatefound', onUF);
      resolve(null);
    }, ms);
  });
}


function waitInstalledOrActivated(sw) {
  return new Promise(resolve => {
    if (sw.state === 'installed' || sw.state === 'activated') return resolve();
    sw.addEventListener('statechange', () => {
      if (sw.state === 'installed' || sw.state === 'activated') resolve();
    });
  });
}


function waitControllerChangeOrTimeout(ms) {
  return new Promise(resolve => {
    let resolved = false;
    const done = () => {
      if (!resolved) {
        resolved = true;
        navigator.serviceWorker.removeEventListener('controllerchange', onChange);
        resolve();
      }
    };
    const onChange = () => {
      log('[Refresh] controllerchange empfangen');
      done();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onChange);
    setTimeout(() => {
      log('[Refresh] controllerchange-Timeout, lade dennoch neu');
      done();
    }, ms);
  });
}

function dumpReg(reg) {
  const s = o => (o ? o.state : '—');
  return {
    scope: reg.scope,
    active: s(reg.active),
    installing: s(reg.installing),
    waiting: s(reg.waiting),
    controlled: !!navigator.serviceWorker.controller
  };
}




function autoCheckUpdatesOnResume() {
  let lastCheck = 0;
  const MIN = 15000; // 15s Throttle

  const check = async () => {
    const now = Date.now();
    if (now - lastCheck < MIN) return;
    lastCheck = now;
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return;
      await reg.update(); // aktiver Check [3](https://stackoverflow.com/questions/57455849/chrome-autoplay-policy-chrome-76)
      if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch {}
  };

  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  window.addEventListener('focus', check);
}





// ====== Posten-Funktionen ======



// Style je nach aktiv/visited
function styleForPosten(colorName, isActiveColor, visited) {
  const base = COLOR_MAP[colorName] || "#666";
  if (visited) {
    return {
      radius: 10,
      color: base,
      fillColor: base,
      fillOpacity: 0.9,
      opacity: 1,
      weight: 3
    };
  }
  if (isActiveColor === false) {
    return {
      radius: 6,
      color: base,
      fillColor: base,
      fillOpacity: 0.25,
      opacity: 0.4,
      weight: 1
    };
  }
  return {
    radius: 9,
    color: base,
    fillColor: base,
    fillOpacity: 0.7,
    opacity: 0.9,
    weight: 2
  };
}

// Popup-HTML für einen Posten
function makePostenPopupHTML(color, key, loc, isActiveColor) {
  const title = loc.title || key;
  const visited = !!loc.visited;
  const activeTxt = isActiveColor ? "aktiv" : "inaktiv";
  const visitedTxt = visited ? "✅ besucht" : "🕒 offen";
  return `
    <div style="min-width:180px">
      <strong>${title}</strong><br>
      <small>Farbe: ${color} (${activeTxt})</small><br>
      <small>Status: ${visitedTxt}</small>
    </div>
  `;
}

// Hilfsfunktion: robust lat/lon holen
function extractLatLon(loc) {
  const lat =
    loc.lat ??
    loc.latitude ??
    null;
  const lon =
    loc.lon ??
    loc.lng ??
    loc.longitude ??
    null;
  return { lat, lon };
}

function listenAndRenderPosten() {
  const postenRef = ref(rtdb, "posten");
  onValue(postenRef, (snap) => {
    postenCache = snap.exists() ? snap.val() : null;
    renderPostenMarkersFromCache();
  });
}

function ensurePostenLayer() {
  if (!postenLayer) postenLayer = L.layerGroup();
  if (map && !map.hasLayer(postenLayer)) postenLayer.addTo(map);
}

function renderPostenMarkersFromCache() {
  if (!map || !postenCache) return;

  ensurePostenLayer();

  const seen = new Set();

  Object.entries(postenCache).forEach(([color, group]) => {
    if (!group || typeof group !== "object") return;

    const isActiveColor = !!group.active;
    const posts = Object.fromEntries(Object.entries(group).filter(([k]) => k !== "active"));

    Object.entries(posts).forEach(([key, loc]) => {
      if (!loc || typeof loc !== "object") return;

      const { lat, lon } = extractLatLon(loc);
      if (lat == null || lon == null) return;

      const markerKey = `${color}/${key}`;
      seen.add(markerKey);

      const style = styleForPosten(color, isActiveColor, !!loc.visited);

      if (postenMarkers[markerKey]) {
        const m = postenMarkers[markerKey];
        m.setLatLng([lat, lon]);
        m.setStyle(style);
        if (m.getPopup()) {
          m.getPopup().setContent(makePostenPopupHTML(color, key, loc, isActiveColor));
        }
      } else {
        const m = L.circleMarker([lat, lon], style)
          .bindPopup(makePostenPopupHTML(color, key, loc, isActiveColor))
          .on("click", () => {
            // Optional: bei Klick Karte zentrieren
            //map.setView([lat, lon], Math.max(map.getZoom(), 16));
          });
        m.addTo(postenLayer);
        postenMarkers[markerKey] = m;
      }
    });
  });

  // Entferne Marker, die nicht mehr in der DB sind
  Object.keys(postenMarkers).forEach((k) => {
    if (!seen.has(k)) {
      postenLayer.removeLayer(postenMarkers[k]);
      delete postenMarkers[k];
    }
  });
}

async function resetPostenStatus(defaultActive = true) {
  const postenRef = ref(rtdb, "posten");
  const snap = await get(postenRef);
  if (!snap.exists()) return;

  const data = snap.val();
  const updates = {};

  Object.entries(data).forEach(([color, group]) => {
    if (!group || typeof group !== "object") return;
    // Farbe aktivieren
    updates[`posten/${color}/active`] = defaultActive;

    // Alle Posten visited zurücksetzen
    Object.entries(group).forEach(([key, loc]) => {
      if (key === "active" || !loc || typeof loc !== "object") return;
      updates[`posten/${color}/${key}/visited`] = false;
    });
  });

  await update(ref(rtdb), updates);
}

// ======= Mister X Funktionen =======

const deg2rad = d => d * Math.PI / 180;

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // m
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2
          + Math.cos(deg2rad(lat1))*Math.cos(deg2rad(lat2))*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a)); // Meter
}

function getCurrentPositionPromise(options = { enableHighAccuracy:true, timeout:8000, maximumAge:0 }) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocation nicht unterstützt"));
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

  
  
function collectActivePosts({ excludeVisited = true } = {}) {
  const list = [];
  for (const [color, node] of Object.entries(postenCache)) {
    if (!node || node.active !== true) continue; // Nur aktive Farben
    for (const [postId, p] of Object.entries(node.posts || {})) {
      if (!p || typeof p !== "object") continue;
      if (excludeVisited && p.visited === true) continue;
      list.push({ color, postId, ...p });
    }
  }
  return list;
}



function renderSuggestions(items) {
  const box = document.getElementById("postenSuggestions");
  if (!items || items.length === 0) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }
  box.innerHTML = items.map(it => {
    const distanceStr = (it.distance != null)
      ? ` - ${(it.distance/1).toFixed(0)} m`
      : "";
    return `<div class="item" data-color="${it.color}" data-postid="${it.postId}">
              ${it.title || "(ohne Titel)"}
              <span class="tag">${it.color}</span>${distanceStr}
            </div>`;
  }).join("");
  box.style.display = "block";

  // Click-Handler für Auswahl
  box.querySelectorAll(".item").forEach(el => {
    el.addEventListener("click", () => {
      const color = el.getAttribute("data-color");
      const postId = el.getAttribute("data-postid");
      const post = postenCache[color]?.posts?.[postId];
      if (!post) {
        log("Ausgewählter Posten nicht im Cache gefunden:", { color, postId });
        document.getElementById("status").innerText = "Dieser Posten ist nicht mehr verfügbar.";
        box.style.display = "none";
        return;
      }

      const chosen = {
        color,
        postId,
        title: post.title || postId,
        lat: post.lat ?? null,
        lon: post.lon ?? null
      };
      setSelectedPost(chosen);
      const searchEl = document.getElementById("postenSearch");
      if (searchEl) {
        searchEl.value = `${chosen.title} [${color}]`;
      }
      
      box.style.display = "none";
      const statusEl = document.getElementById("status");
      if (statusEl) statusEl.innerText = `✅ Posten ausgewählt: ${chosen.title} (${color})`;
    });
  });
}

function filterByText(query) {
  const q = (query || "").trim().toLowerCase();
  const posts = collectActivePosts();
  if (!q) return [];
  return posts.filter(p => {
    const id = String(p.postId).toLowerCase();
    const title = String(p.title || "").toLowerCase();
    const color = String(p.color).toLowerCase();
    return id.includes(q) || title.includes(q) || color.includes(q);
  }).slice(0, 25); // Top 25
}

async function listNearest(count = 5) {
  try {
    const pos = await getCurrentPositionPromise();
    const { latitude, longitude, accuracy } = pos.coords;
    if (accuracy > 100) {
      document.getElementById("status").innerText =
        `⚠️ Standort ungenau (±${Math.round(accuracy)} m). Ergebnisse evtl. ungenau.`;
    }
    const posts = collectActivePosts().map(p => ({
      ...p,
      distance: (p.lat != null && p.lon != null)
        ? haversineDistance(latitude, longitude, p.lat, p.lon)
        : Number.POSITIVE_INFINITY
    }));
    posts.sort((a, b) => (a.distance - b.distance));
    return posts.slice(0, count);
  } catch (err) {
    document.getElementById("status").innerText =
      "📍 Konnte Standort nicht bestimmen. Du kannst trotzdem per Suche auswählen.";
    return [];
  }
}

async function initPostenListener() {
  const postenRef = ref(rtdb, "posten");
  onValue(postenRef, (snap) => {
    const raw = snap.val() || {};
    // In ein konsistentes Objekt umsetzen
    const normalized = {};
    for (const [color, obj] of Object.entries(raw)) {
      if (!obj || typeof obj !== "object") continue;
      const { active, ...rest } = obj;
      // rest enthält Post-Children (B1, B2, …)
      const posts = {};
      for (const [k, v] of Object.entries(rest)) {
        if (v && typeof v === "object") posts[k] = v;
      }
      normalized[color] = { active: !!active, posts };
    }
    postenCache = normalized;
    // Optional: Vorschlagsliste aktualisieren, wenn ein Query im Feld steht
    const q = document.getElementById("postenSearch").value;
    if (q) renderSuggestions(filterByText(q));
  });
}

function wireSearchUI() {
  const search = document.getElementById("postenSearch");
  const nearbyBtn = document.getElementById("nearbyBtn");

  let debounce;
  search.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const list = filterByText(search.value);
      renderSuggestions(list);
    }, 150);
  });

  nearbyBtn.addEventListener("click", async () => {
    const nearest = await listNearest(20);
    if (nearest.length === 0) {
      renderSuggestions(nearest);
      document.getElementById("status").innerText =
        "Keine nahegelegenen Posten gefunden (oder Standort unbekannt).";
        return;
    }
    renderSuggestions(nearest);
  });

  // Klicken außerhalb schließt Dropdown
  document.addEventListener("click", (e) => {
    const box = document.getElementById("postenSuggestions");
    const within = box.contains(e.target) || search.contains(e.target) || nearbyBtn.contains(e.target);
    if (!within) box.style.display = "none";
  });
}


//----Kopfzeile----


// Elemente referenzieren

const notifHeaderEl  = document.getElementById('notifHeader');
const notifToggleEl  = document.getElementById('notifHeaderToggle');
const notifSummaryEl = document.getElementById('notifSummary');
const notifDetailsEl = document.getElementById('notifDetails');

const notifStatusDot = document.getElementById('notifStatusDot');
const notifTimeShort = document.getElementById('notifTimeShort');
const notifTitle     = document.getElementById('notifTitle');
const notifBody      = document.getElementById('notifBody');
const notifSender    = document.getElementById('notifSender');
const notifTime      = document.getElementById('notifTime');
const notifId        = document.getElementById('notifId');
const recipientList  = document.getElementById('recipientList');
const notifCountEl   = document.getElementById('notifCount');

const toggleNotifHeaderCb = document.getElementById('toggleNotifHeader');

let lastNotifListenerUnsub = null; // Listener abmelden, wenn Header deaktiviert wird

function setHeaderVisible(visible) {
  notifHeaderEl.style.display = visible ? 'block' : 'none';
  if (!visible && typeof lastNotifListenerUnsub === 'function') {
    lastNotifListenerUnsub();
    lastNotifListenerUnsub = null;
  }
}

// Single Source of Truth für Auf-/Zuklappen
function setCollapsed(collapsed) {
  notifHeaderEl.classList.toggle('collapsed', collapsed);
  notifHeaderEl.classList.toggle('expanded', !collapsed);
  notifDetailsEl.hidden = collapsed;
  notifToggleEl.setAttribute('aria-expanded', String(!collapsed));
  notifToggleEl.textContent = collapsed ? '▾' : '▴';
}

// Nur EIN Toggle-Handler (Pfeil)
notifToggleEl?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isCollapsed = notifHeaderEl.classList.contains('collapsed');
  setCollapsed(!isCollapsed);
});

// Auch Klick auf die Leiste klappt auf/zu
notifSummaryEl?.addEventListener('click', () => {
  const isCollapsed = notifHeaderEl.classList.contains('collapsed');
  setCollapsed(!isCollapsed);
});

// Uhrzeit-Formatter (HH:MM)
function formatTimeHHMM(ms) {
  const d = new Date(ms);
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

// Render-Funktion (vom RTDB-Listener aufgerufen)
function renderNotif(n) {
  if (!n) {
    notifTitle.textContent = '-';
    notifBody.textContent  = '-';
    notifSender.textContent = '-';
    notifTime.textContent = '-';
    notifTimeShort.textContent = '[--:--]';
    notifId.textContent = '-';
    recipientList.innerHTML = '';
    notifStatusDot.style.background = '#bbb';
    if (notifCountEl) notifCountEl.textContent = '-';
    return;
  }

  const ts = typeof n.timestamp === 'number' ? n.timestamp : Date.now();
  const timeShort = formatTimeHHMM(ts);

  notifTitle.textContent = n.title || 'Ohne Titel';
  notifBody.textContent  = n.body || '';
  notifSender.textContent = n.sender || 'Unbekannt';
  notifTime.textContent = new Date(ts).toLocaleString('de-DE');
  notifTimeShort.textContent = `[${timeShort}]`;
  notifId.textContent = n.id ?? '-';

  const rec = n.recipients || {};
  const names = Object.keys(rec);
  const okCount = names.filter(k => rec[k] === true).length;
  const total = names.length;

  // Status-Lampe: grün wenn alle true, sonst gelb
  notifStatusDot.style.background = (total > 0 && okCount === total) ? '#4caf50' : '#ff9800';
  if (notifCountEl) notifCountEl.textContent = `${okCount}/${total} bestätigt`;

  // Empfänger-Liste rendern (nur in Details sichtbar)
  recipientList.innerHTML = '';
  names.sort((a,b)=>a.localeCompare(b)).forEach(name => {
    const ok = rec[name] === true;
    const div = document.createElement('div');
    div.className = `recipient-chip ${ok ? 'ok' : 'wait'}`;
    div.innerHTML = `<span class="dot"></span><span>${name}</span><span>${ok ? '✅' : '⏳'}</span>`;
    recipientList.appendChild(div);
  });
}

function startLatestNotifListener() {
  // Existierende Listener entfernen
  if (typeof lastNotifListenerUnsub === 'function') {
    lastNotifListenerUnsub();
    lastNotifListenerUnsub = null;
  }

  // Firebase: query(...) + onValue(...)
  const q = query(
    ref(rtdb, "notifications"),
    orderByChild('timestamp'),
    limitToLast(1)
  );

  const off = onValue(q, (snap) => {
    const obj = snap.val();
    if (!obj) {
      renderNotif(null);
      return;
    }
    // limitToLast(1) -> Objekt mit einem Key
    const [id, data] = Object.entries(obj)[0];
    renderNotif({ id, ...data });
  });

  // In v9 liefert onValue eine Unsubscribe-Funktion zurück
  lastNotifListenerUnsub = () => off();
}


//Startup
function startup_Header() {
  const show = localStorage.getItem(LS_SHOW_HEADER) === '1';
  setHeaderVisible(show);
  if (show) startLatestNotifListener();
  if (toggleNotifHeaderCb) toggleNotifHeaderCb.checked = show;

  // Beim Start gern zusammengeklappt lassen
  setCollapsed(true);

  // Checkbox -> speichern & anwenden
  toggleNotifHeaderCb?.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    if (enabled) {
      localStorage.setItem(LS_SHOW_HEADER, '1');
      setHeaderVisible(true);
      startLatestNotifListener();
      // Optional: beim Aktivieren aufklappen:
      // setCollapsed(false);
    } else {
      localStorage.removeItem(LS_SHOW_HEADER); // oder setItem(...,'0')
      setHeaderVisible(false);
      renderNotif(null);
    }
  });
};








function resetAllMisterXRollen() {
  //firebase.database().ref("roles").once("value").then(snapshot => {
  get(ref(rtdb, "roles")).then(snapshot => {
    const roles = snapshot.val();
    for (const id in roles) {
      if (roles[id].role === "misterx") {
        //firebase.database().ref("roles/" + id).set({
        set(ref(rtdb, "roles/" + id), {
          role: "start",
          timestamp: Date.now()
        });
      }
    }
    alert("Alle Mister X Rollen wurden zurückgesetzt.");
  });
}

async function canSwitchToMisterX() {
  // 1. max_Team_X auslesen
  //const maxSnapshot = await firebase.database().ref("settings/max_Team_X").once("value");
  const maxSnapshot = await get(ref(rtdb, "settings/max_Team_X"));
  const maxMisterX = maxSnapshot.exists() ? maxSnapshot.val() : 1;

  // 2. Rollen auslesen
  //const rolesSnapshot = await firebase.database().ref("roles").once("value");
  const rolesSnapshot = await get(ref(rtdb, "roles"));
  const roles = rolesSnapshot.val();

  // 3. Mister-X-Zähler
  let misterXCount = 0;
  for (const id in roles) {
    if (roles[id].role === "misterx") {
      misterXCount++;
    }
  }

  // 4. Vergleich
  return misterXCount < maxMisterX;
}


// Ansicht wechseln
async function switchView(view) {
  if (view !== localStorage.getItem("activeView")){
    if (view==="misterx"){
      const allowed = await canSwitchToMisterX();
      if (!allowed){
        alert("Es ist bereits ein Gerät als Mister X angemeldet!")
        goBack();
        return;
      }
    }

    if (view==="settings"){
      if (prompt("Passwort eingeben!")!=="1001"){
        goBack();
        return;
      }
    }
  }


  document.getElementById("startView").style.display = "none";
  document.getElementById("startView2").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");

  if (view === "misterx") {
    document.getElementById("misterxView").style.display = "block";
    showLocationHistory();
    initPostenListener();
    wireSearchUI();
  } else if (view === "agent") {
    document.getElementById("agentView").style.display = "block";
    showLocationHistory();
  } else if (view === "settings") {
    document.getElementById("settingsView").style.display = "block";
    load_max_mister_x();
  }

  localStorage.setItem("activeView", view);
      const deviceId = getDeviceId();
    //firebase.database().ref("roles/" + deviceId).set({
    set(ref(rtdb, "roles/" + deviceId), {
      role: view,
      timestamp: Date.now(),
    });
    const role = view
    await supabaseClient
    .from("fcm_tokens")
    .update({ role })
    .eq("device_name", deviceId);

  //firebase.database().ref("timer").once("value").then(snapshot => {
  get(ref(rtdb, "timer")).then(snapshot => {
    const data = snapshot.val();
    if (data) {
      const { startTime, duration, durationInput } = data;
      if (duration){
        updateCountdown(startTime, duration);
        updateStartButtonState(true);
      } else {
        updateStartButtonState(false);
    }
    } 
  });
};

// Zurück zur Startauswahl
async function goBack() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  document.getElementById("startView").style.display = "block";
  document.getElementById("startView2").style.display = "block";
  clearInterval(countdown);
  localStorage.setItem("activeView","start");
  const deviceId = getDeviceId();
  //firebase.database().ref("roles/" + deviceId).set({
  set(ref(rtdb, "roles/" + deviceId), {
    role: "start",
    timestamp: Date.now(),
  });
  const role = "start"
  await supabaseClient
  .from("fcm_tokens")
  .update({ role })
  .eq("device_name", deviceId);
};


async function startTimer() {
  await remove(ref(rtdb, "timer/duration"));
  await remove(ref(rtdb, "timer/startTime"));
  await remove(ref(rtdb, "timerMessage"));

  if (typeof countdown !== "undefined") {
    clearInterval(countdown);
  }

  const snapshot = await get(ref(rtdb, "timer"));
  const data = snapshot.val();

  let duration = 25 * 60;
  if (typeof data?.durationInput === "number" && data.durationInput > 0) {
    duration = data.durationInput;
    if (isNaN(duration) || duration < 1) duration = 60;
  }

  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  const message = {
    title: "⏰ Zeit abgelaufen!",
    body: "Mister X muss sich zeigen!",
    roles: ["misterx"]
  };

  await set(ref(rtdb, "timer"), {
    startTime,
    duration,
    durationInput: duration,
    canceled: false,
    fired: false,
  });

  await set(ref(rtdb, "timerMessage"), message);


}



export { startTimer };


// Timer aus Firebase lesen
function listenToTimer() {
  if (timerListenerRegistered) return;
  timerListenerRegistered = true;

  //firebase.database().ref("timer").on("value", (snapshot) => {
  onValue(ref(rtdb, "timer"), (snapshot) => {
    const data = snapshot.val() || {};
    const {
      startTime = null,
      duration = null,
      durationInput = null
    } = data;


    if (startTime === null || duration === null) {
      clearInterval(countdown);
      updateStartButtonState(false);

      // Timer-Anzeigen zurücksetzen
      const misterxTimer = document.getElementById("timer");
      const agentTimer = document.getElementById("agentTimer");
      const settingsTimer = document.getElementById("settingsTimer");

      if (misterxTimer) misterxTimer.innerText = "⏳ Zeit bis zum nächsten Posten: --:--";
      if (agentTimer) agentTimer.innerText = "⏳ Mister X Timer: --:--";
      if (settingsTimer) settingsTimer.innerText = "⏳ Aktueller Timer: --:--";

      return;
    }

    updateCountdown(startTime, duration);
    updateStartButtonState(true);
  });
};

// Countdown anzeigen
function updateCountdown(startTime, duration) {
  clearInterval(countdown);
  countdown = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const remaining = duration - elapsed;

    let timeString;
    if (remaining < 0) {
      timeString = "abgelaufen";
    } else {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    // Timer-Elemente holen
    const misterxTimer = document.getElementById("timer");
    const agentTimer = document.getElementById("agentTimer");
    const settingsTimer = document.getElementById("settingsTimer");

    // Funktion zum Timer-Style setzen
    function setTimerStyle(timerElem) {
      if (!timerElem) return;
      if (remaining <= 300 && remaining > 1) {
        timerElem.style.color = "red";
        timerElem.style.animation = "blinker 1s linear infinite";
      } else {
        timerElem.style.color = "";
        timerElem.style.animation = "";
      }
    }

    // Timer-Text aktualisieren
    if (settingsTimer) {
      settingsTimer.innerText = `⏳ Aktueller Timer: ${timeString}`;
      setTimerStyle(settingsTimer);
    }
    if (misterxTimer) {
      misterxTimer.innerText = `⏳ Zeit bis zum nächsten Posten: ${timeString}`;
      setTimerStyle(misterxTimer);
    }
    if (agentTimer) {
      agentTimer.innerText = `⏳ Mister X Timer: ${timeString}`;
      setTimerStyle(agentTimer);
    }

    if (remaining <= 0) {
      clearInterval(countdown);
      updateStartButtonState(false); // Timer ist abgelaufen
      // Timer-Elemente zurücksetzen
      [misterxTimer, agentTimer, settingsTimer].forEach(elem => {
        if (elem) {
          elem.style.color = "";
          elem.style.animation = "";
        }
      });
      if (localStorage.getItem("activeView")==="misterx"){
        alert("Zeit abgelaufen, dein Standort wird einmalig geteilt");
        getLocation();
        startTimer();
        }
    }
    }
  , 1000);
}

function setTimerInputFromFirebase(){
  //firebase.database().ref("timer").once("value").then(snapshot => {
  get(ref(rtdb, "timer")).then(snapshot => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    const timerInputElem = document.getElementById("timerDurationInput");
    if (!timerInputElem) return;

    if (data && typeof data.durationInput === "number"){
      timerInputElem.value = Math.floor(data.durationInput/60);
    } else {
      timerInputElem.value = 25;
    }
  });
}

// Blinker-Animation per CSS hinzufügen
const style = document.createElement('style');
style.innerHTML = `
@keyframes blinker {
  50% { opacity: 0; }
}
`;
document.head.appendChild(style);

// Standort abrufen
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        // Diese Funktion wird nur für den Timer verwendet, speichert aber keinen Titel/Foto
        // Daher wird hier kein Upload durchgeführt, sondern nur ein Dummy-Eintrag erstellt
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const timestamp = Date.now();

        if (accuracy > 100) {
          document.getElementById("status").innerText =
            "⚠️ Standort ungenau (±" + Math.round(accuracy) + " m). Bitte Standortbeschreibung manuell eingeben.";
            let standortbeschreibung = prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)") || "wurde nicht angegeben!";
            //firebase.database().ref("locations").push({
            push(ref(rtdb, "locations"), {
              description: standortbeschreibung.trim(),
              timestamp,
            })
          return;
        }

        //firebase.database().ref("locations").push({
        push(ref(rtdb, "locations"), {
          title: "Automatischer Standort",
          lat,
          lon,
          timestamp,
        });
        sendNotificationToRoles("Mister X hat sich gezeigt!", "Automatische Standort-Übermittlung.", "agent")

        showLocationHistory();
      },
      showError
    );
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
  }
};

function showError(error) {
  let message = "❌ Fehler beim Abrufen des Standorts.";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      message += " Zugriff verweigert.";
      break;
    case error.POSITION_UNAVAILABLE:
      message += " Standortinformationen nicht verfügbar.";
      break;
    case error.TIMEOUT:
      message += " Zeitüberschreitung bei der Standortabfrage.";
      break;
  }

  message += " Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.";
  document.getElementById("status").innerText = message;
}

function updateStartButtonState(isRunning) {
  const startButton = document.getElementById("startTimerButton");
  if (startButton) {
    startButton.disabled = isRunning;
    startButton.style.opacity = isRunning ? "0.5" : "1";
    startButton.style.pointerEvents = isRunning ? "none" : "auto";
    startButton.style.cursor = isRunning ? "default" : "pointer";
  }
};

function showButtons() {
  if (!localStorage.getItem("nachrichtAktiv")){
    document.getElementById("permissionButton").style.display="block";
    document.getElementById("permissionButton2").style.display="none";
  } else {
    document.getElementById("permissionButton").style.display="none";
    document.getElementById("permissionButton2").style.display="block";
  }
}

async function deleteAllLocations() {
  if (!confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?")) return;

  try {
    await remove(ref(rtdb, "locations"));
    alert("Alle Standorte wurden gelöscht.");

    // Karte und Feed lokal ausblenden
    if (map) {
      map.remove();
      map = null;
    }
    document.getElementById("map").style.display = "none";
    document.getElementById("locationFeed").innerHTML = "";
    historyMarkers = [];

    // Optional: Status zurücksetzen
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "";

    await resetPostenStatus(true); // active=true, visited=false
    // Nach Reset neu rendern
    renderPostenMarkersFromCache();
  } catch (err) {
    log(err);
    alert("Fehler beim Löschen der Standorte.");
  }
}


async function resetTimer() {
  //const timerRef = firebase.database().ref("timer");

  // Timer-Daten löschen
  //await timerRef.child("duration").remove();
  await remove(ref(rtdb, "timer/duration"));
  //await timerRef.child("startTime").remove();
  await remove(ref(rtdb, "timer/startTime"));

  // Upstash-Timer abbrechen, falls vorhanden
  //const scheduleIdSnapshot = await firebase.database().ref("timerScheduleId").once("value");
  const scheduleIdSnapshot = await get(ref(rtdb, "timerScheduleId"));
  const scheduleId = scheduleIdSnapshot.val();


  if (scheduleId) {
    await fetch(`https://qstash.upstash.io/v2/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"
      }
    });
    //await firebase.database().ref("timerScheduleId").remove();
    await remove(ref(rtdb, "timerScheduleId"));
  }

  // Nachricht löschen
  //await firebase.database().ref("timerMessage").remove();
  await remove(ref(rtdb, "timerMessage"));

  // UI zurücksetzen
  clearInterval(countdown);
  updateStartButtonState(false);

  const misterxTimer = document.getElementById("timer");
  const agentTimer = document.getElementById("agentTimer");
  const settingsTimer = document.getElementById("settingsTimer");

  if (misterxTimer) misterxTimer.innerText = "⏳ Zeit bis zum nächsten Posten: --:--";
  if (agentTimer) agentTimer.innerText = "⏳ Mister X Timer: --:--";
  if (settingsTimer) settingsTimer.innerText = "⏳ Aktueller Timer: --:--";

  sendNotificationToRoles("Timer zurückgesetzt", "Der Timer wurde zurückgesetzt!", "all");
}


function save_max_mister_x() {
  const anzahl = document.getElementById("max_Team_X").value;

  //const settingsRef = firebase.database().ref("settings");

  // Erst löschen
  //settingsRef.child("max_Team_X").remove()
  remove(ref(rtdb, "settings/max_Team_X"))
    .then(() => {
      // Dann neuen Wert setzen
      //return settingsRef.child("max_Team_X").set(Number(anzahl));
      return set(ref(rtdb, "settings/max_Team_X"), Number(anzahl));
    })
    .then(() => {
      log("max_Team_X erfolgreich gespeichert:", anzahl);
    })
    .catch((error) => {
      log("Fehler beim Speichern von max_Team_X:", error);
    });
}

function load_max_mister_x() {
  const input = document.getElementById("max_Team_X");

  //firebase.database().ref("settings/max_Team_X").once("value")
  get(ref(rtdb, "settings/max_Team_X"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        input.value = snapshot.val();
        log("max_Team_X geladen:", snapshot.val());
      } else {
        log("Kein max_Team_X-Wert gefunden.");
      }
    })
    .catch((error) => {
      log("Fehler beim Laden von max_Team_X:", error);
    });
}

function save_timer_duration() {
  const anzahl = document.getElementById("timerDurationInput").value;
  const anzahl_in_sekunden = anzahl * 60

  //const settingsRef = firebase.database().ref("timer");

  // Erst löschen
  remove(ref(rtdb, "timer/durationInput"))
    .then(() => {
      // Dann neuen Wert setzen
      //return settingsRef.child("durationInput").set(Number(anzahl_in_sekunden));
      return set(ref(rtdb, "timer/durationInput"), Number(anzahl_in_sekunden));
    })
    .then(() => {
      log("Duration_input:", anzahl_in_sekunden);
    })
    .catch((error) => {
      log("Fehler beim Speichern von DurationInput:", error);
    });
}

async function ensureSWRegistration() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker wird vom Browser nicht unterstützt.');
  }

  const scope = import.meta.env.BASE_URL || '/';
  // Falls bereits registriert, wiederverwenden:
  const existing = await navigator.serviceWorker.getRegistration(scope);
  if (existing) return existing;

  const swUrl = `${scope}firebase-messaging-sw.js`;
  // Wenn nicht via Build gebundled, SW als Module registrieren:
  return navigator.serviceWorker.register(swUrl, {
    scope,
    type: 'module', // <— wichtig bei ESM
  });
}



function isStandalonePWA() {
  // iOS & cross-browser
  return window.matchMedia?.('(display-mode: standalone)').matches
      || window.navigator?.standalone === true;
}

async function detectSupport() {
  const support = {
    notificationsAPI: 'Notification' in window,
    serviceWorker: 'serviceWorker' in navigator,
    pushManager: 'PushManager' in window,
    standalone: isStandalonePWA(),
    fcm: false
  };
  try {
    // Prüft gebündelt alle nötigen APIs (FCM-spezifisch)
    support.fcm = await isSupported();
  } catch {
    support.fcm = false;
  }
  return support;
}


async function markDeliveredFromPage(messageId) {
  const deviceName = getDeviceId();
  if (!messageId || !deviceName) return;
  const rtdbBase = "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";
  await fetch(`${rtdbBase}/notifications/${messageId}/recipients/${deviceName}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(true),
  });
}



// Beim Laden prüfen / initialisieren

async function startScript() {
  try {
    // (A) Kapazitäten prüfen – NICHTS forcen
    const support = await detectSupport();

    // (B) Foreground-Messages nur, wenn FCM generell unterstützt wird
    if (support.fcm) {

      if (!messaging) messaging = getMessaging(app);
      onMessage(messaging, (payload) => {
        const messageId = payload?.data?.messageId;
        if (messageId) {
          markDeliveredFromPage(messageId).catch(err => {
            log('Fehler beim Markieren der Nachricht:', err);
          });
        }
        log('Nachricht empfangen (foreground):', payload);
        const { title, body } = payload.data || {};
        if (title || body) alert(`${title ?? 'Nachricht'}\n${body ?? ''}`);
      });
    }

    // (C) UI: Button/Hint steuern
    const btn = document.getElementById('enablePush');
    const hint = document.getElementById('pushHint');

    if (btn) {
      // iOS nicht installiert? Hinweis, kein Button.
      if (!support.fcm && /iPhone|iPad|iPod/i.test(navigator.userAgent) && !support.standalone) {
        btn.style.display = 'none';
        if (hint) {
          hint.textContent = 'Installiere die App zum Home-Bildschirm, um Benachrichtigungen zu aktivieren.';
          hint.style.display = 'block';
        }
      } else if (!support.fcm || !support.notificationsAPI || !support.serviceWorker || !support.pushManager) {
        btn.style.display = 'none';
        if (hint) {
          hint.textContent = 'Benachrichtigungen werden von diesem Browser/Modus nicht unterstützt.';
          hint.style.display = 'block';
        }
      } else {
        // Bereits erteilt? Zeige „aktiv“ – Token holst du erst auf Klick oder hier optional.
        if (Notification.permission === 'granted') {
          btn.textContent = 'Benachrichtigungen sind aktiv';
          btn.disabled = true;
        } else {
          btn.addEventListener('click', enablePush, { once: true });
          btn.style.display = 'inline-flex';
        }
      }
    }

    // (D) Dein bestehendes App-Setup ohne Push:
    const savedView = localStorage.getItem('activeView') || 'start';
    listenAndRenderPosten();
    if (savedView !=='start'){switchView(savedView);}
    showLocationHistory();
    listenToTimer();
    setTimerInputFromFirebase();
    showButtons();
    refreshTokenIfPermitted(); // <- diese Funktion sollte intern checken, ob Messaging/Token existiert
    startup_Header();
    initRefreshButton();
    autoCheckUpdatesOnResume();
    

    // Event-Handler für Karte
    document.getElementById('toggleTracking')?.addEventListener('change', (e) => {
      if (e.target.checked) startUserLocationTracking();
      else stopUserLocationTracking();
    });
    document.getElementById('toggleFollow')?.addEventListener('change', (e) => {
      followMe = e.target.checked;
    });


    // Foto-Upload Listener
    const photoInput = document.getElementById('photoInput');
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        const file = this.files?.[0];
        if (file) {
          window.fotoHochgeladen = true;
          const el = document.getElementById('status');
          if (el) el.innerText = '📸 Foto ausgewählt!';
        }
      });
    }
  } catch (e) {
    alert('Fehler in startScript: ' + (e?.message ?? String(e)));
    document.getElementById('startView')?.style?.setProperty('display', 'block');
    document.getElementById('startView2')?.style?.setProperty('display', 'block');
  }
}




function log(...msgs) {
  console.log(...msgs);
  const logElem = document.getElementById("settingsLog");
  if (!logElem) return;

  const now = new Date().toLocaleTimeString();
  const entry = document.createElement("div");

  entry.innerHTML = `<strong>[${now}]</strong>`;

  msgs.forEach(msg => {
    if (typeof msg === "object") {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Objekt anzeigen";
      details.appendChild(summary);

      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(msg, null, 2);
      details.appendChild(pre);

      entry.appendChild(details);
    } else {
      entry.innerHTML += ` ${msg}`;
    }
  });

  logElem.appendChild(entry);
  logElem.scrollTop = logElem.scrollHeight;
}




window.switchView = switchView;
window.requestPermission = requestPermission;
window.sendLocationWithPhoto = sendLocationWithPhoto;
window.startTimer = startTimer;
window.goBack = goBack;
window.save_timer_duration = save_timer_duration;
window.save_max_mister_x = save_max_mister_x;
window.resetTimer = resetTimer;
window.deleteAllLocations = deleteAllLocations;
window.resetAllMisterXRollen = resetAllMisterXRollen;
window.removeNotificationSetup = removeNotificationSetup;
window.mxState = window.mxState || {};
window.mxState.selectedPost = null; 
function setSelectedPost(p) {window.mxState.selectedPost = p; }
function getselectedPost() { return window.mxState.selectedPost; }
document.addEventListener("DOMContentLoaded", startScript);