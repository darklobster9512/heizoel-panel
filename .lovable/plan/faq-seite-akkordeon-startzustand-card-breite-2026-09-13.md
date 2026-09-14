# FAQ-Seite: Akkordeon-Startzustand & Card-Breite

## Ziel
Die FAQ-Seite `/faq` soll sich näher an das gewünschte Verhalten anpassen: alle Fragen sind initial zugeklappt und die FAQ-Cards nutzen die volle verfügbare Breite.

## Änderungen an `src/routes/faq.tsx`

1. **Alle FAQs initial geschlossen**
   - Den Prop `defaultValue={[`${section.id}-0`]}` am `<Accordion type="multiple">` entfernen.
   - Damit öffnet der Nutzer jede Frage selbst.

2. **FAQ-Cards auf volle Breite**
   - Den inneren Container der FAQ-Blöcke (aktuell `max-w-4xl`) auf `max-w-6xl` anheben, damit die Cards die gleiche Breite wie Kopf- und Schnellnavigationsbereich nutzen.
   - Optional: Padding/Spacing prüfen, damit die Cards auf breiten Viewports nicht zu weit auseinanderlaufen.

## Nicht im Scope
- Keine Änderungen an Inhalten, Icons oder dem Footer.
- Keine neuen Seiten oder Navigationseinträge.
