# Login-Bereich für Admins und Caller

Eine neue Seite `/auth` im Look der Landingpage (weiß/neutral, Grün nur als Akzent, gleiche Schrift, Logo im Kopf) mit Anmeldung und Registrierung. Dazu zwei geschützte Mockup-Bereiche: `/admin` und `/caller`.

## Die Seite /auth

- Zweispaltig auf dem Desktop, gestapelt auf dem Handy:
  - Links: Klaro-Logo, Überschrift „Anmeldung für Mitarbeiter", kurze Beschreibung, Vertrauenspunkte (verschlüsselte Übertragung, interner Zugang, Support-Hinweis).
  - Rechts: Karte mit Umschalter „Anmelden" / „Registrieren".
- Anmelden: E-Mail, Passwort (mit Auge zum Einblenden), grüner Button „Anmelden".
- Registrieren: Name, E-Mail, Passwort, Passwort wiederholen, Hinweis, dass die Rolle erst intern freigeschaltet wird.
- Klare Fehlermeldungen auf Deutsch (falsche Zugangsdaten, E-Mail schon vergeben, Passwort zu kurz), Ladezustand am Button, Erfolgsmeldungen als Einblendung.
- Wer schon angemeldet ist, wird direkt weitergeleitet.
- Kein Passwort-Zurücksetzen (wie besprochen).

## Rollen und Weiterleitung

Zwei Rollen: `admin` und `caller`. Nach dem Login:
- Admin → `/admin`
- Caller → `/caller`
- Noch keine Rolle vergeben → Hinweisseite „Dein Zugang wartet auf Freischaltung" mit Abmelden-Knopf.

Rollen werden in der Datenbank vergeben (nicht vom Nutzer wählbar), damit sich niemand selbst zum Admin machen kann.

## Mockup /admin

Geschützt, nur für Admins. Kopfzeile mit Logo, Rolle und Abmelden; seitliche Navigation (Übersicht, Anfragen, Mitarbeiter, Preise, Einstellungen — nur optisch). Inhalt:
- Vier Kennzahlen-Kacheln (Anfragen heute, offene Angebote, Umsatz, Ø Literpreis)
- Tabelle „Letzte Anfragen" mit PLZ, Menge, Status-Chips, Zuständigem
- Liste „Team" mit Name, Rolle, Status
- Alle Zahlen sind Beispieldaten.

## Mockup /caller

Geschützt, für Caller (und Admins einsehbar). Arbeitsansicht für Telefonisten:
- Oben die eigene Tagesstatistik (Anrufe, erreicht, Abschlüsse)
- Große Karte „Nächster Kontakt" mit Name, Ort, angefragter Menge, Telefonnummer und Aktionsknöpfen (Erreicht / Nicht erreicht / Termin)
- Rechts eine Warteschlange der nächsten Kontakte
- Notizfeld. Ebenfalls reine Beispieldaten.

## Technische Details

- Supabase Auth mit E-Mail/Passwort. Tabellen per Migration: `profiles` (id, Name, E-Mail, Zeitstempel) und `user_roles` (Enum `app_role` mit `admin`/`caller`) inkl. GRANTs, RLS und `has_role`-Funktion (security definer); Profil wird per Trigger bei der Registrierung angelegt.
- Geschützte Seiten liegen unter `src/routes/_authenticated/` mit der integrationseigenen Zugangssperre; Rollenprüfung zusätzlich serverseitig über eine Server-Funktion.
- Neue Route-Dateien: `src/routes/auth.tsx`, `src/routes/_authenticated/route.tsx`, `admin.tsx`, `caller.tsx`; Rollen-Abfrage in `src/lib/roles.functions.ts`.
- Styling ausschließlich über bestehende Design-Tokens (`brand`, `ink`, `line`, `surface`), keine neuen Farben.
- Eigene Seitentitel/Beschreibungen je Seite; geschützte Seiten werden nicht indexiert.

## Hinweis

Supabase verlangt standardmäßig eine E-Mail-Bestätigung nach der Registrierung. Wenn sich neue Mitarbeiter sofort anmelden sollen, sag Bescheid — dann stelle ich die Bestätigung ab. Die erste Admin-Rolle vergebe ich nach dem Aufbau direkt in der Datenbank für deine E-Mail-Adresse.
