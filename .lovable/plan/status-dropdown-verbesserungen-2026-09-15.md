# Status-Dropdown-Verbesserungen

## Ziel
Das Status-Dropdown in der Bestellungen-Tabelle soll optisch aufgeräumt und informativer wirken:
1. Kein Scrollbalken mehr im Dropdown (nur 8 Einträge).
2. Jede Status-Option zeigt bereits im Dropdown ihre eigene Farbe als Badge/Pille an.

## Technische Umsetzung

### 1. Scrollbalken im Dropdown entfernen
- In `src/components/ui/select.tsx` bekommt `SelectContent` ein optionales Boolean-Prop `noScrollbar`.
- Wenn `noScrollbar` aktiv ist:
  - `showScrollbar` wird auf `false` gezwungen.
  - Der Viewport erhält keine `overflow-y-scroll`-/Padding-Right-Klassen für die Scrollbar.
  - Das Dropdown zeigt alle Einträge ohne visuellen Scrollbalken.
- Im `StatusCell` in `src/routes/_authenticated/admin_.bestellungen.tsx` wird `<SelectContent noScrollbar>` verwendet.

### 2. Farbige Status-Badges im Dropdown
- In `admin_.bestellungen.tsx` wird das Mapping `STATUS_STYLE` auch für die einzelnen `SelectItem`-Inhalte genutzt.
- Jede `SelectItem`-Zeile rendert neben dem Status-Label eine farbige Pille mit `STATUS_STYLE[value]` (gleiche Hintergrund-/Text-Farbe wie der ausgewählte Trigger).
- Ausgewähltes Element behält weiterhin den Häkchen-Indikator von Radix.

## Betroffene Dateien
- `src/components/ui/select.tsx`
- `src/routes/_authenticated/admin_.bestellungen.tsx`

## Nicht-Ziele
- Keine Änderung an den Status-Werten, -Labels oder der Logik.
- Keine Datenbank-Änderungen.
- Keine Änderungen an anderen Select-Komponenten in der App.
