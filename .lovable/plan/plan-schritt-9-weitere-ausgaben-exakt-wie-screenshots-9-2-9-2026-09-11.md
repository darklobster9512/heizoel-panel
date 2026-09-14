# Plan: Schritt 9 (Weitere Ausgaben) exakt wie Screenshots 9-2 / 9.1

## Aktueller Zustand
`src/routes/antrag/schritt-9.tsx` weicht ab: Kicker + H1 „Haben Sie weitere regelmäßige Ausgaben?", kompakte Ja/Nein-Buttons neben dem Fragetext, abweichende Fragetexte, keine Zusatzfelder bei „Ja", `WhyInfo` steht unten.

## Änderungen

### `src/routes/antrag/schritt-9.tsx` (neu aufgebaut wie Screenshot)
1. **H1:** groß und fett „Weitere Ausgaben" (Kicker entfällt), Fortschritt bleibt 63 %.
2. **WhyInfo direkt unter der H1** mit Inhalt: „Mit den Informationen zu Ihren Ausgaben berechnen wir Ihr frei verfügbares Einkommen und ermitteln somit passende Kreditangebote."
3. **Vier Fragen**, jeweils Fragetext über einer zweispaltigen, vollflächigen Ja/Nein-Kachelreihe (wie Schritt 7, „Nein" vorausgewählt):
   - „Sind Sie privat krankenversichert? (ohne Zusatzversicherungen)"
   - „Zahlen Sie Ehegattenunterhalt?"
   - „Zahlen Sie Kinderunterhalt?"
   - „Besitzen Sie einen PKW?"
4. **Bedingte Zusatzfelder bei „Ja"** (Screenshot 9.1), direkt unter der jeweiligen Frage:
   - Privat krankenversichert = Ja → TextField „Private Krankenversicherung", Wert 0, Suffix „€/Monat", Hinweis: „Nennen Sie uns bitte den monatlichen Beitrag für Ihre private Krankenversicherung, den Sie als Arbeitnehmer selbst zahlen. Wichtig: Nicht gemeint sind hier private Zusatzversicherungen für gesetzlich Versicherte."
   - Ehegattenunterhalt = Ja → TextField „Ehegattenunterhalt (nach Scheidung)", 0, „€/Monat", Hinweis: „Falls Sie Unterhalt für frühere Partner/innen zahlen, geben Sie bitte die monatliche Gesamtsumme dieser Unterhaltsverpflichtungen an."
   - Kinderunterhalt = Ja → TextField „Zu zahlender Kindesunterhalt", 0, „€/Monat", Hinweis: „Falls gerichtlich festgelegt ist, dass Sie Unterhalt für Kinder zahlen müssen, geben Sie bitte die Gesamtsumme dieser monatlichen Unterhaltsverpflichtungen an."
   - PKW = Ja → kein Zusatzfeld (laut Screenshot 9.1).
5. Darunter unverändert: Zurück (Schritt 8) / Weiter (Schritt 10), TrustBlock.

### `src/lib/wizard-store.tsx`
Neue optionale Zahlenfelder ergänzen: `privateHealthAmount`, `alimonySpouseAmount`, `alimonyChildAmount` (bestehende Booleans `privateHealth`, `alimonySpouse`, `alimonyChild`, `ownsCar` bleiben; Standard der Booleans auf `false` setzen, damit „Nein" vorausgewählt ist).

## Verifikation
Build + Playwright: alle vier Fragen mit „Nein" vorausgewählt; bei „Ja" erscheinen die drei Betragsfelder mit exakten Labels/Hinweisen; Screenshot-Vergleich mit 9-2 und 9.1.
