# Plan: /preisrechner/ergebnis noch kompakter

## Ziel
Die Angebotsseite `/preisrechner/ergebnis` soll noch schmaler und kompakter wirken.

## Änderungen

1. **Hauptcontainer weiter verkleinern**
   - `max-w-3xl` → `max-w-2xl` (ca. 672 px) für den Content-Bereich.
   - Header-Titel-Container ebenfalls auf `max-w-2xl` anpassen, damit es bündig bleibt.
   - Vorteile-Sektion ebenfalls auf `max-w-2xl`.

2. **Zahlungsarten an schmale Breite anpassen**
   - Aktuell 4 Spalten (`sm:grid-cols-4`) in der Angebotskarte.
   - Auf 2 Spalten (`grid-cols-2`) umstellen, damit die Karten bei schmalem Container nicht zu klein/gedrängt wirken.

3. **Vorteile-Sektion kompakter**
   - Bei `max-w-2xl` wirken 2 Spalten noch okay, aber die Karten sollten etwas kompakter sein.
   - Padding der Vorteilskarten leicht reduzieren (`px-5 py-5` → `px-4 py-4`).
   - Icon-Größe beibehalten oder leicht reduzieren.

4. **Allgemeine Kompaktheit**
   - Padding des Hauptcontainers prüfen (`px-5 py-8 md:py-10`) → ggf. auf `px-4 py-6 md:py-8` reduzieren.
   - Abstände zwischen den Sektionen prüfen (`mt-6` etc.) → ggf. auf `mt-5` reduzieren.

## Akzeptanzkriterien
- Die Seite wirkt deutlich kompakter als vorher.
- Zahlungsarten sind bei der schmalen Breite gut lesbar.
- Vorteile-Sektion wirkt nicht mehr zu groß.
- Build läuft fehlerfrei.
