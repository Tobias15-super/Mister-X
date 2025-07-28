let countdown;
let fotoHochgeladen = false;
let timerListenerRegistered = false;
let map;
let marker;
let historyMarkers = [];

// Supabase initialisieren
const supabaseClient = supabase.createClient(
  'https://axirbthvnznvhfagduyj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aXJidGh2bnpudmhmYWdkdXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDI2MTcsImV4cCI6MjA2ODg3ODYxN30.wfJm9e10_iNuYm_r3es_FmKuXBePsxSjIJcVqmSuYjc'
);

// Token speichern
function saveTokenToSupabase(token) {
  let device_name = ""
  if (localStorage.getItem("deviceId")){
    device_name = localStorage.getItem("deviceId")
  } else {
    device_name = prompt("Wie soll dieses Gerät heißen?") || "Unbekannt";
    localStorage.setItem("deviceId", device_name);
  }

  supabaseClient
    .from('fcm_tokens')
    .upsert({ token, device_name: device_name })
    .then(({ error }) => {
      if (error) {
        console.error("Fehler beim Speichern des Tokens:", error);
      } else {
        console.log("Token erfolgreich gespeichert.");
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
          const deviceId = getDeviceId();
          console.log("Token:", currentToken);
          firebase.database().ref("tokens/" + deviceId).set(currentToken);
          saveTokenToSupabase(currentToken);
          localStorage.setItem("nachrichtAktiv",true);
          document.getElementById("permissionButton").style.display="none";
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
  const { title, body } = payload.notification;
  alert(`${title}\n${body}`);
});

async function sendNotification(title, body, tokens = null, attempt = 1, maxAttempts = 30) {
  const res = await fetch("https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-to-all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body, tokens })
  });

  const result = await res.json();
  console.log(`📦 Versuch ${attempt}:`, result);

  if (result.failedTokens && result.failedTokens.length > 0 && attempt < maxAttempts) {
    console.log(`🔁 Wiederhole für ${result.failedTokens.length} fehlgeschlagene Tokens in 10 Sekunden...`);
    setTimeout(() => {
      sendNotification(title, body, result.failedTokens, attempt + 1, maxAttempts);
    }, 10000);
  } else if (attempt >= maxAttempts) {
    console.warn("⏱️ Max. Anzahl an Versuchen erreicht.");
  } else {
    console.log("✅ Alle Benachrichtigungen erfolgreich gesendet.");
  }
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
      console.error("Upload-Fehler:", error);
      alert("Fehler beim Hochladen zu Cloudinary.");
    });
}

function sendLocationWithPhoto() {
  const title = document.getElementById("locationTitle").value;
  const file = document.getElementById("photoInput").files[0];
  const manualDescription = document.getElementById("manualLocationDescription").value;

  if (!title || !file) {
    alert("Bitte Titel und Foto angeben.");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const accuracy = position.coords.accuracy;
        if (accuracy > 100) {
          document.getElementById("status").innerText =
            `⚠️ Standort ungenau (±${Math.round(accuracy)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`;
          document.getElementById("manualLocationContainer").style.display = "block";
          return;
        }

        uploadAndSaveLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          title,
          file,
          description: null
        });
      },
      error => {
        showError(error);
        document.getElementById("manualLocationContainer").style.display = "block";
      }
    );
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
    document.getElementById("manualLocationContainer").style.display = "block";
  }

  // Falls Standort nicht verfügbar, aber Beschreibung vorhanden
  if (!navigator.geolocation || manualDescription.trim() !== "") {
    uploadAndSaveLocation({
      lat: null,
      lon: null,
      title,
      file,
      description: manualDescription.trim()
    });
  }
}

function uploadAndSaveLocation({ lat, lon, title, file, description }) {
  const timestamp = Date.now();

  uploadToCloudinary(file, ({ url}) => {
    // Objekt dynamisch bauen, undefined Felder vermeiden
    const locationData = {
      lat,
      lon,
      title,
      photoURL: url,
      description,
      timestamp
    };


    firebase.database().ref("locations").push(locationData);

    // Reset UI
    document.getElementById("locationTitle").value = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("manualLocationDescription").value = "";
    document.getElementById("manualLocationContainer").style.display = "none";
    document.getElementById("status").innerText = "✅ Standort/Foto erfolgreich gesendet!";

    startTimer();
    sendNotification("Mister X hat sich gezeigt!", title + description)
  });
}

