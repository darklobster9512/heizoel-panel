# Partnerlogos: Reihenfolge und Größe wie in der Vorlage

Die Logoleiste unter dem Hero wird an die Vorlage angeglichen — gleiche Reihenfolge, größere Darstellung, linksbündige Ausrichtung.

## Reihenfolge (wie in der Vorlage)
Reihe 1: TARGOBANK, Vereinigte Volksbank Raiffeisenbank, CreditPlus, ING, Santander, Postbank, S-Kredit-per-Klick
Reihe 2: Commerzbank, auxmoney, HypoVereinsbank, Bank of Scotland, DKB, Consors Finanz, Deutsche Bank

## Darstellung
- Logos deutlich größer: Zeilenhöhe rund 40 px, Logos bis ca. 36 px hoch und bis ca. 150 px breit.
- Nicht mehr zentriert, sondern am linken Rand der jeweiligen Spalte ausgerichtet, wie in der Vorlage.
- Einzelne Logos brauchen abweichende Größen, damit die optische Wirkung stimmt (z. B. DKB und Postbank größer, ING/Santander mittel) — pro Logo eine eigene Höhenangabe.
- Abstände zwischen den beiden Reihen wie in der Vorlage (enger als bisher), Leiste weiterhin auf weißem Hintergrund.
- Mobil 2 Spalten, Tablet 4, Desktop 7 — Ausrichtung und Skalierung bleiben erhalten.

## Prüfung
Screenshot der Leiste in Desktopbreite und Vergleich mit der Vorlage sowie ein Blick auf die mobile Ansicht.

## Technisch
Nur `src/components/landing/sections.tsx` (`PARTNER_ROWS` und `TrustBar`); Logos liegen bereits als Assets vor.
