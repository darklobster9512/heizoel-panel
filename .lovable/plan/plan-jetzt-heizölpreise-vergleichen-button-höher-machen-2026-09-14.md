# Plan: „Jetzt Heizölpreise vergleichen"-Button höher machen

## Ziel
Der Button „Jetzt Heizölpreise vergleichen" in der Rechner-Karte soll auf der Landingpage und auf `/preisrechner` deutlich dicker/höher wirken.

## Aktueller Zustand
Der Button sitzt in `src/components/landing/offer-card.tsx` und hat aktuell `py-4` auf Mobil und `md:py-3.5` auf Desktop.

## Umsetzung
1. In `src/components/landing/offer-card.tsx` das vertikale Padding des Buttons erhöhen, z. B. auf `py-5 md:py-5` oder `py-5 md:py-[18px]`, damit er visuell kräftiger wird.
2. Optional die Schriftgröße leicht anpassen, falls das Verhältnis zu dick wirkt.
3. Keine Änderung an Farbe, Breite, Schriftgewicht oder Schatten.

## Prüfung
- Button auf `/` und `/preisrechner` visuell prüfen.
- Mobil und Desktop vergleichen.
