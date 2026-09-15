# Individuelle Status-Farben

## Ziel
Jeder Bestellstatus soll eine eigene, semantisch passende Farbe erhalten — sowohl im Dropdown als auch im ausgewählten Trigger-Button.

## Technische Umsetzung

### 1. Neue semantische Farb-Tokens
In `src/styles.css` werden vier zusätzliche Status-Farbpaare als Design-Tokens angelegt (Hintergrund + Text), damit keine hartkodierten Tailwind-Farben in Komponenten landen:
- `status-info` (blau) — für neutrale/wartende Zustände
- `status-warning` (gelb/amber) — für Aufmerksamkeit erfordernd
- `status-success` (grün) — für positive Abschlüsse
- `status-danger` (rot) — für abgebrochene/problembehaftete Zustände

Diese werden in `:root` und `.dark` definiert und über `@theme inline` als `--color-status-...` registriert.

### 2. STATUS_STYLE anpassen
In `src/routes/_authenticated/admin_.bestellungen.tsx` bekommt jeder Eintrag in `STATUS_STYLE` ein eindeutiges Farbpaar:
- `neu` → `status-info` (neue Bestellung, wartend)
- `mailbox` → `status-warning` (manuell prüfen)
- `kein_interesse` → neutral/grau
- `moechte_rechnung` → `status-info` (wartet auf Rechnung)
- `rechnung_versendet` → `status-success` (Rechnung raus)
- `ueberwiesen` → `status-success` (bezahlt)
- `angekommen` → `status-success` (geliefert)
- `exchanged` → `status-danger` (abgebrochen/problembehaftet)

### 3. Sicherstellen
- Die neuen Klassen funktionieren sowohl im Trigger als auch in den Dropdown-Badges (gleiches `STATUS_STYLE`-Mapping).
- Typecheck und Build bleiben sauber.
- Keine weiteren UI-Bereiche werden verändert.

## Betroffene Dateien
- `src/styles.css`
- `src/routes/_authenticated/admin_.bestellungen.tsx`

## Nicht-Ziele
- Keine Änderung der Status-Werte, -Labels oder -Logik.
- Keine Datenbank-Änderungen.
- Keine Änderungen an anderen Selects oder Badges in der App.
