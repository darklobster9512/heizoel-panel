# Bestellbestätigung vollautomatisch über Supabase

Ziel: Du musst nichts mehr im Supabase-Dashboard einfügen. Ich lege die Bestell-Funktion als Datei im Projekt an, deploye sie direkt nach Supabase und richte den Versand so ein, dass kein zusätzliches Passwort nötig ist.

## Was passiert

1. Die bestehende `create-order`-Funktion kommt als Datei ins Projekt (identischer Ablauf wie jetzt: Branding prüfen, Bestellung speichern, Bestellnummer erzeugen, Telegram-Nachricht).
2. Am Ende ruft sie zusätzlich die Bestätigungs-Route der Anwendung auf — ohne Rückwartezeit, damit der Shop weiterhin sofort eine Antwort bekommt.
3. Die Route rendert die Bestellbestätigung mit den Daten des Brandings (Logo, Firmenangaben) und den Kundendaten und verschickt sie über den Resend-Zugang des Brandings.
4. Ich deploye die Funktion direkt nach Supabase und teste sie mit einer echten Testbestellung.

## Kein manuelles Passwort mehr

Statt eines selbst gesetzten Geheimwerts nutzt der Aufruf den Service-Schlüssel, den Supabase der Funktion ohnehin automatisch bereitstellt und den die Anwendung ebenfalls kennt. Die Route akzeptiert den Aufruf nur mit diesem Schlüssel. Das zuvor angelegte `ORDER_HOOK_SECRET` entfällt.

## Technische Details

- Neu: `supabase/functions/create-order/index.ts` (Deno, CORS, Branding-Lookup über `public_id`, Insert in `public.orders`, Nummer `TTMM-XXXXX`, Telegram-Benachrichtigung, Antwort `{ ok, orderNumber, orderId }`), Deployment über das Supabase-Deploy-Tool mit deaktivierter JWT-Prüfung.
- Fire-and-forget `fetch` auf `<App-URL>/api/public/order-confirmation` mit Header `Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}` und Body `{ orderId }`.
- `src/routes/api/public/order-confirmation.ts`: Secret-Prüfung wird auf Vergleich mit `process.env.SUPABASE_SERVICE_ROLE_KEY` (timing-sicher) umgestellt, `secret` fällt aus dem Schema.
- Ziel-URL als Konstante in der Edge Function (Vorschau-Adresse jetzt, Live-Adresse nach dem Veröffentlichen austauschbar).
- Abschließender Test: echte Bestellung an den Endpunkt, Prüfung von Statuscode, Datenbankeintrag und Resend-Antwort in den Function-Logs.
