# Plan: Admin-Dock optimieren

## Ziel
Den Abstand zwischen dem grünen Admin-Dock und der Haupttabelle verringern und das Dock visuell runder gestalten.

## Änderungen

### Datei: `src/components/internal/app-shell.tsx`

1. **Dock runder**
   - Außenecke rechts: von `rounded-r-2xl` auf `rounded-r-[1.75rem]` (oder `rounded-r-3xl`) erhöhen.
   - Menüpunkte im Dock: von `rounded-xl` auf `rounded-2xl` erhöhen, damit der innere Look ebenfalls weicher wird.

2. **Abstand zur Tabelle verringern**
   - Den linken Innenabstand des Haupt-Containers reduzieren: `lg:pl-[16rem]` auf `lg:pl-[15rem]` setzen.
   - Den Spalt/Gap zwischen Dock und Inhalt reduzieren: `gap-5` auf `gap-4` setzen.
   - Bei Bedarf das Dock-Padding leicht von `p-3` auf `p-2.5` reduzieren, damit die Kante näher an der Tabelle sitzt.

3. **Vertikale Zentrierung beibehalten**
   - `fixed left-0 top-1/2 -translate-y-1/2` bleibt unverändert.

4. **Mobile Bottom-Leiste unberührt lassen**
   - Keine Änderungen an der mobilen Navigation.

## Qualitätskontrolle
- `bunx tsgo --noEmit` ausführen.
- Build-Log prüfen.
- Visuell am Preview prüfen, ob das Dock mittig am linken Rand bleibt und die Tabelle breiter wird.
