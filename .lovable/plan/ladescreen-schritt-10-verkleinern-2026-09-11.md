# Ladescreen Schritt 10 verkleinern

Der Ladescreen (`/antrag/schritt-10`) soll insgesamt kompakter werden, ohne die bestehende Struktur oder Inhalte zu ändern.

## Visuelle Änderungen

- **Überschrift** „Fast geschafft! Einen Augenblick noch." von `text-[22px]` auf `text-[18px]` reduzieren, Außenabstand von `mt-10` auf `mt-6`.
- **„Ihre Angaben:"** von `text-[15px]` / `mt-6` auf `text-[14px]` / `mt-4`.
- **Zusammenfassungszeilen** enger setzen: `space-y-3` → `space-y-2`, Schrift `text-[15px]` → `text-[14px]`, Wert nicht mehr fett (`font-bold` entfernen).
- **Skeleton-Angebotskarten** kleiner:
  - Karten-Padding und Innenabstände verringern (`px-5`, `pt-4`, `pb-6` reduzieren).
  - Logos kleiner skalieren (`h-8`/`h-9`/`h-5` jeweils um eine Stufe, z. B. `h-6`/`h-7`/`h-4`).
  - Skeleton-Balken von `h-4`/`h-3` auf `h-3`/`h-2.5` und Breiten kürzer.
  - Abstand zwischen den Karten von `space-y-6` auf `space-y-3`.
- **Trust-Banner** „TÜV geprüft + SCHUFA-neutral" kleiner: `text-[15px]` → `text-[13px]`, `py-4` → `py-2.5`, Abstand davor von `mt-6` auf `mt-4`.
- **Fortschrittsbalken** bleibt unverändert (64 %).
- **Navigation/TrustBlock/Footer** unten bleiben unverändert.

## Datei

- `src/routes/antrag/schritt-10.tsx`

## Validierung

- Typecheck und visueller Playwright-Screenshot von `/antrag/schritt-10`, um sicherzustellen, dass nichts überläuft und der Screen kompakter wirkt.
