import 'leaflet.fullscreen/dist/Control.FullScreen.css';
import FullScreen from 'leaflet.fullscreen';

// Some distributions export the class but do not register the factory on L.control
// when imported as an ES module. Ensure the factory exists so map options work.
if (typeof L !== 'undefined' && FullScreen) {
  if (!L.Control?.FullScreen) {
    L.Control.FullScreen = FullScreen;
  }
  if (!L.control?.fullscreen) {
    L.control.fullscreen = function(opts) { return new FullScreen(opts); };
  }
  console.debug('leaflet.fullscreen registered:', !!L.control?.fullscreen);
}

let countdown;
let timerListenerRegistered = false;
let locationDialogOpen = false;
let map;
let scaleControl = null; // Leaflet scale control instance
let scaleHideTimer = null; // Timeout id for hiding the scale
let marker;
let historyMarkers = [];
let fotoHochgeladen = false;
let messaging

const postenMarkers = {};
let postenCache = null;
let selectedPost = null;
const _seenMessageIds = new Set(); // für Push-Handler, um Duplikate zu vermeiden
let deviceId = localStorage.getItem("deviceId") || null;

const TEXTBEE_API_KEY = "9bd1b2ba-67a5-412f-a5c1-9e30a8c8c3d3";
const TEXTBEE_DEVICE_ID = "68a05594f6706f717bba9ed8";
const RTDB_BASE = "https://mister-x-d6b59-default-rtdb.europe-west1.firebasedatabase.app";

// ====== Benutzer-Standort ======
let userWatchId = null;
let userMarker = null;
let userAccuracyCircle = null;
let followMe = false;  // optional: Karte folgt der Position

const LS_SHOW_HEADER = "showNotifHeader";
const LS_KEY = "currentTeamId"


let currentTeamId = null;             // Quelle: RTDB deviceTeams/{deviceId}
let teamsSnapshotCache = {};          // {teamId: {name, members: {...}}}
let listeners = { deviceTeam: null, teams: null };

// === Agenten-Standort-Anfrage ===
let activeAgentReq = null;          // Snapshot von agentLocationRequest
let agentReqMarkers = [];           // Leaflet-Marker für Antworten
const LS_SHOW_AGENT_LOCS = 'showAgentLocations';
const LS_LAST_PROMPTED_REQ = 'lastPromptedAgentReqId';
const LS_LAST_RESPONDED_REQ = 'lastRespondedAgentReqId';
let showAgentLocations = (localStorage.getItem(LS_SHOW_AGENT_LOCS) ?? '1') === '1';
let unsubscribeAgentReq = null;
const agentReqInFlight = new Set(); // prevent duplicate prompts/writes per request id
const currentTeamName = 'Mein Team'; // Teamname

let postenLayer, historyLayer, userLayer;

const LS_AGENT_REQ_ENABLED = "agentReqEnabled";
let MESSAGE_TOGGLE_ENABLED = "messageToggleEnabled";

// Firebase-Setting-Path
const AGENT_REQ_SETTING_PATH = "settings/agentReqEnabled";
const MESSAGE_TOGGLE_PATH = "settings/messages"
const UBAHN_SETTING_PATH = "settings/uBahnEinstieg";
const LS_UBAHN_ENABLED = "uBahnEnabled";






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

// Workaround: Vite/Build kann Leaflet's relative image path kaputt machen.
// Setze die Default-Icon-URLs explizit auf das CDN, damit Markerbilder angezeigt werden.
if (typeof L !== 'undefined' && L.Icon && L.Icon.Default && typeof L.Icon.Default.mergeOptions === 'function') {
  // Set imagePath to the CDN and provide filenames (Leaflet will compose correct URLs).
  L.Icon.Default.mergeOptions({
    imagePath: 'https://unpkg.com/leaflet@1/dist/images/',
    iconUrl: 'marker-icon.png',
    iconRetinaUrl: 'marker-icon-2x.png',
    shadowUrl: 'marker-shadow.png'
  });
}

const spielbereich = [
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
  [48.19987161819025,16.37355423682974],
  [48.19981183801774,16.372899054744835],
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
  [48.20263271531552,16.36073672097149],
  [48.20274853131339,16.36083590228765],
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
]

const outerBounds = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180]
]

const mask = L.polygon([outerBounds, spielbereich],{

  color: 'red',
  weight: 3,
  fillColor: 'rgba(255, 0, 0, 0.3)', // leicht roter Schleier
  fillOpacity: 0.35,
  interactive: false,
  pane: 'maskPane',
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
import { ref, child, set, get, onValue, remove, runTransaction, push, update, getDatabase, query, orderByChild, limitToLast, off, serverTimestamp, endAt } from 'firebase/database';
import * as supabase from '@supabase/supabase-js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';


import '@petoc/leaflet-double-touch-drag-zoom';
import 'leaflet/dist/leaflet.css';
import '@petoc/leaflet-double-touch-drag-zoom/src/leaflet-double-touch-drag-zoom.css';

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcVXbQrAAAAAI5Wgi8DenjAM4cz-ubrfcwIRPVJ'),
  isTokenAutoRefreshEnabled: true
})

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
  const role = localStorage.getItem("role") || "start";
  try {
    // Optional: stattdessen direkt upsert mit onConflict, dann brauchst du kein delete
    const { error: delErr } = await supabaseClient
      .from('fcm_tokens')
      .delete()
      .eq('device_name', deviceId);

    if (delErr) {
      log("❌ Fehler beim Löschen aus Supabase:", delErr);
    } else {
      log("✅ Alter Token aus Supabase gelöscht.");
    }

    const { error: upsertErr } = await supabaseClient
      .from('fcm_tokens')
      .upsert({ token, device_name: deviceId, role });

    if (upsertErr) {
      log("❌ Fehler beim Speichern des Tokens:", upsertErr);
    } else {
      log("✅ Token erfolgreich gespeichert.");
    }
  } catch (e) {
    log("❌ Supabase Exception:", e);
  }
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
    localStorage.setItem('fcmToken', currentToken);
    log('Token:', currentToken);
    await set(ref(rtdb, `tokens/${deviceId}`), currentToken);
    await update(ref(rtdb, `roles/${deviceId}`), {role: 'start'})
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



async function readSwFlag(key) {
  const db = await new Promise((resolve, reject) => {
    const req = indexedDB.open('app-db');
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('sw-flags')) db.createObjectStore('sw-flags');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  try {
    return await new Promise((res) => {
      const tx = db.transaction('sw-flags', 'readonly');
      const store = tx.objectStore('sw-flags');
      const r = store.get(key);
      r.onsuccess = () => { db.close(); res(r.result || null); };
      r.onerror = () => { db.close(); res(null); };
    });
  } catch {
    return null;
  }
}

async function clearSwFlag(key) {
  const db = await new Promise((resolve, reject) => {
    const req = indexedDB.open('app-db');
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('sw-flags')) db.createObjectStore('sw-flags');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  await new Promise((res) => {
    const tx = db.transaction('sw-flags', 'readwrite');
    tx.objectStore('sw-flags').delete(key);
    tx.oncomplete = () => { db.close(); res(); };
    tx.onerror = () => { db.close(); res(); };
  });
}


async function refreshTokenIfPermitted(options = {}) {
  const {
    force = false,
    vapidKey = "BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE",
    touchWhenUnchanged = true
  } = options;

  if (
    typeof Notification === "undefined" ||
    Notification.permission !== "granted" ||
    localStorage.getItem("serviceWorkerRegistered") !== "true"
  ) {
    log("🔕 Token-Refresh übersprungen: Keine Berechtigung oder kein SW.");
    return null;
  }

  /*
  // Mutex, um parallele Aufrufe zu verhindern
  const mutexKey = "fcmTokenRefreshLock";
  const nowStamp = String(Date.now());
  const existingLock = localStorage.getItem(mutexKey);
  if (existingLock) {
    log("⏳ Token-Refresh läuft bereits, übersprungen.");
    return null;
  }
  localStorage.setItem(mutexKey, nowStamp);
  */

  try {
    const registration = await navigator.serviceWorker.ready;

    let newToken = null;
    try {
      newToken = await getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey
      });
    } catch (e) {
      log("❌ Fehler bei getToken:", e);
      return null;
    }

    if (!newToken) {
      log("⚠️ Kein Token beim Refresh erhalten.");
      return null;
    }

    const oldToken = localStorage.getItem("fcmToken");

    if (force || newToken !== oldToken) {
      log("🔄 Token aktualisiert:", newToken);

      // RTDB: strukturierter Eintrag
      await set(ref(rtdb, "tokens/" + deviceId), newToken);

      // Supabase: upsert by device_name (ohne vorheriges Delete)
      try {
        const { error } = await supabaseClient
          .from('fcm_tokens')
          .upsert({ token: newToken, device_name: deviceId }, { onConflict: 'device_name' }); // erfordert UNIQUE(device_name)
        if (error) {
          log("❌ Fehler beim Upsert in Supabase:", error);
        } else {
          log("✅ Token in Supabase upserted.");
        }
      } catch (e) {
        log("❌ Supabase Upsert Exception:", e);
      }

      localStorage.setItem("fcmToken", newToken);
      localStorage.setItem("nachrichtAktiv", "true");
      return newToken;

    } else {
      log("ℹ️ Token ist unverändert.");
      return newToken;
    }
  } catch (err) {
    log("❌ Fehler beim Token-Refresh:", err);
    return null;
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

async function askForDeviceIdAndPhone() {
  // --- 1) Device-ID sicherstellen ---
  let id = localStorage.getItem("deviceId");
  while (
    !id ||
    id.trim() === "" ||
    !isValidFirebaseKey(id.trim())
  ) {
    id = prompt("Bitte gib deinen Namen ein (mind. 2 Zeichen, keine Sonderzeichen wie . # $ [ ] /)");
    if (id === null) {
      alert("Du musst einen gültigen Namen eingeben, um fortzufahren.");
    }
    if (id && !isValidFirebaseKey(id.trim())) {
      alert("Ungültiger Name. Bitte verwende mindestens 2 Zeichen und keine . # $ [ ] /");
      id = "";
    }
  }
  id = id.trim();
  localStorage.setItem("deviceId", id);
  deviceId = id;

  // --- 2) Lokale Präferenzen lesen ---
  let telPrefs = loadSmsPrefs();
  let tel   = telPrefs.tel || null;
  let noTel = !!telPrefs.noTel;

  // --- 3) Serverzustand abrufen ---
  let remote;
  try {
    remote = await fetchRemoteSmsPrefs(id);
  } catch (e) {
    log("[askForDeviceIdAndPhone] Konnte Remote-Status nicht laden:", e);
    remote = { exists: false, allowSmsFallback: null, tel: null };
  }

  // --- 4) Entscheidungslogik, ob neu gefragt werden soll ---

  // Fälle, die ein Neufragen auslösen:
  // A) allowSmsFallback wurde serverseitig GELÖSCHT (null/undefined)
  // B) allowSmsFallback ist serverseitig false
  // C) allowSmsFallback ist true, aber KEINE Tel am Server
  let mustAskTel = false;

  if (remote.allowSmsFallback === null) {
    mustAskTel = true;
    noTel = false;
  } else if (remote.allowSmsFallback === false) {
    mustAskTel = false;
  } else if (remote.allowSmsFallback === true && !remote.tel) {
    mustAskTel = true;
  }

  // Wenn der Server bereits eine gültige Nummer hat, synchronisiere lokal & fertig
  if (remote.allowSmsFallback === true && remote.tel) {
    saveSmsPrefs({ tel: remote.tel, allowSmsFallback: true, noTel: false });
    await saveTelToRTDB(id, remote.tel, true);
    return;
  }

  // --- 5) Nur fragen, wenn notwendig und nicht schon bewusst abgelehnt (außer bei Reset) ---
  if ((mustAskTel && !noTel) || (mustAskTel && remote.allowSmsFallback === null)) {
    while (!tel || !isValidAtE164(tel)) {
      let input = prompt("Bitte gib deine Telefonnummer für SMS-Fallback ein (+43… oder 0664…)\nDu kannst auch leer lassen, wenn du keine SMS möchtest.");
      if (input === null || input.trim() === "") {
        tel = null;
        noTel = true;
        break;
      }
      tel = normalizeAtPhoneNumber(input.trim());
      if (!tel) {
        alert("Ungültige Nummer. Bitte im Format +43… oder 0664… eingeben.");
      }
    }
  }

  // --- 6) Speichern (lokal + Server) ---
  const allow = !!tel;
  saveSmsPrefs({ tel, allowSmsFallback: allow, noTel });
  await saveTelToRTDB(id, tel, allow);
}

// Hilfsfunktion: Firebase-Key-Validierung
function isValidFirebaseKey(key) {
  // Mindestens 2 Zeichen, keine . # $ [ ] /
  return (
    typeof key === "string" &&
    key.length >= 2 &&
    !/[.#$/\[\]/]/.test(key)
  );
}




async function removeNotificationSetup() {
  try {
    const supported = await isSupported().catch(() => false);
    if (!messaging) messaging = getMessaging(app);

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




function triggerSmsFallbackIfNeeded(
  messageId,
  recipientDeviceNames = [],
  smsText,
  waitSec = 15,
  {
    rtdbBase = (typeof RTDB_BASE !== 'undefined' ? RTDB_BASE : ''),
    rolesPath = 'roles',
    recipientsPath = 'notifications',
    idempotencyFlag = 'smsTriggered',
    // Hinweis: edgeUrl wird bei invoke() nicht benötigt
    secret = (typeof SMS_FALLBACK_SECRET !== 'undefined' ? SMS_FALLBACK_SECRET : ''),
    rtdbAuth,
  } = {}
) {
  if (!messageId) throw new Error('[Fallback] messageId fehlt');
  if (!Array.isArray(recipientDeviceNames) || recipientDeviceNames.length === 0) {
    log('[Fallback] keine Empfänger - Fallback nicht geplant');
    return Promise.resolve({ ok: true, skipped: 'no_recipients' });
  }
  if (!rtdbBase) throw new Error('[Fallback] rtdbBase fehlt');

  const payload = {
    messageId,
    recipientDeviceNames,
    smsText: String(smsText ?? '').slice(0, 280), // optionales Kürzen
    waitSec,
    rtdbBase,
    rolesPath,
    recipientsPath,
    idempotencyFlag,
    ...(rtdbAuth ? { rtdbAuth } : {}),
  };

  const headers = {};
  if (secret) headers['x-sms-secret'] = secret; // nur falls du dein requireSecret serverseitig aktiv lässt

  // Aufruf per supabase-js: setzt Authorization & apikey automatisch
  return supabaseClient.functions
    .invoke('sms-fallback', { body: payload, headers })
    .then(({ data, error }) => {
      if (error) {
        log('[Fallback] Edge call failed', error);
        return { ok: false, error: error.message || 'invoke failed' };
      }
      log('[Fallback] scheduled:', data);
      return data;
    })
    .catch((err) => {
      // Fire-and-forget: wir werfen nicht, sondern liefern ein Fehlerobjekt zurück
      log('[Fallback] Konnte SMS-Fallback nicht planen:', err);
      return { ok: false, error: err?.message || String(err) };
    });
}


function triggerSmsDirectIfNeeded(
  messageId,
  recipientDeviceNames = [],
  smsText,
  {
    rtdbBase = (typeof RTDB_BASE !== 'undefined' ? RTDB_BASE : ''),
    rolesPath = 'roles',
    // recipientsPath wird in sms-direct NICHT ignoriert – es steuert, wohin delivered geschrieben wird
    recipientsPath = 'notifications',
    rtdbAuth,
    requireConsent = true,
    maxRecipientsPerCall,
    writeDeliveredTimestamp = true, // optional: zusätzlich timestamps/{device} setzen
  } = {}
) {
  if (!messageId) {
    return Promise.resolve({ ok: false, error: 'Missing messageId' });
  }
  if (!Array.isArray(recipientDeviceNames) || recipientDeviceNames.length === 0) {
    log?.('[sms-direct] keine Empfänger - nichts zu senden');
    return Promise.resolve({ ok: true, skipped: 'no_recipients' });
  }

  const payload = {
    messageId,
    recipientDeviceNames,
    smsText: String(smsText ?? '').slice(0, 280),
    ...(rtdbBase ? { rtdbBase } : {}),
    rolesPath,
    recipientsPath,
    ...(rtdbAuth ? { rtdbAuth } : {}),
    requireConsent,
    ...(Number.isFinite(maxRecipientsPerCall) ? { maxRecipientsPerCall } : {}),
    writeDeliveredTimestamp,
  };

  // WICHTIG: kein x-sms-secret im Browser!
  return supabaseClient.functions
    .invoke('sms-direct', { body: payload })
    .then(({ data, error }) => {
      if (error) {
        log?.('[sms-direct] Edge call failed', error);
        return { ok: false, error: error.message || 'invoke failed' };
      }
      log?.('[sms-direct] sent:', data);
      return data; // { ok, sent, numbers, rejectedDevices, deliveredMarked, ... }
    })
    .catch((err) => {
      log?.('[sms-direct] Fehler beim Senden:', err);
      return { ok: false, error: err?.message || String(err) };
    });
}





function createMessageId() {
  try {
    const g = (typeof globalThis !== 'undefined') ? globalThis
            : (typeof self !== 'undefined') ? self
            : (typeof window !== 'undefined') ? window
            : undefined;

    const cryptoObj = g && g.crypto;
    if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
      return cryptoObj.randomUUID();
    }
    if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
      // UUID v4 Fallback
      const bytes = new Uint8Array(16);
      cryptoObj.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
      const toHex = n => n.toString(16).padStart(2, '0');
      const hex = Array.from(bytes, toHex).join('');
      return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
    }
  } catch {}
  // letzte Rückfalloption
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}


async function sendNotificationToTokens(
  title,
  body,
  tokens = [],
  options = {}
) {
  const {
    recipientDeviceNames = [],
    link = '/Mister-X/',
    attempt = 1,
    maxAttempts = 1,
    waitSec = 15,
    sendEndpoint = 'https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all',
    rtdbBase = RTDB_BASE,
    messageId: messageIdFromCaller, // kann vom Aufrufer stabil übergeben werden
    instantSMSDevices = [] // nur für den SMS-Fallback
  } = options;

  // erzeugen, falls nicht vom Aufrufer vorgegeben
  const messageId = messageIdFromCaller ?? createMessageId();

  const senderName =
    (typeof getDeviceId === 'function' ? getDeviceId() : null) || 'unknown';

  const isFirstAttempt = attempt === 1;

  const payload = {
    title,
    body,
    tokens,
    senderName,
    link,
    messageId,              // bleibt stabil über alle Retries
    rtdbBase,
    recipientDeviceNames: isFirstAttempt ? recipientDeviceNames : [],
    setRecipientsMode: isFirstAttempt ? 'set_once' : 'none',
    attempt,
  };


  const res = await fetch(sendEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let result = {};
  try { result = await res.json(); } catch {}
  log(`📦 Versuch ${attempt}: status=${res.status}`, result);

  const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);


// 👉 SMS-Fallback NUR vom lokalen Zustand abhängig machen
  if (isFirstAttempt && recipientDeviceNames.length > 0) {
    
    // fire-and-forget; bewusst NICHT awaiten
    triggerSmsFallbackIfNeeded(messageId, recipientDeviceNames, smsText, 15, {
        rtdbBase: RTDB_BASE,
        edgeUrl: `https://axirbthvnznvhfagduyj.supabase.co/functions/v1/sms-fallback`,
      });

  }

  //Instant-SMS senden
  if (isFirstAttempt && instantSMSDevices.length > 0) {
    triggerSmsDirectIfNeeded(messageId, instantSMSDevices, smsText, {
      rtdbBase: RTDB_BASE
    });
  }
    

  // Retry für fehlgeschlagene Tokens
  const failedTokens = Array.isArray(result?.failedTokens) ? result.failedTokens : [];
  if (failedTokens.length > 0 && attempt < maxAttempts) {
    log(`🔁 Wiederhole für ${failedTokens.length} fehlgeschlagene Tokens in 10s...`);
    setTimeout(() => {
      sendNotificationToTokens(title, body, failedTokens, {
        recipientDeviceNames, link, attempt: attempt + 1, maxAttempts, waitSec,
        sendEndpoint, rtdbBase, messageId
      }).catch(log);
    }, 10_000);
  } else if (attempt >= maxAttempts >= 2) {
    log('⏱️ Max. Anzahl an Versuchen erreicht.');
  } else {
    log('✅ Alle Benachrichtigungen verarbeitet.');
  }

  return result;
}





async function sendNotificationToRoles(title, body, roles, opts = {}) {
  // --- Early: determine messageId & rtdbBase so we can write an RTDB entry even if we skip sending ---
  const rtdbBase = opts.rtdbBase ?? RTDB_BASE;
  const messageId = opts.messageId ?? createMessageId();
  const senderName =
    (typeof getDeviceId === 'function' ? getDeviceId() : null) || 'unknown';

  // --- NEW: Check global setting "settings/messages" in RTDB ---
  try {
    const settingSnap = await get(ref(rtdb, 'settings/messages'));
    const messagesEnabled = !settingSnap.exists() ? true : !!settingSnap.val();
    if (!messagesEnabled) {
      // Write a notification object without recipients and return early
      const payloadForDb = {
        title: String(title ?? ''),
        body: String(body ?? ''),
        link: opts.link || '/Mister-X/',
        sender: senderName,
        timestamp: Date.now(),
        messageId,
        recipients: {} // explicit empty recipients
      };
      await set(ref(rtdb, `notifications/${messageId}`), payloadForDb);
      log('[sendNotificationToRoles] Global setting "settings/messages" = false, wrote notification without recipients', payloadForDb);
      return { ok: true, skipped: 'messages_disabled', messageId };
    }
  } catch (err) {
    log('[sendNotificationToRoles] Could not read settings/messages, proceeding as enabled:', err);
    // proceed normally if read fails
  }

  // --- existing code continues below ---
  // RTDB lesen
  const [rolesSnapshot, tokensSnapshot] = await Promise.all([
    get(ref(rtdb, 'roles')),
    get(ref(rtdb, 'tokens')),
  ]);

  const rolesData  = rolesSnapshot.exists()  ? rolesSnapshot.val()  : {};
  const tokensData = tokensSnapshot.exists() ? tokensSnapshot.val() : {};

  const roleList  = Array.isArray(roles) ? roles : [roles];
  const sendToAll = roleList.length === 1 && roleList[0] === 'all';

  const tokensToSend = [];
  const deviceNamesToExpect = [];
  const instantSMSDevices = [];

  // 🔑 NEU: über alle bekannten Geräte iterieren (roles ∪ tokens)
  const allDeviceNames = Array.from(
    new Set([
      ...Object.keys(rolesData || {}),
      ...Object.keys(tokensData || {}),
    ])
  );

  for (const deviceName of allDeviceNames) {
    const roleEntry = rolesData[deviceName] || {};
    const userRole = roleEntry.role;
    const notificationEnabled = (roleEntry.notification !== false); // default: true
    const instantSMS = roleEntry.instantSMS === true;               // default: false

    const matchesRole = sendToAll || (userRole && roleList.includes(userRole));
    if (!matchesRole || !notificationEnabled) continue;

    // 🚨 WICHTIG: Instant-SMS zuerst behandeln – unabhängig von Tokens
    if (instantSMS) {
      instantSMSDevices.push(deviceName);
      deviceNamesToExpect.push(deviceName);
      continue; // keine Push, nur SMS
    }

    // Danach: Push-Logik für alle anderen
    const devTokens = normalizeTokens(tokensData[deviceName]);
    if (devTokens.length > 0) {
      tokensToSend.push(...devTokens);
      deviceNamesToExpect.push(deviceName);
    }
  }

  const uniqueTokens      = unique(tokensToSend);
  const uniqueDeviceNames = unique(deviceNamesToExpect);
  const uniqueInstantSMS  = unique(instantSMSDevices);

  const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);
  // rtdbBase, messageId already computed earlier and used by downstream code

  // 🟨 Fall A: Es gibt Push-Tokens -> sende Push + ggf. Instant-SMS
  if (uniqueTokens.length > 0) {
    return sendNotificationToTokens(title, body, uniqueTokens, {
      recipientDeviceNames: uniqueDeviceNames,  // für Fallback & Empfangserwartung
      link: opts.link || '/Mister-X/',
      waitSec: typeof opts.waitSec === 'number' ? opts.waitSec : 45,
      sendEndpoint: opts.sendEndpoint,          // optional override
      rtdbBase,
      messageId,                                // stabil über Retries
      instantSMSDevices: uniqueInstantSMS,      // 👉 wird in sendNotificationToTokens -> sms-direct getriggert
    });
  }

  // 🟩 Fall B: Es gibt KEINE Tokens, aber Instant-SMS-Empfänger -> nur SMS-Direkt
  if (uniqueInstantSMS.length > 0) {
    // Du willst delivered markieren, daher sms-direct direkt triggern:
    await triggerSmsDirectIfNeeded(messageId, uniqueInstantSMS, smsText, {
      rtdbBase,
      // optional: rolesPath, recipientsPath, writeDeliveredTimestamp: true
    });
    return { ok: true, onlySms: true, smsCount: uniqueInstantSMS.length, messageId };
  }

  // 🟥 Fall C: Weder Tokens noch Instant-SMS → nichts zu tun
  log(`⚠️ Keine passenden Empfänger für Rollen "${Array.isArray(roles) ? roles.join(',') : roles}".`);
  return { ok: true, skipped: 'no_recipients' };
}


async function resolveRecipientsForRoles(roleOrRoles) {
  const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];

  const [rolesSnapshot, tokensSnapshot] = await Promise.all([
    get(ref(rtdb, 'roles')),
    get(ref(rtdb, 'tokens')),
  ]);

  const rolesData = rolesSnapshot.exists() ? rolesSnapshot.val() : {};
  const tokensData = tokensSnapshot.exists() ? tokensSnapshot.val() : {};

  const sendToAll = roles.length === 1 && roles[0] === 'all';

  const tokensToSend = [];
  const deviceNamesToExpect = [];
  const instantSMSDevices = [];

  for (const deviceName in tokensData) {
    if (!Object.prototype.hasOwnProperty.call(tokensData, deviceName)) continue;

    const roleEntry = rolesData[deviceName] || {};
    const userRole = roleEntry.role;
    const notificationEnabled = (roleEntry.notification !== false); // default: true
    const instantSMS = roleEntry.instantSMS === true;

    const matchesRole = sendToAll || (userRole && roles.includes(userRole));
    if (!matchesRole || !notificationEnabled) continue;

    // If device requested instant SMS, schedule SMS and skip collecting push tokens
    if (instantSMS) {
      instantSMSDevices.push(deviceName);
      deviceNamesToExpect.push(deviceName);
      continue; // no push tokens for instant-SMS devices
    }

    const devTokens = normalizeTokens(tokensData[deviceName]); // deine bestehende Helper-Funktion
    if (devTokens.length === 0) continue;

    tokensToSend.push(...devTokens);
    deviceNamesToExpect.push(deviceName);
  }

  return {
    tokens: unique(tokensToSend),
    deviceNames: unique(deviceNamesToExpect),
    instantSMSDevices: unique(instantSMSDevices),
  };
}


/**
 * Resolve recipients (tokens + device names + instantSMS) for given team ids.
 * Respects per-device notification opt-out and instantSMS flag from `roles`.
 */
async function resolveRecipientsForTeams(teamOrTeams) {
  const teamIds = Array.isArray(teamOrTeams) ? teamOrTeams : [teamOrTeams];

  // Read canonical data
  const [teamsSnap, rolesSnap, tokensSnap] = await Promise.all([
    get(ref(rtdb, 'teams')),
    get(ref(rtdb, 'roles')),
    get(ref(rtdb, 'tokens')),
  ]);

  const teamsData = teamsSnap.exists() ? teamsSnap.val() : {};
  const rolesData = rolesSnap.exists() ? rolesSnap.val() : {};
  const tokensData = tokensSnap.exists() ? tokensSnap.val() : {};

  const tokens = [];
  const deviceNames = [];
  const instantSMSDevices = [];

  const seenDevices = new Set();

  for (const teamId of teamIds) {
    const team = teamsData?.[teamId];
    if (!team || !team.members) continue;
    for (const deviceName of Object.keys(team.members || {})) {
      if (seenDevices.has(deviceName)) continue; // avoid duplicates across teams
      seenDevices.add(deviceName);

      const roleEntry = rolesData[deviceName] || {};
      const notificationEnabled = (roleEntry.notification !== false); // default true
      const instantSMS = roleEntry.instantSMS === true;

      if (!notificationEnabled) continue;

      // 🚨 Instant-SMS overrides push: if instantSMS is true, schedule SMS and skip push tokens
      if (instantSMS) {
        instantSMSDevices.push(deviceName);
        deviceNames.push(deviceName);
        continue; // Instant-SMS recipients do not receive push tokens
      }

      // Collect tokens (only for non-instantSMS devices)
      const devTokens = normalizeTokens(tokensData[deviceName]);
      if (devTokens.length > 0) {
        tokens.push(...devTokens);
        deviceNames.push(deviceName);
      }
    }
  }

  return { tokens: unique(tokens), deviceNames: unique(deviceNames), instantSMSDevices: unique(instantSMSDevices) };
}



function uploadToCloudinary(file, callback, errorCallback) {
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
        if (typeof errorCallback === "function") errorCallback(new Error("Fehler beim Hochladen zu Cloudinary."));
      }
    })
    .catch(error => {
      log("Upload-Fehler:", error);
      if (typeof errorCallback === "function") errorCallback(error);
    });
}

