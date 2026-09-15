# Supabase Edge Function `create-order`

Die Funktion ist jetzt in deinem Supabase-Projekt vorhanden (der Aufruf antwortet, verlangt aber noch einen Token). Als Nächstes ersetze ich die Vorlage durch die echte Bestell-Logik, schalte den Token-Zwang ab und teste den Link.

## Endgültiger Link

```text
https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order
```

Methode: `POST`, Header: `Content-Type: application/json`, kein Schlüssel nötig.

## Was die Funktion tun wird

1. Bestelldaten aus dem externen Shop annehmen und prüfen.
2. Branding über die mitgeschickte `brandingId` (öffentliche ID oder interne ID) zuordnen.
3. Eindeutige Bestellnummer im Format `TTMM-XXXXX` erzeugen (mit Wiederholung bei Dopplung).
4. Bestellung in der Tabelle `orders` speichern.
5. Telegram-Benachrichtigung an die aktiven Empfänger senden (Fehler dort blockieren die Bestellung nicht).
6. Antworten mit `{ "ok": true, "orderNumber": "...", "orderId": "..." }`.

CORS ist offen, damit der Shop direkt aus dem Browser senden kann.

## Was der Shop schicken soll

```json
{
  "brandingId": "6e0ae941-5466-4946-afaf-7d44edf6da04",
  "variant": "standard",
  "liters": 2000,
  "deliveryPoints": 1,
  "hose": "40m",
  "truck": "Tankwagen normal",
  "pricePer100": 128.07,
  "total": 2561.4,
  "earliestDate": "2026-09-20",
  "slotDate": "2026-09-22",
  "slotPeriod": "vormittag",
  "email": "kunde@example.com",
  "phone": "017012345678",
  "deliveryAddress": {
    "salutation": "Herr",
    "company": null,
    "firstName": "Max",
    "lastName": "Mustermann",
    "street": "Musterstraße",
    "streetNo": "12",
    "plz": "12345",
    "city": "Musterstadt"
  },
  "billingAddress": null,
  "notes": "Bitte vorher anrufen",
  "paymentMethod": "vorkasse",
  "placedAt": "2026-09-15T13:00:00.000Z"
}
```

Pflicht: `brandingId`, `liters`, `pricePer100`, `total`, `email`, `deliveryAddress`.
`slotPeriod`: `vormittag`, `nachmittag` oder `telefon`. `paymentMethod`: `vorkasse`, `ec` oder `barzahlung`.
`billingAddress` nur setzen, wenn sie von der Lieferadresse abweicht.

Der Shop soll die zurückgegebene `orderNumber` anzeigen und speichern, statt selbst eine zu erzeugen.

## Technische Schritte

- `supabase/functions/create-order/index.ts` anlegen: Deno-Handler mit OPTIONS/POST, Zod-freier Validierung (manuelle Prüfung, um Deno-Imports schlank zu halten), Service-Role-Client aus `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.
- Branding-Lookup: erst `public_id`, sonst `id`; unbekannt → 404 mit klarer Meldung.
- Bestellnummer: Präfix aus Tag+Monat (Europe/Berlin) plus 5 Zufallsziffern, bis zu 10 Versuche bei Unique-Konflikt.
- Telegram: aktive Empfänger aus `telegram_recipients` (branding-spezifisch oder global), Versand über `TELEGRAM_BOT_TOKEN` direkt an die Bot-API, Fehler nur loggen.
- `supabase/config.toml`: Eintrag `[functions.create-order] verify_jwt = false`, damit der Shop ohne Token senden kann.
- Deployment über das Edge-Function-Deploy-Tool, danach echter Test-Aufruf gegen den Link plus Kontrolle, dass die Bestellung unter `/admin/bestellungen` erscheint.
- Die bestehende Route `/api/public/orders` bleibt unverändert als zweiter Weg bestehen.
