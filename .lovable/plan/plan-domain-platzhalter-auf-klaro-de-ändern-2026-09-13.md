# Plan: Domain-Platzhalter auf klaro.de ändern

## Ziel
In der neuen Text-Sektion „Heizölpreise heute & Heizöl online bestellen" soll die Domain nicht dynamisch aus der aktuellen URL gelesen werden, sondern als fester Demo-Wert `klaro.de` angezeigt werden.

## Änderungen

### 1. Hilfskomponente `CurrentDomain` entfernen/ersetzen
- In `src/components/landing/sections.tsx` wird die clientseitige `CurrentDomain`-Komponente entfernt.
- Stattdessen wird einfacher statischer Text `klaro.de` eingesetzt.

### 2. Text anpassen
- Beide Vorkommen von `<CurrentDomain />` in `HeizoelServiceIntro` werden durch `klaro.de` ersetzt.
- Der Import von `useEffect` wird entfernt, falls er danach nicht mehr benötigt wird.

## Technische Details
- Keine neuen Abhängigkeiten.
- Keine Backend-Änderungen.
- Nach der Änderung Build prüfen und Screenshots Desktop/Mobile anfertigen.
