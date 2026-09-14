# Plan: SEO-Textlinks-Sektion linksbündig und mit grauem Hintergrund

## Ziel
Die gerade eingefügte SEO-Textlinks-Sektion „Heizöl & Heizölpreise in deutschen Städten" soll visuell dezenter werden und den Links linksbündig ausgerichtet sein (wie im Screenshot gezeigt). Außerdem soll sie den gleichen grauen Hintergrund wie andere graue Sektionen erhalten.

## Änderungen

### 1. Hintergrundfarbe
- `CitySeo`-Wrapper ändern von `bg-white` auf `bg-surface` (gleiche graue Fläche wie z. B. die Bedingungs-/Info-Sektionen).

### 2. Link-Ausrichtung
- Links in den 4 Spalten sollen **linksbündig** sein, nicht zentriert.
- Entfernen von `text-center` auf den `<a>`-Elementen; stattdessen `text-left`.
- Die Überschriften der Sektion und der beiden Link-Gruppen bleiben zentriert.
- Das Grid selbst bleibt zentriert im Container (`mx-auto max-w-6xl`).

### 3. Unscheinbarer gestalten
- Schriftgröße der Links leicht reduzieren (z. B. auf `text-[13px]`/`text-[14px]` beibehalten, aber visuell weniger dominant).
- Abstände kompakter (`gap-x-4 gap-y-2` statt `gap-3`), damit die Sektion nicht so viel Raum einnimmt.
- Padding der Sektion reduzieren (`py-12 md:py-16` statt `py-16 md:py-20`).
- Überschriften etwas kleiner und dezenter (`text-[20px] md:text-[24px]` für Haupttitel, `text-[16px] md:text-[18px]` für Gruppentitel).
- Links bekommen nur einen dezenten Hover (`hover:text-brand`), keine Unterstreichung oder Hervorhebung.

## Datei-Änderungen
1. `src/components/landing/sections.tsx`
   - In `CitySeo`: `bg-white` → `bg-surface`.
   - In `SeoLinkGroup`: Links `text-center` → `text-left`.
   - Padding, Schriftgrößen und Abstände in `CitySeo`/`SeoLinkGroup` anpassen.
2. `src/routes/index.tsx` bleibt unverändert.

## Validierung
Build prüfen und Screenshots Desktop/Mobile erstellen, um linksbündige Ausrichtung, grauen Hintergrund und dezente Optik zu verifizieren.
