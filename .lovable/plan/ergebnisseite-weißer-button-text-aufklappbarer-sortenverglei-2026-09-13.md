# Ergebnisseite: weißer Button-Text + aufklappbarer Sortenvergleich

## Änderungen an `src/routes/preisrechner.ergebnis.tsx`

### 1. „Zur Bestellung"-Button: Text weiß
- CTA-Link in der Angebots-Card: `text-ink` → `text-white` (grüner Hintergrund bleibt).

### 2. „Sorten im Detail vergleichen" öffnet sich inline (statt Link zur Wissens-Seite)
- Der bisherige Link nach `/heizoel-wissen#sorten` wird zu einem Button, der eine Vergleichstabelle **direkt unterhalb aufklappt** (Accordion, wie im Referenz-Screenshot).
- Zustand `compareOpen` (auf/zu), mit Chevron-Icon, das sich dreht; weiche Höhen-/Fade-Animation.
- Tabelle: drei Spalten — Merkmal | Standard | Premium (Spaltenüberschriften fett, zentriert):

| Merkmal | Standard | Premium |
| --- | --- | --- |
| Für alle Ölheizungen | ✓ | ✓ |
| Mischbar mit anderen Sorten | ✓ | ✓ |
| Geringerer Verbrauch (~5 %) | ✗ | ✓ |
| Angenehmer Geruch | ✗ | ✓ |
| Bessere Lagerfähigkeit | ✗ | ✓ |
| Schützt die Heizung | ✗ | ✓ |

- Häkchen grün (`text-brand`, Lucide `Check`), Kreuzchen neutral-grau (`text-muted-custom`, Lucide `X`), Zeilen mit feinen Trennlinien (`border-line`), abwechselnd lesbar, Schriftgröße ca. 13 px.
- Mit `aria-expanded` und Tastatur-Bedienbarkeit; standardmäßig eingeklappt.
- Der bestehende Abschnitt „Sorten im Detail vergleichen" auf `/heizoel-wissen#sorten` bleibt unverändert.

## Technisch
- Nur `src/routes/preisrechner.ergebnis.tsx` betroffen; neue Lucide-Icons `Check`, `X`, `ChevronDown`.
- Keine neuen Routen, keine Datenänderungen; danach Build-Log prüfen und Verhalten (auf/zu, weißer Button-Text) in der Vorschau verifizieren.
