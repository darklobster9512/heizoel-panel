# Bankverbindung auf der Rechnung

Die Rechnung unter `/admin/rechnung` soll die Bankverbindung zeigen und den Text entsprechend anpassen.

## Was sich ändert

- **Rechnungstext:** Der Hinweis „Die Zahlungsdaten senden wir Ihnen per E-Mail" fällt weg. Stattdessen steht dort sinngemäß: „Bitte überweisen Sie den Gesamtbetrag unter Angabe der Rechnungsnummer auf das unten genannte Konto (IBAN siehe Zahlungsdaten)."
- **Zahlungsdaten-Block:** Neues, grün hinterlegtes Element auf der Rechnung (im Stil des Liefertermin-Blocks) mit:
  - Empfänger (Kontoinhaber)
  - Bank
  - IBAN
  - BIC
  - Betrag (Gesamtbetrag)
  - Verwendungszweck = Rechnungs-/Bestellnummer
- **Fußzeile „Zahlung":** Zeigt jetzt Kontoinhaber, Bank und IBAN des Brandings statt des Platzhalter-Textes.
- **Datenquelle:** Die Bankdaten kommen aus den Branding-Feldern Kontoinhaber / IBAN / Bankname / BIC, die es bereits beim Branding gibt. Fehlen sie beim gewählten Branding, greifen Beispiel-Daten (nur Vorschau).
- Alles fließt automatisch auch in das erzeugte PDF, da dasselbe Rechnungs-Layout verwendet wird.

## Technische Details

- `src/lib/invoice/invoice-data.ts`: `InvoiceBranding` um `accountHolder`, `iban`, `bankName`, `bic` erweitern; `InvoiceModel` um `bank`-Block (Empfänger, Bank, IBAN, BIC, Betrag, Verwendungszweck); `INVOICE_FALLBACK_BRANDING` um Beispiel-Bankdaten ergänzen; Fallback-Logik analog zu den übrigen Firmendaten.
- `src/lib/invoice/invoice-html.ts`: Grußtext anpassen, neuer Zahlungsdaten-Block unter der Summen-Tabelle, Fußspalte „Zahlung" mit Bankdaten.
- `src/lib/invoice.functions.ts` bzw. `admin_.rechnung.tsx`: Branding-Bankfelder an das Modell durchreichen (sind bereits im Branding-Typ vorhanden).
- Keine Datenbankänderung.
