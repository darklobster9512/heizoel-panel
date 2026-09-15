# Bestellungen-Tabelle: Spalten neu anordnen und erweitern

## Ziel
In `/admin/bestellungen` werden die Tabellenspalten exakt nach der gewünschten Reihenfolge dargestellt und mit Telefon-Kopieren, Art (Standard/Premium) und Abweichender Lieferanschrift ergänzt. Mobile Karten werden angepasst, damit die wichtigsten Daten weiterhin sichtbar sind.

## Was sich ändert

### Desktop-Tabelle
Neue Spaltenreihenfolge:
1. **Datum (& Uhrzeit)** – `placedAt` mit Uhrzeit.
2. **NR** – Bestellnummer (`orderNumber`).
3. **Summe** – `total` als Euro.
4. **Kunde** – Name aus `deliveryAddress` bzw. Firma/E-Mail.
5. **Telefonnummer** – klickbar, kopiert sofort in die Zwischenablage.
6. **Menge** – `liters` in Liter.
7. **Ort** – PLZ + Stadt.
8. **Art** – `standard` oder `premium`.
9. **Abw. Lieferanschrift** – rotes X, wenn Rechnungsadresse mit Lieferadresse übereinstimmt; grüner Haken, wenn eine abweichende Rechnungsadresse vorhanden ist.
10. **Branding** – Branding-Name.
11. **Status** – bestehendes Dropdown-Select.

### Interaktionen
- **Telefonnummer**: Klick/Enter auf die Zahl kopiert sie, zeigt kurzen Toast und stoppt die Zeilenauswahl, damit das Popup nicht aufgeht.
- **Abw. Lieferanschrift**: Icon wird mit Tooltip/Title versehen (`Keine Abweichung` / `Abweichende Lieferanschrift`).
- Zeile selbst bleibt klickbar und öffnet das bestehende Detail-Popup.
- Status-Select in der Zeile bleibt unverändert funktionsfähig.

### Mobile Karten
Die Karten behalten Hauptinfos und werden leicht umformatiert, damit sie nicht überladen werden:
- Bestellnummer + Status oben.
- Datum, Branding, Kunde, Ort.
- Menge, Summe, Art, Abweichung (Icon), Telefon-Kopieren-Button.

## Technische Umsetzung
- Bearbeitung von `src/routes/_authenticated/admin_.bestellungen.tsx`:
  - Tabelle neu aufbauen mit der obigen Spaltenreihenfolge.
  - Hilfsfunktionen/Inline-Logik hinzufügen:
    - Datum mit Uhrzeit formatieren (`de-DE`, `medium` + Zeit).
    - `hasDeviation(order)` prüft, ob `billingAddress` ein Objekt mit mindestens einem Wert enthält.
    - `variantLabel(order)` für "Standard" / "Premium".
    - `copyPhone(phone)` nutzt `navigator.clipboard.writeText` und `toast.success`.
  - Mobile Karte anpassen, ohne Funktionalität zu verlieren.
- Keine Serverfunktionen oder Datenbankänderungen nötig; vorhandene Felder (`phone`, `billingAddress`, `variant`, `deliveryAddress`, `brandingName`, `total`, `liters`, `status`) werden lediglich anders dargestellt.
- Typecheck mit `bunx tsgo --noEmit` und Build-Fehlerlog prüfen.
