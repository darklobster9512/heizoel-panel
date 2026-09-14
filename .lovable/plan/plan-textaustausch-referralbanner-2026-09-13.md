# Plan: Textaustausch ReferralBanner

## Ziel
Den Text in der bestehenden `ReferralBanner`-Sektion (zwischen „Heizölsorten im Überblick" und „Vertrauen Sie auf Klaro") austauschen, ohne Layout, Bild, Hintergrundfarben oder sonstige Stile zu verändern.

## Aktueller Stand
- Sektion befindet sich in `src/components/landing/sections.tsx` als `ReferralBanner()` (Zeilen ~1122–1179).
- Desktop- und Mobile-Variante enthalten identischen Text.
- Einziger Button verlinkt auf `/antrag/schritt-1`.

## Änderungen
In `src/components/landing/sections.tsx`:

1. **Headline** in beiden Breakpoints ändern:
   - Alt: `Prämie für jede Bestellung: Freunde werben!`
   - Neu: `Jetzt Heizöl günstiger bestellen!`

2. **Beschreibungstext** in beiden Breakpoints ändern:
   - Alt: `Empfehlen Sie Klaro Ihren Freunden. Als Dankeschön bekommen Sie nach jeder Bestellung eine Geldprämie – Dieses Angebot gilt nur für kurze Zeit!`
   - Neu: `Schließen Sie sich 25.000+ zufriedenen Kunden an und sparen Sie durchschnittlich €247`

3. **Button-Label** in beiden Breakpoints ändern:
   - Alt: `Jetzt Prämie sichern`
   - Neu: `Heizölpreis berechnen`

4. **Vertrauenszeile** unterhalb des Beschreibungstexts in beiden Breakpoints hinzufügen:
   - Text: `Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise`
   - Kleine, dezente Schrift, zentriert (Mobile) bzw. linksbündig (Desktop), passend zum bestehenden Stil.

5. **Button-Link** bleibt auf `/antrag/schritt-1` (keine Änderung, da der Nutzer „sonst nichts" verändern möchte).

## Nicht ändern
- Hintergrundfarben (`bg-white`, `bg-surface`)
- Bild (`smavaHero`) und Positionierung
- Grid-/Flex-Layout
- Button-Größe und -Stil
- Schriftgrößen und Farben der Headline/Description
- Reihenfolge der Sektionen in `src/routes/index.tsx`

## Validierung
- Build laufen lassen.
- Desktop- und Mobile-Screenshot der Sektion prüfen.
