# Plan: Footer hinter der Detail-Sidebar auf /angebote

## Ziel
Wenn die Angebots-Detailansicht (rechte Spalte mit TARGOBANK-Infos) geöffnet ist, soll der Footer ganz normal unten am Seitenende über die volle Breite laufen – aber die Detail-Spalte liegt optisch **über** dem Footer (höhere Ebene), sodass sie beim Scrollen bis ganz unten reicht und der Footer hinter ihr „verschwindet".

## Aktueller Stand
- Die Seite nutzt ein CSS-Grid: links Angebotsbereich, rechts die 475px breite Detail-Spalte (`md:sticky md:top-[152px]`, Höhe `calc(100vh-152px)`).
- Der `WizardFooter` liegt **nach** dem Grid im normalen Fluss und beginnt daher erst unterhalb des Inhalts – er geht nicht unter die Detail-Spalte.

## Umsetzung (nur `src/routes/angebote.tsx`)
1. **Detail-Spalte fixieren statt sticky:** Wenn geöffnet, wird die rechte Spalte auf Desktop zu einem fixierten Panel: `md:fixed md:right-0 md:top-[152px] md:bottom-0 md:w-[475px]`, mit eigener Scrollbarkeit (`overflow-y-auto`) und höherer Ebene (`z-30`). Mobil bleibt alles wie bisher (Panel unterhalb der Card im Fluss).
2. **Footer bleibt im normalen Fluss** am Seitenende über volle Breite – keine Positionsänderung, keine Verschiebung. Er hat die Standard-Ebene (kein z-index), liegt also automatisch **hinter** dem fixierten Panel.
3. **Linken Inhalt ausgleichen:** Damit die Angebots-Card nicht unter das fixierte Panel rutscht, bekommt der linke Bereich bei geöffnetem Panel auf Desktop ein `md:pr-[475px]` (oder das Grid behält die Spalten-Reservierung wie aktuell).
4. Filterleiste/Header bleiben unverändert; Schließen per X/Escape funktioniert weiterhin.

## Ergebnis
- Footer steht wie gewohnt unten am Seitenrand.
- Die rechte Detail-Spalte reicht bis zum unteren Bildschirmrand und überdeckt den Footer auf ihrer Breite.
- Kein Overlay über der Angebots-Card, keine Änderung am mobilen Verhalten.

## Verifikation
Playwright: Seite öffnen, Card klicken, ans Seitenende scrollen, Screenshot prüfen (Footer läuft hinter der Sidebar durch), kein horizontaler Overflow, mobil (393px) unverändert.
