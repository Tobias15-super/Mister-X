let fotoHochgeladen = false;
let countdown; // für das Intervall
let remainingTime = 25 * 60; // 25 Minuten in Sekunden

// Timer starten
function startTimer() {
  clearInterval(countdown); // alten Timer stoppen
  remainingTime = 25 * 60;
  updateTimerDisplay();

  countdown = setInterval(() => {
    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      clearInterval(countdown);
      if (!fotoHochgeladen) {
        console.log("⏰ Zeit abgelaufen – Standort wird gesendet.");
        getLocation();
      } else {
        console.log("✅ Foto wurde hochgeladen – Standort nicht gesendet.");
        fotoHochgeladen = false;
      }
      startTimer(); // Timer neu starten
    }
  }, 1000);
}

// Anzeige aktualisieren
function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById("timer").innerText =
    `⏳ Zeit bis zum nächsten Posten: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Foto-Upload
document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    fotoHochgeladen = true;
    document.getElementById("status").innerText = "📸 Foto ausgewählt!";
    startTimer(); // Timer neu starten
  }
});

// Seite lädt → Timer starten
window.onload = startTimer;




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
  document.getElementById("status").innerText = `Standort: ${lat}, ${lon}`;
  // Hier kannst du später den Standort speichern oder senden
}

function showError(error) {
  document.getElementById("status").innerText = "Fehler beim Abrufen des Standorts.";
}

document.getElementById("photoInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    document.getElementById("status").innerText = "Foto ausgewählt!";
    // Hier kannst du später das Foto speichern oder anzeigen
  }
});
