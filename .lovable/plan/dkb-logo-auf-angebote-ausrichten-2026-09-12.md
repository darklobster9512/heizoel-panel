# DKB-Logo auf `/angebote` ausrichten

## Änderung
- Das DKB-Logo in den Angebotskarten erhält eine gezielte, größere Darstellung, ohne die Größen der anderen Banklogos zu verändern.
- Der sichtbare Logo-Inhalt wird innerhalb des vorhandenen Logo-Bereichs sauber links und vertikal mittig positioniert, damit er auf derselben optischen Linie wie die übrigen Banken sitzt.
- Dieselbe DKB-spezifische Anpassung wird im geöffneten Angebotsdetail angewendet, dort passend zur kleineren Kopfzeile.

## Prüfung
- Angebotsliste nach der 10-sekündigen Ladephase in Desktopbreite prüfen.
- DKB-Karte und geöffnetes DKB-Angebotsdetail mit den direkt folgenden Banklogos vergleichen.
- Mobile Darstellung auf Überlauf oder verschobene Inhalte prüfen.

## Technisch
- Die Logo-Darstellung in `src/routes/angebote.tsx` wird anhand von `bank.logo_key === "dkb"` mit eigenen Höhen- und Breitenklassen versehen.
- Keine Änderungen an Bankdaten, Sortierung, Zinsen oder anderen Logos.
