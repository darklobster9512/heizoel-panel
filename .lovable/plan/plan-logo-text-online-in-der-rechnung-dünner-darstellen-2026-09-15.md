# Plan: Logo-Text „Online“ in der Rechnung dünner darstellen

## Ziel
In der Rechnungsvorschau (HTML) und im generierten Rechnungs-PDF soll der Wortteil „Online“ im Shopnamen des Fallback-Logos deutlich dünner erscheinen als der Rest. Hochgeladene Logobilder bleiben unverändert.

## Betroffene Dateien
- `src/lib/invoice/invoice-html.ts` — Logo-Block der HTML-Rechnung
- `src/lib/invoice/invoice-pdf.server.ts` — Fallback-Logo im PDF

## Durchführung
1. In `invoice-html.ts`:
   - Hilfsfunktion ergänzen, die einen Shopnamen bei Vorkommen von „Online" (case-insensitive) in Präfix und „Online" aufteilt.
   - Präfix weiter fett (`font:700`) rendern, „Online" in einem `<span>` mit `font-weight:300`.
   - Keine Änderung, wenn der Name kein „Online" enthält.

2. In `invoice-pdf.server.ts`:
   - Im `else`-Zweig des Fallback-Logos (Rechteck-Flagge + Text) den Shopnamen ebenfalls aufteilen.
   - Präfix mit `ctx.bold` zeichnen, anschließend „Online" mit `ctx.regular` an derselben Grundlinie fortführen.
   - Breite des Präfixes via `ctx.bold.widthOfTextAtSize` berechnen, um die x-Position für „Online" zu ermitteln.

## Validierung
- `bunx tsgo --noEmit` läuft sauber.
- Build-Fehler-Log wird auf leere Fehler geprüft.
