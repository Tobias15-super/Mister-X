// Ansicht wechseln
function switchView(view) {
  document.getElementById("startView").style.display = "none";
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");

  if (view === "misterx") {
    document.getElementById("misterxView").style.display = "block";
  } else if (view === "agent") {
    document.getElementById("agentView").style.display = "block";
    updateAgentTimer();
    setInterval(updateAgentTimer, 1000);
  } else if (view === "settings") {
    document.getElementById("settingsView").style.display = "block";
  }

  localStorage.setItem("activeView", view);
}

function updateAgentTimer() {
  const time = localStorage.getItem("misterxTimer") || "--:--";
  document.getElementById("agentTimer").innerText = `⏳ Mister X Timer: ${time}`;
}


// Zurück zur Startauswahl
function goBack() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
  document.getElementById("startView").style.display = "block";
  clearInterval(countdown);
  localStorage.removeItem("activeView");
}

// Mister X Timer & Standort
let fotoHochgeladen = false;
let countdown;
let remainingTime = 25 * 60;

function startTimer() {
  clearInterval(countdown);
  remainingTime = 25 * 60;
  updateTimerDisplay();

  countdown = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(countdown);
      if (!fotoHochgeladen) {
        console.log("⏰ Zeit abgelaufen - Standort wird gesendet.");
        getLocation();
      } else {
        console.log("✅ Foto wurde hochgeladen - Standort nicht gesendet.");
        fotoHochgeladen = false;
      }
      startTimer();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById("timer").innerText = `⏳ Zeit bis zum nächsten Posten: ${timeString}`;
  localStorage.setItem("misterxTimer", timeString);
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("status").innerText = "Geolocation wird nicht unterstützt.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("status").innerText = `📍 Standort: ${lat}, ${lon}`;
}

function showError(error) {
  document.getElementById("status").innerText = "❌ Fehler beim Abrufen des Standorts.";
}

document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    fotoHochgeladen = true;
    document.getElementById("status").innerText = "📸 Foto ausgewählt!";
    startTimer();
  }
});

// Beim Laden prüfen, ob eine Ansicht gespeichert ist
window.onload = () => {
  const savedView = localStorage.getItem("activeView");
  if (savedView) {
    switchView(savedView);
  } else {
    document.getElementById("startView").style.display = "block";
  }
};
