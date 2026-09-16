# Serverfehler „native WebSocket not found" beheben

## Ursache

Die neue Fehleranzeige hat den echten Grund sichtbar gemacht: Auf dem veröffentlichten Server bricht jeder Server-Aufruf ab, bevor er die Datenbank erreicht.

Die Supabase-Bibliothek richtet beim Erstellen ihrer Verbindung immer auch den Live-Kanal (WebSocket) mit ein. In der Entwicklungsumgebung gibt es dafür eine eingebaute Unterstützung, in der Server-Umgebung deines veröffentlichten Servers nicht — dort wirft die Bibliothek genau diesen Fehler. Deshalb funktioniert die Vorschau, die eigene Adresse aber nicht.

Live-Verbindungen werden serverseitig gar nicht gebraucht: Die Live-Aktualisierung der Bestellungen läuft ausschließlich im Browser.

## Lösung

Beim Serverstart wird ein Platzhalter für die fehlende WebSocket-Unterstützung bereitgestellt, sofern die Umgebung keine eigene mitbringt. Damit kann die Supabase-Bibliothek ihre Verbindung wie gewohnt aufbauen, Datenabfragen laufen normal, und ein serverseitiger Live-Kanal wird — wie bisher — schlicht nie geöffnet.

Nichts an der Anmeldung, den Rollen, der Datenbank oder der Live-Aktualisierung im Browser ändert sich.

## Technische Details

- Neue Datei `src/lib/server-websocket-polyfill.ts`: definiert `globalThis.WebSocket` nur dann, wenn es fehlt — eine minimale Klasse, deren Konstruktor einen klaren Fehler wirft (serverseitiges Realtime ist nicht vorgesehen), sodass allein das Vorhandensein des Globals die Prüfung in `@supabase/realtime-js` (`WebSocketFactory.getWebSocketConstructor`) passieren lässt.
- Import als allererste Zeile in `src/server.ts` (Worker-Einstiegspunkt) und in `src/start.ts`, damit der Polyfill vor jedem `createClient`-Aufruf greift — betrifft `auth-middleware.ts`, `client.server.ts` und die publishable Server-Clients.
- Die generierten Supabase-Dateien bleiben unverändert.
- Prüfung: Typecheck, Build, Aufruf einer Server-Funktion lokal; danach veröffentlichen und Login über `backend.heizoel-deutschland.com` testen.
