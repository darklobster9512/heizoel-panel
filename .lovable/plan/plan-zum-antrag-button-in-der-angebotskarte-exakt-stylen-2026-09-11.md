# Plan: „zum Antrag"-Button in der Angebotskarte exakt stylen

## Ziel
Der „zum Antrag"-Button innerhalb der Bankkarte auf `/angebote` soll exakt dem übergebenen CSS entsprechen:

- `display: inline-flex; align-items: center; justify-content: center`
- `position: relative; box-sizing: border-box`
- `cursor: pointer; user-select: none; vertical-align: middle; appearance: none`
- `font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif`
- `min-width: 64px`
- `color: rgb(255, 255, 255)`
- `background-color: rgb(57, 169, 73)`
- `box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px`
- `width: 100%`
- `text-transform: initial`
- `font-size: 14px; font-weight: 500; line-height: 22px`
- `padding: 8px`
- `outline: 0; border-width: 0`
- `margin: 0 0 16px`
- `text-decoration: none`
- `transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)`

## Betroffene Datei
- `src/routes/angebote.tsx` (Zeilen 310–319, Button in der rechten Spalte der Angebotskarte)

## Technische Umsetzung
1. Das `<button>`-Element in der rechten Spalte der Angebotskarte erhält einen neuen Klassen-String, der alle oben genannten Werte abbildet.
2. Tailwind-Utilities werden bevorzugt; für exotische Werte (box-shadow, transition-Timing, appearance, user-select) werden Inline-Stile oder Arbitrary-Utilities verwendet.
3. Der Chevron-Pfeil bleibt erhalten; ggf. Abstand an `gap-2` anpassen.
4. Keine Änderungen am zweiten „zum Antrag"-Button im Detail-Panel.

## Validierung
- Playwright-Screenshot der `/angebote`-Seite
- Visuelle Kontrolle, dass Button kleiner, flacher und mit MUI-ähnlichem Schatten dargestellt wird
