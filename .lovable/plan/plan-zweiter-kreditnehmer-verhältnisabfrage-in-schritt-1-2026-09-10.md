# Plan: Zweiter Kreditnehmer – Verhältnisabfrage in Schritt 1

## Ziel
Wenn im Wizard-Schritt 1 „2 Personen“ ausgewählt werden, sollen zusätzliche Felder eingeblendet werden, die dem hochgeladenen Screenshot entsprechen.

## Änderungen

### 1. Wizard-Datenmodell erweitern
- In `src/lib/wizard-store.tsx` dem `WizardData`-Typ ein neues optionales Feld hinzufügen:
  - `relationship?: string`
- In `DEFAULTS` einen Standardwert setzen:
  - `relationship: "Ehepartner"`

### 2. Hinweisbox bei 2 Personen anzeigen
- In `src/routes/antrag/schritt-1.tsx` wird nach der Auswahl „2 Personen“ folgende grüne Hinweisbox eingeblendet:
  - Text: „Super! Mit einem zweiten Kreditnehmer erhöhen sich Ihre Chancen auf einen günstigen Kredit."
  - Grüner linker Rand, Daumen-hoch-Icon in Brand-Grün.
- Dazu wird `src/components/wizard/ui.tsx` (`NoteBox`) um die Icon-Option `"thumbsup"` erweitert (Import `ThumbsUp` von `lucide-react`).

### 3. Verhältnis der Kreditnehmer abfragen
- Nur bei `data.borrowers === 2` wird nach der Hinweisbox ein neuer Block angezeigt:
  - Titel: „Verhältnis der Kreditnehmer" (gleiche Formatierung wie „Anzahl Kreditnehmer")
  - Drei Auswahloptionen:
    - Ehepartner
    - Lebenspartner
    - anderes Verhältnis
  - Layout: 2 Spalten für „Ehepartner" und „Lebenspartner", darunter „anderes Verhältnis" über die volle Breite.
- Die Auswahl wird in `data.relationship` gespeichert.
- Dazu wird `ChoiceTiles` in `src/components/wizard/ui.tsx` um eine optionale Prop `fullWidthLast?: boolean` erweitert, die das letzte Element auf volle Breite (`col-span-2`) zieht.

### 4. Fortschritt bleibt unverändert
- Der Fortschrittsbalken bleibt bei 9 %.
- „Weiter" führt weiterhin zu `/antrag/schritt-2`.

## Technische Details
- Betroffene Dateien:
  - `src/lib/wizard-store.tsx`
  - `src/components/wizard/ui.tsx`
  - `src/routes/antrag/schritt-1.tsx`
- Keine neuen Abhängigkeiten.
- Nach der Umsetzung: Typecheck, Build und visueller Screenshot-Vergleich für `/antrag/schritt-1` mit ausgewählten „2 Personen".
