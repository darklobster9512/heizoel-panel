# Bestellungen-Tabelle live aktualisieren

Die Bestellliste im Panel soll sich von selbst aktualisieren: neue Bestellung rein, Status geändert, Details bearbeitet — die Tabelle zieht sofort nach, ohne Neuladen.

## Verhalten

- Neue Bestellung (auch über die Schnittstelle vom Shop) erscheint innerhalb von Sekunden oben in der Liste.
- Statuswechsel und Änderungen an Bestellungen — auch von einem anderen Mitarbeiter am anderen Rechner — werden sofort übernommen, inkl. Zeitstempel unter dem Status.
- Gelöschte/geänderte Zeilen werden entsprechend aktualisiert.
- Der Button „Aktualisieren" bleibt als manuelle Möglichkeit erhalten.
- Sicherheitsnetz: Wenn die Live-Verbindung mal nicht steht, lädt die Tabelle zusätzlich alle 30 Sekunden im Hintergrund nach — ohne Flackern.
- Läuft für Admins und Caller gleichermaßen; Caller sehen weiterhin nur ihre freigegebenen Bestellungen.

## Technische Umsetzung

1. Migration: `public.orders` zur Realtime-Publikation hinzufügen (`ALTER PUBLICATION supabase_realtime ADD TABLE public.orders`, idempotent geprüft) und `REPLICA IDENTITY FULL` setzen, damit Updates vollständige Zeilen liefern. RLS bleibt unverändert und gilt auch für Realtime.
2. Neuer Hook `src/hooks/use-orders-realtime.ts`: abonniert per Browser-Client (`@/integrations/supabase/client`) den Kanal `orders-live` auf `postgres_changes` (`event: "*"`, `schema: "public"`, `table: "orders"`) und invalidiert bei jedem Event die Query-Keys `["orders"]` sowie `["order", <id>]`. Aufräumen via `supabase.removeChannel` im Cleanup. Mehrfach-Events werden mit einem kurzen Debounce (ca. 300 ms) gebündelt.
3. `admin_.bestellungen.tsx`: Hook einbinden; `useQuery` für `["orders"]` bekommt `refetchInterval: 30000` und `refetchOnWindowFocus: true` als Fallback.
4. Die Liste wird weiterhin über die bestehende Server-Funktion `listOrders` geladen — Realtime dient nur als Auslöser, nicht als Datenquelle, damit die Caller-Einschränkungen serverseitig greifen.
