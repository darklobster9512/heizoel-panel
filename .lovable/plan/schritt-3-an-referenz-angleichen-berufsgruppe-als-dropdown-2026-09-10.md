# Schritt 3 an Referenz angleichen (Berufsgruppe als Dropdown)

## Ziel
Schritt 3 (`/antrag/schritt-3`) 1:1 wie im Screenshot: statt der Auswahl-Kacheln ein Dropdown mit allen Berufsgruppen.

## Änderungen

### 1. `src/routes/antrag/schritt-3.tsx` umbauen
- Layout bleibt: Fortschrittsbalken 17 %, Abschnittstitel „Beruf“, dann „Warum benötigen wir diese Information?“ (WhyInfo) **über** dem Feld, danach Label „Berufsgruppe“ mit Dropdown.
- Kachel-Liste und Icons entfernen; stattdessen `SelectField` aus `@/components/wizard/ui` verwenden (gleiches Styling wie Hero/Familienstand-Dropdown).
- Vorauswahl: „Angestellte/r“ als Standard im Store (profession), falls nichts gewählt.
- NavButtons (Zurück zu Schritt 2 / Weiter zu Schritt 4) und TrustBlock bleiben.

### 2. Dropdown-Optionen (vollständige Liste)
Angestellte/r, Angestellte/r in Kurzarbeit, Arbeiter/in, Angestellte/r im öffent. Dienst, Facharbeiter/in, Leitende/r Angestellte/r, Rentner/in, Pensionär/in, Angestellte/r in Elternzeit, Angestellte/r über Zeitarbeitsfirma, Angestellte/r im Ausland, Angestelltes ärztliches Fachpersonal, Angestellte/r (Minijob 603 EUR Basis), Angestellte/r (im Krankenstand / Krankengeldbezug), Arbeiter/in im öffent. Dienst, Arbeiter/in in Elternzeit, Arbeitslose, Sozialhilfeempfänger, ohne Beschäftigung, Auszubildende/r, Beamte/r im einfachen Dienst, Beamte/r im gehobenen Dienst, Beamte/r im höheren Dienst, Beamte/r im mittleren Dienst, Hausfrau/-mann, Hilfsarbeite/r, Schüler/in, Selbst. Freiberuflerin, Selbst. Geschäftsführer/in, Selbst. Gewerbetreibende/r, Soldat/in, Soldat/in auf Zeit, Studierende/r, Vorstand, Geschäftsführer/in, Wehrdienstleistende/r

### 3. `src/components/ui/select.tsx` – max. 8 sichtbare Einträge
- `SelectContent` erhält eine Maximalhöhe (8 × Item-Höhe ≈ 320px) mit eigenem Scroll (`max-h-[320px] overflow-y-auto`), damit immer 8 Optionen sichtbar sind und der Rest gescrollt wird.

### 4. Texte
- Abschnitt: „Beruf“
- WhyInfo-Text beibehalten (Erklärung zur Berufsgruppe)
- Label: „Berufsgruppe“

## Verifikation
Build, TypeScript und Playwright-Screenshot von `/antrag/schritt-3`: Dropdown geschlossen/geöffnet (8 sichtbare Einträge + Scroll), Desktop & Mobile.
