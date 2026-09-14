# Banklogos in die Partnerleiste einsetzen

Die 14 hochgeladenen Logos ersetzen die bisherigen Textnamen in der Partnerbanken-Leiste direkt unter dem Hero.

## Logos
Santander, Postbank, CreditPlus, Commerzbank, auxmoney, HypoVereinsbank, Bank of Scotland, DKB, Deutsche Bank, ING, VVRB (Volksbank), S-Kredit-per-Klick, TARGOBANK, Von Essen Bank

## Umsetzung
- Jedes Logo als CDN-Asset ablegen (`src/assets/<name>.svg.asset.json`), ohne die Originaldateien ins Projekt zu kopieren.
- In `src/components/landing/sections.tsx` die Liste `PARTNER_ROWS` von Namen auf Logo-Einträge umstellen (Bildquelle + Name als Alt-Text).
- Anzeige: zwei Reihen à 7 Logos, mittig ausgerichtet, einheitliche Höhe (ca. 24–28 px), volle Farbigkeit auf weißem Hintergrund.
- Die Platzhalter-Namen ohne Logo („Beispielbank AG“, „Nordkredit“, „Consors Finanz“) entfallen aus der Leiste.
- Responsiv: mobil 2 Spalten, Tablet 4, Desktop 7.

## Prüfung
- Typecheck und ein Preview-Durchlauf mit Screenshot (Desktop und Mobil), um Skalierung und Ausrichtung der Logos zu kontrollieren.

## Hinweis
Die Logos sind fremde Marken – Einsatz nur mit euren Rechten/Freigaben. Alle Zahlen, Namen und Rechtstexte bleiben weiterhin Beispielwerte.
