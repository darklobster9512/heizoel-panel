# Admin-Panel linker Rand enger und Tabelle breiter

## Ziel
Das Admin-Panel soll weiter links am Bildschirmrand beginnen, damit die Sidebar näher am Rand sitzt und der Hauptbereich (besonders die Bestelltabelle) mehr horizontale Breite bekommt.

## Was passiert

- In `src/components/internal/app-shell.tsx` wird der Haupt-Layout-Container (`<div className="mx-auto flex max-w-7xl gap-6 px-5 py-6">`) angepasst:
  - Linkes Padding wird reduziert (z. B. `pl-3` statt `px-5`), rechts bleibt ausreichend Platz.
  - Maximale Breite wird angehoben, damit die Tabelle tatsächlich breiter wird und nicht nur verschoben ist (z. B. `max-w-[1440px]` oder `max-w-screen-2xl`).
- Die Sidebar-Breite bleibt erhalten oder wird leicht verringert (`w-56` → `w-52`), falls nötig, um noch mehr Raum für den Inhalt freizugeben.
- Header bleibt optisch abgestimmt; Änderungen nur im Content-Layout, nicht in der Navigation oder Mobilen Leiste.
- Keine Datenbank-/Server-Änderungen nötig.

## Offen nach Abschluss
- Kurzer visueller Check der Bestellseite im Preview, ob Sidebar links dichter am Rand sitzt und die Tabelle mehr Platz hat.
