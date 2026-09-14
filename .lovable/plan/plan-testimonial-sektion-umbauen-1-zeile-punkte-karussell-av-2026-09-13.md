# Plan: Testimonial-Sektion umbauen (1 Zeile, Punkte-Karussell, Avatar-Bild)

## Ziel
Die Kundenbewertungs-Sektion zeigt statt drei Laufband-Reihen nur noch eine Zeile mit größeren Karten (3 auf einen Blick), die per Punkte-Karussell weitergeblättert werden kann. Gesamtnote wird 4,9/5, Initialen werden durch das hochgeladene Avatar-Bild ersetzt und hinter den Sternen steht „5/5".

## Umsetzung

### 1. Avatar-Asset
- `avatar.svg` aus dem Upload als CDN-Asset anlegen: `lovable-assets create --file /mnt/user-uploads/avatar.svg --filename avatar.svg > src/assets/avatar.svg.asset.json`.

### 2. `src/components/landing/customer-voices.tsx`
- Überschrift-Gesamtnote: `4,6` → `4,9` (also „4,9/5 von 21.400 Bewertungen").
- Bewertungsliste kürzen: von 23 auf 9–12 Stimmen (3 Seiten à 3–4 Karten).
- Marquee-Reihen (`MarqueeRow`, 3 Zeilen, CSS-Animation) entfernen.
- Neues Punkte-Karussell: horizontale Snap-Scroll-Liste, pro Seite 3 sichtbare Karten (Desktop; mobil 1 Karte). Darunter Punkte-Navigation: ein Punkt pro Seite, aktiver Punkt grün hervorgehoben; Klick auf einen Punkt oder Pfeil rechts/links scrollt zur Seite (`scrollTo` mit smooth behavior).
- Karten größer: Breite von 265px auf ca. 340–360px, größere Schrift (`text-[15px]`), mehr Padding (`p-6`).
- Initialen-Kreis durch das Avatar-Bild ersetzen: `<img src={avatarAsset.url} className="size-11 rounded-full" alt="" />` bei jeder Karte.
- Hinter den 5 Sternen in jeder Karte den Text `5/5` ergänzen (klein, gräulich).
- `AVATARS`-Farben und `avatar`-Feld im Voice-Typ entfernen.
- Bewertungs-Übersicht unten (eKomi/Trustpilot/Google) bleibt unverändert.
- Nicht mehr benötigte Marquee-CSS (`marquee`, `marquee-reverse`) in `src/styles.css` nur entfernen, wenn sie sonst nirgends genutzt wird (vorher per rg prüfen).

### 3. Verifikation
- Build-Log prüfen, Screenshot Desktop + Mobil der Sektion.

## Nicht geändert
Hero, OfferCard, TrustBar, Header und Rest der Seite bleiben unverändert. Keine Backend-Änderungen.
