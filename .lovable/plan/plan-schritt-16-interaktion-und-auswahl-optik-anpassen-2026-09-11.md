Plan: Schritt-16-Interaktion und Auswahl-Optik anpassen

Ziel: Die drei Restschuldversicherungs-Karten auf `/antrag/schritt-16` sollen ganzflächig klickbar sein, der ausgewählte Zustand soll optisch eindeutiger werden, und die Checkbox-Option „Keine Versicherung“ soll hervorgehoben werden.

Änderungen an `src/routes/antrag/schritt-16.tsx`:
1. Auswahl per Klick auf die gesamte Karte ermöglichen
   - `onClick`-Handler vom Button auf die Card-DIV verschieben.
   - `cursor-pointer` hinzufügen.
   - Button bleibt sichtbar, verliert aber seinen eigenen Klick-Handler, damit ein Klick auf die Card direkt aktiviert.
2. Ausgewählte Card grünlich hinterlegen
   - Beim `active`-Zustand zusätzlich `bg-[#eff8f1]` (gleiche Farbe wie der aktive Button) setzen.
   - Rahmenfarbe bleibt grün (`border-brand`).
3. Button-Zustand „Ausgewählt“
   - Wenn `active` true, statt Text „Wählen“ ein grünes Checkmark-Icon plus Text „Ausgewählt“ anzeigen.
   - Button-Stil bleibt wie aktuell (grünliche Fläche).
4. „Keine Versicherung“-Text bold
   - Dem `span` im `CheckboxRow`-Aufruf `font-bold` geben, aber nur für diesen Text. Um `CheckboxRow` nicht global zu verändern, wird der Text in einem `span` mit `font-bold` gewrappt.

Optional: `CheckboxRow` in `src/components/wizard/ui.tsx` um ein `className`- oder `labelClassName`-Prop erweitern, falls sich der fette Text eleganter steuern lässt, ohne den Komponentenvertrag zu ändern. Bevorzugt wird aber ein Wrapper-Span im Aufrufort, um keine allgemeine Komponente anzutasten.

Validierung:
- `bun run build` muss erfolgreich sein.
- Visueller Playwright-Check auf `/antrag/schritt-16`: Card-Klick ändert Auswahl, Hintergrund wird grünlich, Button zeigt „Ausgewählt“-Checkmark, Checkbox-Text „Keine Versicherung“ ist fett.
