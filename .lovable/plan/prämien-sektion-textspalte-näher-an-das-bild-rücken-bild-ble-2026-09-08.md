# Prämien-Sektion: Textspalte näher an das Bild rücken (Bild bleibt)

## Ziel
In der Desktop-Ansicht der "Freunde werben"-Sektion soll das Mann-Foto an seiner ursprünglichen Position bleiben. Stattdessen wird die rechte Textspalte (Überschrift, Text, Button) nach links verschoben, sodass sie näher am Bild sitzt.

## Änderungen
1. In `src/components/landing/sections.tsx` in der `ReferralBanner`-Komponente das Bild wieder auf die ursprüngliche Position zurücksetzen: `left-[40px] h-[350px]`.
2. Das Desktop-Grid von `grid-cols-2 gap-8` beibehalten oder geringfügig anpassen, damit die Spalten nahe beieinander bleiben.
3. Die rechte Spalte mit negativem linken Margin (`-ml-12` bis `-ml-20`) oder reduziertem Padding näher an das Bild ziehen, sodass der Text optisch näher am Foto endet, ohne es zu überdecken.
4. Die maximale Textbreite (`max-w-[540px]`) beibehalten, damit der Text nicht zu breit wird.
5. Button bleibt linksbündig, weißer Text und Schatten bleiben erhalten.
6. Mobile Layout unverändert lassen.

## Validierung
- Typecheck ausführen.
- Playwright-Screenshot der Sektion in Desktop-Ansicht prüfen: Bild steht wieder links wie ursprünglich, Text ist deutlich näher am Bild, keine Überdeckung des Mannes.
