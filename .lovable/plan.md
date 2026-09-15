# Geschäftsführer = Kontoinhaber des Bankkontos

## Ziel

In der Fußzeile der Vorlagen soll nicht mehr der im Branding hinterlegte Geschäftsführer stehen, sondern der Kontoinhaber des Bankkontos, das bei der Rechnungserstellung für die Bestellung ausgewählt wurde.

## Was sich ändert

- **Rechnungs-E-Mail**: Fußzeile zeigt „Geschäftsführer: <Kontoinhaber des gewählten Bankkontos>".
- **Rechnung (PDF und Vorschau)**: Im Block mit Handelsregister/USt-IdNr. kommt eine Zeile „Geschäftsführer: <Kontoinhaber>" dazu. Damit ist die Angabe auf der Rechnung konsistent mit der E-Mail.
- **Bestellbestätigung (ohne Bankkonto)**: Hier ist noch kein Bankkonto ausgewählt. Dort bleibt der Wert aus dem Branding stehen.
- **Vorschauen unter Einstellungen**: Ohne echtes Bankkonto wird der Kontoinhaber der Beispiel-Bankdaten angezeigt, damit die Vorschau das gleiche Verhalten zeigt.

Am Branding-Formular ändert sich nichts — das Feld Geschäftsführer bleibt bestehen und wird weiter für die Bestellbestätigung genutzt.

## Technische Umsetzung

- `src/lib/invoice/invoice-data.ts`: `InvoiceCompany` bekommt ein Feld `director`, befüllt aus `bank.accountHolder` (also aus dem Bank-Override bzw. dem Fallback), nicht aus `branding.managingDirector`.
- `src/lib/invoice/invoice-html.ts` und `src/lib/invoice/invoice-pdf.server.ts`: Im Firmen-/Registerblock eine Zeile `Geschäftsführer: ${model.company.director}` ergänzen.
- `src/lib/email-templates/email-shared.ts`: `resolveBranding(branding, directorOverride?)` — `director` nutzt den Override, sonst wie bisher `branding.managingDirector`.
- `src/lib/email-templates/order-invoice.ts`: berechnet bereits `bank.accountHolder`; dieser Wert wird als Override an `resolveBranding` übergeben.
- `src/lib/email-templates/order-confirmation.ts`: unverändert.
- Keine Datenbankänderung nötig.
