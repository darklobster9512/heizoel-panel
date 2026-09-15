# IBAN überall einheitlich in 4er-Blöcken anzeigen

Die IBAN wird beim Eingeben im Bankkonto-Dialog bereits live in 4er-Blöcken formatiert, in der Datenbank aber ohne Leerzeichen gespeichert. Auf Rechnung (PDF + HTML-Vorschau) und in der E-Mail-Vorlage erscheint sie deshalb als durchgehende Zeichenkette.

## Was sich ändert

- Rechnungs-PDF: IBAN im Zahlungsblock, im Hinweistext und in der Fußzeile in 4er-Blöcken.
- Rechnungs-Vorschau (HTML): dieselbe Darstellung an allen drei Stellen.
- E-Mail-Vorlage "Rechnung": IBAN-Zeile in 4er-Blöcken.
- Gilt sowohl für IBANs aus dem gewählten Bankkonto als auch für die aus einem Branding und für die Demo-Beispieldaten.

Nur die Anzeige ändert sich. Gespeicherte Daten und die Eingabe bleiben unverändert.

## Technisch

- `formatIban` aus `src/lib/bank-accounts.functions.ts` in ein neutrales Hilfsmodul auslagern (z. B. `src/lib/iban.ts`) und von dort re-exportieren, damit Rechnungs- und E-Mail-Code es ohne Server-Function-Import nutzen kann.
- `bankFor()` in `src/lib/invoice/invoice-data.ts`: zurückgegebene `iban` durch `formatIban(...)` schicken (Override, Branding-Wert und Fallback). Damit sind PDF (`invoice-pdf.server.ts`) und HTML (`invoice-html.ts`) automatisch abgedeckt, ohne die einzelnen Textstellen anzufassen.
- `src/lib/email-templates/order-invoice.ts`: `bankFor`-Äquivalent bzw. `bank.iban` ebenfalls über `formatIban` ausgeben, inkl. `DEMO_BANK`.
- Abschluss: `bunx tsgo --noEmit` und Build prüfen.
