# Plan: CTA-Sektion austauschen

## Ziel
Die grüne Vollbreit-CTA (`CtaCard`) entfernen und dafür die bestehende „Prämie für jede Bestellung: Freunde werben!“-Sektion (`ReferralBanner`) an diese Position schieben.

## Änderungen

### 1. Reihenfolge in `src/routes/index.tsx` anpassen
Aktuelle Reihenfolge:
```text
...
<HeizoelSorten />
<CtaCard />
<TrustLinks />
<ReferralBanner />
```

Neue Reihenfolge:
```text
...
<HeizoelSorten />
<ReferralBanner />
<TrustLinks />
```

- `<CtaCard />` entfernen.
- `<ReferralBanner />` zwischen `<HeizoelSorten />` und `<TrustLinks />` platzieren.
- Den `CtaCard`-Import aus `src/components/landing/sections` entfernen.

### 2. Nicht mehr benötigte CTA-Komponente bereinigen
- `export function CtaCard()` in `src/components/landing/sections.tsx` entfernen.
- Design-Token `--cta-bg` in `src/styles.css` entfernen, da keine weitere Stelle es nutzt.

### 3. Verifikation
- Build laufen lassen und prüfen, dass keine Fehler auftreten.
- Screenshot der Landingpage prüfen: Zwischen „Heizölsorten im Überblick“ und „Vertrauen Sie auf Klaro“ erscheint jetzt die „Freunde werben“-Sektion, die grüne CTA ist verschwunden.
