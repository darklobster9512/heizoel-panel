# Plan: Schritt 6 exakt an den Screenshot angleichen

## Ziel
Wizard-Schritt 6 (`/antrag/schritt-6`) sieht 1:1 aus wie der gelieferte Screenshot.

## Änderungen in `src/routes/antrag/schritt-6.tsx`

1. **Überschrift:** Statt der kleinen Zeile „Einkommen" plus H1 „Wie hoch ist Ihr monatliches Nettoeinkommen?" nur eine fette H1: **„Einkommen"** (ca. 22px, #323232).
2. **Erste Info-Box (direkt unter der Überschrift):** Aufklapp-Element „Warum benötigen wir diese Information?" mit dem Text:
   > Damit Sie einen Kredit erhalten, müssen Sie über ein regelmäßiges und bestenfalls gleich bleibendes Einkommen verfügen.
3. **Label:** „Nettoeinkommen" (statt „Monatliches Nettoeinkommen").
4. **Zweite Info-Box (unter dem Label, über dem Eingabefeld):** Aufklapp-Element „Warum benötigen wir diese Information?" mit dem Text:
   > Das monatliche Einkommen wird für Ihre Haushaltsrechnung benötigt. Diese wird von den Banken durchgeführt, um Ihr Kreditangebot zu ermitteln.
5. **Eingabefeld:** Platzhalter „z.B. 2.270", Suffix „€/Monat" – bleibt wie bisher, aber ohne den bisherigen Hinweistext unter dem Feld.
6. **Rest bleibt unverändert:** Fortschrittsbalken 41 %, Zurück-/Weiter-Buttons (Schritt 5 ↔ 7), Trust-Block und Footer.

## Technisch
- Nur `src/routes/antrag/schritt-6.tsx` wird bearbeitet; das vorhandene `WhyInfo`- und `TextField`-Bauelement aus `src/components/wizard/ui.tsx` wird wiederverwendet.
- Danach kurzer visueller Check der Seite gegen den Screenshot.
