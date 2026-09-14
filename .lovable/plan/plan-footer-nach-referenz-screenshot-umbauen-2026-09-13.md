# Plan: Footer nach Referenz-Screenshot umbauen

## Ziel
Der Footer wird dem Screenshot nachempfunden: ein hellgrauer, ruhiger Footer mit Marken-/Beschreibungsblock, Services- und Rechtliches-Spalten, Zahlungsarten mit hochgeladenem Bild, Kundenbewertung, darunter eine mittige Leiste „Auszeichnungen & Vertrauen" mit den Hero-Auszeichnungen und unten eine schmale Copyright-/Legal-Zeile. Alles bleibt in Klaro-Branding; keine fastenergy24-Texte.

## Inhalt & Aufbau

### Oberer Footer-Bereich (hellgrau, `bg-surface`)
Desktop: 4 Spalten; Mobile: gestapelt.
1. **Marke**
   - Klaro-Logo (`Logo`)
   - Text: „Heizöl online günstig bestellen. Tagesaktuelle Preise, deutschlandweite Lieferung, über 33.000 zufriedene Kunden."
2. **SERVICES**
   - Hilfe
   - Kontakt
   - Bewertungen (verlinkt auf `#bewertungen`)
   - Lieferung & Zahlung
3. **RECHTLICHES**
   - AGB
   - Impressum
   - Datenschutz
   - Cookie-Einstellungen
   - Widerruf
4. **ZAHLUNGSARTEN + KUNDENBEWERTUNG**
   - Überschrift „ZAHLUNGSARTEN"
   - Hochgeladenes Bild `zahlungsarten.webp` als CDN-Asset einbinden (Barzahlung / Rechnung / Vorauskasse)
   - Überschrift „KUNDENBEWERTUNG"
   - 5 gelbe Sterne + Text „4,99/5 – 33.000+ Bewertungen"

Alle Links führen vorerst auf `#` bzw. vorhandene Anker, ohne neue Seiten.

### Mittlere Leiste
- Trennlinie oben/unten
- Zentrierte Caps-Überschrift: „AUSZEICHNUNGEN & VERTRAUEN"
- Darunter zentriert die vier bestehenden Hero-Auszeichnungen:
  - ntv Gesamtsieger
  - BILD Höchste Empfehlung
  - DIE WELT Service-Champion
  - DtGV Testsieger
- Bilder werden direkt aus den vorhandenen Asset-Imports aus `hero.tsx` wiederverwendet.

### Untere Zeile
- Links: `© 2026 Klaro GmbH | Heizöl online günstig bestellen`
- Rechts: Impressum, Datenschutz, AGB
- Auf Mobile untereinander gestapelt und zentriert/linksbündig passend zur Vorlage.

## Entfernen/Ersetzen
- Der bisherige Footer mit den Spalten „Unternehmen", „Heizöl bestellen", „Service", „Kostenlose Beratung" wird ersetzt.
- Social-Media-Icons und Beratungsblock fliegen raus.
- Bestehende Legal-Links bleiben in der unteren Zeile erhalten.

## Technische Umsetzung
1. `zahlungsarten.webp` aus `/mnt/user-uploads/` per `lovable-assets create` als CDN-Asset anlegen und als `src/assets/zahlungsarten.webp.asset.json` speichern.
2. In `src/components/landing/sections.tsx` den kompletten `SiteFooter` umbauen.
3. Hero-Auszeichnungsbilder im Footer importieren und wiederverwenden.
4. Responsives Verhalten prüfen: Desktop 4 Spalten, Mobile sauber gestapelt.
5. Build prüfen und Desktop-/Mobile-Screenshots erstellen.

## Nicht ändern
- Keine anderen Landingpage-Sektionen.
- Keine neuen Legal- oder Service-Seiten.
- Keine Backend-/Routing-Änderungen.
