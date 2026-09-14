# Plan: Garantie-Bild auf Preisrechner korrigieren

## Ziel
Das Garantie-Bild auf `/preisrechner` entspricht noch nicht der gewünschten Positionierung. Es soll exakt wie auf der Landingpage über die Card hinausragen, aber in der linken Hälfte rechts zentriert sein.

## Änderungen

### 1. Positionierung des Garantie-Bildes korrigieren
- Datei: `src/routes/preisrechner.tsx`
- Das `guarantee.svg`-Asset nicht mehr oben links außerhalb der Card positionieren.
- Stattdessen absolut in der linken Spalte (dem Rechner-Container) oben rechts platzieren, sodass es über den oberen Card-Rand hinausragt — analog zur Landingpage, wo es rechts oben über die Card ragt.
- Auf Desktop (`md:`) sichtbar, auf Mobile weiterhin ausgeblendet (`hidden md:block`), da dort kein Platz ist.
- Abstand zum linken Seitenrand erhöhen, indem das Bild rechts in der linken Spalte ausgerichtet wird.

## Technische Details
- Keine neuen Abhängigkeiten.
- Keine Änderungen an anderen Routen.
- Nach der Anpassung Build-Log prüfen und Screenshot für Desktop erstellen.
