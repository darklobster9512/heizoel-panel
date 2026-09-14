# Personen-Icon in der grünen Hinweisbox ersetzen

## Ziel
Das Personen-Icon in der grünen Info-Karte (Schritt 1, „Super! Mit einem zweiten Kreditnehmer …") soll exakt wie das hochgeladene Bild aussehen: ein **gefülltes grünes Personensymbol** (runder Kopf + bogenförmige Schultern) in der Markenfarbe — **ohne Kreis/Rahmen drumherum**.

## Änderungen

### `src/components/wizard/ui.tsx`
- Neues kleines Inline-SVG-Komponentensymbol `PersonIcon` (gefüllt, Markengrün): Kreis-Kopf + Halbkreis-Körper, `viewBox="0 0 24 24"`.
- In `NoteBox` (Variante „green") das aktuelle Badge entfernen:
  - Kein `rounded-full`-Kreis, kein Border, kein Hellgrün-Hintergrund.
  - Stattdessen nur das gefüllte Personen-SVG in `text-brand` / `fill-brand`, Größe ca. 24 px, direkt neben dem Text.
- Die blaue Variante und andere Icon-Typen (briefcase, thumbsup) bleiben unberührt.

## Prüfung
- Playwright: Schritt 1 öffnen, „2 Personen" wählen, Screenshot der Hinweisbox prüfen — Icon sieht aus wie die Vorlage, kein Kreis mehr sichtbar.
