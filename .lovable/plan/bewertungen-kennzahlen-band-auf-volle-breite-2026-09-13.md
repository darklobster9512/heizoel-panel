# /bewertungen: Kennzahlen-Band auf volle Breite

## Ziel
Das Kennzahlen-Band unter dem Hero auf `/bewertungen` soll die gesamte verfügbare Breite nutzen, statt auf `max-w-4xl` begrenzt zu sein.

## Änderungen in `src/routes/bewertungen.tsx`

1. **Container auf volle Breite**
   - Entferne `max-w-4xl` beim `<dl>` des Kennzahlen-Bands.
   - Ersetze es durch `w-full`, damit die Sektion bis zu den Seitenrändern (`px-5`) reicht.

2. **Harmonische Aufteilung bei voller Breite**
   - Behalte das 5-Spalten-Grid auf Desktop bei (`md:grid-cols-5`).
   - Erhöhe den horizontalen Innenabstand der einzelnen Zellen leicht (`px-4 md:px-6`), damit die Werte bei voller Breite nicht an den Trennlinien kleben.
   - Vertikale Trennlinien (`md:divide-x md:divide-line`) bleiben erhalten.

3. **Zahlen- und Label-Größen prüfen**
   - Werte (`dd`) und Labels (`dt`) behalten ihre aktuellen Größen bei, damit keine Überproportion entsteht.
   - Bei Bedarf leicht größere Werte auf sehr breiten Viewports (`lg:text-[30px]`) optional ergänzen.

4. **Mobile Darstellung**
   - `grid-cols-2` auf Mobil und `sm:grid-cols-3` bleiben unverändert.
   - Keine Trennlinien unterhalb von `md`, damit das 2×2-Layout sauber bleibt.

## Technisch
- Nur `src/routes/bewertungen.tsx` wird angepasst.
- Keine neuen Abhängigkeiten.
- Abschluss: Build-Log prüfen und Desktop-/Mobil-Screenshot verifizieren.
