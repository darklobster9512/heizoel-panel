# Neue E-Mail-Vorlage „Rechnung"

Zweite Vorlage im selben Design wie die Auftragsbestätigung, zusätzlich mit kompletten Überweisungsdaten. Auswählbar über die Vorlagen-Liste auf `/admin/emails`, Branding-Auswahl und Desktop-/Handy-Umschaltung funktionieren automatisch mit.

## Inhalt der Rechnungs-Mail

**Kopfbereich & Grundgerüst** — identisch zur Auftragsbestätigung:
- Großer Logo-Block mit Deutschland-Farbbalken, Sterne-Bewertung (gold, 4,9), Akzentlinien.
- Fortschrittsband mit allen drei Schritten auf „erledigt" (Bestellt ✓ / Bestellprüfung ✓ / Rechnung ✓).
- Betreff-Zeile: „Rechnung RE-2609-74568", Anrede, kurzer Einleitungstext.
- Fußbereich wie bisher: Dank-Block, „Über …"-Block, Siegel-Zeile, Bewertungszeile, Logo-Block, Firmenangaben.

**Rechnungsblock (neu)**
- Rechnungs-Kopf mit Rechnungsnummer, Rechnungsdatum und Auftragsnummer.
- Rechnungstabelle im Stil der Bestellübersicht (grünes Kopfteil, gestreifte Zeilen): Produkt, Menge, Preis je 100 Liter, Zwischensumme, USt. 19 %, **Rechnungsbetrag** groß hervorgehoben.

**Überweisungsdaten (neu, Kern der Mail)**
- Deutlich hervorgehobener Kasten „Bitte überweisen Sie":
  - Zahlungsempfänger, Bank, IBAN, BIC
  - Betrag (groß)
  - Verwendungszweck = Bestellnummer (zum Kopieren)
  - Zahlungsziel (z. B. „14 Tage ab Rechnungsdatum")
- Hinweiszeile, dass die Lieferung nach Zahlungseingang disponiert wird.

**Vertrauensleiste, Hinweise, Fragen** — wie in der Auftragsbestätigung, Texte leicht angepasst (z. B. FAQ „Wann wird geliefert? — Nach Zahlungseingang").

## Bankdaten je Branding (neu)

Damit die Rechnung pro Shop echte Daten zeigt, bekommt das Branding drei neue optionale Felder:
- Kontoinhaber, IBAN, Bankname (BIC optional)

Diese werden ergänzt:
- Datenbank: Migration erweitert `brandings` um `account_holder`, `iban`, `bank_name`, `bic` (keine Pflicht, auch für „active" nicht erforderlich).
- Branding-Formular: neuer Abschnitt „Bankverbindung (für Rechnungen)" mit Platzhaltern.
- Typen in `brandings.functions.ts` und `integrations/supabase/types.ts`.

Brandings ohne Bankdaten zeigen in der Vorschau die Beispiel-Bankverbindung.

## Technisch

- Neue Datei `src/lib/email-templates/order-invoice.ts` — gleiche Hilfsfunktionen und Farbpalette; gemeinsame Bausteine (logoBlock, flagBar, stars, Trust-Leiste, Footer) werden in `email-shared.ts` ausgelagert und von beiden Vorlagen genutzt, damit sie nie auseinanderlaufen.
- `admin_.emails.tsx`: Vorlagen-Liste um „Rechnung" erweitert; Auswahl schaltbar, Betreff-Zeile wechselt mit.
- Beispieldaten: `DEMO_INVOICE` (Rechnungsnummer, Datum, USt.-Aufschlüsselung, Zahlungsziel) plus `DEMO_BANK` als Fallback.
- Kein Versand, keine neuen Rechte, RLS unverändert.
- Abschließend Typecheck und Build prüfen.
