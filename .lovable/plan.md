# Testbestellung für Lead-Weiterleitung an shopmanagement.lol

## Ziel
Prüfen, ob eine neue Bestellung automatisch einmal an `https://shopmanagement.lol/api/public/leads-ingest` übertragen wird (source `heizoel-at`).

## Schritte
1. Eine Testbestellung über den normalen Bestell-Endpunkt anlegen:
   - E-Mail: igor.maier60@web.de
   - Name: Igor Maier (Lieferadresse)
   - Branding: Heizöl Austria, kleine Menge, Zahlungsart Rechnung
2. Die Antwort des anderen Systems aus der Datenbank-Protokolltabelle lesen (erwartet: 201 mit `"accepted": 1`).
3. Keine zusätzliche manuelle Sendung an das andere System, damit der Lead nur einmal ankommt.
4. Ergebnis melden. Die Testbestellung bleibt stehen, bis du sagst, dass sie gelöscht werden soll.

## Hinweis
Durch die Bestellung werden ggf. auch Bestellbestätigung per E-Mail/SMS und eine Telegram-Nachricht ausgelöst (an web.de kann die E-Mail wegen der bekannten Sperre abgelehnt werden).
