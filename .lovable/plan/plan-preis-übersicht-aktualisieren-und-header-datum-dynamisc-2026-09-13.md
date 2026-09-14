# Plan: Preis-Übersicht aktualisieren und Header-Datum dynamisch

## Ziel
Die „Heizöl Preis-Übersicht"-Box unter dem Hero bekommt aktualisierte Werte. Das Datum „Stand 8.9.2026" im Header wird dynamisch auf das jeweilige aktuelle Datum gesetzt.

## Umsetzung

### 1. `src/components/landing/sections.tsx`
- Konstanten für die Preis-Übersicht anpassen:
  - `CONDITIONS_LEFT`:
    - Literpreis: `ca. 128,78 € bis 163,15 € je 100 Liter (Heizöl EL)`
    - Liefermenge: `Min. 1500 bis Max. 32.000 Liter`
  - `CONDITIONS_RIGHT`:
    - Lieferzeit: `ca. 4 bis 10 Werktage, Express möglich`
    - Zahlungsarten: `Vorkasse, Bar, EC-Karte, Rechnung`

### 2. Header-Datum dynamisch
- In der Komponente, die den Header-Bewertungs-Badge rendert (`src/components/landing/site-header.tsx` oder `src/components/landing/rating-badge.tsx`), das hartcodierte Datum „Stand 8.9.2026" durch ein dynamisches Datum ersetzen.
- Das Datum wird client-seitig mit `new Date()` und deutscher Formatierung (`de-DE`, `day.numeric`, `month.numeric`, `year.numeric`) erzeugt, damit es immer dem aktuellen Tag entspricht.
- Server-seitig wird ein identischer Fallback-Wert verwendet, um Hydration-Mismatches zu vermeiden (z. B. einfacher `useEffect`-basiertes Setzen des Datums nach dem ersten Render).

### 3. Keine weiteren Änderungen
- Hero, OfferCard, TrustBar und andere Teile bleiben unverändert.
- Keine Backend- oder Routing-Änderungen nötig.
