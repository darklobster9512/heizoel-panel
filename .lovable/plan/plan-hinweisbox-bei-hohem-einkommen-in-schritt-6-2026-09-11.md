# Plan: Hinweisbox bei hohem Einkommen in Schritt 6

## Ziel
In `/antrag/schritt-6` erscheint unter dem Nettoeinkommen-Feld ein Hinweis, sobald der Nutzer **2.500 € oder mehr** eingibt (siehe Screenshot).

## Text
> Dank Ihres hohen Einkommens gehören Sie zu den Top 30 % aller Kreditnehmer.

## Umsetzung
- In `src/routes/antrag/schritt-6.tsx` wird nach dem `TextField` eine Bedingung eingebaut: `data.netIncome >= 2500`.
- Wenn zutreffend, wird die vorhandene `NoteBox`-Komponente aus `src/components/wizard/ui.tsx` verwendet (grüne Variante mit Briefcase-/Geld-Icon).
- Styling an den Screenshot anpassen: weißer Hintergrund, linker grüner Balken, Icon, Text in `#323232`.
- Bei Werten unter 2.500 € bleibt der Hinweis ausgeblendet; Fortschritt, Buttons, Trust-Block und Footer bleiben unverändert.

## Technisch
- Keine neue Datei; nur `src/routes/antrag/schritt-6.tsx` wird bearbeitet.
- Keine Speicheränderung nötig; `data.netIncome` ist bereits im Wizard-State vorhanden.
- Visueller Check gegen den Screenshot nach der Umsetzung.
