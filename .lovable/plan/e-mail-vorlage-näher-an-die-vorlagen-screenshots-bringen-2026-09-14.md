# E-Mail-Vorlage näher an die Vorlagen-Screenshots bringen

Die Auftragsbestätigung bekommt das Layout der hochgeladenen Beispielmail — gleiche Abschnitte, gleiche Anordnung, gleiche Dichte. Akzentfarbe bleibt unser Grün statt des Goldtons (sag Bescheid, wenn du doch Gold möchtest).

## Was sich ändert

**Kopfbereich**
- Deutlich größerer Logo-Bereich links, rechts kleiner Hinweis „Bestellbestätigung“.
- Neben dem Logo eine Sterne-Reihe mit der Bewertung 4,99, wie im Screenshot.
- Feine Akzentlinie über und unter dem Kopfbereich.

**Fortschrittsleiste**
- Bestellt / Bestellprüfung / Lieferung auf hellgrauem Band, Kreise enger und kleiner, Beschriftungen kleiner und in Versalien — näher an der Vorlage.

**Bestellübersicht**
- Farbiges Balken-Kopfteil bleibt, Zeilen bekommen abwechselnd hellen Hintergrund wie im Beispiel, Werte linksbündig statt rechtsbündig, Gesamtpreis rechts groß hervorgehoben.

**Vertrauens-Kacheln**
- Statt drei getrennter Kacheln ein durchgehender Kasten mit zwei Trennlinien (Festpreis / Bewertung mit Sternen / ab 500 Liter).

**Adressen**
- Zwei gleich breite Kästen mit grauem Kopfband und echtem Abstand dazwischen.

**„So geht es weiter“**
- Nummerierte Kreise mit senkrechter Verbindungslinie zwischen den Schritten; erledigte Schritte grün, aktueller Schritt hervorgehoben, spätere Schritte ausgegraut.

**Hinweis- und Fragenkasten**
- Hinweisliste als grauer Block mit Aufzählungspunkten, FAQ-Kästen kompakter.
- „Fragen?“-Kasten zentriert mit hervorgehobener Kontaktadresse.

**Fußbereich**
- Dank-Block mit kurzer Akzentlinie darüber.
- „Über …“-Block auf grauem Hintergrund mit drei kleinen Info-Kästchen (Registriert / USt-IdNr. / Bewertungen) und dem Zahlungshinweis.
- Siegel-Zeile (SSL-verschlüsselt, Trusted Shops) plus Bewertungszeile „4,99 / 5 — 33.000+ Bewertungen“.
- Darunter erneut der große Logo-Block mit Slogan-Zeile, wie im Screenshot, und ganz unten die vollständigen Firmenangaben.

Alle Firmen- und Logodaten kommen weiterhin aus dem ausgewählten Branding; ohne Branding greifen die Beispieldaten.

## Technisch

- Nur `src/lib/email-templates/order-confirmation.ts` wird überarbeitet (tabellenbasiertes HTML mit Inline-Styles, max. 640 px, kein Flex/Grid).
- Vorschauseite, Branding-Auswahl und Navigation bleiben unverändert.
- Anschließend Typprüfung und Build kontrollieren.
