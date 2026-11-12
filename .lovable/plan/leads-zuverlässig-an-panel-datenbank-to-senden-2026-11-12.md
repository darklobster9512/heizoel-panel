# Leads zuverlässig an panel.datenbank.to senden

## Ursache
Die Bestellung 1211-94046 wurde gespeichert. Der Lead wird aber nur verschickt, wenn die Bestellung über einen bestimmten Eingangsweg des Panels hereinkommt. Deine Bestellung kam über einen anderen Weg in die Datenbank. Dein Server-Log zeigt keinen einzigen Bestelleingang, deshalb wurde die Weiterleitung nie ausgelöst.

## Lösung
- Den Lead direkt aus der Datenbank senden, sobald eine neue Bestellung gespeichert wird. Das ist derselbe Mechanismus, der schon die Bestellbestätigung auslöst. Damit wird jede Bestellung weitergeleitet, egal über welchen Server oder Weg sie kommt.
- Gesendet wird an `https://panel.datenbank.to/api/leads/webhook`: E-Mail, Vorname und Nachname aus der Lieferadresse, `source: "heizoel-shop"`.
- Den bisherigen Versand im Bestelleingang entfernen, damit nichts doppelt ankommt.
- Den Lead für Bestellung 1211-94046 einmalig nachsenden.

## Technische Details
- Migration: neue Trigger-Funktion `notify_lead_webhook()` (AFTER INSERT ON orders) mit `net.http_post` und JSON aus `NEW.email` sowie `NEW.delivery_address->>'firstName'` und `->>'lastName'`. Bei Fehlern gibt es nur eine Warnung, die Bestellung wird trotzdem gespeichert.
- Den `sendLeadWebhook`-Aufruf aus `src/routes/api/public/orders.ts` entfernen.
- Prüfung: über `net._http_response` die Antwort von datenbank.to für die nachgesendete Bestellung kontrollieren.
