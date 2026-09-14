# Plan: Rate-Label und Rate-Zahl in der Angebotskarte exakt stylen

## Ziel
In der Angebotskarte auf `/angebote` sollen das „mtl. Rate"-Label und die monatliche Rate (z. B. „160,84 €") exakt dem übergebenen CSS entsprechen.

### „mtl. Rate"-Label
- `margin: 0px`
- `font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif`
- `font-size: 0.75rem`
- `font-weight: 400`
- `letter-spacing: 0.03rem`
- `line-height: 1.25rem`
- `color: rgb(132, 132, 132)`

### Rate-Zahl (z. B. „160,84 €")
- `margin: 0px`
- `font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif`
- `font-size: 1rem`
- `letter-spacing: 0rem`
- `line-height: 1.5rem`
- `font-weight: 600`

## Betroffene Datei
- `src/routes/angebote.tsx` (Zeilen 303–306, rechte Spalte der Angebotskarte)

## Technische Umsetzung
1. Das `<p>`-Element für die Rate-Zahl erhält die exakten CSS-Werte (Schriftgröße, Gewicht, Zeilenhöhe, Abstand).
2. Das darunter liegende `<p>`-Element für „mtl. Rate" erhält die exakten Label-Werte.
3. Beide Elemente behalten ihre aktuelle Position innerhalb der Karte bei.
4. Tailwind-Utilities werden dort verwendet, wo sie passen; exakte Werte (letter-spacing, line-height) werden als Arbitrary-Utilities oder Inline-Stile umgesetzt.

## Validierung
- Playwright-Screenshot der `/angebote`-Seite
- Visuelle Kontrolle, dass Label kleiner/grauer und Zahl 16px/semi-bold dargestellt wird
