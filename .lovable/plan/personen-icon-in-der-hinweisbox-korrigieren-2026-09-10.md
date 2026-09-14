# Personen-Icon in der Hinweisbox korrigieren

Im Screenshot ist das Icon neben "Super! Mit einem zweiten Kreditnehmer …" ein schlichtes, dünnes Personen-Symbol in Grau – ohne grünen Kreis, ohne Füllung.

## Änderung

- In `src/components/wizard/ui.tsx` (NoteBox) den grünen Kreis-Hintergrund für `icon="user"` entfernen.
- Das Personen-Symbol als reine Linien-Grafik in Grau (#5b5b5b), Strichstärke dünn (ca. 1.5), Größe ca. 18 px, oben ausgerichtet darstellen.
- Sonst nichts ändern: grüner Balken links, weiße Box, Text und Abstände bleiben wie jetzt.

## Prüfung

Screenshot von Schritt 1 mit "2 Personen" erstellen und mit der Vorlage vergleichen.