async function sendLocationWithPhoto() {
  const file = document.getElementById("photoInput").files[0];
  const manualDescription = document.getElementById("manualLocationDescription").value.trim();
  const manualContainer = document.getElementById("manualLocationContainer");
  const statusEl = document.getElementById("status");

  const selectedPost = getselectedPost();
  if (!selectedPost) {
    showToast("Bitte zuerst einen Posten auswählen.", { type: "error" });
    return;
  }
  if (!file) {
    showToast("Bitte ein Foto auswählen.", { type: "error" });
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
  sendNotificationToRoles?.("Mister X hat sich gezeigt!", notificationText, ['agent', 'settings', 'start']);

  startTimer();

  // 6) Foto im Hintergrund hochladen und URL aktualisieren
  uploadToCloudinary(file,
    async ({ url }) => {
      try {
        await update(locRef, { photoURL: url });
        statusEl.innerText = "✅ Foto hochgeladen";
      } catch (e) {
        statusEl.innerText = "❌ Foto-URL konnte nicht gesetzt werden";
        log("Foto-URL konnte nicht gesetzt werden", e);
      }
    },
    (error) => {
      statusEl.innerText = "❌ Foto konnte nicht hochgeladen werden";
      log("Upload-Fehler:", error);
    }
  );

  // 7) UI Reset
  document.getElementById("photoInput").value = "";
  document.getElementById("manualLocationDescription").value = "";
  manualContainer.style.display = "none";
  document.getElementById("postenSearch").value = "";
  setSelectedPost(null);

  statusEl.innerText = "🔄️ Posten/Farbe gemeldet & Foto wird hochgeladen.";
  startTimer?.();
}

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

//=======SMS-Funktionen=======

function isValidAtE164(n) {
  return typeof n === 'string' && /^\+43\d{4,13}$/.test(n);
}
function sanitizeKey(key) {
  return key.replace(/[.#$/\[\]\/]/g, "_");
}

function unique(array) {
  return Array.from(new Set(array));
}

function normalizeTokens(entry) {
  if (!entry) return [];
  if (typeof entry === 'string') return [entry];
  if (Array.isArray(entry)) return entry.filter(Boolean);
  if (typeof entry === 'object') return Object.keys(entry).filter(Boolean);
  return [];
}



async function sendSmsViaTextBee(recipients, message) {
  const url = `https://api.textbee.dev/api/v1/gateway/devices/${TEXTBEE_DEVICE_ID}/send-sms`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": TEXTBEE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipients, message }),
  });
  const bodyText = await res.text();
  return { ok: res.ok, status: res.status, bodyText };
}


// Entfernt alle Nicht-Ziffern außer führendem +
function stripPhone(raw) {
  const s = String(raw).trim();
  if (s.startsWith('+')) return '+' + s.slice(1).replace(/\D/g, '');
  return s.replace(/\D/g, '');
}


function loadSmsPrefs() {
  try {
    return JSON.parse(localStorage.getItem("mrx_sms_prefs_v1")) ?? {
      allowSmsFallback: false,
      tel: null,
      noTel: false,
      lastUpdated: 0
    };
  } catch {
    return {
      allowSmsFallback: false,
      tel: null,
      noTel: false,
      lastUpdated: 0
    };
  }
}

function saveSmsPrefs(next) {
  const cur = loadSmsPrefs();
  const merged = {
    allowSmsFallback: !!(next.allowSmsFallback ?? cur.allowSmsFallback),
    tel: next.tel === undefined ? cur.tel : next.tel,
    noTel: next.noTel === undefined ? cur.noTel : next.noTel,
    lastUpdated: Date.now()
  };
  localStorage.setItem("mrx_sms_prefs_v1", JSON.stringify(merged));
  return merged;
}


async function fetchRemoteSmsPrefs(deviceId) {
  const key = sanitizeKey(deviceId);
  const snap = await get(ref(rtdb, `roles/${key}`));
  if (!snap.exists()) return { exists: false, allowSmsFallback: null, tel: null };
  const data = snap.val() || {};
  return {
    exists: true,
    allowSmsFallback: (data.allowSmsFallback !== undefined) ? !!data.allowSmsFallback : null,
    tel: data.tel ?? null
  };
}



// Versucht Nutzerinput -> E.164 AT (+43…)
export function normalizeAtPhoneNumber(input) {
  if (!input) return null;
  let s = stripPhone(input);

  // Fälle: +43..., 0..., 43..., oder nur Ziffern
  if (s.startsWith('+43')) {
    return /^\+43\d{4,13}$/.test(s) ? s : null;
  }
  if (s.startsWith('0')) {
    // national -> international
    const candidate = '+43' + s.slice(1);
    return /^\+43\d{4,13}$/.test(candidate) ? candidate : null;
  }
  if (s.startsWith('43')) {
    const candidate = '+' + s;
    return /^\+43\d{4,13}$/.test(candidate) ? candidate : null;
  }
  // Falls nur Ziffern und plausibel lang: als 0-Start interpretieren
  if (/^\d{5,}$/.test(s) && s[0] !== '0') {
    const candidate = '+43' + s; // vorsichtig, lieber Nutzer:innen zu 0… oder +43… anleiten
    return /^\+43\d{4,13}$/.test(candidate) ? candidate : null;
  }
  return null;
}



async function saveTelToRTDB(deviceId, tel, allowSmsFallback) {
  const safeId = sanitizeKey(deviceId);
  const db = getDatabase(app);
  const updates = {
    tel: tel ?? null,
    allowSmsFallback: !!allowSmsFallback,
    ...(tel ? { telUpdatedAt: Date.now() } : {}),
  };
  await update(ref(rtdb, `roles/${safeId}`), updates);
}


//=======Funktionen für Teams =======


// --- Helpers DOM/LS ---
const $ = (id) => document.getElementById(id);
const show = (el) => el && (el.style.display = '');
const hide = (el) => el && (el.style.display = 'none');
const saveLocalTeamId = (id) => {
  try { localStorage.setItem(LS_KEY, id || ''); } catch {}
};
const getLocalTeamId = () => {
  try { return localStorage.getItem(LS_KEY) || ''; } catch { return ''; }
};

// --- Toast helper (non-blocking notifications) ---
function ensureToastContainer() {
  let c = document.getElementById('toastContainer');
  if (c) return c;
  c = document.createElement('div');
  c.id = 'toastContainer';
  c.setAttribute('aria-live', 'polite');
  c.style.position = 'fixed';
  c.style.left = '16px';
  c.style.bottom = '16px';
  c.style.zIndex = 2147483647;
  c.style.display = 'flex';
  c.style.flexDirection = 'column';
  c.style.gap = '8px';
  c.style.maxWidth = 'calc(100vw - 32px)';
  document.body.appendChild(c);

  // minimal CSS for toasts (one-time)
  const s = document.createElement('style');
  s.innerHTML = `#toastContainer .toast{background:#222;color:#fff;padding:10px 14px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.2);opacity:0;transform:translateY(6px);transition:opacity .22s,transform .22s;font-size:15px;max-width:380px;word-break:break-word}
#toastContainer .toast.show{opacity:1;transform:translateY(0)}
#toastContainer .toast.info{background:#333}
#toastContainer .toast.success{background:#2ECC71}
#toastContainer .toast.warn{background:#FF8C00}
#toastContainer .toast.error{background:#FF5252}
`;
  document.head.appendChild(s);
  return c;
}

function showToast(message, { timeout = 6500, type = 'info' } = {}) {
  try {
    const container = ensureToastContainer();
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;
    container.appendChild(t);
    // force paint then show
    requestAnimationFrame(() => t.classList.add('show'));
    const to = setTimeout(() => {
      t.classList.remove('show');
      t.addEventListener('transitionend', () => { try { t.remove(); } catch (e) {} });
    }, timeout);
    // allow manual dismissal by click
    t.addEventListener('click', () => { clearTimeout(to); t.classList.remove('show'); t.addEventListener('transitionend', () => { try { t.remove(); } catch (e) {} }); });
    return t;
  } catch (e) {
    // fallback to alert if something goes wrong
    try { alert(message); } catch (e) {}
  }
}


function normalizeTimestamp(ts) {
  if (typeof ts === 'number') return ts;
  if (ts && typeof ts === 'object' && typeof ts.seconds === 'number') {
    // (eher Firestore-Format, hier nur als Fallback)
    return ts.seconds * 1000;
  }
  return 0;
}

function formatDatetime(ms) {
  if (!ms) return '—';
  try {
    const d = new Date(ms);
    return d.toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });
  } catch (e) {
    return new Date(ms).toString();
  }
}


function getDisplayName(devId) {
  if (!devId) return 'Unbekannt';
  const last4 = String(devId);
  return `${last4}`;
}


