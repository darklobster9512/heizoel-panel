# Handy-Mockup: Logo-Reihenfolge ändern, Aral durch NORDOEL ersetzen

## Ziel
Im Handy-Bild der Sektion „Mit Klaro zum günstigsten Heizölpreis" (Angebotsliste):
- **TotalEnergies ganz oben** (statt Aral)
- **Aral komplett entfernen** und durch das neue **NORDOEL-Logo** ersetzen (Upload: `/mnt/user-uploads/nordoel-2.jpg`)

Neue Reihenfolge der Karten:
1. TotalEnergies
2. Montana
3. team
4. NORDOEL
5. (unten angeschnitten) TotalEnergies — Wiederholung wie bisher, damit die Liste endlos wirkt

## Vorgehen

1. **Bild neu bearbeiten:** Ausgehend vom ursprünglich gerasterten Mockup (`/tmp/browser/offerlist/offer-list.png`) per Bildbearbeitung die Bankenlogos in obiger Reihenfolge ersetzen: TotalEnergies, Montana, team, NORDOEL, unten wieder TotalEnergies. Ergebnis überschreibt `/tmp/browser/offerlist/heizoel-offer-list.png`.
2. **Als CDN-Asset hochladen:** `lovable-assets create` mit dem neuen PNG → neue Pointer-Datei `src/assets/heizoel-offer-list.png.asset.json` (Import in `src/components/landing/sections.tsx` bleibt gleich, nur die Asset-URL ändert sich).
3. **Prüfen:** Build-Log checken, Screenshots der Sektion auf Desktop (1280px) und Mobil (390px) aufnehmen und kontrollieren, dass kein Aral-/Bankenlogo mehr sichtbar ist und die Reihenfolge stimmt.

## Betroffene Dateien
- `src/assets/heizoel-offer-list.png.asset.json` (neuer Asset-Pointer)
- `src/components/landing/sections.tsx` (nur falls sich der Dateiname ändert)

Nicht berührt: Rest der Landingpage, Antragsstrecke, Preise/Texte.
