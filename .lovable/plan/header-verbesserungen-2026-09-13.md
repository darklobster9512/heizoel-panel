# Header-Verbesserungen

## Ziel
Den Header auf Landingpage und `/preisrechner` feinjustieren: Logo klickbar machen, Dropdown-Breite an Text anpassen und eine grüne Topline im Dropdown ergänzen.

## Änderungen

### 1. Logo verlinkt zur Startseite
- In `src/components/landing/site-header.tsx` das `Logo`-Element in einen `<Link to="/">` wrappen.
- Sicherstellen, dass Styling und Größe des Logos unverändert bleiben.

### 2. Dropdown-Breite reduzieren
- Aktuell hat das Dropdown eine feste Breite von `w-[420px]`.
- Stattdessen `min-w-fit` oder `w-max` verwenden, damit die Box nur so breit wird wie der längste Eintrag plus Padding.
- Padding und Abstände der Einträge beibehalten, damit es nicht geklebt wirkt.

### 3. Grüne Topline im Dropdown
- Am oberen Rand des Dropdown-Inhalts (`<div className="overflow-hidden rounded-lg ...">`) eine 2–3 px hohe Leiste in Akzentgrün (`bg-brand`) ergänzen.
- Die runden Ecken der Karte sollen erhalten bleiben, d. h. die Topline liegt innerhalb der abgerundeten Fläche.

## Technische Details
- Datei: `src/components/landing/site-header.tsx`
- Keine neuen Abhängigkeiten.
- Tailwind-Klassen: `Link`, `min-w-fit`/`w-max`, `bg-brand`.
- Keine Änderungen an Mobile-Header oder anderen Seiten.

## Akzeptanzkriterien
- Klick auf das Klaro-Logo leitet zu `/` weiter.
- HEIZÖLPREISE-Dropdown ist nur so breit wie der längste Eintrag.
- Dropdown hat eine sichtbare grüne Linie am oberen Rand.
- Build läuft fehlerfrei.
