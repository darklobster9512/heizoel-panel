# Schritt 17: Reihenfolge korrigieren und Buttons schlanker machen

## Ziel
`src/routes/antrag/schritt-17.tsx` an die nun gewünschte Text-Reihenfolge anpassen und die Navigationsbuttons an den Screenshot angleichen.

## Inhaltliche Anpassung

Die neun Optionen in exakt dieser Reihenfolge darstellen:

1. Soziale Medien (z.B. Facebook) – Share2-Icon
2. TV-Werbung – Monitor-Icon
3. Außenwerbung (z.B. Plakate) – Image-Icon
4. Radio-Werbung – Radio-Icon
5. Youtube – Play-Icon
6. Empfohlen oder bekannte Marke – Users-Icon
7. Suchmaschine (z.B. Google) – Search-Icon
8. Banner-Werbung im Internet – Megaphone-Icon
9. KI-Suche (z.B. ChatGPT, Gemini, Claude) – Sparkles-Icon

## Visuelle Anpassung der Buttons

- Statt `NavButtons withSave` verwendet die Seite einen eigenen, schlankeren Button-Block, der nur hier gilt:
  - Höhe `42px` statt `46px`.
  - „Speichern“-Button schmaler (ca. `150px` Breite).
  - Obere Reihe: „Speichern“ links, „Weiter →“ rechts.
  - Untere Reihe: „← Zurück“ in voller Breite.
  - Gleiche Farben und Abrundung wie bisher (grüner Rahmen/Text, grüner Füllbutton, kantige Ecken).
- Alle anderen Schritte behalten ihre bestehende `NavButtons`-Darstellung.

## Validierung

- `bun run build` und Typecheck erfolgreich.
- Playwright öffnet `/antrag/schritt-17` bei Desktop- und Mobilgröße und prüft:
  - Reihenfolge der neun Optionen.
  - Sichtbarkeit von „Speichern“, „Weiter“ und „Zurück“.
  - Auswahl einer Option funktioniert und hebt den Radio-Button hervor.
