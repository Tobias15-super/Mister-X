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
