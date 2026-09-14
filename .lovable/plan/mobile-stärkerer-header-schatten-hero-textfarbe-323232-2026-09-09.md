# Mobile: stärkerer Header-Schatten + Hero-Textfarbe #323232

## Ziel

Zwei gezielte visuelle Anpassungen:

1. **Mobiler Header-Schatten** unter dem Header soll kräftiger/dunkler wirken, sich aber nur wenige Pixel nach unten ausbreiten.
2. **Alle bisher schwarzen/schwarz-wirkenden Texte im Hero** sollen auf `#323232` umgestellt werden – sowohl mobil als auch desktop.

## Änderungen

### 1. Header-Schatten (nur mobil)

- In `src/styles.css` eine neue Utility `@utility shadow-header-strong` definieren, z. B.:
  `box-shadow: 0 3px 6px oklch(0.21 0.02 250 / 0.22);`
  (kurze Ausbreitung, deutlich höhere Opazität).
- In `src/components/landing/site-header.tsx` nur für den mobilen Header (`md:`) den bisherigen `shadow-header` durch die neue starke Variante ersetzen. Desktop bleibt bei `shadow-none`.

### 2. Hero-Textfarben auf #323232

- In `src/styles.css` einen neuen Token `--hero-text: #323232` im `:root` und `.dark`-Block ergänzen und im `@theme inline`-Block als `--color-hero-text` registrieren.
- In `src/components/landing/hero.tsx` alle Texte, die bisher `text-ink` oder andere dunkle Farben nutzen, auf `text-hero-text` ändern:
  - Hauptüberschrift
  - Drei Vorteilspunkte (Listenelemente)
  - Bewertung „4.9/5"
  - Unterzeile „aus 705 Bewertungen …"
  - Keine Änderung an grünen Akzenten, grauen Hinweisen oder Brandfarben.

## Prüfung

- `bun run build` bzw. `tsgo --noEmit` ausführen.
- Playwright-Screenshot bei 393 × 852 px: stärkerer Header-Schatten, Hero-Texte in #323232.
- Desktop-Screenshot bestätigt, dass Header weiterhin keinen Schatten hat und Hero-Text ebenfalls #323232 nutzt.
