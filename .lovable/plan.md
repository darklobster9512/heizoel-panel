# Reiter „Rechnung" mit A4-Vorschau und PDF-Download

Neuer Menüpunkt **Rechnung** (`/admin/rechnung`) im Adminbereich. Links wird eine echte Bestellung ausgewählt, rechts erscheint die fertige Rechnung im DIN-A4-Format — mit den Firmendaten des zugehörigen Brandings. Ein Knopf erzeugt daraus eine echte PDF-Datei zum Download.

## Aufbau der Seite

- Links: Suchfeld und Liste der Bestellungen (Bestellnummer, Kunde, Datum, Betrag). Zusätzlich ganz oben ein Eintrag „Beispielrechnung", falls noch keine Bestellung existiert.
- Wahl des Brandings: standardmäßig das Branding der Bestellung; umschaltbar, um andere Layouts zu prüfen.
- Rechts: die Rechnung als A4-Seite (210 × 297 mm) in einer Vorschau, skalierbar auf die Bildschirmbreite.
- Knopf „PDF herunterladen" erzeugt die Datei `Rechnung_<Bestellnummer>.pdf`.

## Inhalt der Rechnung (nach deiner Beispielvorlage)

- Kopf: Logo des Brandings (oder Schriftzug mit Deutschland-Balken wie in den E-Mails) links, rechts Firmenname, Straße, PLZ/Ort, E-Mail.
- Absenderzeile klein über der Anschrift: „Firma · Straße, PLZ Ort".
- Empfängeranschrift aus der Rechnungsadresse der Bestellung (sonst Lieferadresse), mit Anrede.
- Infoblock rechts: Rechnungs-Nr. (= Bestellnummer), Kunden-Nr., Datum, Zahlungsart.
- Kunden-Nr. wird fest aus der Bestellnummer berechnet (Format `K` + 5 Ziffern) — bleibt für dieselbe Bestellung immer identisch.
- Überschrift „Rechnung Nr. …", Anrede, zwei kurze Absätze (Dank + Hinweis, dass die Zahlungsdaten per E-Mail folgen).
- Grün hinterlegter Kasten „Bestätigter Liefertermin" mit Termin, Lieferadresse und Menge/Heizölart.
- Positionstabelle: Pos., Beschreibung (Heizöl Standard/Premium, Zusatzzeile DIN 51603-1 · inkl. Lieferung · Tagespreis), Menge in Litern, Einzelpreis je 100 L, Gesamt.
- Summenblock: Nettobetrag, zzgl. 19 % MwSt., Gesamtbetrag inkl. MwSt. (rückgerechnet aus dem Bruttopreis).
- Fußzeile dreispaltig: Firmenanschrift · Handelsregister (Amtsgericht, HRB, USt-IdNr.) · Zahlungshinweis.

Fehlende Angaben im Branding werden durch neutrale Platzhalter ersetzt, damit die Seite nie leer wirkt.

## Technische Details

- `src/lib/invoice/invoice-data.ts`: gemeinsame Aufbereitung (`InvoiceModel`) aus `Order` + `Branding` — Kunden-Nr. aus Bestellnummer, Netto/MwSt., formatierte Adressen, Terminzeile, Zahlungsart-Label.
- `src/lib/invoice/invoice-html.ts`: reine Funktion `renderInvoiceHtml(model)` → A4-HTML mit `@page { size: A4; margin: 0 }`, feste 210 × 297 mm Seite, Inline-Styles, gleiche Farbtoken wie die E-Mail-Vorlagen. Anzeige im `iframe` (`srcDoc`), skaliert per CSS-`transform`.
- PDF: Server-Funktion `renderInvoicePdf` in `src/lib/invoice.functions.ts` (`createServerFn`, `requireSupabaseAuth` + Admin-Check über `has_role`). Da im Worker-Runtime kein Headless-Browser läuft, wird das PDF mit **pdf-lib** direkt gezeichnet (`bun add pdf-lib`) — ein Layout-Modul `src/lib/invoice/invoice-pdf.server.ts` setzt dasselbe `InvoiceModel` auf eine A4-Seite um (Standard-Schrift Helvetica, Logo per eingebettetem PNG/JPEG, falls im Branding vorhanden). Rückgabe als Base64, Download im Browser über einen Blob.
- Beide Ausgaben speisen sich aus demselben `InvoiceModel`, damit Vorschau und PDF nie auseinanderlaufen.
- Bestellungen kommen über das vorhandene `listOrders`/`getOrder` aus `src/lib/orders.functions.ts`, Brandings über `listBrandings`.
- Route `src/routes/_authenticated/admin_.rechnung.tsx` mit `AdminPageShell active="invoice"`, eigener `head()` mit `noindex`.
- `admin-nav.tsx`, `admin-page-shell.tsx`, `app-shell.tsx` um `"invoice"` bzw. `/admin/rechnung` erweitern (Icon: Dokument).
- Keine Datenbankänderung, kein Versand. Abschließend Typecheck, Build und eine Sichtprüfung des erzeugten PDFs (Seite als Bild rendern und kontrollieren).
