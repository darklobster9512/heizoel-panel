# Plan: Abstand „mtl. Rate“ → „zum Antrag“-Button angleichen

## Ziel
Der sichtbare Abstand zwischen „mtl. Rate“ und dem „zum Antrag“-Button soll exakt so groß sein wie der Abstand zwischen der Rate-Zahl und „mtl. Rate“ darüber.

## Ist-Zustand (bestätigt in `src/routes/angebote.tsx`)
- Rate-Zahl → „mtl. Rate“: `mt-0.5` (2 px) plus Zeilenhöhen-Überschuss (~4–6 px sichtbarer Abstand).
- „mtl. Rate“ → Button: Button-Inline-Style `margin: "2px 0px 16px"` — dadurch nur ~2 px sichtbarer Abstand, also kleiner als oben.

## Umsetzung
1. In `src/routes/angebote.tsx` (rechte grüne Spalte der Angebotskarte, ca. Zeile 300–330):
   - Den oberen Button-Abstand im Inline-Style so erhöhen, dass der gemessene Pixel-Abstand identisch zum Abstand Zahl → „mtl. Rate“ ist (Startwert `margin: "6px 0px 16px"`).
2. Verifikation per Playwright: beide Abstände per `getBoundingClientRect()` messen und bei Abweichung feinjustieren, bis sie übereinstimmen; Screenshot zur Sichtprüfung.

## Technische Details
- Nur CSS-/Klassen-Anpassung in `src/routes/angebote.tsx`; keine Logik- oder Strukturänderung.
- Seitenverhältnis, Hover und sonstige Button-Eigenschaften bleiben unverändert.
