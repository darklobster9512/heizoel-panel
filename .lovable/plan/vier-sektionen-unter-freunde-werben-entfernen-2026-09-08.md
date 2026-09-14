# Vier Sektionen unter „Freunde werben“ entfernen

## Ziel
Unter der Prämien-Sektion „Prämie für jeden Kredit: Freunde werben!" sollen die nächsten vier Sektionen entfernt werden:
1. „Für jeden Zweck der passende Kredit" (LoanTypes)
2. „Der Unterschied zur Hausbank ist selten klein" (RateComparison)
3. Zins-/Konditionentabelle (RatesTable)
4. Vorteile-/Vergleichs-Sektion (Advantages)

Die Sicherheits-/Regulierungs-Sektion (Security), der dunkle CTA-Block (CtaBlock) und der Footer bleiben erhalten.

## Änderungen
1. In `src/routes/index.tsx` die Aufrufe `<LoanTypes />`, `<RateComparison />`, `<RatesTable />` und `<Advantages />` aus der Komponenten-Reihenfolge entfernen.
2. Unbenutzte Imports (`LoanTypes`, `RateComparison`, `RatesTable`, `Advantages`) aus dem Import-Block entfernen, sofern sie anschließend nirgendwo anders verwendet werden.
3. Die Datei `src/components/landing/sections.tsx` selbst nicht löschen; die Komponentendefinitionen bleiben für eventuelle spätere Verwendung erhalten.

## Validierung
- Typecheck ausführen.
- Playwright-Screenshot prüfen: Nach der Prämien-Sektion folgt direkt die Sicherheits-/Regulierungs-Sektion, dann CTA, dann Footer. Keine Konsolenfehler.
