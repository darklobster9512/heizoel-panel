# Echte Supabase Edge Function für Bestellungen

## Ergebnis

Die bestehende Bestellschnittstelle wird als echte Supabase Edge Function im bereits verbundenen Projekt `heiz` bereitgestellt.

Der feste Endpunkt lautet danach:

```text
https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order
```

## Umsetzung

- Edge Function `create-order` im verbundenen Supabase-Projekt anlegen und bereitstellen.
- Den bestehenden Bestellablauf übernehmen:
  - Branding über dessen öffentliche ID prüfen
  - Bestellung in `public.orders` speichern
  - eindeutige Bestellnummer im Format `TTMM-XXXXX` erzeugen
  - Telegram-Benachrichtigung an passende aktive Empfänger senden
  - Telegram-Fehler dürfen die Bestellung nicht verhindern
- Browser-Aufrufe aus dem externen Shop per CORS erlauben.
- Wie bisher keinen API-Key vom Shop verlangen; der Endpunkt bleibt öffentlich erreichbar.
- Eingaben vollständig prüfen und unbekannte Branding-IDs ablehnen.
- Die bisherige Lovable-Adresse nicht mehr als Integrationsadresse empfehlen.

## Datenformat des externen Projekts

`POST` mit `Content-Type: application/json` an den Supabase-Endpunkt:

```json
{
  "brandingId": "6e0ae941-5466-4946-afaf-7d44edf6da04",
  "variant": "standard",
  "liters": 2000,
  "deliveryPoints": 1,
  "hose": "bis 40 m",
  "truck": "Standard-Tankwagen",
  "pricePer100": 128.07,
  "total": 2561.40,
  "earliestDate": "2026-09-18",
  "slotDate": "2026-09-19",
  "slotPeriod": "vormittag",
  "email": "kunde@example.de",
  "phone": "01701234567",
  "deliveryAddress": {
    "salutation": "Herr",
    "company": null,
    "firstName": "Max",
    "lastName": "Mustermann",
    "street": "Musterstraße",
    "streetNo": "12",
    "plz": "10115",
    "city": "Berlin"
  },
  "billingAddress": null,
  "notes": "Bitte vorher anrufen",
  "paymentMethod": "vorkasse",
  "placedAt": "2026-09-15T13:00:00.000Z"
}
```

Zulässige Werte für `slotPeriod`: `vormittag`, `nachmittag`, `telefon`.

`billingAddress` ist `null`, wenn Liefer- und Rechnungsadresse identisch sind; andernfalls hat es dieselben Felder wie `deliveryAddress`.

## Antwort

Erfolgreich (`201`):

```json
{
  "ok": true,
  "orderNumber": "1509-48372",
  "orderId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
}
```

Das externe Projekt übernimmt `orderNumber` für Bestätigungsseite und Bestellbestätigung und erzeugt keine eigene Nummer mehr.

Fehler werden mit passendem HTTP-Status und folgendem Format beantwortet:

```json
{
  "ok": false,
  "error": "Unbekannte Branding-ID."
}
```

## Prüfung

- CORS-Vorabfrage testen.
- Eine vollständige Testbestellung an den echten Supabase-Endpunkt senden.
- Prüfen, dass Bestellung, Branding-Zuordnung und Bestellnummer im Adminbereich erscheinen.
- Prüfen, dass die Antwort die gespeicherte Bestellnummer enthält.
