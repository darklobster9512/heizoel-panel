# Branding-Name fehlt beim Caller

## Ursache

Caller dürfen die Branding-Tabelle bewusst nicht lesen — dort stehen auch die Zugangsdaten für E-Mail- und SMS-Versand. Deshalb wird der Branding-Name für Caller bisher serverseitig mit dem privilegierten Schlüssel nachgeladen. Auf dem veröffentlichten Server steht dieser Schlüssel nicht zuverlässig zur Verfügung, und seit der letzten Änderung scheitert das Nachladen dann still — die Bestellungen erscheinen, die Spalte „Branding" bleibt leer.

## Lösung

Statt des privilegierten Umwegs bekommt die Datenbank eine schlanke Namensliste: eine eigene Ansicht, die ausschließlich Kennung, Shopname und Unternehmensname eines Brandings enthält — keine Zugangsdaten, keine Adress- oder Registerdaten. Angemeldete Mitarbeiter (Admin wie Caller) dürfen diese Liste lesen. Der Branding-Name kommt damit überall an, in der Vorschau wie auf dem veröffentlichten Server, und ganz ohne privilegierten Schlüssel.

Der Zugriff auf die eigentliche Branding-Tabelle bleibt unverändert Admin-only.

## Technische Details

- Migration: `CREATE VIEW public.branding_names AS SELECT id, shop_name, company_name FROM public.brandings;` — Ansicht ohne `security_invoker`, damit sie die Admin-only-Policy der Basistabelle nicht erbt; `GRANT SELECT ON public.branding_names TO authenticated;` (kein `anon`). `REVOKE`/kein Zugriff für sonstige Rollen; `service_role` erhält `SELECT`.
- `src/lib/orders.functions.ts`: `attachBrandingNames` liest künftig über den normalen, benutzergebundenen Client aus `branding_names` statt über `supabaseAdmin`; das `try/catch` bleibt als Sicherheitsnetz. Der Import von `client.server` entfällt dort.
- Falls die Caller-Ansicht an weiteren Stellen Branding-Namen braucht (Filter in der Bestellliste), nutzt sie dieselbe Quelle.
- Abschluss: Typecheck, Build, Kontrolle in der Vorschau; danach einmal veröffentlichen, damit es live greift.
