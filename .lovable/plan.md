# Rechnungsmail: IBAN/BIC in normaler Schriftart

## Ziel
In der Rechnungs-E-Mail sollen IBAN und BIC nicht mehr in einer Monospace-Schrift dargestellt werden, sondern in der gleichen Schriftart wie alle anderen Texte im E-Mail-Template.

## Änderungen

1. `src/lib/email-templates/order-invoice.ts`
   - Helper `bankRow(label, value, mono)` entfernt den `mono`-Parameter bzw. ignoriert ihn.
   - IBAN und BIC bekommen dieselbe Schriftdefinition wie "Zahlungsempfänger" (`font:700 13px/18px ${FONT};color:${HEADING}`).
   - Keine weiteren visuellen Änderungen am Zahlungskasten.

## Nicht im Scope
- Der Verwendungszweck-Block bleibt unverändert.
- Keine Änderungen an Farben, Abständen oder anderen Templates.

## Validierung
- Typecheck `bunx tsgo --noEmit` sauber.
- Build sauber.
- Vorschau unter `/admin/emails` zeigt IBAN/BIC in normaler Schrift.
