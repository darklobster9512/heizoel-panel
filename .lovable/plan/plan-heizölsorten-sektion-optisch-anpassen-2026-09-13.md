# Plan: Heizölsorten-Sektion optisch anpassen

## Ziel
Die Überschrift der Heizölsorten-Tabelle soll stärker hervortreten und die Sektion soll denselben Hintergrund wie die „Heizöl günstig einkaufen"-Sektion erhalten.

## Änderungen
- Datei: `src/components/landing/sections.tsx`
- Komponente: `HeizoelSorten`
- Sektions-Hintergrund von `bg-background` auf `bg-surface` ändern.
- Über dem Haupttitel „Heizölsorten im Überblick" eine kleine, dünne, uppercase Eyebrow „Welches Heizöl brauche ich?" einfügen.
- Haupttitel „Heizölsorten im Überblick" vergrößern.
- Tabelle selbst (Rahmen, Hintergrund, Spalten, Icons, Popover) bleibt unverändert.

## Visuelles Ergebnis
Die Sektion hat den gleichen hellgrauen Hintergrund wie „Heizöl günstig einkaufen". Die Überschrift wird von einer kleinen, dezenten Frage in Großbuchstaben eingeleitet und der Haupttitel wirkt dominanter.
