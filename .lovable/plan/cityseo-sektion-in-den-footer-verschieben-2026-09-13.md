# CitySeo-Sektion in den Footer verschieben

## Ziel
Die bestehende Sektion „Heizöl & Heizölpreise in deutschen Städten" (mit den Linklisten für Städte und Bundesländer) wird von der Landingpage entfernt und stattdessen fest in den `SiteFooter` eingebaut. Dadurch erscheint sie auf allen Seiten, die den Footer verwenden — einschließlich `/preisrechner` — und ist nicht mehr doppelt auf der Startseite.

## Änderungen

### 1. `src/components/landing/sections.tsx` — CitySeo von der Landingpage entfernen
- Die `CitySeo`-Komponente wird komplett entfernt.
- Die Konstanten `CITY_LINKS`, `STATE_LINKS` und die Hilfskomponente `SeoLinkGroup` werden aus `sections.tsx` entfernt.
- Die Komponente wird nicht mehr exportiert.

### 2. `src/routes/index.tsx` — Verwendung von CitySeo entfernen
- Das Rendering von `<CitySeo />` wird aus der Landingpage entfernt.
- Der Import von `CitySeo` wird entfernt.

### 3. `src/components/landing/sections.tsx` — CitySeo in den Footer einbauen
- Die Komponente `CitySeo` (inkl. `CITY_LINKS`, `STATE_LINKS`, `SeoLinkGroup`) wird in `SiteFooter` integriert.
- Sie wird als zusätzlicher Footer-Bereich eingefügt, bevor die Auszeichnungen/Copyright kommen.
- Styling und Inhalt bleiben 1:1 wie bisher (weißer Hintergrund, gleiche Texte, gleiche Link-Darstellung).
- `SiteFooter` wird entsprechend erweitert, ohne die bestehenden Footer-Elemente (Adresse, Services, Rechtliches, Zahlungsarten, Awards, Copyright) zu verändern.

### 4. Keine weiteren Änderungen
- Keine Änderungen an `/preisrechner.tsx` — die Seite verwendet bereits `SiteFooter`, dadurch erscheint die Sektion automatisch.
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard` oder `/admin`.
- Keine neuen Routen oder Backend-Änderungen.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite und der Landingpage, um zu prüfen, dass die Sektion im Footer sichtbar ist und auf der Landingpage nicht mehr doppelt erscheint.
