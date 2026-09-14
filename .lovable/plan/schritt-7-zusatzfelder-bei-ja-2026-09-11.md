# Schritt 7: Zusatzfelder bei „Ja“

Schritt 7 zeigt aktuell nur die vier Ja/Nein-Fragen. Laut Screenshots klappen bei „Ja“ jeweils weitere Felder auf. Diese werden 1:1 ergänzt.

## Frage 1 – Abweichungen über 100 €
Keine Zusatzfelder (nur die Auswahl).

## Frage 2 – „Haben Sie berufliche Nebentätigkeiten?“ = Ja
- Grüner Hinweis mit Trend-Pfeil-Symbol: „Mit beruflichen Nebentätigkeiten können Sie mehr Angebote von den Banken erhalten.“
- Zähler „Anzahl beruflicher Nebentätigkeiten“, Start 1, Minimum 1.
- Pro Nebentätigkeit ein Block „Ihre Nebentätigkeit 1“ (2, 3 …) mit:
  - „Nettoeinkommen aus Nebentätigkeit“ – Hinweistext „Bitte geben Sie das niedrigste Netto-Monatseinkommen der letzten 6 Monate aus Ihrer Nebentätigkeit an.“, Platzhalter „z.B. 450“, Zusatz „€/Monat“
  - „Sind die Einnahmen aus der Nebentätigkeit belegbar?“ – Ja/Nein
  - Auswahlliste „Um welche Art von Nebenbeschäftigung handelt es sich?“ (Platzhalter = gleicher Text)
  - „Seit wann üben Sie die Nebentätigkeit aus?“ – Feld mit Platzhalter „MM.JJJJ“
  - „Ist Ihre Nebenbeschäftigung befristet?“ – Ja/Nein; bei Ja zusätzlich „Befristet bis“ mit „MM.JJJJ“
  - „Befinden Sie sich bei Ihrer Nebenbeschäftigung in der Probezeit?“ – Ja/Nein

## Frage 3 – „Sonstige Einkünfte?“ = Ja
- Grüner Hinweis: „Mit weiteren Einkommen können Sie mehr Angebote von den Banken erhalten.“
- „Ehegattenunterhalt“ – Hinweistext über dem Feld, Wert 0, „€/Monat“
- „Rente (netto)“ – Hinweistext über dem Feld, Wert 0, „€/Monat“
- „Eingehender Kindesunterhalt“ – Wert 0, „€/Monat“, Hinweistext unter dem Feld

## Frage 4 – „Besitzen Sie Wohneigentum, das Sie vermieten?“ = Ja
- Grüner Hinweis mit Haus-Symbol: „Vermietete Immobilien bedeuten mehr Einkommen – das wiederum bedeutet bessere Angebote.“
- „Welche Art von Immobilie vermieten Sie?“ – vier Kacheln in 2 Spalten: Eigentumswohnung, Einfamilienhaus, Mehrfamilienhaus, Büro-/Geschäftsgebäude
- „Fläche vermietete Immobilie“ – Platzhalter „z.B. 82“, Zusatz „qm“
- „Einnahmen durch Vermietung (Warmmiete)“ – Hinweistext, Platzhalter „z. B. 1.000“, Zusatz „€/Monat“

Fortschritt (45 %), Navigation, Vertrauensblock und Footer bleiben unverändert.

## Technische Hinweise
- Neue Felder in `src/lib/wizard-store.tsx`: `sideJobCount`, `sideJobs` (Array mit Einkommen, belegbar, Art, seit, befristet, befristet bis, Probezeit), `alimonySpouseAmount`, `pensionAmount`, `childSupportAmount`, `rentedPropertyType`, `rentedPropertyArea`, `rentalIncome`.
- `NoteBox` in `src/components/wizard/ui.tsx` um die Symbole „trend“ (Aufwärtspfeil) und „home“ (Haus) erweitern.
- `TextField` unterstützt bereits Platzhalter, Zusatz und Hinweis unter dem Feld; für Hinweise oberhalb des Feldes wird ein einfacher Absatz genutzt.
- Die Liste der Nebenbeschäftigungsarten ist im Screenshot nicht aufgeklappt. Es werden gängige Werte gesetzt (z. B. Minijob/geringfügige Beschäftigung, Selbstständige Nebentätigkeit, Freiberufliche Tätigkeit, Zweite Anstellung, Saison-/Aushilfstätigkeit, Sonstiges) – auf Zuruf tausche ich sie gegen die echten Optionen.
