# Plan: Bewertungs-Icons vergrößern

## Ziel
Die drei Logos/Icons in der Bewertungsübersicht unter den Testimonials (eKomi, Trusted Shops, Google) werden deutlich größer skaliert, damit sie besser erkennbar sind.

## Umsetzung
### 1. `src/components/landing/customer-voices.tsx`
- eKomi-Logo: Höhe von `h-[26px]` auf `h-[40px]` erhöhen, Breite weiterhin automatisch (`w-auto`).
- Trusted-Shops-Icon: Größe von `size-[26px]` auf `size-[40px]` erhöhen.
- Google-Icon: Größe von `size-[26px]` auf `size-[40px]` erhöhen.
- Optional die Sterne-/Text-Abstände leicht anpassen, falls nötig, damit es harmonisch wirkt.

### 2. Keine weiteren Änderungen
- Testimonials, Hero, OfferCard, Header und Rest der Seite bleiben unverändert.
- Keine Backend- oder Routing-Änderungen nötig.

## Verifikation
- Build prüfen.
- Screenshot Desktop und Mobil der Bewertungsübersicht prüfen: alle drei Icons deutlich größer und erkennbar.