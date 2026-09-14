# Plan: Landingpage-Textanpassungen

## Ziel
Optische und inhaltliche Feinschliff an der Landingpage zwischen „Heizölsorten im Überblick" und „Vertrauen Sie auf Klaro".

## Änderungen

### 1. ReferralBanner: Titel-Farbe anpassen
- In `src/components/landing/sections.tsx` beide `<h2>`-Titel im `ReferralBanner` von `text-ink` auf `text-conditions` ändern.
- Dadurch stimmt die Farbe mit dem Titel „Heizöl günstig einkaufen" überein.

### 2. ReferralBanner: „25.000 zufriedenen Kunden" fett hervorheben
- Den Satz „Schließen Sie sich 25.000+ zufriedenen Kunden an und sparen Sie durchschnittlich €247" bleibt in einer Zeile.
- Der Teil „25.000+ zufriedenen Kunden" wird in `<strong>` gewrappt.

### 3. Neue weiße Text-Sektion einfügen
- Neue Komponente `HeizoelServiceIntro` in `src/components/landing/sections.tsx`.
- Hintergrund: `bg-white`.
- Position: in `src/routes/index.tsx` zwischen `<ReferralBanner />` und `<TrustLinks />`.
- Inhalt:
  - Headline: „Heizölpreise heute & Heizöl online bestellen"
  - Fließtext mit den vom Nutzer vorgegebenen Absätzen.
  - Passende Stellen werden fett markiert (z. B. „über 500 zertifizierten Partnerhändlern", „33.000 zufriedene Kunden", „4,99 von 5 Sternen", „98,9%", „€247", „Festpreisgarantie", „Heizöl Standard", „Heizöl Premium", „Endpreise inklusive MwSt. und Lieferung", „€/100L", „50€ Entschädigung").
  - Alle Vorkommen von `fastenergy24.com` werden durch die aktuelle Domain ersetzt. Da die Domain je nach Umgebung variiert, wird sie clientseitig aus `window.location.host` gelesen.

## Technische Details
- Keine neuen Abhängigkeiten.
- Keine Backend-Änderungen.
- Nach den Änderungen Build prüfen und Screenshots Desktop/Mobile anfertigen.
