# Bestelldaten im Detail-Popup bearbeiten

Im Detail-Popup einer Bestellung sollen alle wichtigen Daten direkt änderbar sein — für Admins und Caller gleichermaßen.

## Was änderbar wird

**Produkt & Preis**
- Heizölart (Standard / Premium)
- Liefermenge in Litern
- Preis pro 100 Liter
- Lieferstellen, Schlauchlänge, Tankwagen
- Zahlungsart (Vorkasse / EC-Karte / Barzahlung)
- Gesamtpreis wird automatisch berechnet: Menge ÷ 100 × Preis pro 100 L, auf zwei Stellen gerundet. Er wird live beim Tippen aktualisiert und ist nicht direkt eingebbar.

**Liefertermin & Kontakt**
- E-Mail, Telefon
- Frühestes Datum, gewählter Termin (Datum + Zeitfenster)
- Hinweise des Kunden

**Adressen**
- Lieferadresse: Anrede, Vorname, Nachname, Firma, Straße, Hausnummer, PLZ, Ort
- Rechnungsadresse: Schalter „Abweichende Rechnungsadresse“. Aus = Rechnungsadresse entspricht der Lieferadresse; ein = dieselben Felder zum Ausfüllen.

**Weiterhin wie bisher**
- Status und interne Notiz

## Bedienung

Die Karten im Popup zeigen statt reiner Textzeilen jetzt Eingabefelder. Alle Änderungen werden erst mit dem vorhandenen Knopf „Speichern“ übernommen; danach aktualisiert sich die Tabelle im Hintergrund. Wird das Popup mit ungespeicherten Änderungen geschlossen, kommt eine Rückfrage. Pflichtangaben: Menge größer als 0, Preis nicht negativ, gültige E-Mail-Adresse — sonst erscheint ein Hinweis statt zu speichern.

Caller dürfen dieselben Felder bearbeiten wie Admins. Nur das Generieren von Rechnungen bleibt Admins vorbehalten.

## Technische Umsetzung

- `updateOrder` in `src/lib/orders.functions.ts` wird um optionale Felder erweitert: `variant`, `liters`, `pricePer100`, `deliveryPoints`, `hose`, `truck`, `paymentMethod`, `email`, `phone`, `earliestDate`, `slotDate`, `slotPeriod`, `notes`, `deliveryAddress`, `billingAddress` (`null` = keine abweichende Adresse). Validierung über ein Zod-Schema mit Adress-Objektschema; leere Strings werden zu `null`.
- `total` wird serverseitig neu berechnet, sobald `liters` oder `pricePer100` im Update enthalten sind — der Client schickt keinen Gesamtpreis. Fehlt einer der beiden Werte im Update, wird der gespeicherte Wert der Bestellung herangezogen.
- Zugriff läuft weiter über `requireOrdersAccess` (Admin oder Caller); die bestehenden RLS-Policies für Caller decken das Update bereits ab. Keine Datenbankänderung nötig.
- `OrderDetailDialog` in `src/routes/_authenticated/admin_.bestellungen.tsx` bekommt einen Formularzustand, der aus `data` initialisiert wird (`useEffect` auf `data.id`). Die bisherigen `Row`-Anzeigen in den Karten „Produkt & Preis“, „Liefertermin & Kontakt“, „Lieferadresse“ und „Rechnungsadresse“ werden durch eine `Field`-Komponente (Label + `Input`/`Select`) ersetzt; `AddressBlock` weicht einem `AddressFields`-Formular. Gesamtpreis als abgeleiteter Wert via `useMemo`.
- Speichern schickt alle Felder gesammelt über die bestehende Mutation; danach `invalidateQueries` auf `["order", orderId]` und `["orders"]` wie bisher. Beim Schließen mit offenen Änderungen `window.confirm`.
