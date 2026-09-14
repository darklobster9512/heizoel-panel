# /lieferung-zahlung: Layout-Anpassungen

## Ziel
Zwei visuelle Anpassungen auf der bestehenden Seite `/lieferung-zahlung`:
1. Zahlungsarten als 3 einzelne Zeilen (statt 3 Spalten) darstellen.
2. Lieferfrist-Box: die drei farbigen Pillen/Balken durch das hochgeladene Tacho-Bild (`lieferfrist.png`) ersetzen.

## Aufbau

### 1. Zahlungsarten als Zeilen
- `PAYMENT_METHODS` bleibt unverändert (Daten).
- Grid `mt-8 grid gap-6 md:grid-cols-3` wird zu `mt-8 grid gap-4` (immer 1 Spalte).
- Jede `article`-Karte behält `rounded-xl border border-line bg-card p-6 shadow-sm`.
- Innerhalb jeder Karte: Bild links, Text rechts (flex-row) auf Desktop; auf Mobile weiterhin untereinander (flex-col).
  - Bild: `h-20 w-auto object-contain` (oder passend zur Zeilenhöhe), selbst-startend.
  - Titel und Absätze rechts daneben.
- Abstände und Typografie beibehalten; keine neuen Farben.

### 2. Lieferfrist-Box mit Tacho-Bild
- Das hochgeladene Bild `lieferfrist.png` als Lovable-Asset hochladen:
  ```bash
  lovable-assets create --file /mnt/user-uploads/lieferfrist.png --filename lieferfrist.png > src/assets/lieferfrist.png.asset.json
  ```
- In `src/routes/lieferung-zahlung.tsx` importieren:
  ```ts
  import lieferfristAsset from "@/assets/lieferfrist.png.asset.json";
  ```
- Lieferfrist-Box (`h-fit rounded-xl border border-line bg-card p-6 shadow-sm`) behält Überschrift und Erklärungstext.
- Bereich mit Labels „niedrig/mittel/hoch" und den drei `bg-brand/*`-Balken wird entfernt.
- Stattdessen wird das Tacho-Bild eingefügt:
  ```tsx
  <img
    src={lieferfristAsset.url}
    alt="Aktuelle Lieferfrist: hohe Auslastung"
    loading="lazy"
    className="mx-auto mt-5 h-auto w-full max-w-[280px] object-contain"
  />
  ```
- Optional: das pulsierende „hoch"-Badge unter dem Bild beibehalten, falls es weiterhin als Status-Label dienen soll. Entscheidung: beibehalten, da der Text „hoch" weiterhin korrekt ist und das Bild selbst keine Beschriftung trägt.

## Technische Umsetzung
- Keine neuen Abhängigkeiten.
- Keine Änderungen an Header, Footer, CTA-Banner oder anderen Sektionen.
- Build-Log prüfen und Playwright-Screenshots (Desktop/Mobil) von `/lieferung-zahlung` erstellen.

## Nicht enthalten
- Keine dynamische Lieferfrist (Bild bleibt statisch).
- Keine Änderung an der Navbar.
