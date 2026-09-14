# `/preisrechner`: Vorteils-Sektion an Hero-Card andocken und seriöser stylen

## Ziel
Die Sektion „Warum bei Klaro bestellen?“ auf `/preisrechner` wirkt aktuell wie eine abgekoppelte, graue Kachel-Fläche und daher unseriös. Sie soll visuell direkt unter die Preisrechner-Hero-Card rücken und wie ein zusammengehöriger, ruhiger Trust-Bereich der Card gestaltet werden.

## Änderungen

### 1. `src/routes/preisrechner.tsx` — Sektion an die Card andocken
- Die aktuelle separate `section` mit `bg-surface` und eigenem Container wird aufgelöst.
- Stattdessen wird der Inhalt direkt **unterhalb der bestehenden Hero-Card** gerendert, im **gleichen `max-w-5xl`-Container** wie die Card.
- Visuell wird der Bereich zur Card gehörig gestaltet:
  - gleicher Hintergrund wie die Card (`bg-background`),
  - gleicher Rahmen (`border-line`) an den Seiten und unten,
  - abgerundete untere Ecken (`rounded-b-xl`),
  - kein zusätzlicher Schatten, damit es flach an die Card anschließt,
  - dezenteres Padding (z. B. `py-8 md:py-10`).
- Die obere Trennlinie zum Card-Inhalt bleibt sichtbar (`border-t`), damit der Bereich klar als unterer Abschnitt der Card lesbar ist.

### 2. Kacheln kompakter und einheitlicher gestalten
- Die 6 Kacheln (5 Vorteile + Bewertung) werden in einem **horizontalen, responsiven Grid** angeordnet:
  - Desktop: 6 Spalten nebeneinander,
  - Tablet: 3 Spalten,
  - Mobile: 2 Spalten.
- Kacheln bekommen einen dezenteren Look:
  - kein eigener Rahmen, kein Hover-Effekt,
  - Icon + Titel zentriert oder leicht linksbündig,
  - kleinere Schrift, weniger Abstand,
  - Icon-Kreise bleiben in der aktuellen dezenten grünen Fassung.
- Die Bewertungskachel (4,99/5 Sternen) erhält dasselbe kompakte Format wie die Vorteils-Kacheln, damit sie nicht mehr wie ein aufgesetztes Widget wirkt.

### 3. Überschrift dezenter
- „Warum bei Klaro bestellen?“ bleibt erhalten, wird aber kleiner und weniger dominant platziert (z. B. `text-lg`/`text-xl`, zentriert über dem Grid).

### 4. Keine inhaltlichen Änderungen
- Texte, Icons und Bewertungszahlen bleiben unverändert.
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard`, `/admin` oder der Startseite.
- Keine Backend-/Antragsstrecken-Änderungen.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite, insbesondere der Übergang von Hero-Card zu Vorteils-Bereich.
- Prüfen, dass der Bereich visuell mit der Card verschmolzen wirkt und die Kacheln harmonisch skalieren.
