# Plan: SEO-Regionalsektion über dem Footer

## Ziel
Über dem Footer wird eine neue SEO-optimierte Sektion eingebaut, die regionale Heizölpreis-Keywords für alle 16 Bundesländer abdeckt. Die Buttons führen vorerst nirgendwo hin.

## Änderungen

### 1. Neue Komponente `RegionalSeo` in `src/components/landing/sections.tsx`
- Sektion mit weißem Hintergrund (`bg-white`).
- Headline: „Heizölpreise nach Region".
- Subheadline: „Heizöl in Ihrem Bundesland bestellen".
- Beschreibung: „Tagesaktuelle Heizölpreise für alle 16 Bundesländer — Lieferung deutschlandweit, Festpreisgarantie."
- Button-Grid: 4 Spalten auf Desktop, 2 Spalten auf Mobile, Abstand `gap-3`.
- 16 Buttons mit den Labels:
  - Heizölpreise Baden-Württemberg
  - Heizöl Bayern kaufen
  - Heizölpreise Berlin
  - Heizöl Brandenburg bestellen
  - Heizölpreise Bremen
  - Heizöl Hamburg kaufen
  - Heizölpreise Hessen
  - Heizöl Meckl.-Vorpommern
  - Heizölpreise Niedersachsen
  - Heizöl NRW kaufen
  - Heizölpreise Rheinland-Pfalz
  - Heizöl Saarland bestellen
  - Heizölpreise Sachsen
  - Heizöl Sachsen-Anhalt
  - Heizölpreise Schleswig-Holstein
  - Heizöl Thüringen bestellen
- Buttons sind `<button>`-Elemente ohne `onClick`/Link, damit sie nirgendwo führen.
- Styling: abgerundete Rahmen-Buttons mit dezentem Hover-Effekt, passend zur restlichen Seite (z. B. `border border-line bg-card text-conditions hover:border-brand hover:text-brand`).

### 2. Einbindung in `src/routes/index.tsx`
- `RegionalSeo` importieren.
- Zwischen `<HeizoelServiceIntro />` und `<TrustLinks />` einfügen.

## Technische Details
- Keine neuen Abhängigkeiten.
- Keine Backend-Änderungen.
- Nach der Änderung Build prüfen und Screenshots Desktop/Mobile anfertigen.
