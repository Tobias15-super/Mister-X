let countdown;
let fotoHochgeladen = false;
let timerListenerRegistered = false;
let map;
let marker;
let historyMarkers = [];




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
        callback({url: data.secure_urlm, publicId: data.public_id}); // Bild-URL zurückgeben
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

  uploadToCloudinary(file, (photoURL) => {
    firebase.database().ref("locations").push({
      lat,
      lon,
      title,
      photoURL: url,
      publicId: publicId,
      description,
      timestamp
    });

    // Reset UI
    document.getElementById("locationTitle").value = "";
    document.getElementById("photoInput").value = "";
    document.getElementById("manualLocationDescription").value = "";
    document.getElementById("manualLocationContainer").style.display = "none";
    document.getElementById("status").innerText = "✅ Standort/Foto erfolgreich gesendet!";
  });
};



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
      const entryDiv = document.createElement("div");
      entryDiv.style.marginBottom = "1em";
      entryDiv.innerHTML = `
        <strong>${loc.title}</strong><br>
        ${loc.description ? `<em>📍 ${loc.description}</em><br>` : ""}
        <img src="${loc.photoURL}" alt="Foto" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 5px;">
      `;
      feed.appendChild(entryDiv);
    });
  });
}





// Ansicht wechseln
function switchView(view) {
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
  }

  localStorage.setItem("activeView", view);

  firebase.database().ref("timer").once("value").then(snapshot => {
    const data = snapshot.val();
    if (data) {
      const { startTime, duration } = data;
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
  localStorage.removeItem("activeView");
};

// Timer starten (nur Mister X)
function startTimer() {
  const startTime = Date.now();
  const duration = 25 * 60; // 25 Minuten in Sekunden

  firebase.database().ref("timer").set({
    startTime,
    duration
  });
};

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

    const { startTime, duration } = data;
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

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

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
      if (!fotoHochgeladen) {
        getLocation();
      } else {
        fotoHochgeladen = false;
      }
    }
  }, 1000);
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
            "⚠️ Standort ungenau (±" + Math.round(accuracy) + " m). Bitte erneut versuchen oder Standortbeschreibung manuell eingeben.";
          return;
        }

        firebase.database().ref("locations").push({
          lat,
          lon,
          timestamp
        });

        if (!map) {
          map = L.map('map').setView([lat, lon], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
          }).addTo(map);
        } else {
          map.setView([lat, lon], 15);
        }

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
  if (savedView) {
    switchView(savedView);
  } else {
    document.getElementById("startView").style.display = "block";
  }
  showLocationHistory();
  listenToTimer(); 
};

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
}