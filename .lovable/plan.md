# Detail-Popup: Bearbeiten nur auf Knopfdruck

Das Bestell-Detail-Popup öffnet künftig im reinen Lese-Modus. Erst ein Klick auf ein Bearbeiten-Symbol schaltet die Felder frei.

## Verhalten

- **Lese-Modus (Standard beim Öffnen):** Alle Werte (Heizölart, Menge, Preis, Lieferstellen, Schlauch, Tankwagen, Zahlungsart, Termine, Zeitfenster, E-Mail, Telefon, Hinweise, Liefer- und Rechnungsadresse) werden als normaler Text angezeigt — keine Eingabefelder.
- **Bearbeiten-Symbol:** Oben rechts im Popup-Kopf (Stift-Icon neben Status und Speichern-Bereich). Klick schaltet in den Bearbeitungs-Modus: die bisherigen Eingabefelder erscheinen mit den aktuellen Werten.
- **Speichern / Abbrechen:** Im Bearbeitungs-Modus erscheinen die Buttons „Speichern" und „Abbrechen". Abbrechen verwirft die Änderungen und kehrt in den Lese-Modus zurück. Nach erfolgreichem Speichern wechselt das Popup ebenfalls zurück in den Lese-Modus.
- **Immer bearbeitbar bleiben:** Status-Auswahl und interne Notiz — damit Caller und Admins den Status weiter schnell wechseln können, ohne erst in den Bearbeitungs-Modus zu müssen. Die Hinweis-Abfrage bei ungespeicherten Änderungen bleibt bestehen.

## Umsetzung

- In `OrderDetailDialog` (`src/routes/_authenticated/admin_.bestellungen.tsx`) ein neuer Zustand `editing` (Standard `false`, wird beim Wechsel der Bestellung und beim Schließen zurückgesetzt).
- Die Karten „Produkt & Preis", „Liefertermin & Kontakt", „Lieferadresse" und „Rechnungsadresse" rendern je nach Modus entweder Textzeilen (Lese-Modus) oder die vorhandenen Eingabefelder (Bearbeitungs-Modus). Der Gesamtpreis rechnet im Bearbeitungs-Modus weiter live mit.
- Speichern-Button nur im Bearbeitungs-Modus sichtbar; Erfolgs-Toast und Aktualisierung der Tabelle bleiben wie bisher.
