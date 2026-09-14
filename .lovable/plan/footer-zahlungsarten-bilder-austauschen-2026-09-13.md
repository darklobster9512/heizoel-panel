# Footer: Zahlungsarten-Bilder austauschen

## Ziel
Das einzelne, niedrig aufgelöste Zahlungsarten-Bild im Footer durch die drei hochauflösenden Zahlungsarten-Bilder von `/lieferung-zahlung` ersetzen.

## Änderungen

### `src/components/landing/sections.tsx`
- Importe ergänzen:
  - `barzahlungAsset` aus `@/assets/barzahlung.png.asset.json`
  - `vorauskasseAsset` aus `@/assets/vorauskasse.png.asset.json`
  - `ecKarteAsset` aus `@/assets/ec-karte.png.asset.json`
- Import `zahlungsarten` aus `@/assets/zahlungsarten.webp.asset.json` entfernen.
- Im Footer-Bereich „Zahlungsarten" (ca. Zeile 899–909) das `<img>`-Tag für `zahlungsarten.url` ersetzen durch eine horizontale Gruppe der drei Bilder:
  - Container: `flex flex-wrap items-center gap-3 mt-3`
  - Jedes Bild mit passendem `alt`, `loading="lazy"`, `className="h-10 w-auto object-contain md:h-12"`
  - Keine feste `width`/`height`-Attribute, damit die natürlichen Seitenverhältnisse erhalten bleiben.

## Nicht ändern
- Header, Footer-Links, Awards, CitySEO, CTA-Banner oder andere Seiten.

## Ergebnis
Der Footer zeigt auf allen Seiten (Landingpage, `/preisrechner`, `/lieferung-zahlung`, `/bewertungen`) die drei einzelnen Zahlungsarten-Bilder in besserer Auflösung an.