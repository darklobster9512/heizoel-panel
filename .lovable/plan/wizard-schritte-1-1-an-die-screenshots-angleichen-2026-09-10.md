# Wizard-Schritte 1:1 an die Screenshots angleichen

Der Wizard hat aktuell einen zusätzlich erfundenen ersten Schritt („Ihre Kreditdaten") — den gibt es in den Screenshots nicht. Dadurch ist die gesamte Strecke um einen Schritt verschoben, und die Prozentwerte passen nicht mehr zu den Inhalten.

## Ist-Zustand (geprüft)

| Datei | Überschrift heute | Prozent |
| --- | --- | --- |
| schritt-1 | Ihre Kreditdaten (erfunden) | 9 % |
| schritt-2 | Wie viele Personen beantragen den Kredit? | 13 % |
| schritt-3 | Familienstand | 17 % |
| schritt-4 | Berufsgruppe | 21 % |
| schritt-5 | Wohnsituation | 29 % |
| schritt-6 | Haushaltsgröße | 41 % |
| schritt-7 | Einkommen | 45 % |
| schritt-8 | Ausgaben | 59 % |
| schritt-9 | Erreichbarkeit (erfunden) | 63 % |

Der Screenshot-Ablauf sieht anders aus: „Weitere Einkommen" und „Weitere Ausgaben" sind eigene Schritte, „Erreichbarkeit" existiert nicht, Kontaktdaten kommen erst nach der Ladeseite.

## Soll-Zustand (genau wie die Screenshots)

1. 9 % — „Ihr verlässlicher Kreditüberblick von über 20 Banken", SCHUFA-neutral-Siegel rechts, Einleitungstext, Frage „Anzahl Kreditnehmer": 1 Person / 2 Personen
2. 13 % — Persönliche Angaben: Familienstand
3. 17 % — Beruf: Berufsgruppe
4. 21 % — Haushalt: Wohnsituation
5. 29 % — Haushalt: Erwachsene, Kinder, kindergeldberechtigte Kinder (Zähler) + grüner Hinweiskasten
6. 41 % — Einkommen: Nettoeinkommen, Platzhalter „z.B. 2.270"
7. 45 % — Weitere Einkommen: vier Ja/Nein-Fragen
8. 59 % — Ausgaben: Warmmiete, Platzhalter „z.B. 750"
9. 63 % — Weitere Ausgaben: vier Ja/Nein-Fragen
10. 64 % — „Fast geschafft! Einen Augenblick noch." mit Zusammenfassung und drei ladenden Angebotskarten (ING, DKB, TARGOBANK)
11. 64 % — „Fast geschafft! Gleich erhalten Sie Ihre Kreditangebote." mit Kontaktdaten: Anrede, Vorname(n), Nachname, Mobilfunknummer, E-Mail, Rechtstext mit grünen Links, optionale Werbe-Einwilligung
12. 66 % — Persönliche Angaben: Geburtsdatum, Geburtsort, Geburtsland, Staatsangehörigkeit, Checkbox weitere Staatsangehörigkeiten
13. 69 % — Aktuelle Wohnanschrift: PLZ, Wohnort, Straße + Hausnummer nebeneinander, Land, „Dort wohnhaft seit (Jahr)"
14. 73 % — Arbeitsverhältnis: Arbeitgeber, „Beschäftigt seit" (MM.JJJJ), Teilzeit Ja/Nein, befristet Ja/Nein mit Wichtig-Hinweis, grüner Hinweiskasten
15. 81 % — „Dank Umschuldung zu besseren Kreditkonditionen": drei Vorteilszeilen, blauer Infokasten, Bestehende Kredite mit Zähler
16. 89 % — Restschuldversicherung: drei Tarifkarten mit Schild-Symbolen, Häkchen-/Kreuz-Listen, Button „Wählen", darunter Checkbox „Keine Versicherung"
17. „Woher kennen Sie uns?" mit Hinweis „Optional": neun Auswahlzeilen mit Symbol rechts

Danach kurze Ladephase und Abschlussseite.

## Änderungen

- Der erfundene Schritt „Ihre Kreditdaten" entfällt. Verwendung, Betrag und Laufzeit kommen weiterhin aus der Startseiten-Karte über die Adresszeile und werden im Wizard nicht erneut abgefragt.
- Der erfundene Schritt „Erreichbarkeit" entfällt; Telefon und E-Mail gehören zu den Kontaktdaten in Schritt 11.
- Neu als eigene Schritte: „Weitere Einkommen" (vier Ja/Nein-Fragen) und „Weitere Ausgaben" (vier Ja/Nein-Fragen).
- Alle übrigen Schritte rücken um eine Position nach vorn; Überschriften, Zwischentexte und Prozentwerte werden exakt nach obiger Liste gesetzt.
- Schritt 1 bekommt das SCHUFA-neutral-Siegel rechts neben der Überschrift.
- Auf Schritt 1 gibt es keinen „Zurück"-Button-Zwang zur Startseite mehr als eigener Schritt-Rückweg — nur wie im Screenshot.

## Technische Umsetzung

- Inhalte von `src/routes/antrag/schritt-2.tsx` … `schritt-9.tsx` werden um eine Nummer nach unten verschoben; `schritt-1.tsx` erhält den Kreditüberblick-Inhalt.
- Die bisherigen Ja/Nein-Blöcke aus `schritt-7.tsx`/`schritt-8.tsx` werden in eigene Schritte 7 und 9 ausgelagert; 6 und 8 behalten nur je ein Betragsfeld.
- `NavButtons`-Ziele (`backTo`/`nextTo`) und alle `head()`-Titel werden auf die neue Nummerierung gesetzt.
- `src/lib/wizard-store.tsx` bleibt unverändert (Felder existieren bereits); die Zuordnung in `fertig.tsx` bleibt gültig.
- Abschluss: Typprüfung und Browser-Durchlauf aller 17 Schritte in Desktop- und Mobilbreite.
