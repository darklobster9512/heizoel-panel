# `/preisrechner`: Hero-Titel wieder einsetzen und Card-Hälften tauschen

## Ziel
Die `/preisrechner`-Seite weiter anpassen: Der ursprüngliche Hero-Titel (Eyebrow, H1, Intro-Text) kommt wieder über die mittig zentrierte Hero-Card. Innerhalb der Card tauschen sich die beiden Hälften — die 3 Schritte wandern nach links, der Heizöl-Rechner nach rechts. Die linke Schritte-Hälfte soll dabei die volle Höhe der Card ausfüllen.

## Änderungen

### 1. `src/routes/preisrechner.tsx` — Hero-Titel wieder über die Card
- Über der zentrierten Card wird wieder ein Textblock angezeigt:
  - Eyebrow/Badge: „Nr. 1 Heizöl-Preisvergleich in Deutschland"
  - H1: „Heizölpreis berechnen — sofort & kostenlos"
  - Intro-Text: „Heizölpreise heute ab 128,78 €/100L — über 25.000 Kunden sparen Ø €247 pro Bestellung, direkt vom Händler, deutschlandweit."
- Die aktuelle kurze zentrierte Überschrift („Heizölpreis berechnen" / „Kostenlos & unverbindlich") wird entfernt.
- Die zusätzlichen Check-Bullet-Points unter der Card (100% sicher, Keine versteckten Kosten, Über 500 Partner-Händler) werden entfernt.

### 2. `src/routes/preisrechner.tsx` — Card-Hälften tauschen
- Innerhalb der Hero-Card ändert sich die Reihenfolge:
  - **Linke Hälfte:** Die 3 Schritte („In 3 Schritten zum günstigen Heizöl") als vertikale Liste.
  - **Rechte Hälfte:** `OfferCard` (Heizöl-Rechner).
- Die linke Hälfte soll visuell die **volle Höhe** der Card ausfüllen. Die 3 Schritte werden dazu vertikal so verteilt, dass der verfügbare Platz genutzt wird (z. B. `justify-between`/`h-full` mit gleichmäßigem Abstand oder flexibles Wachsen der Listenelemente).
- Auf Mobile bleibt die Reihenfolge: zuerst die 3 Schritte, dann der Rechner (oder umgekehrt — je nachdem, was dem visuellen Fluss besser dient; hier: Schritte zuerst, da sie jetzt links stehen).

### 3. `src/components/landing/offer-card.tsx`
- Keine Änderung nötig; die `bordered`-Prop bleibt wie zuletzt eingebaut.

### 4. `src/components/landing/sections.tsx`
- Keine Änderung nötig; `STEPS` bleibt exportiert.

## Technisch
- Keine Änderungen an anderen Routen oder Komponenten.
- Responsiv: Desktop = 2 Hälften nebeneinander, Mobile = untereinander.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite.
- Prüfen, dass der alte Hero-Titel sichtbar ist, die Card-Hälften getauscht sind und die linke Schritte-Hälfte die volle Höhe nutzt.
