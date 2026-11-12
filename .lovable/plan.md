# Weiterleitung neuer Bestellungen an panel.datenbank.to prüfen

## Befund
- Bestellung 1211-94046 (halloyop@yopmail.com, 19:41 UTC) wurde gespeichert.
- Die Vorschau hat diese Bestellung nicht verarbeitet, sondern der Server, an den dein Shop sendet (dein Debian-Server bzw. die veröffentlichte Version).
- Die Weiterleitung ist im aktuellen Code vorhanden. Vermutlich läuft dort noch ein älterer Stand ohne die Weiterleitung.

## Schritte
1. Auf dem Server den neuesten Stand holen und neu starten:
```text
cd /var/www/heizking && git pull
grep -n "datenbank.to" src/lib/notify/lead-webhook.server.ts
bun install && bun run build && pm2 restart heizking
pm2 logs heizking --lines 50
```
2. Eine neue Testbestellung auslösen und in `pm2 logs` nach `[lead-webhook]` oder `[orders] lead webhook failed` suchen.
3. Falls dort ein Fehler steht, protokolliere ich zusätzlich die Antwort von panel.datenbank.to, damit der Grund sichtbar wird.
4. Optional: Lead für Bestellung 1211-94046 einmalig nachsenden.
