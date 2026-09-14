# Plan: Neue Seite /bewertungen

Neue Kundenbewertungs-Seite im Klaro-Stil, inhaltlich an fastenergy24.com/bewertungen.php orientiert, aber mit eigenem Design und eigenen Bewertungstexten. Namen, Zitate und Zahlen sind Platzhalter und können später durch echte Bewertungen ersetzt werden.

## Struktur der Seite (oben nach unten)

1. **Seitenkopf** — wie auf /lieferung-zahlung: graue Fläche (`bg-surface`), H1 „Kundenbewertungen" plus Unterzeile „Über 33.000 zufriedene Kunden bewerten uns mit 4,9 von 5 Sternen".

2. **Gesamtbewertungs-Box** — große Karte mittig: 5 Sterne (grün), „4,9 / 5", „Basierend auf über 33.000 verifizierten Bewertungen".

3. **Kennzahlen-Leiste** — 4 Werte nebeneinander (auf Mobil 2×2), z. B.:
   - 33.000+ Kunden
   - 4,9/5 Bewertung
   - 98 % Weiterempfehlung
   - 500+ Partnerhändler

4. **„Das sagen unsere Kunden"** — Raster mit 8 Bewertungskarten (Desktop 2 Spalten, Mobil 1). Jede Karte: Name (fett), 5 grüne Sterne, Bewertungstext, Badge „Verifizierter Kauf" mit grünem Häkchen. Eigene deutsche Texte rund um Preis, Lieferung, Bestellvorgang.

5. **Vertrauens-Sektion „Warum Kunden uns vertrauen"** — 4 nummerierte Punkte (Erfahrung, Partnerhändler, Festpreisgarantie, Liefergarantie mit 50 € Entschädigung), auf grauer Fläche.

6. **CTA-Banner** — vorhandene `ReferralBanner`-Sektion (wie Landingpage/Preisrechner): „Jetzt Heizöl günstiger bestellen!", Button „Heizölpreis berechnen" → /preisrechner.

7. **Footer** — identischer `SiteFooter` wie auf den anderen Seiten (inkl. Städte-/Bundesländer-Links).

## Technische Details

- Neue Datei `src/routes/bewertungen.tsx` mit `createFileRoute("/bewertungen")`.
- Eigener `head()`-Block: Title „Kundenbewertungen | Klaro", Description, og:/twitter:-Meta, `og:type: website`, `twitter:card: summary_large_image` (kein og:image, da kein absolutes Hero-Bild).
- Wiederverwendung: `SiteHeader`, `SiteFooter`, `ReferralBanner` aus `@/components/landing/*`; Icons aus `lucide-react` (Star, BadgeCheck/CheckCircle2, ShieldCheck, Truck, Lock).
- Bestehende Design-Tokens: `bg-surface`, `bg-card`, `border-line`, `text-ink`, `text-conditions`, `text-muted-custom`, `text-brand`, `bg-brand/10`; Karten mit `rounded-xl border border-line bg-card shadow-sm` — kein hartcodiertes Grün außer über Tokens.
- Daten (Stats, 8 Bewertungen, Vertrauenspunkte) als Konstanten im selben File, analog /lieferung-zahlung.
- JSON-LD (`AggregateRating`) kommt NICHT rein, solange Zahlen Platzhalter sind.
- Keine neuen Abhängigkeiten, kein Backend. Header-Navigation bleibt unverändert (Link auf die Seite kann später ergänzt werden).
- Abschluss: Build-Check + Playwright-Screenshots Desktop & Mobil.
