# Neue Seite: /faq

Eine FAQ-Seite im Klaro-Design, inhaltlich nach der Vorlage — aber mit unseren Fakten (Mindestmenge 1.500 Liter, 3 Bestellschritte, ca. 7 Werktage Lieferzeit, Zahlung per Barzahlung / Vorauskasse / EC-Karte).

## Aufbau der Seite

1. **Kopfbereich** (grauer Hintergrund, grüne Trennlinie unten, wie auf den anderen Unterseiten)
   "Häufig gestellte Fragen" + Untertitel "Antworten auf alle Fragen rund um Heizöl, Bestellung, Lieferung und Zahlung".

2. **Schnellnavigation**: 4 Kacheln mit Icon (Qualität, Bestellung, Lieferung & Preise, Zahlung), die zum jeweiligen Abschnitt springen.

3. **6 Themenblöcke als aufklappbare Fragen** (Akkordeon, erste Frage je Block offen), abwechselnd weißer und grauer Hintergrund:
   - Qualität der Ware (3 Fragen)
   - Bestellung (3 Fragen)
   - Lieferung (9 Fragen)
   - Preise (5 Fragen)
   - Bezahlung (3 Fragen)
   - Sonstige Themen (5 Fragen)

   Antworttexte werden aus der Vorlage übernommen und auf Klaro angepasst: Firmenname Klaro, Mindestbestellmenge 1.500 Liter, Bestellung in 3 Schritten, Lieferzeit ca. 7 Werktage, Festpreisgarantie, 50 € Entschädigung, Zahlungsarten Barzahlung / Vorauskasse / EC-Karte, keine Kreditkarte.

4. **Kontakt-Hinweis-Box**: "Frage nicht gefunden?" mit Verweis auf Kontaktmöglichkeit.

5. **CTA-Banner** ("Jetzt Heizöl günstiger bestellen!") und der bekannte **Footer** inkl. Städte-/Bundesländer-Links — identisch zu /lieferung-zahlung und /bewertungen.

6. **Header-Navigation**: im Dropdown-Menü kommt ein Punkt "Heizöl FAQ" hinzu, der auf /faq verlinkt.

## Was wir bewusst weglassen

Der Vorlagen-Abschnitt "Heizöl-Finanzierung / Ratenkauf" (10 Fragen) entfällt, weil wir keinen Ratenkauf anbieten. Falls du das doch möchtest, sag es — dann nehme ich den Block mit auf.

## Technische Details

- Neue Route `src/routes/faq.tsx` mit `createFileRoute("/faq")`, eigenem `head()` (Titel, Description, og/twitter) und JSON-LD `FAQPage`-Schema für SEO.
- Fragen/Antworten als typisierte Konstanten (`FAQ_SECTIONS`) mit `id`, `icon`, `title`, `items[{ q, a }]`; Antworten als JSX für Fettungen und interne Links auf `/preisrechner`.
- Akkordeon über das bestehende shadcn-`Accordion` (`@/components/ui/accordion`), Typ `multiple`, Standard-offen für den ersten Eintrag je Block; ausschließlich Design-Tokens (`bg-surface`, `border-line`, `text-ink`, `border-t-brand`).
- Wiederverwendung von `SiteHeader`, `ReferralBanner compact` und `SiteFooter` aus `@/components/landing/*`.
