# Plan: „Kostenlose Sondertilgung" exakt per CSS-Regel stylen

## Ziel
Der Text „Kostenlose Sondertilgung" in der Bankkarte auf `/angebote` soll exakt dem übergebenen CSS entsprechen:

- `font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif`
- `font-size: 10px`
- `font-weight: 500`
- `letter-spacing: 1.5px`
- `line-height: 1.5rem`
- `color: rgb(50, 50, 50)`
- `text-transform: uppercase`
- `display: flex; align-items: center`
- `margin: 0`

## Betroffene Datei
- `src/routes/angebote.tsx` (Zeile ~294, Textzeile innerhalb der Angebotskarte)

## Technische Umsetzung
1. Das `<p>`-Element, das „Kostenlose Sondertilgung" rendert, erhält einen Inline- oder Utility-basierten Stil, der die oben genannten Werte setzt.
2. Mögliche Umsetzung: eine Tailwind-Kombination aus `font-['Roboto',...]`, `text-[10px]`, `font-medium`, `tracking-[1.5px]`, `leading-[1.5rem]`, `text-[#323232]`, `uppercase`, `flex`, `items-center`, `m-0`.
3. Der Haken (`<Check />`) und der Abstand dazu bleiben erhalten.
4. Keine weiteren Text- oder Layoutänderungen.

## Validierung
- Playwright-Screenshot der `/angebote`-Seite
- Visuelle Kontrolle, dass der Text kleiner und dünner dargestellt wird
