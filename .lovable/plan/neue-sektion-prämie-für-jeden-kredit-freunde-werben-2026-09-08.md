# Neue Sektion: „Prämie für jeden Kredit: Freunde werben!“

Direkt unter der Sektion „Vertrauen Sie auf smava“ kommt ein neuer Werbe-Streifen, 1:1 nach der Vorlage.

## Aufbau

- Zwei Hintergründe: der obere Teil bleibt weiß, darunter liegt ein hellgrauer Streifen. Das Foto des Mannes ragt aus dem grauen Streifen nach oben in den weißen Bereich hinein.
- Links im grauen Streifen: das hochgeladene Foto (grüner Blazer, Tablet), freigestellt, unten bündig abschneidend.
- Rechts, vertikal mittig:
  - Überschrift (fett, dunkel): „Prämie für jeden Kredit: Freunde werben!“
  - Text: „Empfehlen Sie smava Ihren Freunden. Als Dankeschön bekommen Sie nach jeder Auszahlung eine Geldprämie – Dieses Angebot gilt nur für kurze Zeit!“
  - Grüner Button mit weißer Schrift: „Jetzt Prämie sichern“ (führt vorerst zum Rechner oben, da es keine Prämienseite gibt)
- Auf dem Handy: Foto oben mittig, Text und Button darunter, alles zentriert.

## Technisches

- Foto als CDN-Asset anlegen (`src/assets/smava-hero.webp.asset.json`) aus dem Upload.
- Neue Komponente `ReferralBanner()` in `src/components/landing/sections.tsx`, eingebunden in `src/routes/index.tsx` zwischen `<TrustLinks />` und dem Footer.
- Umsetzung: relativer Container, graues Band mit fester Höhe, Bild absolut positioniert mit negativem Versatz nach oben; bestehende Farb-Tokens für Grün und Grau.
