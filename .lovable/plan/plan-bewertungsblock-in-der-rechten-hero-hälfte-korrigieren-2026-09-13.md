# Plan: Bewertungsblock in der rechten Hero-Hälfte korrigieren

## Ziel
Den Bewertungsblock unter den 3 Schritten optisch korrigieren: Sterne über die Bewertungszahl setzen und 4,9 statt 4,99 anzeigen.

## Änderungen

### 1. Sterne über die Bewertungszahl setzen
- In `src/routes/preisrechner.tsx` innerhalb von `CompactSteps` den Bewertungsblock umbauen.
- Aktuell: Sterne links, Text rechts daneben.
- Neu: Sterne in einer eigenen Zeile oben, darunter in einer zweiten Zeile „4,9 / 5 Sternen“, darunter „Ausgezeichnet“ und „Basierend auf über 33.000 Kundenbewertungen“.
- Layout: vertikale Anordnung (z. B. `flex-col`) mit kleinem Abstand zwischen den Zeilen.

### 2. Bewertung auf 4,9 Sterne ändern
- Angezeigter Wert von „4,99“ auf „4,9“ ändern.
- Sterne-Darstellung anpassen: statt 5 komplett gefüllter Sterne 4 volle Sterne + 1 teilweise gefüllter Stern (ca. 90 %), um 4,9/5 visuell abzubilden.
- Entweder die bestehende `Stars`-Komponente erweitern (fractional/partial fill) oder eine kleine `RatingStars`-Komponente nur für diesen Block erstellen.

## Nicht ändern
- Reihenfolge der Card-Hälften, Schritt-Text, restliche Seite.

## Verifikation
- Build-Log `/tmp/observability/build-errors.log` prüfen.
- Desktop- und Mobile-Screenshot unter `/tmp/browser/preisrechner-rating-fix/` erstellen.
