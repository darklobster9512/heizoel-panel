# Schritt 14: Schriftgröße der grünen Hinweisboxen verkleinern

## Ziel
Die beiden grünen Hinweisboxen in Schritt 14 sollen eine kleinere Schriftgröße erhalten, um dem hochgeladenen Screenshot näher zu kommen:
1. „Banken schätzen es, wenn Sie schon mehrere Jahre berufstätig sind." (unter „Beschäftigt seit")
2. „Sehr gut! In einem unbefristeten Arbeitsverhältnis sind Ihre Chancen auf einen Kredit doppelt so hoch."

## Ist-Zustand
- `src/components/wizard/ui.tsx` bietet `NoteBox` bereits in zwei Größen:
  - Standard: `text-[13.5px]`
  - `compact={true}`: `text-[12.5px]`
- Beide Hinweisboxen in `src/routes/antrag/schritt-14.tsx` verwenden aktuell die Standardgröße.

## Geplante Änderungen
1. `compact={true}` an die NoteBox unter „Beschäftigt seit" übergeben.
2. `compact={true}` an die NoteBox unter „Ist Ihr Arbeitsverhältnis befristet? → Nein" übergeben.
3. Build ausführen und visuell prüfen, ob die Schriftgröße nun dem Screenshot entspricht.

## Technische Details
- Keine neuen Komponenten oder Dependencies.
- Änderung ausschließlich in `src/routes/antrag/schritt-14.tsx`.
