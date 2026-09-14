Bewertungszahlen global anpassen: 33.000 → 25.000 und 4,99 → 4,9

Ziel
Alle Kunden- und Bewertungszahlen im Projekt angleichen:
- Kundenanzahl: überall wo "33.000", "33.000+", "33.429" oder ähnliche Varianten stehen, wird auf "25.000" bzw. "25.000+" geändert.
- Bewertung: überall wo "4,99" / "4.99" (inklusive "4,99/5", "4.99/5", "4,99 von 5 Sternen") steht, wird auf "4,9" / "4,9/5" geändert.

Betroffene Dateien
- `src/components/landing/sections.tsx`
- `src/routes/bewertungen.tsx`

Umsetzung
1. Suche nach allen Vorkommen von `33\.000`, `33,000`, `33\.000\+`, `33\.429` und `33,429` in den betroffenen Dateien und ersetze sie durch die passende 25.000-Variante.
2. Suche nach allen Vorkommen von `4,99` und `4\.99` (auch mit `/5` oder `von 5 Sternen`) und ersetze sie durch `4,9` bzw. `4.9`.
3. Typecheck (`bunx tsgo --noEmit`) und Build-Log prüfen.
4. Kurze visuelle Prüfung der betroffenen Seiten (Landingpage und `/bewertungen`) per Screenshot.
