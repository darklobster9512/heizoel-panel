# Plan: Logo-Carousel durch Statistik-Leiste ersetzen

## Ziel
Unter der Hero-Section wird das bestehende Logo-Carousel entfernt und durch eine grüne Trennlinie plus eine 5-spaltige Statistik-Leiste ersetzt.

## Umsetzung

### 1. `src/components/landing/sections.tsx`
- `TrustBar`-Komponente umbauen:
  - Logo-Marquee, Partner-Imports und zugehörige CSS-Animation entfernen.
  - Oberhalb der Statistik-Leiste eine durchgehende grüne Linie einfügen: `bg-brand`, `h-[3px]`, volle Breite.
  - Darunter ein 5-spaltiges Layout (`grid-cols-5` auf Desktop, auf Mobil geeignet umbrechen z. B. `grid-cols-2` oder `grid-cols-1`).
  - Jede Spalte enthält:
    - **Kennzahl/Zahl** fett: `33.429`, `4.99/5`, `10+`, `500+`, `€247`
    - **Beschreibung** darunter in Großbuchstaben, gräulich, kleiner: `ZUFRIEDENE KUNDEN`, `KUNDENBEWERTUNG`, `JAHRE ERFAHRUNG`, `PARTNER-HÄNDLER`, `Ø ERSPARNIS`
- CSS-Keyframe `partner-marquee` und Klasse `.partner-marquee-track` aus `src/styles.css` entfernen, da nicht mehr benötigt.

### 2. Styling
- Zahlen: `font-semibold` oder `font-bold`, Haupttextfarbe (`text-ink`).
- Labels: `uppercase`, `text-xs`, `text-muted-custom` (gräulich).
- Abstände: vertikales Padding `py-8 md:py-10` beibehalten, horizontale Zentrierung, Spaltenabstand `gap-4 md:gap-6`.

### 3. Keine weiteren Dateien
- Hero, OfferCard, Header und andere Landingpage-Teile bleiben unverändert.
- Keine Backend- oder Routing-Änderungen nötig.
