# Caller-Feinschliff: Branding-Zuweisung und Sichtbarkeit ab Datum

Aus dem Vergleich mit dem alten Projekt fehlen bei den Caller-Konten zwei Steuerungen: welchen Brandings ein Caller zugeordnet ist und ab welchem Datum er Bestellungen sieht.

## Was dazukommt

**In der Caller-Verwaltung (Einstellungen → Caller)**
- Pro Konto eine Mehrfachauswahl der Brandings. Keine Auswahl = der Caller sieht alle Brandings.
- Pro Konto ein Feld „Bestellungen sichtbar ab“ (Datum, optional). Ist es gesetzt, sieht der Caller nur Bestellungen, die ab diesem Tag eingegangen sind.
- Beide Angaben lassen sich beim Anlegen setzen und später jederzeit über einen „Bearbeiten“-Dialog ändern.
- Die Liste zeigt je Konto die zugeordneten Brandings als kleine Chips und das Sichtbar-ab-Datum.

**Für den Caller selbst**
- Die Bestellliste enthält nur noch Bestellungen seiner Brandings und ab seinem Startdatum; dasselbe gilt fürs Öffnen des Detail-Popups und fürs Speichern von Änderungen — eine nicht zugewiesene Bestellung lässt sich auch nicht über einen Direktlink bearbeiten.
- Der Branding-Filter oberhalb der Tabelle zeigt einem Caller nur seine Brandings.
- Für Admins ändert sich nichts.

## Technische Umsetzung

**Migration**
- Neue Tabelle `public.caller_brandings (id, user_id uuid, branding_id uuid references brandings on delete cascade, created_at, unique(user_id, branding_id))`, GRANTs für `authenticated` (nur SELECT) und `service_role` (ALL), RLS an: Admins dürfen alles (`has_role(auth.uid(),'admin')`), Caller dürfen ihre eigenen Zeilen lesen (`user_id = auth.uid()`).
- Neue Tabelle `public.caller_settings (user_id uuid primary key, visible_from date, created_at, updated_at)` mit `update_updated_at_column`-Trigger, gleiche GRANT-/RLS-Logik.
- Die Bestell-Policies bleiben unverändert; die Einschränkung passiert serverseitig in den Server-Funktionen (Caller-Schreibzugriff läuft ohnehin ausschließlich über `updateOrder`).

**Server**
- `src/lib/caller-accounts.functions.ts`: `CallerAccount` um `brandingIds: string[]` und `visibleFrom: string | null` erweitern; `listCallerAccounts` lädt beide Tabellen mit; `createCallerAccount` nimmt `brandingIds` und `visibleFrom` entgegen; neue Funktion `updateCallerAccess({ userId, brandingIds, visibleFrom })` (Admin-only, ersetzt die Zuordnungen und upsertet die Einstellung); `deleteCallerAccount` räumt beide Tabellen mit ab.
- `src/lib/orders.functions.ts`: neuer Helfer `callerScope(context)` liest `caller_brandings` + `caller_settings` des angemeldeten Nutzers. In `listOrders` für Rolle `caller` zusätzlich `.in("branding_id", ids)` und `.gte("placed_at", visibleFrom)` anwenden; in `getOrder` und `updateOrder` prüfen, ob die Bestellung im Scope liegt, sonst Fehler „Kein Zugriff auf diese Bestellung.“
- `listBrandings` bleibt Admin+Caller; für Caller wird das Ergebnis auf den Scope gefiltert (Filter-Dropdown).

**Oberfläche**
- `src/routes/_authenticated/admin_.caller.tsx`: Anlege-Formular um Branding-Checkbox-Liste (aus `listBrandings`) und Datumsfeld ergänzen; je Zeile ein „Zugriff bearbeiten“-Dialog mit denselben Feldern, der `updateCallerAccess` aufruft und `["caller-accounts"]` invalidiert; Chips und Datum in der Liste anzeigen.
