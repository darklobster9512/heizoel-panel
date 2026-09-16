# Login über backend.heizoel-deutschland.com landet auf der Warteseite

## Was passiert

Beim Login über die eigene Adresse erscheint „Dein Zugang wartet auf Freischaltung" mit Konto „unbekannt" — obwohl dasselbe Konto in der Vorschau sofort ins Panel weitergeleitet wird.

Das „unbekannt" ist der entscheidende Hinweis: Die Rollen-Abfrage liefert dort gar keine Antwort. Die Seite behandelt eine **fehlgeschlagene** Abfrage heute genauso wie „Konto hat keine Rolle" und zeigt deshalb die falsche Meldung. Die Rolle in der Datenbank ist korrekt (Admin), das ist nicht das Problem.

Die genaue Ursache des fehlgeschlagenen Aufrufs ist noch nicht bestätigt — der mitgeschickte Konsolen-Auszug zeigt nur die Live-Aktualisierung der Entwicklungsumgebung, nicht den eigentlichen Fehler.

## Vorgehen

### 1. Fehler sichtbar machen (zuerst)
Die Zwischenseite und der Panel-Rahmen unterscheiden künftig drei Fälle:
- Abfrage läuft → Ladeanzeige
- Abfrage fehlgeschlagen → eigene Meldung „Verbindung zum Server fehlgeschlagen" samt Fehlertext und Knopf „Erneut versuchen"
- Abfrage erfolgreich, aber keine Rolle → die bisherige Freischaltungs-Meldung

Damit sagt die Seite auf deiner Adresse direkt, woran es liegt, statt eine falsche Erklärung anzuzeigen.

### 2. Ursache bestimmen und beheben
Anhand des dann sichtbaren Fehlertexts wird die passende Korrektur umgesetzt. Erwartete Kandidaten:
- Der Zugriffs-Token wird beim Aufruf nicht mitgeschickt (Sitzung auf der eigenen Domain noch nicht geladen) → Token-Anhängung wartet auf die Sitzung und versucht es einmal erneut.
- Die Herkunfts-Prüfung der Server-Aufrufe lehnt die eigene Domain ab → eigene Domain ausdrücklich zulassen.
- Fehlende Server-Zugangsdaten in dieser Umgebung → dann nenne ich dir genau, was zu hinterlegen ist.

### 3. Prüfen
Typecheck und Build; danach testest du den Login über deine Adresse, und falls noch ein Fehler erscheint, zeigt die Seite ihn jetzt im Klartext.

## Technische Details
- `src/routes/_authenticated/weiterleitung.tsx` und `src/components/internal/admin-page-shell.tsx`: `useQuery` zusätzlich auf `isError`/`error` auswerten, Fehlerzustand mit `refetch()`-Knopf; Weiterleitungs-Logik nur bei erfolgreicher Antwort.
- Token-Anhängung in `src/start.ts` (`attachSupabaseAuth`): bei fehlendem `access_token` einmal `getUser()`/`refreshSession()` abwarten, bevor ohne Token weitergeschickt wird.
- Falls die Herkunfts-Prüfung greift: `createCsrfMiddleware({ origin: [...] })` in `src/start.ts` um `https://backend.heizoel-deutschland.com` erweitern.
- Keine Datenbank- oder Rechteänderungen; die Admin-Rolle des Kontos bleibt unverändert.
