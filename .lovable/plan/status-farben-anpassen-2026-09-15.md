# Status-Farben anpassen

## Ziel
Die Farben der Bestellstatus werden nach Vorgabe neu zugeordnet:
- `neu` → grau
- `mailbox` → gelb/amber (bestehend)
- `kein_interesse` → rot
- `moechte_rechnung` → orange
- `rechnung_versendet` → blau
- `ueberwiesen` → grünlich
- `angekommen` → grün
- `exchanged` → regenbogenfarben

## Technische Umsetzung

### 1. Farb-Tokens erweitern
In `src/styles.css` werden folgende semantische Status-Tokens ergänzt (jeweils Hintergrund + Text):
- `status-red`
- `status-orange`
- `status-blue`
- `status-greenish`
- `status-green`
- `status-purple`
- `status-gray`

Diese werden in `:root` und `.dark` als OKLCH-Werte definiert und in `@theme inline` registriert.

Für `exchanged` wird ein animierter Regenbogen-Effekt über ein `@utility status-rainbow` realisiert (linearer Gradient mit sanfter Farbverschiebung), damit der Eintrag im Dropdown und im Trigger auffällt.

### 2. STATUS_STYLE aktualisieren
In `src/routes/_authenticated/admin_.bestellungen.tsx` werden die Werte von `STATUS_STYLE` neu gemappt:
- `neu`: `bg-status-gray-bg text-status-gray-text`
- `mailbox`: `bg-status-warning-bg text-status-warning-text` (unverändert)
- `kein_interesse`: `bg-status-red-bg text-status-red-text`
- `moechte_rechnung`: `bg-status-orange-bg text-status-orange-text`
- `rechnung_versendet`: `bg-status-blue-bg text-status-blue-text`
- `ueberwiesen`: `bg-status-greenish-bg text-status-greenish-text`
- `angekommen`: `bg-status-green-bg text-status-green-text`
- `exchanged`: `status-rainbow` (enthält Hintergrund + Textfarbe)

### 3. Validierung
- Typecheck und Build laufen sauber.
- Keine Änderung an Status-Werten, -Labels oder -Logik.

## Betroffene Dateien
- `src/styles.css`
- `src/routes/_authenticated/admin_.bestellungen.tsx`

## Nicht-Ziele
- Keine neuen Funktionen.
- Keine Datenbank-Änderungen.
- Keine Änderung anderer UI-Bereiche.
