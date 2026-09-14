# Bankkonten im Adminbereich

Neuer Reiter **Bankkonten** unter `/admin/bankkonten`, in dem du Bankkonten anlegen, bearbeiten und löschen kannst.

## Was du bekommst

- Neuer Navigationspunkt „Bankkonten" zwischen Brandings und Bestellungen.
- Übersicht als Karten-/Listenansicht mit Name, IBAN, BIC, Bankname und Limit.
- Formular zum Anlegen und Bearbeiten direkt auf der Seite (Dialog). **Alle Felder sind Pflicht:**
  - Name (Kontoinhaber/Bezeichnung)
  - IBAN
  - BIC
  - Bankname
  - Limit in Euro – vorbelegt mit 20.000 €
- Konten sind global, also nicht an ein Branding gebunden.
- Das Limit ist ein Gesamtlimit und wird gespeichert und angezeigt; es beeinflusst vorerst nichts automatisch.
- Die Bankdaten in der Rechnungs-E-Mail bleiben unverändert beim Branding.
- Konten lassen sich als aktiv/inaktiv markieren, damit alte Konten nicht gelöscht werden müssen.
- Zugriff nur für Admins.

## Technische Umsetzung

- Migration: Tabelle `public.bank_accounts` mit `id`, `name`, `iban`, `bic`, `bank_name` (alle `NOT NULL`), `limit_amount numeric NOT NULL DEFAULT 20000`, `is_active boolean NOT NULL DEFAULT true`, `created_by`/`updated_by`, `created_at`/`updated_at` inkl. Update-Trigger. GRANTs für `authenticated` (SELECT/INSERT/UPDATE/DELETE) und `service_role`, RLS aktiv, alle Policies über `has_role(auth.uid(), 'admin')`.
- `src/lib/bank-accounts.functions.ts`: `listBankAccounts`, `saveBankAccount`, `deleteBankAccount` als `createServerFn` mit `requireSupabaseAuth` + Admin-Prüfung via `supabase.rpc("has_role", ...)`, Zod-Validierung (alle Felder nicht leer, IBAN normalisiert auf Großbuchstaben ohne Leerzeichen, Limit > 0).
- `src/routes/_authenticated/admin_.bankkonten.tsx`: `AdminPageShell active="bank"`, TanStack Query (`useQuery`/`useMutation`), Dialog-Formular, `noindex` im `head()`.
- `admin-nav.tsx`, `admin-page-shell.tsx` und `NavItem["to"]` in `app-shell.tsx` um `/admin/bankkonten` bzw. `"bank"` erweitern.
- Abschluss: Typecheck und Buildlog prüfen.
