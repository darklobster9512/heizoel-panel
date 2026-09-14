# Plan: Regionale SEO-Sektion unter „Vertrauen Sie auf Klaro" verschieben

## Ziel
Die Sektion „Heizölpreise nach Region" (RegionalSeo) soll nicht mehr zwischen „Heizöl online bestellen" und „Vertrauen Sie auf Klaro" stehen, sondern direkt unterhalb der „Vertrauen Sie auf Klaro"-Sektion (TrustLinks) platziert werden.

## Änderung
In `src/routes/index.tsx` die Komponente `<RegionalSeo />` nach `<TrustLinks />` verschieben:

```text
alt:
<HeizoelServiceIntro />
<RegionalSeo />
<TrustLinks />

neu:
<HeizoelServiceIntro />
<TrustLinks />
<RegionalSeo />
```

## Nicht ändern
- Inhalt, Styling und Komponenten-Logik von `RegionalSeo` bleiben gleich.
- Alle anderen Sektions-Reihenfolgen bleiben erhalten.
- Keine neuen Dateien oder Abhängigkeiten.

## Validierung
Build prüfen und Screenshots Desktop/Mobile erstellen, um korrekte Reihenfolge zu verifizieren.
