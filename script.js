let countdown;
let fotoHochgeladen = false;
let timerListenerRegistered = false;
let map;
let marker;
let historyMarkers = [];

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const timestamp = Date.now();
  
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
    marker.setLatLng([lat, lon]);
  }
}

function showLocationHistory() {
  historyMarkers.forEach(marker => map.removeLayer(marker));
  historyMarkers = []
  firebase.database().ref("locations").once("value").then(snapshot => {
    const data = snapshot.val();
    if (!data) return;

    Object.values(data).forEach(loc => {
      const m= L.circleMarker([loc.lat, loc.lon], {
        radius: 5,
        color: "blue"
      }).addTo(map).bindPopup(`📍 ${new Date(loc.timestamp).toLocaleString()}`);
      historyMarkers.push(m);
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
}

// Zurück zur Startauswahl
function goBack() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  document.getElementById("startView").style.display = "block";
  clearInterval(countdown);
  localStorage.removeItem("activeView");
}

// Timer starten (nur Mister X)
function startTimer() {
  const startTime = Date.now();
  const duration = 25 * 60; // 25 Minuten in Sekunden

  firebase.database().ref("timer").set({
    startTime,
    duration
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

    const { startTime, duration } = data;
    updateCountdown(startTime, duration);
    updateStartButtonState(true);
  });
}



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
    const settingsTimer = document.getElementById("settingsTimer");
    if (settingsTimer) {
      settingsTimer.innerText = `⏳ Aktueller Timer: ${timeString}`;
    }

    // Beide Timer-Elemente aktualisieren, wenn vorhanden
    const misterxTimer = document.getElementById("timer");
    const agentTimer = document.getElementById("agentTimer");

    if (misterxTimer) {
      misterxTimer.innerText = `⏳ Zeit bis zum nächsten Posten: ${timeString}`;
    }
    if (agentTimer) {
      agentTimer.innerText = `⏳ Mister X Timer: ${timeString}`;
    }

    if (remaining <= 0) {
      clearInterval(countdown);
      updateStartButtonState(false); // Timer ist abgelaufen
      console.log("⏰ Zeit abgelaufen!");
      if (!fotoHochgeladen) {
        getLocation();
      } else {
        fotoHochgeladen = false;
      }
    }
  }, 1000);
}


// Standort abrufen
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
  }
}

function showError(error) {
  document.getElementById("status").innerText = "❌ Fehler beim Abrufen des Standorts.";
}

function updateStartButtonState(isRunning) {
  const startButton = document.getElementById("startTimerButton");
  if (startButton) {
    startButton.disabled = isRunning;
    startButton.style.opacity = isRunning ? "0.5" : "1";
    startButton.style.pointerEvents = isRunning ? "none" : "auto";
    startButton.style.cursor = isRunning ? "default" : "pointer";
  }
}





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

  listenToTimer();
};

function deleteAllLocations() {
  if (confirm("Möchtest du wirklich alle gespeicherten Standorte löschen?")) {
    firebase.database().ref("locations").remove().then(() => {
      alert("Alle Standorte wurden gelöscht.");
      location.reload(); // Karte neu laden
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

