# Neue Seite `/preisrechner`

## Ziel
Eine eigenständige Preisrechner-Landingpage unter `/preisrechner` anlegen. Sie enthält den Rechner, den 3-Schritte-Ablauf, Vertrauens-/Vorteilsargumente, Kundenbewertung und SEO-Texte. Der Header-Link „Jetzt anmelden" wird durch „Preis berechnen" ersetzt und leitet auf die neue Seite.

## Änderungen

### 1. `src/routes/preisrechner.tsx` (neu)
Neue Route `/preisrechner` mit eigenem `head()` (Title, Description, OG/Twitter).
Seitenaufbau:
- `SiteHeader`
- Hero-Bereich mit Textspalte links und `OfferCard` rechts (wie auf der Startseite, aber ohne Trust-Badges unter der Karte)
- `Steps` („In 3 Schritten zum günstigen Heizöl")
- Vorteilssektion „Warum bei Klaro bestellen?" mit 5 Kacheln und lucide-Icons:
  - Garantiert günstigste Preise
  - Direkt vom Händler ohne Zwischenhändler-Aufschläge
  - Kostenlose Lieferung inklusive
  - Lieferung in 7 Werktagen
  - 100% Käuferschutz
- Bewertungssektion: 5 Sterne, 4,99/5, „Ausgezeichnet", „Basierend auf über 33.000 Kundenbewertungen"
- SEO-Textblöcke (nur auf dieser Seite):
  - Heizölpreise heute — aktueller Tagespreis ab 128,78 €/100L
  - Heizöl kaufen — direkt vom Händler ab 128,78 €/100L
  - Heizölpreis pro Liter — was kostet 1 Liter Heizöl?
  - Heizöl bestellen — in 4 Schritten zum besten Preis
- `SiteFooter`

### 2. `src/components/landing/site-header.tsx`
- Den Header-Button „Jetzt anmelden" in „Preis berechnen" umbenennen.
- Ziel von `/antrag/schritt-1` auf `/preisrechner` ändern.

### 3. `src/routes/index.tsx`
- Keine Änderung am Inhalt, aber sicherstellen, dass der Startseiten-Aufbau unverändert bleibt.

## Technisch
- Route-Datei folgt dem Muster von `src/routes/index.tsx`.
- Wiederverwendung bestehender Komponenten: `SiteHeader`, `OfferCard`, `Steps`, `SiteFooter`.
- Neue Sektionen entweder inline in der Route oder als separate Exporte in `src/components/landing/sections.tsx`, falls sie später auch andernorts genutzt werden sollen.
- Icons aus `lucide-react` für die Vorteilskacheln.
- Keine Backend-/Antragsstrecken-Änderungen.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite.
- Prüfen, dass der Header-Link „Preis berechnen" auf `/preisrechner` verweist.
