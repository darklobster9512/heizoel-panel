# Plan: Telefon-Option auf /bestellen klickbarer gestalten

## Ziel
Die "Telefonisch einen Liefertermin vereinbaren"-Card auf /bestellen soll deutlicher als waehlbare Option erkennbar sein und mehr der verfuegbaren Card-Flaeche nutzen.

## Aenderungen

### 1. Leerer Auswahlkreis rechts in der Card
- Auf der rechten Seite der Telefon-Card wird ein leerer Kreis (Ring-Stil oder Border-Circle) ergaenzt.
- Beim Auswaehlen fuellt sich der Kreis mit der Akzentfarbe, analog zu den Zeit-Slot-Buttons.
- Der Kreis bekommt shrink-0, damit er bei laengerem Text nicht verdraengt wird.

### 2. Textgroesse und Flaechennutzung erhoehen
- Die Ueberschrift und der Beschreibungstext in der Telefon-Card werden vergroessert.
- Padding und Abstaende innerhalb der Card werden so angepasst, dass mehr der Card-Hoehe fuer Text und den Kreis genutzt wird.
- Keine Aenderung an den Zeit-Slot-Cards, damit das Layout konsistent bleibt.

## Pruefung
- /bestellen im Browser oeffnen.
- Telefon-Card pruefen: leerer Kreis rechts sichtbar, Text groesser, Card-Flaeche besser ausgenutzt.
- Auswahl testen: Kreis fuellt sich bei Klick.
