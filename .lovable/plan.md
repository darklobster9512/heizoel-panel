# Rechnungen aus Bestellungen generieren

## Was du bekommst

### Neue Spalte „Aktionen" in /admin/bestellungen
- Letzte Spalte mit einem Rechnungs-Icon pro Zeile (öffnet den Dialog, ohne das Detail-Popup auszulösen).
- Ist für die Bestellung bereits eine Rechnung vorhanden, ist das Icon grün markiert.

### Popup „Rechnung generieren"
- Liste aller **aktiven** Bankkonten aus /admin/bankkonten mit Name, IBAN, BIC und Bank.
- Pro Konto ein Fortschrittsbalken: bereits verwendeter Betrag im Verhältnis zum Limit (Summe aller auf dieses Konto generierten Rechnungen), Prozentwert und Anzahl der zugewiesenen Bestellungen.
- Konten über dem Limit werden rot dargestellt, bleiben aber wählbar (mit Warnhinweis).
- Nach Auswahl eines Kontos: Button „Rechnung generieren". Die Rechnung nutzt das Branding der Bestellung, die Bestelldaten und die Bankdaten des gewählten Kontos.
- Existiert schon eine Rechnung für die Bestellung, wird sie ersetzt (Bankkonto kann so gewechselt werden).
- Rechnungsnummer = Bestellnummer.

### Generierte Rechnungen unter /admin/settings → Rechnung
- Neuer Bereich „Generierte Rechnungen" über der Vorschau: Tabelle mit Datum, Rechnungsnummer, Kunde, Branding, Bankkonto, Betrag und Download-Button.
- Download liefert das gespeicherte PDF; ein Löschen-Button entfernt den Eintrag (Zählung des Bankkonto-Limits passt sich an).
- Die bestehende Vorschau bleibt unverändert erhalten.

## Technische Umsetzung

**Migration**
- Tabelle `public.invoices`: `id`, `order_id` (unique, FK orders, on delete cascade), `bank_account_id` (FK bank_accounts, on delete set null), `branding_id`, `invoice_number`, `amount numeric NOT NULL`, `pdf_path text`, `model jsonb NOT NULL` (Snapshot), `created_by`, `created_at`, `updated_at` + Update-Trigger.
- GRANTs: `SELECT, INSERT, UPDATE, DELETE` an `authenticated`, `ALL` an `service_role`. RLS aktiv, alle Policies über `has_role(auth.uid(), 'admin')`.
- Privater Storage-Bucket `invoices` (über das Bucket-Tool) mit Admin-Policies auf `storage.objects`.

**Server-Funktionen** – neue Datei `src/lib/invoices.functions.ts` (alle mit `requireSupabaseAuth` + `has_role`-Admin-Prüfung):
- `listInvoices` – Rechnungen inkl. Bestell-, Branding- und Bankkontoname.
- `getBankAccountUsage` – aktive Bankkonten mit `limitAmount`, Summe der Rechnungsbeträge und Anzahl zugewiesener Bestellungen.
- `generateInvoice({ orderId, bankAccountId })` – lädt Bestellung + Branding + Bankkonto serverseitig, baut das Modell über `buildInvoiceModel` (Bankdaten aus dem gewählten Konto statt aus dem Branding), rendert das PDF über `renderInvoicePdfBytes`, legt es per Admin-Client im Bucket unter `invoices/<orderId>.pdf` ab (upsert) und schreibt/überschreibt die `invoices`-Zeile.
- `downloadInvoice({ id })` – signierte URL bzw. Base64 des gespeicherten PDFs.
- `deleteInvoice({ id })` – Datei + Zeile entfernen.

**Anpassung `buildInvoiceModel`** in `src/lib/invoice/invoice-data.ts`: optionaler Bank-Override (`accountHolder`, `bankName`, `iban`, `bic`), der die Branding-Bankdaten ersetzt; Anzahlungslogik für EC/Barzahlung bleibt unverändert.

**UI**
- `src/routes/_authenticated/admin_.bestellungen.tsx`: Spalte „Aktionen" (Desktop + mobile Karte), `GenerateInvoiceDialog` mit Bankkonten-Auswahl, Progressbar (`@/components/ui/progress`), Mutation + Toasts, Invalidierung von `["invoices"]`, `["bank-usage"]`, `["orders"]`.
- `src/components/internal/settings/invoice-panel.tsx`: Abschnitt „Generierte Rechnungen" mit `listInvoices`-Query, Download und Löschen.

**Abschluss:** Typecheck (`bunx tsgo --noEmit`) und Build-Log prüfen.
