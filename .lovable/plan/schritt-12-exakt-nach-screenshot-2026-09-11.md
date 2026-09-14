# Schritt 12 exakt nach Screenshot

## Seiteninhalt

Reihenfolge wie im Bild: 66 % Fortschritt, Überschrift „Persönliche Angaben“, dann Geburtsdatum, Geburtsort, Geburtsland, Staatsangehörigkeit, Checkbox „Ich habe weitere Staatsangehörigkeiten“, danach Speichern/Weiter/Zurück, TÜV-Block und Footer.

Der Info-Aufklapper „Warum benötigen wir diese Information?“ entfällt auf dieser Seite.

## Geburtsdatum

- Reines Textfeld mit Platzhalter „TT.MM.JJJJ“, keine Kalenderauswahl.
- Automatische Formatierung während der Eingabe: nach zwei Ziffern für Tag und nach zwei Ziffern für Monat wird der Punkt selbst gesetzt; nur Ziffern werden übernommen, maximal 10 Zeichen.
- Beim Hineinklicken erscheint darunter — im gleichen sanft ein- und ausblendenden Stil wie in Schritt 11 — der Hinweis: „Geburtsdatum: Hiermit können Sie sich jederzeit anmelden und Ihre Angebote einsehen. Ihre Angaben sollten mit Ihrem Ausweis übereinstimmen.“ Bislang erscheinen diese Hinweise über dem Feld; hier wird die Anzeige unterhalb des Feldes ergänzt.

## Geburtsort

Textfeld mit Platzhalter „z.B. Musterstadt“.

## Geburtsland und Staatsangehörigkeit

Beide Auswahllisten nutzen dieselbe vollständige Länderliste:

1. Die fünf häufigsten Einträge oben: Deutschland, Türkei, Polen, Italien, Rumänien.
2. Eine nicht anklickbare Trennzeile („––––––––“).
3. Danach alle weiteren Länder alphabetisch (vollständige Länderliste auf Deutsch, ca. 195 Einträge).

Bei „Staatsangehörigkeit“ heißen die Einträge weiterhin wie die Länder (wie im Screenshot „Deutschland“).

## Weitere Staatsangehörigkeit

Wird die Checkbox „Ich habe weitere Staatsangehörigkeiten“ aktiviert, erscheint darunter ein zusätzliches Auswahlfeld „Weitere Staatsangehörigkeit“ mit derselben Liste, jedoch ohne die bereits oben gewählte Staatsangehörigkeit. Beim Deaktivieren verschwindet das Feld und die Auswahl wird zurückgesetzt. Wechselt die Hauptstaatsangehörigkeit auf denselben Wert, wird die Zweitauswahl geleert.

## Technische Umsetzung

- Neue Datei `src/lib/countries.ts`: `TOP_COUNTRIES`, alphabetische Restliste, Konstante für den Trenner und eine Hilfsfunktion, die eine Liste ohne ein bestimmtes Land liefert.
- `SelectField` in `src/components/wizard/ui.tsx` erhält Unterstützung für einen deaktivierten Trenner-Eintrag (nicht auswählbar, grauer Strich) und behält das bestehende Hero-Styling.
- `TextField` erhält einen Prop für die Hinweis-Position (unter dem Feld) sowie optional `maxLength`/`inputMode`, damit der Geburtsdatum-Hinweis unterhalb erscheint.
- Datumsformatierung als kleine Hilfsfunktion in `schritt-12.tsx`.
- Store (`src/lib/wizard-store.tsx`): neues Feld `secondNationality`.
- `src/routes/antrag/schritt-12.tsx` entsprechend neu aufgebaut, `WhyInfo`-Import entfernt.
- Abschluss: Typecheck, Build und Browser-Durchlauf von Schritt 12 (Datumseingabe, Hinweis, Länderlisten, Zweitstaatsangehörigkeit).
