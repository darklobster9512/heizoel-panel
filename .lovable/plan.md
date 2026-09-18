# Limit freigeben, wenn eine Bestellung „Kein Interesse“ ist

## Ziel
Wird eine Bestellung auf den Status **Kein Interesse** gesetzt, soll ihr Betrag beim zugewiesenen Bankkonto nicht mehr auf das Limit angerechnet werden. Das Limit steht dadurch sofort wieder zur Verfügung — auch wenn die Rechnung weiterhin existiert.

## Was sich ändert
- Auf `/admin/bankkonten` und im Fenster „Rechnung generieren“ zählt der Fortschrittsbalken Bestellungen mit Status „Kein Interesse“ nicht mehr mit; Betrag und Rechnungsanzahl sinken entsprechend.
- Wird der Status später wieder auf einen anderen Wert geändert, zählt der Betrag automatisch wieder mit.
- In der Bestellübersicht eines Bankkontos bleiben diese Bestellungen sichtbar, werden aber als „nicht angerechnet“ gekennzeichnet.
- Die Limit-Warnung beim Erstellen einer neuen Rechnung nutzt denselben bereinigten Wert.

## Technische Umsetzung
- `src/lib/invoices.functions.ts`, `getBankAccountUsage`: Abfrage von `invoices` auf `bank_account_id, amount, orders(status)` erweitern; Zeilen mit `orders.status === "kein_interesse"` beim Aufsummieren von `amount` und `count` überspringen.
- `listBankAccountOrders`: zusätzliches Feld `countsTowardLimit` (false bei Status `kein_interesse`) im DTO `BankAccountOrder`.
- `src/routes/_authenticated/admin_.bankkonten.tsx`: im Bestellungen-Dialog ein dezentes Badge „nicht angerechnet“ für diese Zeilen.
- Keine Datenbankänderung nötig, da die Berechnung aus dem aktuellen Bestellstatus abgeleitet wird.
- Abschluss: `bunx tsgo --noEmit` und Build-Log prüfen.
