# Plan: Admin-Dock als horizontale Top-Leiste

## Ziel
Das grüne Admin-Dock von der linken Seite an den oberen Bildschirmrand verschieben, horizontal mittig zentriert und so breit wie seine Inhalte. Der Content-Bereich darunter soll dann die volle Breite nutzen können.

## Änderungen

### Datei: `src/components/internal/app-shell.tsx`

1. **Dock nach oben verschieben**
   - Das bisherige `aside` (`fixed left-0 top-1/2 -translate-y-1/2`) entfernen/umbauen zu einem `header`/`nav`, der oben fixiert ist.
   - Positionierung: `fixed top-4 left-1/2 -translate-x-1/2 z-50`.
   - Ausrichtung horizontal, Inhalte mittig zentriert (`flex items-center justify-center`).
   - Breite: `w-max` (nur so breit wie Inhalte), maximal z. B. `max-w-[95vw]`.

2. **Dock-Inhalte horizontal anordnen**
   - Logo + Rollen-Badge links.
   - Navigationspunkte in der Mitte horizontal (Icon + Label optional nur bei ausreichend Platz, sonst Icon-only).
   - Benutzer-Initialen, Name/E-Mail und Abmelden rechts.
   - Abmelden-Button als Icon-Button mit Tooltip oder kurzem Label, damit die Leiste kompakt bleibt.

3. **Runderes Aussehen beibehalten**
   - Dock-Hintergrund: `bg-brand`, abgerundet mit `rounded-full` oder großen Ecken (`rounded-[1.75rem]`).
   - Innere Buttons/Menüpunkte ebenfalls `rounded-xl`/`rounded-2xl`.
   - Schatten `shadow-xl` beibehalten.

4. **Content-Bereich full-width**
   - Hauptcontainer: `max-w-none`, linken Offset `lg:pl-[16rem]` entfernen.
   - Padding oben erhöhen, damit das Dock nicht überlappt: `pt-24` o. ä.
   - Seitliche Ränder anpassen: `px-4` oder `px-6`.

5. **Mobile Bottom-Leiste**
   - Bleibt erhalten, damit auf kleinen Screens die Navigation erreichbar ist.
   - Optional: im mobilen Header das Logo/Abmelden aus dem Top-Dock ausblenden, falls das Bottom-Dock diese Funktionen übernimmt.

## Qualitätskontrolle
- `bunx tsgo --noEmit` ausführen.
- Build-Log prüfen.
- Visuell prüfen: Dock ist oben horizontal mittig zentriert, Content darunter nutzt die volle Breite, keine Überlappung.