function sanitizeTeamName(raw) {
  const s = (raw || '').trim();
  if (s.length < 2) throw new Error('Der Teamname muss mindestens 2 Zeichen lang sein.');
  if (s.length > 24) throw new Error('Der Teamname darf maximal 24 Zeichen lang sein.');
  return s;
}
function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function escapeAttr(s = "") {
  return escapeHtml(s).replace(/`/g, "&#096;");
}

function countMembers(team) {
  const m = team?.members || {};
  return Object.keys(m).length;
}
function isMemberOf(team, devId = deviceId) {
  return !!team?.members && !!team.members[devId];
}

// --- Init: Statusbar sofort mit localStorage füllen, dann Live-Listener starten ---
function initTeamModule() {
  // Statusbar mit letztem bekannten Team (LS) zeigen, bevor RTDB geladen ist
  const lsTeamId = getLocalTeamId();
  if (lsTeamId) {
    // Name/Count kennen wir noch nicht -> Platzhalter
    $('teamStatusName').textContent = '(lädt…)';
    $('teamStatusCount').textContent = '-';
  } else {
    $('teamStatusName').textContent = 'Kein Team';
    $('teamStatusCount').textContent = '-';
  }
  ensureTeamListeners();
}
document.addEventListener('DOMContentLoaded', initTeamModule);

// --- View Switch ---
function openCloseTeamSettings() {
  if (document.getElementById("teamSettings").style.display !== "none") {
    return closeTeamSettings();
  } 

  document.getElementById("startView").style.display = "none";
  document.getElementById("startView2").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  show($('teamSettings'));
  ensureTeamListeners(); // falls noch nicht aktiv
}
function closeTeamSettings() {
  let targetView = localStorage.getItem('activeView') || 'start';
  hide($('teamSettings'));
  switchView(targetView)
}

// --- Listener einrichten ---
function ensureTeamListeners() {
  if (!listeners.deviceTeam) {
    const deviceTeamRef = ref(rtdb, `deviceTeams/${deviceId}`);
    const handler = (snap) => {
      currentTeamId = snap.val() || null;
      saveLocalTeamId(currentTeamId || '');
      renderCurrentTeamBox();
      renderTeamList();
      renderTeamStatusBar();
    };
    onValue(deviceTeamRef, handler);
    listeners.deviceTeam = { ref: deviceTeamRef, handler };
  }

  if (!listeners.teams) {
    const teamsRef = ref(rtdb, 'teams');
    const handler = (snap) => {
      teamsSnapshotCache = snap.val() || {};
      renderCurrentTeamBox();
      renderTeamList();
      renderTeamStatusBar();
    };
    onValue(teamsRef, handler);
    listeners.teams = { ref: teamsRef, handler };
  }
}


// --- Rendering ---

function renderCurrentTeamBox() {
  const nameEl = $('currentTeamName');
  const memEl = $('currentTeamMembers');
  const leaveBtn = $('leaveTeamBtn');

  const team = currentTeamId ? teamsSnapshotCache[currentTeamId] : null;

  if (!team) {
    nameEl.textContent = 'Kein Team';
    if (memEl) memEl.innerHTML = '— Mitglieder';
    if (leaveBtn) leaveBtn.disabled = true;
    return;
  }

  nameEl.textContent = team.name || '(ohne Namen)';

  // Mitglieder sammeln & sortieren (nach joinedAt, dann deviceId)
  const members = Object.entries(team.members || {}).map(([id, data]) => ({
    id,
    joinedAt: normalizeTimestamp(data?.joinedAt)
  })).sort((a, b) => {
    if (a.joinedAt !== b.joinedAt) return a.joinedAt - b.joinedAt;
    return a.id.localeCompare(b.id);
  });

  // Member-Chips bauen
  const chipsHtml = members.map(m => {
    const isMe = m.id === deviceId;
    const label = getDisplayName(m.id) + (isMe ? ' (Du)' : '');
    return `<li class="ts-member ${isMe ? 'me' : ''}" title="${escapeHtml(m.id)}">${escapeHtml(label)}</li>`;
  }).join('');

  if (memEl) {
    memEl.innerHTML = `
      <div class="muted">${members.length} Mitglied(er)</div>
      ${
        members.length > 0
          ? `<ul class="ts-member-list">${chipsHtml}</ul>`
          : `<div class="muted">Noch keine Mitglieder</div>`
      }
    `;
  }

  if (leaveBtn) leaveBtn.disabled = !isMemberOf(team);
}



function renderTeamList() {
  const listEl = $('teamList');
  const emptyEl = $('teamsEmpty');
  if (!listEl) return;
  listEl.innerHTML = '';

  // Teams robust einlesen und Null-Einträge filtern
  const entries = Object
    .entries(teamsSnapshotCache || {})
    .filter(([, t]) => t && typeof t === 'object');

  if (entries.length === 0) {
    if (emptyEl) show(emptyEl);
    return;
  }
  if (emptyEl) hide(emptyEl);

  // Sortiere Teams: erst Mitgliederzahl (desc), dann Name (asc)
  entries.sort((a, b) => {
    const cntA = countMembers(a[1]);
    const cntB = countMembers(b[1]);
    if (cntA !== cntB) return cntB - cntA;
    return (a[1].name || '').localeCompare(b[1].name || '');
  });

  for (const [teamId, team] of entries) {
    // → ERSETZT die fehlerhafte Zahl-Variable durch ein Array mit Member-Objekten
    const memberArray = Object.entries(team.members || {})
      .map(([id, data]) => ({
        id,
        joinedAt: normalizeTimestamp(data?.joinedAt)
      }))
      .sort((a, b) => {
        if (a.joinedAt !== b.joinedAt) return a.joinedAt - b.joinedAt;
        return a.id.localeCompare(b.id);
      });

    const chipsHtml = memberArray.map(m => {
      const isMe = m.id === deviceId;
      const label = getDisplayName(m.id) + (isMe ? ' (Du)' : '');
      return `<li class="ts-member ${isMe ? 'me' : ''}" title="${escapeHtml(m.id)}">${escapeHtml(label)}</li>`;
    }).join('');

    const card = document.createElement('div');
    card.className = 'ts-team';
    card.innerHTML = `
      <div>
        <div style="font-weight:600">${escapeHtml(team.name || '(ohne Namen)')}</div>
        <div class="muted">${memberArray.length} Mitglied(er)</div>
        <ul class="ts-member-list">
          ${chipsHtml || ''}
        </ul>
      </div>
      <div>
        ${
          currentTeamId === teamId
            ? `<button class="danger" onclick="leaveTeam()">Verlassen</button>`
            : `<button onclick="joinTeam('${teamId}', this)">Beitreten</button>`
        }
      </div>
    `;
    listEl.appendChild(card);
  }
}


function renderTeamStatusBar() {
  const nameSpan = $('teamStatusName');
  const countSpan = $('teamStatusCount');

  const team = currentTeamId ? teamsSnapshotCache[currentTeamId] : null;
  if (!team) {
    nameSpan.textContent = 'Kein Team';
    countSpan.textContent = '-';
    return;
  }
  nameSpan.textContent = team.name || '(ohne Namen)';
  countSpan.textContent = `${countMembers(team)} Mitglied(er)`;
}

// --- Aktionen ---
async function createTeam() {
  const btn = $('createTeamBtn');
  const input = $('createTeamInput');
  try {
    btn.disabled = true;
    const name = sanitizeTeamName(input.value);

    // Wenn schon in Team: zuerst sauber verlassen
    if (currentTeamId) {
      await leaveTeam(currentTeamId);
    }

    const newTeamRef = push(ref(rtdb, 'teams'));
    const teamId = newTeamRef.key;

    const updates = {};
    updates[`teams/${teamId}`] = {
      name,
      createdAt: serverTimestamp(),
      createdBy: deviceId,
      members: { [deviceId]: { joinedAt: serverTimestamp() } }
    };
    updates[`deviceTeams/${deviceId}`] = teamId;

    await update(ref(rtdb), updates);

    // localStorage aktualisiert sich durch den deviceTeam-Listener; hier optional direkt:
    saveLocalTeamId(teamId);

    input.value = '';
  } catch (err) {
    alert(err?.message || 'Team konnte nicht erstellt werden.');
    log(err);
  } finally {
    btn.disabled = false;
  }
}

async function joinTeam(teamId, btnEl) {
  if (!teamId) return;
  const team = teamsSnapshotCache[teamId];
  if (!team) { showToast('Team existiert nicht (mehr).', { type: "error" }); return; }

  if (btnEl) btnEl.disabled = true;
  try {
    if (currentTeamId && currentTeamId !== teamId) {
      await leaveTeam(currentTeamId);
    }

    const updates = {};
    updates[`teams/${teamId}/members/${deviceId}`] = { joinedAt: serverTimestamp() };
    updates[`deviceTeams/${deviceId}`] = teamId;
    await update(ref(rtdb), updates);

    saveLocalTeamId(teamId);
  } catch (err) {
    showToast(err?.message || 'Beitritt nicht möglich.', { type: "error" });
    log(err);
  } finally {
    if (btnEl) btnEl.disabled = false;
  }
}

/**
 * Verlässt das angegebene Team (oder das aktuelle).
 * Wenn danach 0 Mitglieder übrig sind, wird das Team gelöscht (runTransaction -> return null).
 * Zusätzlich wird das deviceTeams-Mapping des Geräts auf null gesetzt.
 */
async function leaveTeam(teamId = null) {
  const id = teamId || currentTeamId;
  if (!id) return;

  const teamRef = ref(rtdb, `teams/${id}`);

  // Transaktion: entferne mich aus members; wenn danach 0 -> Team-Knoten löschen
  await runTransaction(teamRef, (team) => {
    if (!team) return team; // schon weg
    if (team.members && team.members[deviceId]) {
      delete team.members[deviceId];
      const left = Object.keys(team.members).length;
      if (left === 0) {
        return null; // löscht teams/{id}
      }
    }
    return team;
  });

  // Mapping lösen
  await set(ref(rtdb, `deviceTeams/${deviceId}`), null);

  // localStorage leeren
  saveLocalTeamId('');
}




function ensureMapVisible() {
  const el = document.getElementById('map');
  el.style.display = ''; // sichtbar machen (oder 'block')
}

function createOrReuseMap(lat, lon) {
  ensureMapVisible();
  if (!map) {
    map = L.map('map', {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      },
      maxBounds: [[-90, -180], [90, 180]],
      doubleTouchDragZoom: true,
    }).setView([lat, lon], 15);

    // Debug: check fullscreen factory presence; if missing, try to add control programmatically
    console.debug('createOrReuseMap: L.control.fullscreen=', typeof L.control?.fullscreen, 'map.options.fullscreenControl=', (map && map.options && map.options.fullscreenControl));
    if (typeof L.control?.fullscreen === 'function') {
      // If the control did not get auto-added, add it now
      try {
        if (!map.fullscreenControl) {
          L.control.fullscreen({ position: 'topleft', title: 'Vollbild', titleCancel: 'Vollbild verlassen', forceSeparateButton: true }).addTo(map);
        }
      } catch (err) {
        log('leaflet.fullscreen: failed to add control programmatically', err);
      }
    }

    // Expose the map object to window for easier debugging in the console
    try { window.__map = map; } catch (e) { /* ignore */ }

  // Karten-Layer definieren
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

    const cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© CartoDB'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    const TopPlusOpen_Color = L.tileLayer('http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png', {
      maxZoom: 18,
      attribution: 'TopPlus Open © GeoBasis-DE / BKG',
    });


    const BasemapAT_orthofoto = L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 20,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      type: 'normal',
      format: 'jpeg',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });

    const BasemapAT_highdpi = L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaphidpi/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      type: 'normal',
      format: 'jpeg',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });


    const baseMaps = {
      "Standard": osm,
      "Reduziert": cartoLight,
      "Satellit": satellite,
      "Satellit (AT)": BasemapAT_orthofoto,
      "Plan": TopPlusOpen_Color,
      "Plan (AT)": BasemapAT_highdpi
    };

    osm.addTo(map); // Standard aktivieren
    L.control.layers(baseMaps).addTo(map); // Umschaltmenü
    setTimeout(() => map.invalidateSize(),0);
    ensurePanes();
    ensureLayerGroups();

    // --- Maßstab (erscheint kurz nach Zoomänderung, dann verblassen) ---
    try {
      scaleControl = L.control.scale({ position: 'bottomright', metric: true, imperial: false }).addTo(map);
      // Start versteckt; CSS regelt Sichtbarkeit. Wir zeigen bei Zoom.
      function _showScaleTemporary() {
        const el = document.querySelector('.leaflet-control-scale');
        if (!el) return;
        el.classList.add('visible');
        if (scaleHideTimer) clearTimeout(scaleHideTimer);
        scaleHideTimer = setTimeout(() => { el.classList.remove('visible'); scaleHideTimer = null; }, 5000);
      }
      map.on('zoomend', () => {
        try { scaleControl._update && scaleControl._update(); } catch (e) { /* ignore */ }
        _showScaleTemporary();
      });
    } catch (e) { log('Scale control setup failed', e); }
  } else {
    map.setView([lat, lon], 15);
    map.invalidateSize();
    ensurePanes();
    ensureLayerGroups();
  }
  ensurePostenLayer();
}

function ensurePanes() {
  if (!map) return;

  // Reihenfolge: Base < Mask < Linien/Polygone < Posten (CircleMarker) < Marker
  if (!map.getPane('maskPane')) {
    map.createPane('maskPane');
    map.getPane('maskPane').style.zIndex = 300;
  }

  if (!map.getPane('historyPane')) {
    map.createPane('historyPane');
    map.getPane('historyPane').style.zIndex = 410; // Pfade/History
  }

  if (!map.getPane('postenPane')) {
    map.createPane('postenPane');
    map.getPane('postenPane').style.zIndex = 400; // Posten
  }

  if (!map.getPane('agentenPane')) {
    map.createPane('agentenPane');
    map.getPane('agentenPane').style.zIndex = 420; // Agenten-Locations
  }

  if (!map.getPane('userPane')) {
    map.createPane('userPane');
    map.getPane('userPane').style.zIndex = 450; // User-Marker
  }
}


function ensureLayerGroups() {
  if (!postenLayer) postenLayer = L.layerGroup();
  if (!historyLayer) historyLayer = L.layerGroup();
  if (!userLayer) userLayer = L.layerGroup();

  if (map) {
    if (!map.hasLayer(postenLayer)) postenLayer.addTo(map);
    if (!map.hasLayer(historyLayer)) historyLayer.addTo(map);
    if (!map.hasLayer(userLayer)) userLayer.addTo(map);

    // Ensure the mask polygon (outer veil with inner spielbereich hole) is present
    // and placed on the 'maskPane' so it sits above base tiles but below markers.
    try {
      if (typeof mask !== 'undefined' && !map.hasLayer(mask)) mask.addTo(map);
    } catch (e) { /* ignore if mask undefined during early init */ }
  }
}



function renderHistory(validEntries) {
  if (!map) return;
  ensureLayerGroups();
  historyLayer.clearLayers();


const icon = new L.Icon.Default();
icon.options.shadowSize = [0,0];


  validEntries.forEach(loc => {
    L.marker([loc.lat, loc.lon], { pane: 'historyPane', icon })
      .addTo(historyLayer)
      .bindPopup(`📍 ${new Date(loc.timestamp).toLocaleTimeString()}`);
  });


  const coords = validEntries.map(loc => [loc.lat, loc.lon]);
  if (coords.length > 1) {
    L.polyline(coords, {
      color: 'blue',
      weight: 3,
      opacity: 0.7,
      smoothFactor: 1,
      pane: 'historyPane'
    }).addTo(historyLayer);
  }
}





let __latestLocationsSnap = null;
let __latestUbahnSnap = null;
let __ubahnListenerAttached = false;

function renderFeedsFromLatest() {
  // Combine locations and ubahn events and render into the same feed under the map
  const feed = document.getElementById("locationFeed");
  if (!feed) return;
  feed.innerHTML = "";

  // Locations
  let locEntries = [];
  try {
    const data = __latestLocationsSnap?.val() || null;
    locEntries = data ? Object.values(data).sort((a,b) => b.timestamp - a.timestamp) : [];
  } catch {
    locEntries = [];
  }

  // U-Bahn events
  let ubahnEntries = [];
  try {
    const udata = __latestUbahnSnap?.val() || null;
    ubahnEntries = udata ? Object.values(udata).sort((a,b) => b.timestamp - a.timestamp) : [];
  } catch {
    ubahnEntries = [];
  }

  // Merge by timestamp descending
  const merged = [
    ...locEntries.map(e => ({ kind: 'loc', data: e })),
    ...ubahnEntries.map(e => ({ kind: 'ubahn', data: e }))
  ].sort((A,B) => (B.data.timestamp || 0) - (A.data.timestamp || 0));

  if (merged.length === 0) {
    // nothing to show
    return;
  }

  merged.forEach((item, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = '1em';

    if (item.kind === 'loc') {
      const loc = item.data;
      const entryTitle = loc.title ? loc.title : "Automatischer Standort";
      const entryTime = loc.timestamp ? new Date(loc.timestamp).toLocaleTimeString() : "";
      const photoHTML = loc.photoURL ? `<img src="${loc.photoURL}" alt="Foto" class="zoomable-photo" style="max-width: 100%; max-height: 60vh; border: 1px solid #ccc; margin-top: 5px; cursor: zoom-in;" data-index="${index}">` : "";
      div.innerHTML = `
        <strong class="location-title" data-lat="${loc.lat}" data-lon="${loc.lon}" style="cursor: pointer;">${entryTitle} (${entryTime})</strong><br>
        ${loc.description ? `<em>📍 ${loc.description}</em><br>` : ""}
        ${photoHTML}
      `;
    } else {
      const ev = item.data;
      const entryTime = ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : '';
      const msg = ev.message ? ev.message : 'U-Bahn-Ereignis';
      div.innerHTML = `
        <strong class="location-title ubahn-event" data-lat="" data-lon="" style="cursor: default;">🚇 ${escapeHtml(String(msg))} (${entryTime})</strong><br>
      `;
    }

    feed.appendChild(div);
  });

  // Wire up click handlers for location titles that have lat/lon
  document.querySelectorAll('.location-title').forEach(el => {
    const lat = parseFloat(el.dataset.lat);
    const lon = parseFloat(el.dataset.lon);
    if (!isNaN(lat) && !isNaN(lon)) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        if (map && !isNaN(lat) && !isNaN(lon)) {
          map.setView([lat, lon], 17);
        }
      });
    }
  });

  // Attach zoom behavior for photos (if any)
  document.querySelectorAll('.zoomable-photo').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '9999';
      modal.innerHTML = `<img src="${img.src}" style="max-width: 90%; max-height: 90%; border: 2px solid white;">`;

      modal.addEventListener('click', () => {
        document.body.removeChild(modal);
      });

      document.body.appendChild(modal);
    });
  });
}

function showLocationHistory() {
  onValue(ref(rtdb, "locations"), (snapshot) => {
    __latestLocationsSnap = snapshot;

    const data = snapshot.val() || null;
    let entries = [];
    let validEntries = [];
    let no_locations = null;

    try {
      entries = data ? Object.values(data).sort((a,b) => b.timestamp - a.timestamp) : [];
      validEntries = entries.filter(e => e.lat != null && e.lon != null);
      no_locations = validEntries.length === 0;
    } catch { no_locations = true; }

    if (no_locations) {
      createOrReuseMap(48.208672092667435, 16.372477270381918);
      log("Keine Locations");
    } else if (validEntries.length > 0) {
      const { lat, lon } = validEntries[0];
      createOrReuseMap(lat, lon);
    }

    // 1) User-Layer updaten (ohne andere zu löschen!)
    reattachUserLocationOnMap();

    // 2) History frisch zeichnen
    if (validEntries.length > 0) {
      renderHistory(validEntries);
    } else if (historyLayer) {
      historyLayer.clearLayers();
    }

    // 3) Posten sicherstellen (NACH allen evtl. destruktiven Calls)
    ensurePostenLayer();
    renderPostenMarkersFromCache({ nonDestructive: true });

    // 4) Re-render the combined feed (locations + ubahn)
    renderFeedsFromLatest();
  });
  
  // Also attach the ubahn listener if not attached yet
  if (!__ubahnListenerAttached) attachUbahnListener();
}

// The feed rendering and event wiring are handled by renderFeedsFromLatest() and
// by the existing click handlers set there. Removed duplicate top-level block that
// referenced `entries` outside of its scope to avoid ReferenceErrors.



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
        interactive: false,
        fillOpacity: 0.2,
        weight: 1,
        opacity: 0.4
      };

      // Marker anlegen oder aktualisieren
      if (!userMarker) {
        userMarker = L.circleMarker([latitude, longitude], {markerStyle, pane: 'userPane'})
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
        userAccuracyCircle = L.circle([latitude, longitude], { ...accuracyStyle, pane: 'historyPane' }).addTo(map);
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

  // Vorschau-Image direkt ins Popup (falls vorhanden)
  const imageHtml = loc.imageUrl
    ? `
      <div class="posten-preview" style="margin-top:6px">
        <img
          class="posten-preview-img"
          src="${escapeAttr(loc.imageUrl)}"
          data-fullsrc="${escapeAttr(loc.imageUrl)}"
          alt="${escapeAttr(title)}"
          loading="lazy"
          style="width:100%;height:auto;max-height:120px;object-fit:contain;border-radius:8px;cursor:zoom-in;display:block"
          referrerpolicy="no-referrer"
        />
      </div>
    `
    : "";

  return `
    <div class="posten-popup" style="min-width:200px">
      <strong>${escapeHtml(title)}</strong><br>
      <small>Farbe: ${escapeHtml(color)} (${activeTxt})</small><br>
      <small>Status: ${visitedTxt}</small>
      ${imageHtml}
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

async function ensurePostenLoadedOnce() {
  const postenRef = ref(rtdb, "posten");
  const snap = await get(postenRef);
  postenCache = snap.exists() ? snap.val() : null;
  renderPostenMarkersFromCache();
  // danach live-updates anschließen
  onValue(postenRef, (s) => {
    postenCache = s.exists() ? s.val() : null;
    renderPostenMarkersFromCache();
  });
}


function setupLightboxOnce() {
  const box = document.getElementById('img-lightbox');
  const btn = document.getElementById('img-lightbox-close');
  if (!box || !btn) return;

  const close = () => box.style.display = "none";
  btn.addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
};





// Am besten nach map-Initialisierung ausführen (oder ganz am Ende deiner JS-Datei)(function attachDelegatedImageClick() {
  
function attachDelegatedImageClick() {
  const handler = (e) => {
    const img = e.target.closest('.posten-preview-img');
    if (!img) return;

    // Falls Leaflet/Popup das „schluckt“: im Capture-Phase hören
    e.preventDefault();
    e.stopPropagation();

    const alt = img.getAttribute('alt') || "Bild";
    const full = img.getAttribute('data-fullsrc') || img.getAttribute('src');
    if (full) openImageModal(full, alt);
  };

  // Capture = true macht es sehr robust gegen stopPropagation in Bubbling-Phase
  document.addEventListener('click', handler, { capture: true });
};






function openImageModal(src, alt = "") {
  const box = document.getElementById('img-lightbox');
  const img = document.getElementById('img-lightbox-img');
  if (!box || !img) return;

  // 1) Sofort anzeigen
  box.style.display = "flex";

  // 2) onload optional nur noch für spätere Effekte
  img.onload = null;  // nicht zwingend nötig
  img.onerror = null;

  // 3) Alt setzen
  img.alt = alt || "Bild";

  // 4) gleichen src-Fall behandeln: zurücksetzen, dann neu setzen
  if (img.src === src) {
    img.src = "";     // Reset triggert ein frisches Laden
  }
  img.src = src;
}




function ensurePostenLayer() {
  if (!postenLayer) postenLayer = L.layerGroup();
  if (map && !map.hasLayer(postenLayer)) postenLayer.addTo(map);
}

function renderPostenMarkersFromCache(options = {}) {
  const { nonDestructive = false } = options;

  if (!map || !postenCache) return;

  ensurePanes();
  ensurePostenLayer();
  

  const seen = new Set();
  let validCount = 0;

  Object.entries(postenCache).forEach(([color, group]) => {
    if (!group || typeof group !== "object") return;

    const isActiveColor = !!group.active;
    const posts = Object.fromEntries(
      Object.entries(group).filter(([k]) => k !== "active")
    );

    Object.entries(posts).forEach(([key, loc]) => {
      if (!loc || typeof loc !== "object") return;

      const { lat, lon } = extractLatLon(loc);
      if (lat == null || lon == null) return;

      validCount++;
      const markerKey = `${color}/${key}`;
      seen.add(markerKey);

      const style = styleForPosten(color, isActiveColor, !!loc.visited);


      if (postenMarkers[markerKey]) {
        const m = postenMarkers[markerKey];
        m.setLatLng([lat, lon]);
        m.setStyle(style);
        m._postenLoc = loc;     // <— wichtig
        m._postenId = markerKey;
        if (postenLayer && !postenLayer.hasLayer(m)) m.addTo(postenLayer);
        m.bringToFront?.();
        m.getPopup()?.setContent(makePostenPopupHTML(color, key, loc, isActiveColor));
      } else {
        const m = L.circleMarker([lat, lon], { ...style, pane: 'postenPane' })
          .bindPopup(makePostenPopupHTML(color, key, loc, isActiveColor));
        m._postenLoc = loc;     // <— wichtig
        m._postenId = markerKey;
        m.addTo(postenLayer);
        postenMarkers[markerKey] = m;
      }
    });
  });

  // ⟵ WICHTIG: Cleanup nur wenn sinnvoll
  if (nonDestructive) return;

  if (validCount === 0) {
    log('[posten] Kein gültiger Posten geparst - Cleanup übersprungen.');
    return;
  }

  // Normales Aufräumen
  Object.keys(postenMarkers).forEach((k) => {
    if (!seen.has(k)) {
      postenLayer.removeLayer(postenMarkers[k]);
      delete postenMarkers[k];
    }
  });
}


  // Entferne Marker, die nicht mehr in der DB sind
  Object.keys(postenMarkers).forEach((k) => {
    if (!seen.has(k)) {
      postenLayer.removeLayer(postenMarkers[k]);
      delete postenMarkers[k];
    }
  });


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
    notifHeaderEl.classList.remove('sticky');
    notifHeaderEl.style.position = '';
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

  // --- Team-Logik ---
  // 1) Basestatus: delivered -> green; per-device fallbackTargets -> orange; else -> red (default)
  const baseStatus = {}; // name -> 'green'|'orange'|'red'
  names.forEach(name => {
    const safeName = sanitizeKey(name);
    if (rec[name] === true) baseStatus[name] = 'green';
    else if (n && n.fallbackTargets && n.fallbackTargets[safeName]) baseStatus[name] = 'orange';
    else baseStatus[name] = 'red';
  });

  // 2) Upgrade to 'blue' ONLY for devices that are still RED when at least one teammate is green or orange
  const finalStatus = {};
  names.forEach(name => {
    const team = (() => {
      for (const [teamId, teamObj] of Object.entries(teamsSnapshotCache || {})) {
        if (teamObj.members && teamObj.members[name]) return teamObj;
      }
      return null;
    })();

    let status = baseStatus[name];
    if (status === 'red' && team) {
      const otherMembers = Object.keys(team.members).filter(m => m !== name);
      const hasGood = otherMembers.some(m => baseStatus[m] === 'green' || baseStatus[m] === 'orange');
      if (hasGood) status = 'blue';
    }
    finalStatus[name] = status;
  });

  recipientList.innerHTML = '';
  const allStatus = [];

  names.sort((a,b)=>a.localeCompare(b)).forEach(name => {
    const status = finalStatus[name];
    allStatus.push(status);

    // Chip-Style mapping: green -> ok, orange -> wait, blue -> teamblue, red -> red
    const chipClass = status === 'green' ? 'ok'
                    : status === 'orange' ? 'wait'
                    : status === 'blue' ? 'teamblue'
                    : 'red';

    const symbol = status === 'green' ? '✅' : status === 'blue' ? '🟦' : status === 'orange' ? '📰' : '🔴';

    const div = document.createElement('div');
    div.className = `recipient-chip ${chipClass}`;
    div.innerHTML = `<span class="dot"></span><span>${name}</span><span>${symbol}</span>`;
    recipientList.appendChild(div);
  });

  // --- Status-Lampe (Priority: if any red -> red; else if any blue -> blue; else if any orange -> orange; else all green -> green) ---
  let statusColor = '#FF5252'; // default: rot
  if (allStatus.length > 0) {
    if (allStatus.some(s => s === 'red')) statusColor = '#FF5252';
    else if (allStatus.some(s => s === 'blue')) statusColor = '#1E90FF';
    else if (allStatus.some(s => s === 'orange')) statusColor = '#FF8C00';
    else statusColor = '#2ECC71';
  }
  notifStatusDot.style.background = statusColor;
  if (notifCountEl) notifCountEl.textContent = `${okCount}/${total} bestätigt`;
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


//========Agentlocation-Funktionen==========


async function triggerAgentLocationRequest() {
  if (!confirm("Möchtest du wirklich die Standorte der Agenten anfragen?")) return;
  try {
    // 1) Teams zum Zeitpunkt der Anfrage erfassen (Cache oder Fallback)
    let teamsObj = teamsSnapshotCache;
    if (!teamsObj || Object.keys(teamsObj).length === 0) {
      const snap = await get(ref(rtdb, 'teams'));
      teamsObj = snap.val() || {};
    }

    // 2) Teams filtern (z. B. Mister X' Team ausschließen und nur Teams mit Mitgliedern)
    const teamsAtRequest = {};
    for (const [teamId, team] of Object.entries(teamsObj)) {
      // Mister X' Team NICHT anschreiben (ggf. entfernen, wenn du M.X. einschließen willst)
      if (teamId === currentTeamId) continue;

      // Nur Teams mit mind. 1 Mitglied
      const memberCount = team?.members ? Object.keys(team.members).length : 0;
      if (memberCount > 0) {
        // boolean-map reicht für Zähler (x/x)
        teamsAtRequest[teamId] = true;
      }
    }

    if (Object.keys(teamsAtRequest).length === 0) {
      log?.('[triggerAgentLocationRequest] Abbruch: keine adressierbaren Teams gefunden.');
      showToast('Keine Teams gefunden, die angefragt werden können.', { type: "error" });
      return;
    }

    // 3) Anfrageobjekt erstellen
    // Deine bisherige ID war Date.now(). Das ist okay.
    // Alternativ etwas robuster: const reqId = (crypto?.randomUUID?.() || String(Date.now()));
    const reqId = String(Date.now());

    const requestPayload = {
      id: reqId,
      createdAt: serverTimestamp(),
      createdBy: deviceId,
      teamsAtRequest,     // zählbarer Nenner für x/x
      responses: {}       // Antworten-Container: teamId -> {lat, lon, teamName, ...}
      // optional: status: 'open'
    };

    // 4) Schreiben: Einzelner „current“-Knoten wird überschrieben (simpler Flow)
    await set(ref(rtdb, 'agentLocationRequest'), requestPayload);

    // 5) Push-Benachrichtigung: nur an Mitglieder der betroffenen Teams senden
    const teamIds = Object.keys(teamsAtRequest);
    try {
      const { tokens, deviceNames, instantSMSDevices } = await resolveRecipientsForTeams(teamIds);

      const title = 'Mister X hat deinen Standort angefragt';
      const body = 'Öffne die App, um deinen Standort freizugeben!';

      if ((tokens && tokens.length > 0) || (instantSMSDevices && instantSMSDevices.length > 0)) {
        // Wenn es Push-Tokens gibt, nutze den gewohnten Versand-Pfad
        if (tokens && tokens.length > 0) {
          await sendNotificationToTokens(title, body, tokens, {
            recipientDeviceNames: deviceNames,
            link: '/Mister-X/',
            rtdbBase: RTDB_BASE,
          });
        }

        // Falls einige Geräte Instant-SMS wünschen → SMS direkt senden (sofort),
        // auch wenn andere Empfänger Push-Tokens haben.
        if (instantSMSDevices && instantSMSDevices.length > 0) {
          const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);
          await triggerSmsDirectIfNeeded(createMessageId(), instantSMSDevices, smsText, { rtdbBase: RTDB_BASE });
        }
      } else {
        log?.('[triggerAgentLocationRequest] Keine Empfänger in den ausgewählten Teams gefunden.');
      }
    } catch (e) {
      log?.('[triggerAgentLocationRequest] Fehler beim Ermitteln der Empfänger', e);
    }

    log?.('[triggerAgentLocationRequest] Anfrage ausgelöst', { reqId, totalTeams: Object.keys(teamsAtRequest).length });
    return reqId;
  } catch (e) {
    log?.('[triggerAgentLocationRequest] Anfrage fehlgeschlagen', e);
    showToast('Konnte die Anfrage nicht auslösen.', { type: 'error' });
    throw e;
  }
}



async function shareTeamLocationForRequest(req) {
  if (!req || !req.id) return;

  // Prevent duplicate concurrent prompts/writes for the same request id
  if (agentReqInFlight.has(req.id)) {
    log('shareTeamLocationForRequest: already in flight for ' + req.id);
    return;
  }

  // If a previous prompt was started (maybe from another tab) we avoid prompting again
  try {
    if (localStorage.getItem(LS_LAST_PROMPTED_REQ) === req.id) {
      log('shareTeamLocationForRequest: already prompted (LS) for ' + req.id);
      return;
    }
  } catch (e) {}

  agentReqInFlight.add(req.id);
  try {
    if (!currentTeamId) {
      showToast('Du bist in keinem Team. Standortfreigabe abgebrochen.', { type: 'warn' });
      return;
    }

    // Quick local check: if we've already responded to this request earlier, skip
    try {
      if (localStorage.getItem(LS_LAST_RESPONDED_REQ) === req.id) {
        log('shareTeamLocationForRequest: already responded (LS) for ' + req.id);
        return;
      }
    } catch (e) {}

    // Vorab prüfen, ob Team schon geantwortet hat (race-sicherer Schutz folgt per Transaktion)
    const teamRespRef = ref(rtdb, `agentLocationRequest/responses/${currentTeamId}`);
    const existing = await get(teamRespRef);
    if (existing.exists()) {
      // Schon vorhanden – nichts mehr senden
      try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
      return;
    }

  // Zusätzliche Prüfung: Existiert die Anfrage noch (wurde sie nicht zwischenzeitlich gelöscht)?
  const reqRef = ref(rtdb, 'agentLocationRequest');
  const reqSnap = await get(reqRef);
  if (!reqSnap.exists()) {
    // Anfrage wurde zurückgezogen -> nicht senden
    showToast('Die Anfrage wurde zurückgezogen — Standort wird nicht gesendet.', { type: 'warn' });
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
    return;
  }
  const reqVal = reqSnap.val();
  if (reqVal?.id && reqVal.id !== req.id) {
    // Anfrage wurde durch eine neuere ersetzt -> nicht senden
    showToast('Es gibt inzwischen eine andere Anfrage — Standort wird nicht gesendet.', { type: 'warn' });
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
    return;
  }

    // Mark local that we've prompted for this request (survive reload briefly)
  try { localStorage.setItem(LS_LAST_PROMPTED_REQ, req.id); } catch (e) {}

  // Show a non-blocking confirm dialog that gathers location in background and returns only when user confirms/cancels
  const confirmResult = await showConfirmLocationDialog('Dein Standort wird jetzt für Mister X freigegeben', req.id, { maxWaitMs: 10000, desiredAccuracy: 30, autoConfirmMs: 30000 });

  if (confirmResult === null) {
    // auto-closed (request removed/changed)
    log('shareTeamLocationForRequest: confirm dialog auto-closed');
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch (e) {}
    try { localStorage.removeItem('pendingAgentResponse'); } catch (e) {}
    return;
  }
  if (confirmResult === 'cancel') {
    showToast('Standortfreigabe abgebrochen.', { type: 'info' });
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch (e) {}
    try { localStorage.removeItem('pendingAgentResponse'); } catch (e) {}
    return;
  }

  const position = confirmResult.position;
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = typeof position.coords.accuracy === 'number' ? Math.round(position.coords.accuracy) : null;

  // Teamname ermitteln (nice to have)
  const teamName = (teamsSnapshotCache?.[currentTeamId]?.name) || 'Team';
  showToast("Standort freigegeben", { type: 'success' })

  // Nochmals prüfen, ob die Anfrage noch aktiv ist (zwischenzeitlich evtl. gelöscht/ersetzt)
  const latestReqSnap = await get(reqRef);
  if (!latestReqSnap.exists() || (latestReqSnap.val()?.id && latestReqSnap.val().id !== req.id)) {
    showToast('Die Anfrage wurde zurückgezogen oder ersetzt — Standort wird nicht gesendet.', { type: 'warn' });
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
    return;
  }

  // Atomare Transaktion auf dem Parent-Knoten 'agentLocationRequest':
  // prüft, dass die Anfrage noch existiert und die id mit req.id übereinstimmt
  // und schreibt die Antwort nur wenn noch keine vorhanden ist
  const txRes = await runTransaction(reqRef, (current) => {
    if (!current) {
      // Anfrage wurde zwischenzeitlich entfernt -> abort
      return;
    }
    if (current.id !== req.id) {
      // Andere Anfrage aktiv -> abort
      return;
    }
    const responses = current.responses || {};
    if (responses[currentTeamId]) {
      // Unser Team hat bereits geantwortet
      return current;
    }

    responses[currentTeamId] = {
      teamId: currentTeamId,
      teamName,
      lat,
      lon,
      accuracy: typeof accuracy === 'number' ? accuracy : null,
      deviceId,
      timestamp: serverTimestamp(),
    };
    current.responses = responses;
    return current;
  }, { applyLocally: false });

  const committed = !!txRes?.committed;
  if (!committed) {
    // Transaction wurde nicht angewendet (z. B. weil Anfrage weg war oder ersetzt wurde)
    showToast('Standort nicht gesendet: die Anfrage wurde zurückgezogen oder bereits beantwortet.', { type: 'warn' });
    try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
    return;
  }

  // Erfolgreich geantwortet
  try { localStorage.setItem(LS_LAST_RESPONDED_REQ, req.id); } catch {}
  try { localStorage.removeItem('pendingAgentResponse'); } catch (e) {}
  log('Standortantwort erfolgreich gesetzt (agentLocationRequest.responses/' + currentTeamId + ')');
  } finally {
    // clear in-flight flag so subsequent requests (other ids) can proceed
    try { agentReqInFlight.delete(req.id); } catch (e) {}
    // remove prompted marker
    try { localStorage.removeItem(LS_LAST_PROMPTED_REQ); } catch (e) {}
  }
}

// Try to deliver a pending agent response object (from localStorage) to RTDB using the same
// transaction logic as normal sending. Returns true if committed.
async function sendPendingAgentResponse(pending) {
  if (!pending || !pending.reqId || !pending.teamId) return false;
  const reqRef = ref(rtdb, 'agentLocationRequest');
  try {
    const txRes = await runTransaction(reqRef, (current) => {
      if (!current) return;
      if (current.id !== pending.reqId) return;
      const responses = current.responses || {};
      if (responses[pending.teamId]) return current; // already answered
      responses[pending.teamId] = {
        teamId: pending.teamId,
        teamName: pending.teamName || ((teamsSnapshotCache?.[pending.teamId]?.name) || 'Team'),
        lat: pending.lat,
        lon: pending.lon,
        accuracy: typeof pending.accuracy === 'number' ? pending.accuracy : null,
        deviceId,
        timestamp: serverTimestamp(),
      };
      current.responses = responses;
      return current;
    }, { applyLocally: false });

    const committed = !!txRes?.committed;
    if (committed) {
      try { localStorage.removeItem('pendingAgentResponse'); localStorage.setItem(LS_LAST_RESPONDED_REQ, pending.reqId); } catch (e) {}
      showToast('Standort wurde im Hintergrund gesendet.', { type: 'success' });
      log('sendPendingAgentResponse: committed for ' + pending.reqId);
      return true;
    }
    log('sendPendingAgentResponse: transaction not committed');
    return false;
  } catch (e) {
    log('sendPendingAgentResponse error', e);
    return false;
  }
}

// Called when we see an active agentLocationRequest — if we have a persisted pending response
// for the same reqId, attempt to deliver it and if it fails, prompt the user again.
async function checkAndDeliverPendingResponse(data) {
  try {
    const raw = localStorage.getItem('pendingAgentResponse');
    if (!raw) return;
    const pending = JSON.parse(raw);
    if (!pending || !pending.reqId) return;
    if (!data || !data.id || data.id !== pending.reqId) return;
    if (!currentTeamId || pending.teamId !== currentTeamId) return;

    // Quick check: if a response is already present on server, remove pending and mark
    const teamRespRef = ref(rtdb, `agentLocationRequest/responses/${currentTeamId}`);
    const existing = await get(teamRespRef);
    if (existing.exists()) {
      try { localStorage.removeItem('pendingAgentResponse'); localStorage.setItem(LS_LAST_RESPONDED_REQ, pending.reqId); } catch (e) {}
      return;
    }

    // Try to send immediately
    const sent = await sendPendingAgentResponse(pending);
    if (sent) return;

    // If not sent, re-prompt the user to confirm when they are back in the app
    showToast('Dein Standort konnte nicht automatisch gesendet werden. Bitte bestätige erneut.', { type: 'warn' });
    try { await shareTeamLocationForRequest(data); } catch (e) { log('checkAndDeliverPendingResponse share prompt failed', e); }
  } catch (e) {
    log('checkAndDeliverPendingResponse error', e);
  }
}

function resetAgentLocations(){
  remove(ref(rtdb,"agentLocationRequest"))
  hideAgentReqUi();
  clearAgentReqMarkers();
}

function clearAgentReqMarkers() {
  if (Array.isArray(agentReqMarkers) && agentReqMarkers.length && window.map) {
    agentReqMarkers.forEach(m => map.removeLayer(m));
  }
  agentReqMarkers = [];
}

function attachAgentReqListener() {
  const reqRef = ref(rtdb, 'agentLocationRequest');

  const cb = (snap) => {
    const data = snap.exists() ? snap.val() : null;
    activeAgentReq = data;

    renderAgentRequestOverlay(data);

    // Wenn eine Anfrage aktiv ist und dieses Gerät NICHT der Ersteller ist → prüfe ob wir eine hängige (lokale) Antwort haben und sende oder prompten
    if (data && data.createdBy !== deviceId && currentTeamId) {
      // If our team already has a response, do not prompt or auto-share
      try {
        if (data.responses && data.responses[currentTeamId]) {
          // Team already answered — nothing to do
          return;
        }
      } catch (e) {}

      // Versuche zunächst, eine zuvor persistierte Antwort zu liefern
      try { checkAndDeliverPendingResponse(data).catch(e => log('checkAndDeliverPendingResponse error', e)); } catch (e) {}
      // Normales Verhalten: Standort teilen (this may prompt the user if needed)
      autoShareLocation(data);
    }
  };

  onValue(reqRef, cb);
  unsubscribeAgentReq = () => off(reqRef, 'value', cb);

  // Try immediate pending delivery for currently active request (on startup)
  (async () => {
    try {
      const s = await get(reqRef);
      if (s && s.exists()) {
        await checkAndDeliverPendingResponse(s.val());
      }
    } catch (e) {}
  })();
}


function hideAgentReqUi() {
  const box = document.getElementById('agentReqStatus');
  if (box) box.style.display = 'none';
}


async function autoShareLocation(req) {
  try {
    await shareTeamLocationForRequest(req);
  } catch (err) {
    log('Standortfreigabe fehlgeschlagen', err);
  }
}




function renderAgentRequestOverlay(data = activeAgentReq) {
  const statusBox = document.getElementById('agentReqStatus');
  const progressText = document.getElementById('agentReqProgress');
  if (!statusBox || !progressText) return;

  if (!data) {
    // Es gibt aktuell keine Anfrage -> Box ausblenden (Toggle evtl. außerhalb platzieren, siehe Fix 3)
    statusBox.style.display = 'none';
    clearAgentReqMarkers();
    return;
  }

  const createdAt =
    typeof data.createdAt === 'number'
      ? new Date(data.createdAt).toLocaleTimeString()
      : 'Unbekannt';

  const responses = data.responses || {};
  const entries = Object.values(responses);

  const expectedMap = data.teamsAtRequest || {};
  const total = Object.keys(expectedMap).length || entries.length;
  const received = entries.length;

  progressText.textContent = `Standort von ${received}/${total} Teams – ${createdAt}`;
  statusBox.style.display = 'block';

  // Marker erneuern
  clearAgentReqMarkers();

  // Nur Marker rendern, wenn Anzeige gewünscht und Daten vorhanden
  if (!showAgentLocations || entries.length === 0) return;

  ensureMapCentered(entries);

  for (const resp of entries) {
    if (resp.lat == null || resp.lon == null) continue;

    const icon = L.divIcon({
      className: `square-marker ${classForTeam(resp.teamId)}`,
      iconSize: [14, 14]
    });

    const marker = L.marker([resp.lat, resp.lon], { icon, pane: 'agentenPane' }).addTo(map);

    // Popup: Teamname und optional Genauigkeit in Klammern
    const accText = (typeof resp.accuracy === 'number') ? ` (±${Math.round(resp.accuracy)} m)` : '';
    marker.bindPopup(`<strong>${escapeHtml(resp.teamName || 'Team')}${accText}</strong>`);

    agentReqMarkers.push(marker);

    // Wenn Genauigkeit vorhanden, zeige einen dezenten Kreis auf der Karte
    if (typeof resp.accuracy === 'number') {
      try {
        const circ = L.circle([resp.lat, resp.lon], { radius: resp.accuracy, color: '#888', weight: 1, fillColor: '#888', fillOpacity: 0.08, pane: 'agentenPane', interactive: false }).addTo(map);
        agentReqMarkers.push(circ);
      } catch (e) {
        // ignore errors from circle creation
        log('Konnte Genauigkeitskreis von Agentenstandort nicht erzeugen', e);
      }
    }
  }
}




function ensureMapCentered(entries) {
  if (!window.map) {
    const first = entries.find(e => e.lat != null && e.lon != null);
    if (first) {
      createOrReuseMap(first.lat, first.lon);
    }
  }
}



function classForTeam(teamId) {
  const colorClasses = ['', 'orange', 'green', 'purple', 'blue', 'red', 'yellow', 'cyan', 'pink', 'lime', 'teal', 'brown'];
  const idx = Math.abs(hashCode(String(teamId))) % colorClasses.length;
  return colorClasses[idx];
}




function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}






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
    showToast("Alle Mister X Rollen wurden zurückgesetzt.", { type: "info" });
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
        showToast("Es sind bereits die maximal erlaubten Mister X Spieler aktiv.", { type: "error" });
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

  if (view === "start") return goBack();


  document.getElementById("startView").style.display = "none";
  document.getElementById("startView2").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");

  if (view === "misterx") {
    document.getElementById("misterxView").style.display = "block";
    // Update visibility of U-Bahn-Button according to setting
    get(ref(rtdb, UBAHN_SETTING_PATH)).then(snap => {
      const enabled = snap.exists() ? !!snap.val() : false;
      updateUbahnButtonVisibility(enabled);
    }).catch(() => {});
  } else if (view === "agent") {
    document.getElementById("agentView").style.display = "block";
    // make sure button is hidden when leaving misterx view
    updateUbahnButtonVisibility(false);
  } else if (view === "settings") {
    document.getElementById("settingsView").style.display = "block";
    load_max_mister_x();
    updateUbahnButtonVisibility(false);
  }

  localStorage.setItem("activeView", view);
    //firebase.database().ref("roles/" + deviceId).set({
    update(ref(rtdb, "roles/" + deviceId), {
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
      const { startTime, duration, durationInput, durationInput2 } = data;
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
  //firebase.database().ref("roles/" + deviceId).set({
  update(ref(rtdb, "roles/" + deviceId), {
    role: "start",
    timestamp: Date.now(),
  });
  const role = "start"
  await supabaseClient
  .from("fcm_tokens")
  .update({ role })
  .eq("device_name", deviceId);
};


async function startTimer(duration_for_function) {
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
  if (typeof duration_for_function === "number" && duration_for_function > 0) {
    duration = duration_for_function;
  }

  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  const message = {
    title: "Deine Zeit läuft gleich ab",
    body: "Bitte öffne deine App!",
    roles: ["misterx"]
  };

  await set(ref(rtdb, "timer"), {
    startTime,
    duration,
    durationInput: data?.durationInput,
    durationInput2: data?.durationInput2 || 0,

  });


  
  // 1) Sicherstellen: Es läuft kein anderer Online-Timer
  try {
    await supabaseClient.rpc('cancel_and_unschedule');
  } catch (e) {
    log('[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):', e);
  }

  // 2) Empfänger für "misterx" jetzt bestimmen
  const { tokens: misterxTokens, deviceNames: misterxDevices } =
    await resolveRecipientsForRoles('misterx');
  const dueInSec = duration-60; // z. B. 25*60


  // messageId stabil halten, wenn du willst:
  const messageId = createMessageId?.() ?? undefined;

  await supabaseClient.functions.invoke('arm-timer-cron', {
    body: {
      title: message.title,
      body:  message.body,
      dueInSec,
      messageId,
      link: "/Mister-X/",
      roles: ["misterx"],
      resolveRecipientsAtSendTime: true,
      rtdbBase: RTDB_BASE,     // falls dein Fallback das braucht
    }
  });

  log(`🕒 Timer gestartet: ${duration}s, fällt um ${new Date(endTime).toLocaleTimeString()}.`);


}

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
      durationInput = null,
      durationInput2 = null,
    } = data;


    if (startTime === null || duration === null) {
      clearInterval(countdown);
      updateStartButtonState(false);

      const misterxTimer = document.getElementById("timer");
      const agentTimer = document.getElementById("agentTimer");
      const settingsTimer = document.getElementById("settingsTimer");


      // Timer-Anzeigen zurücksetzen
      if (misterxTimer) {
        misterxTimer.innerText = "⏳ Zeit bis zum nächsten Posten: --:--";
        misterxTimer.style.color = "";
        misterxTimer.style.animation = "";
      }
      if (agentTimer) {
        agentTimer.innerText = "⏳ Mister X Timer: --:--";
        agentTimer.style.color = "";
        agentTimer.style.animation = "";
      }
      if (settingsTimer) {
        settingsTimer.innerText = "⏳ Aktueller Timer: --:--";
        settingsTimer.style.color = "";
        settingsTimer.style.animation = "";
      }

      return;
    }

    updateCountdown(startTime, duration);
    updateStartButtonState(true);
  });
};

