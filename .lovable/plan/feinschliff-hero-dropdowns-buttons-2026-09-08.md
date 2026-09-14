# Feinschliff Hero-Dropdowns & Buttons

## Ziel
Die drei Dropdowns in der Hero-Angebotskarte sollen wie im Original-Smava-Look funktionieren und alle Buttons weniger stark abgerundet sein.

## 1. Hero-Dropdowns (OfferCard)
- Native `<select>`-Elemente in `src/components/landing/offer-card.tsx` durch die shadcn-`Select`-Komponente ersetzen.
- **Dropdown-Styling:**
  - Keine abgerundeten Ecken an Trigger, Content und Items (`rounded-none`).
  - Pfeil dreht sich beim Öffnen nach oben (`data-[state=open]:rotate-180`).
  - Hintergrund des Pfeil-Bereichs bleibt unverändert (transparent, kein Hover-/Focus-Effekt).
  - Mehr Abstand zwischen den Optionen (größeres `py` im Item).
  - Ausgewählter Eintrag: Hintergrund `#eff8f1`.
  - Hover über nicht ausgewählte Einträge: gräulicher Hintergrund (z. B. `#f3f4f6` bzw. `bg-slate-100`).
- Falls nötig, fehlen CSS-Variablen/Utilities in `src/styles.css` ergänzen (`--select-selected`, `--select-hover`).

## 2. Buttons abgerundeter reduzieren
- Radius aller Buttons verringern: in `src/components/ui/button.tsx` von `rounded-md` auf `rounded-[4px]` umstellen.
- Ggf. den hartkodierten CTA-Button in `offer-card.tsx` ebenfalls auf `rounded-[4px]` anpassen.

## 3. Validierung
- `bun run build` erfolgreich durchlaufen lassen.
- Desktop- und Mobile-Screenshots der Hero-Karte prüfen: Dropdown geöffnet, Pfeil oben, kantige Ecken, weniger gerundete Buttons.
