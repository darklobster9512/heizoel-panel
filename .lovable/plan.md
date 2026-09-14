# Rechnungsmail gezielt überarbeiten

## Änderungen

- Die Zeile **„Bank / Musterbank“** vollständig aus den Zahlungsinformationen entfernen. Kontoinhaber, IBAN, BIC, Betrag und Verwendungszweck bleiben sichtbar.
- Den gesamten Zahlungsbereich einheitlich in einer ruhigen grünen Gestaltung aufbauen: sanft grünlicher Hintergrund, grüne Akzente und klare Abstände statt der aktuellen wechselnden weißen Flächen.
- Sämtliche horizontalen Trennlinien innerhalb der Zahlungsinformationen entfernen. Die Angaben werden nur durch Abstand und Typografie gegliedert.
- Jeden Hinweis auf ein Zahlungsziel von **14 Tagen** entfernen:
  - aus dem Begrüßungstext,
  - unter dem Rechnungsbetrag,
  - aus dem Ablauf-Schritt „Zahlung“,
  - aus dem unsichtbaren Vorschautext der E-Mail.
- Die Formulierung bleibt neutral: Der Rechnungsbetrag soll auf das angegebene Konto überwiesen werden; die Lieferung wird nach Zahlungseingang disponiert.

## Technische Details

- Nur die Rechnungsvorlage wird angepasst; Auftragsbestätigung, Branding-Daten und Admin-Seite bleiben unverändert.
- Das nicht mehr benötigte Feld `paymentDueDays` wird aus den Rechnungs-Beispieldaten und dem zugehörigen Typ entfernt.
- Anschließend werden Typprüfung und Vorschau-Build kontrolliert.
