# `/preisrechner`: Hero-Card mit integrierten Schritten und Bewertung in Vorteilssektion

## Ziel
Die `/preisrechner`-Seite visuell verdichten: Der Rechner und der 3-Schritte-Ablauf werden zu einer gemeinsamen, zentrierten Hero-Card nebeneinander angeordnet. Die separate Bewertungssektion wird aufgelöst und als 6. Kachel in die „Warum bei Klaro bestellen?"-Sektion integriert.

## Änderungen

### 1. `src/routes/preisrechner.tsx` — Hero umbauen
- Der Hero-Bereich wird nicht mehr als volle 2-Spalten-Seite (Text links, Card rechts) aufgebaut.
- Stattdessen eine **mittig zentrierte Card/Container** mit `max-w-5xl` (o. ä.) und zwei gleich breiten Hälften:
  - **Links:** `OfferCard` (Heizöl-Rechner mit PLZ, Menge, Abladestellen, CTA).
  - **Rechts:** Der bisherige 3-Schritte-Ablauf („In 3 Schritten zum günstigen Heizöl") als **vertikale, kompakte Liste** (Schritt-Icon, Titel, kurzer Text untereinander).
- Die separate `<Steps />`-Komponente wird **nicht mehr unter dem Hero** gerendert, sondern der Inhalt wird in die rechte Hälfte der Hero-Card übernommen.
- Überschrift und Intro-Text des Rechners bleiben erhalten; ggf. wird ein kurzer Hero-Titel oberhalb der Card ergänzt.

### 2. `src/components/landing/sections.tsx` — Steps-Daten exportieren
- Die `STEPS`-Konstante und ggf. die Schritt-Icons/Metadaten werden exportiert, damit `preisrechner.tsx` sie für die kompakte vertikale Darstellung nutzen kann.
- Die bestehende `Steps()`-Komponente selbst bleibt unverändert, falls sie auf der Startseite weiterhin verwendet wird.

### 3. `src/routes/preisrechner.tsx` — „Warum bei Klaro bestellen?" erweitern
- Die 5 bestehenden Vorteils-Kacheln bleiben erhalten.
- Eine **6. Kachel** wird ergänzt:
  - Icon: 5 goldene Sterne (wie bisher in der Bewertungssektion).
  - Titel: „4,99 / 5 Sternen".
  - Untertitel: „Ausgezeichnet".
  - Text: „Basierend auf über 33.000 Kundenbewertungen".
- Die separate Bewertungssektion (aktuell zwischen „Warum Klaro" und SEO-Texten) wird **entfernt**.

### 4. SEO-Texte
- Die vier SEO-Textblöcke bleiben unverändert unter den Vorteils-Kacheln.

## Technisch
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard`, `/admin` oder der Startseite.
- Keine Backend-/Antragsstrecken-Änderungen.
- Icons weiterhin aus `lucide-react` bzw. bestehenden SVG-Assets.
- Responsives Verhalten: Auf Mobile bricht die Hero-Card in eine Spalte (Rechner zuerst, Schritte darunter); die 6 Vorteils-Kacheln bleiben 1/2/3-spaltig.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite.
- Prüfen, dass die separate Bewertungssektion nicht mehr existiert und die 6. Kachel mit Bewertung sichtbar ist.
