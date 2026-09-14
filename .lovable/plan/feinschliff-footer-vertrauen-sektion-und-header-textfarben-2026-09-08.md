# Feinschliff: Footer, Vertrauen-Sektion und Header-Textfarben

## Ziel

Die verbleibenden Textfarben und Schriftstärken an die Vorgaben anpassen, ohne die Struktur oder Titel zu verändern.

## Änderungen

1. **Neue Farb-Tokens in `src/styles.css`**
   - `--footer-text: #323232` für Footer-Links, Beratungstext, Rechtslinks und Copyright.
   - `--header-phone: #5b5b5b` für die Telefonnummer im Header.
   - Beide im `@theme inline`-Block als `--color-footer-text` und `--color-header-phone` registrieren.

2. **Footer (`src/components/landing/sections.tsx`)**
   - Desktop & Mobile: Die Listen-Links (nicht die Titel) auf `text-[13px]` (oder kleiner) und `text-footer-text` setzen.
   - `ConsultingBlock`: „Wir beraten Sie gerne …“, Telefonnummer, Öffnungszeiten auf `text-footer-text` setzen.
   - Rechtslinks (`FOOTER_LEGAL`) und Copyright-Zeile auf `text-footer-text` setzen.
   - Titel (`font-bold`, `text-[14px]`) bleiben unverändert.

3. **Vertrauen-Sektion (`TrustLinks` in `src/components/landing/sections.tsx`)**
   - Karten-Titel (`TRUST_CARDS.title`) auf `text-footer-text` (#323232) setzen.
   - Links und Pfeil-Icons behalten das Brand-Grün.

4. **Header (`src/components/landing/site-header.tsx`)**
   - Menüleiste: `font-semibold` entfernen, Abstand zwischen den Punkten etwas verringern (z. B. `gap-6` → `gap-4`).
   - Telefonnummer `0800 000 98 00`: `font-semibold` entfernen und `text-header-phone` (#5b5b5b) zuweisen. „Kostenlose Beratung“ bleibt in der bisherigen gedämpften Farbe.

## Prüfung

- Typecheck ausführen.
- Desktop- und Mobile-Screenshots der Footer-, Vertrauen- und Header-Bereiche prüfen.
