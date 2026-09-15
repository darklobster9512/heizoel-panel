# Rechnungsnummer mit RE-Präfix

## Ist-Zustand (geprüft)

Die Rechnungsnummer ist heute exakt die Bestellnummer (z. B. `1509-12876`) — in der gespeicherten Rechnung, im PDF, in der E-Mail und in der SMS. Die SMS liest sich dadurch doppelt: „Ihre Rechnung 1509-12876 zur Bestellung 1509-12876". In den Vorschauen unter Einstellungen steht dagegen ein Beispiel mit `RE-...`, das es in echt nie gibt.

## Ziel

Jede Rechnung bekommt die Nummer `RE-<Bestellnummer>`, z. B. `RE-1509-12876`. Diese Nummer erscheint überall gleich:

- gespeicherte Rechnung in den Einstellungen
- Rechnungs-PDF (Kopf, Rechnungs-Nr., Verwendungszweck)
- Rechnungs-E-Mail (Betreff, Kopf, Text)
- Rechnungs-SMS
- Dateiname des PDF-Downloads (`Rechnung_RE-1509-12876.pdf`)
- Vorschauen unter Einstellungen (Beispielwerte entsprechend)

Die Bestellnummer bleibt unverändert und wird in SMS und E-Mail weiterhin separat genannt.

## Bestehende Rechnungen

Bereits erzeugte Rechnungen behalten ihre gespeicherte Nummer — sie wurden schon versendet. Neue Rechnungen (auch beim erneuten Generieren zu einer Bestellung) bekommen das Präfix.

## Technische Umsetzung

- Neuer Helfer `invoiceNumberFor(orderNumber)` in `src/lib/iban.ts` (bzw. kleinem eigenen Modul): gibt `RE-<orderNumber>` zurück, bereits vorhandenes `RE-` wird nicht verdoppelt.
- `src/lib/invoices.functions.ts`: `invoice_number` beim Upsert, E-Mail-Betreff, `invoiceDataFrom(...)`, PDF-Anhangsname und Rückgabewert `invoiceNumber` nutzen den Helfer.
- `src/lib/invoice/invoice-data.ts` (Zeile 206) setzt `invoiceNumber` über den Helfer — deckt PDF und HTML-Vorschau ab.
- `src/lib/notify/order-payloads.ts`: `smsDataFrom(order)` liefert `invoiceNumber` mit Präfix.
- Demo-/Vorschauwerte in `src/lib/sms-templates/index.ts` und `src/lib/email-templates/order-invoice.ts` bleiben im Format `RE-<Bestellnummer>` und werden konsistent gehalten.
- Abschluss: `bunx tsgo --noEmit` und Build-Log prüfen.
