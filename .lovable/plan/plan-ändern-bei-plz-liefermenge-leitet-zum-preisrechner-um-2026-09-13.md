# Plan: „ändern" bei PLZ/Liefermenge leitet zum Preisrechner um

## Ziel
Im Popdown „Lieferdaten ändern" auf `/preisrechner/ergebnis` sollen die „ändern"-Links neben PLZ und Liefermenge nicht mehr inline editierbar machen, sondern den Nutzer auf `/preisrechner` weiterleiten.

## Änderungen in `src/routes/preisrechner.ergebnis.tsx`

1. **PLZ-Zeile**
   - Entferne den Inline-Edit-Modus für PLZ.
   - Der „ändern"-Link wird zu einem `<Link to="/preisrechner">`.
   - Der Wert bleibt fett und dunkel, der Link bleibt grau, normal und unterstrichen.

2. **Liefermenge-Zeile**
   - Entferne den Inline-Edit-Modus für Liefermenge.
   - Der „ändern"-Link wird zu einem `<Link to="/preisrechner">`.
   - Der Wert bleibt fett und dunkel mit Einheit „Liter", der Link bleibt grau, normal und unterstrichen.

3. **Aufräumen**
   - Entferne den nicht mehr benötigten `editPlzMenge`-State und die zugehörige Logik.
   - `editing` für die restlichen Lieferdaten (Lieferstellen, Schlauch, Tankwagen) bleibt bestehen.

## Nicht im Scope
- Keine Änderung an der Preisrechner-Seite selbst.
- Keine Änderung an anderen Sektionen der Ergebnisseite.
