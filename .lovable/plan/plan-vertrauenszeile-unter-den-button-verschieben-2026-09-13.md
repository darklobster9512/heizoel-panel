# Plan: Vertrauenszeile unter den Button verschieben

## Ziel
In der `ReferralBanner`-Sektion die Vertrauenszeile „Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise" unter den Button verschieben und leicht gräulicher färben.

## Änderungen in `src/components/landing/sections.tsx`
- Desktop- und Mobile-Variante von `ReferralBanner()`: die Vertrauenszeile aus dem Textblock entfernen und **unterhalb** des Buttons platzieren.
- Textfarbe auf ein dezenteres Grau setzen (z. B. `text-muted-custom/80` oder `text-[#6b7280]`, je nach bestehendem Token).
- Layout, Schriftgrößen und Abstände anpassen, sodass die Zeile optisch zum Button gehört.

## Nicht ändern
- Headline, Beschreibungstext und Button-Label
- Bild, Hintergrundfarben, Grid-/Flex-Struktur
- Sonstige Sektionen

## Validierung
- Build prüfen.
- Desktop- und Mobile-Screenshot der Sektion.
