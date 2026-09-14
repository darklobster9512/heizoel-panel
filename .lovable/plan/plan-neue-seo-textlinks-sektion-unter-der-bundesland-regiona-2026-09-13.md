# Plan: Neue SEO-Textlinks-Sektion unter der Bundesland-Regionalsektion

## Ziel
Direkt unterhalb der bestehenden „Heizöl in Ihrem Bundesland bestellen"-Sektion (RegionalSeo) soll eine weitere SEO-Optimierungs-Sektion eingefügt werden. Sie enthält zwei Gruppen von Text-Links (keine Buttons), die vorerst ins Leere verlinken.

## Inhalt

### Sektion 1: Deutsche Städte
- **Headline:** „Heizöl & Heizölpreise in deutschen Städten"
- **Links (20 Stück, 4 Spalten, 5 Zeilen):**
  1. Heizölpreise Berlin
  2. Heizöl Hamburg kaufen
  3. Heizölpreis München heute
  4. Heizöl Köln bestellen
  5. Heizölpreise Frankfurt
  6. Heizöl Düsseldorf bestellen
  7. Heizölpreis Dortmund heute
  8. Heizöl Essen kaufen
  9. Heizölpreise Leipzig
  10. Heizöl Bremen bestellen
  11. Heizölpreise Dresden
  12. Heizöl Hannover kaufen
  13. Heizölpreis Nürnberg heute
  14. Heizöl Duisburg bestellen
  15. Heizölpreise Bielefeld
  16. Heizöl Bochum bestellen
  17. Heizölpreise Bonn
  18. Heizöl Münster kaufen
  19. Heizölpreis Kiel heute
  20. Heizölpreise Chemnitz

### Sektion 2: Bundesländer (als Wiederholung/Anker)
- **Headline:** „Heizölpreise nach Bundesland"
- **Links (16 Stück, 4 Spalten, 4 Zeilen):**
  1. Heizölpreise Baden-Württemberg
  2. Heizöl Bayern kaufen
  3. Heizölpreise Berlin
  4. Heizöl Brandenburg bestellen
  5. Heizölpreise Bremen
  6. Heizöl Hamburg kaufen
  7. Heizölpreise Hessen
  8. Heizöl Meckl.-Vorpommern bestellen
  9. Heizölpreise Niedersachsen
  10. Heizöl NRW kaufen
  11. Heizölpreise Rheinland-Pfalz
  12. Heizöl Saarland bestellen
  13. Heizölpreise Sachsen
  14. Heizöl Sachsen-Anhalt kaufen
  15. Heizölpreise Schleswig-Holstein
  16. Heizöl Thüringen bestellen

## Design-Vorgaben
- Weißer Hintergrund (`bg-white`), wie RegionalSeo.
- Zentrierte Überschriften in `text-conditions`.
- Links als `<a href="#">` (vorerst ins Leere), zentriert ausgerichtet, in `text-conditions` mit Hover-Farbe `text-brand`.
- Grid immer 4 Spalten (`grid-cols-4`) – auch auf Mobile, damit die Vorgabe „4 Spalten immer" erfüllt ist.
- Abstände zwischen den Link-Gruppen (`mt-12` oder ähnlich).
- Padding und Max-Width analog zur RegionalSeo (`max-w-6xl px-5 py-16 md:py-20`).

## Datei-Änderungen
1. `src/components/landing/sections.tsx`
   - Neue Komponente `CitySeo` am Ende der Datei exportieren.
   - Zwei Daten-Arrays für Städte und Bundesländer definieren.
2. `src/routes/index.tsx`
   - `CitySeo` importieren.
   - `<CitySeo />` zwischen `<RegionalSeo />` und `<SiteFooter />` einfügen.

## Validierung
Build prüfen und Screenshots Desktop/Mobile erstellen, um korrekte 4-Spalten-Darstellung und Reihenfolge zu verifizieren.
