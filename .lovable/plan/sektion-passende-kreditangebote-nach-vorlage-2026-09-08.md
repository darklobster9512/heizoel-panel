# Sektion „Passende Kreditangebote“ nach Vorlage

Direkt unter dem Abschnitt zu den persönlichen Angaben entsteht die nächste Sektion in der Anordnung und Größenwirkung der 1337 × 557 px großen Referenz.

## Umsetzung

- Weißer, vollbreiter Abschnitt mit zwei klaren Bereichen:
  - links die hochgeladene hohe Angebotsgrafik `fake-offer-list.svg`, am unteren Rand wie in der Vorlage angeschnitten;
  - rechts die Überschrift „Mit Klaro zu passenden Kreditangeboten“ und vier Vorteile in einem 2×2-Raster.
- Vorteile und Texte nach Vorlage:
  - „Günstige Zinsen“ mit `interest.svg`;
  - „SCHUFA-neutral“ mit `neutral.svg`;
  - „Kostenlos & unverbindlich“ mit `free.svg`;
  - „Datensicherheit“ mit `data-safety.svg`.
- Die vier grauen Symbole werden in ihrer gelieferten Originaloptik und -größe dargestellt; Titel, Zeilenumbrüche und Fließtextbreiten werden an die Vorlage angeglichen.
- Unter dem Raster sitzt der breite grüne Button „Jetzt Kreditvergleich starten“ an derselben Position. Er führt zur vorhandenen Auswahlkarte im Startbereich.
- „smava“ wird in Überschrift und Fließtext durch die aktuelle Platzhaltermarke „Klaro“ ersetzt; die hochgeladene Angebotsgrafik bleibt unverändert.
- Auf Mobilgeräten werden Angebotsgrafik, Überschrift, Vorteile und Button sinnvoll untereinander angeordnet, ohne Überlappung oder abgeschnittenen Text.
- Nachfolgende bestehende Bereiche bleiben unverändert.

## Technische Details

- Alle fünf hochgeladenen SVG-Dateien werden als CDN-Assets eingebunden.
- In `src/components/landing/sections.tsx` wird eine eigene Abschnittskomponente ergänzt.
- In `src/routes/index.tsx` wird sie direkt nach `<PersonalDataInfo />` und vor `<LoanTypes />` eingesetzt.
- Höhe, Spaltenbreiten, Bildposition, Abstände und Typografie werden per Desktop-Screenshot gegen die Referenz geprüft; zusätzlich erfolgt eine mobile Prüfung und Kontrolle auf Darstellungsfehler.
