# Bestell-Schnittstelle als Supabase Edge Function

## Ziel

Die Bestellungen werden künftig über eine Funktion in deinem eigenen Supabase-Projekt entgegengenommen. Damit liegt auch die Adresse komplett bei Supabase.

## Adresse für das externe Projekt

```text
POST https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/orders
```

Header:
```text
Content-Type: application/json
apikey: <dein Supabase anon key>
```

Die Funktion wird ohne Login-Zwang veröffentlicht (`verify_jwt = false`), der anon key reicht.

## Was das Shop-Projekt schickt (JSON)

| Feld | Typ | Pflicht | Beispiel |
|---|---|---|---|
| brandingId | UUID | ja | "6e0ae941-5466-4946-afaf-7d44edf6da04" |
| variant | Text | nein (Standard "standard") | "standard" / "premium" |
| liters | Zahl | ja | 2000 |
| deliveryPoints | Zahl | nein (Standard 1) | 1 |
| hose | Text | nein | "30 m" |
| truck | Text | nein | "4-Kammer" |
| pricePer100 | Zahl | ja | 128.07 |
| total | Zahl | ja | 2561.40 |
| earliestDate | Text | nein | "2026-09-22" |
| slotDate | Text | nein | "2026-09-24" |
| slotPeriod | Text | nein | "vormittag" / "nachmittag" / "telefon" |
| email | Text | ja | "max@example.com" |
| phone | Text | nein | "017035829853" |
| deliveryAddress | Objekt | ja | siehe unten |
| billingAddress | Objekt oder null | nein | null wenn gleich |
| notes | Text | nein | "Bitte vorher anrufen" |
| paymentMethod | Text | nein | "vorkasse" / "ec" / "barzahlung" |
| placedAt | Text (ISO) | nein | "2026-09-15T12:00:00.000Z" |

Adress-Objekt (alle Felder optional, dürfen null sein):

```json
{
  "salutation": "herr",
  "company": null,
  "firstName": "Max",
  "lastName": "Mustermann",
  "street": "Musterstraße",
  "streetNo": "12",
  "plz": "12345",
  "city": "Musterstadt"
}
```

## Antwort

Erfolg (201):
```json
{ "ok": true, "orderNumber": "1509-48372", "orderId": "..." }
```
Die zurückgegebene `orderNumber` ersetzt im Shop die lokal gewürfelte Nummer.

Fehler: `{ "ok": false, "error": "..." }` — 400 ungültige Daten, 404 unbekannte Branding-ID, 500 Serverfehler.

## Was umgesetzt wird

1. Neue Edge Function `supabase/functions/orders/index.ts`: CORS + OPTIONS, Zod-Validierung aller Felder, Branding-Auflösung über `public_id` oder `id`, Bestellnummer im Format `1509-48372` mit Wiederholung bei Kollision, Insert in `public.orders` per Service-Role.
2. Telegram-Benachrichtigung bei Bestelleingang direkt in der Funktion (nutzt das bereits hinterlegte `TELEGRAM_BOT_TOKEN`, lädt aktive Empfänger aus `telegram_recipients`). Fehler beim Versand blockieren die Bestellung nicht.
3. `supabase/config.toml`: Eintrag für `orders` mit `verify_jwt = false`.
4. Bestehende Route `src/routes/api/public/orders.ts` wird entfernt, damit es nur eine Schnittstelle gibt.
5. Test der veröffentlichten Funktion mit einer Beispielbestellung; danach bekommst du ein fertiges Code-Schnipsel für das Shop-Projekt.

## Code-Schnipsel für das Shop-Projekt

```ts
const response = await fetch(
  "https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/orders",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      brandingId: "6e0ae941-5466-4946-afaf-7d44edf6da04",
      variant: draft.variant,
      liters: draft.liters,
      deliveryPoints: draft.points,
      hose: draft.hose,
      truck: draft.truck,
      pricePer100: draft.pricePer100,
      total: draft.total,
      earliestDate: draft.earliestDate,
      slotDate: slot.date,
      slotPeriod: slot.period,
      email,
      phone,
      deliveryAddress: delivery,
      billingAddress: billing ?? null,
      notes,
      paymentMethod: payment,
      placedAt: new Date().toISOString(),
    }),
  }
);
const result = await response.json();
if (result.ok) {
  // result.orderNumber statt lokaler Bestellnummer verwenden
}
```

Die Branding-ID findest du im Panel unter /admin/brandings beim jeweiligen Branding.
