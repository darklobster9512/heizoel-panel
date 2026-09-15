IBAN live formatieren beim Bankkonto-Formular

## Ziel
Während der Eingabe der IBAN im Dialog „Bankkonto hinzufügen / bearbeiten" soll die Nummer automatisch in 4er-Blöcken mit Leerzeichen dargestellt werden (z. B. `DE89 3704 0044 0532 0130 00`).

## Was passiert
1. Helper `formatIban(value: string): string` anlegen.
   - Entfernt alle Nicht-Buchstaben/Zahlen.
   - Konvertiert in Großbuchstaben.
   - Fügt alle 4 Zeichen ein Leerzeichen ein.
   - Begrenzt auf maximal 34 alphanumerische Zeichen (längste gültige IBAN).
2. In `src/routes/_authenticated/admin_.bankkonten.tsx` das IBAN-Input-Feld anpassen:
   - `onChange` ruft `formatIban` auf und speichert das formatierte Ergebnis im Formular-State.
   - `inputMode="text"` beibehalten, `placeholder="DE89 3704 0044 0532 0130 00"`.
3. Server-seitige Normalisierung in `src/lib/bank-accounts.functions.ts` bleibt unverändert (Leerzeichen werden vor dem Speichern entfernt und in Großbuchstaben umgewandelt).
4. Keine Datenbank-Änderung nötig.

## Dateien
- `src/lib/utils.ts` oder `src/lib/bank-accounts.functions.ts`: Helper `formatIban`
- `src/routes/_authenticated/admin_.bankkonten.tsx`: IBAN-Input `onChange`

## Nicht im Scope
- Keine IBAN-Prüfziffern-Validierung.
- Keine Änderung an BIC, Limit oder anderen Feldern.
