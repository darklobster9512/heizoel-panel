# Plan: Sorte-Dropdown in Abladestellen 1–10 ändern

## Ziel
Das Dropdown „Sorte" in der Preisvergleichs-Card wird zu „Abladestellen" mit den Optionen 1 bis 10 umgebaut.

## Umsetzung
- In `src/components/landing/offer-card.tsx`:
  - Konstante `GRADES` entfernen und durch `DELIVERY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]` ersetzen.
  - State `grade` in `deliveryPoints` umbenennen, Standardwert `1`.
  - Label von „Sorte" auf „Abladestellen" ändern.
  - Placeholder auf „Abladestellen wählen" ändern.
  - Dropdown-Optionen auf die Zahlen 1–10 setzen.
  - Link-Search-Parameter von `sorte` auf `abladestellen: String(deliveryPoints)` ändern.
- In `src/routes/antrag/route.tsx`:
  - `validateSearch` anpassen: `sorte` entfernen, stattdessen `abladestellen?: string` akzeptieren und validieren.
- Keine weiteren Dateien sind betroffen; der Wizard selbst nutzt den Wert nicht.
