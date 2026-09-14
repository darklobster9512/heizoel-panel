# Plan: Mengen-Dropdown in Eingabefeld 1.500–32.000 Liter ändern

## Ziel
Das Feld „Menge in Litern" in der Preisvergleichs-Card wird von einem Dropdown in ein freies Eingabefeld umgewandelt. Eingaben sind auf 1.500 bis 32.000 Liter begrenzt.

## Umsetzung
- In `src/components/landing/offer-card.tsx`:
  - Konstante `QUANTITIES` entfernen (wird nicht mehr benötigt).
  - Formatter `liters` entfernen (wird nicht mehr benötigt).
  - Das `<Select>`-Element für die Menge ersetzen durch ein `<input>`:
    - `type="text"`, `inputMode="numeric"`, `min={1500}`, `max={32000}`
    - `placeholder="z. B. 3000"`
    - `value={quantity || ""}`
    - `onChange`: alle Nicht-Ziffern entfernen, Zahl im State speichern.
    - `onBlur`: Wert auf den Bereich 1.500–32.000 begrenzen; leere/unter 1.500 → 1.500; über 32.000 → 32.000.
  - State `quantity` bleibt erhalten, Standardwert `3000`.
  - Der Link übergibt weiterhin `menge: quantity`.
  - `Select`-Import bleibt erhalten, da „Abladestellen" weiterhin ein Dropdown ist.
- Keine Änderungen an der Antrags-Route oder anderen Dateien nötig.
