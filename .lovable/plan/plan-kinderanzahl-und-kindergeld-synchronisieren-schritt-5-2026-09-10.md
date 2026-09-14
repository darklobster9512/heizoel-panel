# Plan: Kinderanzahl und Kindergeld synchronisieren (Schritt 5)

## Ziel
Wenn der Nutzer in Schritt 5 die "Anzahl Kinder im Haushalt" erhöht, soll die "Anzahl kindergeldberechtigter Kinder" automatisch den gleichen Wert übernehmen. Anschließend kann der Nutzer den Kindergeld-Wert manuell wieder runterstellen.

## Aktueller Stand
In `src/routes/antrag/schritt-5.tsx` wird bei Änderung der Kinderanzahl derzeit `childrenKindergeld` auf `Math.min(v, bisheriger Kindergeld-Wert)` gesetzt. Das heißt beim Hochstufen der Kinderzahl erhöht sich der Kindergeld-Wert nur bis zum bisherigen Wert, nicht automatisch auf die neue Anzahl.

## Änderung
1. In `src/routes/antrag/schritt-5.tsx` die `onChange`-Logik des Kinder-Counters anpassen:
   - Wenn die neue Kinderanzahl größer als die aktuelle Kinderanzahl ist (`v > data.children`): `childrenKindergeld` auf `v` setzen.
   - Wenn die Kinderanzahl reduziert wird: `childrenKindergeld` auf `Math.min(v, data.childrenKindergeld ?? 0)` capen.
2. Sicherstellen, dass der `max`-Wert des Kindergeld-Counters weiterhin von `data.children` abgeleitet wird.

## Validierung
- `bun run build` ausführen.
- Wizard bis Schritt 5 navigieren und prüfen: Hochstufen der Kinderanzahl erhöht den Kindergeld-Wert identisch; anschließendes Runterstellen des Kindergeld-Werts ist möglich.