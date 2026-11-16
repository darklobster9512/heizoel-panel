# Lead-Quelle auf "heizoel-at" ändern

## Änderung
- Bei der automatischen Übertragung neuer Bestellungen an `https://shopmanagement.lol/api/public/leads-ingest` wird `source` von `"landingpage"` auf `"heizoel-at"` geändert.
- Adresse, übrige Felder und Verhalten bleiben gleich (eine Übertragung pro Bestellung, Fehler blockieren die Bestellung nicht).

## Technische Details
- Neue Migration: `CREATE OR REPLACE FUNCTION public.notify_lead_webhook()` mit `'source', 'heizoel-at'`; EXECUTE für PUBLIC/anon/authenticated weiterhin widerrufen.
