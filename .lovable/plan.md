# Auth-Seite als „Klaro Operations Center“ neu gestalten

## Zielbild

Die bestehende `/auth`-Seite wird vollständig zur ausgewählten **Tactical Command Terminal**-Richtung umgebaut: ein bildschirmfüllender, dunkler Mitarbeiterzugang wie eine ruhige, sichere Heizöl-Leitstelle. Die Komposition wird deutlich dichter, hochwertiger und eigenständiger – ohne die bestehende Anmeldung oder Registrierung zu verändern.

Festgelegte Gestaltung:
- **Night Operations**: `#101512`, `#1B211D`, `#F4F7F5`, `#4ADE80`, `#69756D`
- **Roboto** für die gesamte Seite
- Klaro-Grün statt des cyanfarbenen Akzents aus dem Entwurf
- Technisch und präzise, aber nicht verspielt, futuristisch übertrieben oder „KI-generiert“

## Aufbau

- Bildschirmfüllende, zentrierte Leitstellen-Oberfläche mit einem breiten 5/7-Split auf Desktop.
- **Linke Seite:** Klaro-Logo, Live-Status „System online“, starke Überschrift, kurzer Sicherheitstext sowie betriebliche Statusmodule für Verbindung, Verschlüsselung und Systembereitschaft.
- Ein dezentes technisches Raster, feine Linien, Eckmarkierungen und kleine Statussignale erzeugen Tiefe, ohne Glas-/Blur-Orbs oder laute Effekte.
- **Rechte Seite:** der vollständige Login-/Registrierungsbereich mit klarer Hierarchie, präzisen Eingabefeldern und unmittelbarer Bedienbarkeit.
- Auf Mobilgeräten wird daraus eine kompakte einspaltige Oberfläche; die wichtigsten Statusinformationen bleiben sichtbar, unwichtige Betriebsdetails werden reduziert.

## Anmeldung und Registrierung

- Der vorhandene Umschalter „Anmelden / Registrieren“ wird als hochwertiger Betriebsmodus-Schalter neu gestaltet.
- Anmeldung behält E-Mail, Passwort, Passwortanzeige, Ladezustand und Weiterleitung.
- Registrierung behält Name, E-Mail, Passwort, Passwortwiederholung und Freischaltungshinweis.
- Fehlermeldungen, Bestätigungszustand und Erfolgsmeldungen werden optisch in das dunkle System integriert.
- Der primäre Aktionsknopf erhält eine klare grüne Fläche, weißen Text, einen kontrollierten Lichtlauf beim Darüberfahren und einen sichtbaren Ladezustand.
- Kein Passwort-Zurücksetzen und keine erfundenen zusätzlichen Funktionen.

## Details und Animationen

- Gestaffeltes, ruhiges Einblenden von Leitstellen-Seite, Formular und Statuszeilen beim Öffnen.
- Dezenter Puls am Online-Status und animierter Fortschritt bei der sicheren Verbindung.
- Sanfte Übergänge beim Wechsel zwischen Anmeldung und Registrierung; die Formularhöhe bleibt stabil und wirkt nicht sprunghaft.
- Präzise Fokus-, Hover- und Klickzustände für Felder, Sichtbarkeitsknopf, Moduswahl und Hauptaktion.
- Animationen werden bei aktivierter reduzierter Bewegung abgeschaltet oder stark vereinfacht.

## Technische Umsetzung

- Die bestehende Authentifizierungslogik und die Weiterleitung nach `/weiterleitung` bleiben unverändert.
- Die neuen Farben werden als semantische Variablen in der zentralen Gestaltung hinterlegt, nicht als verstreute Einzelwerte.
- Roboto bleibt die einzige Schrift; keine zusätzliche Terminal- oder Monospace-Schrift.
- Die Seite wird mit den vorhandenen gemeinsamen Eingabe- und Button-Bausteinen umgesetzt.
- Abschließende Prüfung der Anmeldung und Registrierung sowie visuelle Prüfung bei Desktop- und Mobilbreite; Seitentitel und Beschreibung bleiben erhalten.
