# Angebotsseite: Detailbereich exakt wie im Screenshot

Der Detailbereich sieht aktuell wie eine schmale Box neben der Angebotskarte aus. Im Screenshot ist es eine echte zweite Seitenhälfte.

## Was geändert wird

**Aufteilung der Seite**
- Unterhalb der Filterleiste teilt sich die Seite in zwei Spalten: links der graue Angebotsbereich, rechts eine weiße Spalte, die bis zum rechten Bildschirmrand reicht und vom Filterbereich bis zum Footer durchgehend weiß ist.
- Die weiße Spalte ist rund 475 px breit, hat keinen Rahmen und keine abgerundeten Ecken, sondern nur eine feine Trennlinie zur linken Seite.
- Die linke Seite behält den grauen Hintergrund; die Angebotskarte bleibt in ihrer Breite und rutscht mittig in die verbleibende linke Hälfte. Sortierleiste, Garantie-Hinweis und der TÜV-/SCHUFA-Bereich bleiben in der linken Hälfte.

**Aufbau des Detailbereichs**
- Oben eine Zeile: quadratischer Schließen-Button (X) ganz links, danach das Banklogo, rechts der grüne Button „zum Antrag“ (breit, gleiche Höhe wie im Screenshot).
- Darunter die zwei Reiter „Kreditinformationen“ und „Finanzierungskosten“ über die volle Breite; der aktive Reiter ist weiß mit grüner Unterlinie, der inaktive grau hinterlegt.
- Inhalt: „Auszahlung in 5 Tagen“, „Nur 2 Dokumente benötigt“, „Sie können online“, „Ihre Sonderkonditionen“, „Online-Kredit von“ mit Bankadresse – jeweils mit feinen Trennlinien und den grünen Haken bzw. rotem Kreuz wie bisher.
- Ganz unten ein zweiter, über die volle Breite laufender grüner Button „zum Antrag“, der beim Scrollen unten im Detailbereich bleibt.

**Verhalten**
- Öffnen weiterhin per Klick auf die Angebotskarte, Schließen per X oder Escape.
- Auf dem Handy erscheint der Detailbereich wie bisher unterhalb der Karte über die volle Breite.

## Technische Details

- Nur `src/routes/angebote.tsx` wird angepasst.
- Der Hauptbereich wird bei geöffnetem Detail auf ein zweispaltiges Grid (`1fr` / `475px`) über die volle Fensterbreite umgestellt; der `max-w-[1160px]`-Container gilt dann nur noch für die linke Spalte, damit die rechte Spalte bündig am Fensterrand sitzt.
- Das Panel wird `sticky` unterhalb des Headers mit `min-h`/`max-h` auf die Viewporthöhe minus Headerhöhe, innerer Bereich scrollt, Kopf- und Fußzeile des Panels bleiben stehen.
- `border`/`shadow` am Panel entfallen, stattdessen `border-l border-[#e6e7e8]`, Hintergrund weiß.
