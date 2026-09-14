Footer-Service-Links korrekt verlinken

Ziel
Die vier Service-Links im Footer sollen auf die richtigen internen Seiten verlinken.

Betroffene Datei
- `src/components/landing/sections.tsx`

Umsetzung
1. `FOOTER_SERVICES` anpassen:
   - "Hilfe" → `/faq`
   - "Kontakt" → `/kontakt`
   - "Bewertungen" → `/bewertungen` (aktuell `#bewertungen`)
   - "Lieferung & Zahlung" → `/lieferung-zahlung`

2. `FooterLinkList` so erweitern, dass interne Links als `<Link>` von `@tanstack/react-router` gerendert werden (statt `<a>`), damit clientseitige Navigation funktioniert. Platzhalter-Links in `FOOTER_RECHTLICHES` bleiben zunächst `<a href="#">`.

3. Typecheck und Build-Log prüfen.
