# Einstellungen-Tabs als zweites Dock unter der Kopfleiste

Die Tabs auf /admin/settings (Rechnung, E-Mails, SMS, Telegram) sollen optisch an die grüne Kopfleiste andocken – wie ein zweites, kleineres Dock, das sich darunter öffnet, mittig am oberen Bildschirmrand.

## Umsetzung

1. **Sub-Dock-Platz im App-Shell** (`src/components/internal/app-shell.tsx`)
   - `InternalShell` bekommt eine optionale Eigenschaft `subDock?: ReactNode`.
   - Wird sie gesetzt, erscheint direkt unter der grünen Leiste ein zweites, schmaleres Dock: gleiche Farbe, stark abgerundete Ecken, mittig zentriert (`fixed`, exakt unter der Leiste ausgerichtet), mit leichtem Abstand nach unten – so wirkt es wie aus der Leiste herausgeklappt.
   - Der Seiteninhalt bekommt dann etwas mehr Abstand nach oben, damit nichts verdeckt wird.

2. **Tabs dorthin verlegen** (`src/routes/_authenticated/admin_.settings.tsx`)
   - Die vier Tabs wandern aus dem Seiteninhalt in das neue Sub-Dock (weißer Text, aktiver Tab als weißer Button – gleicher Stil wie die Hauptnavigation).
   - Auf kleinen Bildschirmen (Handy) bleibt die bisherige Tab-Leiste im Inhalt erhalten, da dort kein Dock existiert.
   - Die URL-Logik (`?tab=...`) bleibt unverändert.

3. **Prüfung**: Typecheck und Build; Layout visuell prüfbar, sobald du die Seite /admin/settings öffnest.
