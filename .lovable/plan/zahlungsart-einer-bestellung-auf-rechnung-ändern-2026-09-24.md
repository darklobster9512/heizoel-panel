# Zahlungsart einer Bestellung auf „Rechnung" ändern

Bestellung **2209-99900** (Edgar. Bianca Epple, aktuell Zahlungsart „EC-Karte", Status „Mailbox") soll die Zahlungsart **„Rechnung"** erhalten.

## Änderung

- Einmalige Datenkorrektur in der Tabelle `orders`: `payment_method` wird von `ec` auf `rechnung` gesetzt.
- Gesamtbetrag bleibt unverändert — EC-Karte und Rechnung verlangen beide 50 % Anzahlung, daher ändert sich rechnerisch nichts.
- Keine Code- oder Schemaänderung nötig.

## Hinweis

Die Bestellung hat noch keine Rechnung (Status „Mailbox"). Falls später eine Rechnung generiert wird, greift automatisch die 50-%-Anzahlungsregel für „Rechnung".

## Verifikation

- Kontrollabfrage der Bestellung nach der Änderung.
