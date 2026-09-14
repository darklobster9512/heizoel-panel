# FAQ-Sektion minimal verbreitern

## Ziel
Die FAQ-Sektion wirkt aktuell etwas zu schmal. Sie soll nur minimal breiter werden, damit die Fragen und Antworten etwas mehr Raum haben, ohne dass die Sektion anfängt, sich über die volle Container-Breite zu ziehen.

## Änderung
- In `src/components/landing/sections.tsx` den Wrapper der `Faq()`-Sektion von `max-w-[800px]` auf `max-w-[920px]` ändern.
- Überschrift, Accordion, Button und Abstände bleiben unverändert.

## Prüfung
- Typecheck ausführen.
- Vorschau öffnen und prüfen, ob die FAQ-Box jetzt angenehmer breit wirkt und auf Mobilgeräten weiterhin korrekt läuft (Padding bleibt durch `px-5` erhalten).
