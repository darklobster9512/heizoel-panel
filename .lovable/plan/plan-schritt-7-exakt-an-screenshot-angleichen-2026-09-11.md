# Plan: Schritt 7 exakt an Screenshot angleichen

## Ziel
`/antrag/schritt-7` sieht 1:1 wie der gelieferte Screenshot aus.

## Änderungen in `src/routes/antrag/schritt-7.tsx`

1. **Überschrift:** Nur eine fette H1 **„Weitere Einkommen"** (ca. 22 px, #323232). Die kleine obere Zeile „Weitere Einkommen" und die H1 „Haben Sie weitere Einkünfte?" entfallen.
2. **Info-Accordion:** Direkt unter der Überschrift das Aufklapp-Element **„Warum benötigen wir diese Information?"** mit dem Text:
   > Beziehen Sie außerdem sonstige regelmäßige Einkünfte, z.B. aus Vermietung, Unterhalt oder Rente? Diese werden Ihrem Haufteinkommen hinzugerechnet und können sich positiv auf Ihre Kreditkonditionen auswirken.
3. **Fragen mit Ja/Nein-Auswahl:** Vier Fragen untereinander, jede als Label gefolgt von zwei nebeneinanderliegenden Kacheln „Ja" / „Nein". Verwendet wird das vorhandene `ChoiceTiles`-Bauelement aus `src/components/wizard/ui.tsx`.
   - Gab es bei Ihrem Einkommen monatliche Abweichungen von mehr als 100 € in den letzten 3 Monaten?
   - Haben Sie berufliche Nebentätigkeiten?
   - Sonstige Einkünfte?
   - Besitzen Sie Wohneigentum, das Sie vermieten?
4. **State-Keys beibehalten:** `incomeVariation`, `sideJob`, `otherIncome`, `rentedProperty` bleiben bestehen; Standardwert für alle ist `false` (entspricht Screenshot „Nein" vorausgewählt).
5. **Layout:** Ausreichender Abstand zwischen den Fragen, Fortschrittsbalken 45 %, Navigationsbuttons (Zurück → Schritt 6, Weiter → Schritt 8), Trust-Block und Footer bleiben unverändert.

## Technisch
- Nur `src/routes/antrag/schritt-7.tsx` wird bearbeitet.
- Die bisherige `YesNo`-Hilfskomponente entfällt und wird durch `ChoiceTiles` ersetzt.
- Danach visueller Check der Seite gegen den Screenshot.
