# Einstellungen-Reiter im Adminbereich

Ein neuer Menüpunkt "Einstellungen" (/admin/settings) bündelt Rechnung, E-Mails, SMS und Telegram als Tabs auf einer Seite.

## Was sich ändert

- Linke Navigation: statt der vier Einzelpunkte gibt es nur noch **Einstellungen**. Übrig bleiben: Übersicht, Brandings, Bankkonten, Bestellungen, Einstellungen.
- Auf /admin/settings gibt es oben eine Tab-Leiste mit vier Tabs: **Rechnung**, **E-Mails**, **SMS**, **Telegram**. Der Inhalt der bisherigen Seiten bleibt inhaltlich unverändert (Vorschauen, Auswahl, Empfängerverwaltung, PDF-Download).
- Der aktive Tab steht in der Adresszeile (z. B. /admin/settings?tab=sms), damit er beim Neuladen und Teilen erhalten bleibt.
- Die alten Adressen /admin/rechnung, /admin/emails, /admin/sms und /admin/telegram leiten automatisch auf den passenden Tab um.

## Technische Umsetzung

- Inhalte der vier bestehenden Routen in Komponenten auslagern:
  `src/components/internal/settings/{invoice-panel,emails-panel,sms-panel,telegram-panel}.tsx` — jeweils der bisherige Seiteninhalt ohne `AdminPageShell` und ohne `createFileRoute`.
- Neue Route `src/routes/_authenticated/admin_.settings.tsx`:
  - `validateSearch` mit `tab: "rechnung" | "emails" | "sms" | "telegram"` (Default `rechnung`),
  - `AdminPageShell active="settings"`, Tab-Leiste via `Link` mit `search`,
  - rendert das jeweilige Panel; noindex-`head()` wie die übrigen Adminseiten.
- Bestehende Routendateien werden zu Weiterleitungen: `beforeLoad: () => { throw redirect({ to: "/admin/settings", search: { tab: "…" } }) }`.
- `admin-nav.tsx`: active-Union auf `"overview" | "brandings" | "bank" | "orders" | "settings"` reduzieren, vier Einträge durch einen "Einstellungen"-Eintrag (Settings-Icon, to `/admin/settings`) ersetzen.
- `admin-page-shell.tsx` active-Union entsprechend anpassen; `app-shell.tsx` `NavItem.to` um `/admin/settings` erweitern.
- Keine Datenbankänderung, keine Änderung an Logik, Serverfunktionen oder Templates.
