# Schritt 4: Wohnsituation als Dropdown umgestalten

## Ziel
`/antrag/schritt-4` soll dem gelieferten Screenshot entsprechen: Seite heißt „Haushalt“, enthält einen Info-Accordion und ein Dropdown „Wohnsituation“ mit vier Optionen.

## Änderungen in `src/routes/antrag/schritt-4.tsx`

### Überschrift
- Aus dem zweizeiligen Aufbau (kleine Kategorie + große Frage) wird eine einzelne Überschrift.
- Hauptüberschrift: **„Haushalt“** (wie im Screenshot).

### Info-Accordion
- Oberhalb des Dropdowns einen `WhyInfo`-Block einfügen mit dem Text:
  > Ihre Wohnsituation wird bei der Kreditprüfung berücksichtigt. Dabei kann relevant sein, mit wie vielen Personen Sie zusammenleben und ob Sie zur Miete oder im Eigenheim wohnen. So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten.

### Auswahl
- Die drei Icon-Kacheln entfernen.
- Stattdessen ein Dropdown-Feld mit dem Label **„Wohnsituation“** verwenden.
- Optionen:
  1. zur Miete
  2. mietfrei
  3. Bei den Eltern
  4. im Wohneigentum
- Standardwert: „zur Miete“.
- Für das Dropdown wird die gemeinsame `SelectField`-Komponente verwendet (gleiches Styling wie in Schritt 2/3 und der Hero-Section: kantige Ecken, grüner rotierender Chevron, #eff8f1 für Auswahl, grauer Hover, keine Checkmarks).

### State
- `data.housing` wird mit dem ausgewählten Wert befüllt.

## Nicht im Scope
- Fortschrittsbalken bleibt bei 21 %.
- Navigation („Zurück“ / „Weiter“) und `TrustBlock` bleiben unverändert.

## Validierung
- TypeScript-Build durchführen.
- Seite `/antrag/schritt-4` öffnen und prüfen: Überschrift, Info-Text, Dropdown-Label, Optionen und Styling stimmen.
