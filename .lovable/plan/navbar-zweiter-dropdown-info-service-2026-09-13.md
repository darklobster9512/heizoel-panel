# Navbar: zweiter Dropdown „INFO & SERVICE"

## Ziel
Neben dem bestehenden „HEIZÖLPREISE"-Dropdown im Header soll ein zweiter Navigationspunkt „INFO & SERVICE" erscheinen. Beim Hover öffnet sich ein Popover im gleichen Stil wie das bestehende (grüne Topline, Icon, Titel, Untertitel).

## Änderungen an `src/components/landing/site-header.tsx`

1. **Neue Link-Gruppe anlegen**
   - `INFO_SERVICE_LINKS` mit drei Einträgen:
     - „Lieferung & Zahlung" → `/lieferung-zahlung` (Untertitel: „Liefer- und Zahlungsmodalitäten")
     - „Kundenbewertungen" → `/bewertungen` (Untertitel: „25.000+ Bewertungen & Trust-Siegel")
     - „Heizöl FAQ" → `/faq` (Untertitel: „Heizöl sicher kaufen")
   - Passende Lucide-Icons auswählen (z. B. `Truck`, `Star`, `HelpCircle`).

2. **Zweiten Dropdown-Container einfügen**
   - Rechts neben dem bestehenden Dropdown in der Desktop-Navigation platzieren.
   - Eigener Hover-State, damit beide Dropdowns unabhängig voneinander funktionieren.
   - Gleiche visuelle Ausprägung: `rounded-lg`, `border-line`, `bg-background`, grüne 3px-Topline, Hover-Hintergrund `hover:bg-brand/10`.

3. **Doppelung vermeiden**
   - „Heizöl FAQ" aus dem bestehenden `HEIZOEL_LINKS`-Array entfernen, da es jetzt unter „INFO & SERVICE" zu finden ist.

4. **Nicht im Scope**
   - Keine Änderungen am mobilen Header (dort ist aktuell nur der Text „Menü" sichtbar, kein ausgeklappter Drawer).
   - Keine neuen Seiten anlegen.
