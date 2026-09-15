# Admin-Übersicht mit echten Daten

Die Startseite unter /admin zeigt aktuell nur Platzhalter (erfundene Anfragen, ein Fantasie-Team, ausgedachte Zahlen). Sie wird komplett auf echte Daten aus der Datenbank umgestellt.

## Kennzahlen-Karten (oben)

- Bestellungen heute (mit Vergleich zu gestern)
- Bestellungen gesamt
- Umsatz diesen Monat (Summe der Bestellungen)
- Liter diesen Monat
- Offene Bestellungen (Status "Neu")
- Ø Preis pro 100 Liter

Jede Karte zeigt Wert, Symbol und – wo sinnvoll – die Veränderung zum Vergleichszeitraum. Bei leerer Datenbank stehen dort sauber 0-Werte statt Platzhaltertexte.

## Bereiche darunter

- **Letzte Bestellungen**: die 6 neuesten echten Bestellungen (Datum, Nummer, Kunde, Ort, Menge, Summe, Status). Klick führt auf die Bestellungen-Seite.
- **Status-Verteilung**: Anzahl je Status (Neu, Mailbox, Möchte Rechnung, Rechnung versendet, Überwiesen, Angekommen, Exchanged) als Balkenliste.
- **Brandings**: echte Liste mit Name, Shopname, Status (Entwurf/Aktiv) und Anzahl der zugehörigen Bestellungen.

Das erfundene "Team"-Panel und die Platzhalter-Zeile "Beispieldaten — Stand heute" entfallen.

## Technisch

- Neue Server-Funktion `getAdminStats` in `src/lib/orders.functions.ts` (oder neu `src/lib/admin-stats.functions.ts`), abgesichert über `requireSupabaseAuth` + bestehende `requireAdmin`-Prüfung.
- Aggregation über `orders` (Zeiträume via `placed_at`) und `brandings`; Ergebnis als typisiertes Objekt, keine Client-seitige Vollabfrage.
- Laden in `admin.tsx` per `useQuery` + `useServerFn`, Ladezustand mit Skeletons, Fehlerzustand mit kurzer Meldung.
- Bestehende Formatierungshilfen (Euro, Datum, Statuslabels) werden wiederverwendet; keine Datenbankänderung nötig.
