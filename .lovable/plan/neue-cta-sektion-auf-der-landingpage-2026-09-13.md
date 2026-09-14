# Neue CTA-Sektion auf der Landingpage

## Ziel
Zwischen den bestehenden Sektionen „Heizölsorten im Überblick" und „Vertrauen Sie auf Klaro" wird eine neue, full-width CTA-Card in der Markenfarbe Grün eingefügt.

## Inhalt und Struktur
- Headline: „Jetzt Heizöl günstiger bestellen!"
- Subline: „Schließen Sie sich 25.000+ zufriedenen Kunden an und sparen Sie durchschnittlich €247"
- Vertrauenszeile: „Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise"
- Zwei Buttons nebeneinander:
  - „Heizölpreis berechnen" → Link zu `#rechner`
  - „Bewertungen lesen" → Link zu `#bewertungen`
- Alles mittig zentriert.

## Design
- Hintergrund: Akzentgrün (`bg-brand` / `#22C55E`).
- Textfarbe: Dunkel (`text-hero-text` oder äquivalent), damit Kontrast auf Grün stimmt.
- Kein zusätzlicher Rahmen oder Schatten; die Farbe bildet die Card.
- Ausreichend vertikales Padding (`py-16 md:py-20`), horizontal begrenzt auf `max-w-6xl px-5` für den Text-Block, aber die grüne Fläche läuft randlos über die volle Breite.
- Buttons: Primär-Button (grün-auf-dunkel/weiß je nach Theme) und sekundärer Umriss-Button, beide zentriert.

## Technische Umsetzung
1. Neue Komponente `CtaCard` in `src/components/landing/sections.tsx` exportieren.
2. In `src/routes/index.tsx` zwischen `<HeizoelSorten />` und `<TrustLinks />` einfügen.
3. Sicherstellen, dass die Section-ID für den „Bewertungen lesen"-Button existiert (`#bewertungen` bei CustomerVoices) und `#rechner` weiterhin auf das Hero-Formular zeigt.
4. Build prüfen und Screenshots Desktop/Mobile anfertigen.