// Countdown anzeigen
function updateCountdown(startTime, duration) {
  clearInterval(countdown);
  let ticking = false;
  countdown = setInterval(async() => {
    if (ticking) return;
    ticking = true;
    try {
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

      function setTimerStyle(timerElem) {
        if (!timerElem) return;
        if (remaining <= 300) {
          timerElem.style.color = "red";
          timerElem.style.animation = "blinker 1s linear infinite";
        } else {
          timerElem.style.color = "";
          timerElem.style.animation = "";
        }
      }

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
        [misterxTimer, agentTimer, settingsTimer].forEach(elem => {
          if (elem) {
            elem.style.color = "";
            elem.style.animation = "";
          }
        });

        if (localStorage.getItem("activeView") === "misterx") {
          try {
            const snap = await get(ref(rtdb, "timer"));
            const data = snap.val() || {};
            const { startTime, duration, durationInput, durationInput2 } = data || {};

            if (typeof startTime !== "number" || typeof duration !== "number") {
              return;
            }

            const expKey = makeExpirationKey(startTime, duration);

            // 2) Alert nur 1× pro Gerät zeigen (wenn schon erledigt oder Dialog offen, überspringen)
            if (wasAlertHandledForDevice(expKey) || locationDialogOpen) {
              return;
            }

            // 3) Nachricht je nach Pfad bestimmen
            const isLocationPhase = (duration === durationInput && (durationInput2 ?? 0) > 0);

            if (isLocationPhase) {
              // Standortphase: Dialog mit Beschreibung/OK
              const message = "Zeit abgelaufen, dein Standort wird einmalig geteilt.";
              locationDialogOpen = true;
              const dialogResult = await showLocationDialog(message, { startTime, duration });
              locationDialogOpen = false;

              // Wenn das Dialogfenster automatisch geschlossen wurde (z. B. weil der Timer wieder verlängert oder zurückgesetzt wurde),
              // abbrechen und nichts weiter tun.
              if (dialogResult === null) {
                showToast('Dialog geschlossen: Timer wurde verlängert oder zurückgesetzt', { type: 'info' });
                log('showLocationDialog: automatisch geschlossen, Timer wurde verlängert, ersetzt oder zurückgesetzt.');
                return;
              }

              if (dialogResult === "desc") {
                // Beschreibung abfragen (wenn Abbrechen -> nichts weiter tun, kein Claim)
                const description = await promptForDescription();
                if (!description) {
                  // Nutzer hat abgebrochen – weder geschrieben noch geclaimed. Beim nächsten Lauf wird erneut gefragt.
                } else {
                  // Claim erst kurz vor dem tatsächlichen Schreiben
                  const won = await doOncePerExpiration(rtdb, async (freshData) => {
                    const di1 = freshData?.durationInput;
                    const di2 = freshData?.durationInput2;
                    const locationPhase = (duration === di1 && (di2 ?? 0) > 0);

                    if (!locationPhase) return;

                    // Standort versuchen zu holen
                    try {
                      const position = await getCurrentPositionPromise();
                      const { latitude: lat, longitude: lon, accuracy } = position.coords;
                      const timestamp = Date.now();

                      // Bevor wir schreiben: prüfen, ob der Timer noch expired ist
                    try {
                      if (await secondLookAbort()) {
                        log('showLocationDialog: timer no longer expired - abort write');
                        notifyAlreadyHandled();
                        return;
                      }
                    } catch (e) {
                      log('showLocationDialog: secondLookAbort failed - proceeding with write attempt', e);
                    }

                    const payload = (accuracy <= 100) ? {
                        title: "Automatischer Standort",
                        lat,
                        lon,
                        accuracy,
                        description,
                        timestamp,
                      } : {
                        description,
                        timestamp,
                      };

                      const wrote = await safePushLocationForExpiration(freshData, payload);
                      if (!wrote) {
                        // jemand war schneller oder Claim verloren
                        log('showLocationDialog: write skipped because existing entry detected or claim lost');
                        notifyAlreadyHandled();
                      }
                    } catch (err) {
                      const payload = { description, timestamp: Date.now() };
                      const wrote = await safePushLocationForExpiration(freshData, payload);
                      if (!wrote) {
                        log('showLocationDialog: write skipped (exception path)');
                        notifyAlreadyHandled();
                      }
                    }

                    postWriteSideEffects(di2);
                  });

                  // Markieren, dass die Alert/Expiration verarbeitet wurde (egal ob gewonnen oder verloren)
                  markAlertHandledForDevice(expKey);
                  if (!won) notifyAlreadyHandled();
                }
              } else {
                // OK gedrückt: getLocation übernimmt Claim kurz vor dem tatsächlichen Schreiben
                const handled = await getLocation();
                // handled==true => eigener Write; handled==false => entweder Abbruch oder ein anderes Gerät hat geschrieben
                markAlertHandledForDevice(expKey);
                if (!handled) notifyAlreadyHandled();
              }
            } else {
              // Live-Standortphase: Nur Alert anzeigen, keine Beschreibung
              alert("Zeit abgelaufen, jetzt musst du deinen Live-Standort in der WhatsApp-Gruppe teilen.");
              // TimerClaim erst nach OK
              const won = await doOncePerExpiration(rtdb, async () => {
                // Hier ggf. weitere Aktionen, z.B. Timer aufräumen
                await Promise.all([
                  remove(ref(rtdb, "timer/duration")),
                  remove(ref(rtdb, "timer/startTime")),
                  remove(ref(rtdb, "timerMessage")),
                ]);
                clearInterval(countdown);
                updateStartButtonState(false);
                if (misterxTimer) misterxTimer.innerText = "⏳ Zeit bis zum nächsten Posten: --:--";
                if (agentTimer) agentTimer.innerText = "⏳ Mister X Timer: --:--";
                if (settingsTimer) settingsTimer.innerText = "⏳ Aktueller Timer: --:--";
                sendNotificationToRoles(
                  "Zeit abgelaufen!",
                  "Mister X muss sich per Live-Standort zeigen",
                  "all"
                );
              });

              if (!won) {
                notifyAlreadyHandled();
              }
            }
          } catch (err) {
            log("Fehler im Ablauf-Handling:", err);
          }
        }
      }
    } finally {
      ticking = false;
    }
  }, 1000);
}

