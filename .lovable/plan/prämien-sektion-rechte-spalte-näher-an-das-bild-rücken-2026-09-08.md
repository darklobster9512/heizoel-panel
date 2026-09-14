# Prämien-Sektion: rechte Spalte näher an das Bild rücken

## Ziel
In der Desktop-Ansicht der "Freunde werben"-Sektion soll die rechte Text-Spalte (Überschrift, Text, Button) näher an das Mann-Foto heranrücken, damit der Abstand zwischen Bild und Inhalt kleiner wird und das Layout dem Referenz-Screenshot entspricht.

## Änderungen
1. In `src/components/landing/sections.tsx` in der `ReferralBanner`-Komponente den Desktop-Grid-Abstand verringern (`gap-8` → `gap-0` oder `gap-2`) bzw. die rechte Spalte mit negativem Margin/links-Padding näher an das Bild ziehen.
2. Die maximale Breite des Textblocks (`max-w-[540px]`) beibehalten, aber horizontal weiter nach links verschieben, sodass er optisch näher am Bild sitzt.
3. Button bleibt linksbündig ausgerichtet, weißer Text und Schatten bleiben erhalten.
4. Mobile Layout unverändert lassen.

## Validierung
- Typecheck ausführen.
- Playwright-Screenshot der Sektion in Desktop-Ansicht prüfen: Abstand zwischen Foto und Text ist deutlich kleiner als aktuell, ohne dass Text über das Bild ragt.
