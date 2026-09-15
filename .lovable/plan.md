# Bestell-Schnittstelle: Link & Format für das externe Projekt

## Endpunkt

```text
POST https://project--485f594a-9180-4077-adda-eb24ffaadc89-dev.lovable.app/api/public/orders
```

(Produktiv nach Veröffentlichung: `https://project--485f594a-9180-4077-adda-eb24ffaadc89.lovable.app/api/public/orders`)

Kein Schlüssel nötig. Header: `Content-Type: application/json`.

## Was das Shop-Projekt schickt (JSON-Body)

| Feld | Typ | Pflicht | Beispiel |
|---|---|---|---|
| brandingId | string (UUID) | ja | "6e0ae941-5466-4946-afaf-7d44edf6da04" |
| variant | string | nein (Standard: "standard") | "standard" oder "premium" |
| liters | Zahl (Ganzzahl) | ja | 2000 |
| deliveryPoints | Zahl | nein (Standard: 1) | 1 |
| hose | string | nein | "30 m" |
| truck | string | nein | "4-Kammer" |
| pricePer100 | Zahl | ja | 128.07 |
| total | Zahl | ja | 2561.40 |
| earliestDate | string | nein | "2026-09-22" |
| slotDate | string | nein | "2026-09-24" |
| slotPeriod | string | nein | "vormittag" / "nachmittag" / "telefon" |
| email | string (E-Mail) | ja | "max@example.com" |
| phone | string | nein | "017035829853" |
| deliveryAddress | Objekt | ja | siehe unten |
| billingAddress | Objekt oder null | nein | null, wenn gleich |
| notes | string | nein | "Bitte vorher anrufen" |
| paymentMethod | string | nein | "vorkasse" / "ec" / "barzahlung" |
| placedAt | string (ISO-Datum) | nein | "2026-09-15T12:00:00.000Z" |

### Adress-Objekt (deliveryAddress / billingAddress)

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

Alle Felder im Adress-Objekt sind optional (dürfen null sein), das Objekt selbst ist Pflicht.

## Antwort

Erfolg (201):
```json
{ "ok": true, "orderNumber": "1509-48372", "orderId": "..." }
```
Die zurückgegebene `orderNumber` ersetzt die lokal gewürfelte Bestellnummer im Shop.

Fehler: `{ "ok": false, "error": "..." }` (400 = ungültige Daten, 404 = unbekannte Branding-ID, 500 = Serverfehler).

## Fertiges Schnipsel für das Shop-Projekt

```ts
const response = await fetch(
  "https://project--485f594a-9180-4077-adda-eb24ffaadc89-dev.lovable.app/api/public/orders",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