function showLocationHistory() {
  const dbRef = firebase.database().ref("locations");

  dbRef.on("value", snapshot => {
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
    // 1.) Chronologisch sortieren: Neueste zuerst
    const entries = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);

    // Karte vorbereiten – nur wenn gültige Koordinaten vorhanden sind
    const validEntries = entries.filter(e => e.lat != null && e.lon != null);

    if (validEntries.length > 0) {
      const { lat, lon } = validEntries[0];

      if (map) {
        map.remove(); // Leaflet-Karte korrekt entfernen
        map = null;
      }

      map = L.map('map').setView([lat, lon], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);

      historyMarkers.forEach(marker => map.removeLayer(marker));
      historyMarkers = [];

      validEntries.forEach(loc => {
        const m = L.circleMarker([loc.lat, loc.lon], {
          radius: 5,
          color: "blue"
        }).addTo(map).bindPopup(`📍 ${new Date(loc.timestamp).toLocaleString()}`);
        historyMarkers.push(m);
      });

      document.getElementById("map").style.display = "block";
    } else {
      // Keine gültigen Koordinaten → Karte ausblenden
      if (map) {
        map.remove();
        map = null;
      }
      document.getElementById("map").style.display = "none";
    }

    // Feed unter der Karte aktualisieren
    const feed = document.getElementById("locationFeed");
    feed.innerHTML = "";

    entries.forEach(loc => {
      // 2.) Titel setzen: "Automatischer Standort" wenn kein Titel vorhanden
      const entryTitle = loc.title ? loc.title : "Automatischer Standort";
      // 4.) Uhrzeit zum Titel
      const entryTime = loc.timestamp ? new Date(loc.timestamp).toLocaleTimeString() : "";
      // 3.) Foto nur anzeigen, wenn vorhanden
      const photoHTML = loc.photoURL ? `<img src="${loc.photoURL}" alt="Foto" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 5px;">` : "";

      const entryDiv = document.createElement("div");
      entryDiv.style.marginBottom = "1em";
      entryDiv.innerHTML = `
        <strong>${entryTitle} (${entryTime})</strong><br>
        ${loc.description ? `<em>📍 ${loc.description}</em><br>` : ""}
        ${photoHTML}
      `;
      feed.appendChild(entryDiv);
    });
  });
}

function resetAllMisterXRollen() {
  firebase.database().ref("roles").once("value").then(snapshot => {
    const roles = snapshot.val();
    for (const id in roles) {
      if (roles[id].role === "misterx") {
        firebase.database().ref("roles/" + id).set({
          role: "start",
          timestamp: Date.now()
        });
      }
    }
    alert("Alle Mister X Rollen wurden zurückgesetzt.");
  });
}

async function canSwitchToMisterX() {
  /*
  if (localStorage.getItem("activeView")==="misterx"){
    return true;
  }
    */
  const snapshot = await firebase.database().ref("roles").once("value");
  const roles = snapshot.val();
  for (const id in roles){
    if (roles[id].role === "misterx"){
      return false;
    }
  }
  return true;
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
    const deviceId = getDeviceId();
    firebase.database().ref("roles/" + deviceId).set({
      role: view,
      timestamp: Date.now(),
    });

    if (view==="settings"){
      if (prompt("Passwort eingeben!")!=="1001"){
        goBack();
        return;
      }
    }
  }


  document.getElementById("startView").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");

  if (view === "misterx") {
    document.getElementById("misterxView").style.display = "block";
    showLocationHistory();
  } else if (view === "agent") {
    document.getElementById("agentView").style.display = "block";
    showLocationHistory();
  } else if (view === "settings") {
    document.getElementById("settingsView").style.display = "block";
    load_max_mister_x();
  }

  localStorage.setItem("activeView", view);

  firebase.database().ref("timer").once("value").then(snapshot => {
    const data = snapshot.val();
    if (data) {
      const { startTime, duration, durationInput } = data;
      updateCountdown(startTime, duration);
      updateStartButtonState(true);
    } else {
      updateStartButtonState(false);
    }
  });
};

// Zurück zur Startauswahl
function goBack() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  document.getElementById("startView").style.display = "block";
  clearInterval(countdown);
  localStorage.setItem("activeView","start");
  const deviceId = getDeviceId();
  firebase.database().ref("roles/" + deviceId).set({
    role: "start",
    timestamp: Date.now(),
  });
};

