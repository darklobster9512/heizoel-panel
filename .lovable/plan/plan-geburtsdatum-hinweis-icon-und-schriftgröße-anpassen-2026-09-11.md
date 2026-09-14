# Plan: Geburtsdatum-Hinweis Icon und Schriftgröße anpassen

## Ziel
Der dauerhafte Hinweis unter dem Feld „Geburtsdatum“ in Schritt 12 soll dem Screenshot näher kommen: kleinere Schriftgröße und ein Icon in Form eines Pfeils in eine Tür (Login-/Logout-Door-Icon).

## Schritte

1. **Icon-Unterstützung erweitern**
   - Datei: `src/components/wizard/ui.tsx`
   - In `TextField` und `NoteBox` wird `persistentHintIcon` um `"login"` ergänzt.
   - `NoteBox` rendert für `"login"` das Lucide-Icon `LogIn` (Pfeil in Tür) in Akzentgrün.

2. **Schriftgröße für persistenten Hinweis verkleinern**
   - Datei: `src/components/wizard/ui.tsx`
   - Der per `persistentFocusHint` gerenderte `NoteBox`-Text erhält eine kleinere Schriftgröße (z. B. `text-[12.5px]` statt `text-[13.5px]`), damit er visuell dem Screenshot entspricht.

3. **Schritt 12 aktualisieren**
   - Datei: `src/routes/antrag/schritt-12.tsx`
   - `persistentHintIcon` wird von `"user"` auf `"login"` geändert.

4. **Validierung**
   - `bunx tsgo --noEmit` und `bun run build` laufen erfolgreich durch.
   - Browser-Check auf `/antrag/schritt-12`: Nach Fokus des Geburtsdatum-Feldes erscheint der Hinweis mit dem Tür-Pfeil-Icon und der kleineren Schriftgröße.
