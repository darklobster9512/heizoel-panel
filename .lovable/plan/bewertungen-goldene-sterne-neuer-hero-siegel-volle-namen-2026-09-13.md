# /bewertungen: Goldene Sterne + neuer Hero + Siegel + volle Namen

Datei: `src/routes/bewertungen.tsx`

## 1. Goldene Sterne überall
- Die lokale `Stars`-Komponente nutzt aktuell lucide-`Star` in Grün (`text-brand`). Ersetzen durch dasselbe goldene SVG-Stern-Icon wie im Footer: `<svg viewBox="0 0 24 24" className="fill-[#f1a319]">` mit dem Stern-Pfad (5 Stück, `size` über Prop steuerbar).
- Wirkt auf: Gesamtbewertung im Hero und die Sterne in allen 8 Bewertungskarten.

## 2. Neuer Hero (nach Screenshot-Vorlage)
Bestehender Seitenkopf + separate „Gesamtbewertung"-Box und Kennzahlen-Leiste werden zu einem gemeinsamen Hero-Bereich (`bg-surface`, zentriert) umgebaut:

- H1: „Kundenbewertungen & Vertrauen"
- Untertitel: „Über 33.000 zufriedene Kunden bewerten uns mit 4,99 von 5 Sternen"
- Darunter zentriert: 5 große goldene Sterne, darunter „4,99 / 5" (groß, fett) und „Basierend auf 33.429 verifizierten Bewertungen"
- Darunter eine Kennzahlen-Leiste mit 5 Werten (zentriert, ohne Karten-Rahmen, Trennung durch dezente Linien):
  - 33.429 Kunden
  - 4,99/5 Bewertung
  - 98,9 % Zufriedenheit
  - 500+ Händler
  - 10+ Jahre Erfahrung

Hinweis: Damit Hero und Rest der Seite zusammenpassen, werden die Zahlen auf der Seite vereinheitlicht auf 4,99 / 33.429 / 98,9 % (statt 4,9 / 33.000 / 98 %). Meta-Description entsprechend angepasst.

## 3. Neue Sektion „Unsere Zertifizierungen & Siegel"
Direkt im Anschluss an den Hero (vor „Das sagen unsere Kunden"):
- Titel + Unterzeile: „Geprüfte Qualität und Sicherheit — von unabhängigen Instituten bestätigt"
- 4 Karten im Grid (Desktop 4 Spalten, Tablet 2, Mobil 1), jeweils mit Icon in grünem Kreis, Titel und Text:
  - **eKomi Gold** (Award-Icon) — „Höchste Auszeichnung für Kundenzufriedenheit. Nur vergeben an Unternehmen mit mindestens 4,8/5 Sternen."
  - **SSL-Verschlüsselung** (Lock-Icon) — „256-bit SSL-Verschlüsselung nach Bankstandard. Ihre Daten sind jederzeit geschützt."
  - **DSGVO-konform** (ShieldCheck-Icon) — „Vollständig DSGVO-konform. Keine Datenweitergabe an Dritte."
  - **Festpreis-Garantie** (BadgeCheck-/FileText-Icon) — „Schriftliche Preisbindung. Ihr Preis bleibt fixiert bis zur Lieferung."

Die bestehende „Warum … vertrauen"-Sektion (TRUST_POINTS) wird entfernt, da die Inhalte (Festpreis, Erfahrung, Händler) durch den Hero und die Siegel-Sektion abgedeckt sind.

## 4. Volle Namen bei den Bewertungen
In `REVIEWS` die abgekürzten Namen durch vollständige (erfundene) Namen ersetzen, z. B.:
- Sabine K. → Sabine Krüger
- Thomas M. → Thomas Meier
- Julia F. → Julia Fischer
- Michael W. → Michael Wagner
- Petra S. → Petra Schulz
- Andreas B. → Andreas Becker
- Monika L. → Monika Lang
- Ralf Z. → Ralf Zimmermann

## Technisch
- Nur `src/routes/bewertungen.tsx` wird angepasst (Icons aus lucide-react: Award, Lock, ShieldCheck, BadgeCheck).
- Keine neuen Abhängigkeiten, Header/Footer/CTA-Banner bleiben unverändert.
- Danach Build-Log prüfen und Desktop-/Mobil-Screenshots der neuen Hero- und Siegel-Bereiche verifizieren.
