# Caller sieht keine Bestellungen

## Was tatsächlich passiert

Der Caller landet nach der Anmeldung kurz auf der Übersichtsseite `/admin`. Diese Seite fragt sofort die Auswertungs-Zahlen ab, die ausschließlich Admins abrufen dürfen — die Abfrage bricht mit „Kein Zugriff auf die Übersicht." ab, und weil der Fehler beim Laden der Seite auftritt, bleibt der Bildschirm leer, bevor die Weiterleitung zu den Bestellungen greift. Genau das zeigt die Fehlermeldung, die du geschickt hast.

Zweiter Punkt: Für Caller werden die Branding-Namen der Bestellungen serverseitig mit dem privilegierten Schlüssel nachgeladen (Caller dürfen die Branding-Tabelle selbst nicht lesen). Solange dieser Schlüssel fehlte — das war bis eben der Fall — scheiterte damit die gesamte Bestellliste des Callers, also die Meldung „Bestellungen konnten nicht geladen werden."

Die Berechtigungen des Kontos sind in Ordnung: `caller@caller.de` hat die Rolle Caller, keine Branding-Einschränkung und kein Startdatum — es dürfte also alle Bestellungen sehen.

## Lösung

1. Die Übersichtsseite fragt die Zahlen erst ab, wenn feststeht, dass es sich um ein Adminkonto handelt. Ein Caller wird ohne Fehler und ohne leeren Bildschirm direkt zu den Bestellungen weitergeleitet.
2. Das Nachladen der Branding-Namen wird abgesichert: Klappt es nicht, erscheinen die Bestellungen trotzdem — nur die Spalte „Branding" bleibt dann leer, statt dass die ganze Liste scheitert.
3. Danach prüfe ich mit dem Caller-Konto, dass die Bestellungen erscheinen.

## Technische Details

- `src/routes/_authenticated/admin.tsx`: Rolle zuerst über `getMyAccount` laden; `useQuery` für `getAdminStats` bekommt `enabled: role === "admin"`; Caller werden per `navigate({ to: "/admin/bestellungen", replace: true })` umgeleitet, alle anderen zu `/weiterleitung`. Fehlerzustand analog zur `AdminPageShell` (Meldung + „Erneut versuchen") statt weißer Seite.
- `src/lib/orders.functions.ts`: `attachBrandingNames` in `try/catch`; bei Fehler werden die Bestellungen unverändert zurückgegeben. Der Aufruf im Caller-Zweig von `listOrders`/`getOrder` bleibt sonst gleich.
- Keine Datenbank-, Policy- oder Rechteänderung.
- Abschluss: `bunx tsgo --noEmit`, Build-Log prüfen und Anmeldung als Caller im Browser testen.
