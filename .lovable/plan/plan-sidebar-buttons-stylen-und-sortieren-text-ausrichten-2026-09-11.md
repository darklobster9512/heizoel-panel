# Plan: Sidebar-Buttons stylen und Sortieren-Text ausrichten

## Ziel
1. Die beiden grünen „zum Antrag"-Buttons in der rechten Detail-Sidebar sollen exakt dem übergebenen CSS entsprechen.
2. Die Zeile „Sortieren: 1 monatliche Rate" oben rechts soll rechtsbündig zentriert ausgerichtet werden, sodass sie vertikal mit dem rechten Rand der darunter liegenden Angebotskarte abschließt.

## Umsetzung

### 1. Sidebar-Buttons stylen (`src/routes/angebote.tsx`)
- Beide „zum Antrag"-Buttons innerhalb der Sidebar (Kopfzeile und Fußbereich) erhalten denselben CSS-String:
  - `display: inline-flex; align-items: center; justify-content: center`
  - `position: relative; box-sizing: border-box`
  - `cursor: pointer; user-select: none; vertical-align: middle; appearance: none`
  - `font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif`
  - `min-width: 64px`
  - `color: rgb(255, 255, 255)`
  - `background-color: rgb(57, 169, 73)`
  - MUI-ähnlicher `box-shadow: rgba(0,0,0,0.2) 0px 3px 1px -2px, rgba(0,0,0,0.14) 0px 2px 2px 0px, rgba(0,0,0,0.12) 0px 1px 5px 0px`
  - `text-transform: initial`
  - `font-size: 14px; font-weight: 500; line-height: 22px`
  - `outline: 0; border-width: 0`
  - `margin: 0px`
  - `text-decoration: none`
  - `transition` wie angegeben
  - `border-radius: 2px`
  - `padding: 16px 50px`
- Tailwind-Utilities werden bevorzugt, exotische Werte (Schatten, Transition, user-select, appearance) via Inline-Style oder Arbitrary-Utilities.

### 2. Sortieren-Text rechts ausrichten
- In `src/routes/angebote.tsx` den Container für „Sortieren: 1 monatliche Rate" so anpassen, dass er rechtsbündig ist und mit der rechten Kante der Bankkarte abschließt.
- Lösungsansatz: Flex-Container in der oberen Zeile mit `justify-between` oder `justify-end`, ggf. mit einem Wrapper, der dieselbe maximale Breite wie die Card hat (z. B. `max-w-[860px]` o. Ä.), damit die rechte Ausrichtung mit dem Card-Ende übereinstimmt.
- Auf Mobilansicht darf die Ausrichtung nicht brechen (dort sinnvoll verhalten).

## Validierung
- Playwright-Screenshot der `/angebote`-Seite mit geöffneter Sidebar.
- Visuelle Kontrolle: Kopf- und Fuß-Button sehen identisch aus und passen zum gewünschten MUI-Stil.
- Kontrolle: „Sortieren: 1 monatliche Rate" endet rechts bündig mit der Card.
