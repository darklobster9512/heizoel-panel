# Plan: Wizard-Dropdown wie Hero-Dropdown stylen

## Ziel
Das Dropdown in Schritt 2 (und allen Wizard-Schritten, die `SelectField` nutzen) soll exakt so aussehen und sich so verhalten wie die Dropdowns in der Hero-Rechnerkarte der Landingpage.

## Aktueller Stand
- `src/components/wizard/ui.tsx` → `SelectField` benutzt ein natives `<select>` (eigenes Styling, blauer Hover des Browsers, kein Chevron-Rotation).
- Hero (`src/components/landing/offer-card.tsx`) benutzt das angepasste shadcn/Radix Select aus `src/components/ui/select.tsx`: kantige Ecken, rotierender Chevron, ausgewählter Punkt mit Hintergrund `#eff8f1`, Hover gräulich `#f3f4f6`, kein Checkmark, mehr Abstand zwischen Optionen.

## Umsetzung
1. `SelectField` in `src/components/wizard/ui.tsx` von nativem `<select>` auf das shadcn Select (`Select`, `SelectTrigger`, `SelectContent`, `SelectItem` aus `@/components/ui/select`) umstellen — gleiche Klassen/Höhen wie in der Hero-Karte.
2. Label-Darstellung (13–14px, #323232) beibehalten.
3. Dadurch erhalten alle Wizard-Schritte mit Dropdowns automatisch das Hero-Styling (Schritt 2 Familienstand, sowie alle weiteren SelectFields in den Schritten 1–17).
4. Keine sonstigen Änderungen an Inhalten, Texten oder Layout der Schritte.

## Verifikation
- Build/Typecheck.
- Playwright: Schritt 2 öffnen, Dropdown klicken → Chevron dreht, Optionen mit grauem Hover, Auswahl mit #eff8f1, kantige Ecken; Screenshot-Abgleich mit Hero-Dropdown.
