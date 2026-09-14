# Plan: Wizard-Dropdown Scrollbar statt Pfeil

## Ziel
In Schritt 3 des Kreditantrags-Wizards (und gleichartigen Wizard-Dropdowns) soll das Dropdown-Menü keine Pfeil-Buttons mehr am oberen/unteren Rand haben, sondern eine native Scrollbar auf der rechten Seite, um lange Listen zu scrollen.

## Umsetzung
1. **`src/components/ui/select.tsx` anpassen**
   - `SelectScrollUpButton` und `SelectScrollDownButton` aus `SelectContent` entfernen (keine Pfeile oben/unten).
   - `overflow-y-auto` beibehalten, damit bei Bedarf eine Scrollbar erscheint.
   - Optional: Scrollbar visuell konsistent gestalten (z. B. dünner grauer Track, grüner/grauer Thumb) über CSS in `src/styles.css`, falls Browser-Default zu auffällig ist.
   - Keine Änderung am Trigger, an den Items oder am ausgewählten Zustand (#eff8f1 / grauer Hover).

2. **Verhalten prüfen**
   - Schritt 3 soll die 33 Berufsgruppen weiterhin anzeigen, etwa 8 sichtbar, restliche per Scrollbar erreichbar.
   - Keine Änderung an Daten, Validierung oder Navigation.

## Nicht im Scope
- Keine Anpassung an den anderen Wizard-Schritten außer der geteilten Select-Komponente.
- Keine Änderung der Farben oder des ausgewählten/Hover-Verhaltens der Items.
