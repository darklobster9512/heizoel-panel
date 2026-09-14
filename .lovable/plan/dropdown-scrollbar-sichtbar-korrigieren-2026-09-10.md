# Dropdown-Scrollbar sichtbar korrigieren

## Ziel
Im geöffneten Berufsgruppen-Dropdown ist rechts dauerhaft eine klar sichtbare Scrollbar zu sehen. Die Liste zeigt weiterhin ungefähr acht Optionen gleichzeitig und lässt sich darüber zu allen weiteren Einträgen scrollen.

## Umsetzung
- Die Scroll-Funktion und Scrollbar-Stile vom äußeren Dropdown-Rahmen auf die tatsächlich scrollende innere Optionsliste verschieben.
- Der Optionsliste eine feste Maximalhöhe für ungefähr acht Einträge geben und vertikales Scrollen erzwingen.
- Rechts eine dauerhaft sichtbare, ausreichend breite graue Scrollspur mit deutlich dunklerem Schieber darstellen; keine Overlay-Scrollbar, die erst beim Scrollen erscheint.
- Die bereits entfernten Pfeil-Schaltflächen bleiben entfernt.
- Trigger, Optionen, Texte, Auswahlfarbe und Hoverfarbe unverändert lassen.

## Prüfung
- Schritt 3 öffnen und kontrollieren, dass die Scrollbar sofort rechts sichtbar ist.
- Mit Maus am Schieber und Mausrad bis zu den letzten der 33 Optionen scrollen.
- Geschlossenen Zustand und andere Dropdowns auf unverändertes Aussehen prüfen.
