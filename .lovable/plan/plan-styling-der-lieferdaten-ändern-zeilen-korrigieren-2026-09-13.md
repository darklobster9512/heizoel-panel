# Plan: Styling der Lieferdaten-Ändern-Zeilen korrigieren

## Ziel
Im Popdown „Lieferdaten ändern" auf `/preisrechner/ergebnis` sollen die Werte und der „ändern"-Link visuall korrekt formatiert werden.

## Änderungen in `src/routes/preisrechner.ergebnis.tsx`

1. **Werte (PLZ / Liefermenge)**
   - Farbe: schwarz/grau (`text-ink` oder `text-hero-text`)
   - Schriftgewicht: `font-bold`
   - Mengeneinheit: „Liter" statt „L" (z. B. „3.000 Liter")

2. **„ändern"-Link**
   - Farbe: grau (`text-muted-custom`)
   - Schriftgewicht: normal (kein `font-semibold`/`font-bold`)
   - Unterstrichen (`underline` statt nur `underline-offset-4`)

3. **Layout**
   - Wert und „ändern" bleiben rechtsbündig in derselben Zeile.
   - Edit-Modus bleibt unverändert (Eingabefeld erscheint nach Klick).

## Nicht im Scope
- Keine Änderung an Logik, Intervallen, Preisen oder anderen Sektionen der Seite.
