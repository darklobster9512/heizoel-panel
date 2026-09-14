# Neuaufbau der Landingpage auf Enterprise-Niveau

Die aktuelle Seite wirkt zu verspielt: der komplette Hintergrund ist grün eingefärbt, es schweben getönte Glasflächen, und die Inhalte sind zu dünn für ein Finanzprodukt. Das wird korrigiert.

## Was sich am Erscheinungsbild ändert

- **Hintergrund wird ruhig und neutral.** Reines Weiß als Grundfläche, sehr helle Grautöne für abgesetzte Abschnitte. Der grüne Farbverlauf über die ganze Seite und die schwebenden farbigen Flächen entfallen vollständig.
- **Grün nur noch als Akzent.** Buttons, Kennzahlen, Hervorhebungen, Diagrammbalken, aktive Zustände. Kein grün flächig hinter Text.
- **Seriösere Typografie.** Eine klare, sachliche Schrift für Überschriften statt der aktuellen Display-Schrift; Zahlen in Tabellensatz, damit Zinssätze und Beträge sauber untereinander stehen.
- **Ruhigere Gestaltung.** Feine graue Trennlinien statt Glaseffekten, dezente Schatten, engere und konsistentere Abstände. Bewegung nur noch als leises Einblenden beim Scrollen.

## Neuer Seitenaufbau

1. **Kopfzeile** – Logo, Navigation, sekundärer Link, ein klarer Hauptbutton.
2. **Startbereich** – nüchterne Aussage zum Angebot, zwei Schaltflächen, darunter eine kompakte Zeile mit belastbaren Kennzahlen. Rechts ein Rechner-Element: Betrag, Laufzeit, Verwendungszweck, Ergebnis mit Zinssatz und Monatsrate inklusive Pflicht-Hinweis zum repräsentativen Beispiel.
3. **Vertrauensleiste** – Partnerbanken als ruhige, einfarbige Reihe.
4. **Konditionenübersicht** – Tabelle mit Kreditart, Zinsspanne, Laufzeit und Betragsrahmen. Genau das erwartet ein Nutzer auf einem Vergleichsportal und es hebt die Seite sofort von einer Allerwelts-Seite ab.
5. **Warum wir** – vier bis sechs sachliche Punkte in gleichmäßigem Raster, ohne verspielte Kachelgrößen.
6. **Ablauf in drei Schritten** – nummeriert, mit Zeitangabe je Schritt.
7. **Sicherheit und Regulierung** – Verschlüsselung, Datenschutz, Erlaubnis nach §34c GewO, keine Weitergabe an Dritte ohne Zustimmung, SCHUFA-neutrale Anfrage.
8. **Kundenstimmen** – drei Zitate mit Bewertung, ruhig gesetzt.
9. **Häufige Fragen** – aufklappbare Liste mit sechs Fragen.
10. **Abschluss-Aufruf** – ein dunkler, kontrastreicher Block.
11. **Fußzeile** – mehrspaltig, mit Impressum, Datenschutz, AGB, Widerruf und dem vollständigen repräsentativen Beispiel nach Preisangabenverordnung.

## Inhalte

Der Name „Klaro“, Banknamen, Zinssätze, Bewertungen und rechtliche Angaben bleiben zunächst Beispielinhalte. Nenne mir Firmenname, Produkte und echte Zahlen, dann tausche ich sie aus.

## Technische Umsetzung

- `src/styles.css`: Farbtokens neu setzen (weißer Hintergrund, neutrale Graustufen, Grün als `--brand` mit AA-Kontrast auf Weiß), Glas- und Drift-Animationen entfernen, Schriftpaar auf eine sachlichere Kombination umstellen, Schatten- und Rahmentokens vereinheitlichen.
- `src/routes/__root.tsx`: Font-Links entsprechend anpassen.
- `src/routes/index.tsx`: komplett neu strukturiert nach obiger Reihenfolge, ausgelagert in Abschnittskomponenten unter `src/components/landing/`.
- Rechner ist rein clientseitig (Zustand über `useState`, Annuitätenformel), kein Backend nötig.
- FAQ über bestehende shadcn-Accordion-Komponente; Tabelle semantisch als `<table>`.
- SEO-Metadaten im `head()` der Startroute aktualisieren, `FAQPage`-JSON-LD ergänzen.
- Barrierefreiheit: sichtbare Fokusrahmen, Beschriftungen an allen Eingaben, `prefers-reduced-motion` respektiert.
- Abschließende Prüfung per Browser-Screenshot in Desktop- und Mobilbreite.
