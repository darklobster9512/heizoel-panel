# UI-Feinabstimmung Angebotsseite

## Ziel
Zwei kleine visuelle Korrekturen auf `/preisrechner/ergebnis`.

## Änderungen

### 1. Zahlungsart „Rechnung"-Icon austauschen
- In `src/routes/preisrechner.ergebnis.tsx` wird `PAYMENTS` für „Rechnung" nicht mehr als `img: null` geführt.
- Stattdessen erhält „Rechnung" das gleiche Bild wie „Vorkasse" (`vorauskasse.url`).
- Das `FileText`-Fallback-Icon entfällt damit.

### 2. Tab-Icons Standard/Premium austauschen
- Das aktuelle `Flame`-Icon vor „Standard" und „Premium" wird entfernt.
- Stattdessen wird das Tropfen-Icon aus der Landingpage-Vergleichstabelle (`@/assets/drop-green.png.asset.json`) verwendet.
- Beide Tabs zeigen **dieselbe** Tropfen-Grafik.
- Farbe:
  - Aktiver Tab: Icon in Originalgrün.
  - Inaktiver Tab: Icon in Graustufen (`grayscale`) / gedimmt.
- Leeres `alt`-Attribut, da das Icon rein dekorativ ist.

## Technische Details
- Import ergänzen: `import dropGreen from "@/assets/drop-green.png.asset.json";`
- Import `Flame` aus `lucide-react` entfernen.
- In den Tab-Buttons `<img src={dropGreen.url} … />` rendern und per Bedingung die Graustufen-Klasse toggeln.

## Nicht im Scope
- Keine Änderung an Preisen, Layout-Breite oder weiteren Sektionen.
- Keine neuen Seiten oder Backend-Logik.
