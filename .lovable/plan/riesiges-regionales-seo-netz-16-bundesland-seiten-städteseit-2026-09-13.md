# Riesiges regionales SEO-Netz: 16 Bundesland-Seiten + Städteseiten

Ziel: Für jedes Bundesland und für jede wichtige Stadt eine eigene, indexierbare Heizölpreis-Seite mit passendem Text, Städteliste und „Jetzt Preis berechnen"-Button zum Preisrechner.

## Adressen (URLs)

```text
/heizoelpreise                              Übersicht: alle 16 Bundesländer
/heizoelpreise/bundesland/schleswig-holstein  Bundesland-Seite
/heizoelpreise/ellerbek-schleswig-holstein    Stadt-Seite
```
Diese Struktur entspricht der Vorlage und ist für Suchmaschinen klar lesbar.

## Umfang der Städte (wichtige Entscheidung)

Ich lege eine gepflegte Städte-Datenbasis an: **die 40–60 größten/relevantesten Orte pro Bundesland, insgesamt rund 700–900 Stadtseiten**. Jede Stadt hat Name, Bundesland, Einwohnerzahl, Adress-Kürzel und eine Beispiel-PLZ.

Warum nicht alle ~11.000 Gemeinden: Tausende fast identische Seiten wertet Google als dünnen Inhalt ab („Doorway Pages") und indexiert sie oft gar nicht. 700–900 starke Seiten ranken deutlich besser als 11.000 schwache. Die Struktur ist so gebaut, dass ich später jederzeit weitere Orte ergänzen kann — sag Bescheid, wenn Du trotzdem die volle Liste willst.

## Inhalt einer Bundesland-Seite (Beispiel Schleswig-Holstein)

1. **Brotkrumen-Navigation** Startseite › Heizölpreise › Schleswig-Holstein
2. **Kopfbereich (H1)** „Heizölpreise Schleswig-Holstein – Heizöl günstig bestellen", darunter Preis-Kachel: 128,78 €/100 L, Stand tagesaktuell, Button **„Jetzt Preis berechnen"** → Preisrechner (Bundesland wird mitgegeben)
3. **Preis-Fakten-Band**: Preis/100 L, Preis/Liter, Beispielrechnung 3.000 Liter, Lieferzeit 7 Werktage
4. **Textblöcke** (je Bundesland individuell befüllt, nach Deiner Vorlage — aber mit unseren echten Zahlen: Klaro, 25.000 Kunden, 4,9/5, Mindestmenge 1.500 Liter, 128,78 €/100 L):
   - „Heizöl-Lieferung in ganz {Bundesland}" – Anzahl Städte und PLZ-Bereiche, aktueller Preis, Beispielsumme
   - „Heizölpreis pro Liter in {Bundesland} — was kostet 1 Liter?"
   - „Heizöl-Verbrauch in {Bundesland}: Klimazone & Saison" – Heizperiode, Jahresbedarf, günstigstes Bestellfenster
   - „Heizöl bestellen in {Bundesland} — was Sie wissen müssen" – Mengenrabatt, Lieferzeit, Zahlungsarten, Festpreisgarantie
   Pro Bundesland gibt es eigene Werte (Heizperiode, Klima, typischer Verbrauch, Landschaft, Anzahl Städte/PLZ), damit kein Text doppelt ist.
5. **Große Städte** – Kachel-Raster mit den größten Städten (Name + Einwohner), jede verlinkt auf ihre Stadtseite
6. **Alle Orte in {Bundesland}** – kompakte, alphabetische Link-Liste aller erfassten Orte
7. **Nachbar-Bundesländer** – Querverlinkung
8. **Häufige Fragen** zum Bundesland (4–5 Fragen, maschinenlesbar für Google)
9. **CTA-Banner + Fußbereich** wie auf den bestehenden Seiten

## Inhalt einer Stadt-Seite (Beispiel Ellerbek)

1. Brotkrumen: Startseite › Heizölpreise › Schleswig-Holstein › Ellerbek
2. H1 „Heizölpreise Ellerbek (Schleswig-Holstein) – Heizöl bestellen", Preis-Kachel + **„Jetzt Preis berechnen"** (PLZ der Stadt vorbelegt)
3. Fakten: Preis/100 L, Preis/Liter, Beispiel 3.000 Liter, PLZ, Einwohner, Landkreis
4. Textblöcke mit Ortsnamen und -daten:
   - „Heizöl-Lieferung nach {Stadt}" – Liefergebiet, Preis, Lieferzeit
   - „Was kostet 1 Liter Heizöl in {Stadt}?"
   - „Heizölverbrauch in {Stadt}" – Klimabezug über das Bundesland, Jahresbedarf, bestes Bestellfenster
   - „Heizöl bestellen in {Stadt}" – Ablauf in 3 Schritten, Zahlungsarten, Festpreisgarantie
   Textvarianten rotieren (mehrere Formulierungsvorlagen je Absatz, ausgewählt über den Ortsnamen), damit Seiten nicht wortgleich sind.
5. **Nachbarorte in der Region** – 8–12 Links auf andere Stadtseiten
6. Link zurück zur Bundesland-Seite, Bewertungshinweis, CTA-Banner, Fußbereich

## Verlinkung im Bestand

- Die 16 Bundesland-Links im Fußbereich und in der „Heizölpreise nach Region"-Sektion zeigen künftig auf ihre echte Bundesland-Seite statt auf den Preisrechner.
- Die Städte-Links im Fußbereich zeigen auf die jeweilige Stadtseite.
- Neuer Menüpunkt „Heizölpreise nach Region" führt zur Übersichtsseite.

## SEO-Technik

- Eigener Titel und eigene Beschreibung pro Seite, z. B. „Heizölpreise Schleswig-Holstein heute – ab 128,78 €/100 L | Klaro" und „Heizölpreise Ellerbek: aktueller Preis, Lieferung in 7 Werktagen".
- Eindeutige Seitenadresse (Canonical) und Social-Vorschau je Seite.
- Strukturierte Daten: Angebot mit Preis und Liefergebiet, Brotkrumen-Pfad, Fragen & Antworten, Firmendaten.
- Sitemap mit allen Bundesland- und Stadtseiten, verlinkt in der robots.txt — sobald Du mir die endgültige Internetadresse nennst.
- Alle Seiten werden beim Veröffentlichen als fertige Dateien erzeugt, damit Crawler sofort vollständigen Text sehen.

## Technische Details

- Datenmodul `src/data/regions.ts`: 16 `State`-Objekte (`slug`, `name`, `cityCount`, `plzCount`, `heatingPeriod`, `avgConsumption`, `climateNote`, `neighbours[]`) und `City[]` (`slug`, `name`, `stateSlug`, `plz`, `population`, `district`). Slug-Muster Stadt: `{stadt}-{bundesland}`.
- Textbausteine in `src/data/region-copy.ts`: Vorlagenfunktionen, die aus State/City-Daten die Absätze erzeugen; Varianten-Auswahl per Hash des Slugs.
- Routen: `src/routes/heizoelpreise.index.tsx`, `src/routes/heizoelpreise.bundesland.$state.tsx`, `src/routes/heizoelpreise.$city.tsx` — jeweils mit `loader` (Daten aus dem Modul, `notFound()` bei unbekanntem Slug), `head()` inkl. `title`, `description`, `og:*`, `canonical`, JSON-LD (`Offer`, `BreadcrumbList`, `FAQPage`).
- Gemeinsame Bausteine in `src/components/regional/`: `RegionHero`, `PriceFacts`, `CopyBlocks`, `CityGrid`, `CityLinkList`, `RegionFaq` — bestehende Tokens (`brand`, `line`, `surface`, `ink`, `conditions`, `muted-custom`), keine harten Farben.
- Preis zentral aus einer Konstante (`PRICE_PER_100 = 128.78`), Datum zur Laufzeit formatiert, damit „Stand" immer aktuell ist.
- CTA nutzt `Link to="/preisrechner"` mit `search`-Parametern (`plz` bei Städten, `bundesland` bei Bundesländern).
- Statisches Vorab-Rendern über `vite.config.ts` (`pages`-Liste aus den Region-Daten generiert, `prerender.enabled: true`).
- Prüfung: Build, Playwright-Screenshots einer Bundesland- und einer Stadtseite (Desktop + Mobil), Stichprobe der Titel/Beschreibungen.

## Zeitlicher Ablauf

1. Datenmodul + Textvorlagen
2. Bundesland-Seiten inkl. Übersicht
3. Stadtseiten
4. Verlinkung im Bestand, Menü, Sitemap, Vorab-Rendern
