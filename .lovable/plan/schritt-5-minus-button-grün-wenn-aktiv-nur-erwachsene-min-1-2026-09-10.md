# Schritt 5: Minus-Button grün wenn aktiv, nur Erwachsene min. 1

## Ziel
In Schritt 5 sollen alle Zähler herunter- statt nur hinaufgestellt werden können, der Minus-Button aber nur grün sein, wenn er tatsächlich klickbar ist.

## Ist-Zustand (geprüft)
- `CounterField` hat `min = 0`, abgedeckt im `schritt-5.tsx` für Erwachsene bereits `min={1}`.
- Der Minus-Button ist immer grau (`bg-[#f0f0f0]`), auch wenn er aktiv ist; nur bei `disabled` wird er heller/transparent.
- Kinder und kindergeldberechtigte Kinder können bereits auf 0 heruntergestellt werden.

## Soll-Zustand
- Erwachsene: Minimum bleibt 1.
- Kinder und kindergeldberechtigte Kinder: Minimum bleibt 0.
- Minus-Button:
  - Wenn `value > min`: grüne Brand-Farbe (`bg-brand`, weißes Icon, Hover `bg-brand-hover`).
  - Wenn `value <= min`: grau deaktiviert wie bisher.

## Umsetzung
- `src/components/wizard/ui.tsx`: `CounterField`-Minus-Button dynamisch stylen (deaktiviert grau, aktiv grün).
- `src/routes/antrag/schritt-5.tsx`: Keine Änderung nötig, da die min-Werte bereits passen.
- Abschluss: Build und visuelle Gegenprüfung bei 1 Erwachsenem, 0 Kindern und 1 Kindergeld-Kind.
