# Bankkonten: Limit-Fortschritt und zugewiesene Bestellungen

## Was du bekommst

Auf `/admin/bankkonten` zeigt jede Bankkonto-Karte künftig:

- einen Fortschrittsbalken „X von Y € verwendet (Z %)" plus Anzahl der zugewiesenen Rechnungen — genauso wie im Rechnung-generieren-Popup;
- ein Augen-Symbol in der Fußzeile der Karte. Ein Klick öffnet ein Fenster mit allen Bestellungen, die diesem Konto über eine Rechnung zugewiesen sind: Datum, Bestellnummer, Kunde, Betrag, aktueller Status.
- In diesem Fenster gibt es pro Bestellung einen Button „Angekommen". Ein Klick setzt den Status der Bestellung auf „Angekommen" — die Änderung ist sofort auch unter `/admin/bestellungen` sichtbar. Bereits angekommene Bestellungen zeigen stattdessen einen Haken.

Wird das Limit überschritten, färbt sich der Balken als Warnung ein.

## Technische Umsetzung

- `src/lib/invoices.functions.ts`
  - `getBankAccountUsage` um alle Konten (auch inaktive) erweitern, damit die Karten vollständig abgedeckt sind; das bestehende Rechnung-generieren-Popup filtert weiterhin auf aktive Konten.
  - Neue Server-Funktion `listBankAccountOrders({ bankAccountId })` (Admin-Prüfung wie bestehend): liest `invoices` mit `order_id, invoice_number, amount, created_at` für das Konto und dazu die zugehörigen `orders` (`order_number, email, delivery_address, billing_address, total, status, placed_at`). Rückgabe als typisiertes DTO `BankAccountOrder[]`.
- `src/routes/_authenticated/admin_.bankkonten.tsx`
  - Zusätzlicher `useQuery(["bank-account-usage"])` auf `getBankAccountUsage`; Zuordnung per Konto-ID.
  - Fortschrittsbalken analog zu `GenerateInvoiceDialog` (shadcn `Progress` bzw. gleiche Balkendarstellung), unterhalb von IBAN/BIC/Limit.
  - Neuer Zustand `ordersFor: string | null`; Augen-Button (`Eye` aus lucide) neben Bearbeiten/Löschen öffnet einen `Dialog`, der `listBankAccountOrders` per `useQuery(["bank-account-orders", id])` lädt.
  - „Angekommen"-Button ruft das bestehende `updateOrder` aus `src/lib/orders.functions.ts` mit `{ id, status: "angekommen" }` und invalidiert `["orders"]`, `["bank-account-orders", id]` sowie `["invoices"]`.
- Keine Datenbankänderung nötig — `orders.status_changed_at` wird vom bestehenden Trigger automatisch gesetzt.
