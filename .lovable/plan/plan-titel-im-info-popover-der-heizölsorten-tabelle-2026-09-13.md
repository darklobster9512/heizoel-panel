# Plan: Titel im Info-Popover der Heizölsorten-Tabelle

## Ziel
Im Popover der Info-Spalte der Heizölsorten-Tabelle soll oberhalb des Erklärungstexts der jeweilige Zeilentitel angezeigt werden.

## Änderung
- Datei: `src/components/landing/sections.tsx`
- Komponente: `InfoCell`
- Im `<PopoverContent>` oberhalb von `{info}` einen Titel mit dem `label`-Text einfügen (z. B. fett, etwas größer, mit Abstand zum darunterliegenden Info-Text).
- Bestehendes Verhalten (Hover öffnet, Klick pinnt, Klick außerhalb/erneut schließt) bleibt unverändert.

## Visuelles Ergebnis
Beim Hover über das Info-Icon erscheint der Popover mit der Überschrift (z. B. „Höhere Heizleistung") gefolgt von der bisherigen Erklärung.
