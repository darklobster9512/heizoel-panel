# Heizölsorten-Tabelle: Breite, Info-Spalte, Tropfen-Icons, graue X

## Änderungen in `src/components/landing/sections.tsx` (Komponente `HeizoelSorten`)

### 1. Breite
- Container von `max-w-[980px]` auf `max-w-[1283px]` (gleiche Breite wie der restliche Content, z. B. TrustLinks) ändern.

### 2. Info-Punkt als eigene Spalte
- Grid-Spalten: `Merkmal | Info | Heizöl Standard | Heizöl Premium`, Desktop z. B. `grid-cols-[1fr_48px_220px_220px]`, mobil entsprechend schmaler. Die Info-Spalte bleibt in der Kopfzeile leer.
- Interaktion: Tooltip beim Drüberfahren; bei Klick bleibt die Info geöffnet, bis woanders hingeklickt wird. Umsetzung mit shadcn `Popover` plus gesteuertem State: `onMouseEnter` öffnet, `onMouseLeave` schließt nur, wenn nicht angeklickt; Klick pinnt den Info-Text (Popover `open`-State), Klick außerhalb schließt wieder.

### 3. Tropfen-Icon ersetzen
- Hochgeladenes Bild `heizöldrop.png` (roter Tropfen) in zwei Farbvarianten umwandeln:
  - `#7AB616` (Grün) für „Das Günstige“ (Text ebenfalls `#7AB616`)
  - `#A0522D` (Braun) für „Das Sparsame“ (Text ebenfalls `#A0522D`)
- Einfärben per ImageMagick (`magick heizöldrop.png -alpha extract`/`+level-colors`), Ergebnis als CDN-Assets anlegen (`lovable-assets create`) und als `<img>` in der Tabellen-Kopfzeile verwenden. Lucide-Icons `Droplet`/`Flame` entfallen dort.

### 4. X-Markierungen grau
- `X`-Icon von `text-destructive` auf `text-muted-foreground` ändern; Häkchen bleiben brand-grün.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil: volle Breite, Info-Spalte, Hover-Tooltip, angeklickter (gepinnter) Info-Text, neue Tropfen-Icons in beiden Farben, graue X.
