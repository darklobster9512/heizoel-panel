# Login, Registrierung und zwei Mockup-Bereiche

## Was entsteht

**Seite `/auth`** — im Stil der smava-Loginseite: heller grauer Hintergrund, mittig eine schmale weiße Karte mit Logo oben, Überschrift, E-Mail- und Passwortfeld, grünem Button (#39a949) und einem Umschalter zwischen "Anmelden" und "Registrieren". Darunter dezente Hinweise (Passwort vergessen, Wechsel zwischen den beiden Modi). Header und Footer der Landingpage bleiben unverändert; die Auth-Seite bekommt eine reduzierte Kopfzeile mit Logo.

**Registrierung/Login** per E-Mail und Passwort. Nach der Registrierung ist man sofort angemeldet (keine Bestätigungsmail).

**Rollen**: Der allererste registrierte Nutzer wird automatisch Admin, alle weiteren werden normale Nutzer.

**`/dashboard` (Nutzer, Mockup)** — begrüßt mit Name/E-Mail, zeigt Platzhalterkarten: "Meine Kreditanfragen" mit 2–3 Beispielanfragen (Betrag, Laufzeit, Status), eine Statusleiste zum Fortschritt, Profilangaben und einen Abmelden-Button.

**`/admin` (Admin-Panel, Mockup)** — Kennzahlen-Kacheln (Nutzer gesamt, offene Anfragen, vermitteltes Volumen), eine Tabelle mit registrierten Nutzern (E-Mail, Rolle, Registrierdatum) und eine Tabelle mit Beispielanfragen. Nur für Admins erreichbar; normale Nutzer landen auf dem Dashboard.

Nach dem Login wird je nach Rolle automatisch auf `/dashboard` bzw. `/admin` weitergeleitet. Wer nicht angemeldet ist, wird zu `/auth` geschickt.

## Technische Umsetzung

1. **Datenbank-Migration**
   - `public.profiles` (id → auth.users, email, created_at, updated_at) mit RLS: jeder liest/ändert nur sein eigenes Profil; Admins dürfen alle lesen.
   - Enum `app_role ('admin','user')` und Tabelle `public.user_roles (user_id, role)` — Rollen strikt getrennt von den Profilen.
   - `public.has_role(_user_id, _role)` als SECURITY DEFINER Funktion für die Policies.
   - Trigger `handle_new_user` auf `auth.users`: legt das Profil an und vergibt `admin`, wenn `user_roles` noch leer ist, sonst `user`.
   - GRANTs für `authenticated`/`service_role` bei allen neuen Tabellen; `updated_at`-Trigger.
   - Auto-Confirm für E-Mails aktivieren (`configure_auth`).

2. **Routen**
   - `src/routes/auth.tsx` — öffentlich, Formular mit Zod-Validierung (E-Mail-Format, Passwort min. 8 Zeichen), `signInWithPassword` / `signUp`, Fehlermeldungen auf Deutsch via sonner. Bereits angemeldete Nutzer werden weitergeleitet.
   - `src/routes/_authenticated/route.tsx` — integrationstypisches Gate (`ssr: false`, Redirect auf `/auth`).
   - `src/routes/_authenticated/dashboard.tsx` und `src/routes/_authenticated/admin.tsx`; Admin-Route prüft die Rolle serverseitig über eine Server-Funktion und leitet Nicht-Admins auf `/dashboard`.
   - `src/lib/auth.functions.ts` — `getMyProfile` / `getMyRole` mit `requireSupabaseAuth`; für das Admin-Panel `listUsers` (Rollenprüfung im Handler).
   - `attachSupabaseAuth` in `src/start.ts` zur bestehenden Middleware ergänzen.
   - Sign-out-Hygiene (Query-Cache leeren, Redirect mit `replace`), ein `onAuthStateChange`-Listener in `__root.tsx`.

3. **Design** — bestehende Tokens und Buttons wiederverwenden (Grün #39a949, Hover #1b5426, Roboto, kantige Felder wie im Hero-Rechner), eigene `head()`-Metadaten je Seite.

Die Inhalte der beiden Mockup-Bereiche sind Platzhalter; sag Bescheid, wenn dort andere Daten stehen sollen.
