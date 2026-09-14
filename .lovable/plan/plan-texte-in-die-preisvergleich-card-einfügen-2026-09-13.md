# Plan: Texte in die Preisvergleich-Card einfügen

## Ziel
In die `OfferCard` (Preisvergleichs-Formular rechts im Hero) werden zwei zusätzliche Textzeilen eingebaut.

## Umsetzung
- In `src/components/landing/offer-card.tsx` oberhalb der Formularfelder einfügen:
  - Überschrift: **„Heizölpreis sofort berechnen"** in der gleichen Farbe wie der Hero-H1 (`text-hero-text`).
  - Subline: **„Kostenlos & unverbindlich — Ergebnis in Sekunden"** in der gleichen gräulichen Farbe wie die bestehende Vertrauenszeile unter dem Button (`text-hero-text/70`).
- Bestehende Formularfelder, Button und die Zeile „100% sicher & kostenlos • Keine versteckten Kosten" bleiben unverändert.
- Keine neuen Abhängigkeiten, keine Backend-Änderungen.
