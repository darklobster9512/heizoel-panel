# Feinschliff /bestellen — Telefon-Card, Adresse, Zahlung, Texte

## Ziel
Kleine visuelle und inhaltliche Korrekturen an der Bestellseite, alle in `src/routes/bestellen.tsx`.

## Änderungen

### 1. Telefon-Card grünlich hinterlegen
- Hintergrund des „Termin telefonisch vereinbaren"-Elements im nicht ausgewählten Zustand von `bg-background` auf `bg-brand/5` ändern.
- Ausgewählter Zustand bleibt `border-brand bg-brand/5 ring-1 ring-brand`.

### 2. Firmenname-Feld bei Anrede „Firma"
- `AddressForm` um optionales Feld `company?: string` erweitern.
- In `AddressFields`: wenn `value.salutation === "Firma"`, oberhalb von Vor-/Nachname ein full-width Feld „Firmenname" rendern.
- Pflichtfeld-Validierung: bei `salutation === "Firma"` muss `company` gefüllt sein, sonst Fehler `company`.
- Gleiches Verhalten für Lieferadresse und abweichende Rechnungsadresse.

### 3. Anrede-Dropdown im Rechnungsadresse-Block stylen
- Das native `<select>` für die Anrede in `AddressFields` (genutzt wenn `withSalutationButtons = false`) durch die shadcn-`Select`-Komponente aus `@/components/ui/select` ersetzen — gleiches Styling wie auf `/preisrechner/ergebnis` (kantige Ecken, rotierender Chevron, grauer Hover `#f3f4f6`, ausgewählter Eintrag `#eff8f1`).
- Trigger-Höhe und Rahmen an die restlichen Formularfelder anpassen (`h-11`, `border-line`, `rounded-md`).

### 4. Hinweise zur Lieferung — „(optional)" ergänzen
- Label des Textarea-Feldes von „Hinweise zur Lieferung" auf „Hinweise zur Lieferung <span class="text-muted-custom">(optional)</span>" ändern.

### 5. Zahlungsmethode-Hinweis orange färben
- Für `bar`, `ec`: der Hinweis „Neukunden: 50 % Anzahlung" bekommt orangefarbenen Hintergrund (`bg-orange-100` bzw. `bg-[#fff7ed]`) und leicht orangefarbenen Text (`text-orange-700` bzw. `#c2410c`).
- Für `rechnung`: Hinweis ersetzen durch „Nur für Bestandskunden" mit gleicher orangefarbener Badge-Stilung.

### 6. Bindungssatz entfernen
- Den Absatz „Mit Klick auf „Jetzt verbindlich bestellen" geben Sie eine verbindliche Bestellung ab." unter dem Absende-Button entfernen.

### 7. „Zurück zum Termin"-Button an Seitenhintergrund anpassen
- Button-Hintergrund von `bg-background` auf `bg-surface` setzen, damit er mit dem Seitenhintergrund verschmilzt.

## Prüfung
- Build/Typecheck sauber.
- Playwright: `/bestellen` mit Draft öffnen, Schritt 2 aufrufen, Firma auswählen → Firmenname-Feld sichtbar, Zahlungsmethoden-Hinweise orange, Rechnung zeigt „Nur für Bestandskunden", Telefon-Card grünlicher Hintergrund, Zurück-Button ohne sichtbaren Rahmen-Hintergrund.
