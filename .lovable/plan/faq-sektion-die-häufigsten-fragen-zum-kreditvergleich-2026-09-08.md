# FAQ-Sektion "Die häufigsten Fragen zum Kreditvergleich"

Neue Sektion direkt unter "Mit smava zu passenden Kreditangeboten", 1:1 an den Referenzbildern.

## Aufbau

- Weiße Fläche, großzügiger Abstand oben/unten, Inhalt auf gleicher Breite wie die anderen Sektionen, linksbündig.
- Überschrift oben links: **Die häufigsten Fragen zum Kreditvergleich** (dunkelgrau, fett, ca. 27 px).
- Darunter eine Liste aus 9 aufklappbaren Fragen, getrennt durch feine graue Linien:
  1. Was ist smava?
  2. Wie funktioniert smava?
  3. Ist smava eine Bank?
  4. Kostet der Kreditvergleich bei smava etwas?
  5. Welchen Vorteil habe ich durch smava?
  6. Was bedeutet die "Günstiger-Geht-Nicht-Garantie"?
  7. Bietet smava eine persönliche Beratung an?
  8. Ist smava seriös und sicher?
  9. Beeinflusst eine Kreditanfrage über smava meine SCHUFA?
- Fragen in Grün, normal (nicht fett), rechts ein grüner Pfeil, der beim Öffnen nach oben zeigt.
- Antworttexte exakt wie geliefert, dunkelgrau, gut lesbarer Zeilenabstand.
- Standardmäßig sind alle Fragen zu; es lassen sich – wie im zweiten Referenzbild – mehrere gleichzeitig öffnen.
- Unten mittig ein grüner Button **Zum Hilfe Center** mit weißem Text und leichtem Schatten.
- Auf dem Handy volle Breite, gleiche Reihenfolge, kleinere Schrift.

## Technische Details

- `FAQS` in `src/components/landing/sections.tsx` durch die 9 neuen Frage/Antwort-Paare ersetzen; `Faq()` neu aufbauen (Accordion `type="multiple"`, eigene Trigger-/Content-Styles statt `SectionHead`-Zweispalter).
- In `src/routes/index.tsx` `<Faq />` von der aktuellen Position nach `<MatchingOffers />` verschieben.
- Button-Ziel vorerst `#rechner` (Platzhalter, bis es eine Hilfe-Center-Seite gibt).
- Prüfung mit Typecheck und Preview-Screenshot (zu und geöffnet, Desktop + Handy).
