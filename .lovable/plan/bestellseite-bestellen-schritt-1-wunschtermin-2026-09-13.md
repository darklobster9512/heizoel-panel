# Bestellseite /bestellen — Schritt 1: Wunschtermin

## Was passiert

1. Auf der Angebotsseite (`/preisrechner/ergebnis`) speichert der Klick auf „Zur Bestellung" alle Auswahldaten lokal im Browser und leitet auf `/bestellen` weiter.
   Gespeichert werden: PLZ + Ort, Liefermenge, Lieferstellen, Schlauchlänge, Tankwagen, frühestes Lieferdatum, Heizölart (Standard/Premium), Preis pro 100 L und Gesamtpreis.
2. `/bestellen` liest diese Daten und zeigt Schritt 1 „Wann soll geliefert werden?" — das Layout aus den Screenshots, aber in Klaro-Optik (Grün statt Gelb, unsere Schrift, Rahmen und Schatten).

## Aufbau der Seite

- **Obere klebende Leiste** (bleibt beim Scrollen sichtbar): links „3.000 L Heizöl Standard" und darunter „3 Lieferstellen · 50667 · Köln", rechts der Gesamtpreis mit „130,33 €/100 L · inkl. MwSt.", grüne Linie darunter.
- **Vertrauenszeile**: 5 goldene Sterne, „4,9 / 5", „Über 25.000 zufriedene Kunden", „Bestellung jederzeit kostenlos stornierbar", rechts „Sichere Bestellung".
- **Siegelzeile**: „GEPRÜFT & SICHER" mit den vorhandenen Siegel-Bildern.
- **Überschrift** „Wann soll geliefert werden?" mit Untertitel und vier Häkchen-Punkten (ohne Anmeldung, Lieferkosten enthalten, Tagespreis garantiert, Daten verschlüsselt).
- **Schrittanzeige**: 1 Termin (aktiv) — 2 Daten & Zahlung.
- **Terminauswahl-Karte** „Wann darf geliefert werden?":
  - Erster Tag = frühestes Lieferdatum aus dem Angebot, mit ermitteltem Wochentag (z. B. „Dienstag · 22.09.2026").
  - Danach die zwei folgenden Werktage (Wochenenden werden übersprungen).
  - Je Tag zwei Auswahlfelder: „Vormittag 8:00 – 12:00 Uhr" und „Nachmittag 15:00 – 18:00 Uhr"; ausgewählter Slot grün umrandet.
  - Wie im Screenshot ist bei den beiden Folgetagen der Vormittag als „soeben gebucht" durchgestrichen und nicht anklickbar.
  - Trenner „— ODER —" und darunter die Option „Termin telefonisch vereinbaren — Lieferfrist: 7 Werktage. Wir melden uns bei Ihnen."
- **Kundenstimmen-Karte** „Das sagen unsere Kunden" mit zwei kurzen Bewertungen.
- **Button** „Weiter zu Ihren Daten".
- **Untere klebende Leiste** (immer sichtbar): Gesamtpreis, „inkl. MwSt. · kostenlose Lieferung", rechts grüner „Weiter"-Button. Der normale Klaro-Footer bleibt am Seitenende darunter.

„Weiter" ist erst aktiv, wenn ein Termin oder die Telefon-Option gewählt ist; der gewählte Termin wird ebenfalls lokal gespeichert. Schritt 2 (Daten & Zahlung) ist noch nicht Teil dieser Aufgabe — der Button zeigt vorerst einen Hinweis, dass Schritt 2 folgt.

Kommt jemand ohne gespeicherte Auswahl auf `/bestellen`, erscheint ein kurzer Hinweis mit Link zum Preisrechner.

## Technische Details

- Neuer Helfer `src/lib/order-draft.ts`: Typ `OrderDraft`, `saveOrderDraft()`, `loadOrderDraft()` über `localStorage` (Key `klaro.order.v1`), Lesen nur nach Hydration (`useEffect`), damit SSR nicht abweicht.
- `src/routes/preisrechner.ergebnis.tsx`: „Zur Bestellung" wird zu einem Button, der `saveOrderDraft(...)` aufruft und dann per `useNavigate` auf `/bestellen` geht.
- Neue Route `src/routes/bestellen.tsx` (`createFileRoute("/bestellen")`) mit eigenem `head()` (Titel, Beschreibung, og-Tags, `robots: noindex`).
- Terminlogik lokal: `earliest` aus dem Draft, dann zwei weitere Werktage via `Date`; Wochentagsname mit `toLocaleDateString("de-DE", { weekday: "long" })`.
- Sticky: obere Leiste `sticky top-[HEADER]` unter dem bestehenden `SiteHeader` (bereits sticky), untere Leiste `sticky bottom-0 z-40` mit Rahmen und Schatten; Hauptinhalt erhält unten Abstand.
- Nur Design-Tokens (`brand`, `line`, `surface`, `ink`, `muted-custom`), keine harten Farbwerte; Sterne wie bisher golden.
