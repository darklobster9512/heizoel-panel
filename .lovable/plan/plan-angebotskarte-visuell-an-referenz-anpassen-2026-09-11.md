# Plan: Angebotskarte visuell an Referenz anpassen

## Ziel
Die TARGOBANK-Angebotskarte auf `/angebote` soll optisch dem neuen Referenz-Screenshot (swkbank-Karte) entsprechen:

- Abgerundete Ecken (`border-radius` statt kantig)
- Deutliche, linke grüne Akzent-Outline/Border
- Gesamter Rahmen ggf. ebenfalls grün, aber links betont dicker
- Keine weiteren inhaltlichen oder funktionalen Änderungen

## Betroffene Datei
- `src/routes/angebote.tsx` (Zeilen 249–322, Angebotskarte)

## Technische Umsetzung
1. Hauptcontainer der Karte erhält `rounded-lg` oder größeren Radius.
2. Anstelle von `border border-brand` verwenden wir:
   - `border border-brand` beibehalten, aber ergänzend `border-l-[4px]` oder `border-l-8` an der linken Seite.
   - Alternativ: Pseudo-Element/Wrapper mit dickerer linker grüner Linie (`border-l-4 border-brand`).
3. Interne Layout-Elemente (Empfehlungs-Badge, Content-Spalten) bleiben unverändert.
4. Keine Änderungen an Interaktivität, Zuständen oder weiteren Komponenten.
5. Tailwind v4 Utility-Klassen verwenden (`rounded-lg`, `border-l-4`, `border-brand`, ggf. `overflow-hidden`).

## Validierung
- Playwright-Screenshot der `/angebote`-Seite im Desktop-Viewport
- Visueller Vergleich mit dem hochgeladenen Referenz-Screenshot
- Prüfung, dass Karte keine Kanten mehr hat und linke Outline deutlich hervortritt

## Nicht im Scope
- Änderungen an den Filterfeldern oben
- Änderungen am Detail-Panel rechts
- Änderungen an Inhalten, Texten, Mock-Daten oder der Weiterleitung
