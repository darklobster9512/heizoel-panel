# Button dicker/tiefer machen

## Ziel
Der grüne CTA-Button „Jetzt Heizölpreise vergleichen" in der Preis-Rechner-Karte soll deutlich dicker/tiefer wirken (mehr Höhe/Tiefe, nicht Breite).

## Änderung
- Datei: `src/components/landing/offer-card.tsx`
- Button-Padding von `py-5 md:py-5` auf `py-6 md:py-7` erhöhen.
- Schriftgröße und sonstige Stile bleiben unverändert.

## Prüfung
- Build-Check (`bunx tsgo --noEmit`) und `build-errors.log` auf Fehler prüfen.
- Visuell im Preview auf Landingpage und `/preisrechner` kontrollieren, dass der Button nun wesentlich höher ist.
