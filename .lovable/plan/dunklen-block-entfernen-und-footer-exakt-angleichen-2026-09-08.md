# Dunklen Block entfernen und Footer exakt angleichen

## Ziel

Der dunkle Bereich „Prüfen Sie in zwei Minuten, was für Sie möglich ist.“ entfällt vollständig. Direkt nach der Prämien-Sektion folgt der helle Footer, dessen Desktop-Darstellung auf die bereitgestellte Referenz mit 1283 × 307 px abgestimmt wird.

## Änderungen

1. **Dunklen Bereich entfernen**
   - `CtaBlock` aus der Seitenreihenfolge und dem Import in `src/routes/index.tsx` entfernen.
   - Die danach ungenutzte `CtaBlock`-Komponente aus `src/components/landing/sections.tsx` löschen.

2. **Originales smava-Logo verwenden**
   - Das generische Logo mit K-Kästchen im Footer ersetzen.
   - Den vollständigen originalen smava-SVG-Pfad aus dem bereitgestellten beziehungsweise verifizierten HTML/SVG-Code als Inline-SVG mit dem originalen Seitenverhältnis 147 × 32 einsetzen.
   - Logo in der Referenzgröße von ungefähr 139 × 30 px unten links darstellen.

3. **Desktop-Footer auf die Vorlage abstimmen**
   - Footer auf eine kompakte Gesamthöhe von ungefähr 307 px bringen.
   - Inhaltsbreite, vier Spaltenpositionen und Außenabstände an die Referenz anpassen: Unternehmen, Kredit aufnehmen, Service, Kostenlose Beratung.
   - Die in der Vorlage in den Überschriften doppelt auftauchenden Einträge nicht erneut in den Listen anzeigen: Unter „Unternehmen“ beginnt die Liste mit „Karriere“, unter „Kredit aufnehmen“ mit „Kreditvergleich“, unter „Service“ mit „Kreditrechner“.
   - Schriftgrößen, Zeilenabstände und schwarze Textfarbe angleichen; nur Logo und Social-Icons bleiben grün.
   - Den oberen Bereich mit einer durchgehenden feinen grauen Linie vom unteren Bereich trennen.
   - Untere Zeile exakt wie in der Vorlage aufbauen: Logo links, Social-Icons mittig, Rechtslinks rechts oben und Copyright/Adresse rechts unten.

4. **Social-Icons korrigieren**
   - Die gelieferten originalen SVG-Pfade für YouTube, LinkedIn, Instagram, Facebook und X verwenden.
   - Jedes Symbol in einen 32 × 32 px großen, weiß gefüllten Button mit dünner grüner Kontur und kleinem Eckenradius setzen.
   - Abstände und Ausrichtung an der Vorlage angleichen.

5. **Mobile Darstellung erhalten und anpassen**
   - Die vier Bereiche bleiben mobil als standardmäßig geschlossene Aufklappzeilen erhalten.
   - Logo, Social-Buttons, Rechtslinks und Copyright werden darunter sauber gestapelt, ohne Desktop-Abstände zu übernehmen.

## Prüfung

- Typecheck ausführen.
- Desktop-Screenshot bei 1280 px direkt mit der 1283 × 307-px-Referenz vergleichen.
- Mobile Ansicht prüfen: Aufklappbereiche funktionieren, kein Text überlappt und der entfernte dunkle Block erscheint nicht mehr.
