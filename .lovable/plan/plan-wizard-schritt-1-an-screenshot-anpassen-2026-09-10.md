# Plan: Wizard Schritt 1 an Screenshot anpassen

## Ziel
Schritt 1 des Kreditantrags-Wizards (`/antrag/schritt-1`) soll exakt dem hochgeladenen Screenshot entsprechen.

## Änderungen

### 1. Kreditnehmer-Auswahl als Radio-Buttons statt Icons
- In `src/routes/antrag/schritt-1.tsx` die `User`/`Users` Icons entfernen.
- Stattdessen die vorhandene `ChoiceTiles`-Komponente aus `src/components/wizard/ui.tsx` verwenden.
- Optionen: `[{ value: 1, label: "1 Person" }, { value: 2, label: "2 Personen" }]`.
- Ausgewählter Zustand weiterhin in `data.borrowers` speichern.

### 2. Titel "Anzahl Kreditnehmer" vergrößern
- Schriftgröße von `text-[15px]` auf `text-[17px]` oder `text-[18px]` erhöhen.
- Gewichtung beibehalten (`font-semibold`) und Farbe `#323232`.

### 3. Einleitungstext korrigieren
- Aktueller Text wird ersetzt durch:
  "Um die besten Kreditangebote für Sie zu ermitteln, benötigt smava einige Informationen zu Ihrer Person und Ihrer finanziellen Situation."
- Farbe und Zeilenhöhe beibehalten (`text-[14px] leading-[1.6] text-[#5b5b5b]`).

### 4. Wizard-Header reduzieren und Logo vergrößern
- In `src/routes/antrag/route.tsx` den rechten Header-Block mit "100 % kostenlos & SCHUFA-neutral" und Telefonnummer "0800 000 98 00" entfernen.
- Das `Logo` links vergrößern, z.B. von `h-5` auf `h-7` oder `h-8`.
- Header bleibt sticky mit bestehendem `shadow-header-strong`.

## Technische Details
- Betroffene Dateien:
  - `src/routes/antrag/schritt-1.tsx`
  - `src/routes/antrag/route.tsx`
- Keine neue Abhängigkeit nötig.
- Nach der Umsetzung: Typecheck, Build und visueller Screenshot-Vergleich für `/antrag/schritt-1`.
