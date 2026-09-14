# Live-Bestellungen-Element harmonisieren

## Ziel
Das Live-Bestellungen-Element in der rechten Kartenhälfte auf `/preisrechner` soll ruhiger, übersichtlicher und harmonischer wirken. Es behält den Live-Charakter bei, reduziert aber visuellen Lärm.

## Änderungen an `src/routes/preisrechner.tsx`

### LiveOrders-Komponente
- **Kein „LIVE"-Label und kein großer Punkt mehr** – die Kopfzeile mit dem großen grünen Dot und dem Schriftzug entfällt.
- **Kleiner grüner Punkt pulsiert** – ein dezenter, pulsierender Status-Dot (z. B. mit `animate-pulse`) bleibt erhalten, damit der Live-Eindruck besteht.
- **Kein Gesamtpreis** – die Zeile „Gesamt: … €" wird entfernt.
- **Kein Fortschrittsbalken** – der 5-Sekunden-Balken unten entfällt.
- **Grünes Glühen bei Wechsel** – bei jeder neuen Bestellung leuchtet der Hintergrund des Elements kurz (ca. 0,6–0,9 s) in einem sehr dezenten Akzentgrün auf (`#22C55E` / `#4ADE80` mit niedriger Opazität, z. B. 5–8 %), um den Wechsel sichtbar, aber nicht verspielt zu machen.
- **Bold-Reduktion** – fett bleiben nur noch die Stadt und der Preis pro 100L. Literzahl, PLZ, Zeitangabe und ggf. Begleittexte werden in normaler Gewichtung dargestellt.
- **Zufälliges Intervall** – der Wechsel erfolgt zufällig alle 5–10 Sekunden statt fix alle 5 Sekunden.
- **Layout** – das Element nutzt die verfügbare Breite weiterhin voll aus, wirkt aber durch weniger Informationen und weniger Fettschrift aufgeräumter.

## Design-Abstimmung
- Hintergrund bleibt weiß/neutral, das grüne Glühen ist ein kurzer Akzent-Effekt.
- Keine Glas-/Blur-/Drift-Effekte; ruhige Linien und dezente Schatten beibehalten.

## Validierung
- Preview auf `/preisrechner` prüfen: Element ist schlanker, Punkt pulsiert, Hintergrund glüht kurz bei Wechsel, Intervall variiert.
