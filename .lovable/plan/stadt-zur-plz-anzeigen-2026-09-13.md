# Stadt zur PLZ anzeigen

Ziel: Wenn eine PLZ eingegeben wird und die Angebotsseite erscheint, steht überall "50667 Köln" statt nur "50667" — auch in der aufgeklappten Ändern-Ansicht.

## Umsetzung

- Kostenloser Dienst ohne Anmeldung und ohne Schlüssel: Zippopotam.us (`https://api.zippopotam.us/de/50667`) liefert den Ortsnamen zur deutschen Postleitzahl.
- Neuer kleiner Helfer `src/lib/plz-city.ts`: holt den Ort zu einer 5-stelligen PLZ, merkt sich bereits abgefragte PLZ im Speicher, damit dieselbe PLZ nicht mehrfach abgefragt wird.
- Auf `/preisrechner/ergebnis` wird der Ort nach dem Laden ermittelt und angezeigt:
  - in der Lieferdaten-Zeile: `50667 Köln`
  - in der aufgeklappten Ändern-Ansicht in der PLZ-Zeile: `50667 Köln` (fett) mit dem grauen, unterstrichenen "ändern"-Link daneben.
- Solange die Abfrage läuft oder keine Stadt gefunden wird, bleibt einfach nur die PLZ stehen — kein Ladetext, kein Fehlerhinweis.
- Die Eingabe in der Rechner-Karte auf der Startseite und auf `/preisrechner` bleibt unverändert; die Stadt wird erst auf der Angebotsseite ergänzt.

## Technische Details

- `src/lib/plz-city.ts`: `lookupPlzCity(plz: string): Promise<string | null>` mit `Map`-Cache; Abbruch bei ungültiger Länge; `places[0]["place name"]` aus der Antwort.
- `src/routes/preisrechner.ergebnis.tsx`: `const [city, setCity] = useState<string | null>(null)` plus `useEffect` auf `plz`; abgeleiteter Anzeigewert `plzLabel = city ? \`${plz} ${city}\` : plz` an beiden Anzeigestellen (Zeile ~193 und ~213). Anfrage nur clientseitig, veraltete Antworten werden verworfen.
