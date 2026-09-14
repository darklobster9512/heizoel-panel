# Plan: 5-Sekunden-Ladescreen vor dem Heizölangebot

## Ziel
Nach Klick auf „Jetzt Heizölpreise vergleichen“ wird sowohl auf der Startseite als auch auf `/preisrechner` der gesamte Inhalt unterhalb des bestehenden Headers durch einen Ladescreen ersetzt. Nach exakt 5 Sekunden öffnet sich automatisch `/preisrechner/ergebnis` mit den eingegebenen Angaben.

## Umsetzung

### Gemeinsamer Ladescreen
- Einen wiederverwendbaren Ladescreen im Klaro-Design erstellen, angelehnt an den Screenshot: viel Weißraum, kompakter Inhalt mittig und ruhige Ladeanimation.
- Angezeigte Daten dynamisch aus dem Rechner übernehmen, zum Beispiel „für PLZ 50667 · 3.000 Liter“.
- Inhalt in dieser Reihenfolge einblenden:
  1. animierter Lade-Kreis und „Besten Preis suchen…“
  2. PLZ und Liefermenge
  3. „Aktuelle Marktdaten eingelesen“
  4. „Günstigsten Lieferanten gefunden“
  5. „Tagesaktueller Preis berechnet“
  6. abschließende Vertrauenszeile
- Die Punkte erscheinen zeitlich versetzt von oben nach unten und bleiben anschließend sichtbar.
- Grün als Klaro-Akzent verwenden; keine gelbe Fremdmarken-Gestaltung übernehmen.
- Animationen bei reduzierter Bewegung auf einfache Einblendungen reduzieren.

### Ablauf auf beiden Seiten
- Die gemeinsame Rechner-Karte übergibt beim Klick PLZ, Menge und Abladestellen an die jeweilige Seite.
- Nur bei gültiger fünfstelliger PLZ und zulässiger Liefermenge beginnt der Ladeablauf.
- Startseite und `/preisrechner` schalten auf denselben Vollflächen-Ladescreen um; der jeweilige Header bleibt unverändert sichtbar.
- Navigation, Seiteninhalte und Footer unterhalb des Headers sind während dieser 5 Sekunden vollständig ausgeblendet.
- Mehrfachklicks werden verhindert und laufende Timer beim Verlassen der Seite sauber beendet.
- Nach 5 Sekunden erfolgt die Weiterleitung mit unveränderten Suchwerten zu `/preisrechner/ergebnis`.

## Technische Details
- Neue kleine `PriceSearchLoading`-Komponente für Darstellung und gestaffelte Zustände.
- `OfferCard` erhält statt des direkten Ergebnis-Links einen kontrollierten Start-Callback.
- `index.tsx`, `hero.tsx` und `preisrechner.index.tsx` verwalten den seitenweiten Lade-Zustand und tauschen nur den Bereich unter dem Header aus.
- Bestehende Ergebnisberechnung und URL-Parameter bleiben unverändert.

## Prüfung
- Startseite und `/preisrechner`: Daten eingeben, Button klicken, Header bleibt stehen und restliche Seite verschwindet.
- Reihenfolge und Timing aller Ladeelemente sowie Weiterleitung nach 5 Sekunden prüfen.
- Übernommene PLZ, Menge und Abladestellen auf der Ergebnisseite kontrollieren.
- Darstellung auf Desktop und Mobil testen.
