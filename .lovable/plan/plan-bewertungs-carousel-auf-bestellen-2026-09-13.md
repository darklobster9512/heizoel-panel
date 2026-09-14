# Plan: Bewertungs-Carousel auf /bestellen

## Ziel
Die Sektion "Das sagen unsere Kunden" auf /bestellen soll lebendiger wirken. Bewertungen sollen automatisch in einem vertikalen Carousel wechseln, wobei neue Eintraege von oben erscheinen.

## Aenderungen

### 1. Bewertungs-Daten erweitern
- In src/routes/bestellen.tsx wird die REVIEWS-Konstante von 2 auf ca. 20 Eintraege erweitert.
- Jeder Eintrag behaelt Name, Zeitangabe und Kurztext.

### 2. Vertikales Auto-Carousel bauen
- Die Bewertungsliste wird zu einem animierten Container umgebaut.
- Alle 5 Sekunden wird die oberste Bewertung entfernt und eine neue Bewertung unten (oder oben) eingefuegt, sodass der Eindruck entsteht, dass Eintraege von oben nach unten durchlaufen.
- Animation: sanfter Uebergang mit Fade/Slide (z. B. via CSS-Transition oder Framer Motion).
- Sichtbar bleiben 2 Bewertungen gleichzeitig.

### 3. Visuelles Feintuning
- Keine manuellen Pfeile oder Punkte noetig, es laeuft automatisch.
- Bei Hover kann die Rotation kurz pausiert werden (optional).
- Hoehe des Containers bleibt stabil, damit sich das Layout nicht verschiebt.

### 4. Keine weiteren Seiten betroffen
- Aenderungen nur in src/routes/bestellen.tsx.
- Andere Seiten mit Kundenbewertungen bleiben unveraendert.

## Pruefung
- /bestellen oeffnen und die Bewertungssektion beobachten.
- Bewertungen wechseln automatisch, neue kommen von oben.
- Keine Layout-Spruenge, Animation flüssig.
