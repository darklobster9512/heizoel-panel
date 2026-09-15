# Statusfarbe „Möchte Rechnung" anpassen

## Ziel
Der Status `moechte_rechnung` soll von orange auf lila umgestellt werden.

## Technische Umsetzung

### 1. Lila-Farb-Tokens ergänzen
In `src/styles.css` werden folgende Tokens hinzugefügt:
- `--color-status-purple-bg`
- `--color-status-purple-text`
- Werte in `:root` und `.dark`

### 2. STATUS_STYLE aktualisieren
In `src/routes/_authenticated/admin_.bestellungen.tsx` wird der Eintrag für `moechte_rechnung` auf die neuen lila Token gesetzt:
- `moechte_rechnung`: `bg-status-purple-bg text-status-purple-text`

### 3. Validierung
- Typecheck und Build laufen sauber.
- Keine weiteren Änderungen.

## Betroffene Dateien
- `src/styles.css`
- `src/routes/_authenticated/admin_.bestellungen.tsx`
