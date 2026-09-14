# Feinabstimmung Antrags-ID-Seite (Sidebar + Cards)

## Ziel
Visuelle 1:1-Korrekturen auf `/kreditantrag/$applicationId` (NUR diese Seite, nicht `/angebote`).

## Änderungen
1. **Angebotskarte (obere Card)**
   - Ecken stärker abrunden (z. B. `rounded-[8px]` oder ähnlich wie im Screenshot).
   - Hover-Outline dünner machen (z. B. `ring-1` statt dickerer Outline).
   - Outline nur beim Hovern, nicht im angeklickten/aktiven Zustand.

2. **Haupter Content-Card (weiße Fläche mit Tabs)**
   - Ebenfalls abgerundetere Ecken (z. B. `rounded-[8px]`).

3. **Sidebar rechts**
   - Schatten-Effekt beim Öffnen entfernen.
   - Weniger Abstand zum restlichen Content (rechter Abstand/Positionierung prüfen).
   - Aktiver Tab: Unterlinie dicker (z. B. `border-b-4` oder `border-b-[3px]`).
   - Hinter dem Schließen-X eine kleine Card mit leichtem Schatten platzieren.

## Technisch
- Nur `src/routes/kreditantrag.$applicationId.tsx` wird angepasst.
- Keine Datenbank-, Auth- oder Funktionsänderungen.
- Typecheck nach den Änderungen.
