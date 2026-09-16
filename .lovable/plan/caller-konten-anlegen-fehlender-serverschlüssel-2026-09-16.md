# Caller-Konten anlegen: fehlender Serverschlüssel

## Ursache

Du hast Adminrechte — daran liegt es nicht. Das Anlegen eines Kontos (E-Mail + Passwort für einen neuen Mitarbeiter) ist eine Benutzerverwaltungs-Aktion, die nur der Server mit dem privilegierten Datenbankschlüssel ausführen darf. Genau dieser Schlüssel fehlt derzeit in der Umgebung, in der die Server-Funktionen laufen: In der Konfigurationsdatei des Projekts stehen nur Adresse und öffentlicher Schlüssel, der privilegierte Schlüssel ist dort nicht eingetragen. Deshalb bricht das Anlegen mit der genannten Meldung ab.

Andere Funktionen laufen normal weiter, weil sie mit deinen eigenen Rechten arbeiten und diesen Schlüssel nicht brauchen.

## Lösung

1. Die Supabase-Anbindung neu binden, damit der privilegierte Schlüssel wieder in der Serverumgebung hinterlegt wird (dediziertes Werkzeug dafür; es wird nichts rotiert oder ungültig gemacht).
2. Prüfen, dass der Schlüssel in der Projektkonfiguration angekommen ist.
3. Anschließend das Anlegen eines Caller-Kontos testen und das Testkonto danach wieder entfernen.
4. Falls die Neubindung fehlschlägt (z. B. weil die Supabase-Verbindung des Arbeitsbereichs abgelaufen ist), sage ich dir genau, was du in den Projekteinstellungen neu verbinden musst.

## Technische Details

- `supabase--rebind_secrets` schreibt `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` und `SUPABASE_SERVICE_ROLE_KEY` neu in die Serverumgebung.
- Betroffener Code bleibt unverändert: `createCallerAccount` in `src/lib/caller-accounts.functions.ts` lädt `@/integrations/supabase/client.server` (Service-Role) im Handler, nachdem die Adminrolle über `has_role` geprüft wurde — das ist korrekt so und wird nicht auf einen schwächeren Client umgestellt.
- Keine Datenbank-, Rechte- oder Policy-Änderung.
- Hinweis: Nach dem Veröffentlichen gilt der Schlüssel auch dort; falls die Meldung live erneut auftritt, muss einmal neu veröffentlicht werden.
