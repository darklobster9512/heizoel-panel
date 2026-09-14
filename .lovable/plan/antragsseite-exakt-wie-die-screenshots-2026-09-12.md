# Antragsseite exakt wie die Screenshots

Die Seite `/kreditantrag/<ID>` wird komplett an die drei Screenshots angeglichen.

## 1. Kopfbereich und Angebotskarte

- Zurück-Link heißt „zurück zu den Angeboten“ (Pfeil links), grau, über der Karte.
- Angebotskarte: Banklogo oben links, darunter eine Zeile mit vier Werten nebeneinander:
  Kreditbetrag (z. B. „9.000 €“), Monate (z. B. „36“), Zins (eff.) (z. B. „8,99 %“), mtl. Rate (z. B. „284,70 €“) – jeweils fett mit grauer Beschriftung darunter. Ganz rechts ein grauer Pfeil (>).
- Kein grüner Kasten, keine Antragsnummer, kein Versicherungstext in der Karte.
- Darunter, durch eine feine Linie getrennt, eine Zeile:
  „So können Sie Ihren Kreditantrag erhalten:“ und rechts drei Aktionen mit Icon:
  „Herunterladen“, „E-Mail“, „per Post“.

## 2. Block „Letzter Schritt und Ihr Geld ist auf dem Weg“

- Überschrift wie im Screenshot, darunter direkt die Reiter – der bisherige Erklärsatz entfällt.
- Drei Reiter mit Icon über dem Text (Dokument-Icon, Stift-Icon, Münz-Icon):
  DOKUMENTE, SIGNATUR, AUSZAHLUNG. Aktiver Reiter grün mit grünem Unterstrich,
  inaktive grau, alle auf weißem Hintergrund (keine graue Fläche).

## 3. Reiter „Dokumente“

- Zwischenüberschrift „Dokumente einreichen“.
- Zwei hellgraue Panels mit Aufklapp-Pfeil rechts:
  - „Gehaltsabrechnung (0)“ mit grünem Untertitel „Die letzten zwei Gehaltsabrechnungen“
  - „Kontoauszüge (0)“ mit grünem Untertitel „fortlaufende Kontoauszüge der letzten 30 Tage“
  Die Zahl in Klammern zählt die hochgeladenen Dateien mit.
- In jedem Panel eine gestrichelte Ablagefläche:
  Text „Sie können Ihre Dateien hier ablegen oder“, darunter der grüne Button
  „Dateien hochladen“ (Upload-Icon links, kompakt – nicht über die volle Breite),
  darunter klein „JPEG, HEIC, PNG, TIFF oder PDF - Max: 10MB“.
- Unter dem Kontoauszüge-Panel: „oder **Digitalen Kontoblick nutzen**“ (grüner Link, Platzhalter).
- Hochgeladene Dateien werden weiterhin unter der Ablagefläche gelistet und können entfernt werden.
- Darunter ein weißer Button mit grünem Rahmen und grüner Schrift „Weiter ›“ (nicht grün gefüllt).
- Darunter zwei grüne Textlinks mit Icon nebeneinander:
  „An E-Mail senden und später fortfahren“ und „Per Post erledigen“.
- Der bisherige Kasten „Sie möchten später fortfahren?“ entfällt.

## 4. Reiter „Signatur“

- Überschrift „Signatur mit IDnow.“
- Drei Zeilen mit grünen Icons: „Ausweis/Reisepass bereithalten“,
  „Per Video-Anruf identifizieren“, „Vertrag digital unterschreiben“.
- Fetter Hinweis: Identifikation und Signatur werden im Auftrag der Bank durch die
  IDnow GmbH durchgeführt (Bankname dynamisch).
- Grauer Absatz mit Link „Datenschutzerklärung“.
- Breiter grüner Button „Zur digitalen Unterschrift“.
- Trenner „oder“, darunter zwei grüne Links: „An E-Mail senden und später fortfahren“
  und „Unterschreiben und per Post senden“.

## 5. Reiter „Auszahlung“

- Bleibt inhaltlich wie bisher (Bank, Betrag, Rate, Gesamtbetrag), optisch an den neuen Stil angepasst.

## 6. Sonstiges

- Der TÜV-/Vertrauensblock unter der Karte entfällt; direkt darunter kommt der bekannte Footer (wie im Screenshot).
- Seitenbreite und Abstände werden an die Screenshots angeglichen (schmalere, zentrierte Spalte, weiße Karten auf hellgrauem Hintergrund).

## Technische Hinweise

- Nur `src/routes/kreditantrag.$applicationId.tsx` wird geändert (Darstellung); Upload-,
  Speicher- und Adminlogik bleiben unverändert.
- „Herunterladen“, „E-Mail“, „per Post“, „Digitalen Kontoblick nutzen“ und
  „Zur digitalen Unterschrift“ sind vorerst Platzhalter ohne Funktion.
- IDnow wird als Schriftzug (Text) dargestellt, kein fremdes Logo-Asset.