// Non-blocking confirm-location dialog: gathers location in background and requires user confirmation
async function showConfirmLocationDialog(messageText, reqId, { maxWaitMs = 10000, desiredAccuracy = 30, autoConfirmMs = 30000 } = {}) {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.6)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "99999";

    const box = document.createElement("div");
    box.style.background = "#fff";
    box.style.padding = "1.2em";
    box.style.borderRadius = "8px";
    box.style.width = "min(520px, 92vw)";
    box.style.maxWidth = "520px";
    box.style.textAlign = "center";

    box.style.position = 'relative';

    const title = document.createElement('div');
    title.style.fontWeight = '600';
    title.style.marginBottom = '0.4em';
    title.textContent = messageText;

    const teamNameEl = document.createElement('div');
    teamNameEl.style.fontSize = '14px';
    teamNameEl.style.color = '#333';
    teamNameEl.style.marginBottom = '0.6em';
    const teamName = (teamsSnapshotCache?.[currentTeamId]?.name) || '';
    teamNameEl.textContent = teamName ? ('Team: ' + teamName) : 'Team: -';

    const accuracyEl = document.createElement('div');
    // small corner accuracy
    accuracyEl.style.position = 'absolute';
    accuracyEl.style.top = '8px';
    accuracyEl.style.right = '10px';
    accuracyEl.style.fontSize = '11px';
    accuracyEl.style.color = '#666';
    accuracyEl.textContent = '± – m';



    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.justifyContent = 'center';

    // No cancel button per requirement — only confirm
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Standort teilen';
    confirmBtn.className = 'small-button';
    confirmBtn.disabled = true;

    btnRow.appendChild(confirmBtn);

    box.appendChild(title);
    box.appendChild(teamNameEl);
    box.appendChild(btnRow);
    box.appendChild(accuracyEl);

    // Make confirm button larger for better UX
    confirmBtn.style.padding = '12px 22px';
    confirmBtn.style.fontSize = '16px';
    confirmBtn.style.minWidth = '200px';
    confirmBtn.style.borderRadius = '8px';
    modal.appendChild(box);
    document.body.appendChild(modal);

    let bestPos = null;
    let watchId = null;
    const timerRef = ref(rtdb, 'agentLocationRequest');
    let autoConfirmTimeout = null;

    const onPageHide = async () => {
      try {
        if (!bestPos) return;
        const pos = bestPos;
        const acc = typeof pos.coords.accuracy === 'number' ? Math.round(pos.coords.accuracy) : null;
        const pending = {
          reqId,
          teamId: currentTeamId || null,
          teamName: (teamsSnapshotCache?.[currentTeamId]?.name) || null,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: acc,
          timestamp: Date.now()
        };
        // Persist so it can be retried later
        localStorage.setItem('pendingAgentResponse', JSON.stringify(pending));
        // Try immediate send
        await sendPendingAgentResponse(pending);
      } catch (e) {
        log('onPageHide: error trying to send pending response', e);
      }
    }; 

    const onVisibilityChange = () => {
      if (document.hidden) onPageHide();
    };

    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', onPageHide);

    const cleanup = () => {
      try { if (watchId != null) navigator.geolocation.clearWatch(watchId); } catch (e) {}
      try { off(timerRef, 'value', onTimerChange); } catch (e) {}
      try { if (modal && document.body.contains(modal)) document.body.removeChild(modal); } catch (e) {}
      try { if (autoConfirmTimeout) clearTimeout(autoConfirmTimeout); } catch (e) {}
      // keep pendingAgentResponse in storage so it can be attempted on pagehide or when app reopens
      try { window.removeEventListener('pagehide', onPageHide); } catch (e) {}
      try { window.removeEventListener('visibilitychange', onVisibilityChange); } catch (e) {}
      try { window.removeEventListener('beforeunload', onPageHide); } catch (e) {}
    }; 

    const setBest = (pos) => {
      if (!pos) return;
      if (!bestPos) { bestPos = pos; return; }
      const a = typeof pos.coords.accuracy === 'number' ? pos.coords.accuracy : Infinity;
      const b = typeof bestPos.coords.accuracy === 'number' ? bestPos.coords.accuracy : Infinity;
      if (a < b) bestPos = pos;
    };

    const updateUIWithPos = (pos) => {
      if (!pos) return;
      const acc = typeof pos.coords.accuracy === 'number' ? Math.round(pos.coords.accuracy) : null;
      accuracyEl.textContent = acc != null ? `Genauigkeit: ±${acc} m` : 'Genauigkeit: -';
      confirmBtn.disabled = false;
    }; 

    const onSuccess = (pos) => {
      setBest(pos);
      updateUIWithPos(pos);
      // Keep watching to allow accuracy to improve until timeout or user confirms
      // (do not clear the watch here)
    };

    const onError = (err) => {
      if (err && err.code === err.PERMISSION_DENIED) {
        showToast('Standortzugriff verweigert. Freigabe nicht möglich.', { type: 'error' });
        cleanup();
        resolve('cancel');
      } else {
        showToast('Fehler beim Ermitteln des Standorts.', { type: 'warn' });
      }
    };

    if (!('geolocation' in navigator)) {
      showToast('Geolocation wird nicht unterstützt.', { type: 'error' });
      cleanup();
      resolve('cancel');
      return;
    }

    try {
      watchId = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
    } catch (e) {
      showToast('Fehler beim Starten der Standortabfrage.', { type: 'error' });
      cleanup();
      resolve('cancel');
      return;
    }

    // Auto-confirm after a fixed time if user doesn't act (uses best measurement available)
    autoConfirmTimeout = setTimeout(() => {
      try { finishAndResolveConfirm(); } catch (e) { log('autoConfirm error', e); }
    }, autoConfirmMs);

    // Listen for request removal, replacement or a response for our team — close dialog if that happens
    const onTimerChange = (snap) => {
      const d = snap.exists() ? snap.val() : null;
      try {
        if (!d || (d.id && d.id !== reqId)) {
          cleanup();
          resolve(null);
          return;
        }
        // If another device already posted a response for our team, close dialog
        if (d.responses && currentTeamId && d.responses[currentTeamId]) {
          cleanup();
          showToast('Standort wurde bereits von einem Gerät deines Teams geteilt.', { type: 'info' });
          resolve(null);
          return;
        }
      } catch (e) {}
    };
    onValue(timerRef, onTimerChange);

    const finishAndResolveConfirm = () => {
      try { if (autoConfirmTimeout) { clearTimeout(autoConfirmTimeout); autoConfirmTimeout = null; } } catch (e) {}
      cleanup();
      if (bestPos) return resolve({ action: 'confirm', position: bestPos });
      navigator.geolocation.getCurrentPosition((p) => resolve({ action: 'confirm', position: p }), (err) => { showToast('Kein Standort verfügbar.', { type: 'warn' }); resolve('cancel'); }, { enableHighAccuracy: true, timeout: 8000 });
    };

    // No cancel button available per design (user must confirm). Confirm will finish with best or current position.
    confirmBtn.onclick = () => {
      finishAndResolveConfirm();
    };

    // Safety: if request already changed, abort at start
    (async () => {
      try {
        const snap = await get(timerRef);
        const d = snap.exists() ? snap.val() : null;
        if (!d || (d.id && d.id !== reqId)) {
          cleanup();
          resolve(null);
          return;
        }
        // set team name if passed in options
        if (typeof teamName !== 'undefined' && teamNameEl) teamNameEl.textContent = 'Team: ' + teamName;
      } catch (e) {}
    })();
  });
}

