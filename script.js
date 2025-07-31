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

try {
  localStorage.setItem("test", "1");
} catch (e) {
  alert("⚠️ Dein Browser blockiert lokalen Speicher. Bitte verlasse den privaten Modus oder ändere die Einstellungen.");
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


function removeNotificationSetup() {
  // Token aus Firebase entfernen
  messaging.getToken({
    vapidKey: "BPxoiPhAH4gXMrR7PhhrAUolApYTK93-MZ48-BHWF0rksFtkvBwE9zYUS2pfiEw6_PXzPYyaQZdNwM6LL4QdeOE"
  }).then((currentToken) => {
    if (currentToken) {
      const deviceId = getDeviceId();
      firebase.database().ref("tokens/" + deviceId).remove();
      console.log("Token aus Firebase entfernt:", currentToken);
    }

    // Token lokal löschen
    messaging.deleteToken(currentToken).then(() => {
      console.log("Token gelöscht.");
    }).catch((err) => {
      console.error("Fehler beim Löschen des Tokens:", err);
    });

    // Lokale Einstellungen zurücksetzen
    localStorage.removeItem("nachrichtAktiv");
    document.getElementById("permissionButton").style.display = "block";
  });

  // Service Worker abmelden
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          alert("Service Worker abgemeldet.");
        }
      });
    }
  });
}


// Nachrichten empfangen, wenn Seite offen ist
messaging.onMessage((payload) => {
  console.log("Nachricht empfangen:", payload);
  const { title, body } = payload.notification;
  alert(`${title}\n${body}`);
});

async function sendNotificationToTokens(title, body, tokens = [], attempt = 1, maxAttempts = 30) {
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
      sendNotificationToTokens(title, body, result.failedTokens, attempt + 1, maxAttempts);
    }, 10000);
  } else if (attempt >= maxAttempts) {
    console.warn("⏱️ Max. Anzahl an Versuchen erreicht.");
  } else {
    console.log("✅ Alle Benachrichtigungen erfolgreich gesendet.");
  }
}

async function sendNotificationToRoles(title, body, roles) {
  const rolesSnapshot = await firebase.database().ref("roles").once("value");
  const tokensSnapshot = await firebase.database().ref("tokens").once("value");

  const rolesData = rolesSnapshot.val();
  const tokensData = tokensSnapshot.val();

  const matchingTokens = new Set();

  // Wenn "all" übergeben wurde, alle Tokens nehmen
  if (roles === "all" || (Array.isArray(roles) && roles.includes("all"))) {
    for (const userId in tokensData) {
      matchingTokens.add(tokensData[userId]);
    }
  } else {
    const roleList = Array.isArray(roles) ? roles : [roles];

    for (const userId in rolesData) {
      const userRole = rolesData[userId]?.role;
      if (roleList.includes(userRole) && tokensData[userId]) {
        matchingTokens.add(tokensData[userId]);
      }
    }
  }

  if (matchingTokens.size === 0) {
    console.warn(`⚠️ Keine passenden Tokens für Rollen "${roles}" gefunden.`);
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
      console.error("Upload-Fehler:", error);
      alert("Fehler beim Hochladen zu Cloudinary.");
    });
}

