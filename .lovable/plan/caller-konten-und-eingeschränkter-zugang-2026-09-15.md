# Caller-Konten und eingeschränkter Zugang

## Ziel

In den Einstellungen gibt es einen neuen Tab „Caller" (`/admin/caller`), in dem Admins Mitarbeiter-Konten mit E-Mail und Passwort anlegen. Diese Caller sehen im Panel ausschließlich die Bestellungen.

## Neuer Tab: Caller-Konten

- Fünfter Tab in der Einstellungen-Leiste, eigene Seite `/admin/caller` (nur für Admins).
- Formular: E-Mail, Passwort (min. 8 Zeichen), optional Name. Beim Anlegen wird das Konto sofort aktiv (keine Bestätigungsmail nötig) und erhält den Rang „Caller".
- Liste aller Caller-Konten mit E-Mail, Name, Erstellungsdatum.
- Aktionen je Konto: Passwort neu setzen, Konto löschen (mit Rückfrage).

## Was ein Caller sieht

- Nach der Anmeldung landet ein Caller direkt auf der Bestellungen-Seite.
- In der oberen Leiste erscheint nur „Bestellungen" — Übersicht, Brandings, Bankkonten und Einstellungen sind ausgeblendet; ein direkter Aufruf dieser Seiten leitet zurück zu den Bestellungen.
- In der Bestellungen-Tabelle fehlt die Spalte „Aktionen" (Rechnung generieren) vollständig.
- Erlaubt bleiben: Status wechseln, Detail-Popup öffnen, Suche/Filter. Im Detail-Popup ist die interne Notiz weiter bearbeitbar.
- Die bisherige Demo-Seite `/caller` (Platzhalter-Arbeitsplatz) entfällt.

## Technische Umsetzung

Datenbank (Migration):
- Neue Policies: Rolle `caller` darf Bestellungen lesen und aktualisieren sowie Brandings lesen (nur für die Anzeige des Branding-Namens). Rechnungen, Bankkonten und Branding-Schreibrechte bleiben Admin-only.

Server-Funktionen `src/lib/caller-accounts.functions.ts` (alle mit `requireSupabaseAuth` + Admin-Prüfung über `has_role`):
- `listCallerAccounts`, `createCallerAccount`, `resetCallerPassword`, `deleteCallerAccount`.
- Konten werden über `supabaseAdmin.auth.admin.*` angelegt/gelöscht (Import innerhalb des Handlers), Rolle als Zeile in `user_roles`.

Frontend:
- `AdminPageShell` erhält ein `allowCaller`-Flag: Nur die Bestellungen-Seite setzt es; alle anderen Admin-Seiten leiten Caller auf `/admin/bestellungen` um.
- `getAdminNav(active, role)` liefert für Caller nur den Bestellungen-Eintrag; Rollen-Badge zeigt „Caller".
- In `admin_.bestellungen.tsx` wird die Aktionen-Spalte (Kopf, Zellen, `GenerateInvoiceDialog`) über `isAdmin` bedingt gerendert; die mobile Karte ebenso.
- `weiterleitung.tsx` leitet Caller auf `/admin/bestellungen`; Route `_authenticated/caller.tsx` wird entfernt.
- Serverseitige Berechtigungsprüfungen in `orders.functions.ts` und `listBrandings` akzeptieren zusätzlich die Rolle `caller`; `invoices.functions.ts` bleibt Admin-only.
