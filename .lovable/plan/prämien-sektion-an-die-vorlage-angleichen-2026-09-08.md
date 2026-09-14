# Prämien-Sektion an die Vorlage angleichen

Der Aufbau stimmt, aber die Abstände und Größen weichen ab.

## Änderungen

- Zwischen dem grauen Block „Vertrauen Sie auf smava“ und dem Prämien-Streifen liegt ein deutlich höherer weißer Zwischenraum (rund 150 px statt aktuell 42 px).
- Das Foto ist größer und ragt weiter nach oben in den weißen Bereich: Höhe rund 350 px statt 380 px im flacheren Band, unten bündig mit der Unterkante des grauen Streifens.
- Der graue Streifen wird höher (rund 290 px), damit Überschrift, Text und Button mittig darin sitzen wie in der Vorlage.
- Foto etwas weiter links positioniert, Textspalte startet auf gleicher Höhe wie in der Vorlage.
- Handy-Ansicht bleibt unverändert gestapelt.

## Technisches

Nur `ReferralBanner()` in `src/components/landing/sections.tsx`: Höhe des weißen Vorlaufs, Bandhöhe, Bildhöhe und horizontaler Versatz anpassen. Anschließend Screenshot-Vergleich mit der Vorlage.
