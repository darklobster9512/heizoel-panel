# Plan: Telefon-Option Kreis grau wenn nicht ausgewaehlt

## Ziel
Der leere Auswahlkreis in der "Termin telefonisch vereinbaren"-Card auf /bestellen soll im nicht-ausgewaehlten Zustand grau statt gruen erscheinen, damit er dezenter wirkt.

## Aenderungen

### 1. Kreisfarbe im Default-Zustand aendern
- In src/routes/bestellen.tsx wird der leere Kreis-Span in der Telefon-Card von `border-brand` auf `border-muted-custom` oder eine neutrale graue Border-Farbe umgestellt.
- Der Hintergrund des Kreises bleibt transparent bzw. `bg-background`.

### 2. Ausgewaehlter Zustand unveraendert
- Wenn die Telefon-Option aktiv ist, wird weiterhin der gruene Haken in einem gruenen Kreis angezeigt.
- Keine Aenderung an Groesse, Position oder Animation.

### 3. Keine weiteren Elemente betroffen
- Aenderungen nur in src/routes/bestellen.tsx.
- Die Zeit-Slot-Optionen und andere Cards bleiben unveraendert.

## Pruefung
- /bestellen oeffnen und die Telefon-Card pruefen.
- Nicht ausgewaehlt: Kreis hat graue Border.
- Ausgewaehlt: Kreis zeigt gruenen Haken.
