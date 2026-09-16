# Zahlungsart in der Telegram-Benachrichtigung

## Ziel

Die Telegram-Nachricht bei neuen Bestellungen zeigt zusätzlich die gewählte Zahlungsart an (z. B. „Vorkasse", „EC-Karte", „Barzahlung").

## Umsetzung

1. **`src/lib/telegram/notify.server.ts`**
   - `OrderNotification` bekommt das Feld `paymentMethod: string | null`.
   - Neue Zeile im Nachrichtentext nach „Heizöl": `<b>Zahlungsart:</b> Vorkasse` — mit deutscher Bezeichnung; ist keine Zahlungsart übermittelt, steht „—".

2. **Bezeichnungen wiederverwenden**
   - Die vorhandene Zuordnung in `src/lib/notify/order-payloads.ts` (Vorkasse, EC-Karte, Barzahlung …) wird exportiert und in der Telegram-Nachricht genutzt — keine doppelte Pflege.

3. **`src/routes/api/public/orders.ts`**
   - Beim Aufruf von `sendOrderNotification` wird `paymentMethod: data.paymentMethod ?? null` mitgegeben.

## Technik

- Betrifft nur die Telegram-Benachrichtigung neuer Bestellungen (Empfänger aus `telegram_recipients` ändern sich nicht).
- Keine Datenbank-Änderung — `payment_method` wird bereits in `orders` gespeichert.
- Prüfung: Typecheck (`bunx tsgo --noEmit`) und Build-Log; danach Testbestellung über den Endpunkt, um die Nachricht live zu sehen.
