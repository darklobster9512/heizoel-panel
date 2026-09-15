# Bestell-Edge-Function `create-order` — abgenommen

## Status: Funktioniert

Die Supabase Edge Function wurde im Dashboard angelegt, mit dem fertigen Code ersetzt und veröffentlicht. Test vom 15.09.2026:

- **Endpoint:** `https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order`
- **Methode:** `POST`, Header nur `Content-Type: application/json` (kein API-Key)
- **Testergebnis:** HTTP 201, Antwort `{ "ok": true, "orderId": "d5a4a399-a40e-4303-bbfd-6b0eb00260a2", "orderNumber": "1509-12876" }`
- **Datenbankprüfung:** Bestellung `1509-12876` liegt korrekt in `public.orders` — Branding Demovero GmbH zugeordnet, 2.000 l, 128,07 €/100 l, 2.561,40 €, Vorkasse, Status „neu"
- **Sichtbar im Panel:** unter `/admin/bestellungen`; Telegram-Benachrichtigung geht bei aktiven Empfängern automatisch raus

## Übergabe ans externe Projekt (heizöl kompass)

Beim Absenden der Bestellung per `fetch` POST an obige URL senden:

```json
{
  "brandingId": "6e0ae941-5466-4946-afaf-7d44edf6da04",
  "variant": "standard",
  "liters": 2000,
  "deliveryPoints": 1,
  "hose": "standard",
  "truck": "standard",
  "pricePer100": 128.07,
  "total": 2561.4,
  "earliestDate": "2026-09-22",
  "slotDate": "2026-09-22",
  "slotPeriod": "vormittag",
  "email": "kunde@example.com",
  "phone": "017035829853",
  "deliveryAddress": {
    "firstName": "Max", "lastName": "Mustermann", "company": null,
    "street": "Musterstraße 1", "postalCode": "10709", "city": "Berlin"
  },
  "billingAddress": null,
  "notes": "optional",
  "paymentMethod": "vorkasse",
  "placedAt": "2026-09-15T13:10:00.000Z"
}
```

- `billingAddress`: Objekt wie `deliveryAddress` oder `null` bei gleicher Adresse
- `slotPeriod`: `vormittag` | `nachmittag` | `telefon`; `paymentMethod`: `vorkasse` | `ec` | `barzahlung`
- Rückgabe `orderNumber` im Shop anzeigen/speichern statt selbst generieren
- Die Testbestellung `1509-12876` kann unter `/admin/bestellungen` gelöscht werden
