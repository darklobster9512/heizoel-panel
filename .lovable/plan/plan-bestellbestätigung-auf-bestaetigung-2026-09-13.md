# Plan: Bestellbestätigung auf /bestaetigung

## Ziel
Nach dem verbindlichen Bestellen in Schritt 2 wird der Kunde auf eine eigene Seite `/bestaetigung` weitergeleitet. Dort erscheinen wieder die normale Kopfnavigation und die Fußzeile, dazu eine Bestellbestätigung mit allen Angaben aus der Bestellung — Aufbau wie im Screenshot, in Klaro-Grün statt Gelb.

## Aufbau der neuen Seite
- Grüner Kreis mit Haken, Titel „Bestellung eingegangen!", Unterzeile „Vielen Dank für Ihre Heizölbestellung.", darunter Pille „Bestellnr. #…" (aus Datum + Zufallszahl erzeugt, beim Absenden festgelegt).
- Grünlicher Hinweiskasten „Fast geschafft — es kommt noch eine E-Mail": Bestellung eingegangen, zweite E-Mail zur Terminbestätigung folgt, Rückruf nur bei Unklarheiten unter der angegebenen Telefonnummer.
- Bestellübersicht-Karte: Sorte (Heizöl Standard/Premium), Menge in Liter, Preis / 100 Liter, Liefertermin (Wochentag, Datum, Zeitfenster bzw. „telefonische Absprache"), unten Gesamtpreis „inkl. Lieferung & MwSt." und rechts „Festpreis ✓ / bindend bei Bestellung".
- Zwei Kacheln nebeneinander: „Lieferort" (Name bzw. Firma, Straße + Nr., PLZ + Ort) und „Bestätigung per E-Mail" (E-Mail-Adresse, Hinweis auf Spam-Ordner).
- Vertrauensband: „Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!" plus Siegel und Bewertung 4,9/5 mit 25.000+ Bewertungen (goldene Sterne).
- Karte „Ihre Vorteile" mit drei Punkten (günstigste Preise, deutschlandweite Lieferung inklusive, 100 % Käuferschutz) — Formulierungen wie im Screenshot.
- Abschluss: Button „Zurück zur Startseite" und Link zum Preisrechner.
- Kopf- und Fußbereich der Website sind auf dieser Seite normal sichtbar.

## Ablauf
- Beim Klick auf „Jetzt verbindlich bestellen" werden nach erfolgreicher Prüfung alle Angaben (Kontakt, Liefer- und Rechnungsadresse, Zahlungsart, Hinweise, Termin, Menge, Preise, Bestellnummer) gespeichert und der Kunde wird auf `/bestaetigung` geleitet.
- Die bisherige Bestätigungsansicht innerhalb der Bestellseite entfällt.
- Ruft jemand `/bestaetigung` ohne Bestellung auf, erscheint ein freundlicher Hinweis „Keine Bestellung gefunden" mit Link zum Preisrechner.

## Technische Details
- `src/lib/order-draft.ts`: neuer Typ `OrderConfirmation` (Draft-Felder + `orderNo`, `email`, `phone`, `delivery`, `billing?`, `notes`, `payment`, `placedAt`) mit `saveOrderConfirmation` / `loadOrderConfirmation` unter dem Key `klaro.order.confirmed.v1`.
- Neue Route `src/routes/bestaetigung.tsx` mit `head()` (`robots: noindex`), Laden der Daten in `useEffect` nach der Hydration, `SiteHeader` und `SiteFooter`.
- `src/routes/bestellen.tsx`: `submit()` speichert die Bestätigung und navigiert zu `/bestaetigung`; `submitted`-Ansicht und zugehöriger State werden entfernt.
- Ausschließlich Design-Tokens; Sterne golden.

## Prüfung
- Playwright: Bestellung mit Termin und ausgefülltem Formular abschließen → Weiterleitung auf `/bestaetigung`, Angaben stimmen, Kopf/Fuß sichtbar; Desktop und Mobil; Direktaufruf ohne Bestellung.
