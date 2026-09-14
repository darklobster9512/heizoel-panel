# Schritt 7: Nebentätigkeit-Details verfeinern

Drei Anpassungen am Nebentätigkeits-Block von Schritt 7 (nur Datei `src/routes/antrag/schritt-7.tsx`):

## 1. Dropdown-Optionen „Art der Nebenbeschäftigung" ersetzen

Die bisherigen sechs Platzhalter-Optionen werden durch die exakte Referenz-Liste ersetzt:

- Angestellten- / Arbeitertätigkeit
- Selbst. Freiberufler/in
- Selbst. Gewerbetreibende/r
- Selbst. Geschäftsführer/in
- Sonstiges

## 2. Belegbarkeit steuert Sichtbarkeit der Detailfelder

Bei der Frage „Sind die Einnahmen aus der Nebentätigkeit belegbar?":

- **Nein (oder noch nicht beantwortet):** Die folgenden Felder bleiben ausgeblendet:
  - Um welche Art von Nebenbeschäftigung handelt es sich? (Dropdown)
  - Seit wann üben Sie die Nebentätigkeit aus? (MM.JJJJ)
  - Ist Ihre Nebenbeschäftigung befristet? inkl. „Befristet bis"
  - Probezeit-Frage
- **Ja:** Alle Detailfelder erscheinen wie bisher (inkl. bedingtem „Befristet bis" bei Befristung = Ja).

Das Nettoeinkommen-Feld und die Belegbar-Frage bleiben immer sichtbar.

## 3. Zähler „Anzahl beruflicher Nebentätigkeiten"

Die Anzeige weiterer Blöcke („Ihre Nebentätigkeit 2", „3" usw. mit denselben Feldern) ist bereits implementiert und bleibt bestehen. Sie wird mit einem Browser-Test verifiziert: Zähler auf 2 stellen → Block „Ihre Nebentätigkeit 2" mit allen Feldern erscheint; beide Blöcke speichern ihre Werte unabhängig.

## Technik

- Änderung nur in `src/routes/antrag/schritt-7.tsx`: `sideJobKinds`-Liste ersetzen, die Detailfelder in `job.provable ? (...) : null` wrappen (Standard: `false` → versteckt).
- Danach Build + Playwright-Check auf `/antrag/schritt-7`: Ja bei Nebentätigkeiten → Belegbar „Nein" zeigt nur Einkommensfeld; „Ja" zeigt alle Detailfelder; Zähler 2 rendert zweiten Block.
