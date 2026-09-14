# Cloud-Anbindung entfernen, Seiten mit Beispieldaten weiterführen

Ziel: Das Projekt läuft komplett ohne externe Anbindung. Alle Seiten bleiben erhalten und zeigen erfundene Beispieldaten. Es wird nichts mehr dauerhaft gespeichert.

## Was der Nutzer danach sieht

- **Startseite und Antragsassistent**: unverändert.
- **Antrag absenden**: führt direkt zur Bestätigungsseite. Die Eingaben werden verworfen.
- **Anmeldung**: eine Demo-Anmeldung. Jede E-Mail mit Passwort führt zum Konto, ohne echte Prüfung. Ein sichtbarer Hinweis erklärt, dass es sich um eine Demo handelt.
- **Kundenkonto**: zeigt zwei Beispielanträge mit Status.
- **Adminbereich**: zeigt eine Beispielliste von Anträgen, Nutzern und Händler-/Bankeinträgen. Änderungen sind während des Besuchs sichtbar, gehen beim Neuladen verloren.
- **Angebotsseite**: rechnet weiter, die Anbieterliste kommt aus einer festen Beispielliste.
- **Dokumenten-Upload**: nimmt Dateien nur zum Anzeigen der Namen an, lädt nichts hoch.

## Technische Umsetzung

**Neue Dateien**

- `src/lib/mock-data.ts` — Beispieldaten: Banken/Händler, 3–4 Anträge inkl. Feldwerten, Dokumentenliste, Nutzerliste. Ein Modul-Store (einfache Arrays) für Änderungen zur Laufzeit.
- `src/lib/mock-auth.ts` — Demo-Session in `localStorage` (`signIn`, `signUp`, `signOut`, `getSession`, `useSession`), Rolle `admin` bei E-Mails, die mit `admin@` beginnen.

**Umgebaut (gleiche Export-Namen und Typen, damit die Seiten kaum angefasst werden müssen)**

- `src/lib/banks.functions.ts`, `application.functions.ts`, `applications.functions.ts`, `auth.functions.ts`: `createServerFn` und alle Datenbank-Aufrufe raus, stattdessen normale `async`-Funktionen gegen `mock-data.ts`.
- Aufrufstellen: `useServerFn(fn)` → direkter Aufruf von `fn` in `src/routes/angebote.tsx`, `src/routes/kreditantrag.$applicationId.tsx`, `src/routes/_authenticated/admin.tsx`, `admin.antrag.$applicationId.tsx`, `dashboard.tsx`, `src/components/app/banks-admin.tsx`.
- `src/routes/auth.tsx`: nutzt `mock-auth` statt Cloud-Login, plus Demo-Hinweis.
- `src/routes/_authenticated/route.tsx`: Zugangsprüfung über `mock-auth` (Weiterleitung auf `/auth` ohne Demo-Session).
- `src/routes/__root.tsx`: Auth-Zustandslistener entfernt.
- `src/components/app/app-shell.tsx`: Abmelden über `mock-auth`.
- `src/routes/antrag/fertig.tsx`: Speichern entfernt, nur Bestätigung.
- `src/routes/kreditantrag.$applicationId.tsx`: Datei-Upload läuft lokal (Dateiname in Liste), keine Signatur-/Speicher-Aufrufe.
- `src/start.ts`: `functionMiddleware` mit `attachSupabaseAuth` entfernt, Fehler- und CSRF-Middleware bleiben.

**Gelöscht**

- Ordner `src/integrations/supabase/` (Client, Server-Client, Auth-Middleware, Preview-Storage, generierte Typen).
- `src/lib/supabase-auth-attacher.ts`.
- Abhängigkeit `@supabase/supabase-js` aus `package.json` entfernen und Lockfile aktualisieren.

**Abschluss**: Typprüfung und Build laufen lassen, Startseite, `/auth`, `/dashboard`, `/admin`, `/angebote` und der Antragsabschluss einmal durchklicken.

## Hinweise

- Nach diesem Umbau gibt es keine echte Anmeldung und keine echte Datenspeicherung mehr — der Adminbereich ist nicht geschützt und darf keine echten Kundendaten enthalten.
- Eine spätere Wiederanbindung braucht eine Neuinstallation des Pakets und neue Datenfunktionen.