// Dialog mit Message-Text
async function showLocationDialog(messageText, expectedTimer = null) {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.7)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    const box = document.createElement("div");
    box.style.background = "#fff";
    box.style.padding = "2em";
    box.style.borderRadius = "10px";
    box.style.maxWidth = "90vw";
    box.style.textAlign = "center";
    box.innerHTML = `
      <div style="margin-bottom:1em;">
        <strong>${messageText}</strong><br>
        Du kannst optional eine Beschreibung hinzufügen (z.B. falls GPS ungenau ist oder du dich in der U-Bahn befindest).
      </div>
      <button id="loc-ok-btn" style="margin:0 1em 0 0;">OK</button>
      <button id="loc-desc-btn">Standort-Beschreibung hinzufügen</button>
    `;
    modal.appendChild(box);
    document.body.appendChild(modal);

    // Listener: wenn der Timer wieder aktiv/verlängert wird, oder wenn der Timer verändert/gelöscht wurde -> Dialog schließen
    const timerRef = ref(rtdb, 'timer');
    const onTimerChange = (snap) => {
      const d = snap.exists() ? snap.val() : null;
      try {
        // 1) Timer wurde entfernt/gelöscht -> Dialog schließen
        if (d === null) {
          if (document.body.contains(modal)) {
            try { document.body.removeChild(modal); } catch (e) {}
          }
          try { off(timerRef, 'value', onTimerChange); } catch (e) {}
          resolve(null);
          return;
        }

        // 2) Timer wurde geändert: wenn startTime/duration nicht mehr zu unserer erwarteten Expiration passen -> schließen
        if (expectedTimer && (d.startTime !== expectedTimer.startTime || d.duration !== expectedTimer.duration)) {
          if (document.body.contains(modal)) {
            try { document.body.removeChild(modal); } catch (e) {}
          }
          try { off(timerRef, 'value', onTimerChange); } catch (e) {}
          resolve(null);
          return;
        }

        // 3) Timer wurde wieder aktiviert/verlängert (läuft jetzt) -> Dialog schließen
        if (isTimerRunning(d)) {
          if (document.body.contains(modal)) {
            try { document.body.removeChild(modal); } catch (e) {}
          }
          try { off(timerRef, 'value', onTimerChange); } catch (e) {}
          resolve(null); // signalisiert automatisches Schließen
        }
      } catch (e) {
        // ignore
      }
    };

    onValue(timerRef, onTimerChange);

    const cleanupAndResolve = (val) => {
      try { off(timerRef, 'value', onTimerChange); } catch (e) {}
      if (document.body.contains(modal)) {
        try { document.body.removeChild(modal); } catch (e) {}
      }
      resolve(val);
    };

    document.getElementById("loc-ok-btn").onclick = () => cleanupAndResolve("ok");
    document.getElementById("loc-desc-btn").onclick = () => cleanupAndResolve("desc");

    // Safety: falls Timer bereits wieder aktiv/anders ist, abbrechen
    (async () => {
      try {
        const snap = await get(timerRef);
        const d = snap.exists() ? snap.val() : null;
        if (d === null) {
          cleanupAndResolve(null);
          return;
        }
        if (expectedTimer && (d.startTime !== expectedTimer.startTime || d.duration !== expectedTimer.duration)) {
          cleanupAndResolve(null);
          return;
        }
        if (isTimerRunning(d)) {
          cleanupAndResolve(null);
        }
      } catch (e) {}
    })();
  });
}


function makeExpirationKey(startTime, duration) {
  return `${startTime}_${duration}`;
}

function wasAlertHandledForDevice(expKey) {
  const key = `alertHandled_${expKey}`;
  return sessionStorage.getItem(key) === "1";
}
function markAlertHandledForDevice(expKey) {
  const key = `alertHandled_${expKey}`;
  sessionStorage.setItem(key, "1");
}

// ----- Helpers: race-safe location writes for timer expirations -----
// Prüft, ob bereits ein Standort für die gegebene Expiration existiert
async function existingLocationForTimer(startTime, duration, windowMs = 60000) {
  try {
    const expTs = startTime + duration * 1000;
    const q = query(ref(rtdb, 'locations'), orderByChild('timestamp'), startAt(Math.max(0, startTime - 5000)), endAt(expTs + windowMs));
    const snap = await get(q);
    if (!snap.exists()) return false;
    const vals = snap.val();
    return Object.keys(vals || {}).length > 0;
  } catch (e) {
    log('existingLocationForTimer failed', e);
    // Auf Nummer sicher: wenn die Prüfung fehlschlägt, antworte mit false, damit die Aktion nicht fälschlich unterdrückt wird
    return false;
  }
}

// Versucht atomar zu claimen und schiebt einen Location-Eintrag nur, wenn noch keiner existiert.
async function safePushLocationForExpiration(timerData, locationPayload) {
  const { startTime, duration } = timerData || {};
  if (typeof startTime !== 'number' || typeof duration !== 'number') {
    log('safePushLocationForExpiration: invalid timerData', timerData);
    return false;
  }
  const expKey = makeExpirationKey(startTime, duration);

  // 1) Schnelle Prüfung: existierende Locations in Zeitfenster
  const exists = await existingLocationForTimer(startTime, duration);
  if (exists) {
    log('safePushLocationForExpiration: detected existing location for expKey', expKey);
    return false;
  }

  // 2) Atomare Claim-Transaktion auf locationClaims/expKey (defensive, falls caller nicht bereits geclaimt hat)
  const claimRef = ref(rtdb, `locationClaims/${expKey}`);
  const me = getDeviceId();
  try {
    const txRes = await runTransaction(claimRef, (current) => {
      if (current && current.claimed) return current;
      return { claimed: true, by: me, at: serverTimestamp() };
    }, { applyLocally: false });

    const committed = txRes?.committed;
    const val = txRes?.snapshot?.val();
    const iAmWinner = committed && val && val.by === me;
    if (!iAmWinner) {
      log('safePushLocationForExpiration: lost claim for expKey', expKey);
      return false;
    }

    // 3) Nochmals prüfen (redundant, aber schützt bei sehr engen Rennen)
    const exists2 = await existingLocationForTimer(startTime, duration);
    if (exists2) {
      log('safePushLocationForExpiration: someone wrote meanwhile for expKey', expKey);
      return false;
    }

    // 4) Push mit Metadaten
    const ts = locationPayload.timestamp || Date.now();
    const payload = { ...locationPayload, expKey, claimedBy: me, timestamp: ts };
    await push(ref(rtdb, 'locations'), payload);

    // 5) Optional: setze eine Marker im timer-Node, damit andere Clients das eindeutig sehen können
    try {
      await update(ref(rtdb, `timer`), { lastLocationFor: expKey });
    } catch (e) { /* don't fail overall */ }

    return true;
  } catch (e) {
    log('safePushLocationForExpiration failed', e);
    return false;
  }
}


async function gcOldTimerClaims(rtdb, maxAgeMs = 48 * 60 * 60 * 1000) {
  let serverNow = Date.now();
  try {
    const offsetSnap = await get(ref(rtdb, ".info/serverTimeOffset"));
    const offset = typeof offsetSnap.val() === "number" ? offsetSnap.val() : 0;
    serverNow += offset;
  } catch {}

  const threshold = serverNow - maxAgeMs;

  const q = query(ref(rtdb, "timerClaims"), orderByChild("at"), endAt(threshold));
  const oldSnap = await get(q);

  const updates = {};
  if (oldSnap.exists()) {
    oldSnap.forEach(child => {
      const v = child.val();
      // Zusätzlicher Type-Guard (hilft bei Alt-Daten):
      if (typeof v?.at === 'number' && v.at <= threshold) {
        updates[`timerClaims/${child.key}`] = null;
      }
    });
  }

  const toDelete = Object.keys(updates).length;
  if (toDelete) {
    await update(ref(rtdb), updates);
  }
}


async function doOncePerExpiration(rtdb, actionIfWinner) {
  // Best-effort GC vor dem Claim (kein Listener, nur einmal pro Aufruf)

  const snap = await get(ref(rtdb, "timer"));
  const data = snap.val() || {};
  const { startTime, duration } = data;

  if (typeof startTime !== "number" || typeof duration !== "number") {
    // Timer evtl. schon entfernt → nichts mehr zu tun
    return false;
  }

  const expKey = makeExpirationKey(startTime, duration);
  const claimRef = ref(rtdb, `timerClaims/${expKey}`);
  const me = getDeviceId();

  const txRes = await runTransaction(
    claimRef,
    (current) => {
      if (current && current.claimed) {
        return current; // schon vergeben
      }
      return { claimed: true, by: me, at: serverTimestamp() };
    },
    { applyLocally: false }
  );

  const committed = txRes.committed;
  const val = txRes.snapshot?.val();
  const iAmWinner = committed && val && val.by === me;

  if (!iAmWinner) return false;

  // Defensive check: wenn bereits ein Location-Eintrag für diese Expiration existiert, nichts tun
  try {
    const already = await existingLocationForTimer(startTime, duration);
    if (already) {
      log('doOncePerExpiration: existing location detected for', expKey);
      return false;
    }
  } catch (e) {
    log('doOncePerExpiration: existing-location check failed, proceeding with action', e);
  }

  // Zusätzlich: Prüfen, ob der Timer zwischenzeitlich wieder aktiv/verlängert wurde
  try {
    if (await secondLookAbort()) {
      log('doOncePerExpiration: timer no longer expired - aborting action for', expKey);
      return false;
    }
  } catch (e) {
    log('doOncePerExpiration: secondLookAbort failed - proceeding with action', e);
  }

  await actionIfWinner(data);
    try {
    await gcOldTimerClaims(rtdb, 5 * 60 * 1000);
  } catch (e) {
    // Aufräumen soll nie den Hauptflow blockieren
    log("GC timerClaims fehlgeschlagen:", e);
  }
  return true;
}

/** Optional: kleine Helfer-UI für Verlierer */
function notifyAlreadyHandled() {
  // Sichtbare Rückmeldung für Nutzer: Dialog/Status informieren
  log("Bereits von anderem Gerät erledigt.");
  try {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "ℹ️ Der Standort wurde bereits von einem anderen Gerät geteilt.";
  } catch (e) {}
  // Kurz und deutlich: nicht-blockierender Hinweis
  try { showToast('ℹ️ Jemand anderes hat bereits den Standort geteilt. Dein Eintrag wurde nicht hinzugefügt.', { type: 'info' }); } catch (e) {}
}


function setTimerInputFromFirebase(){
  //firebase.database().ref("timer").once("value").then(snapshot => {
  get(ref(rtdb, "timer")).then(snapshot => {
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    const timerInputElem = document.getElementById("timerDurationInput");
    const timerInputElem2 = document.getElementById("timerDurationInput2");
    if (!timerInputElem||!timerInputElem2) return;

    if (data && typeof data.durationInput === "number"){
      timerInputElem.value = Math.floor(data.durationInput/60);
    } else {
      timerInputElem.value = 25;
    }
    if (data && typeof data.durationInput2 === "number"){
      timerInputElem2.value = Math.floor(data.durationInput2/60);
    } else {
      timerInputElem2.value = 5;
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


// --- Helper: Timer lesen + prüfen ---
async function readTimer() {
  const snap = await get(ref(rtdb, "timer"));
  return snap.val() || {};
}

function isTimerRunning(data) {
  const { startTime, duration } = data || {};
  return (
    typeof startTime === "number" &&
    typeof duration === "number" &&
    startTime + duration * 1000 > Date.now()
  );
}

// --- Helper: Second-look direkt vor dem Schreiben ---
async function secondLookAbort() {
  try {
    const d2 = await readTimer();
    if (isTimerRunning(d2)) {
      log("Timer wurde in der Zwischenzeit verlängert - Abbruch vor dem Schreiben.");
      return true;
    }
  } catch (err) {
    log("Zweiter Timer-Check fehlgeschlagen:", err);
    return true; // lieber abbrechen, keine falschen Einträge
  }
  return false;
}

// --- Helper: Folgeaktionen nach dem Schreiben ---
function postWriteSideEffects(durationInput2) {
  sendNotificationToRoles(
    "Mister X hat sich gezeigt!",
    "Automatische Standort-Übermittlung",
    ["agent", "settings", "start"]
  );

  showLocationHistory();

  if (durationInput2 != null) {
    startTimer(durationInput2);
  } else {
    log("durationInput2 war nicht vorhanden - Timer wird nicht neu gestartet.");
  }
}

// --- Helper: Manuellen Standort abfragen + speichern ---
async function askManualAndWrite(durationInput2) {
  const text =
    prompt(
      "Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben):"
    ) || "";
  const description = text.trim();

  if (!description) {
    // Nutzer hat abgebrochen oder leer – nichts schreiben
    return false;
  }

  // Claim erst kurz vor dem Schreiben
  const snap = await get(ref(rtdb, "timer"));
  const data = snap.val() || {};
  const expKey = makeExpirationKey(data.startTime, data.duration);

  const won = await doOncePerExpiration(rtdb, async (freshData) => {
    const di2 = freshData?.durationInput2;
    const locationPhase = (data?.duration === freshData?.durationInput && (di2 ?? 0) > 0);
    if (!locationPhase) return;

    if (await secondLookAbort()) return;

    const wrote = await safePushLocationForExpiration(data, { description, timestamp: Date.now() });
    if (!wrote) log('askManualAndWrite: write skipped because existing entry detected or claim lost');

    postWriteSideEffects(di2);
  });

  // Markieren, dass die Alert/Expiration verarbeitet wurde (egal ob gewonnen oder verloren)
  markAlertHandledForDevice(expKey);
  if (!won) {
    notifyAlreadyHandled();
  }

  return won;
}



// --- Hauptfunktion: Standort ermitteln (mit Auto-Retry bei technischen Fehlern) ---
async function getLocation({
  autoRetry = true,
  maxRetries = 3,
  retryDelayMs = 10000, // 10s
} = {}) {
  // 1) Timer-Check
  let durationInput2;
  let timerData;
  try {
    timerData = await readTimer();
    durationInput2 = timerData.durationInput2;

    if (isTimerRunning(timerData)) {
      log("Timer wurde verlängert – Abbruch.");
      return false;
    }
  } catch (err) {
    log("Timer lesen fehlgeschlagen:", err);
    return false;
  }

  // ExpKey für Markierung
  const expKey = makeExpirationKey(timerData.startTime, timerData.duration);

  // 2) Geolocation prüfen
  if (!("geolocation" in navigator)) {
    document.getElementById("status").innerText =
      "Geolocation wird nicht unterstützt.";
    // Trotzdem manuellen Fallback anbieten:
    const manual = await askManualAndWrite(durationInput2);
    // markiere, dass die Alert/Expiration verarbeitet wurde (unabhängig vom Ergebnis)
    markAlertHandledForDevice(expKey);
    return !!manual;
  }

  // Wenn OK gedrückt wurde: wie bisher, aber Claim erst direkt vor dem Schreiben
  let retriesLeft = Math.max(0, maxRetries);
  let askedManualOnce = false;

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 15000,
  };

  return await new Promise((resolve) => {
    const success = async (position) => {
      if (await secondLookAbort()) return resolve(false);

      const { latitude: lat, longitude: lon, accuracy } = position.coords;
      const timestamp = Date.now();

      if (accuracy > 100) {
        document.getElementById("status").innerText =
          "⚠️ Standort ungenau (±" + Math.round(accuracy) + " m). Bitte Standortbeschreibung manuell eingeben.";
        const manualResult = await askManualAndWrite(durationInput2);
        markAlertHandledForDevice(expKey);
        return resolve(!!manualResult);
      }

      // Claim und Schreiboperation (sicher)
      const won = await doOncePerExpiration(rtdb, async (freshData) => {
        const di1 = freshData?.durationInput;
        const di2 = freshData?.durationInput2;
        const locationPhase = (timerData.duration === di1 && (di2 ?? 0) > 0);
        if (!locationPhase) return;

        const payload = {
          title: "Automatischer Standort",
          lat,
          lon,
          accuracy,
          timestamp,
        };

        const wrote = await safePushLocationForExpiration(freshData, payload);
        if (!wrote) log('getLocation: write skipped because existing entry detected or claim lost');

        postWriteSideEffects(di2);
      });

      // Markieren, dass die Alert/Expiration verarbeitet wurde (egal ob gewonnen oder verloren)
      markAlertHandledForDevice(expKey);
      resolve(!!won);
    };

    const retry = () => {
      if (!autoRetry || retriesLeft <= 0) return;
      retriesLeft--;
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
      }, retryDelayMs);
    };

    const error = async (err) => {
      let message = "❌ Fehler beim Abrufen des Standorts.";
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message += " Zugriff verweigert.";
          break;
        case err.POSITION_UNAVAILABLE:
          message += " Standortinformationen nicht verfügbar.";
          break;
        case err.TIMEOUT:
          message += " Zeitüberschreitung bei der Standortabfrage.";
          break;
      }
      message += " Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.";
      document.getElementById("status").innerText = message;

      if (!askedManualOnce) {
        askedManualOnce = true;
        const manualResult = await askManualAndWrite(durationInput2);
        markAlertHandledForDevice(expKey);
        return resolve(!!manualResult);
      }

      if (err.code === err.TIMEOUT || err.code === err.POSITION_UNAVAILABLE) {
        retry();
      } else {
        resolve(false);
      }
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}


async function promptForDescription() {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.7)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    const box = document.createElement("div");
    box.style.background = "#fff";
    box.style.padding = "2em";
    box.style.borderRadius = "10px";
    box.style.maxWidth = "90vw";
    box.style.textAlign = "center";
    box.innerHTML = `
      <div style="margin-bottom:1em;">
        <strong>Standort-Beschreibung hinzufügen</strong><br>
        Bitte gib eine Beschreibung deines Standorts ein.
      </div>
      <textarea id="desc-input" rows="3" style="width:90%;"></textarea><br>
      <button id="desc-cancel-btn" style="margin-top:1em;">Abbrechen</button>
      <button id="desc-ok-btn" style="margin-top:1em; margin-left:1em;">OK</button>
    `;
    modal.appendChild(box);
    document.body.appendChild(modal);

    document.getElementById("desc-ok-btn").onclick = () => {
      const val = document.getElementById("desc-input").value.trim();
      document.body.removeChild(modal);
      resolve(val || null);
    };
    document.getElementById("desc-cancel-btn").onclick = () => {
      document.body.removeChild(modal);
      resolve(null);
    };
  });
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
  if (!confirm("Möchtest du wirklich alle gespeicherten Standorte und Einträge löschen?")) return;

  try {
    await remove(ref(rtdb, "locations"));
    // remove ubahn events as well
    await remove(ref(rtdb, "events/ubahn"));

    showToast("Alle Standorte und Einträge wurden gelöscht.", { type: "info" });
    historyMarkers = [];

    // Optional: Status zurücksetzen
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "";

    // clear local snapshots and UI
    __latestUbahnSnap = null;
    __latestLocationsSnap = null;
    const feed = document.getElementById('locationFeed');
    if (feed) feed.innerHTML = '';

    await resetPostenStatus(true); // active=true, visited=false
    // Nach Reset neu rendern
    renderPostenMarkersFromCache();
  } catch (err) {
    log(err);
    showToast("Fehler beim Löschen der Standorte und Einträge.", { type: "error" });
  }
}


