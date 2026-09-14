# Plan: Geburtsdatum-Hinweis dauerhaft anzeigen

## Ziel
Der Hinweis unter dem Feld „Geburtsdatum“ in Schritt 12 soll exakt wie im Screenshot als grüne Hinweisbox erscheinen und nach dem ersten Fokus dauerhaft sichtbar bleiben – auch nach Ausfüllen und Verlassen des Feldes.

## Schritte

1. **TextField erweitern**
   - Datei: `src/components/wizard/ui.tsx`
   - Neuer optionaler Prop `persistentFocusHint?: string` und `persistentHintIcon?: "user" | "briefcase" | "thumbsup" | "money" | "trend" | "home"`.
   - Lokaler State `showPersistentHint`, initial `false`, wird bei `onFocus` auf `true` gesetzt.
   - Wenn `showPersistentHint` wahr ist, wird der Text als `<NoteBox variant="green" icon={...}>` direkt unter dem Eingabefeld gerendert.
   - Das alte `focusHint` bleibt unverändert für andere Felder verfügbar.

2. **Schritt 12 anpassen**
   - Datei: `src/routes/antrag/schritt-12.tsx`
   - Der aktuelle Geburtsdatum-Text wird von `focusHint` nach `persistentFocusHint` umgezogen.
   - `focusHint` wird für das Geburtsdatum entfernt.

3. **Validierung**
   - `bunx tsgo --noEmit` und `bun run build` laufen erfolgreich durch.
   - Browser-Check: Beim Laden ist der Hinweis noch nicht sichtbar. Nach Klick in das Feld erscheint die grüne Hinweisbox mit Icon. Nach Eingabe von `15.10.1991` und Verlassen des Feldes bleibt die Box sichtbar.
