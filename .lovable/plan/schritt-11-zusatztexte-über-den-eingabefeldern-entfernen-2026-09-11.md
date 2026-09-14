# Schritt 11: Zusatztexte über den Eingabefeldern entfernen

Auf `/antrag/schritt-11` stehen aktuell Hinweis-Absätze über den Eingabefeldern, die so nicht auf dem Screenshot sind. Sie werden entfernt.

## Änderungen

- **Vorname(n):** Hinweis „Wichtig: Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt." über dem Feld wird entfernt.
- **Nachname:** derselbe Hinweis wird entfernt.
- **Mobilfunknummer:** Hinweis „Die Telefonnummer wird für eventuelle Rückfragen benötigt." wird entfernt.
- **E-Mail:** langer Hinweisabsatz über dem Feld wird entfernt.
- Es bleiben nur Label + Eingabefeld (mit Platzhalter) pro Feld, im Abstand wie auf dem Screenshot.
- Anrede (Herr/Frau), Rechtstexte, Marketing-Checkbox und Widerspruchshinweis bleiben unverändert.

## Datei

- `src/routes/antrag/schritt-11.tsx`

## Validierung

- Typecheck und visueller Playwright-Screenshot von `/antrag/schritt-11`.
