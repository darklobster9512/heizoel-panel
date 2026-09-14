Alle Footer-Region-Links zur Preisrechner-Seite verlinken

Ziel
Alle regionalen SEO-Links (Städte + Bundesländer) in der Footer-ähnlichen SEO-Sektion sollen auf `/preisrechner` verlinken.

Betroffene Datei
- `src/components/landing/sections.tsx`

Umsetzung
1. `REGIONAL_BUTTONS` in `RegionalSeo`:
   - `<button type="button">` durch `<Link to="/preisrechner">` von `@tanstack/react-router` ersetzen.
   - Visuelles Styling (Rahmen, Hintergrund, Hover, Textgröße) beibehalten.

2. `CITY_LINKS` und `STATE_LINKS` in `SeoLinkGroup`:
   - `<a href="#">` durch `<Link to="/preisrechner">` ersetzen.
   - Textfarbe, Hover-Effekt und Layout beibehalten.

3. Keine inhaltlichen Änderungen an den Link-Labels oder der Aufteilung in Städte/Bundesländer.

4. Nach dem Edit Typecheck (`bunx tsgo --noEmit`) und Build-Log prüfen.
