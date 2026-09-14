# Schritte-Sektion exakt an die Vorlage angleichen

Der Vergleich von Vorlage und aktueller Ansicht zeigt: Inhalte und Reihenfolge stimmen, aber Größen, Breiten, Farben und Abstände weichen ab. Das wird korrigiert.

## Was geändert wird

1. **Spaltenbreite**: In der Vorlage ist jede Textspalte schmal (Titel bricht auf zwei Zeilen um, Fließtext ca. 240 px breit). Aktuell laufen die Texte deutlich breiter. Jede Spalte bekommt eine feste maximale Textbreite, die Spalten stehen mit größerem Abstand nebeneinander.
2. **Symbolgröße**: Die Symbole sind aktuell zu groß. Sie werden auf die Größe der Vorlage verkleinert (ca. 48 px) und oben am Titel ausgerichtet, mit kleinerem Abstand zum Text.
3. **Titel**: etwas kleiner, fett, gleiche Zeilenhöhe wie in der Vorlage, dunkles Blaugrau statt Fast-Schwarz.
4. **Fließtext**: größer als jetzt (ca. 15 px), mit der ruhigen blaugrauen Textfarbe der Vorlage statt des hellen Grautons.
5. **Überschrift**: auf die Größe der Vorlage (ca. 24 px) gesetzt, gleicher Abstand nach unten zu den drei Spalten.
6. **Abstände**: Innenabstand der Sektion oben/unten an die Vorlage angeglichen, damit die Sektion nicht so luftig wirkt.
7. **Mobil**: die drei Schritte stehen weiterhin untereinander, Symbol links neben dem Text.

## Schriftart

Die Vorlage nutzt eine neutrale Standard-Schrift; unsere Seite verwendet durchgehend die etwas markantere Hausschrift. Die Sektion bleibt bei der Hausschrift, damit die Seite einheitlich bleibt. Wenn genau diese Vorlagen-Schrift gewünscht ist, sag Bescheid — das ist dann eine Entscheidung für die ganze Seite.

## Technisch

Nur `src/components/landing/sections.tsx` (Funktion `Steps` und Layout-Klassen) wird angepasst; keine neuen Dateien, keine Logikänderung. Prüfung anschließend per Typecheck und Screenshot-Vergleich Desktop/Mobil gegen die Vorlage.
