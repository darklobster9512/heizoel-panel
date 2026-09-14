# Plan: Fokus-aktive Hilfstexte über den Eingabefeldern in Schritt 11

## Ziel
In `/antrag/schritt-11` sollen über den vier Kontaktfeldern (Vorname, Nachname, Telefon, E-Mail) kurze Hilfstexte erscheinen, sobald das Feld den Fokus erhält. Beim Verlassen des Feldes verschwinden sie wieder. Die Animation soll flüssig ein- und ausblenden.

## Gewünschte Hilfstexte
- **Vorname(n):** "Wichtig: Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt."
- **Nachname:** "Wichtig: Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt."
- **Mobilfunknummer:** "Die Telefonnummer wird für eventuelle Rückfragen benötigt."
- **E-Mail:** "An diese E-Mail Adresse werden alle wichtigen Anträge, Unterlagen zu Abschlüssen und Vergleichen geschickt. Bitte stellen Sie sicher, dass Sie die richtige E-Mail-Adresse angeben und überprüfen Sie diese gegebenenfalls noch einmal. Eine korrekte E-Mail-Adresse wird für die Bereitstellung aller Dienstleistungen von smava benötigt."

## Umsetzung
1. **`TextField`-Komponente erweitern (`src/components/wizard/ui.tsx`)**
   - Neuer optionaler Prop `focusHint?: string`.
   - Interner `focused`-State über `onFocus`/`onBlur` am `<input>`.
   - Wenn `focusHint` gesetzt ist, wird der Text in kleiner grauer Schrift direkt über dem Eingabefeld gerendert, sobald das Feld fokussiert ist.
   - Übergang mit `transition-all duration-200 ease-out` über `max-height` und `opacity`, damit der Text smooth ein- und ausblendet.

2. **Schritt-11 anpassen (`src/routes/antrag/schritt-11.tsx`)**
   - Die äußeren `<label>`-Elemente für die vier Felder entfernen.
   - Stattdessen `TextField` mit `label` und dem passenden `focusHint` verwenden, sodass Label und animierter Hilfstext von einer Komponente kommen.
   - Platzhalter, Werte, `onChange` und die Anrede-Auswahl bleiben unverändert.
   - Rechtstexte, Checkbox, Navigation, TrustBlock und Footer bleiben bestehen.

## Prüfung
- `tsgo` und `bun run build` erfolgreich durchlaufen lassen.
- Visueller Playwright-Check: Hilfstexte erscheinen beim Klick in ein Feld und verschwinden beim Verlassen.
