# Mister-X

## Mitgliederverwaltung (neu)

Es gibt jetzt eine **Mitgliederverwaltung** im Settings-Bereich (öffnen: "Mitgliederverwaltung").

Funktionen:
- Liste aller Spieler aus RTDB `roles/` anzeigen
- Sortieren, Suche, CSV-Export ✅
- Per-Spieler-Toggles: **SMS-Fallback**, **Instant-SMS**, **Benachrichtigungen** ✅
- Spieler ausblenden (lokal), ausgeblendete wieder anzeigen ✅
- Spieler löschen, Telefonnummer entfernen (mit Bestätigung) ✅

Hinweis: Ausgeblendete Spieler werden lokal im `localStorage` unter `hiddenMembers` gespeichert; Änderungen an Rollen/Tel werden in RTDB geschrieben.
