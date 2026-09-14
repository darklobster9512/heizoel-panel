# Einheitliche smava-Farben und Header-Logo

## Umsetzung

- Die zentralen Grün-Farbwerte auf `#39a949` umstellen, damit alle bereits semantisch grün ausgezeichneten Texte, Links, Häkchen und Pfeil-Icons exakt denselben Farbton verwenden.
- Für alle sichtbaren Aktionsbuttons einheitlich `#39a949` als Hintergrund, weißen Text und `#1b5426` beim Darüberfahren festlegen. Das gilt auch für die direkt als Links gebauten Aktionsflächen im Kreditformular.
- Reine Bedienelemente ohne klassische Button-Fläche – etwa FAQ-Zeilen und die Pfeile der Bewertungsnavigation – nicht in gefüllte Buttons verwandeln; ihre grünen Texte bzw. Icons werden auf `#39a949` vereinheitlicht.
- Das vollständige smava-SVG inklusive Symbol aus dem Footer in eine gemeinsame Logo-Komponente überführen und im Header anstelle des derzeitigen Platzhalter-Icons einsetzen. Der Footer verwendet danach weiterhin exakt dasselbe Logo.
- Desktop und Mobil prüfen: normale und Hover-Zustände, lesbarer weißer Buttontext, alle grünen Elemente sowie Größe und Ausrichtung des Header-Logos.

## Technische Details

- Die vorhandenen semantischen Farbvariablen werden angepasst, statt einzelne Farbcodes über viele Seitenteile zu verteilen.
- Die Standardvariante der gemeinsamen Button-Komponente erhält den neuen Hover-Farbwert; abweichende direkte CTA-Links werden daran angeglichen.
- Das bestehende Footer-SVG wird unverändert wiederverwendet, nicht nachgezeichnet.
