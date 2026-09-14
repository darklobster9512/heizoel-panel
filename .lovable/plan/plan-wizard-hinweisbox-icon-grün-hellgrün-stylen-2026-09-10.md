# Plan: Wizard-Hinweisbox-Icon grün/hellgrün stylen

## Ziel
Das Icon in der grünen `NoteBox` im Wizard (z. B. Schritt 1 bei „2 Personen“) soll nicht mehr als einfache graue Linie dargestellt werden, sondern:
- einen **grünen Rand/Outline** in der Brand-Farbe `#39a949` erhalten
- einen **hellgrünen Hintergrund** bekommen (wie der Hover-Hintergrund der Outline-Buttons, `#eff8f1`)
- das Lucide-Icon selbst **gefüllt (filled)** in der Brand-Farbe `#39a949` erscheinen

## Betroffene Dateien
- `src/components/wizard/ui.tsx` – Komponente `NoteBox`
- `src/routes/antrag/schritt-1.tsx` – Verwendung bleibt unverändert, dient nur zur visuellen Validierung

## Umsetzungsschritte
1. In `src/components/wizard/ui.tsx`:
   - Den Sonderfall für `icon === "user"` entfernen.
   - Für jede grüne `NoteBox` (`variant === "green"`) das gewählte Lucide-Icon in ein kleines, rundes Badge einwickeln:
     - Äußerer Ring: `border border-brand` (`#39a949`)
     - Hintergrund: `bg-[#eff8f1]`
     - Icongröße: ca. 16–18 px
     - Badgegröße: ca. 28–32 px
   - Dem Lucide-Icon `fill="currentColor"` mitgeben, damit es gefüllt und nicht nur gestrichelt dargestellt wird.
   - Text- und Abstandsstile der Hinweisbox unverändert lassen.

2. Validierung:
   - `bun run build` ausführen.
   - Playwright-Screenshot für `/antrag/schritt-1` mit ausgewähltem „2 Personen“ erstellen und prüfen, ob das Personen-Icon als grün umrandetes, hellgrün gefülltes Badge erscheint.

## Nicht in Scope
- Keine Änderung an blauen Info-Boxen (`variant === "blue"`).
- Keine Änderung an Logik, Text oder Button-Styling im Wizard.
- Desktop- und Mobile-Layout bleiben unverändert.
