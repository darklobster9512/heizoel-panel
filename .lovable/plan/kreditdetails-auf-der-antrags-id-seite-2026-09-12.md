# Kreditdetails auf der Antrags-ID-Seite

## Ziel
Auf `/kreditantrag/$applicationId` wird ausschließlich die bestehende Bank-Kreditantragskarte interaktiv. Die Angebotsseite `/angebote` bleibt unverändert.

## Umsetzung
- Die Bankkarte erhält beim Darüberfahren eine grüne Umrandung, ohne dass sich Größe oder Position der umliegenden Inhalte verschieben.
- Die komplette Karte sowie der Pfeil rechts öffnen beim Klick eine Detailansicht von rechts.
- Auf breiten Bildschirmen teilt sich die Seite wie in der Vorlage:
  - links bleiben Zurück-Link, Bankkarte und Dokumentenbereich sichtbar,
  - rechts erscheint eine weiße, bis zum rechten Bildschirmrand reichende Detailspalte,
  - die aktive Bankkarte bleibt grün markiert.
- Die rechte Detailspalte übernimmt den Aufbau der Vorlage:
  - Schließen-Kreuz und mittig ausgerichtetes Banklogo,
  - Reiter „Kreditinformationen“ und „Finanzierungskosten“,
  - Auszahlung, benötigte Dokumente, Online-Abschluss, Sonderkonditionen und vollständige Bankanschrift,
  - untere Aktionen „Download“ und „Per Post“.
- „Finanzierungskosten“ zeigt die im Antrag gespeicherten Werte für Kreditbetrag, Laufzeit, Effektivzins, Monatsrate, Gesamtbetrag und Zinskosten.
- Die zur Antrags-ID gespeicherte Bank wird über ihre Bank-ID geladen, damit Auszahlung, Dokumente, Konditionen und Anschrift zur tatsächlich gewählten Bank passen.
- Die Detailansicht schließt über das Kreuz oder die Escape-Taste. Auf kleinen Bildschirmen erscheint sie als nahezu vollbreite Ansicht über dem Seiteninhalt.

## Prüfung
- Hover und Klick auf die Bankkarte auf der Antrags-ID-Seite testen.
- Darstellung gegen die hochgeladene Vorlage bei Desktopbreite vergleichen.
- Beide Reiter, Schließen per Kreuz/Escape sowie mobile Darstellung prüfen.
- Sicherstellen, dass `/angebote` nicht verändert wurde.
