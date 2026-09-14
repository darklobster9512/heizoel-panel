# Plan: TrustBar-Wert korrigieren und kompakter skalieren

## Ziel
Die neue Statistik-Leiste unter dem Hero wird leicht angepasst: Die Kennzahl „Zufriedene Kunden" ändert sich von `33.429` auf `25.429` und die gesamte Sektion wird kleiner skaliert.

## Umsetzung

### 1. `src/components/landing/sections.tsx`
- In `STATS`: `value` für `ZUFRIEDENE KUNDEN` von `"33.429"` auf `"25.429"` ändern.
- Sektion kompakter gestalten:
  - Vertikales Padding reduzieren: `py-6 md:py-8` statt `py-8 md:py-10`.
  - Zahlen etwas kleiner: `text-xl md:text-2xl` statt `text-2xl md:text-3xl`.
  - Labels etwas kleiner: `text-[10px] md:text-[11px]` statt `text-[10px] md:text-xs`.
  - Zeilenabstand/Abstand zwischen Zahl und Label leicht reduzieren: `mt-0.5` statt `mt-1`.

### 2. Keine weiteren Änderungen
- Hero, OfferCard, Header und andere Teile bleiben unverändert.
- Keine Backend- oder Routing-Änderungen nötig.
