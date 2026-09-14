# Nur Dokumente einreichen – Signatur deaktiviert

## Was sich ändert

1. **Signatur-Reiter deaktiviert**
   - „SIGNATUR“ wird wie „AUSZAHLUNG“ ausgegraut und ist nicht mehr anklickbar.
   - Es bleibt nur der Reiter „DOKUMENTE“ bedienbar.

2. **Button „Weiter“ wird zu „Dokumente einreichen“**
   - Aktiv erst, wenn je 3 Gehaltsabrechnungen und 3 Kontoauszüge hochgeladen sind (wie bisher).
   - Klick führt nicht mehr zur Signatur, sondern schickt den Antrag ab.

3. **Bestätigung nach dem Absenden**
   - Statt der Upload-Ansicht erscheint eine Bestätigung mit grünem Haken:
     „Vielen Dank! Ihre Dokumente wurden übermittelt.“
     Darunter: „Ihre Unterlagen befinden sich jetzt in Prüfung. Wir melden uns in Kürze bei Ihnen.“
     Zusätzlich die Antragsnummer und der Hinweis, dass die Seite jederzeit über den Link wieder aufrufbar ist.
   - Ein erneutes Aufrufen der Seite zeigt direkt die Bestätigung, wenn bereits eingereicht wurde.
   - Die hochgeladenen Dateien werden darunter als Liste (nur Namen) angezeigt; weitere Uploads sind danach nicht mehr möglich.

## Technische Hinweise

- `src/routes/kreditantrag.$applicationId.tsx`: Signatur-Tab `disabled`, Submit-Handler statt `setTab("signatur")`, Bestätigungsansicht abhängig vom Antragsstatus.
- Neue Serverfunktion `submitApplicationDocuments` in `src/lib/application.functions.ts`: setzt `loan_applications.status` auf `dokumente_eingereicht` (Spalte existiert bereits, keine Migration nötig).
- `getApplication` gibt `status` zusätzlich zurück, damit die Bestätigung nach Reload erhalten bleibt.
- Der Signatur- und Auszahlungsinhalt bleibt im Code, ist aber nicht mehr erreichbar.
