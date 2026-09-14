# Rechnung: Zahlungsart-abhängige Beträge

Die Rechnung unter `/admin/rechnung` reagiert auf die Zahlungsart der Bestellung.

## Verhalten je Zahlungsart

- **Vorkasse / Überweisung** (bisheriges Verhalten): Voller Gesamtbetrag im Zahlungsdaten-Block, Text „Bitte überweisen Sie den Gesamtbetrag von X € …".
- **EC-Karte / Barzahlung** (neu):
  - **Rechnungstext:** Hinweis, dass eine Anzahlung von 50 % fällig ist und der Restbetrag bei Lieferung vor Ort bezahlt wird (bei EC-Karte per Karte, bei Barzahlung in bar).
  - **Zahlungsdaten-Block:** Betrag = 50 % des Gesamtbetrags (gerundet auf 2 Nachkommastellen), Überschrift/Hinweis „50 % Anzahlung — Restbetrag von X € bei Lieferung vor Ort". Unter dem Betrag steht klein „Anzahlung (50 % von X €)".
  - Die Positionstabelle und die Summen (netto/MwSt./gesamt) bleiben unverändert — abgerechnet wird weiterhin der volle Betrag, nur der fällige Überweisungsbetrag ändert sich.
- Gilt für die HTML-Vorschau und das erzeugte PDF gleichermaßen.

## Technische Details

- `src/lib/invoice/invoice-data.ts`: `InvoiceModel.bank` um `isDeposit: boolean` und `remaining: string | null` erweitern; in `buildInvoiceModel` bei `paymentMethod` `"ec"` oder `"barzahlung"` den Betrag auf `gross / 2` setzen (Kaufmännisch gerundet), Textbausteine für den Anzahlungs-Hinweis liefern.
- `src/lib/invoice/invoice-html.ts` und `src/lib/invoice/invoice-pdf.server.ts`: Grußtext je nach Zahlungsart; Zahlungsdaten-Block zeigt bei Anzahlung den halben Betrag plus Hinweiszeile „Restbetrag … bei Lieferung vor Ort (bar / per EC-Karte)".
- `src/lib/invoice.functions.ts`: Zod-Schema um die neuen Bank-Felder ergänzen.
- Keine Datenbankänderung.
