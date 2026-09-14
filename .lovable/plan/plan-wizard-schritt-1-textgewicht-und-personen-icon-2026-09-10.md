# Plan: Wizard Schritt 1 – Textgewicht und Personen-Icon

## Ziel
Die ausgewählte Antwortkachel in Schritt 1 soll visuell nur durch den Radio-Punkt hervorgehoben werden, der Text bleibt normal. Das Personen-Icon in der grünen Hinweisbox soll wie die grünen Buttons gestylt sein (grüner Hintergrund, dunkles/weißes Icon innen).

## Änderungen

### 1. Ausgewählter Kachel-Text nicht fett
- Datei: `src/components/wizard/ui.tsx`
- In `ChoiceTiles` wird im selected-Zweig `font-medium` entfernt (`font-normal` oder einfach weglassen).
- Farbe, Rahmen, Hintergrund und Radio-Punkt bleiben unverändert.

### 2. Personen-Icon in NoteBox button-gleich stylen
- Datei: `src/components/wizard/ui.tsx`
- Das `User`-Icon in der grünen `NoteBox` erhält einen kleinen runden grünen Hintergrund (`bg-brand`) und ein kontrastierendes Icon in der Button-Textfarbe.
- Andere Icons (`briefcase`, `thumbsup`) und die blaue Variante bleiben unverändert.

## Technische Details
- Keine neuen Abhängigkeiten.
- Nach der Umsetzung: Typecheck, Build und Screenshot-Vergleich für `/antrag/schritt-1` mit „2 Personen".
