# Krone als Favicon

Dein hochgeladenes Kronen-Icon wird das neue Favicon und ersetzt das vor Kurzem generierte grüne „H".

## Umsetzung

1. **Bild aufbereiten**: `krone.png` auf ein quadratisches 64×64-Format bringen (proportional verkleinert, transparent aufgefüllt – nicht gestreckt), damit es im Browser-Tab sauber aussieht.
2. **Datei ersetzen**: Das aufbereitete Bild überschreibt die vorhandene `public/favicon.png`.
3. **Verweis prüfen**: Der Verweis im Code zeigt bereits auf `/favicon.png` – hier ist keine Änderung nötig, die Krone wird automatisch übernommen (auch als Apple-Touch-Icon).

Danach erscheint die goldene Krone im Browser-Tab der gesamten App (Landingpage, Auth und Panel).
