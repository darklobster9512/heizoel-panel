# Kundenstimmen-Karussell unter der Konditionen-Übersicht

Neue Sektion direkt unterhalb des grauen Konditionen-Kastens, 1:1 nach Vorlage.

## Aufbau

- Hellgrauer Abschnittshintergrund über die volle Breite, großzügige Abstände oben/unten.
- Überschrift links: „Über 300.000 zufriedene Kunden mit smava“ (fett, groß, dunkelgrau).
- Darunter eine waagerecht scrollbare Reihe weißer Bewertungskarten, drei sichtbar auf dem Desktop, zwei auf Tablet, eine auf dem Handy.
- Jede Karte: großes grünes Anführungszeichen oben, Bewertungstext, unten fixiert „5 von 5 Sterne auf ekomi.de“ (mit „ekomi.de“ in Grün) und darunter „vom TT.MM.JJJJ um HH:MM Uhr“ in Grau.
- Alle Karten gleich hoch, Fußzeile bündig unten — wie im Screenshot.
- Grüner Pfeil links und rechts neben der Reihe zum Blättern (auf dem Handy ausgeblendet, dort wird gewischt).
- Schmale graue Bildlaufleiste unter den Karten.

## Inhalte

Alle 22 gelieferten Bewertungen werden wortwörtlich übernommen, inklusive Emojis, Sternchen-Schwärzungen und Datum/Uhrzeit, in der angegebenen Reihenfolge.

## Weiteres

- Der bestehende ältere Kundenstimmen-Block weiter unten („4,8 von 5 Sternen aus 2.318 Bewertungen“) wird entfernt, damit es keine doppelten Bewertungen auf der Seite gibt.

## Technisches

- Neue Komponente `CustomerVoices` in `src/components/landing/sections.tsx`, eingebunden in `src/routes/index.tsx` direkt nach `ConditionsBox`; `Testimonials` wird dort entfernt.
- Umsetzung als `overflow-x-auto` Flex-Reihe mit `scroll-snap`, feste Kartenbreite; Pfeile scrollen per `scrollBy` um eine Kartenbreite.
- Nur Design-Tokens für Farben (Grün = `brand`/`brand-deep`, Flächen = `surface`), keine hartkodierten Farbwerte.
- Prüfung: Typecheck plus Screenshots in Desktop- und Mobilbreite.
