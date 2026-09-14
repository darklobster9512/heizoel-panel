# Hinweistext in Wizard Schritt 3 anpassen

## Ziel
Den Info-Text in `/antrag/schritt-3` ersetzen, ohne Layout oder restliche Inhalte zu verändern.

## Änderung
In `src/routes/antrag/schritt-3.tsx` (Zeile 56) den `WhyInfo`-Text austauschen:

**Von:**
> Die Berufsgruppe gibt Banken Aufschluss über die Stabilität Ihres Einkommens. Angestellte und Beamte erhalten häufig besonders günstige Konditionen.

**Auf:**
> Wenn Sie einer bestimmten Berufsgruppe angehören, profitieren Sie von Sonderkonditionen wie niedrigen Zinssätzen, hohen Kreditsummen oder langen Laufzeiten.

## Nicht im Scope
- Keine Anpassung an Dropdown-Optionen, Fortschrittsbalken oder Navigation.
- Keine Style- oder Build-Änderungen.

## Validierung
- Typecheck durchführen (`bun run build` bzw. `tsgo`).
- Seite `/antrag/schritt-3` öffnen und den neuen Text prüfen.
