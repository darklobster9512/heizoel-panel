# Schritt 13: Hausnummer koppelt an Straße-Hinweis + mehr Länder

## 1. Hausnummer wandert beim Straße-Hinweis mit

Aktuell: Klickt man ins Straße-Feld, erscheint der Hinweistext zwischen Label und Eingabefeld — nur das Straße-Feld rutscht nach unten, Hausnummer bleibt oben und die beiden Eingabefelder stehen nicht mehr auf einer Linie.

Ziel: „Straße"-Titel bleibt stehen; der Hinweis schiebt das Straße-Eingabefeld nach unten, und das Hausnummer-Feld (Titel + Eingabefeld gemeinsam) rutscht synchron mit, sodass beide Eingabefelder wieder bündig nebeneinander stehen.

Umsetzung in `src/routes/antrag/schritt-13.tsx`:
- Das Grid der Straße/Hausnummer-Zeile bekommt `items-start` bzw. die Hausnummer-Spalte `self-end` (unteres Ausrichten): Wächst die Straße-Zelle durch den Hinweis, wird die komplette Hausnummer-Einheit (Label + Eingabefeld) an der Unterkante der Zeile ausgerichtet und wandert mit nach unten.
- Keine Änderung an `TextField` nötig — der Hinweis bleibt zwischen Label und Feld der Straße-Zelle; der weiche Ein-/Ausblend-Effekt bleibt erhalten.

## 2. Land-Dropdown: vollständige Länderliste

Die bisherigen 3 Optionen (Deutschland, Österreich, Schweiz) werden ersetzt durch, in dieser Reihenfolge:

Belgien, Deutschland, Dänemark, Frankreich, Luxemburg, Niederlande, Österreich, Polen, Schweiz, Tschechische Republik, Anderes Land

Standardauswahl bleibt „Deutschland".

## Verifikation
Build + Browser-Check: Fokus aufs Straße-Feld → Hinweis blendet ein, Hausnummer wandert mit, beide Felder bleiben bündig; Land-Dropdown zeigt alle 11 Optionen.
