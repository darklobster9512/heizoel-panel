# Plan: Preisrechner-Optimierungen

## Ziel
Auf `/preisrechner` zwei kleine visuelle Anpassungen vornehmen.

## Änderungen

### 1. Intro-Text in einer Zeile
- Datei: `src/routes/preisrechner.tsx`
- Der Absatz unter der H1 (`Heizölpreise heute ab 128,78 €/100L — über 25.000 Kunden sparen Ø €247 pro Bestellung, direkt vom Händler, deutschlandweit.`) soll nicht mehr umbrechen, sondern in einer Zeile stehen.
- Umsetzung: `whitespace-nowrap` auf dem Text-Block, `max-w` entfernen, ggf. Schriftgröße anpassen, damit der Text auf Desktop nicht überläuft. Auf Mobile bleibt er scrollbar oder bricht kontrolliert um, falls nötig.

### 2. Günstiger-geht-nicht-Garantie-Bild in die Card
- Datei: `src/routes/preisrechner.tsx`
- Das `guarantee.svg`-Asset (bereits auf der Landingpage in `src/components/landing/hero.tsx` verwendet) importieren.
- Das Bild oben links in die Preisrechner-Card (den Container um `<OfferCard bordered={false} />`) platzieren, ähnlich der Positionierung auf der Landingpage, aber links statt rechts.
- Größe und Abstände anpassen, sodass es nicht mit dem Formular überlappt und auf Mobile sauber aussieht.

## Technische Details
- Keine neuen Abhängigkeiten.
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard`, `/admin`.
- Nach den Änderungen Build-Log prüfen und Screenshots für Desktop/Mobile erstellen.
