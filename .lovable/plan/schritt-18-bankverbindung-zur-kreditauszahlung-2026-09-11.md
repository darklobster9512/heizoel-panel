# Schritt 18: Bankverbindung zur Kreditauszahlung

Nach Schritt 17 kommt ein neuer Schritt 18 (`/antrag/schritt-18`), 1:1 nach den beiden Screenshots (18.png = IBAN-Variante, 18.1.png = Konto-Nr. & BLZ-Variante). Danach geht es zur Abschlussseite `/antrag/fertig`.

## Aufbau (wie Screenshots)

1. Fortschrittsbalken fast voll, Text darunter: **„Nur noch 2 Schritte“** (statt „X % geschafft“ — `ProgressBar` erhält optionalen `label`-Prop).
2. Überschrift: **„Ihre Angebote werden jetzt bei den Banken abgefragt“**
3. Einleitung: „Dafür wird von den Banken ein Konto in Ihrem Namen vorausgesetzt. So schützen die Banken Sie und sich selbst vor Betrug.“
4. Label „Bankverbindung zur Kreditauszahlung“ und zwei nebeneinander liegende Auswahlkacheln mit Radio-Punkt: **IBAN** (vorausgewählt) und **Konto-Nr. & BLZ** — gleiche Optik wie die Kacheln in Schritt 17 (ausgewählt = grüner Rahmen, Fläche #eff8f1).
5. Bedingte Felder:
   - **IBAN gewählt:** Feld „IBAN“ mit Platzhalter „z.B. DE44 5001 0517 8247 8177 38“.
   - **Konto-Nr. & BLZ gewählt:** „Land“ (Dropdown, gleiche 11 Länder wie Schritt 13, Standard Deutschland), „Kontonummer“ (Platzhalter „z.B. 0648489890“), „Bankleitzahl“ (Platzhalter „z.B. 50010517“).
6. Sicherheitszeile: TÜV-Siegel (hochgeladene `tüv.svg`), SSL-Siegel (hochgeladenes `ssl.png`) und Text „TÜV-geprüfte und SSL-verschlüsselte Verbindung“.
7. Buttons wie Schritt 17: **Speichern** (Umriss) + **Weiter →** (grün) nebeneinander, darunter **← Zurück** volle Breite. Weiter → `/antrag/fertig`, Zurück → `/antrag/schritt-17`.
8. `TrustBlock` darunter.

## Technische Schritte

1. `ssl.png` und `tüv.svg` aus den Uploads als CDN-Assets anlegen (`lovable-assets create`).
2. `WizardData` um `bankDetailType` ("iban" | "konto"), `bankIban`, `bankCountry`, `bankAccountNumber`, `bankCode` erweitern (Default: `bankDetailType: "iban"`, `bankCountry: "Deutschland"`).
3. `ProgressBar` in `src/components/wizard/ui.tsx` um optionales `label` erweitern.
4. Neue Route `src/routes/antrag/schritt-18.tsx` mit eigenem `head()` (Titel „Schritt 18: Bankverbindung – smava Kreditanfrage“, `robots: noindex`).
5. Schritt 17: „Weiter“ zeigt auf `/antrag/schritt-18` statt `/antrag/fertig`.
6. `fertig.tsx`: Bankdaten optional in den `loan_applications`-Insert aufnehmen (nur wenn Spalten vorhanden — sonst weglassen, keine Migration nötig).

## Validierung

- `bun run build` erfolgreich.
- Playwright: `/antrag/schritt-18` öffnen, IBAN-Standard prüfen, auf „Konto-Nr. & BLZ“ klicken und die drei Felder (Land/Kontonummer/Bankleitzahl) prüfen, Siegelzeile und Buttons prüfen, Weiter führt zu `/antrag/fertig`.
