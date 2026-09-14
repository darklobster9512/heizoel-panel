# Bewertungsbereich exakt an die Vorlage angleichen

Vergleich der aktuellen Darstellung mit dem Referenzbild zeigt vier sichtbare Abweichungen. Nur dieser Abschnitt wird angefasst.

## Was geändert wird

1. **Scrollleiste unter den Karten**
   Die Vorlage zeigt unter den Karten eine durchgehende graue Leiste mit dunklem Griff und je einem kleinen Pfeil-Kästchen links und rechts. Aktuell ist dort nichts sichtbar. Es kommt eine eigene, immer sichtbare Leiste in dieser Optik, die die Position mitläuft und per Ziehen bedienbar ist.

2. **Emojis werden nicht angezeigt**
   In zwei Bewertungen erscheinen statt Daumen-hoch und Kleeblatt leere Kästchen. Eine Emoji-Schrift wird eingebunden, damit sie farbig dargestellt werden.

3. **Überschrift**
   Die Vorlage nutzt die normale, etwas breiter laufende Schrift, nicht die schmale Display-Schrift. Größe und Zeilenabstand werden angepasst.

4. **Kartenoptik und Text**
   Karten ohne Schatten, mit feiner heller Kante wie in der Vorlage; Textfarbe leicht ins Blaugrau, Zeilenhöhe und Innenabstände auf die Vorlagenmaße; Pfeile links und rechts etwas weiter außen und in gleicher Größe.

## Technische Details

- `src/components/landing/customer-voices.tsx`: eigene Scrollbar-Komponente (Track + Thumb + zwei Pfeil-Buttons) unter der Liste, gesteuert über `scrollLeft`/`scrollWidth` des Tracks mit `onScroll`-Listener und Pointer-Drag; Karten-Klassen auf Border statt Shadow; Anführungszeichen, Textgrößen und `min-h` nachjustieren.
- `src/styles.css`: `.voices-track` auf `scrollbar-width: none` umstellen (native Leiste aus, eigene übernimmt) und eine Emoji-Fallback-Schriftfamilie für den Bewertungstext ergänzen.
- `src/routes/__root.tsx`: `<link>` auf Noto Color Emoji hinzufügen.
- Prüfung: Typecheck plus Screenshot-Vergleich Desktop und Mobil gegen die Vorlage.
