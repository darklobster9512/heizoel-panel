# Roboto als globale Schriftart

## Ziel
Alle Texte der Landingpage sollen in **Roboto** erscheinen – bisher ist nur die Hero-H1 in Roboto, während Überschriften Inter Tight und Fließtext Inter nutzen.

## Schritte

1. **Schriftarten-Token anpassen**
   - In `src/styles.css` im `@theme inline`-Block:
     - `--font-body` auf `"Roboto", ui-sans-serif, system-ui, sans-serif` setzen.
     - `--font-display` ebenfalls auf `"Roboto", ui-sans-serif, system-ui, sans-serif` setzen.
   - `--font-hero` bleibt Roboto (bereits korrekt).

2. **Überflüssige Schrift laden reduzieren**
   - In `src/routes/__root.tsx` prüfen, ob Inter Tight noch an anderer Stelle benötigt wird. Falls nur Roboto übrig bleibt, `Inter Tight` aus den Google-Fonts-Links entfernen; Roboto in 400/500/700 belassen.

3. **Prüfung**
   - Typecheck/Bild laufen lassen.
   - Screenshot-Vergleich Desktop und Mobil, um sicherzustellen, dass alle Überschriften, Body-Texte, Buttons und Labels jetzt Roboto verwenden.

## Auswirkungen
- Einheitliches Schriftbild über die gesamte Seite.
- Keine weiteren Design- oder Layout-Änderungen.
