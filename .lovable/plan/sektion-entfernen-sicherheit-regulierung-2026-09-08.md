# Sektion entfernen: Sicherheit & Regulierung

## Ziel
Die Sektion "Finanzdaten gehören abgesichert" (Komponente `Security`) wird vollständig aus der Landingpage entfernt.

## Schritte
1. `Security` aus dem Import-Block in `src/routes/index.tsx` entfernen.
2. `<Security />` aus dem JSX-Body in `src/routes/index.tsx` entfernen.
3. Die nun ungenutzte `Security`-Komponente aus `src/components/landing/sections.tsx` entfernen, um toten Code zu vermeiden.

## Validierung
- Typecheck (`tsgo` bzw. `bun run build`) prüft, dass keine importierten/unbenutzten Symbole verbleiben.
- Playwright-Screenshot bestätigt, dass nach `ReferralBanner` direkt `CtaBlock` folgt und keine Sicherheits-Sektion mehr sichtbar ist.