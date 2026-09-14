# Plan: Schritt 8 (Warmmiete) exakt wie Screenshot

## Aktueller Zustand
`src/routes/antrag/schritt-8.tsx` weicht ab: oben steht ein kleiner „Ausgaben"-Kicker plus H1 „Wie hoch ist Ihre monatliche Warmmiete?", das Label lautet „Monatliche Warmmiete", die Hinweistexte stimmen nicht, und das `WhyInfo` steht unter dem Feld.

## Änderungen an `src/routes/antrag/schritt-8.tsx`

1. **Überschrift:** Kicker entfernen. H1 lautet groß und fett „Ausgaben" (wie Screenshot).
2. **Info-Accordion direkt unter der H1** („Warum benötigen wir diese Information?") mit dem exakten Inhalt:
   „Mit den Informationen zu Ihren Ausgaben berechnen wir Ihr frei verfügbares Einkommen und ermitteln somit passende Kreditangebote."
3. **Feld:** Label exakt „Warmmiete", Platzhalter „z.B. 750", Suffix „€/Monat". Hinweis unter dem Feld:
   „Hinweis für Mieter: Bitte geben Sie als Warmmiete den Betrag ein, den Sie monatlich an Ihren Vermieter überweisen. Hinweis, wenn Sie mietfrei oder bei den Eltern wohnen: Bitte geben Sie die Höhe der ggf. monatlich von Ihnen zu zahlenden Kosten ein."
   (Wert-Logik `data.warmRent` bleibt.)
4. **Darunter:** unverändert Zurück/Weiter-Buttons (zurück zu Schritt 7, weiter zu Schritt 9) und TrustBlock.
5. Fortschrittsbalken bleibt bei 59 % (passt zum Screenshot).

## Verifikation
Build + Playwright-Check auf `/antrag/schritt-8`: H1, Accordion-Text (aufgeklappt), Label, Platzhalter und Hinweis wie im Screenshot.
