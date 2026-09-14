# Rechnung: Zahlungsart-abhängige Beträge

Die Rechnung unter `/admin/rechnung` reagiert auf die Zahlungsart der Bestellung. Jede Zahlungsart wird getrennt behandelt — mit eigenem Text und eigenem fälligem Betrag.

## Verhalten je Zahlungsart

**1. Vorkasse / Überweisung** (bisheriges Verhalten)
- Zahlungsdaten-Block: voller Gesamtbetrag.
- Text: „Bitte überweisen Sie den Gesamtbetrag von X € …".

**2. EC-Karte** (neu)
- Rechnungstext: „Wir bitten um eine Anzahlung von 50 % (X €) auf das unten genannte Konto. Den Restbetrag von Y € zahlen Sie bei Lieferung vor Ort per EC-Karte."
- Zahlungsdaten-Block: Betrag = 50 % des Gesamtbetrags, mit Hinweiszeile „Anzahlung (50 % von X €) — Restbetrag Y € bei Lieferung per EC-Karte".

**3. Barzahlung** (neu)
- Rechnungstext: „Wir bitten um eine Anzahlung von 50 % (X €) auf das unten genannte Konto. Den Restbetrag von Y € zahlen Sie bei Lieferung vor Ort in bar."
- Zahlungsdaten-Block: Betrag = 50 % des Gesamtbetrags, mit Hinweiszeile „Anzahlung (50 % von X €) — Restbetrag Y € bei Lieferung in bar".

Gemeinsam: Der Anzahlungsbetrag wird kaufmännisch auf 2 Nachkommastellen gerundet; die Positionstabelle und die Summen (netto / MwSt. / Gesamt) bleiben unverändert — abgerechnet wird der volle Betrag, nur der zu überweisende Betrag ändert sich. Gilt für HTML-Vorschau und PDF gleichermaßen.

## Technische Details

- `src/lib/invoice/invoice-data.ts`: `InvoiceModel.bank` um `isDeposit: boolean` und `remaining: string | null` erweitern; in `buildInvoiceModel` je nach `paymentMethod` (`"ec"` / `"barzahlung"` → 50 %, sonst voller Betrag) Betrag und Hinweistexte setzen; `paymentLabel` bleibt wie bisher.
- `src/lib/invoice/invoice-html.ts` und `src/lib/invoice/invoice-pdf.server.ts`: Grußtext und Zahlungsdaten-Block je nach Zahlungsart rendern.
- `src/lib/invoice.functions.ts`: Zod-Schema um die neuen Bank-Felder ergänzen.
- Keine Datenbankänderung.
