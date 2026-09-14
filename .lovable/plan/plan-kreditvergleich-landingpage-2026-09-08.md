# Plan: Kreditvergleich-Landingpage

## Ziel
Eine One-Pager-Landingpage für ein deutsches Fintech-Kreditvergleichs-Portal im Stil "Kinetic Glass" (hell, modern, grüner Akzent, glass-artige Karten, dezente Bewegung).

## Ausgewählte Designrichtung
- **Richtung:** Kinetic Glass (v3)
- **Mood:** Helles, frisches Fintech-Design mit lebendigem Grün, klarer Typografie (Space Grotesk + Inter + JetBrains Mono) und subtilem Hintergrund-Motion.

## Inhaltliche Struktur (One-Pager)
1. **Sticky Navigation** – Logo, drei Ankerlinks (Vergleich, Ablauf, Vertrauen), CTA-Button.
2. **Hero** – Headline, Subheadline, zwei CTAs, Meta-Infos (Bewertung, Sicherheit) plus eine "Bestes Angebot"-Karte mit Beispiel-Konditionen.
3. **Trust Band** – Logos/Name fiktiver Partnerbanken.
4. **USP Bento-Grid** – 4 Karten: echtes Zinsniveau, kein Kleingedrucktes, DSGVO, 3 Minuten.
5. **How it works** – 3 Schritte: Profil angeben, Angebote vergleichen, Antrag stellen.
6. **CTA-Section** – Dunkler Kontrastblock mit Haupt-CTA.
7. **Footer** – Logo, Kurzbeschreibung, Links (Produkt, Rechtliches), Disclaimer.

## Technische Umsetzung
- Projekt ist bereits TanStack Start + Tailwind v4.
- Token-basiertes Design in `src/styles.css` mit oklch-Werten für `--background`, `--foreground`, `--brand`, `--brand-deep`, `--surface`, `--ink`, `--muted`, `--line`.
- Schriften über Google Fonts im `<head>` der Root-Route laden.
- Keine neuen Dependencies.
- Responsiv und barrierefrei (semantische Tags, Aria-Labels, reduced-motion).
- Deutsche Copy, Platzhalter-Marke "Klaro" wird durch echten Namen ersetzt, sobald vorhanden.

## Offene Inhalte (Platzhalter)
- Firmen-/Produktname
- Konkrete Kreditprodukte
- Reale Zahlen/Claims (Zinssätze, Bankenanzahl, Bewertungen)
- Rechtliche Angaben für Footer/Disclaimer

## Akzeptanzkriterien
- [ ] `/` zeigt die fertige One-Pager-Landingpage statt des Platzhalters.
- [ ] Helles Theme, grüner Akzent, abgestimmte Typografie.
- [ ] Alle Sektionen der gewählten Richtung sind vorhanden und responsive.
- [ ] Keine hartkodierten Farbklassen außerhalb des Token-Systems.
- [ ] SEO-Meta-Daten (title, description, og) sind für die Startseite gesetzt.
