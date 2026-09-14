# Plan: Klaro-Logo grün + Abladestellen-Dropdown an Eingabefelder angleichen

## 1. Logo im Live-Bestellungs-Element (Preisrechner)

Das Logo dort ist aktuell dunkel eingefärbt (`text-ink`), im Header ist es dagegen grün.

- In `src/routes/preisrechner.tsx` die Farb-Klasse am Logo von `text-ink` auf `text-smava-logo` ändern — exakt die gleiche grüne Klasse wie im Header.
- Größe (60 px Breite) und Position bleiben unverändert.

## 2. Abladestellen-Dropdown an Menge/PLZ angleichen

Das Formular mit Postleitzahl, Menge und Abladestellen liegt zentral in `src/components/landing/offer-card.tsx` und wird sowohl auf der Landingpage als auch auf `/preisrechner` verwendet — eine einzige Korrektur gilt daher automatisch für beide Seiten.

Aktuell hat das Dropdown eine eigene, feste Höhe (`h-[43px]` mobil, `h-9` am Desktop) und ist eckig (`rounded-none`), während die Eingabefelder abgerundet sind und ihre Höhe über Polsterung bekommen — dadurch steht das Dropdown sichtbar unruhig daneben.

- `selectTriggerClass` wird an `fieldClass` angeglichen:
  - gleiche Abrundung (`rounded-md`)
  - gleiche vertikale Polsterung statt fester Höhe (`py-3.5` mobil, `md:py-3` Desktop)
  - gleiche horizontale Polsterung (`px-3` / `md:px-4`)
  - Rahmen, Hintergrund und Schriftgrößen bleiben wie gehabt
- Ergebnis: Dropdown und beide Eingabefelder sind exakt gleich hoch und gleich geformt — auf Mobil wie am Desktop, auf beiden Seiten.

## Technische Details

- Geänderte Dateien: `src/routes/preisrechner.tsx` (eine Klasse), `src/components/landing/offer-card.tsx` (eine Klassen-Konstante).
- Keine neuen Abhängigkeiten, keine Funktionsänderung — rein optisch.
- Danach Build-Log prüfen und per Playwright-Screenshot (Desktop + Mobil, beide Seiten) verifizieren, dass Logo grün ist und die drei Felder bündig sind.
