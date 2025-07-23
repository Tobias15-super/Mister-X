let countdown;
let fotoHochgeladen = false;
let timerListenerRegistered = false;
let map;
let marker;
let historyMarkers = [];


function sendLocationWithPhoto() {
  const title = document.getElementById("locationTitle").value;
  const file = document.getElementById("photoInput").files[0];

  if (!title || !file) {
    alert("Bitte Titel und Foto angeben.");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const timestamp = Date.now();

      const storageRef = firebase.storage().ref(`photos/${timestamp}_${file.name}`);
      storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(photoURL => {
          firebase.database().ref("locations").push({
            lat,
            lon,
            timestamp,
            title,
            photoURL
          });
          document.getElementById("locationTitle").value = "";
          document.getElementById("photoInput").value = "";
        });
      });
    }, showError);
  } else {
    alert("Geolocation wird nicht unterstützt.");
  }
}


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
  };
  showLocationHistory();
};

function showLocationHistory() {
  const dbRef = firebase.database().ref("locations");

  dbRef.on("value", snapshot => {
    if (!snapshot.exists()) {
      document.getElementById("map").style.display = "none";
      historyMarkers = [];
      document.getElementById("locationFeed").innerHTML = "";
      return;
    }

    const data = snapshot.val();
    const entries = Object.values(data).sort((a, b) => b.timestamp - a.timestamp); // Neueste zuerst

    document.getElementById("map").style.display = "block";
    const lastEntry = entries[0];
    const lat = lastEntry.lat;
    const lon = lastEntry.lon;

    if (!map) {
      map = L.map('map').setView([lat, lon], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);
    } else {
      map.setView([lat, lon], 15);
    }

    historyMarkers.forEach(marker => map.removeLayer(marker));
    historyMarkers = [];

    const feed = document.getElementById("locationFeed");
    feed.innerHTML = "";

    entries.forEach(loc => {
      const m = L.circleMarker([loc.lat, loc.lon], {
        radius: 5,
        color: "blue"
      }).addTo(map).bindPopup(`📍 ${new Date(loc.timestamp).toLocaleString()}`);
      historyMarkers.push(m);

      if (loc.title && loc.photoURL) {
        const entryDiv = document.createElement("div");
        entryDiv.style.marginBottom = "1em";
        entryDiv.innerHTML = `
          <strong>${loc.title}</strong><br>
          <img src="${loc.photoURL}" alt="Foto" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 5px;">
        `;
        feed.appendChild(entryDiv);
      }
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
};


// Standort abrufen
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
  }
};

function showError(error) {
  document.getElementById("status").innerText = "❌ Fehler beim Abrufen des Standorts.";
};

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
      location.reload(); // Karte neu laden
    });
  }
};


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

