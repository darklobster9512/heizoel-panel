# Auth-Seite: Registrierung vereinfachen und Live-Kurse ergänzen

## Änderungen

- Das Namensfeld aus der Registrierung entfernen; für ein neues Konto werden nur E-Mail, Passwort und Passwortbestätigung benötigt.
- Die Registrierung ohne `full_name` an Supabase senden. Login, E-Mail-Bestätigung und anschließende Rollenfreigabe bleiben unverändert.
- Die linke Desktop-Spalte als aktive Klaro-Leitstelle weiterentwickeln, ohne den gewählten dunklen Tactical-Stil zu verlassen.
- Einen Bereich „Live-Kurse“ mit Bitcoin, Ethereum, Monero und Solana integrieren – angelehnt an die Auth-Seite des Referenzprojekts.
- Für jeden Kurs den Euro-Wert und die 24-Stunden-Änderung mit klarer positiver/negativer Kennzeichnung anzeigen.
- Kurse beim Öffnen laden und danach automatisch alle 60 Sekunden über die kostenlose CoinGecko-Schnittstelle aktualisieren.
- Ladezustand, letzte Aktualisierung und einen unaufdringlichen Fehlerzustand vorsehen, damit die Auth-Seite auch bei API-Limits vollständig nutzbar bleibt.
- Mehr Bewegung durch kontrollierte Kurswechsel, pulsierende Live-Anzeige, laufende Signallinie und gestaffelte Einblendungen schaffen; reduzierte Bewegung in den Systemeinstellungen respektieren.
- Auf Mobilgeräten die Kursübersicht kompakt oberhalb des Formulars zeigen, damit die neue Information nicht vollständig verschwindet.

## Technische Details

- Keine kostenpflichtige Schnittstelle und kein API-Schlüssel erforderlich.
- Kursdaten werden ausschließlich zur Anzeige verwendet; Anmeldung und Registrierung bleiben unabhängig davon funktionsfähig.
- Bestehende Klaro-Farben, Roboto, semantische Farbtokens und die vorhandenen Eingabe- und Schaltflächen bleiben erhalten.

## Prüfung

- Registrierung ohne Namen testen.
- Kurswerte, Euro-Formatierung, 24-Stunden-Trend, Aktualisierung sowie Lade- und Fehlerzustand prüfen.
- Auth-Seite auf Desktop und Smartphone visuell prüfen.
- Typprüfung und aktuellen Projektstatus kontrollieren.
