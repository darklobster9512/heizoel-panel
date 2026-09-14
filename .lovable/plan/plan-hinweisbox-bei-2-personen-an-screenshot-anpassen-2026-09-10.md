# Plan: Hinweisbox bei 2 Personen an Screenshot anpassen

## Ziel
Die grüne Hinweisbox in Schritt 1 bei Auswahl von „2 Personen" soll exakt dem hochgeladenen Screenshot entsprechen.

## Änderungen

### 1. Icon tauschen
- In `src/routes/antrag/schritt-1.tsx` wird das `NoteBox`-Icon von `"thumbsup"` auf `"user"` geändert.

### 2. Grünen linken Rand verbreitern
- In `src/components/wizard/ui.tsx` wird die grüne Linie der `NoteBox` von `border-l-[3px]` auf `border-l-[5px]` erhöht.
- Farbe und Abstände der Box bleiben unverändert.

## Technische Details
- Betroffene Dateien:
  - `src/routes/antrag/schritt-1.tsx`
  - `src/components/wizard/ui.tsx`
- Keine neuen Abhängigkeiten.
- Nach der Umsetzung: Typecheck, Build und Screenshot-Vergleich für `/antrag/schritt-1` mit „2 Personen".
