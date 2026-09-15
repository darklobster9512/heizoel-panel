# Plan: Rechnungs-Icon als klickbar markieren

## Ziel
Beim Hover über das Rechnungs-Icon in der Bestellungen-Tabelle soll der Mauszeiger zum Pointer werden, damit klar ist, dass es anklickbar ist.

## Änderung
- `src/routes/_authenticated/admin_.bestellungen.tsx`
  - Dem Rechnungs-Button in der Desktop-Tabellenzeile (Spalte „Aktionen") `cursor-pointer` hinzufügen.

## Verifikation
- `bunx tsgo --noEmit` ausführen.
- Build-Log auf Fehler prüfen.
