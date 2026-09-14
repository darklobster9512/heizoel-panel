# Lieferdaten-Dialog überarbeiten

## Ziel
Der „Lieferdaten ändern“-Bereich auf `/preisrechner/ergebnis` soll dem Screenshot von fastenergy24 entsprechen: kompakte Zeilen mit Label links und Wert/Steuerung rechts, keine Buttons, Live-Preis bei Mengenänderung, Lieferdatum ohne „(fest)".

## Änderungen

### 1. Layout der Bearbeiten-Ansicht
- Die Zusammenfassungszeile (`PLZ · Menge · ab Datum`) bleibt immer sichtbar.
- Darunter klappt beim Klick auf „ändern" ein schmaler Formularbereich auf.
- Der Link im Kopf wechselt zu „schließen", wenn das Formular offen ist.
- Formularzeilen (Label links, Steuerung rechts):
  - **PLZ** – Eingabefeld, direkt editierbar.
  - **Liefermenge** – Eingabefeld in Liter, direkt editierbar.
  - **Lieferstellen** – Select-Dropdown.
  - **Schlauch** – Select-Dropdown.
  - **Tankwagen** – Select-Dropdown.
  - **Frühestens lieferbar ab** – nur Anzeige, grüner Datumswert, kein „(fest)".
- Keine Button-Leiste mehr: weder „Abbrechen" noch „Preis neu berechnen".

### 2. Live-Preis bei Mengenänderung
- `liters` wird direkt an das Mengen-Eingabefeld gebunden.
- `total` und Preis/100 L werden sofort neu berechnet, während der Nutzer tippt.
- Min-/Max-Validierung (1.500 – 32.000 L) erfolgt bei Verlassen des Feldes.

### 3. Lieferdatum anpassen
- Die Zeile „Lieferdatum" im Formular wird entfernt bzw. ersetzt durch die Anzeigezeile „Frühestens lieferbar ab" mit dem festen Datum.
- Das Wort „(fest)" entfällt komplett.

### 4. Styling
- Weiße Card mit `border-line`, abgerundeten Ecken, schmalere Abstände.
- Labels: `text-[13px] font-medium text-hero-text`.
- Werte/Inputs rechtsbündig bzw. volle rechte Seite.
- Grüner Datumswert (`text-brand`, `font-semibold`).
- Inputs/Dropdowns nutzen bestehendes `fieldClass`.

## Technische Details
- Datei: `src/routes/preisrechner.ergebnis.tsx`.
- State: Draft-States für PLZ/Menge (`dPlz`, `dLiters`) werden direkt auf die Hauptzustände (`plz`, `liters`) geschrieben, damit der Preis live reagiert.
- `applyDraft()` und `startEditing()` werden angepasst oder entfernt, da keine explizite Übernahme mehr nötig ist.
- `CalendarCheck`-Icon kann für die Datum-Zeile beibehalten werden.

## Nicht im Scope
- Keine Backend-Anbindung für PLZ→Stadt.
- Keine Änderung an Angebots-Card, Tabs oder Zahlungsarten.
