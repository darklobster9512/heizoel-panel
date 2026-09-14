# Admin direkt zum Adminpanel weiterleiten

## Ziel
Nach dem Login landen Admins automatisch auf `/admin` – ohne manuell auf „Zum Adminpanel" klicken zu müssen. Normale Nutzer landen weiterhin auf `/dashboard`.

## Änderungen

### 1. Rollenprüfung beim Login (src/routes/auth.tsx)
- Nach erfolgreichem Login wird die Rolle des Nutzers aus der Datenbank gelesen (`user_roles`-Tabelle, bestehende Logik aus `src/lib/auth.functions.ts`).
- Rolle `admin` → Weiterleitung auf `/admin`
- Rolle `user` → Weiterleitung auf `/dashboard` (unverändert)
- Gleiche Logik gilt auch beim automatischen Session-Check (wenn man bereits eingeloggt `/auth` aufruft).

### 2. Admin-Schutz auf /dashboard
- Ruft ein Admin direkt `/dashboard` auf, wird er automatisch auf `/admin` umgeleitet (in der Dashboard-Route, client-seitig nach Rollenprüfung).

### 3. Registrierung unverändert
- Neu registrierte Nutzer sind immer `user` und landen wie bisher auf `/dashboard`.

## Technische Details
- `src/routes/auth.tsx`: Hilfsfunktion `getUserRole(userId)` (Query auf Rollentabelle via Supabase-Client), dann bedingtes `navigate({ to: isAdmin ? "/admin" : "/dashboard" })` an den drei Stellen (Session-Check, Login, Registrierung bleibt `/dashboard`).
- `src/routes/_authenticated/dashboard.tsx`: kleiner `useEffect`, der bei Rolle `admin` auf `/admin` navigiert.
- Keine Datenbankänderungen nötig – die Rollentabelle und `has_role`-Funktion existieren bereits.

## Prüfung
- Typecheck, dann Browser-Test: Admin-Login landet direkt auf `/admin`, User-Login auf `/dashboard`.
