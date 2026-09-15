# Plan: Logo-Text im E-Mail-Header "ONLINE" dünner darstellen

## Ziel
Im Fallback-Logo der E-Mail-Templates (Bestellbestätigung und Rechnung) soll der Wortteil „Online“ im Shopnamen visuell abgesetzt und dünner erscheinen als der Rest des Logos.

## Betroffene Datei
- `src/lib/email-templates/email-shared.ts` (enthält die gemeinsame `logoBlock`-Hilfe, die von beiden Templates genutzt wird)

## Durchführung
1. In `logoBlock` prüfen, ob der Shopname (case-insensitive) den Wortteil „Online“ enthält.
2. Falls ja, den Text in Präfix und „Online“ aufteilen und „Online“ in einem `<span>` mit niedrigerer Schriftstärke (`font-weight:300`) rendern.
3. Falls nein, den Shopnamen wie bisher komplett fett rendern.
4. Hochgeladene Logobilder bleiben unverändert.

## Validierung
- `bunx tsgo --noEmit` läuft sauber.
- Build-Fehler-Log wird auf leere Fehler geprüft.
