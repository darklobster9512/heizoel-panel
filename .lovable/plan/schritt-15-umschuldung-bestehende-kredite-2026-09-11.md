# Schritt 15: Umschuldung & bestehende Kredite

Schritt 15 wird 1:1 nach den drei Screenshots neu aufgebaut. Grundzustand mit 0 Krediten, und pro erhöhter Anzahl erscheint ein kompletter Kreditblock.

## Grundzustand (Screenshot 15-2)

- Fortschritt 81 %
- Überschrift: „Dank Umschuldung zu besseren Kreditkonditionen“
- Text: „Banken bewerten es positiv, wenn Sie Ihre bestehenden Kredite ablösen und nur noch einen einzigen Kredit zurückzahlen müssen.“
- Drei Punkte mit hellgrünen Quadrat-Icons: „Monatliche Rate neu wählen“, „Höhere Kreditsumme beantragen“, „Kredite mit günstigerem Zins ablösen“
- Blaue Hinweisbox: „Eine Umschuldung spart Ihnen Geld und kann Ihre Bonität verbessern. Banken bieten für Umschuldungen oft günstige Zinssätze an.“
- Überschrift „Bestehende Kredite“, Label „Anzahl Bestehende Kredite“, Zähler (Start 0)
- Hinweis darunter: „Wichtig: Baufinanzierungen zählen hier NICHT dazu. Bitte geben Sie hier vorhandene Ratenkredite, Dispos, Leasing und Rahmenkredite an.“
- Danach Speichern/Weiter/Zurück und TÜV-Block wie gehabt

## Pro Kredit (Screenshot 15.1)

Für jede Zahl im Zähler erscheint ein eigener Block „Bestehender Kredit 1“, „… 2“ usw. mit denselben Feldern und unabhängigen Werten:

- Kreditart (Auswahl, Standard „Konsumentenkredit“; weitere: Autokredit, Dispositionskredit, Rahmenkredit, Leasing, Kreditkarte, Sonstiges)
- Ursprünglicher Kreditbetrag – „z.B. 10.000“, Suffix €
- Monatliche Rate – „z.B. 100“, Suffix €
- Kreditbeginn – MM.JJJJ mit automatischer Punkt-Formatierung
- Restlaufzeit bis – MM.JJJJ
- „Wollen Sie diesen Kredit umschulden?“ Ja/Nein
  - bei Ja: oranger Hinweistext „Durch eine Umschuldung können Sie häufig Ihre Ausgaben senken. …“, Feld „Geschätzte Restschuld“ („z.B. 1.250“, €) und der OPTIONAL-Kasten:
    - Badge „OPTIONAL“, Label „Angabe zur Bankverbindung“, Auswahl IBAN / Konto-Nr. & BLZ
    - bei IBAN: Feld „IBAN“ mit Platzhalter „z.B. DE44 5001 0517 8247 8177 38“ und Hinweistext
    - bei Konto-Nr. & BLZ: zwei Felder Kontonummer und BLZ

## Nach den Kreditblöcken (Screenshot 15.2)

Nur sichtbar, wenn mindestens ein Kredit umgeschuldet werden soll:

- Überschrift „Kreditbetrag anpassen“
- Drei Auswahlkacheln: „30.000€ Kreditbetrag nicht anpassen“, „30.000€ Ursprünglich ausgewählten Kreditbetrag um Restschuld der umzuschuldenden Kredite erhöhen“ (vorausgewählt), „Anderen Kreditbetrag angeben“ (bei Auswahl erscheint ein Betragsfeld)
- Auswahl „Kreditlaufzeit“ mit Monatswerten (12–120), Standard aus dem Wizard bzw. 84 Monate
- Der angezeigte Betrag stammt aus dem im Rechner gewählten Kreditbetrag

## Technisch

- `src/lib/wizard-store.tsx`: neues Array `loans: LoanEntry[]` (Kreditart, Betrag, Rate, Beginn, Restlaufzeit, umschulden, Restschuld, Bankverbindungsart, IBAN, Kontonummer, BLZ) plus `loanAmountAdjust` und `loanAmountCustom`; Zähler synchronisiert die Array-Länge wie bereits bei den Nebentätigkeiten in Schritt 7.
- `src/routes/antrag/schritt-15.tsx` wird komplett neu geschrieben; wiederverwendet werden `ProgressBar`, `CounterField`, `SelectField`, `TextField`, `ChoiceTiles`, `NoteBox`, `NavButtons`, `TrustBlock`.
- Die drei grünen Quadrat-Icons werden als kleine Icon-Kacheln (Lucide) direkt in der Seite umgesetzt.
- Keine Änderungen an anderen Schritten oder an der Landingpage.
