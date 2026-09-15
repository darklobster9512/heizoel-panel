# „HRB"-Dopplung auch in der Rechnung absichern

## Lage
- E-Mail-Vorlagen: behoben – das feste „HRB " ist entfernt, es wird nur noch der im Branding gespeicherte Wert ausgegeben.
- Rechnung (PDF und HTML-Vorschau): Dort wird die Handelsregisternummer bereits ohne festen Zusatz direkt aus dem Branding übernommen (`src/lib/invoice/invoice-pdf.server.ts`, `src/lib/invoice/invoice-html.ts`, Aufbau in `src/lib/invoice/invoice-data.ts`). Ein festes „HRB" gibt es dort nicht – eine Dopplung kann nur entstehen, wenn der gespeicherte Wert selbst doppelt ist (z. B. „HRB HRB 283996 B").

## Änderung
1. Neue kleine Hilfsfunktion (z. B. in `src/lib/iban.ts` umbenanntem/neuem Format-Modul oder `src/lib/invoice/invoice-data.ts`): `cleanRegisterNumber(value)` – entfernt ein versehentlich doppelt eingegebenes „HRB HRB" zu einem einfachen „HRB" und räumt überflüssige Leerzeichen auf.
2. Anwendung an allen Ausgabestellen:
   - E-Mail-Fußzeile (`src/lib/email-templates/email-shared.ts`)
   - Rechnungsmodell (`src/lib/invoice/invoice-data.ts` → gilt damit für PDF, HTML-Vorschau und generierte Rechnungen)
3. Beim Speichern eines Brandings (`src/lib/brandings.functions.ts`) wird der Wert ebenfalls bereinigt, damit die Datenbank sauber bleibt.

## Ergebnis
Egal ob „HRB 283996 B" oder versehentlich „HRB HRB 283996 B" gespeichert ist – E-Mails und Rechnungen zeigen immer genau einmal „HRB 283996 B".

## Technisch
- Keine Datenbankänderung, keine Schema-Änderung.
- Typecheck und Build zur Kontrolle; bestehende Rechnungs-PDF-Tests bleiben unberührt.
