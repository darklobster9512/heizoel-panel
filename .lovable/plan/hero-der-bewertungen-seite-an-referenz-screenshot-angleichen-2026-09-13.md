# Hero der /bewertungen-Seite an Referenz-Screenshot angleichen

## Ziel
Der Hero von `/bewertungen` sieht aus wie im Referenz-Screenshot: klare Trennung zwischen Bewertungs-Kopf und Kennzahlen-Band, dunkle (nicht grüne) Kennzahlen, neutralere Siegel-Karten.

## Änderungen in `src/routes/bewertungen.tsx`

1. **Goldene Trennlinie**: Direkt unter „Basierend auf 33.429 verifizierten Bewertungen" eine durchgehende, ca. 3–4 px hohe Linie in Gold/Amber (passend zum Sternengold, z. B. `#f1a319`) — volle Breite, wie in der Referenz.

2. **Kennzahlen-Band auf weißem Streifen**: Die 5 Kennzahlen (33.429 Kunden, 4,99/5, 98,9 %, 500+, 10+) liegen auf einem eigenen weißen Band unter der Goldlinie, optisch abgesetzt vom grauen Hero-Hintergrund.
   - Werte in **Dunkelgrau/Schwarz** (statt Grün) und fett
   - Labels in **GROSSBUCHSTABEN**, klein, muted, mit Buchstabenabstand (z. B. „KUNDEN", „BEWERTUNG", „ZUFRIEDENHEIT", „HÄNDLER", „JAHRE ERFAHRUNG")
   - Vertikale Trennlinien zwischen den Werten bleiben (Desktop)

3. **Untertitel mit Fettdruck**: „Über **33.000 zufriedene Kunden** bewerten uns mit **4,99 von 5 Sternen**" — die beiden Schlüsselwerte fett, Rest normal.

4. **Siegel-Karten neutraler**: Bei den 4 Zertifizierungs-Karten die Icon-Kacheln von grünen Kreisen auf **hellgraue, abgerundete Quadrate** mit dunklem Icon umstellen (wie in der Referenz), Karten bleiben weiß mit feinem Rahmen.

5. **Abstände**: Hero-Abstände an Referenz angleichen — kompakter zwischen Sternen, Bewertungszahl und „Basierend auf …"-Zeile, damit die Goldlinie und das Zahlenband visuell zusammengehören.

## Technisch
- Nur `src/routes/bewertungen.tsx`; Sterne-Gold (`#f1a319`) wird auch für die Trennlinie genutzt.
- Keine Änderungen an Header, Footer, CTA oder den Bewertungskarten darunter.
- Danach: Build-Log prüfen und Desktop-/Mobil-Screenshot zum Vergleich mit der Referenz.
