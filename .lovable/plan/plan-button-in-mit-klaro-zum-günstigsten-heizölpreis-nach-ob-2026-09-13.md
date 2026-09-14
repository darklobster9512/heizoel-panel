# Plan: Button in „Mit Klaro zum günstigsten Heizölpreis" nach oben verschieben

## Ziel
In der Sektion „Mit Klaro zum günstigsten Heizölpreis" (Komponente `MatchingOffers` in `src/components/landing/sections.tsx`) soll der CTA-Button „Jetzt Heizölpreise vergleichen" weiter nach oben rücken, damit mehr Abstand zum unteren Sektionsrand entsteht.

## Vorgehen
1. `MatchingOffers` anpassen:
   - Den oberen Abstand des Button-Containers (`mt-10 md:mt-[66px]`) verkleinern, z. B. auf `mt-8 md:mt-10`.
   - Optional den unteren Innenabstand der Textspalte (`pb-...`) erhöhen, falls nötig, um den gewünschten Abstand zum unteren Rand sauber zu halten.
   - Sicherstellen, dass das Layout auf Desktop und Mobile weiterhin ausgewogen wirkt und das Bild links nicht überlappt.

2. Validierung:
   - Build-Log prüfen.
   - Preview-Screenshot der Sektion erstellen, um den neuen Abstand zu verifizieren.

## Nicht im Scope
- Keine Änderungen an Inhalt, Link-Ziel oder Button-Styling.
- Keine Änderungen an anderen Sektionen.
