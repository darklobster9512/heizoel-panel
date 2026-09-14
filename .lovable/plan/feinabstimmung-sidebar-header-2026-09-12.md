# Feinabstimmung Sidebar-Header

## Ziel
Zwei kleine visuelle Korrekturen auf `/kreditantrag/$applicationId` in der rechten Detail-Sidebar.

## Änderungen
1. **Card hinter dem Schließen-X**
   - Das X-Symbol bleibt gleich groß.
   - Die weiße Hintergrund-Card mit Schatten wird kleiner (z. B. `size-7` statt `size-9` oder weniger Padding), sodass sie eng am X anliegt.

2. **Abstand Logo zu Tabs**
   - Mehr vertikaler Abstand zwischen dem zentrierten Banklogo im Sidebar-Header und den darunterliegenden Tabs.
   - Möglich z. B. durch etwas mehr Padding oben/unten im Headerbereich oder Margin unter dem Logo.

## Technisch
- Nur `src/routes/kreditantrag.$applicationId.tsx` wird angepasst.
- Keine Datenbank-, Auth- oder Funktionsänderungen.
- Typecheck nach den Änderungen.
