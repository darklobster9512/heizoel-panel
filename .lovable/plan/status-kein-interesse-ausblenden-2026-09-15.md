# Status „Kein Interesse" + Ausblenden

## Ziel
- Neuer Bestellstatus **Kein Interesse**, direkt unter **Mailbox** in allen Status-Auswahlen.
- Bestellungen mit diesem Status werden in der Bestellübersicht standardmäßig ausgeblendet.
- Oberhalb der Tabelle ein Umschalt-Button, der ausschließlich die „Kein Interesse"-Bestellungen zeigt.

## Umsetzung
1. **Datenbank:** Der Status-Aufzählungstyp der Bestellungen bekommt den zusätzlichen Wert `kein_interesse` (eingeordnet nach `mailbox`). Bestehende Bestellungen bleiben unverändert.
2. **Statusliste im Code:** `kein_interesse` in `ORDER_STATUSES` nach `mailbox` einfügen, Beschriftung „Kein Interesse" und eine neutral-graue Badge-Farbe ergänzen. Damit erscheint der Status automatisch im Tabellen-Dropdown, im Detail-Popup und im Filter.
3. **Bestellübersicht (`admin_.bestellungen.tsx`):**
   - Neuer Zustand `showNoInterest` (Standard: aus).
   - Standardansicht filtert alle Bestellungen mit `kein_interesse` heraus.
   - Ist der Umschalter aktiv, werden ausschließlich diese Bestellungen angezeigt.
   - Button in der Filterleiste oberhalb der Tabelle: „Kein Interesse anzeigen" / aktiv „Alle anderen anzeigen", mit Anzahl-Badge.
   - Wird im Status-Dropdown explizit „Kein Interesse" gewählt, greift die Ausblendung nicht.

## Hinweis
Das Setzen des Status direkt in der Tabelle blendet die Zeile danach aus (sie ist dann nur noch über den neuen Button sichtbar).
