# FAQ-Sektion: Breite wie in der Referenz

## Problem
Die FAQ-Liste nutzt aktuell den vollen Seiten-Container (`max-w-6xl`, ca. 1150 px). In der Referenz stehen die Fragen dagegen in einer schmalen, mittig zentrierten Spalte.

## Änderungen (nur `src/components/landing/sections.tsx`, Funktion `Faq`)

1. **Inhalt zentrieren und begrenzen:** Inneren Wrapper von `max-w-6xl` auf eine schmale, zentrierte Spalte ändern (`mx-auto max-w-[800px]`).
2. **Überschrift mittig:** „Die häufigsten Fragen zum Kreditvergleich" wird wie in der Referenz zentriert (`text-center`).
3. **Akkordeon:** Bleibt innerhalb der schmalen Spalte auf voller Breite – Fragen, Trennlinien und aufklappbare Antworten ändern sich sonst nicht.
4. **Button:** „Zum Hilfe Center" bleibt mittig unter der Liste (bereits zentriert).
5. **Mobil:** Auf dem Handy nimmt die Liste weiterhin die volle Breite mit seitlichem Abstand ein.

## Verifikation
- Typecheck (`bunx tsgo --noEmit`)
- Playwright-Screenshot der FAQ-Sektion (Desktop 1280 px + Mobil), Vergleich mit der Referenz-Breite, keine Konsolenfehler.
