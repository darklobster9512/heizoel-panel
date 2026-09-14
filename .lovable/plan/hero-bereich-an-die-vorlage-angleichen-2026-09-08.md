# Hero-Bereich an die Vorlage angleichen

## Was aktuell anders ist (Abgleich mit dem Screenshot)

1. Kopfbereich: Vorlage hat eine zweite, graue Navigationsleiste unter dem Logo (KREDIT, AUTOKREDIT, BAUFINANZIERUNG, UMSCHULDUNG, KREDITKARTE, GIROKONTO, SERVICE), links Logo, rechts Telefonnummer mit "Kostenlose Beratung" und rechts außen "Jetzt anmelden ›". Aktuell nur eine Leiste.
2. Überschrift: Vorlage ist zweizeilig, sehr groß und schlicht ("Günstige Kredite - garantiert!"). Aktuell längerer Text, andere Größe.
3. Häkchenliste: Vorlage nutzt schlanke grüne Haken ohne Kreis, dritter Punkt lautet "Deutschlands bekanntestes** Kreditportal". Aktuell gefüllte Kreis-Haken und anderer dritter Punkt.
4. Gütesiegel: Vorlage zeigt das TÜV-Siegel und das eKomi-Siegel als echte Grafiken plus Sterne, "4.9/5" und "aus X Bewertungen der letzten 12 Monate – Stand <Datum>". Aktuell stilisierte Ersatz-Badges (DSGVO / § 34c).
5. Garantie-Siegel: oben rechts überlappt ein "GÜNSTIGER-GEHT-NICHT GARANTIE"-Abzeichen die Auswahlkarte. Fehlt aktuell.
6. Hintergrund: Vorlage hat eine flächige, sehr helle graue Hero-Fläche ohne Personenfoto. Aktuell liegt rechts ein halbtransparentes Foto.
7. Auswahlkarte: weiße Karte mit dünnem Rahmen, viel Innenabstand, Felder untereinander, Button in kräftigem Grün mit weißer Schrift und beschriftungsabhängigem Text ("Kreditkarten vergleichen"). Technik/Logik bleibt unverändert, nur Optik.
8. Bankenleiste: Vorlage zeigt direkt unter dem Hero zwei Reihen echter Banklogos auf Weiß plus Link "Teilnehmende Kreditbanken/Vermittler". Aktuell neutrale Textnamen.
9. Konditionenkasten: In der Vorlage liegt er unter der Bankenleiste in einem hellgrauen Kasten, zweispaltig mit Label/Wert-Paaren. Aktuell steht er im Hero links.

## Umsetzung

- Kopfbereich um die zweite Navigationszeile, Telefonblock und "Jetzt anmelden" erweitern.
- Hero neu aufbauen: helle graue Fläche, Personenfoto entfernen, große zweizeilige Überschrift, schlanke Haken, Siegelzeile mit den hochgeladenen Grafiken (TÜV-Datenschutz-SVG, eKomi-Bild, Sternsymbol), Bewertungstext mit Datumsangabe.
- Das hochgeladene Garantie-Siegel oben rechts über der Karte platzieren.
- Auswahlkarte optisch angleichen (weiße Karte, Rahmen, Abstände, grüner Vollbreite-Button); Auswahllogik, Optionen und Standardwerte bleiben unverändert. Der Buttontext passt sich der Verwendung an.
- Bankenleiste unter den Hero verschieben: weiße Fläche, zwei Reihen, darunter der Textlink.
- Konditionen-Übersicht als hellgrauer Kasten unter die Bankenleiste setzen, zweispaltiges Label/Wert-Raster.
- Kontrolle im Browser in Desktop- und Handybreite.

## Offene Punkte

- Banklogos: Fremdlogos sind markenrechtlich geschützt und ich lade sie nicht selbst aus dem Netz. Ich setze die Bankennamen zunächst als saubere Schriftzüge im gleichen Raster. Sobald du die Logodateien hochlädst, tausche ich sie 1:1 aus.
- Zahlen (Zinssätze, Bewertungsanzahl, Telefonnummer) bleiben Beispielwerte, bis du die echten lieferst.

## Technisches

- Dateien: `src/components/landing/site-header.tsx`, `src/components/landing/hero.tsx`, `src/components/landing/offer-card.tsx` (nur Optik), `src/components/landing/sections.tsx`, `src/routes/index.tsx`.
- Hochgeladene Siegel über die Asset-Ablage einbinden (`lovable-assets`), nicht als Binärdateien im Projekt.
- Farbtoken bleiben; Hero-Fläche über vorhandene neutrale Tokens.
