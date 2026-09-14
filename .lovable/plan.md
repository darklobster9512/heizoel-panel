# Bestellungen im Adminbereich + Bestell-Schnittstelle

## 1. Welche Bestellinfos kommen aus dem Checkout (bitte prüfen)

Aus dem Referenzprojekt „heizöl kompass" (Preisrechner → `/bestellen` → Bestätigung) werden diese Daten übergeben:

**Zuordnung**
- Branding-ID (die öffentliche ID aus `/admin/brandings`)
- Bestellnummer (wird hier erzeugt, Format `2609-74568`)
- Bestellzeitpunkt

**Produkt & Preis**
- Heizölart: Standard oder Premium
- Liefermenge in Litern
- Anzahl Lieferstellen
- Schlauchlänge
- Tankwagen-Typ
- Preis pro 100 Liter
- Gesamtpreis

**Liefertermin**
- Frühestes Lieferdatum aus dem Angebot
- Gewählter Termin: Datum + Vormittag / Nachmittag / „telefonisch vereinbaren"

**Kunde**
- E-Mail
- Telefon
- Lieferadresse: Anrede (Herr/Frau/Firma), Firma (optional), Vorname, Nachname, Straße, Hausnummer, PLZ, Ort
- Rechnungsadresse (nur wenn abweichend, gleiche Felder)
- Hinweise zur Lieferung (Freitext)
- Zahlungsart (z. B. Vorkasse)

**Zusätzlich automatisch gespeichert**
- Status der Bestellung (neu / in Bearbeitung / bestätigt / geliefert / storniert)
- Interne Notiz (nur im Panel)

## 2. Reiter „Bestellungen"

- Neuer Menüpunkt **Bestellungen** in der Admin-Navigation, Seite `/admin/bestellungen`.
- Tabelle mit: Bestellnummer, Datum, Branding (Shopname), Kunde, Ort, Menge, Gesamtpreis, Zahlungsart, Liefertermin, Status.
- Filter nach Branding und Status, Suche nach Bestellnummer/Name/Ort.
- Klick auf eine Zeile öffnet eine Detailansicht mit allen oben gelisteten Angaben (Adressen, Hinweise, Preisdetails) und einer Status-Auswahl.
- Nur Admins sehen die Seite, wie bei Brandings.
- Auf dem Handy wird die Tabelle zu kompakten Karten.

## 3. Schnittstelle für das Referenzprojekt

- Öffentlicher Endpunkt in diesem Projekt, den das Frontend beim Absenden der Bestellung aufruft.
- Gesendet werden alle Felder aus Abschnitt 1 plus die Branding-ID.
- Geschützt über einen geheimen Schlüssel im Header, damit niemand Fremdbestellungen einträgt.
- Antwort: `{ ok: true, orderNumber: "2609-74568" }` — die Bestellnummer wird hier erzeugt und ans Frontend zurückgegeben.
- Bestellnummer: Tag+Monat (z. B. `2609`) + Bindestrich + 5 zufällige Ziffern; bei Kollision wird automatisch neu gewürfelt, sodass sie immer einmalig ist.
- Unbekannte Branding-ID → klare Fehlermeldung, Bestellung wird nicht gespeichert.
- Du bekommst am Ende ein fertiges Code-Schnipsel zum Einfügen ins Referenzprojekt (ersetzt dort die lokale Bestellnummern-Erzeugung).

## Technische Details

- Migration: Tabelle `public.orders` mit `order_number` (UNIQUE), `branding_id` → `brandings.id`, Produkt-/Preisfelder (`liters`, `variant`, `price_per_100`, `total`, `delivery_points`, `hose`, `truck`), Termin (`earliest_date`, `slot_date`, `slot_period`), Kontakt (`email`, `phone`), Adressen als `jsonb` (`delivery_address`, `billing_address`), `notes`, `payment_method`, `status` (Enum `order_status`), `internal_note`, `created_at`/`updated_at` + Trigger. GRANTs für `authenticated` (SELECT/UPDATE) und `service_role` (ALL); RLS mit Admin-Policies über `has_role`.
- Bestellnummer über eine SQL-Funktion `generate_order_number()` mit Retry-Schleife gegen den UNIQUE-Index.
- Endpunkt als TanStack-Server-Route `src/routes/api/public/orders.ts` (POST), Zod-Validierung, Prüfung des Headers `x-api-key` gegen neues Secret `ORDERS_API_KEY`, Schreiben über `supabaseAdmin` (Import im Handler). Kein CORS-Problem, da Server-zu-Server bzw. Browser-Fetch mit gesetztem `Access-Control-Allow-Origin` + OPTIONS-Handler.
- `src/lib/orders.functions.ts`: `listOrders`, `getOrder`, `updateOrderStatus` als `createServerFn` mit `requireSupabaseAuth` + Adminprüfung.
- `src/routes/_authenticated/admin_.bestellungen.tsx` und `admin_.bestellungen_.$orderId.tsx` mit `AdminPageShell`, eigene `head()` mit `noindex`.
- `admin-nav.tsx`: neuer Eintrag „Bestellungen", `active`-Union und `NavItem["to"]` erweitert.
