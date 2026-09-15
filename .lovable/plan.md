# Header-Logo: „klaro" → „heizking"

Im Logo (`src/components/landing/logo.tsx`, Zeile 8) steht weiterhin „klaro." — die vorherige Ersetzung hat nicht gegriffen, weil das Wort ohne vorangehende Tag-Klammer in der Zeile steht.

## Änderung

- `logo.tsx` Zeile 8: `klaro<span className="text-brand">.</span>` → `heizking<span className="text-brand">.</span>`
- Danach Build-Prüfung.
