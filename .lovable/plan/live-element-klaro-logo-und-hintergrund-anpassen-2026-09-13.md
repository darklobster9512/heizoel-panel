# Live-Element: Klaro-Logo und Hintergrund anpassen

## Ziel
Das harmonisierte Live-Bestellungen-Element in der rechten Kartenhälfte auf `/preisrechner` soll stärker zur Klaro-Marke passen und visuell in die Karte einbinden.

## Änderungen an `src/routes/preisrechner.tsx`

### Logo statt Flame-Icon
- Das `Flame`-Icon oben rechts im Live-Element entfällt.
- Stattdessen wird das vorhandene `Logo`-Komponente aus `@/components/landing/logo` importiert und in der oberen rechten Ecke des Elements angezeigt.
- Das Logo wird klein skaliert (z. B. `w-[60px]` oder `w-[72px]`), damit es in die Zeile passt, ohne übermäßig aufzutragen.

### Hintergrundfarbe an Kartenhälfte anpassen
- Der rechte Kartenbereich hat `bg-surface/50`.
- Das Live-Element erhält ebenfalls `bg-surface/50` statt `bg-background`, sodass es nahtlos in die rechte Kartenhälfte übergeht.
- Der Rahmen `border-line` bleibt erhalten, damit die Abgrenzung zur Karte sichtbar ist.

### Sonstiges
- Pulsierender Punkt, Textgewichtungen, Glow-Effekt und zufälliges Intervall bleiben wie im vorherigen Schritt.

## Validierung
- Preview auf `/preisrechner` prüfen: Oben rechts steht das Klaro-Logo, Hintergrund fügt sich in die rechte Kartenhälfte ein, Build läuft fehlerfrei.
