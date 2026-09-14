# Kontaktseite: Scrollbar im Anliegen-Dropdown sofort sichtbar

## Ziel
Beim Öffnen des „Anliegen"-Dropdowns auf `/kontakt` soll der Nutzer sofort erkennen können, dass weitere Optionen vorhanden sind und nach unten gescrollt werden kann. Die Scrollbar muss daher direkt sichtbar sein, nicht erst nach dem ersten Scroll-Versuch.

## Diagnose
Im aktuellen `SelectContent` wird die Scrollbar-Track nur angezeigt, wenn entweder bereits gescrollt wurde (`scrollState.visible`) oder mehr als 8 Kinder-Elemente vorhanden sind. Auch wenn die Track-Fläche erscheint, kann der Thumb bei kurzer Inhaltsliste oder ungünstigem Timing beim Öffnen noch nicht korrekt bemessen sein, sodass der Hinweis auf Scrollbarkeit untergeht.

## Umsetzung

1. **Scrollbar-Logik anpassen**
   - Sicherstellen, dass die Scrollbar-Track direkt beim Öffnen des Dropdowns gerendert wird, sobald der Inhalt die verfügbare Höhe überschreitet.
   - Den initialen Thumb auf eine sichtbare Mindestgröße setzen, damit er sofort als Scroll-Indikator erkennbar ist.

2. **Visuelle Betonung**
   - Scrollbar-Track und Thumb mit stärkerem Kontrast gestalten, damit sie im hellen Dropdown-Hintergrund auffallen.
   - Optional einen kurzen visuellen Hinweis ergänzen (z. B. dezenter Schatten am unteren Dropdown-Rand), der anzeigt, dass mehr Inhalt folgt.

3. **Dateien**
   - `src/components/ui/select.tsx` (Scrollbar-Logik und Styling)
   - Ggf. `src/routes/kontakt.tsx` nur, falls ein Dropdown-spezifisches Attribut nötig wird (z. B. `max-height`)

## Nicht im Scope
- Keine Änderung an den Dropdown-Gruppen oder Optionen.
- Keine Backend-Anbindung.
