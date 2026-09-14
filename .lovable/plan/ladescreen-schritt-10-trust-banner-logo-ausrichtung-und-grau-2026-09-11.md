# Ladescreen Schritt 10: Trust-Banner, Logo-Ausrichtung und graue Spalte korrigieren

Der Ladescreen in `/antrag/schritt-10` soll drei Detailkorrekturen erhalten.

## 1. Trust-Banner 1:1 wie auf anderen Seiten

Das aktuelle Banner zwischen den Skeleton-Karten und den Buttons ist nur ein schlichter grauer Balken mit Text. Er wird durch denselben Vertrauensblock ersetzt, der auch unter den Buttons gerendert wird:

- Hintergrund `#f4f5f6`
- Überschrift „TÜV geprüft + SCHUFA-neutral" in `text-[17px] font-bold`
- TÜV-Siegel, Garantie-Siegel und eKomi-Siegel mit Bewertung in einer Reihe
- Abstände und Größen aus `TrustBlock` übernehmen

Um Duplikate zu vermeiden, wird der vorhandene `TrustBlock` aus `src/components/wizard/ui.tsx` an dieser Stelle wiederverwendet und der alte einfache Banner entfernt.

## 2. DKB-Logo nach links verschieben

Das DKB-Logo in der Skeleton-Karte erscheint visuell eingerückt gegenüber ING und TARGOBANK. Es wird innerhalb seines Containers nach links ausgerichtet, sodass alle drei Banklogos auf derselben vertikalen Linie beginnen. Lösung: `object-left` beibehalten und bei Bedarf einen negativen linken Margin oder eine kleinere maximale Breite ergänzen, bis die visuelle Ausrichtung stimmt.

## 3. Graue 5. Spalte über volle Kartenhöhe

In der Skeleton-Karte liegt die graue Hintergrundspalte aktuell nur im unteren Bereich. Die Grid-Struktur wird so angepasst, dass die Spalte von Ober- bis Unterkante der Karte reicht. Dazu wird das Grid in einen Container mit fester Höhe (`h-full`) eingebettet und die graue Spalte (`bg-[#f6f6f6]`) über die volle Zeilenhöhe gestreckt.

## Datei

- `src/routes/antrag/schritt-10.tsx`

## Validierung

- Typecheck/Build
- Visueller Playwright-Screenshot von `/antrag/schritt-10`, um Banner-Parität, Logo-Ausrichtung und volle graue Spalte zu prüfen