// Timer starten (nur Mister X)
function startTimer() {
  // Hole die gewünschte Dauer aus dem Input, Standard 25 Minuten
  let durationInput = document.getElementById("timerDurationInput");
  let duration = 25 * 60; // fallback: 25 Minuten in Sekunden
  if (durationInput && durationInput.value) {
    duration = parseInt(durationInput.value, 10) * 60;
    if (isNaN(duration) || duration < 1) duration = 60;
  }
  const startTime = Date.now();

  firebase.database().ref("timer").set({
    startTime,
    duration,
    durationInput: duration,
  });
}

// Timer aus Firebase lesen
function listenToTimer() {
  if (timerListenerRegistered) return;
  timerListenerRegistered = true;

  firebase.database().ref("timer").on("value", (snapshot) => {
    const data = snapshot.val();

    if (!data) {
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

    const { startTime, duration, durationInput } = data;
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
      if (remaining <= 300 && remaining > 0) {
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
      alert("Zeit abgelaufen, dein Standort wird einmalig geteilt");
      getLocation();
      }
    }
  , 1000);
}

function setTimerInputFromFirebase(){
  firebase.database().ref("timer").once("value").then(snapshot => {
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
            standortbeschreibung = prompt("Bitte den Standort beschreiben (bzw. wenn U-Bahn, dann gemäß Regelwerk angeben)") || "wurde nicht angegeben!";
            firebase.database().ref("locations").push({
              description: standortbeschreibung.trim(),
              timestamp,
            })
          return;
        }

        firebase.database().ref("locations").push({
          lat,
          lon,
          timestamp,
        });

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

// Foto-Upload
document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    fotoHochgeladen = true;
    document.getElementById("status").innerText = "📸 Foto ausgewählt!";
  }
});

// Beim Laden prüfen
window.onload = () => {
  const savedView = localStorage.getItem("activeView");
  if (savedView && savedView!=="start") {
    switchView(savedView);
  } else {
    document.getElementById("startView").style.display = "block";
  }
  showLocationHistory();
  listenToTimer(); 
  setTimerInputFromFirebase();
  showPermissionButton();
};

function showPermissionButton() {
  if (!localStorage.getItem("nachrichtAktiv")){
    document.getElementById("permissionButton").style.display="block";
  }
}

function deleteAllLocations() {
  if (confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?")) {
    firebase.database().ref("locations").remove().then(() => {
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
      document.getElementById("status").innerText = "";
    });
  }
}

function resetTimer() {
  firebase.database().ref("timer").remove();
  clearInterval(countdown);
  updateStartButtonState(false);

  // Timer-Anzeigen zurücksetzen
  const misterxTimer = document.getElementById("timer");
  const agentTimer = document.getElementById("agentTimer");
  const settingsTimer = document.getElementById("settingsTimer");

  if (misterxTimer) misterxTimer.innerText = "⏳ Zeit bis zum nächsten Posten: --:--";
  if (agentTimer) agentTimer.innerText = "⏳ Mister X Timer: --:--";
  if (settingsTimer) settingsTimer.innerText = "⏳ Aktueller Timer: --:--";
  sendNotification("Timer zurückgesetzt","Der Timer wurde zurückgesetzt!");
}

function save_max_mister_x() {
  const anzahl = document.getElementById("max_Team_X").value;

  const settingsRef = firebase.database().ref("settings");

  // Erst löschen
  settingsRef.child("max_Team_X").remove()
    .then(() => {
      // Dann neuen Wert setzen
      return settingsRef.child("max_Team_X").set(Number(anzahl));
    })
    .then(() => {
      console.log("max_Team_X erfolgreich gespeichert:", anzahl);
    })
    .catch((error) => {
      console.error("Fehler beim Speichern von max_Team_X:", error);
    });
}

function load_max_mister_x() {
  const input = document.getElementById("max_Team_X");

  firebase.database().ref("settings/max_Team_X").once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        input.value = snapshot.val();
        console.log("max_Team_X geladen:", snapshot.val());
      } else {
        console.warn("Kein max_Team_X-Wert gefunden.");
      }
    })
    .catch((error) => {
      console.error("Fehler beim Laden von max_Team_X:", error);
    });
}
