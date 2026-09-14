# Schritt 5: Haushalt 1:1 an Screenshot anpassen

## Ziel
`/antrag/schritt-5` soll exakt dem gelieferten Screenshot entsprechen.

## Änderungen in `src/routes/antrag/schritt-5.tsx`

### Überschrift
- Entferne den zweizeiligen Aufbau (kleine Kategorie + Frage).
- Zeige nur noch **„Haushalt“** als Hauptüberschrift.

### Info-Accordion
- Füge oberhalb der Eingaben einen `WhyInfo`-Block mit folgendem Text ein:
  > Ihre Wohnsituation wird bei der Kreditprüfung berücksichtigt. Dabei kann relevant sein, mit wie vielen Personen Sie zusammenleben und ob Sie zur Miete oder im Eigenheim wohnen. So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten.

### Zähler-Felder (vertikal gestapelt, Label über dem Zähler)
Ändere das Layout von nebeneinander auf untereinander. Jedes Feld besteht aus Label + `CounterField`.

1. **Anzahl Erwachsene im Haushalt (ab 18 Jahre)**
   - Standardwert: 1
   - Min: 1
   - Max: beibehalten (5)
   - Darunter eine grüne `NoteBox` mit User-Icon:
     > Mehr Erwachsene bedeutet weniger Kosten pro Kopf und mehr frei verfügbares Einkommen.

2. **Anzahl Kinder im Haushalt (unter 18 Jahre)**
   - Standardwert: 0
   - Max: beibehalten (10)
   - Speichert weiterhin in `data.children`.

3. **Anzahl kindergeldberechtigter Kinder**
   - Standardwert: 0
   - Max: beibehalten (`data.children`)
   - Ist dauerhaft sichtbar (nicht mehr abhängig von `data.children > 0`).
   - Speichert weiterhin in `data.childrenKindergeld`.

### Entfernen
- Den alten Hinweis-Block `NoteBox` mit „Gut zu wissen: Kindergeld...“ entfernen.
- Den alten `WhyInfo`-Text am Seitenende entfernen.

## Nicht im Scope
- Fortschrittsbalken bleibt bei 29 %.
- Navigation („Zurück“ / „Weiter“) und `TrustBlock` bleiben unverändert.
- `CounterField`-Komponente selbst bleibt unverändert; nur deren Verwendung in Schritt 5 wird neu angeordnet.

## Validierung
- TypeScript-Build durchführen.
- Seite `/antrag/schritt-5` öffnen und prüfen: Überschrift, Info-Text, drei Zähler in der korrekten Reihenfolge/Beschriftung und Hinweisbox unter dem ersten Zähler stimmen.
