# Plan: Doppeltes Info-Element in Schritt 6 korrigieren

## Ziel
In `/antrag/schritt-6` wird das redundante, zweite „Warum benötigen wir diese Information?“-Element entfernt.

## Änderungen in `src/routes/antrag/schritt-6.tsx`

Entferne die zweite `WhyInfo`-Komponente, die direkt unter dem Label „Nettoeinkommen“ steht:

```tsx
<WhyInfo text="Das monatliche Einkommen wird für Ihre Haushaltsrechnung benötigt. Diese wird von den Banken durchgeführt, um Ihr Kreditangebot zu ermitteln." />
```

## Ergebnis
- Überschrift: „Einkommen“
- Info-Accordion unter der Überschrift bleibt erhalten.
- Label: „Nettoeinkommen“
- Eingabefeld mit Platzhalter „z.B. 2.270“ und Suffix „€/Monat“ folgt direkt unter dem Label.
- Kein zweites Info-Accordion mehr.

## Validierung
Nach der Bearbeitung kurzer Build-Check und visuelle Prüfung auf `/antrag/schritt-6`.
