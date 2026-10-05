# Land pro Branding (Deutschland / Österreich)

## Was sich ändert
- Im Branding-Formular (Abschnitt „Marke“) neues Auswahlfeld **Land**: Deutschland oder Österreich. Bestehende Brandings stehen automatisch auf Deutschland; „Heizöl Austria“ wird auf Österreich gesetzt.
- Die Branding-Karten zeigen das Land an.
- **Deutschland**: 19 % MwSt., schwarz-rot-gold Streifen (wie bisher).
- **Österreich**: 20 % MwSt., rot-weiß-rot Streifen.
- Gilt überall: Rechnungsvorschau (HTML), PDF-Rechnung, Rechnungs-E-Mail, Bestellbestätigungs-E-Mail und die Vorschauen unter E-Mails/Einstellungen.
- Netto und MwSt. werden aus dem Bruttobetrag mit dem jeweiligen Satz berechnet (Brutto ÷ 1,19 bzw. ÷ 1,20); der Gesamtbetrag und die 50-%-Anzahlung bleiben unverändert.

## Technische Details
- Migration: Spalte `brandings.country text not null default 'DE' check (country in ('DE','AT'))`; Update für „Heizöl Austria“ auf `AT`.
- Neues Modul `src/lib/branding-country.ts`: `vatRateFor(country)` (0.19/0.20), `vatLabel`, Flaggenfarben pro Land.
- `brandings.functions.ts`: `country` in Schema, DTO und Payload; `branding-form.tsx` und Kartenübersicht ergänzen.
- `invoice-data.ts`: `InvoiceBranding.country`, `vatRate` im Modell; `net = gross / (1 + rate)`.
- `invoice-html.ts`, `invoice-pdf.server.ts`: MwSt.-Text aus Modell, Streifen nach Land (PDF: Y-Achse beachten, Österreich rot-weiß-rot von oben nach unten).
- `email-templates/order-invoice.ts` + `email-shared.ts` (`flagBar` mit Länderfarben) + Bestellbestätigung; Branding-Land über `order-payloads.ts`/`invoices.functions.ts` durchreichen.
- Tests für AT (z. B. 2.400 € brutto → 2.000 € netto, 400 € MwSt.), Typprüfung, Build.
