# Plan: /preisrechner/ergebnis exakt wie im Referenz-Screenshot

Die Ergebnisseite wird komplett auf das Layout des Referenz-Screenshots (fastenergy24) umgebaut — aber in Klaro-Farben/-Typografie. Die Seite wird eine schmale, vertikale Abfolge von Karten (Breite ca. `max-w-xl`), nicht die aktuelle breite Variante.

## Aufbau der Seite (von oben nach unten)

1. **Seitenkopf (ohne grauen Header-Balken, weißer Hintergrund)**
   - Links: H1 „Ihr persönliches Heizölangebot"
   - Rechts oben: graues Badge „Stand: TT.MM.JJJJ, HH:MM Uhr" (Pill, dunkelgrau wie im Screenshot)

2. **Lieferdaten-Zeile (weiße Card, abgerundet)**
   - Eine Zeile: „**50667** · **3.000 L** · ab **22.09.2026**" (fett, mit Mittelpunkten)
   - Rechts: Textlink „ändern" (Brand-Grün) — öffnet erst dann das Bearbeitungsformular (bestehende Edit-Logik bleibt: PLZ, Menge, Abladestellen, Schlauch, Tankwagen + „Preis neu berechnen")
   - Nicht im Bearbeitungsmodus sind keine Eingabefelder sichtbar

3. **Angebots-Card mit Tabs**
   - Tabs: „Standard — Das Günstige" / „Premium — Das Sparsame" mit gelbem „EMPFOHLEN"-Badge auf Premium; aktiver Tab mit grüner Unterlinie (Klaro-Akzent statt Gelb), Flammen-Icon vor dem Tabnamen
   - Beschreibungszeile (Standard: „Heizöl Standard (DIN 51603-1) — geeignet für alle Ölheizungen.")
   - Preisbereich: links „Preis pro 100 Liter" mit Preis (Standard 128,78 € / Premium 133,16 €), rechts „Gesamtpreis inkl. Lieferung" mit Gesamtwert (Menge/100 × Preis, z. B. 3.000 L → 3.863,40 €) und darunter „inkl. 19 % MwSt." — rechtsbündig wie im Screenshot
   - Grüne Hinweiszeile mit Häkchen: „Direktpreis ohne Zwischenhändler — inkl. Lieferung"
   - Zwei-Spalten-Zeile: links „LIEFERUNG: ab 22.09.2026, Deutschlandweit", rechts „ZAHLUNGSARTEN:" mit den 4 Zahlungsart-Bildern (Vorkasse, Bar, EC-Karte, Rechnung) nebeneinander in zwei Zeilen
   - Full-Width Button „Zur Bestellung »" (Klaro-Grün, dunkle Schrift)
   - Darunter zentriert: „100 % sicher & SSL-verschlüsselt" (Schloss-Icon) und Link „Sorten im Detail vergleichen" → `/heizoel-wissen#sorten`
   - Trust-Zeile in der Card: eKomi-Siegel + Trustami/Trust-Siegel, goldene Sterne, „25.000+ Bewertungen"
   - Fußzeile der Card: „Lieferung durch Klaro oder regionalen Partnerhändler"

4. **Graue Hinweis-Box (eigene Card)**
   - Zentriert: „Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!"

5. **Ihre Vorteile (graue Card, einspaltige Liste)**
   - Titel „Ihre Vorteile" mit Icon
   - 5 Einträge untereinander (nicht 2-spaltig): Garantiert günstigste Preise / Deutschlandweite Lieferung inklusive / 100 % Käuferschutz garantiert / Über 25.000 zufriedene Kunden / SSL-verschlüsselt & DSGVO-konform — jeweils fetter Titel + eine Unterzeile

Danach direkt der Footer (keine CTA-Sektion, bereits entfernt).

## Technische Details
- Datei: `src/routes/preisrechner.ergebnis.tsx` (Komplett-Umbau des JSX, Logik für Preise/Suchen-Parameter/Bearbeiten bleibt)
- Container-Breite: `max-w-xl` (statt `max-w-2xl`), Abstände kompakt (`py-6`/`gap-4`)
- Bestehende Edit-on-click-Logik bleibt; „ändern" wird zum schlichten Textlink statt Button
- Premium-Preis 133,16 €/100 L, Standard 128,78 €/100 L; Gesamtpreis immer inkl. Lieferung & 19 % MwSt.
- Lieferdatum: fix heute + 7 Tage, nicht änderbar
- Tabs schalten weiterhin zwischen Standard/Premium um und rechnen den Gesamtpreis neu
- Zahlungsarten-Bilder (Vorkasse, Bar, EC-Karte, Rechnung) kompakt nebeneinander
- Kein ReferralBanner auf dieser Seite; danach direkt `SiteFooter`
- Verifizierung: `bunx tsgo --noEmit`, Build-Log, Playwright-Screenshots Desktop + Mobil
