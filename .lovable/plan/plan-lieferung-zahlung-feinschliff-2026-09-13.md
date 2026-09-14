# Plan: /lieferung-zahlung Feinschliff

## Ziel
Drei visuelle Anpassungen auf der Seite `/lieferung-zahlung`:
1. Grüne Topline an den 4 USP-Kacheln.
2. Grüne Sideline an den 3 Zahlungsarten-Karten.
3. Weniger Abstand zwischen der Zahlungsarten-Sektion und der darunter folgenden CTA-Sektion (`ReferralBanner`).

## Änderungen

### Datei: `src/routes/lieferung-zahlung.tsx`

#### 1. USP-Kacheln: grüne Topline
- **Aktuell:** `rounded-xl border border-line bg-card p-5 text-center shadow-sm`
- **Neu:** `rounded-xl border border-line border-t-4 border-t-brand bg-card p-5 text-center shadow-sm`
- Betrifft die 4 Kacheln in der `USPS.map()`-Schleife (Zeile 123 ff.).

#### 2. Zahlungsarten-Karten: grüne Sideline
- **Aktuell:** `flex flex-col gap-5 rounded-xl border border-line bg-card p-5 shadow-sm md:flex-row md:items-start`
- **Neu:** `flex flex-col gap-5 rounded-xl border border-line border-l-4 border-l-brand bg-card p-5 shadow-sm md:flex-row md:items-start`
- Betrifft die 3 `article`-Elemente in `PAYMENT_METHODS.map()` (Zeile 221 ff.).

#### 3. Abstand zur CTA-Sektion verringern
- **Aktuell:** Die Zahlungsarten-Sektion hat `py-12 md:py-16` (Zeile 201).
- **Neu:** `pt-12 pb-6 md:pt-16 md:pb-8` (nur der untere Abstand wird reduziert, damit die CTA näher rückt).
- Alternativ, falls der `ReferralBanner` selbst noch Abstand mitbringt: dessen oberen Abstand prüfen und ggf. ebenfalls reduzieren.

## Nicht im Scope
- Keine Änderungen an Header, Footer, Inhalten oder Bildern.
- Keine neuen Abhängigkeiten.

## Validierung
- Build prüfen (`build-errors.log`).
- Desktop- und Mobile-Screenshots der `/lieferung-zahlung`-Seite erstellen, um die drei Änderungen zu verifizieren.
