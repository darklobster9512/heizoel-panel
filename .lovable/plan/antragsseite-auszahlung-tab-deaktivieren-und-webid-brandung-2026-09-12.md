# Antragsseite: Auszahlung-Tab deaktivieren und WebID-Brandung

Auf `/kreditantrag/$applicationId` werden zwei kleine Anpassungen an den Reitern vorgenommen.

## Umsetzung

1. **„AUSZAHLUNG“-Tab ausgegraut und nicht anklickbar**
   - Der Tab bleibt sichtbar, erhält aber keinen `onClick`-Handler.
   - Cursor wird auf `cursor-default` gesetzt.
   - Text und Icon erscheinen in einer deutlich ausgegrauten Farbe (z. B. `text-[#c0c0c0]`).
   - Hover-/Aktiv-Effekte entfallen.

2. **Signatur-Brandung von IDnow auf WebID ändern**
   - Überschrift: aus „Signatur mit IDnow.“ wird „Signatur mit WebID.“
   - Der rote Punkt hinter dem Markennamen entfällt.
   - Erklärtext: „… durch unseren Partner die IDnow GmbH …“ wird zu „… durch unseren Partner die WebID GmbH …“.
   - Weitere Vorkommen von „IDnow“ in diesem Reiter werden ebenfalls durch „WebID“ ersetzt.

## Nicht enthalten

- Inhaltliche oder funktionale Änderungen an Dokumenten-Upload, Sidebar, Speicherung oder Adminpanel.
- Änderungen an anderer Stelle der Anwendung, an der eventuell „IDnow“ erwähnt wird.
