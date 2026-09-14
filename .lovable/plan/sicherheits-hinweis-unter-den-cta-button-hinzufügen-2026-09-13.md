Sicherheits-Hinweis unter den CTA-Button hinzufügen

- In `src/components/landing/offer-card.tsx` unter den „Jetzt Heizölpreise vergleichen"-Button eine einzeilige, graue Zeile einfügen:
  - `Shield`-Icon (Lucide) + „100% sicher & kostenlos"
  - Trennpunkt `•`
  - `Check`-Icon (Lucide) + „Keine versteckten Kosten"
- Textfarbe gräulich (`text-muted` o. ä.), Schriftgröße klein (`text-xs` / `text-[13px]`), Icons passend zur Schriftgröße skalieren, alles in einer Zeile ohne Umbruch.
- Build prüfen und per Screenshot Desktop/Mobil verifizieren.