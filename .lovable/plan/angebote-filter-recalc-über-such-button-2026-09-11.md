# /angebote Filter-Recalc über Such-Button

## Ziel

Auf `/angebote` führen Änderungen in den oberen Filterfeldern (Kreditbetrag, Laufzeit, Versicherung) nicht mehr sofort zu neuen Angeboten. Stattdessen färbt sich der Such-Button grün, sobald die Werte vom zuletzt gesuchten Stand abweichen. Erst beim Klick auf den Button lädt die Seite die Angebote mit den neuen Daten neu – mit der bekannten 10-Sekunden-Ladephase und Skeleton-Karten.

## Was passiert

### 1. Zustand trennen: Formular vs. Suche

In `src/routes/angebote.tsx` werden zwei Wertesätze geführt:

- **Formular-Werte** (`amount`, `term`, `insurance`) – steuern die Eingabefelder.
- **Suche-Werte** (`searchAmount`, `searchTerm`, `searchInsurance`) – bestimmen die berechneten Angebote und das Detailpanel.

Beim ersten Laden werden beide Sätze aus `sessionStorage` (`smava-wizard`) initialisiert. Die `offers`-Berechnung und das `OfferDetailsPanel` verwenden ausschließlich die Suche-Werte.

### 2. Such-Button wird aktiv

Der bisher rein dekorative Such-Button im Filterbalken wird klickbar. Er vergleicht die Formular-Werte mit den Suche-Werten:

- **Identisch:** grauer Hintergrund (`#e6e7e8`), normales Such-Icon.
- **Abweichend:** grüner Hintergrund (`#39a949`), weißes Such-Icon, Mauszeiger als Pointer.

Der Button ist nur im geladenen Zustand sichtbar/klickbar (während der Ladephase bleibt der Filterbalken wie bisher ausgeblendet).

### 3. Klick auslöst Neuladen

Beim Klick auf den Such-Button:

1. Formular-Werte werden in die Suche-Werte übernommen.
2. Die neuen Suche-Werte werden in `sessionStorage` geschrieben (`amount`, `termMonths`, `insurance`).
3. `loading` wird auf `true` und `progress` auf `0` gesetzt.
4. Der bestehende Lade-Mechanismus startet neu und zeigt 10 Sekunden lang den Fortschrittsbalken und Skeleton-Karten.
5. Nach Ablauf der 10 Sekunden werden die Angebote mit den neuen Werten berechnet und angezeigt.

### 4. Technische Anpassungen

- Der `useEffect` für die 10-Sekunden-Ladephase wird so umgebaut, dass er neu startet, sobald `loading` wieder `true` wird (bisher läuft er nur beim Mount).
- Der `useEffect`, der bisher jede Formular-Änderung sofort in `sessionStorage` geschrieben hat, entfällt. Stattdessen erfolgt das Speichern explizit beim Such-Klick.
- `FilterBar` erhält nur die Formular-Werte und einen `onSearch`-Callback; es berechnet selbst den "dirty"-Zustand.
- `offers`, `selected`, `GuaranteeNote`, `TrustBlock` und das `OfferDetailsPanel` nutzen die Suche-Werte.

## Technische Hinweise

- Keine neue Server-Funktion oder Datenbankänderung nötig.
- Datei: `src/routes/angebote.tsx`.
- Nach der Änderung: Typecheck laufen lassen und die Seite in der Vorschui kurz testen (Filter ändern → Button grün → Klick → Ladebildschirm → neue Sortierung).
