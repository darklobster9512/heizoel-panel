# Plan: Schritt 12 – Datumsformatierung & Performance

## Ziel
1. Geburtsdatum: Punkt erscheint sofort nach der 2. bzw. 4. Ziffer (Eingabe „15" → „15.", dann „15.05." usw.).
2. Schritt 12 reagiert flüssig – kein Lag mehr durch die langen Länderlisten.

## Änderungen

### 1. Datumsformatierung (`src/routes/antrag/schritt-12.tsx`)
`formatBirthdate` anpassen:
- Nach genau 2 Ziffern wird sofort ein Punkt angehängt („15" → „15.").
- Nach genau 4 Ziffern ebenfalls („15.05" → „15.05.").
- Maximal 8 Ziffern, nur Ziffern zählen, Format bleibt TT.MM.JJJJ.

### 2. Performance – Länder-Dropdowns
Ursache des Lags: Jede Auswahl rendert ~200 Länder-Einträge; drei dieser Dropdowns liegen auf einer Seite und die Optionsliste wird bei jedem Tastenschlag neu aufgebaut.

Maßnahmen:
- Optionslisten (`COUNTRY_OPTIONS`, gefilterte Liste für „Weitere Staatsangehörigkeit") werden memoisiert (`useMemo`), statt bei jedem Render neu erzeugt zu werden.
- Die Länder-Dropdowns in Schritt 12 erhalten eine leichtgewichtige, erst-beim-Öffnen gerenderte Liste; die Einträge werden nicht mehr dauerhaft im DOM gehalten. Öffnen, Scrollen und Auswählen bleiben optisch und funktional gleich (kantige Ecken, grüner Chevron, #eff8f1-Auswahl, grauer Hover, Top-5 + Trennlinie + alphabetische Liste).
- Keine Änderungen an anderen Schritten.

## Technische Details
- Dateien: `src/routes/antrag/schritt-12.tsx`, ggf. kleine Ergänzung in `src/components/wizard/ui.tsx` (memoisiertes/lazy Dropdown) und `src/lib/countries.ts` (vorgefertigte Options-Arrays statt Neuberechnung).
- Keine Schema-, Routing- oder Design-Änderungen.

## Prüfung
- Tippen von „15051990" ergibt „15.05.1990", Punkte erscheinen sofort.
- Öffnen/Tippen in Schritt 12 ohne spürbare Verzögerung (Browser-Test).
- Build und Typecheck erfolgreich.
