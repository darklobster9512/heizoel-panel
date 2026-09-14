# Plan: Button-Hover langsamer

Ziel
- Der Hintergrundfarbwechsel aller grünen Buttons auf `#39a949` → `#1b5426` soll sanfter und etwas langsamer wirken.

Vorgehen
1. In `src/components/ui/button.tsx` (oder der zentralen Button-Variante) den `transition`/`duration` Wert für Hover-Hintergrund und Text anpassen.
2. Aktuell wird vermutlich `duration-200` oder Tailwind-Default verwendet. Auf `duration-300` oder `transition-colors duration-300 ease-in-out` setzen, damit der Farbwechsel spürbar langsamer ist.
3. Sicherstellen, dass nur der Hover-Übergang betroffen ist, nicht andere Animationen (Fade, Slide etc.).
4. Build/Typecheck und Playwright-Check (Desktop + Mobil) laufen lassen, um sicherzustellen, dass keine Seiteneffekte entstehen.

Akzeptanzkriterien
- Buttons wechseln ihre Hintergrundfarbe beim Hover merklich langsamer als zuvor.
- Keine Fehler im Build oder in der Vorschau.
