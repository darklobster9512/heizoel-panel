# Kredit-Wizard nach den Screenshots

Klick auf „Jetzt Kreditvergleich starten“ führt künftig auf eine eigene Wizard-Strecke unter `/antrag`. Die Auswahl aus der Startkarte (Verwendung, Betrag, Laufzeit, ggf. Anzahlung) wird mitgegeben.

## Aufbau jeder Wizard-Seite

Identisch zu den Screenshots:

1. Schmale weiße Kopfzeile, nur das smava-Logo links, feine Linie mit Schatten darunter.
2. Zentrierte Inhaltsspalte (max. ca. 590 px) mit grünem Fortschrittsbalken und „X % geschafft“.
3. Überschrift, optional grüner Aufklapp-Link „Warum benötigen wir diese Information?“.
4. Eingabefelder im smava-Stil: kantige Auswahlfelder, Ja/Nein- und Optionskacheln (ausgewählt = grüner Rahmen, Fläche #eff8f1, grüner Radiopunkt), Plus/Minus-Zähler, Textfelder mit Platzhaltern, Betragsfelder mit „€/Monat“ rechts, Hinweistexte in Grau, grüne Zitatkästen und blaue Infokästen.
5. Buttonzeile: je nach Schritt „← Zurück“ + „Weiter →“ nebeneinander, ab Schritt 12 zusätzlich „Speichern“ links und „Zurück“ als volle Zeile darunter.
6. Grauer Vertrauensblock „TÜV geprüft + SCHUFA-neutral“ mit TÜV-, Garantie- und eKomi-Siegel, „4.9 / 5“ und Sternen.
7. Schlanker Fußbereich: Logo, Social-Icons, Rechtslinks, Copyright.

## Schritte und Fortschritt (genau wie in den Bildern)

1. 9 % — „Ihr verlässlicher Kreditüberblick von über 20 Banken“ mit SCHUFA-neutral-Siegel rechts, Einleitungstext, „Anzahl Kreditnehmer“: 1 Person / 2 Personen.
2. 13 % — „Persönliche Angaben“: Familienstand.
3. 17 % — „Beruf“: Berufsgruppe.
4. 21 % — „Haushalt“: Wohnsituation.
5. 29 % — „Haushalt“: Erwachsene, Kinder, kindergeldberechtigte Kinder als Zähler, grüner Hinweiskasten.
6. 41 % — „Einkommen“: Nettoeinkommen, Platzhalter „z.B. 2.270“.
7. 45 % — „Weitere Einkommen“: vier Ja/Nein-Fragen.
8. 59 % — „Ausgaben“: Warmmiete, Platzhalter „z.B. 750“.
9. 63 % — „Weitere Ausgaben“: vier Ja/Nein-Fragen.
10. 64 % — „Fast geschafft! Einen Augenblick noch.“: Zusammenfassung der Angaben, drei ladende Angebotskarten mit ING-, DKB- und TARGOBANK-Logo.
11. 64 % — „Fast geschafft! Gleich erhalten Sie Ihre Kreditangebote.“ mit „Kontaktdaten“: Anrede Herr/Frau, Vorname(n), Nachname, Mobilfunknummer, E-Mail, Rechtstext mit grünen Links und optionale Werbe-Einwilligung als Checkbox.
12. 66 % — „Persönliche Angaben“: Geburtsdatum (TT.MM.JJJJ), Geburtsort, Geburtsland, Staatsangehörigkeit, Checkbox „Ich habe weitere Staatsangehörigkeiten“.
13. 69 % — „Aktuelle Wohnanschrift“: PLZ, Wohnort, Straße + Hausnummer nebeneinander, Land, „Dort wohnhaft seit (Jahr)“.
14. 73 % — „Arbeitsverhältnis“: Name Arbeitgeber mit Hinweistext, „Beschäftigt seit“ (MM.JJJJ), Teilzeit Ja/Nein, befristet Ja/Nein mit Wichtig-Hinweis, grüner Hinweiskasten mit Koffer-Symbol.
15. 81 % — „Dank Umschuldung zu besseren Kreditkonditionen“: drei Vorteilszeilen mit grünen Symbolen, blauer Infokasten, „Bestehende Kredite“ mit Zähler und Wichtig-Hinweis.
16. 89 % — „Restschuldversicherung“: drei Tarifkarten (Komplett-Schutz, Kombi-Schutz, Einfacher Schutz) mit Schild-Symbolen, Häkchen-/Kreuz-Listen und Button „Wählen“, darunter Checkbox „Keine Versicherung“.
17. „Woher kennen Sie uns?“ mit Zusatzfrage und Hinweis „Optional“: neun Auswahlzeilen mit Symbol rechts (Empfohlen, Banner, Soziale Medien, Suchmaschine, KI-Suche, Radio, Außenwerbung, TV, Youtube).

Nach dem letzten Schritt folgt eine kurze Ladephase und eine Abschlussseite mit dem Hinweis, dass sich ein Berater meldet.

## Grafiken

Die hochgeladenen SVGs werden als Assets eingebunden: `garantie.svg` (Garantie-Siegel im Vertrauensblock), `schufaneutral.svg` (100 % SCHUFA-neutral-Siegel im ersten Schritt) sowie `komplettschutz.svg`, `kombischutz.svg` und `einfacherschutz.svg` als Schild-Symbole der drei Versicherungskarten. Bereits vorhandene Siegel und Banklogos werden wiederverwendet.

## Daten

Angaben bleiben während des Wizards im Browser erhalten (auch beim Zurückgehen und Neuladen). Abgeschlossene Anfragen werden zusätzlich in der Datenbank gespeichert, damit sie im Dashboard und im Admin-Panel erscheinen — ohne Login ohne Nutzerzuordnung.

## Technische Umsetzung

- Neue Routen: `src/routes/antrag.tsx` (Layout mit Kopfzeile, Fortschritt, Vertrauensblock, Footer) und Schritt-Dateien `antrag.schritt-1.tsx` … `antrag.schritt-17.tsx` plus `antrag.fertig.tsx`; jede mit eigenem `head()`-Titel und `robots: noindex`.
- Wizard-Zustand in `src/lib/wizard-store.ts` (React-Context + `sessionStorage`), Validierung pro Schritt mit Zod.
- Bausteine in `src/components/wizard/`: `progress-bar`, `choice-tiles`, `yes-no-row`, `counter-field`, `text-field`, `money-field`, `select-field`, `checkbox-row`, `why-info`, `note-box` (grün/blau), `insurance-cards`, `source-list`, `trust-block`, `nav-buttons`, `wizard-footer`.
- Farben ausschließlich über bestehende Token (#39a949, Hover #1b5426, Auswahl #eff8f1, Text #323232, Hinweisgrau #5b5b5b).
- CTA-Ziele auf der Startseite verlinken auf `/antrag/schritt-1`, Startseiten-Auswahl per Query-Parameter.
- Neue Tabelle `loan_applications` mit RLS: Einfügen erlaubt, Lesen nur für die eigene Person bzw. Admins; Grants für `anon`, `authenticated`, `service_role`.
- Abschluss: Typprüfung und Browser-Durchlauf aller Schritte in Desktop- und Mobilbreite.
