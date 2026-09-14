# Detail-Sidebar beim Klick auf „zum Antrag“

Beim Klick auf „zum Antrag“ (im Angebot oder auf den Pfeil rechts) öffnet sich künftig eine Seitenleiste von rechts mit den Antragsinfos – statt direkt weiterzuleiten.

## Aufbau der Sidebar (wie im Screenshot)

Kopfbereich:
- Schließen-Kreuz links
- Bank-Logo (TARGOBANK) mittig
- grüner Button „zum Antrag“ rechts

Zwei Reiter:
- „Kreditinformationen“ (aktiv, weiß)
- „Finanzierungskosten“ (grau)

Inhalt Reiter „Kreditinformationen“:
- „**Auszahlung** in 5 Tagen“
- „Nur 2 Dokumente benötigt“: Kontoauszug, Gehaltsabrechnung (mit Icons)
- „Sie können online“: Dokumente hochladen, Legitimation durchführen und unterschreiben (grüne Haken)
- „Ihre Sonderkonditionen“: Kostenlose Sondertilgung (Haken), Kostenlose Gesamttilgung (rotes X, ausgegraut), Ratenpause (Haken)
- „Online-Kredit von“ mit Anschrift der Bank

Inhalt Reiter „Finanzierungskosten“:
- Übersicht mit Kreditbetrag, Laufzeit, effektivem Jahreszins, monatlicher Rate, Gesamtbetrag und Zinskosten – berechnet aus den aktuell oben eingestellten Werten.

Fußbereich:
- durchgehender grüner Button „zum Antrag“, der wie bisher zur Abschlussseite `/antrag/fertig` führt.

## Verhalten

- Panel fährt von rechts ein (ca. 480 px breit, auf dem Handy nahezu volle Breite), Inhalt scrollbar.
- Schließen über das Kreuz, Klick auf den abgedunkelten Hintergrund oder die Esc-Taste.
- Beträge/Laufzeit in der Sidebar folgen den oben eingestellten Werten.

## Technische Hinweise

- Umsetzung in `src/routes/angebote.tsx` als neue Komponente `OfferDetailsPanel`, gesteuert über einen lokalen `open`-State; der bisherige `navigate`-Aufruf des Karten-Buttons öffnet stattdessen das Panel.
- Rein visuelle/Frontend-Änderung, keine Datenbank- oder Speicherlogik betroffen.
- Bank-Adresse und Konditionen sind Mockup-Daten für TARGOBANK.
