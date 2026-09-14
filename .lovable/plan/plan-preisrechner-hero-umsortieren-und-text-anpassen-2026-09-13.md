# Plan: Preisrechner-Hero umsortieren und Text anpassen

## Ziel
Den Hero-Bereich auf `/preisrechner` so umstellen, dass der Rechner links und die 3-Schritte-Erklärung rechts steht. Die Schritte kompakter darstellen und dort die Kundenbewertung als vierte Zeile ergänzen.

## Änderungen

### 1. Reihenfolge in der Hero-Card tauschen
- In `src/routes/preisrechner.tsx`: Innerhalb der zweispaltigen Card `<OfferCard bordered={false} />` nach links, `<CompactSteps />` nach rechts.
- Rahmen/Border der linken Hälfte anpassen: statt `lg:border-r` wird die Trennlinie rechts der linken Hälfte zu `lg:border-r` (da OfferCard nun links steht).

### 2. Schritt-Text anpassen
- In `src/components/landing/sections.tsx` im `STEPS`-Array: Text von Schritt 1 von "...Menge und Sorte ein" auf "...Menge und Abladestellen ein" ändern.

### 3. Kompaktere 3-Schritte-Darstellung
- In `CompactSteps` (`src/routes/preisrechner.tsx`): Abstand zwischen den Schritten reduzieren, damit sie nicht mehr die volle Höhe ausfüllen müssen.
- Optional: `justify-between` entfernen oder durch kleineren Gap ersetzen, damit die Schritte näher beieinander stehen.

### 4. Bewertung als 4. Zeile in der Schritte-Hälfte
- In `CompactSteps` unter der Schritte-Liste eine vierte Zeile ergänzen:
  - Sterne-Icon (wiederverwendet aus der bestehenden `Stars`-Komponente in `preisrechner.tsx`)
  - "4,99 / 5 Sternen"
  - "Ausgezeichnet"
  - "Basierend auf über 33.000 Kundenbewertungen"
- Layout: kompakte horizontale oder vertikale Anordnung, visuell als letzter Punkt in der rechten Hälfte.

## Nicht ändern
- SEO-Textblöcke, "Warum bei Klaro bestellen"-Sektion, Header, Footer und alle anderen Routen bleiben unverändert.
- Preise, Banken- und Händlerangaben bleiben Platzhalter.

## Verifikation
- Build-Log `/tmp/observability/build-errors.log` prüfen.
- Screenshots Desktop & Mobile unter `/tmp/browser/preisrechner-hero-check/` erstellen.
