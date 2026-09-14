# Plan: Regional-SEO-Sektion dezenter skalieren

## Ziel
Die Sektion „Heizöl in Ihrem Bundesland bestellen" mit den 16 Bundesland-Buttons soll unscheinbarer wirken. Dafür werden die Schriftgrößen der Überschrift, Beschreibung und Buttons verkleinert sowie die Button-Padding reduziert. Der weiße Hintergrund bleibt erhalten.

## Änderungen
- `RegionalSeo`-Komponente in `src/components/landing/sections.tsx` anpassen:
  - Eyebrow „HEIZÖLPREISE NACH REGION" kleiner und dezenter.
  - Haupttitel „Heizöl in Ihrem Bundesland bestellen" verkleinern.
  - Beschreibungstext verkleinern.
  - Button-Text verkleinern und Padding reduzieren.
  - Abstände zwischen Buttons kompakter halten.
- Weißer Hintergrund (`bg-white`) bleibt unverändert.

## Nicht ändern
- Anzahl und Reihenfolge der 16 Buttons.
- 4-spaltiges Grid-Layout.
- Funktionalität der Buttons (führen ins Leere).
- Position der Sektion auf der Seite.

## Validierung
Build prüfen und Screenshots Desktop/Mobile erstellen, um die verkleinerte Darstellung zu verifizieren.
