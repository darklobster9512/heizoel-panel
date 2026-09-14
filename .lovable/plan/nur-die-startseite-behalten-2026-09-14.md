# Nur die Startseite behalten

Alle Unterseiten werden entfernt. Übrig bleibt ausschließlich die Startseite `/` (plus die 404-Seite, die automatisch greift).

## Was gelöscht wird

- Preisrechner und Ergebnisseite
- Kompletter Bestell-/Antragsprozess (alle 18 Schritte, Bestätigung, Fertig-Seite)
- Regionalseiten (Heizölpreise bundesweit, Bundesländer, Städte)
- Inhaltsseiten: Angebote, Bewertungen, FAQ, Heizöl-Wissen, Lieferung & Zahlung, Kontakt
- Login/Anmeldung, Kundenbereich (Dashboard), Admin-Bereich inkl. Antragsdetails
- Die maschinenlesbare Seitenübersicht (sitemap.xml), da sie nur noch auf die Startseite zeigen würde

## Was mit den Buttons passiert

Alle Verweise auf gelöschte Seiten werden von der Startseite entfernt, das Layout bleibt ansonsten unverändert:

- Kopfzeile: Links „Preisrechner“ und „Kontakt“ entfallen, das Logo bleibt und führt nach oben
- Die grünen Buttons „Jetzt Heizölpreise vergleichen“ / „Heizölpreis berechnen“ entfallen an den Stellen, an denen sie in den Bestellprozess führten
- Das Suchformular im oberen Bereich bleibt sichtbar, springt aber nicht mehr in den Bestellprozess; der anschließende Lade-/Weiterleitungsschritt entfällt
- Abschnitte mit reinen Linklisten (regionale Links, weitere Themen) sowie Links in der Fußzeile, die auf gelöschte Seiten zeigen, werden als reiner Text bzw. ohne Verlinkung dargestellt oder entfernt, wenn dann nichts Sinnvolles übrig bleibt
- Die Beschreibung der Startseite und die Seitentitel bleiben erhalten

## Technische Details

- Alle Dateien unter `src/routes/` außer `__root.tsx` und `index.tsx` werden gelöscht (inkl. `_authenticated/`, `antrag/`, `heizoelpreise.*`, `preisrechner.*`, `sitemap[.]xml.ts`).
- Der Routenbaum wird automatisch neu erzeugt; `routeTree.gen.ts` wird nicht von Hand bearbeitet.
- `src/components/landing/*` wird bereinigt: `Link`/`useNavigate`-Aufrufe auf entfernte Pfade raus, damit die Typprüfung (`FileRoutesByPath`) fehlerfrei bleibt; `price-search-loading.tsx` und die Übergabe `onSearch` in `index.tsx` entfallen.
- Nicht mehr genutzte Komponenten (`src/components/app/*`, `src/components/wizard/*`, `src/components/regional/*`) werden mit entfernt.
- Danach Build-/Typprüfung kontrollieren und Startseite im Preview gegenprüfen.
