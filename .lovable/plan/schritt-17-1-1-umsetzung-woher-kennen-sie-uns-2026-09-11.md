# Schritt 17: 1:1-Umsetzung „Woher kennen Sie uns?“

## Ziel
`src/routes/antrag/schritt-17.tsx` exakt an den hochgeladenen Screenshot anpassen.

## Inhaltliche Anpassungen

- Überschrift: **„Woher kennen Sie uns?“** (bleibt)
- Untertitel: **„Wie sind Sie auf smava aufmerksam geworden?“**
- Hinweis darüber/parallel: **„Optional“** (klein, grau)
- Kein `NoteBox`-Hinweis mehr.

## Optionen in exakter Reihenfolge (links Radio, rechts Icon)

1. Empfohlen oder bekannte Marke (Users-Icon)
2. Banner-Werbung im Internet (Megaphone-Icon)
3. Soziale Medien (z.B. Facebook) (Share2-Icon)
4. Suchmaschine (z.B. Google) (Search-Icon)
5. KI-Suche (z.B. ChatGPT, Gemini, Claude) (Sparkles-Icon)
6. Radio-Werbung (Radio-Icon)
7. Außenwerbung (z.B. Plakate) (Image-Icon)
8. TV-Werbung (Monitor-Icon)
9. Youtube (Play-Icon)

## Visuelle Details

- Jede Option als Zeile mit Höhe ~52 px, kantige Ecken.
- Links ein leerer Radio-Kreis; bei Auswahl grüner Rand mit gefülltem Punkt.
- Rechts grünes Icon (nur Kontur, keine Füllung).
- Ausgewählter Zustand: grüner Rahmen, leichter grüner Hintergrund (#eff8f1).
- Unausgewählt: weißer Hintergrund, grauer Rahmen, Icon weiterhin grün.

## Navigation

- `NavButtons` mit `withSave` verwenden, damit die Reihenfolge exakt wie im Screenshot ist:
  - Oben links: **Speichern** (grüner Umriss, Save-Icon)
  - Oben rechts: **Weiter →** (grüner Füllbutton)
  - Darunter: **← Zurück** (grüner Umriss, volle Breite)
- Kein Fortschrittsbalken auf dieser Seite.
- `TrustBlock` bleibt unter den Buttons.

## Technische Schritte

1. Importe anpassen: `Megaphone`, `Share2`, `Sparkles`, `Image`, `Monitor`, `Play`, `Users`, `Search`, `Radio` aus `lucide-react`.
2. `SOURCES`-Array durch neue 9 Einträge ersetzen.
3. `NoteBox` entfernen, Untertitel + „Optional“ ergänzen.
4. Button-Row-Template mit Radio-Kreis und Icon anpassen.
5. `<NavButtons withSave backTo="/antrag/schritt-16" nextTo="/antrag/fertig" nextLabel="Weiter" />` setzen.
6. Speicherfeld `referralSource` im Store bleibt unverändert, da es bereits ein optionaler String ist.

## Validierung

- Build (`bun run build`) und Typecheck erfolgreich.
- Playwright öffnet `/antrag/schritt-17` und prüft Reihenfolge/Texte der Optionen, Radio-Styling und die drei Navigationsbuttons.
