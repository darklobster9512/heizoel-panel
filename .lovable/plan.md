# Zahlungsart „Rechnung": ebenfalls 50 % Anzahlung

Bestellungen mit der Zahlungsart `rechnung` werden derzeit wie Vorkasse behandelt — es wird der volle Betrag zur Überweisung ausgewiesen. Künftig gilt für sie dieselbe Regel wie für EC-Karte und Barzahlung.

## Verhalten

- Zahlungsart „Rechnung" löst eine **Anzahlung von 50 %** zur Sicherung des Tagespreises aus.
- Überweisungsbetrag = kaufmännisch gerundete 50 % des Gesamtbetrags, Restbetrag = Gesamtbetrag minus Anzahlung.
- Restzahlungstext: „nach Lieferung per Rechnung innerhalb der Zahlungsfrist".
- Gesamtbetrag, Netto und MwSt. in der Rechnungsübersicht bleiben unverändert — nur der zu überweisende Betrag ändert sich.

## Wo es sichtbar wird

- **Rechnungs-E-Mail**: Einleitung, Zahlungsblock („Bitte überweisen Sie als Anzahlung"), Ablaufschritte und Hinweise weisen 50 %, Anzahlungsbetrag und Restbetrag aus.
- **HTML-Rechnung und PDF**: Anzahlungs-Kennzeichnung, Anzahlungsbetrag, Restbetrag und spätere Zahlungsweise wie bei EC/Bar.
- **Bankkonto-Limits**: die gespeicherte Rechnungssumme wird auf den tatsächlich zu überweisenden Anzahlungsbetrag gesetzt.

## Technisch

- `src/lib/payment-method.ts`: neuer normalisierter Typ `rechnung` (erkennt `rechnung`, `aufrechnung`, `kauf auf rechnung`), Label „Rechnung", `isDeposit: true`, eigener `restText`.
- Alle Ausgabestellen (`invoice-data.ts`, `invoice-html.ts`, `invoice-pdf.server.ts`, `order-invoice.ts`, `invoices.functions.ts`) nutzen bereits `paymentTerms` — keine weiteren Änderungen nötig.
- Tests für `rechnung` (E-Mail, HTML, PDF-Modell) ergänzen, Vorkasse-Gegenprobe behalten; danach Typprüfung und Build.

Bereits versendete Rechnungen mit Zahlungsart „Rechnung" müssen nach der Änderung erneut generiert werden.
