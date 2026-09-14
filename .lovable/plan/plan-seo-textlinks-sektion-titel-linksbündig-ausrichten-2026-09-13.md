# Plan: SEO-Textlinks-Sektion – Titel linksbündig ausrichten

## Ziel
Die Überschriften in der SEO-Textlinks-Sektion sollen nicht mittig, sondern linksbündig ausgerichtet sein.

## Änderungen
- Haupttitel „Heizöl & Heizölpreise in deutschen Städten" in `CitySeo`: `text-center` → `text-left`.
- Gruppentitel „Heizölpreise nach Bundesland" in `SeoLinkGroup`: `text-center` → `text-left`.
- Sektions-Container bleibt zentriert (`mx-auto max-w-6xl`), nur die Textausrichtung der Titel ändert sich.
- Hintergrund, Link-Ausrichtung und sonstige Styling-Regeln bleiben unverändert.

## Datei-Änderungen
1. `src/components/landing/sections.tsx`
   - In `CitySeo`: Haupttitel-Klasse `text-center` entfernen bzw. `text-left` setzen.
   - In `SeoLinkGroup`: Gruppentitel-Klasse `text-center` entfernen bzw. `text-left` setzen.

## Validierung
Build prüfen und Screenshots Desktop/Mobile erstellen, um linksbündige Titel zu verifizieren.
