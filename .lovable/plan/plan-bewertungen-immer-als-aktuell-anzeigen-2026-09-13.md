# Plan: Bewertungen immer als aktuell anzeigen

## Ziel
Alle Bewertungen in der Carousel-Sektion auf /bestellen sollen als innerhalb der letzten 7 Tage abgegeben dargestellt werden, damit die Sektion immer frisch wirkt.

## Aenderungen

### 1. Statische Zeitangaben entfernen
- In src/routes/bestellen.tsx wird das Feld `when` aus der REVIEWS-Datenstruktur entfernt.
- Stattdessen wird fuer jede Bewertung ein fester Offset in Tagen hinterlegt (z. B. 1 bis 7 Tage), der sich aus der ID ableitet.

### 2. Dynamische relative Zeitlabels
- Ein Helper generiert aus dem aktuellen Datum und dem Offset einen Text wie "vor 3 Tagen" oder "vor 6 Tagen".
- Das Label wird beim Rendern der Carousel-Eintraege berechnet, sodass es immer zum heutigen Tag passt.
- Alle sichtbaren Bewertungen liegen damit automatisch innerhalb der letzten 7 Tage.

### 3. Keine weiteren Seiten betroffen
- Aenderungen nur in src/routes/bestellen.tsx.
- Inhalt und Reihenfolge der 20 Bewertungen bleiben erhalten.

## Pruefung
- /bestellen oeffnen und die Bewertungssektion pruefen.
- Alle angezeigten Zeitangaben sollten "vor X Tagen" mit X zwischen 1 und 7 sein.
- Carousel-Animation laeuft weiterhin wie gewohnt.
