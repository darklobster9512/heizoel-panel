# Plan: Admin-Panel mit zentrierter linker Dock-Sidebar

## Ziel
Die Desktop-Navigation im `/admin`-Bereich soll nicht mehr oben an der Seite kleben, sondern als vertikal zentrierte „Dock“-Leiste am linken Seitenrand sitzen. Um die Einträge herum kommt eine grüne Card, die nur so groß ist wie die Navigationspunkte selbst und optisch vom linken Seitenrand ausgeht.

## Betroffene Dateien
- `src/components/internal/app-shell.tsx` — Layout + Sidebar der internen Bereiche

## Durchführung
1. **Container anpassen**
   - Das Haupt-Layout (`<div className="mx-auto flex ...">`) erhält `min-h-[calc(100vh-64px)]`, damit die linke Spalte die volle verfügbare Höhe einnehmen kann.
   - Linkes Padding der Container-Klasse auf Desktop entfernen (`lg:pl-0`), damit die grüne Card direkt am linken Seitenrand anliegen kann. Rechter Abstand und Mobil-Padding bleiben erhalten.

2. **Sidebar zur vertikalen Dock-Leiste umbauen (nur `lg`)**
   - `<aside>` behält `hidden lg:block w-max shrink-0`.
   - Innerhalb der Sidebar wird `<nav>` in eine grüne Card gewrappt:
     - `sticky top-1/2 -translate-y-1/2` für vertikale Zentrierung im Viewport.
     - `w-max` + `rounded-r-2xl rounded-l-none` damit sie exakt so breit/hoch ist wie die Einträge und wie vom linken Rand herausgeschoben wirkt.
     - `bg-brand p-2 shadow-xl` (Primary-Grün #22C55E) mit weißen Icons/Texten.
   - Die Navigationslinks werden neu gestylt:
     - Inaktiv: `text-white/90 hover:bg-white/10`
     - Aktiv: weißer Hintergrund, grüne Schrift, abgerundet (`rounded-xl`), Schatten leicht.
     - Weiterhin Icon + Label in einer Zeile, `whitespace-nowrap`.

3. **Hauptinhalt**
   - `<main>` bleibt `min-w-0 flex-1`. Der bestehende `gap-5` des Containers sorgt für den Abstand zwischen grüner Dock-Card und Inhalt.

4. **Mobile Bottom-Navigation**
   - Bleibt unverändert, da die Anforderung nur die Desktop-Ansicht betrifft.

## Validierung
- `bunx tsgo --noEmit` läuft sauber.
- Build-Fehler-Log wird geprüft.
- Visueller Check im Preview auf `/admin`, dass die Sidebar vertikal mittig, als grüne Card vom linken Rand ausgehend und nur so groß wie die Menüpunkte ist.
