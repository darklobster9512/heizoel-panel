# 50-%-Anzahlung bei EC-Karte und Barzahlung zuverlässig anwenden

## Bestätigte Ursache

Die zuletzt erzeugte Rechnung **RE-1609-87126** gehört zu einer Bestellung mit dem gespeicherten Zahlungswert `bar`. Die Rechnungslogik erkennt derzeit jedoch nur `barzahlung`. Dadurch wurde diese Bestellung fälschlich wie Vorkasse behandelt: Im gespeicherten Rechnungsmodell steht `isDeposit: false` und der volle Betrag von **2.663,20 €**.

## Änderungen

- Die Zahlungsart wird vor jeder Rechnungsberechnung zentral vereinheitlicht:
  - `bar` und `barzahlung` → Barzahlung
  - `ec` sowie gebräuchliche EC-Schreibweisen → EC-Karte
  - Vorkasse/Überweisung bleiben Vollzahlung.
- **Barzahlung und EC-Karte** lösen danach immer dieselbe verbindliche Anzahlungsregel aus:
  - Überweisungsbetrag = kaufmännisch gerundete 50 % des Gesamtbetrags.
  - Restbetrag = Gesamtbetrag minus Anzahlung.
  - Der vollständige Warenwert, Netto und MwSt. bleiben in der Rechnungsübersicht unverändert.
- In der versendeten HTML-Rechnungs-E-Mail wird deutlich formuliert, dass die **50-%-Anzahlung zur Sicherung des Tagespreises** erforderlich ist.
- Im angehängten Rechnungs-PDF und in der HTML-Rechnungsvorschau werden 50-%-Anzahlung, Anzahlungsbetrag, Restbetrag und spätere Zahlungsweise deutlich ausgewiesen:
  - EC-Karte: Restbetrag bei Lieferung vor Ort per EC-Karte.
  - Barzahlung: Restbetrag bei Lieferung vor Ort in bar.
- Auch Ablauftext, Hinweise und Zahlungsblock der E-Mail werden zahlungsabhängig formuliert, damit an keiner Stelle versehentlich zur Überweisung der vollen Summe aufgefordert wird.
- Die gespeicherte Rechnungssumme für Bankkonto-Limits wird bei diesen Zahlungsarten auf den tatsächlich zu überweisenden Anzahlungsbetrag gesetzt; der vollständige Rechnungswert bleibt im Rechnungsmodell erhalten.

## Absicherung

- Tests für `bar`, `barzahlung` und `ec` prüfen jeweils E-Mail, HTML-Rechnung und PDF-Modell auf 50-%-Anzahlung und korrekte Restzahlung.
- Vorkasse wird als Gegenprobe weiterhin mit dem vollen Betrag getestet.
- Anschließend werden Typprüfung und Vorschau-Build kontrolliert.

## Bereits versendete falsche Rechnung

Die bereits versendete E-Mail lässt sich nicht zurückholen. Nach der Korrektur kann **RE-1609-87126** erneut generiert werden; dadurch werden PDF und gespeicherte Rechnung ersetzt und die korrigierte E-Mail erneut versendet.
