# Plan: /bestellen Schritt 2 — Daten & Zahlung

## Ziel
Klick auf „Weiter zu Ihren Daten" (bzw. „Weiter" in der unteren Leiste) führt — nur wenn ein Liefertermin gewählt ist — zu Schritt 2 der Bestellung. Aufbau und Inhalte folgen den Referenz-Screenshots (bestellen3–6), in unserem Klaro-Design (Grün statt Gelb).

## Änderungen (nur `src/routes/bestellen.tsx`)

### 1. Schritt-Logik
- Neuer State `step: 1 | 2`. „Weiter"-Buttons prüfen: ohne gewählten Termin passiert nichts (Button bleibt deaktiviert bzw. Hinweis), mit Termin Wechsel zu Schritt 2 und Scroll nach oben.
- Schritt 2 zeigt eine Fortschrittszeile: Schritt 1 „Termin" abgehakt (grüner Haken), Schritt 2 „Daten & Zahlung" aktiv.
- Button „Zurück zum Termin" kehrt zu Schritt 1 zurück (gewählter Termin bleibt erhalten).

### 2. Kopfbereich Schritt 2
- Titel „Fast fertig — nur noch Ihre Daten" mit Unterzeile „Ihr Termin ist reserviert. Noch wenige Angaben und Ihre Bestellung ist abgeschlossen."
- Bestehende Vertrauenszeile (Bewertung, sichere Bestellung) und Checkliste bleiben oben erhalten.

### 3. Formular-Karten
- **Kontakt:** E-Mail-Adresse*, Telefonnummer* (mit Hinweis „Wichtig: Der Lieferfahrer ruft Sie 30 Min. vor Ankunft an.").
- **Lieferadresse:** Anrede (Herr/Frau/Firma als Auswahlbuttons), Vorname*, Nachname*, Straße*, Nr.*, PLZ* und Ort* — PLZ/Ort aus dem gespeicherten Auftrag vorbefüllt.
- **Weitere Angaben (optional):** Checkbox „Andere Rechnungsadresse?" — bei Aktivierung klappt ein zweites Adressformular (Anrede, Vor-/Nachname, Straße, Nr., PLZ, Ort) auf; darunter Textfeld „Hinweise zur Lieferung (optional)".
- **Zahlungsmethode:** Vorkasse (SEPA) mit „BELIEBT"-Badge, Barzahlung, EC-Karte, Rechnung — jeweils mit Icon, Kurzbeschreibung und Hinweis „Neukunden: 50 % Anzahlung" (außer Vorkasse). Auswahl per Radio-Kreis, eine Option vorausgewählt.
- Kartenkopf wie bisher: Icon-Kachel + Titel, dezente Rahmen, grüne Akzente.

### 4. Validierung & Abschluss
- Pflichtfelder werden beim Klick auf „Jetzt verbindlich bestellen" geprüft; fehlende/ungültige Felder bekommen einen roten Rahmen und Hinweistext. E-Mail- und PLZ-Format werden geprüft.
- Großer grüner Button „Jetzt verbindlich bestellen" (weißer Text) unter dem Formular sowie Button in der sticky Preisleiste.
- Nach erfolgreichem Absenden: Erfolgsansicht/Bestätigung direkt auf der Seite (Bestellnummer-Platzhalter, Zusammenfassung Termin + Menge + Preis).

### 5. Sticky-Elemente
- Obere schmale Leiste (Menge/Sorte links, Preis rechts) und untere Preisleiste bleiben auch in Schritt 2 sticky; unterer Button heißt in Schritt 2 „Bestellen" und löst dieselbe Validierung aus.
- Navbar und Footer bleiben auf /bestellen weiterhin ausgeblendet.

## Prüfung
- Playwright: Termin wählen → Weiter → Schritt 2 sichtbar; ohne Termin kein Wechsel.
- Validierung testen (leere Pflichtfelder, ungültige E-Mail).
- Rechnungsadresse-Checkbox auf-/zuklappen, Zurück-Button, Desktop + Mobil.