async function resetTimer() {
  //const timerRef = firebase.database().ref("timer");

  // Timer-Daten löschen
  //await timerRef.child("duration").remove();
  await remove(ref(rtdb, "timer/duration"));
  //await timerRef.child("startTime").remove();
  await remove(ref(rtdb, "timer/startTime"));

  // Nachricht löschen
  //await firebase.database().ref("timerMessage").remove();
  await remove(ref(rtdb, "timerMessage"));

  // UI zurücksetzen
  clearInterval(countdown);
  updateStartButtonState(false);


  //Online-Timer für Notifications abbrechen
    try {
    await supabaseClient.rpc('cancel_and_unschedule');
  } catch (e) {
    log('[Timer] cancel_and_unschedule fehlgeschlagen (ignoriere und fahre fort):', e);
  }

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

function save_timer_duration2() {
  const anzahl = document.getElementById("timerDurationInput2").value;
  const anzahl_in_sekunden = anzahl * 60

  //const settingsRef = firebase.database().ref("timer");

  // Erst löschen
  remove(ref(rtdb, "timer/durationInput2"))
    .then(() => {
      // Dann neuen Wert setzen
      //return settingsRef.child("durationInput").set(Number(anzahl_in_sekunden));
      return set(ref(rtdb, "timer/durationInput2"), Number(anzahl_in_sekunden));
    })
    .then(() => {
      log("Duration_input2:", anzahl_in_sekunden);
    })
    .catch((error) => {
      log("Fehler beim Speichern von DurationInput2:", error);
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
  if (!messageId || !deviceId) return;
  await set(ref(rtdb, `notifications/${messageId}/recipients/${deviceId}`), true);
}


function _handleInAppMessage(data) {
  try {
    const messageId = data && data.messageId;
    if (messageId) {
      if (_seenMessageIds.has(messageId)) return; // Dedupe
      _seenMessageIds.add(messageId);
    }

    // Zustellung in RTDB markieren (Page-Variante)
    if (messageId && typeof markDeliveredFromPage === 'function') {
      markDeliveredFromPage(messageId).catch(err => log('Markieren fehlgeschlagen:', err));
    }

    // Nur im sichtbaren Tab einen UI-Hinweis zeigen
    if (document.visibilityState === 'visible') {
      const title = data && data.title ? data.title : 'Nachricht';
      const body  = data && data.body  ? data.body  : '';

      setTimeout(() => {
        alert(`${title}\n${body}`);
      }, 1000); // 1 Sekunde warten, damit Notification sichtbar war
    }
  } catch (e) {
    log('handleInAppMessage error:', e);
  }
}

// Optional: einfache Garbage-Collection, damit das Set nicht endlos wächst
setInterval(() => {
  // Wenn du messageId als UUID benutzt, reicht z.B. ein einfaches Limit:
  if (_seenMessageIds.size > 5000) _seenMessageIds.clear();
}, 60 * 1000);

// 1. Funktion zum Abrufen und Anzeigen der SW-Logs im Log-Window
async function fetchAndShowSwLogs() {
  if (!('serviceWorker' in navigator)) return;

  const reg = await navigator.serviceWorker.ready;
  if (!reg.active) return;

  const timeoutMs = 5000;

  // 1) PING/PONG prüfen (optional, aber hilfreich fürs Debug)
  await new Promise((resolve) => {
    const mc = new MessageChannel();
    const to = setTimeout(() => {
      mc.port1.onmessage = null;
      log('[SW-Log] PING -> Timeout (wir versuchen GET_SW_LOGS trotzdem)');
      resolve(); // wir versuchen Logs trotzdem
    }, timeoutMs);
    
mc.port1.onmessage = (event) => {
   if (event.data && event.data.type === 'PONG') {
     clearTimeout(to);
     log('[SW-Log] PONG empfangen');
     resolve();
    }
  };
  reg.active.postMessage({ type: 'PING' }, [mc.port2]);

    
  });

  // 2) Logs abrufen – Antwort direkt über MessageChannel
  return new Promise((resolve) => {
    const mc = new MessageChannel();

    const to = setTimeout(() => {
      // Fallback: Listener abbauen und beenden
      resolve();
    }, timeoutMs);

    mc.port1.onmessage = (event) => {
      if (event.data && event.data.type === 'SW_LOGS') {
        clearTimeout(to);
        if (Array.isArray(event.data.logs)) {
          event.data.logs.forEach(entry => {
            if (entry && entry.msg) {
              log('[SW-Log]', new Date(entry.ts).toLocaleTimeString(), entry.msg);
            }
          });
        }
        // SW bitten, Logs zu löschen (Antwort ist nicht zwingend)
        reg.active.postMessage({ type: 'CLEAR_SW_LOGS' });
        resolve();
      }
    };

    reg.active.postMessage({ type: 'GET_SW_LOGS' }, [mc.port2]);
  });
}

// --- Einstellungen: Checkbox für Agenten-Standortanfrage ---
function setupAgentReqSetting() {
  const cb = document.getElementById("agentReqEnabledCheckbox");
  if (!cb) return;

  // Initialwert aus RTDB laden
  get(ref(rtdb, AGENT_REQ_SETTING_PATH)).then(snap => {
    const enabled = snap.exists() ? !!snap.val() : false;
    cb.checked = enabled;
    localStorage.setItem(LS_AGENT_REQ_ENABLED, enabled ? "1" : "0");
    updateAgentReqButtonVisibility(enabled);
  });

  cb.addEventListener("change", async () => {
    const enabled = cb.checked;
    await set(ref(rtdb, AGENT_REQ_SETTING_PATH), enabled);
    localStorage.setItem(LS_AGENT_REQ_ENABLED, enabled ? "1" : "0");
    updateAgentReqButtonVisibility(enabled);
  });
}

function updateAgentReqButtonVisibility(enabled) {
  const btn = document.getElementById("btnRequestAgents");
  if (btn) btn.style.display = enabled ? "" : "none";
}

function setupMessageToggle() {
  const cb = document.getElementById("messageToggle");
  if (!cb) return;

  // Initialwert aus RTDB laden
  get(ref(rtdb, MESSAGE_TOGGLE_PATH)).then(snap => {
    const enabled = snap.exists() ? !!snap.val() : false;
    cb.checked = enabled;
    localStorage.setItem(MESSAGE_TOGGLE_ENABLED, enabled ? "1" : "0");
  });

  cb.addEventListener("change", async () => {
    const enabled = cb.checked;
    await set(ref(rtdb, MESSAGE_TOGGLE_PATH), enabled);
    localStorage.setItem(MESSAGE_TOGGLE_ENABLED, enabled ? "1" : "0");
  });
}

// --- Einstellungen: Checkbox für U-Bahn-Einstieg ---
function setupUbahnSetting() {
  const cb = document.getElementById("uBahnEnabledCheckbox");
  if (!cb) return;

  // Initialwert aus RTDB laden
  get(ref(rtdb, UBAHN_SETTING_PATH)).then(snap => {
    const enabled = snap.exists() ? !!snap.val() : false;
    cb.checked = enabled;
    updateUbahnButtonVisibility(enabled);
  }).catch(() => {});

  cb.addEventListener("change", async () => {
    const enabled = cb.checked;
    await set(ref(rtdb, UBAHN_SETTING_PATH), enabled);
    try { localStorage.setItem(LS_UBAHN_ENABLED, enabled ? "1" : "0"); } catch {}
    updateUbahnButtonVisibility(enabled);
  });
}

function updateUbahnButtonVisibility(enabled) {
  const btn = document.getElementById("uBahnButton");
  if (!btn) return;
  // visible only when setting enabled AND misterx view is open
  const inMisterXView = document.getElementById("misterxView")?.style?.display !== "none";
  btn.style.display = (enabled && inMisterXView) ? "" : "none";
}

// --- Mitgliederverwaltung ---
let _membersCache = null;
let _membersShowHidden = false;
// Selected recipients for the custom notification modal (persist across searches in the modal)
let _selectedNotifRecipients = new Set();

function toggleShowHidden() {
  _membersShowHidden = !_membersShowHidden;
  document.getElementById('membersHiddenList').style.display = _membersShowHidden ? '' : 'none';
  document.getElementById('membersShowHiddenBtn').textContent = _membersShowHidden ? 'Ausgeblendete verbergen' : 'Ausgeblendete anzeigen';
  renderMembersUI();
}

// Persist hidden flag in RTDB
async function setMemberHidden(deviceName, hidden) {
  try {
    const safe = sanitizeKey(deviceName);
    await update(ref(rtdb, `roles/${safe}`), { hidden: !!hidden });
    showToast(hidden ? 'Spieler ausgeblendet' : 'Spieler wieder eingeblendet', { timeout: 1500, type: 'info' });
    await loadAndRenderMembers();
  } catch (err) { log('setMemberHidden err', err); showToast('Fehler beim Aktualisieren'); }
}

async function unhideAllMembers() {
  const ok = confirm('Alle ausgeblendeten Spieler wirklich wieder einblenden?');
  if (!ok) return;
  try {
    const updates = {};
    for (const m of Object.values(_membersCache || {})) {
      if (m.hidden) {
        updates[`roles/${sanitizeKey(m.name)}/hidden`] = null; // remove flag
      }
    }
    if (Object.keys(updates).length > 0) {
      // Use multi-path update via update(ref(rtdb), updates)
      await update(ref(rtdb), updates);
      showToast('Alle ausgeblendeten Spieler wieder sichtbar', { timeout: 1500, type: 'info' });
    }
    await loadAndRenderMembers();
  } catch (err) { log(err); showToast('Fehler beim Rückgängig machen'); }
}

function openMembersManagement() {
  const modal = document.getElementById('membersModal');
  if (!modal) return;
  modal.style.display = 'flex';
  modal.focus && modal.focus();
  // reset search
  const s = document.getElementById('membersSearch'); if (s) s.value = '';
  // restore sort from localStorage if available
  const so = document.getElementById('membersSort');
  if (so) {
    so.value = localStorage.getItem('membersSort') || 'name';
    // assign onchange to avoid duplicate handlers when opening modal repeatedly
    so.onchange = () => { localStorage.setItem('membersSort', so.value); renderMembersUI(); };
  }
  _membersShowHidden = false; document.getElementById('membersHiddenList').style.display = 'none';
  document.getElementById('membersShowHiddenBtn').textContent = 'Ausgeblendete anzeigen';
  // wire quick events
  const searchEl = document.getElementById('membersSearch');
  if (searchEl) searchEl.addEventListener('input', () => renderMembersUI());
  // close on ESC
  document.addEventListener('keydown', membersEscHandler);
  loadAndRenderMembers();
}
function closeMembersManagement() { const modal = document.getElementById('membersModal'); if (modal) modal.style.display = 'none'; document.removeEventListener('keydown', membersEscHandler); }

function membersEscHandler(e) { if (e.key === 'Escape') closeMembersManagement(); }

async function loadAndRenderMembers() {
  _membersCache = {};
  try {
    const [snap, tokensSnap] = await Promise.all([get(ref(rtdb, 'roles')), get(ref(rtdb, 'tokens'))]);
    const data = snap.exists() ? snap.val() : {};
    const tokensData = tokensSnap.exists() ? tokensSnap.val() : {};
    for (const name of Object.keys(data || {})) {
      const entry = data[name] || {};
      const last = entry.lastUpdated || entry.timestamp || entry.joinedAt || 0;
      // determine if device has registered push tokens
      let hasTokens = false;
      try {
        const tFor = tokensData[name] || {};
        const norm = normalizeTokens(tFor);
        hasTokens = Array.isArray(norm) && norm.length > 0;
      } catch (e) { hasTokens = false; }

      _membersCache[name] = {
        id: name,
        name,
        role: entry.role || '-',
        allowSmsFallback: !!entry.allowSmsFallback,
        instantSMS: entry.instantSMS === true,
        notification: entry.notification === false ? false : true,
        telPresent: !!entry.tel,
        lastActivity: last,
        hidden: !!entry.hidden,
        tokensPresent: hasTokens,
        raw: entry
      };
    }
  } catch (err) {
    log('Fehler beim Laden der Rollen:', err);
    showToast('Fehler beim Laden der Mitglieder.');
  }
  renderMembersUI();
}

function renderMembersUI() {
  const listEl = document.getElementById('membersList');
  const hiddenInner = document.getElementById('membersHiddenInner');
  if (!listEl) return;
  const query = (document.getElementById('membersSearch')?.value || '').trim().toLowerCase();
  const sortBy = document.getElementById('membersSort')?.value || 'name';

  const arr = Object.values(_membersCache || {});

  // filter by search
  let filtered = arr.filter(m => m.name.toLowerCase().includes(query) || (m.role || '').toLowerCase().includes(query));

  // sort BEFORE splitting into visible/hidden
  const sorter = {
    name: (a,b) => a.name.localeCompare(b.name),
    role: (a,b) => (a.role||'').localeCompare(b.role||''),
    lastActivity: (a,b) => (b.lastActivity||0) - (a.lastActivity||0),
    hasTel: (a,b) => (b.telPresent?1:0) - (a.telPresent?1:0),
    allowSmsFallback: (a,b) => (b.allowSmsFallback?1:0) - (a.allowSmsFallback?1:0)
  };
  filtered = (sorter[sortBy] ? filtered.sort(sorter[sortBy]) : filtered.sort(sorter.name));

  // hidden filter uses RTDB-stored flag (m.hidden)
  const visibleItems = filtered.filter(m => !m.hidden);
  const hiddenItems  = filtered.filter(m => !!m.hidden);

  // render visible
  listEl.innerHTML = '';
  for (const m of visibleItems) {
    const row = document.createElement('div'); row.className = 'member-row';
    const left = document.createElement('div'); left.className = 'member-left';
    const name = document.createElement('div'); name.className = 'member-name'; name.innerHTML = escapeHtml(m.name);
    const meta = document.createElement('div'); meta.className = 'member-meta';
    const dt = m.lastActivity ? formatDatetime(normalizeTimestamp(m.lastActivity)) : '—';
    meta.innerHTML = `${escapeHtml(m.role)} · ${dt} · ${m.telPresent ? 'Tel ✓' : '—'}`;
    left.appendChild(name); left.appendChild(meta);

    const actions = document.createElement('div'); actions.className = 'member-actions';

    // allowSmsFallback toggle
    const smsLabel = document.createElement('label'); smsLabel.className = 'member-meta small-muted';
    smsLabel.style.display = 'inline-flex'; smsLabel.style.alignItems = 'center'; smsLabel.style.gap = '6px';
    const smsCb = document.createElement('input'); smsCb.type = 'checkbox'; smsCb.checked = !!m.allowSmsFallback; smsCb.className = 'member-toggle';
    smsCb.addEventListener('change', () => updateRoleField(m.name, { allowSmsFallback: smsCb.checked }));
    smsLabel.appendChild(smsCb); smsLabel.appendChild(document.createTextNode('SMS-Fallback'));
    actions.appendChild(smsLabel);

    // instantSMS toggle
    const instLabel = document.createElement('label'); instLabel.className = 'member-meta small-muted';
    instLabel.style.display = 'inline-flex'; instLabel.style.alignItems = 'center'; instLabel.style.gap = '6px';
    const instCb = document.createElement('input'); instCb.type = 'checkbox'; instCb.checked = !!m.instantSMS; instCb.className = 'member-toggle';
    // visually mark when no phone number is present but keep toggle interactive
    if (!m.telPresent) {
      instLabel.classList.add('disabled');
      instCb.title = 'Keine Telefonnummer hinterlegt – Instant-SMS funktioniert nicht.';
    }
    instCb.addEventListener('change', () => updateRoleField(m.name, { instantSMS: instCb.checked }));
    instLabel.appendChild(instCb); instLabel.appendChild(document.createTextNode('Instant-SMS'));
    actions.appendChild(instLabel);

    // notification toggle
    const nLabel = document.createElement('label'); nLabel.className = 'member-meta small-muted';
    nLabel.style.display = 'inline-flex'; nLabel.style.alignItems = 'center'; nLabel.style.gap = '6px';
    const nCb = document.createElement('input'); nCb.type = 'checkbox'; nCb.checked = !!m.notification; nCb.className = 'member-toggle';
    // visually mark when there is no push token, but keep toggle interactive
    if (!m.tokensPresent) {
      nLabel.classList.add('disabled');
      nCb.title = 'Kein Push-Token vorhanden – Push-Benachrichtigungen nicht möglich.';
    }
    nCb.addEventListener('change', () => updateRoleField(m.name, { notification: nCb.checked }));
    nLabel.appendChild(nCb); nLabel.appendChild(document.createTextNode('Benachr.'));
    actions.appendChild(nLabel);

    // hide button
    const hideBtn = document.createElement('button'); hideBtn.className = 'small-button ghost'; hideBtn.textContent = 'Ausblenden';
    hideBtn.setAttribute('title', 'Spieler in der App ausblenden (gespeichert)');
    hideBtn.addEventListener('click', () => setMemberHidden(m.name, true));
    actions.appendChild(hideBtn);

    // remove tel
    const delTelBtn = document.createElement('button'); delTelBtn.className = 'small-button ghost'; delTelBtn.textContent = 'Nummer löschen';
    delTelBtn.addEventListener('click', () => removeTel(m.name));
    actions.appendChild(delTelBtn);

    // delete member
    const delBtn = document.createElement('button'); delBtn.className = 'small-button danger-ghost'; delBtn.textContent = 'Spieler löschen';
    delBtn.addEventListener('click', () => deleteMember(m.name));
    actions.appendChild(delBtn);

    row.appendChild(left); row.appendChild(actions);
    listEl.appendChild(row);
  }

  // render hidden list
  hiddenInner.innerHTML = '';
  for (const m of hiddenItems) {
    const r = document.createElement('div'); r.className = 'member-row hidden';
    const dt = m.lastActivity ? formatDatetime(normalizeTimestamp(m.lastActivity)) : '—';
    r.innerHTML = `<div class="member-left"><div class="member-name">${escapeHtml(m.name)}</div><div class="member-meta">${escapeHtml(m.role)} · ${dt}</div></div>`;
    const a = document.createElement('div'); a.className = 'member-actions';
    const showBtn = document.createElement('button'); showBtn.className = 'small-button ghost'; showBtn.textContent = 'Wieder einblenden';
    showBtn.addEventListener('click', () => setMemberHidden(m.name, false));
    a.appendChild(showBtn);
    const delBtn = document.createElement('button'); delBtn.className = 'small-button danger-ghost'; delBtn.textContent = 'Spieler löschen';
    delBtn.addEventListener('click', () => deleteMember(m.name));
    a.appendChild(delBtn);
    r.appendChild(a);
    hiddenInner.appendChild(r);
  }
}

async function updateRoleField(deviceName, updates) {
  try {
    const safe = sanitizeKey(deviceName);
    await update(ref(rtdb, `roles/${safe}`), updates);
    showToast('Änderung gespeichert', { timeout: 1500, type: 'info' });
    loadAndRenderMembers();
  } catch (err) { log(err); showToast('Fehler beim Speichern'); }
}

async function deleteMember(deviceName) {
  const ok = confirm(`Spieler ${deviceName} wirklich löschen? Diese Aktion entfernt alle Rollen-/Tel-Daten.`);
  if (!ok) return;
  try {
    await remove(ref(rtdb, `roles/${sanitizeKey(deviceName)}`));
    showToast('Spieler gelöscht', { timeout:2000, type:'info' });
    loadAndRenderMembers();
  } catch (err) { log(err); showToast('Fehler beim Löschen'); }
}

async function removeTel(deviceName) {
  const ok = confirm(`Nummer von ${deviceName} wirklich löschen?`);
  if (!ok) return;
  try {
    await update(ref(rtdb, `roles/${sanitizeKey(deviceName)}`), { tel: null, allowSmsFallback: false });
    showToast('Nummer entfernt', { timeout:1500, type:'info' });
    loadAndRenderMembers();
  } catch (err) { log(err); showToast('Fehler beim Entfernen'); }
}

// Note: actual unhide implementation (writes to RTDB) is defined earlier as async function unhideAllMembers() { /* no-op placeholder removed */ }

// expose to global
window.openMembersManagement = openMembersManagement;
window.closeMembersManagement = closeMembersManagement;
window.toggleShowHidden = toggleShowHidden;
window.unhideAllMembers = unhideAllMembers;

// Aktion: U-Bahn-Einstieg melden (mit Confirm)
async function announceUBahn() {
  const ok = confirm("Bestätige, dass du in eine U-Bahn eingestiegen bist.");
  if (!ok) return;

  const message = "Mister X ist in eine U-Bahn eingestiegen";
  const payload = {
    message,
    timestamp: Date.now(),
    device: deviceId || null
  };

  try {
    // 1) Schreibe Event in RTDB (sichtbar in Feed)
    await push(ref(rtdb, 'events/ubahn'), payload);
  } catch (err) {
    log('Fehler beim Schreiben des U-Bahn-Events:', err);
  }

  try {
    // 2) Benachrichtigung an alle Nicht-Mister-X (ähnlich wie Show-Event)
    // Wir schicken an roles: agent, settings, start
    const title = "Mister X ist in eine U-Bahn eingestiegen";
    const body = message;
    await sendNotificationToRoles(title, body, ['agent','settings','start']);
  } catch (err) {
    log('Fehler beim Versenden der U-Bahn-Benachrichtigung:', err);
  }

  showToast(message, { type: 'info' });
}

// Listener: keep latest ubahn snapshot and re-render combined feed
function attachUbahnListener() {
  if (__ubahnListenerAttached) return;
  const refPath = ref(rtdb, 'events/ubahn');
  onValue(refPath, (snap) => {
    __latestUbahnSnap = snap;
    renderFeedsFromLatest();
  });
  __ubahnListenerAttached = true;
}



// Custom notification modal handlers

async function openCustomNotifModal() {
  const modal = document.getElementById('customNotifModal');
  if (!modal) return;
  // ensure members are loaded so we can render recipient list
  try {
    await loadAndRenderMembers();
  } catch (e) {
    log('Fehler beim Laden der Mitglieder:', e);
  }

  // render roles + recipients
  renderNotifRoles();
  renderNotifRecipients();

  // Attach search/select-all listeners only once
  if (!window.__customNotifListenersAdded) {
    document.getElementById('customNotifSearch')?.addEventListener('input', () => renderNotifRecipients());

    document.getElementById('customNotifSelectAll')?.addEventListener('change', (e) => {
      const checked = e.target.checked;
      const list = document.querySelectorAll('#notifRecipientsList input[type="checkbox"][data-name]');
      list.forEach(ch => {
        if (ch.disabled) return; // don't change disabled checkboxes
        ch.checked = checked;
        const name = ch.dataset.name;
        if (checked) _selectedNotifRecipients.add(name);
        else _selectedNotifRecipients.delete(name);
      });
      updateAllRoleButtonStates();
      updateSelectedCount();
    });

    window.__customNotifListenersAdded = true;
  }

  modal.style.display = 'flex';
  document.addEventListener('keydown', customNotifEscHandler);
}

function closeCustomNotifModal() {
  const modal = document.getElementById('customNotifModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.removeEventListener('keydown', customNotifEscHandler);
}

function customNotifEscHandler(e) { if (e.key === 'Escape') closeCustomNotifModal(); }

function canDeviceReceive(m) {
  // device cannot receive if notifications are explicitly disabled
  if (!m || m.notification === false) return false;
  // device can receive if it has tokens OR phone with instantSMS/SMS-fallback enabled
  return !!(m && (m.tokensPresent || (m.telPresent && (m.instantSMS === true || m.allowSmsFallback === true))));
}

function cleanSelectedRecipients() {
  // Remove any selected recipients that cannot receive
  const removed = [];
  for (const name of Array.from(_selectedNotifRecipients)) {
    const m = (_membersCache || {})[name];
    if (!m || !canDeviceReceive(m)) {
      _selectedNotifRecipients.delete(name);
      removed.push(name);
    }
  }
  if (removed.length > 0) {
    showToast(`${removed.length} Gerät(e) wurden entfernt, da sie nicht empfangsfähig sind.`, { type: 'warning' });
  }
}

function renderNotifRecipients() {
  const container = document.getElementById('notifRecipientsList');
  if (!container) return;
  const q = (document.getElementById('customNotifSearch')?.value || '').trim().toLowerCase();
  container.innerHTML = '';
  const arr = Object.values(_membersCache || {});
  const filtered = arr.filter(m => m.name.toLowerCase().includes(q) || (m.role||'').toLowerCase().includes(q));
  filtered.sort((a,b) => a.name.localeCompare(b.name));

  // split into non-hidden and hidden (hidden shown below with separator)
  const visibleNonHidden = filtered.filter(m => !m.hidden);
  const visibleHidden = filtered.filter(m => !!m.hidden);

  const renderList = (list) => {
    for (const m of list) {
      const row = document.createElement('div');
      row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.justifyContent = 'space-between'; row.style.padding = '.25rem 0';
      const left = document.createElement('div'); left.style.display = 'flex'; left.style.alignItems = 'center'; left.style.gap = '8px';

      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.dataset.name = m.name; cb.id = `notif-rec-${m.name}`;
      // If device cannot receive, make checkbox disabled and ensure not selected
      const receivable = canDeviceReceive(m);
      cb.disabled = !receivable;
      if (!receivable) cb.checked = false;

      // restore checked state from persistent selection
      if (receivable) cb.checked = _selectedNotifRecipients.has(m.name);

      cb.addEventListener('change', (e) => {
        if (e.target.checked) _selectedNotifRecipients.add(m.name);
        else _selectedNotifRecipients.delete(m.name);
        // reflect selection in role buttons
        updateAllRoleButtonStates();
        updateSelectedCount();
      });

      const label = document.createElement('label'); label.htmlFor = cb.id; label.textContent = m.name + (m.role ? ` (${m.role})` : '');

      // respect explicit notifications flag
      if (m.notification === false) {
        label.style.color = '#999';
        row.style.opacity = '0.5';
        label.style.cursor = 'not-allowed';
        label.title = 'Benachrichtigungen für dieses Gerät sind deaktiviert.';
      } else {
        // style devices without tokens as greyed-out
        if (!m.tokensPresent) {
          label.style.color = '#999';
          row.style.opacity = '0.7';
        }
        if (!receivable) {
          label.style.cursor = 'not-allowed';
          label.title = 'Dieses Gerät kann keine Nachrichten empfangen.';
        }
      }

      const meta = document.createElement('span'); meta.style.color = '#666'; meta.style.fontSize = '0.9rem';
      const metaParts = [];
      if (m.notification === false) {
        metaParts.push('(Benachrichtigungen deaktiviert)');
      } else {
        if (!m.tokensPresent) metaParts.push('(kein Token)');

        // show only presence & flags for telephone — never the actual phone number
        if (m.telPresent && (m.instantSMS === true || m.allowSmsFallback === true)) {
          const flags = [];
          if (m.instantSMS) flags.push('instant-SMS');
          if (m.allowSmsFallback) flags.push('SMS-Fallback');
          metaParts.push(`(Telefon${flags.length ? ' • ' + flags.join(', ') : ''})`);
        }
      }

      meta.textContent = metaParts.join(' ');

      left.appendChild(cb); left.appendChild(label);
      row.appendChild(left);
      row.appendChild(meta);
      container.appendChild(row);
    }
  };

  renderList(visibleNonHidden);

  if (visibleHidden.length > 0) {
    const sep = document.createElement('div');
    sep.style.borderTop = '1px dashed #ddd';
    sep.style.margin = '8px 0';
    sep.textContent = 'Ausgeblendete Geräte';
    sep.style.color = '#666';
    sep.style.fontSize = '0.9rem';
    sep.style.paddingTop = '6px';
    container.appendChild(sep);
    renderList(visibleHidden);
  }

  // update 'select all' checkbox to reflect visible selection
  const selAll = document.getElementById('customNotifSelectAll');
  if (selAll) {
    const visibleCheckboxes = Array.from(document.querySelectorAll('#notifRecipientsList input[type="checkbox"][data-name]'));
    const allSelected = visibleCheckboxes.length > 0 && visibleCheckboxes.every(ch => _selectedNotifRecipients.has(ch.dataset.name) || ch.disabled);
    selAll.checked = allSelected;
  }

  // update role button states
  updateAllRoleButtonStates();
  updateSelectedCount();
}

// Toggle select/unselect all devices of a role
function toggleSelectRole(role) {
  // only consider receivable devices (tokens or SMS-capable)
  const names = Object.values(_membersCache || {}).filter(m => m.role === role && canDeviceReceive(m)).map(m => m.name);
  if (!names.length) {
    showToast(`Keine empfangsfähigen Geräte mit Rolle ${role} gefunden.`, { type: 'warning' });
    return;
  }
  const allSelected = names.every(n => _selectedNotifRecipients.has(n));
  if (allSelected) names.forEach(n => _selectedNotifRecipients.delete(n));
  else names.forEach(n => _selectedNotifRecipients.add(n));
  updateRecipientCheckboxes();
  updateAllRoleButtonStates();
  updateSelectedCount();
}

function toggleSelectAllDevices() {
  // toggle all receivable devices only
  const names = Object.values(_membersCache || {}).filter(m => canDeviceReceive(m)).map(m => m.name);
  if (!names.length) return;
  const allSelected = names.every(n => _selectedNotifRecipients.has(n));
  if (allSelected) names.forEach(n => _selectedNotifRecipients.delete(n));
  else names.forEach(n => _selectedNotifRecipients.add(n));
  updateRecipientCheckboxes();
  updateAllRoleButtonStates();
  updateSelectedCount();
}

function updateRecipientCheckboxes() {
  // clean selection first
  cleanSelectedRecipients();
  const chs = Array.from(document.querySelectorAll('#notifRecipientsList input[type="checkbox"][data-name]'));
  chs.forEach(cb => { cb.checked = _selectedNotifRecipients.has(cb.dataset.name); });
  // update select-all visible checkbox
  const selAll = document.getElementById('customNotifSelectAll');
  if (selAll) {
    const visibleCheckboxes = chs;
    selAll.checked = visibleCheckboxes.length > 0 && visibleCheckboxes.every(ch => _selectedNotifRecipients.has(ch.dataset.name) || ch.disabled);
  }
  updateSelectedCount();
}

function updateSelectedCount() {
  // ensure no non-receivable remain
  cleanSelectedRecipients();
  const count = _selectedNotifRecipients.size;
  const el = document.getElementById('notifSelectedCount');
  if (el) {
    el.textContent = `${count} ausgewählt`;
    el.setAttribute('title', `${count} Gerät(e) ausgewählt`);
  }
}

function updateAllRoleButtonStates() {
  const roles = ['misterx','agent','settings','start'];
  for (const r of roles) {
    const btn = document.getElementById(`notif-role-btn-${escapeAttr(r)}`);
    if (!btn) continue;
    const names = Object.values(_membersCache || {}).filter(m => m.role === r && canDeviceReceive(m)).map(m => m.name);
    const allSelected = names.length > 0 && names.every(n => _selectedNotifRecipients.has(n));
    if (allSelected) {
      btn.classList.add('active');
      btn.style.backgroundColor = '#e0f0ff';
    } else {
      btn.classList.remove('active');
      btn.style.backgroundColor = '';
    }
  }
  // update 'Alle' button
  const allBtn = document.getElementById('notifRoleAllBtn');
  if (allBtn) {
    const allNames = Object.values(_membersCache || {}).filter(m => canDeviceReceive(m)).map(m => m.name);
    const allSelected = allNames.length > 0 && allNames.every(n => _selectedNotifRecipients.has(n));
    if (allSelected) {
      allBtn.classList.add('active');
      allBtn.style.backgroundColor = '#e0f0ff';
    } else {
      allBtn.classList.remove('active');
      allBtn.style.backgroundColor = '';
    }
  }
}

function renderNotifRoles() {
  const container = document.getElementById('notifRolesList');
  if (!container) return;
  container.innerHTML = '';
  const roles = ['misterx','agent','settings','start'];

  for (const r of roles) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = `notif-role-btn-${escapeAttr(r)}`;
    btn.className = 'small-button notif-role-btn';
    btn.style.marginRight = '8px';
    btn.textContent = r;
    btn.addEventListener('click', () => {
      toggleSelectRole(r);
    });
    container.appendChild(btn);
  }

  // 'Alle' button (toggles all devices)
  const allBtn = document.getElementById('notifRoleAllBtn');
  if (allBtn && !window.__notifRoleAllListenerAdded) {
    allBtn.addEventListener('click', () => {
      toggleSelectAllDevices();
    });
    window.__notifRoleAllListenerAdded = true;
  }

  // Reflect current selection state on buttons
  updateAllRoleButtonStates();
}

async function sendCustomNotification() {
  const title = (document.getElementById('customNotifTitle')?.value || '').trim();
  const body = (document.getElementById('customNotifBody')?.value || '').trim();
  if (!title) return showToast('Bitte Titel eingeben.', { type: 'warning' });
  if (!body) return showToast('Bitte Nachrichtentext eingeben.', { type: 'warning' });
  // Use persisted selection set for devices (keeps selection across searches)
  // Defensive: ensure we only keep devices that can actually receive (respects notification:false)
  const checkedDevices = Array.from(_selectedNotifRecipients).filter(name => {
    const m = (_membersCache || {})[name];
    return !!m && canDeviceReceive(m);
  });
  // roles selected via buttons: find checked role buttons
  const checkedRoles = Array.from(document.querySelectorAll('#notifRolesList .notif-role-btn.active')).map(b => b.textContent);
  const allBtnActive = document.getElementById('notifRoleAllBtn')?.classList.contains('active');
  if (allBtnActive) checkedRoles.push('all');

  if (checkedDevices.length === 0 && checkedRoles.length === 0) return showToast('Bitte mindestens ein Gerät oder eine Rolle auswählen.', { type: 'warning' });

  // read tokens for selected devices
  let tokensData = {};
  try {
    const snap = await get(ref(rtdb, 'tokens'));
    tokensData = snap.exists() ? snap.val() : {};
  } catch (err) {
    log('Fehler beim Laden der Tokens:', err);
  }

  // If roles selected, send via role-based API
  let rolesSent = false;
  try {
    // Read global flag 'settings/messages' - if disabled, abort completely (no pushes, no SMS)
    try {
      const sSnap = await get(ref(rtdb, 'settings/messages'));
      const messagesEnabled = !sSnap.exists() ? true : !!sSnap.val();
      if (!messagesEnabled) {
        showToast('Benachrichtigungen sind auf dem Server deaktiviert. Nachricht wurde nicht gesendet.', { type: 'warning' });
        closeCustomNotifModal();
        return;
      }
    } catch (e) { log('Konnte settings/messages nicht lesen, fahre fort:', e); }

    // Immediately inform the user and close the modal; do sending in background
    showToast('Benachrichtigung wird gesendet.', { type: 'info' });
    closeCustomNotifModal();

  const messageId = createMessageId();
  const senderName = (typeof getDeviceId === 'function' ? getDeviceId() : null) || 'unknown';
  const smsText = `${title}: ${body}\nDiese Nachricht wurde automatisch gesendet`.slice(0, 280);

  // Roles: fire-and-forget
  try {
    if (checkedRoles.length > 0) {
      const rolesArg = checkedRoles.includes('all') ? ['all'] : checkedRoles;
      sendNotificationToRoles(title, body, rolesArg, { messageId, rtdbBase: RTDB_BASE }).catch(err => { log('Fehler beim Senden an Rollen:', err); });
      rolesSent = true; // optimistic
    }
  } catch (err) { log('Fehler beim Senden an Rollen (sync check):', err); }

  // Build tokens from device selection, excluding devices that are part of selected roles to avoid duplicates.
  // If 'all' role is selected, skip explicit token sends entirely (roles cover everyone).
  const excludeDevices = new Set();
  if (checkedRoles.length > 0 && !checkedRoles.includes('all')) {
    for (const m of Object.values(_membersCache || {})) {
      if (m.role && checkedRoles.includes(m.role)) excludeDevices.add(m.name);
    }
  }

  const tokens = [];
  const instantSMSDevices = [];
  const explicitDevicesToSend = [];
  const skipExplicitSend = checkedRoles.includes('all');

  if (!skipExplicitSend) {
    for (const dev of checkedDevices) {
      if (excludeDevices.has(dev)) continue;
      const member = _membersCache?.[dev];
      // If member requested instant SMS -> only SMS (no push)
      if (member?.instantSMS === true) {
        instantSMSDevices.push(dev);
        continue; // do not collect tokens or add to explicitDevicesToSend
      }
      explicitDevicesToSend.push(dev);
      try {
        const t = normalizeTokens(tokensData[dev] || []);
        if (Array.isArray(t) && t.length) tokens.push(...t);
      } catch (e) { }
    }
  } else {
    // when 'all' selected, inform user if they selected individual devices as well
    if (checkedDevices.length > 0) showToast('Hinweis: „Alle“ ausgewählt — individuelle Geräte werden nicht zusätzlich adressiert.', { type: 'info' });
  }

  // deduplicate tokens
  const uniqueTokens = Array.from(new Set(tokens));

  // Prepare recipients map that should be visible immediately in RTDB
  const allExplicitRecipients = Array.from(new Set([...explicitDevicesToSend, ...instantSMSDevices]));

  // Background worker to write initial notification (so recipients appear quickly) and to trigger sends
  (async () => {
    const now = Date.now();
    if (allExplicitRecipients.length > 0) {
      try {
        const notif = {
          sender: senderName,
          title,
          body,
          recipients: {},
          timestamp: now,
          attempts: { 1: { at: now, count: uniqueTokens.length } },
          lastAttemptAt: now,
        };
        for (const n of allExplicitRecipients) {
          notif.recipients[sanitizeKey(n)] = false;
        }
        await set(ref(rtdb, `notifications/${messageId}`), notif);
      } catch (err) { log('Warn: could not write initial notification to RTDB:', err); }
    }

    if (uniqueTokens.length > 0) {
      try {
        // include instantSMS recipients so server is aware and can trigger SMS and write recipients
        const recipientDeviceNames = Array.from(new Set([...explicitDevicesToSend, ...instantSMSDevices]));
        await sendNotificationToTokens(title, body, uniqueTokens, { recipientDeviceNames, instantSMSDevices, messageId, rtdbBase: RTDB_BASE });
        log('sendCustomNotification tokens result (bg)');
      } catch (err) { log('Fehler beim Senden der Nachricht (bg):', err); }
    } else {
      // No push tokens: maybe instant-SMS-only
      if (instantSMSDevices.length > 0) {
        try {
          await triggerSmsDirectIfNeeded(messageId, instantSMSDevices, smsText, { rtdbBase: RTDB_BASE });
          log('SMS an Instant-SMS-Geräte gesendet (bg)');
        } catch (err) { log('Fehler beim direkten SMS-Versand (bg):', err); }
      } else if (!rolesSent) {
        // neither tokens nor instant SMS nor roles
        showToast('Keine Tokens für ausgewählte Geräte gefunden.', { type: 'warning' });
      }
    }
  })();
} catch (err) { log('sendCustomNotification preparation error', err); }
}

// expose to global (used by inline onclicks in HTML)
window.openCustomNotifModal = openCustomNotifModal;
window.closeCustomNotifModal = closeCustomNotifModal;
window.sendCustomNotification = sendCustomNotification;

// Beim Laden prüfen / initialisieren

async function startScript() {
  askForDeviceIdAndPhone();
  try {
    // (A) Kapazitäten prüfen – NICHTS forcen
    const support = await detectSupport();

    // (B) Foreground-Messages nur, wenn FCM generell unterstützt wird

    if (support && support.fcm) {
      if (!messaging) messaging = getMessaging(app);

      // 1) SW -> Page (der bevorzugte Pfad für Foreground)
      //    Nur einmal registrieren (z. B. wenn du startScript mehrfach aufrufst)
      if (!window.__swMsgListenerAdded) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event && event.data && event.data.type === 'PUSH') {
            const payload = event.data.payload || {};
             navigator.serviceWorker.controller?.postMessage({
              type: 'PUSH',
              payload,
              userAgent: navigator.userAgent
            });
            _handleInAppMessage(payload);
            log('[Page] SW-Message empfangen', payload);
          }
        });
        window.__swMsgListenerAdded = true;
      }

      // 2) onMessage (Fallback für Browser/Setups, die SW-PostMessage nicht liefern)
      let _lastMsgId = null;
      onMessage(messaging, (payload) => {
        const data = (payload && payload.data) ? payload.data : {};

        // einfache Duplikat-Sperre
        if (data.messageId && data.messageId === _lastMsgId) return;
        _lastMsgId = data.messageId || null;

        // Deine bestehende In‑App‑UI
        navigator.serviceWorker.controller?.postMessage({
          type: 'PUSH',
          payload,
          userAgent: navigator.userAgent
        });
        _handleInAppMessage(data);
        log('[Page] FCM onMessage empfangen', payload);
      });

    }

    navigator.serviceWorker.addEventListener('message', (e) => {
      if (e?.data?.type === 'PUSH_SUBSCRIPTION_CHANGED') {
        // force = true -> registriere auch bei unverändertem Token erneut & touch DB
        refreshTokenIfPermitted({ force: true }).catch(log);
      }
    });

    
    (async () => {
      const changedAt = await readSwFlag('pushSubscriptionChangedAt');
      if (changedAt) {
        await refreshTokenIfPermitted({ force: true }).catch(log);
        await clearSwFlag('pushSubscriptionChangedAt');
      }
    })();




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
    updateStartButtonState(true)
    document.getElementById("btnRequestAgents").style.display = "none";
    const savedView = localStorage.getItem('activeView') || 'start';

    
    if (savedView !=='start'){switchView(savedView);}
    showLocationHistory();
    await ensurePostenLoadedOnce();
    listenToTimer();
    setTimerInputFromFirebase();
    showButtons();
    refreshTokenIfPermitted(); // <- diese Funktion sollte intern checken, ob Messaging/Token existiert
    startup_Header();
    initRefreshButton();
    autoCheckUpdatesOnResume();
    ensureTeamListeners();
    attachAgentReqListener();
    await initPostenListener();
    wireSearchUI();
    attachDelegatedImageClick();
    setupLightboxOnce();
    fetchAndShowSwLogs().catch(() => {});
    setupAgentReqSetting();
    setupMessageToggle();
    setupUbahnSetting();
    attachUbahnListener();



    //für Agentlocation:
    
    const toggle = document.getElementById('toggleAgentLocations');
      if (toggle) {
        toggle.checked = showAgentLocations;
        toggle.addEventListener('change', () => {
          showAgentLocations = !!toggle.checked;
          try { localStorage.setItem(LS_SHOW_AGENT_LOCS, showAgentLocations ? '1' : '0'); } catch {}
          renderAgentRequestOverlay();    // Ein-/Ausblenden anwenden
        });
      }

    // Event-Handler für Karte
    document.getElementById('toggleTracking')?.addEventListener('change', (e) => {
      if (e.target.checked) startUserLocationTracking();
      else stopUserLocationTracking();
    });
    document.getElementById('toggleFollow')?.addEventListener('change', (e) => {
      followMe = e.target.checked;
    });

    const clearBtn = document.getElementById("clearLocalStorageBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("Möchtest du wirklich alle gespeicherten Daten (localStorage) löschen?")) {
          localStorage.clear();
          sessionStorage.clear();
          alert("Alle lokalen Daten wurden gelöscht. Die Seite wird neu geladen.");
          location.reload();
        }
      });
    }


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
window.save_timer_duration2 = save_timer_duration2;
window.save_max_mister_x = save_max_mister_x;
window.resetTimer = resetTimer;
window.deleteAllLocations = deleteAllLocations;
window.resetAllMisterXRollen = resetAllMisterXRollen;
window.removeNotificationSetup = removeNotificationSetup;
window.mxState = window.mxState || {};
window.mxState.selectedPost = null; 
window.openCloseTeamSettings = openCloseTeamSettings;
window.closeTeamSettings = closeTeamSettings;
window.leaveTeam = leaveTeam;
window.createTeam = createTeam;
window.joinTeam = joinTeam;
window.triggerAgentLocationRequest = triggerAgentLocationRequest;
window.resetAgentLocations = resetAgentLocations;
window.announceUBahn = announceUBahn;
function setSelectedPost(p) {window.mxState.selectedPost = p; }
function getselectedPost() { return window.mxState.selectedPost; }
document.addEventListener("DOMContentLoaded", startScript);