# Lead-Weiterleitung auf neue Adresse umstellen

Die Weiterleitung neuer Bestellungen läuft aktuell direkt in der Datenbank (automatisch bei jeder neuen Bestellung) an `https://panel.datenbank.to/api/leads/webhook`.

## Änderung
- Ziel-Adresse ändern auf `https://shopmanagement.lol/api/public/leads-ingest`
- Gesendete Daten (JSON):
  - `email` – E-Mail der Bestellung
  - `first_name` / `last_name` – aus der Lieferadresse
  - `source` – `"landingpage"` (wie in deinem Beispiel; statt bisher `"heizoel-shop"`)
- Antworten 201 (angenommen/Duplikat) und 400 (ungültige E-Mail) werden protokolliert; ein Fehler beim Empfänger verhindert nie das Speichern der Bestellung.
- Weiterhin genau eine Übertragung pro Bestellung.

## Technische Details
- Neue Migration: `CREATE OR REPLACE FUNCTION public.notify_lead_webhook()` mit neuer URL und `source = 'landingpage'`; bestehender Trigger `on_order_created_send_lead` bleibt.
- Die ungenutzte Datei `src/lib/notify/lead-webhook.server.ts` auf dieselbe URL/Source angleichen (bzw. entfernen), damit keine veraltete Adresse im Code bleibt.
- Kein manueller Testversand an das Zielsystem; Prüfung über die nächste echte Bestellung bzw. `net._http_response`.
