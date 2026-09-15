# Doppeltes „HRB" in den E-Mail-Vorlagen entfernen

## Problem
In der Fußzeile der E-Mail-Vorlagen (Bestellbestätigung und Rechnungs-E-Mail) steht „Amtsgericht Charlottenburg (Berlin) · HRB HRB 283996 B" – das Kürzel erscheint doppelt.

## Ursache
In `src/lib/email-templates/email-shared.ts` (Zeile 192) wird vor dem gespeicherten Wert der Handelsregisternummer fest der Text „HRB " ausgegeben. Beim Branding ist die Nummer aber bereits mit „HRB 283996 B" gespeichert – daher die Dopplung. Beide E-Mail-Vorlagen nutzen diese gemeinsame Fußzeile, deshalb betrifft es beide.

## Änderung
- `src/lib/email-templates/email-shared.ts`: Das fest eingebaute „HRB " entfällt; die Fußzeile gibt nur noch das Amtsgericht und die im Branding gespeicherte Handelsregisternummer aus (`Amtsgericht … · HRB 283996 B`). Ohne gespeicherte Nummer bleibt als Vorschau-Platzhalter „HRB 00000" stehen.
- Die Rechnungs-Vorlagen (PDF und HTML-Vorschau) geben die Nummer bereits ohne festes „HRB" aus – dort ist nichts zu tun.

## Technisch
- Keine Datenbankänderung, keine Änderung an gespeicherten Branding-Daten.
- Typecheck und Build laufen danach zur Kontrolle.
