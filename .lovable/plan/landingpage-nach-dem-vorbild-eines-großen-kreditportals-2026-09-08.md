# Landingpage nach dem Vorbild eines großen Kreditportals

## Vorab, damit es keine Überraschung gibt

Eine buchstäbliche 1:1-Kopie inklusive heruntergeladener Fotos, Siegel, Bank- und Markenlogos sowie übernommener Texte setze ich nicht um. Fremde Bilddateien, Prüfsiegel (TÜV, eKomi) und Bankenlogos sind geschützt und an Nutzungsrechte gebunden, die sich nicht durch Herunterladen übertragen lassen — auch nicht intern. Was ich baue: dieselbe Seitenlogik, dieselbe Reihenfolge, dieselbe Informationsdichte und eine sehr ähnliche Anmutung, mit eigenen Grafiken und eigenen Texten. Wenn ihr die Original-Assets rechtmäßig besitzt, ladet sie hoch, dann setze ich genau diese ein.

## Neuer Seitenaufbau

1. **Kopfzeile** — Logo links, schlanke Navigation, Telefonnummer mit Servicezeit, grüner Hauptbutton.
2. **Startbereich** — links große Überschrift mit drei Häkchen-Vorteilen (über 20 Banken, SCHUFA-neutral und kostenlos, bekanntes Kreditportal), darunter eine Bewertungszeile mit Sternen und eigenen Vertrauens-Badges. Rechts bleibt **die bestehende Auswahl-Karte technisch unverändert** — nur Rahmen, Abstände und Farben werden an das neue Erscheinungsbild angeglichen.
3. **Konditionen-Übersichtsbox** — kompakter Kasten direkt unter dem Startbereich mit Zinssätzen, Laufzeit, Nettodarlehensbetrag und Gesamtbetrag.
4. **Partnerbanken** — zwei laufende Logoreihen; die Logos werden als schlichte neutrale Wortmarken mit Platzhalternamen umgesetzt, plus Link „Teilnehmende Kreditbanken“.
5. **Warum vergleichen** — drei bis vier Nutzenpunkte mit Icons.
6. **Ablauf in drei Schritten** — nummeriert mit Zeitangaben.
7. **Kreditarten-Kacheln** — Autokredit, Umschuldung, Modernisierung, Gewerbe usw., jeweils mit Zinsangabe.
8. **Zinsvergleichs-Grafik** — Balken, die den Unterschied zwischen Vergleich und Hausbank zeigen.
9. **Bewertungen** — Sternebewertung plus drei Kundenstimmen.
10. **Sicherheit und Regulierung** — Verschlüsselung, Datenschutz, keine Weitergabe ohne Zustimmung.
11. **Häufige Fragen** — aufklappbare Liste.
12. **Abschluss-Aufruf** und **mehrspaltige Fußzeile** mit repräsentativem Beispiel und Rechtslinks.

## Erscheinungsbild

Dichtere, portaltypische Gestaltung: kräftige Überschriften, viele Häkchen und Siegel, klare Kästen, deutlich mehr Inhalte pro Bildschirm als bisher. Das helle Grün bleibt Akzentfarbe, Hintergrund weiß und hellgrau.

## Bilder

Ich erzeuge passende eigene Bilder: ein Startbild mit einer Person in freundlicher Alltagssituation, Icons für Vorteile und Schritte sowie neutrale Vertrauens-Badges. Keine fremden Fotos, Siegel oder Bankenlogos.

## Technische Umsetzung

- `src/components/landing/hero.tsx`: Auswahl-Karte (Zustandslogik, Verwendungen, Beträge, Laufzeiten, Anzahlung) bleibt unangetastet; nur der umgebende Startbereich wird neu aufgebaut, Karte wird als eigene Komponente `offer-card.tsx` unverändert herausgelöst.
- `src/components/landing/sections.tsx` wird in einzelne Abschnittsdateien aufgeteilt und um die neuen Abschnitte (Konditionenbox, Kreditarten-Kacheln, Zinsbalken, Bewertungsblock) erweitert.
- Bilder über `imagegen` erzeugt und unter `src/assets/` importiert.
- `src/styles.css`: dichtere Typo-Skala, Häkchen- und Badge-Stile ergänzen; Farbtoken bleiben.
- SEO-Metadaten und FAQ-JSON-LD in `src/routes/index.tsx` aktualisieren.
- Abschließende Prüfung per Browser-Screenshot in Desktop- und Mobilbreite.
