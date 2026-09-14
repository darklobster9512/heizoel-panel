# Sektion "Vertrauen Sie auf smava"

Neue Sektion direkt unter der FAQ, als 1:1-Nachbau der Referenz.

## Aufbau

Grauer Hintergrund, Raster mit 3 Spalten (Desktop), 2 (Tablet), 1 (Mobil):

```text
[ Überschrift + Text ] [ Karte 1 ] [ Karte 2 ]
[ Karte 3 ]            [ Karte 4 ] [ Karte 5 ]
```

- Erste Zelle: Überschrift "Vertrauen Sie auf smava – Deutschlands bekanntes Kreditportal" (fett, dunkel) und darunter der Einleitungstext.
- Fünf weiße Karten ohne Rahmen, je mit grauer Titelzeile und vier grünen Links, jeder mit kleinem grünen Pfeil davor. Links führen auf die angegebenen smava.de-Adressen und öffnen in neuem Tab.
- Karteninhalte exakt wie geliefert (Ratenkredite, Auto, Umschuldung, Eigenheim, Wegweiser).

## Fußnoten darunter

Kleiner grauer Text, wie in der Referenz:
- "Sparen Sie über 35% mit smava:" (fett) + Erklärtext + grüner Link "Mehr Infos".
- Absatz zum 0,68 % Zinsen-Beispiel (§17 PAngV).
- Drei Zeilen: "* Mehr Infos", "** Mehr Infos" (beide grün verlinkt) und die ARD/ZDF/NTV/RTL-Zeile.

## Technisches

- Neue Komponente `TrustLinks()` in `src/components/landing/sections.tsx`, eingebunden in `src/routes/index.tsx` direkt nach `<Faq />`.
- Bestehende Farb-Token (`bg-surface`, `text-brand`, `text-conditions`) verwenden, keine harten Farbwerte.
- Externe Links mit `rel="noopener noreferrer"`.
- Prüfung mit Typecheck und Vorschau-Screenshot (Desktop + Mobil).
