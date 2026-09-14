# Bestellschnittstelle ohne Schlüssel

## Was sich ändert

Die Bestellschnittstelle wird offen erreichbar — kein Schlüssel, keine zusätzliche Konfiguration im Shop-Projekt. Das Frontend schickt die Bestellung einfach hin und bekommt die Bestellnummer zurück.

- Die Schlüsselprüfung im Endpunkt entfällt vollständig; es wird auch kein Geheimnis mehr angelegt.
- Als Missbrauchsschutz bleibt: die Bestellung wird nur gespeichert, wenn die mitgeschickte Branding-ID zu einem vorhandenen Branding gehört; alle Felder werden auf Format und Länge geprüft.
- Die Antwort enthält weiterhin nur `{ ok: true, orderNumber: "2609-74568" }` — keine Kundendaten, kein Lesen bestehender Bestellungen über diesen Weg.

Hinweis: Ohne Schlüssel kann theoretisch jeder, der die Adresse und eine Branding-ID kennt, Testbestellungen anlegen. Wenn dich das später stört, können wir jederzeit nachrüsten.

## Bereits fertig (bleibt so)

- Tabelle für Bestellungen inklusive eindeutiger Bestellnummer im Format 2609-74568.
- Neuer Reiter **Bestellungen** im Adminbereich mit Tabelle (Nummer, Datum, Branding, Kunde, Ort, Menge, Summe, Zahlung, Termin, Status), Suche sowie Filter nach Branding und Status; auf dem Handy als Karten.
- Detailseite je Bestellung mit allen Angaben, Adressen, Status-Auswahl und interner Notiz.

## Technische Details

- `src/routes/api/public/orders.ts`: `ORDERS_API_KEY`-Prüfung und der 401-Zweig werden entfernt; CORS-Header und OPTIONS-Handler bleiben. Zod-Validierung, Branding-Auflösung über `public_id` oder `id` sowie die Insert-Schleife mit neuer Bestellnummer bei Kollision bleiben unverändert.
- Kein Secret wird angelegt.

## Zum Schluss

Du bekommst ein fertiges Code-Schnipsel für das Shop-Projekt, das beim Absenden der Bestellung diesen Endpunkt aufruft und die zurückgegebene Bestellnummer statt der lokal gewürfelten verwendet.
