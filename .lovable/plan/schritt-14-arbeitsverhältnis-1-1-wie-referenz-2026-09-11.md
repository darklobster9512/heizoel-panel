# Schritt 14: Arbeitsverhältnis 1:1 wie Referenz

## Ziel
`/antrag/schritt-14` komplett neu aufbauen nach den Screenshots (14-2 Grundzustand, 14.1 ausgeklappte Zustände). Fortschritt 73 %, H1 „Arbeitsverhältnis".

## Struktur (exakte Reihenfolge)

1. **WhyInfo-Accordion** direkt unter der H1: „Ihre Angaben zu Ihrem Arbeitsverhältnis werden benötigt, um sicherzustellen, dass Sie sich in einem festen Beschäftigungsverhältnis befinden. Ihr Arbeitgeber wird von uns nicht kontaktiert."
2. **Name Arbeitgeber** — Textfeld, Platzhalter „z.B. Mustermann GmbH", darunter statischer kleiner Hinweis: „Die Angabe dient der Bank zum Abgleich mit Ihrem Einkommensnachweis. Ihr Arbeitgeber wird über Ihre Kreditabsichten zu keinem Zeitpunkt von smava informiert."
3. **Beschäftigt seit** — Textfeld „MM.JJJJ" mit automatischer Punkt-Formatierung (Muster aus Schritt 12), **Focus-Hinweis oberhalb** (erscheint beim Anklicken): „Wenn Sie Ihre aktuelle berufliche Tätigkeit seit weniger als 2 Jahren ausüben, möchten die Banken zusätzlich die Angaben zu Ihrer vorherigen Beschäftigung kennen."
4. **Arbeiten Sie in Teilzeit?** — Ja/Nein-ChoiceTiles, Standard „Nein".
   - Bei **Ja**: zusätzlich „Teilzeit oder Kurzarbeit?" mit Kacheln „Teilzeit"/„Kurzarbeit" (Standard „Teilzeit") und darunter kleiner Hinweis: „Bitte geben Sie hier an, wenn Sie aktuell in Kurzarbeit sind. Dies ist wichtig, damit Banken Ihnen passende Angebote machen können."
5. **Ist Ihr Arbeitsverhältnis befristet?** — Ja/Nein-ChoiceTiles, Standard „Nein", darunter statischer Hinweis: „Wichtig: Steht auf Ihrer Gehaltsabrechnung ein Austrittsdatum (Renteneintritt ausgenommen), dann liegt aus Sicht der Bank ein befristetes Arbeitsverhältnis vor. Bei einem unbefristeten Arbeitsverhältnis bieten Banken meist günstigere Zinssätze an."
   - Bei **Nein**: grüne NoteBox mit Koffer-Icon: „Sehr gut! In einem unbefristeten Arbeitsverhältnis sind Ihre Chancen auf einen Kredit doppelt so hoch." (wie Screenshot 14-2)
   - Bei **Ja**: stattdessen Feld **„Beschäftigung befristet bis"** („MM.JJJJ", Auto-Formatierung) mit Hinweis „Wieso fragen wir das? Aufgrund dessen, kann ein optimales Angebot für Sie ermittelt werden." sowie weitere Frage **„Wurde Ihr Arbeitsvertrag beim aktuellen Arbeitgeber schon mindestens einmal verlängert?"** (Ja/Nein, Standard „Nein") — wie Screenshot 14.1.
6. Navigation (Zurück → 13, Weiter → 15) und TrustBlock wie gehabt.

## Technisch
- **Store (`wizard-store.tsx`)**: neue Felder `partTimeType?: "teilzeit" | "kurzarbeit"`, `temporaryContract?: boolean` (ggf. schon vorhanden), `temporaryContractUntil?: string`, `contractExtended?: boolean`; Defaults: partTime false, temporaryContract false, contractExtended false.
- Alte CheckboxRow-Struktur und das alte NoteBox/„Angaben zu Ihrem Beschäftigungsverhältnis"-Layout werden ersetzt.
- Labels exakt wie Referenz: „Name Arbeitgeber", „Beschäftigt seit".

## Verifikation
Build + Browser-Check: Grundzustand (Nein/Nein, grüne Box), Teilzeit=Ja (Kurzarbeit-Kacheln), Befristet=Ja (Enddatum + Verlängerungsfrage), Focus-Hinweis bei „Beschäftigt seit".