function sendLocationWithPhoto() {
  const title = document.getElementById("locationTitle").value;
  const file = document.getElementById("photoInput").files[0];
  const manualDescription = document.getElementById("manualLocationDescription").value.trim();
  const manualContainer = document.getElementById("manualLocationContainer");

  if (!title || !file) {
    alert("Bitte Titel und Foto angeben.");
    return;
  }

  const timestamp = Date.now();

  // Prüfen, ob Standortbeschreibung sichtbar ist und ausgefüllt wurde
  if (manualContainer && manualContainer.style.display !== "none" && manualDescription !== "") {
    // Nur Beschreibung speichern, kein GPS
    const locationData = {
      title,
      description: manualDescription,
      timestamp
    };

    const newRef = firebase.database().ref("locations").push(locationData);

    // Benachrichtigung senden
    const notificationText = title + " – " + manualDescription;
    sendNotificationToRoles("Mister X hat sich gezeigt!", notificationText, "agent");

    // Bild im Hintergrund hochladen
    uploadToCloudinary(file, ({ url }) => {
      newRef.update({ photoURL: url });
    });

    // Reset UI
    document.getElementById("locationTitle").value = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("manualLocationDescription").value = "";
    manualContainer.style.display = "none";
    document.getElementById("status").innerText = "✅ Standort/Foto erfolgreich gesendet!";

    startTimer();
    return;
  }

  // Sonst wie bisher: GPS verwenden
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const accuracy = position.coords.accuracy;
        if (accuracy > 100) {
          document.getElementById("status").innerText =
            `⚠️ Standort ungenau (±${Math.round(accuracy)} m). Bitte erneut versuchen oder Standortbeschreibung eingeben.`;
          manualContainer.style.display = "block";
          return;
        }

        saveLocation(position.coords.latitude, position.coords.longitude, manualDescription);
      },
      error => {
        showError(error);
        manualContainer.style.display = "block";
        saveLocation(null, null, manualDescription);
      }
    );
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
    manualContainer.style.display = "block";
    saveLocation(null, null, manualDescription);
  }
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
  // 1. max_Team_X auslesen
  const maxSnapshot = await firebase.database().ref("settings/max_Team_X").once("value");
  const maxMisterX = maxSnapshot.exists() ? maxSnapshot.val() : 1;

  // 2. Rollen auslesen
  const rolesSnapshot = await firebase.database().ref("roles").once("value");
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
  } else if (view === "agent") {
    document.getElementById("agentView").style.display = "block";
    showLocationHistory();
  } else if (view === "settings") {
    document.getElementById("settingsView").style.display = "block";
    load_max_mister_x();
  }

  localStorage.setItem("activeView", view);
      const deviceId = getDeviceId();
    firebase.database().ref("roles/" + deviceId).set({
      role: view,
      timestamp: Date.now(),
    });
    const role = view
    await supabaseClient
    .from("fcm_tokens")
    .update({ role })
    .eq("device_name", deviceId);

  firebase.database().ref("timer").once("value").then(snapshot => {
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
  firebase.database().ref("roles/" + deviceId).set({
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
  const timerRef = firebase.database().ref("timer");

  // 1. Vorherige Timer-Daten löschen
  await timerRef.child("duration").remove();
  await timerRef.child("startTime").remove();
  await firebase.database().ref("timerMessage").remove();

  // 2. Vorherigen Upstash-Timer abbrechen
  const scheduleIdSnapshot = await firebase.database().ref("timerScheduleId").once("value");
  const scheduleId = scheduleIdSnapshot.val();
  if (scheduleId) {
    await fetch(`https://qstash.upstash.io/v2/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"
      }
    });
    await firebase.database().ref("timerScheduleId").remove();
  }

  // 3. Lokalen Countdown stoppen
  if (typeof countdown !== "undefined") {
    clearInterval(countdown);
  }

  // 4. Neue Dauer auslesen
  const snapshot = await timerRef.once("value");
  const data = snapshot.val();

  let durationInput = Math.floor(data?.durationInput);
  let duration = 25 * 60; // fallback: 25 Minuten in Sekunden
  if (typeof data?.durationInput === "number" && data.durationInput > 0) {
    duration = data.durationInput;
    if (isNaN(duration) || duration < 1) duration = 60;
  }

  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  // 5. Nachricht definieren
  const message = {
    title: "⏰ Zeit abgelaufen!",
    body: "Mister X muss sich zeigen!",
    roles: ["misterx"]
  };

  // 6. Neue Timer-Daten speichern
  await timerRef.set({
    startTime,
    duration,
    durationInput: duration
  });
  await firebase.database().ref("timerMessage").set(message);

  // 7. Upstash-Timer planen
  const response = await fetch("https://qstash.upstash.io/v2/schedules", {
    method: "POST",
    headers: {
      "Authorization": "Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0=",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      destination: "https://axirbthvnznvhfagduyj.supabase.co/functions/v1/send-timer-message",
      delay: endTime - Date.now(),
      body: JSON.stringify({ timerId: "main" })
    })
  });

  const result = await response.json();
  const newScheduleId = result.scheduleId;
if (newScheduleId) {
  await firebase.database().ref("timerScheduleId").set(newScheduleId);
} else {
  console.error("Kein ScheduleId von QStash erhalten:", result);
}
}



// Timer aus Firebase lesen
function listenToTimer() {
  if (timerListenerRegistered) return;
  timerListenerRegistered = true;

  firebase.database().ref("timer").on("value", (snapshot) => {
    const data = snapshot.val();
    const { startTime, duration, durationInput } = data;

    if (!startTime) {
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
    document.getElementById("startView2").style.display = "block";
  }
  showLocationHistory();
  listenToTimer(); 
  setTimerInputFromFirebase();
  showButtons();
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

async function resetTimer() {
  const timerRef = firebase.database().ref("timer");

  // Timer-Daten löschen
  await timerRef.child("duration").remove();
  await timerRef.child("startTime").remove();

  // Upstash-Timer abbrechen, falls vorhanden
  const scheduleIdSnapshot = await firebase.database().ref("timerScheduleId").once("value");
  const scheduleId = scheduleIdSnapshot.val();

  if (scheduleId) {
    await fetch(`https://qstash.upstash.io/v2/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJVc2VySUQiOiI3YjAxMDFmYi04MGE2LTRmMjAtOWM0MS0zNzZiNDUxNmNkOWQiLCJQYXNzd29yZCI6IjYyM2ZhNzlmOWM4MDRhMzQ5YmE2NjZmYjFlMDExNDBjIn0"
      }
    });
    await firebase.database().ref("timerScheduleId").remove();
  }

  // Nachricht löschen
  await firebase.database().ref("timerMessage").remove();

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

function save_timer_duration() {
  const anzahl = document.getElementById("timerDurationInput").value;
  const anzahl_in_sekunden = anzahl * 60

  const settingsRef = firebase.database().ref("timer");

  // Erst löschen
  settingsRef.child("durationInput").remove()
    .then(() => {
      // Dann neuen Wert setzen
      return settingsRef.child("durationInput").set(Number(anzahl_in_sekunden));
    })
    .then(() => {
      console.log("Duration_input:", anzahl_in_sekunden);
    })
    .catch((error) => {
      console.error("Fehler beim Speichern von DurationInput:", error);
    });
}