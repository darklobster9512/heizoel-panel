# Header-Schatten: etwas weicher, aber sichtbar

## Ziel

Der aktuelle Header-Schatten wirkt wie ein harter 1-Pixel-Strich. Er soll wieder wie ein Schatten aussehen, aber maximal 2 Pixel nach unten ausgreifen und etwas heller/transparenter sein.

## Änderungen

1. **In `src/styles.css`**
   - `shadow-header-strong` anpassen auf einen kurzen, weicheren Schatten, z. B.:
     `box-shadow: 0 2px 2px oklch(0.21 0.02 250 / 0.45);`
   - Oder alternativ `0 2px 3px oklch(0.21 0.02 250 / 0.35);`, falls 0.45 noch zu dunkel wirkt.

2. **In `src/components/landing/site-header.tsx`**
   - Keine strukturelle Änderung; die Klasse `shadow-header-strong` bleibt erhalten.

## Prüfung

- Screenshot mobil (393 px) und Desktop (1280 px): sichtbarer, weicher Schatten direkt unter der Header-Kante, nicht mehr wie ein fester Divider.
- Kein horizontaler Overflow.
- Build/Typecheck fehlerfrei.
