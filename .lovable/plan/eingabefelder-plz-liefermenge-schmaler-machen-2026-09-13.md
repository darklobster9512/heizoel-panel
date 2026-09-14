# Eingabefelder PLZ / Liefermenge schmaler machen

## Problem
Auf `/preisrechner/ergebnis` sind die Eingabefelder für PLZ und Liefermenge im Bearbeitungsmodus zu breit. Ursache: `fieldClass` enthält `w-full`; die eigentlichen Breiten-Overrides (`w-32`, `w-40`) werden dadurch überschrieben.

## Lösung
1. In `src/routes/preisrechner.ergebnis.tsx` das `w-full` aus der `fieldClass`-Basisklasse entfernen, damit die später gesetzten Breiten greifen.
2. PLZ-Feld auf `w-24` (ca. 6rem) reduzieren.
3. Liefermenge-Feld auf `w-28` (ca. 7rem) reduzieren.
4. TypeScript-Check laufen lassen und per Playwright prüfen, dass die Felder im geöffneten Lieferdaten-Dialog schmal dargestellt werden.

## Dateien
- `src/routes/preisrechner.ergebnis.tsx`

## Validierung
- `bunx tsgo --noEmit` fehlerfrei.
- Screenshot des geöffneten Dialogs zeigt schmale Eingabefelder rechtsbündig neben den Labels.
