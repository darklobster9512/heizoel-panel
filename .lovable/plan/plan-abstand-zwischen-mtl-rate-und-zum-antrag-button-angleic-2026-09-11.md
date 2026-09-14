# Plan: Abstand zwischen „mtl. Rate" und „zum Antrag"-Button angleichen

## Ziel
Der vertikale Abstand zwischen dem „mtl. Rate"-Label und dem darunter liegenden „zum Antrag"-Button soll exakt dem Abstand zwischen der Rate-Zahl und dem „mtl. Rate"-Label entsprechen (aktuell `mt-0.5`, also ca. 2 px).

## Betroffene Datei
- `src/routes/angebote.tsx` (Zeilen 306–320, rechte Spalte der Angebotskarte)

## Technische Umsetzung
1. Am „zum Antrag"-Button wird ein oberer Abstand (`margin-top`) hinzugefügt, der dem `mt-0.5` des Labels entspricht.
2. Da der Button bereits `margin: 0px 0px 16px` als Inline-Stil trägt, wird der obere Wert dort auf `2px` (bzw. 0,125 rem) gesetzt, ohne den bestehenden unteren Abstand von 16 px zu verändern.
3. Alternativ wird das Label um einen passenden unteren Abstand ergänzt, falls das sauberer ist.

## Validierung
- Playwright-Screenshot der `/angebote`-Seite
- Visuelle Kontrolle, dass der Abstand zwischen Label und Button identisch zum Abstand zwischen Zahl und Label ist
