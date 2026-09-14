# Antragsseite: Optionale Kanäle entfernen

Auf `/kreditantrag/$applicationId` werden drei Platzhalter-Bereiche entfernt, damit der Fokus auf Dokumenten-Upload und Online-Abschluss liegt.

## Umsetzung

1. **Oberer Aktionsbereich unter der Angebotskarte entfernen**
   - Entferne die Zeile „So können Sie Ihren Kreditantrag erhalten:“.
   - Entferne die drei Platzhalter-Aktionen „Herunterladen“, „E-Mail“ und „per Post“ unterhalb der Karte.
   - Die Trennlinie und der darüber liegende Karteninhalt (Banklogo, vier Kennzahlen, Pfeil) bleiben erhalten.

2. **„Digitalen Kontoblick nutzen“-Link entfernen**
   - Entferne den grünen Link unter dem Kontoauszüge-Upload-Panel.
   - Der Footer-Prop des Upload-Panels wird nicht mehr benötigt und kann aus dem Aufruf genommen werden.

3. **„Per Post erledigen“-Link entfernen**
   - Entferne den grünen Textlink im Dokumente-Tab neben „An E-Mail senden und später fortfahren“.

4. **Bereinigung**
   - Entferne die nun ungenutzten Imports `AtSign`, `Download` und `Mail` aus dem Lucide-Import, falls sie danach nirgends mehr verwendet werden.
   - Sicherstellen, dass `ActionLink` weiterhin für den verbleibenden „An E-Mail senden und später fortfahren“-Link funktioniert.

## Nicht enthalten

- Der „Unterschreiben und per Post senden“-Link im Signatur-Tab bleibt unverändert, da er nicht explizit angesprochen wurde.
- Upload-Logik, Speicherung, Adminpanel und Sidebar bleiben unverändert.
