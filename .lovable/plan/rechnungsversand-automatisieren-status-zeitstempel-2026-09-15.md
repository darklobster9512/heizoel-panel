# Rechnungsversand automatisieren + Status-Zeitstempel

## 1. Zeitstempel beim Status

- In der Bestellungen-Tabelle steht unter dem Status-Auswahlfeld künftig der Zeitpunkt der letzten Statusänderung (z. B. „geändert 15.09. 17:04").
- Der Zeitpunkt wird automatisch gesetzt, sobald sich der Status ändert — egal ob durch dich in der Tabelle, im Detail-Popup oder automatisch beim Rechnungsversand.
- Bestehende Bestellungen bekommen als Startwert ihr letztes Änderungsdatum.

## 2. Rechnung generieren = Rechnung + E-Mail + SMS + Status

Wenn du im Popup „Rechnung generieren" ein Bankkonto auswählst, passiert nacheinander:

1. Rechnung wird wie bisher als PDF erzeugt und gespeichert.
2. Die Rechnungs-E-Mail geht an die Kundenadresse — mit Logo und Unternehmensdaten des Brandings der Bestellung, echten Kundendaten, ausgewähltem Bankkonto und der passenden Variante je Zahlungsart (Vorkasse = voller Betrag, EC-Karte / Barzahlung = 50 % Anzahlung). Die Rechnung hängt als PDF an.
3. Es geht eine SMS an die Telefonnummer der Bestellung (Vorlage „Bestellbestätigung" aus den SMS-Einstellungen), versendet über den Seven.io-Schlüssel und Absendernamen des Brandings.
4. Der Status der Bestellung wechselt automatisch auf „Rechnung versendet" (inkl. Zeitstempel).

Im Popup siehst du danach eine Rückmeldung, was geklappt hat. Fehlen beim Branding die Resend- oder Seven.io-Daten, wird die Rechnung trotzdem erstellt und du bekommst einen deutlichen Hinweis, dass E-Mail bzw. SMS nicht versendet werden konnte — der Vorgang bricht nicht ab.

## 3. Bestellbestätigung bei neuer Bestellung

Sobald eine Bestellung über die Schnittstelle eintrifft, geht automatisch die Bestellbestätigungs-E-Mail an den Kunden — über die Resend-Daten des jeweiligen Brandings, mit dessen Logo und Unternehmensdaten.

Dafür bekommst du den aktualisierten Code für `create-order` zum Einfügen und Deployen im Supabase-Dashboard (wie beim letzten Mal ein einmaliger Schritt).

## Technische Umsetzung

**Migration**
- `orders.status_changed_at timestamptz` + Trigger `BEFORE UPDATE`, der bei `NEW.status <> OLD.status` auf `now()` setzt; Backfill mit `updated_at`.

**Versand-Bausteine (neu)**
- `src/lib/notify/resend.server.ts`: `sendResendEmail({ apiKey, from, to, subject, html, attachment? })` über `https://api.resend.com/emails`, PDF als Base64-Attachment.
- `src/lib/notify/seven.server.ts`: `sendSevenSms({ apiKey, from, to, text })` über `https://gateway.seven.io/api/sms`.
- `src/lib/notify/order-payloads.ts`: mappt eine `orders`-Zeile + Branding auf `OrderInvoiceData` / `OrderConfirmationData` (Anrede, Adresszeilen, Produkt, Liefertermin, Beträge) und auf `SmsData`.

**`generateInvoice` (`src/lib/invoices.functions.ts`)**
- Nach PDF-Upload und Upsert zusätzlich: Branding-Zeile inkl. `resend_*`/`seven_*` laden, `renderOrderInvoiceEmail(branding, invoiceData)` rendern, per Resend senden (Betreff „Ihre Rechnung <Nr.>"), SMS über Seven.io senden, dann `orders.status = 'rechnung_versendet'` setzen.
- Rückgabe erweitert um `{ emailSent, smsSent, warnings: string[] }`; Fehler beim Versand werden abgefangen, nicht geworfen.

**UI (`src/routes/_authenticated/admin_.bestellungen.tsx`)**
- `GenerateInvoiceDialog`: Toast/Meldung mit Ergebnis, `invalidateQueries(["orders"])` und `["invoices"]`.
- Status-Spalte: unter dem Select `order.statusChangedAt` formatiert (de-DE, Datum + Uhrzeit), nur wenn vorhanden.
- `Order`-Typ und Select in `src/lib/orders.functions.ts` um `status_changed_at` erweitern.

**Bestellbestätigung bei Eingang**
- Neue öffentliche Route `src/routes/api/public/order-confirmation.ts` (POST): nimmt `{ orderId, secret }`, prüft den Shared Secret gegen `ORDER_HOOK_SECRET`, lädt Bestellung + Branding mit dem Admin-Client, rendert `renderOrderConfirmationEmail` und sendet über Resend.
- Secret wird als Projekt-Secret angelegt und muss in der Edge Function als Umgebungsvariable gesetzt werden.
- Angepasster `create-order`-Code ruft diese Route nach erfolgreichem Insert auf (fire-and-forget, Fehler nur geloggt) — Code liefere ich zum Einfügen im Supabase-Dashboard.
