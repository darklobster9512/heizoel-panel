# Header-Schatten: enger, stärker, auch Desktop

## Ziel

Der Schatten unter dem Header soll sich maximal 2 Pixel nach unten ausbreiten, dafür deutlich stärker/dunkler wirken – mobil und ab sofort auch auf Desktop.

## Änderungen

1. **Neue Schatten-Utility in `src/styles.css`**
   - `shadow-header-strong` anpassen auf eine enge, aber sehr opake Schattenfläche, z. B.:
     `box-shadow: 0 2px 2px oklch(0.21 0.02 250 / 0.45);`
   - Optional zusätzlich eine schwächere `shadow-header` für Desktop belassen oder beide anpassen.

2. **Header-Implementierung in `src/components/landing/site-header.tsx`**
   - `md:shadow-none` entfernen, damit der starke Schatten auch auf Desktop aktiv ist.
   - Klasse bleibt `shadow-header-strong`.

## Prüfung

- Screenshot mobil (393 px) und Desktop (1280 px): sichtbarer, aber sehr enger Schatten direkt unter der Header-Unterkante.
- Kein horizontaler Overflow.
- Build/Typecheck fehlerfrei.
