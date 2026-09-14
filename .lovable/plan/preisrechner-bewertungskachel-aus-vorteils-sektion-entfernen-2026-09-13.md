# `/preisrechner`: Bewertungskachel aus Vorteils-Sektion entfernen

## Ziel
Die Bewertungskachel („4,99 / 5 Sternen · Ausgezeichnet · Basierend auf über 33.000 Kundenbewertungen“) aus der „Warum bei Klaro bestellen?“-Sektion entfernen, da die Sektion sonst zu viele Elemente enthält.

## Änderungen

### 1. `src/routes/preisrechner.tsx`
- Die 6. Kachel (Bewertung) wird aus dem Grid unterhalb der Hero-Card entfernt.
- Die 5 verbleibenden Vorteils-Kacheln bleiben unverändert.
- Das Grid-Layout wird an 5 statt 6 Elemente angepasst:
  - Desktop: 5 gleichmäßige Spalten,
  - Tablet: 3 Spalten in der ersten Reihe, 2 in der zweiten,
  - Mobile: 2 Spalten, dann 1 Spalte in der letzten Reihe.

### 2. Keine weiteren Änderungen
- Keine Änderungen an Inhalten, Icons oder Texten der verbleibenden 5 Kacheln.
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard`, `/admin` oder der Startseite.
- Keine Backend-/Antragsstrecken-Änderungen.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite, um zu prüfen, dass nur noch 5 Kacheln angezeigt werden.
