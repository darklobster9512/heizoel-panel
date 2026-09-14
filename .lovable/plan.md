# Email-Logo-Balken in Deutschlandfarben

## Ziel
Der grüne vertikale Balken vor dem Shop-Namen im Email-Template-Fallback-Logo soll die deutschen Nationalfarben zeigen: oben schwarz, mittig rot, unten gelb/gold — jeweils etwa ein Drittel der Höhe.

## Was geändert wird
- In `src/lib/email-templates/order-confirmation.ts` wird die Funktion `logoBlock()` angepasst.
- Der bisher einfache grüne Balken (`background:${GREEN}`) wird durch einen vertikalen Dreifarben-Balken ersetzt.
- Die Gesamtgröße (Breite/Höhe) und der Abstand zum Text bleiben gleich.
- Es betrifft nur den Fallback, wenn kein Logo-Upload vorhanden ist — hochgeladene Logos werden nicht verändert.

## Technische Details
- Drei gestapelte Segmente (Tabelle/Zeilen oder `div`) mit Inline-Styles.
- Farben: Schwarz `#000000`, Rot `#DC2626` (oder ähnlich kräftiges Rot), Gelb/Gold `#F59E0B` (bereits definiertes Gold) bzw. `#FFCE00`.
- Segmenthöhen aufteilen, sodass die Summe weiterhin 58 px (groß) bzw. 48 px (klein) ergibt.
- Abgerundete Ecken (`border-radius`) erhalten, sofern email-kompatibel.
- Keine Änderung an Text, Bewertung, Kopfzeile oder sonstigen Email-Inhalten.
- Abschließend: Typecheck und Build-Log prüfen.
