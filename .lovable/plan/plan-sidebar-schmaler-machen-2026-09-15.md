# Plan: Sidebar schmaler machen

## Ziel
Die linke Sidebar im Admin-Bereich soll nur noch so breit sein wie der längste Navigationstext. Dadurch gewinnt die Tabelle auf `/admin/bestellungen` mehr horizontalen Platz.

## Betroffene Datei
- `src/components/internal/app-shell.tsx`

## Durchführung
1. Sidebar-Breite von der festen Tailwind-Klasse `w-52` auf inhaltsbasierte Breite `w-max` ändern.
2. Die Navigationslinks mit `whitespace-nowrap` versehen, damit die Texte nicht umbrechen und die Breite tatsächlich vom längsten Eintrag bestimmt wird.
3. `shrink-0` am `<aside>` beibehalten, damit der Hauptbereich die gewonnene Breite übernimmt.

## Validierung
- `bunx tsgo --noEmit` läuft sauber.
- Build-Fehler-Log wird auf leere Fehler geprüft.
