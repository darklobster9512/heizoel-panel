# Plan: „ändern“-Popdown auf Ergebnisseite überarbeiten

## Ziel
Das Lieferdaten-Popdown auf `/preisrechner/ergebnis` soll dem Referenz-Screenshot entsprechen: kompaktere Zeilen, sichtbare Divider-Striche, und PLZ/Liefermenge erst nach Klick auf „ändern“ editierbar.

## Änderungen

1. **Zeilen enger zusammenrücken**
   - Padding zwischen Label und Wert reduzieren (z. B. `py-1.5` statt `py-2`).
   - Gesamten Abstand im Popdown-Bereich verringern.

2. **Divider-Striche zwischen den Zeilen**
   - Jede Zeile im Popdown bekommt einen unteren Trennstrich (`border-b border-line`).
   - Letzte Zeile ohne unteren Strich oder mit `last:border-b-0`.

3. **PLZ und Liefermenge erst nach „ändern“ editierbar**
   - Im geschlossenen Zustand des Popdowns werden PLZ und Liefermenge als reiner Text angezeigt (nicht als Eingabefelder).
   - Erst nach Klick auf „ändern“ werden die beiden Werte zu editierbaren Eingabefeldern.
   - Die übrigen Felder (Lieferstellen, Schlauch, Tankwagen, Lieferdatum) bleiben wie gewünscht im Popdown sichtbar und ggf. änderbar.

4. **Visuelles Feintuning**
   - Sicherstellen, dass der „ändern“-Link weiterhin rechts oben in der Lieferdaten-Zeile sitzt.
   - Falls nötig, Schriftgrößen leicht anpassen, damit das Popdown nicht zu groß wirkt.

## Betroffene Datei
- `src/routes/preisrechner.ergebnis.tsx`
