# Status direkt in der Bestelltabelle ändern

## Ziel
In `/admin/bestellungen` soll die Status-Spalte nicht mehr nur ein schreibgeschützter Badge sein, sondern ein Dropdown, mit dem Admins den Status direkt in der Zeile oder Karte ändern können. Die vollständigen Bestelldetails bleiben weiterhin im Popup verfügbar.

## Was passiert

- Desktop-Tabelle: In der Spalte **Status** wird ein `Select` statt des Badges eingebaut.
- Mobile Karten: Ebenfalls ein `Select` im Kartenheader neben der Bestellnummer.
- Beim Auswahlwechsel wird die bestehende `updateOrder`-Serverfunktion aufgerufen (`status` wird gespeichert).
- Erfolg/Misserfolg wird über bestehende Toasts angezeigt; die Liste wird anschließend aktualisiert.
- Klick auf das Select-Element öffnet **nicht** gleichzeitig das Detail-Popup (Event-Propagation wird gestoppt).
- Das Popup behält seinen eigenen Status-Select weiterhin, damit dort weiterhin alles gespeichert werden kann.

## Technische Umsetzung

- Datei: `src/routes/_authenticated/admin_.bestellungen.tsx`
- Neue interne Komponente `StatusCell({ order })`:
  - Nutzt shadcn `Select` (Trigger mit den existierenden Status-Styles aus `STATUS_STYLE`).
  - Ruft `useServerFn(updateOrder)` auf und invalidiert `orders` bei Erfolg.
  - Zeigt während des Speicherns einen kurzen Ladezustand.
- Tabelle: `<td>` für Status erhält `onClick={stopPropagation}`-Wrapper.
- Mobile Karte: Status-Select im Header mit ebenfalls gestopptem `onClick`.
- Keine Serverfunktion oder Datenbankänderung nötig; `updateOrder` und `ORDER_STATUSES` werden wiederverwendet.
- Typecheck/Build sauber halten; keine neuen Abhängigkeiten.

## Offen nach Abschluss
- Kurze visuelle Prüfung der Tabelle und mobilen Karten (soweit ohne Anmeldung möglich).
