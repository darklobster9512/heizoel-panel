# Plan: Hero-Headline auf Roboto setzen

## Ziel
Die Headline „Günstige Kredite - garantiert!“ in der Hero-Section soll in der Schriftart **Roboto** erscheinen. Alle anderen Überschriften und der Fließtext bleiben unverändert.

## Schritte

1. **Roboto von Google Fonts laden**
   - In `src/routes/__root.tsx` die Google-Fonts-Link um `Roboto:wght@400;500;700` erweitern (entweder in bestehende URL integrieren oder separater `<link>`).

2. **Schriftarten-Token ergänzen**
   - In `src/styles.css` im `@theme inline`-Block eine neue Variable anlegen, z. B. `--font-hero: "Roboto", ui-sans-serif, system-ui, sans-serif;`.

3. **Headline in der Hero anpassen**
   - In `src/components/landing/hero.tsx` dem `<h1>` mit dem Text „Günstige Kredite - garantiert!“ die Klasse `font-hero` hinzufügen, damit nur diese eine Headline Roboto verwendet.

4. **Validierung**
   - `bun run build` ausführen und kurz in der Vorschau prüfen, ob die Headline visuell Roboto nutzt.

## Auswirkungen
- Nur die Hero-H1 ändert ihr Erscheinungsbild.
- Keine Änderungen am restlichen Designsystem, Farben oder Layout.
