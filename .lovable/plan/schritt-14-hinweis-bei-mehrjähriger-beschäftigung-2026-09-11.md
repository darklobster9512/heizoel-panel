# Schritt 14: Hinweis bei mehrjähriger Beschäftigung

## Ziel
In Schritt 14 des Antrags-Wizards soll unterhalb des Felds „Beschäftigt seit“ eine grüne Hinweisbox erscheinen, sobald der eingetragene Monat/Jahres-Wert mehr als 3 Jahre in der Vergangenheit liegt. Text und Aussehen sollen dem hochgeladenen Screenshot entsprechen.

## Ist-Zustand
- `src/routes/antrag/schritt-14.tsx` enthält das Feld „Beschäftigt seit“ im Format `MM.JJJJ`.
- `src/components/wizard/ui.tsx` bietet bereits `NoteBox` mit `variant="green"` und `icon="briefcase"`.
- Die grüne Erfolgsbox für unbefristete Verträge ist vorhanden und soll unverändert bleiben.

## Geplante Änderungen
1. **Hilfsfunktion im Step-Modul hinzufügen**
   - Parst den Wert `MM.JJJJ` zu Monat und Jahr.
   - Vergleicht das Datum mit dem aktuellen Monat/Jahr.
   - Liefert `true`, wenn die Differenz größer als 36 Monate ist (älter als 3 Jahre).
   - Robust gegen unvollständige Eingaben (z.B. weniger als 6 Ziffern) → `false`.

2. **Bedingte Hinweisbox rendern**
   - Direkt unter dem `TextField` „Beschäftigt seit“ einfügen.
   - Nur anzeigen, wenn `data.employedSince` gültig und das Datum älter als 3 Jahre ist.
   - Verwendet `<NoteBox variant="green" icon="briefcase">Banken schätzen es, wenn Sie schon mehrere Jahre berufstätig sind.</NoteBox>`.

3. **Validierung nach dem Edit**
   - Build (`bun run build`) ausführen.
   - Visuell im Browser prüfen: leeres Feld → kein Hinweis, Datum 10.2023 (heute 09/2026) → Hinweis sichtbar, zukünftiges/unvollständiges Datum → kein Hinweis.

## Technische Details
- Keine neuen Dependencies.
- Keine Store-Änderungen nötig; der Hinweis leitet sich rein aus `data.employedSince` ab.
- Formatprüfung strikt auf `MM.JJJJ` begrenzt.
