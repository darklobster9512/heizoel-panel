# Plan: Bestellungen-Tabelle feinjustieren

## Ziel
Die Spaltenansicht unter `/admin/bestellungen` wird klarer und kompakter:
- Kopf der Abweichungsspalte heißt statt "Abw. Lieferanschrift" nur noch **"ABW."**.
- In dieser Spalte werden nur noch Symbole angezeigt – kein "Ja" / "Nein" Text.
- Grauer Haken bleibt für abweichende Anschrift, **graues X** (statt rotem X) für keine Abweichung.
- Die **Menge** wird mit "L" in einer Zeile dargestellt, ohne Umbruch.

## Betroffene Datei
- `src/routes/_authenticated/admin_.bestellungen.tsx`

## Durchführung
1. Tabellenkopf (Desktop) und Kartenbeschriftung (Mobile) von "Abw. Lieferanschrift" auf "ABW." ändern.
2. Desktop-Abweichungszelle auf reines Icon reduzieren:
   - `Check` in Brand-Grün bei `hasDeviation(order)`
   - `X` in neutral-grau (`text-muted-custom`) sonst
   - Titelattribute (`title`) für Tooltip-Klarheit beibehalten
3. Mobile Karten-Abweichungszeile auf reines Icon umstellen, ebenfalls neutral-graues X.
4. Menge-Spalte/Zeile mit `whitespace-nowrap` versehen, damit Zahl und "L" nie umbrechen.

## Validierung
- `bunx tsgo --noEmit` läuft sauber.
- Build-Fehler-Log wird auf leere Fehler geprüft.
