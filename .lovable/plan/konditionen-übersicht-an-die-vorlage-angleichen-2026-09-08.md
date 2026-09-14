# Konditionen-Übersicht an die Vorlage angleichen

Ziel: Der graue Kasten „Ratenkredit Konditionen Übersicht“ soll exakt wie im Screenshot aussehen.

## Was sich ändert

- **Anordnung**: Links untereinander „Zinssätze“ und „Laufzeit“, rechts untereinander „Nettodarlehensbetrag“ und „Gesamtbetrag“. Aktuell laufen die vier Zeilen zeilenweise durch, dadurch steht rechts oben der falsche Eintrag.
- **Spaltenbreiten**: Jede Hälfte hat eine feste Beschriftungsspalte (ca. 170 px) und daneben den Wert, sodass die Werte beider Hälften sauber untereinander stehen.
- **Farben/Typo**: Beschriftungen fett in Dunkelgrau, Werte in einem warmen Braunton wie in der Vorlage, Überschrift fett und etwas kleiner, alles in ca. 14 px.
- **Abstände**: Etwas kompakterer Innenabstand und geringerer Zeilenabstand, dezent abgerundeter hellgrauer Kasten wie im Bild.
- **Mobil**: Untereinander gestapelt, Beschriftung über dem Wert, damit nichts umbricht.

## Technisches

- Betroffen ist nur `ConditionsBox` in `src/components/landing/sections.tsx`.
- Statt einer durchlaufenden Liste zwei Gruppen (`links`/`rechts`) rendern, jede als eigene Definitionsliste im 2-Spalten-Grid.
- Werte-Farbe als Design-Token in `src/styles.css` ergänzen (warmes Braun), keine hartkodierte Farbe im Bauteil.
- Prüfung mit Typecheck und einem Screenshot in Desktop- und Mobilbreite.

Texte und Zahlen bleiben unverändert (weiterhin Beispielwerte).
