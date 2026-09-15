# Header-Logo von "heizking" auf "Panel" ändern

## Ziel
Das im Header angezeigte Logo/Wortmarke soll nicht mehr „heizking." heißen, sondern „Panel." – mit dem bestehenden grünen Punkt und allen aktuellen Styling-Regeln.

## Schritte
1. Header-Komponente lokalisieren (`src/components/landing/logo.tsx`, `src/components/internal/app-shell.tsx` oder ähnlich) und die Textausgabe des Logos prüfen.
2. Sichtbaren Header-Text von `heizking.` (ggf. case-insensitive) auf `Panel.` ändern.
3. Interne Speicherschlüssel (`klaro.*`) und andere technische Bezeichner bleiben unverändert.
4. Typecheck `bunx tsgo --noEmit` und Build prüfen.

## Keine Änderungen an
- Projektname/Speicherkeys
- Supabase/Edge Functions
- Sonstiger UI-Logik
