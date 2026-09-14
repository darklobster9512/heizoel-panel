# Navbar-Update: Heizölpreise-Dropdown

## Ziel
Den Header auf Landingpage und `/preisrechner` so umbauen, dass in der Hauptnavigation nur noch ein einzelner Punkt **„HEIZÖLPREISE"** steht. Beim Hover öffnet sich ein Dropdown mit drei Verlinkungen – alle führen zu `/preisrechner`.

## Was sich ändert

### 1. `src/components/landing/site-header.tsx`
- Den bestehenden `NAV`-Array mit 6 Punkten entfernen.
- Stattdessen ein einzelnes Dropdown mit `@/components/ui/navigation-menu` einbauen.
- Trigger-Label: **HEIZÖLPREISE** (uppercase, schmal tracking).
- Dropdown-Inhalt: 3 große Link-Kacheln, jeweils mit Icon, Haupttext und kurzem Subtext:
  1. **Heizöl Preise heute**  
     Subtext: „Aktueller Tagespreis & 7-Tage-Trend"  
     Icon: `TrendingUp` oder `ChartLine` (lucide-react)
  2. **Heizöl kaufen**  
     Subtext: „Direkt vom Händler - bis 15% sparen"  
     Icon: `Fuel` oder `Droplet` (lucide-react)
  3. **Heizölpreis pro Liter**  
     Subtext: „PLZ eingeben, Preis sofort berechnen"  
     Icon: `Calculator` oder `MapPin` (lucide-react)
- Jede Kachel verlinkt mit `<Link to="/preisrechner">`.
- Styling im Enterprise-Look: weißer Hintergrund, dezente Rahmen, grüne Icon-Farbe, Hover leicht grünlich, keine verspielten Effekte.
- Mobile Darstellung: Das Dropdown bleibt auf Desktop sichtbar. Auf Mobile wird der Bereich vereinfacht – entweder der einzelne „HEIZÖLPREISE"-Trigger als Link zu `/preisrechner` oder das mobile Menü bleibt unverändert, je nach aktuellem Mobile-Verhalten.

### 2. Abhängige Styling-Anpassungen
- Sicherstellen, dass das Dropdown nicht vom Header-Schatten oder `overflow`-Regeln abgeschnitten wird (`z-index`, `relative` etc.).
- Trigger- und Dropdown-Farben an bestehende Tokens anpassen (`text-ink`, `text-brand`, `bg-background`, `border-line`, `text-muted-custom`).

## Nicht im Scope
- Keine neuen Seiten anlegen.
- Keine Backend- oder Auth-Änderungen.
- Keine Änderungen an Footer, Hero-Card oder Live-Orders-Element.

## Validierung
- Build läuft ohne Fehler.
- Desktop: Hover über „HEIZÖLPREISE" zeigt alle 3 Links mit Icons.
- Jeder Link navigiert zu `/preisrechner`.
- Mobile: Navigation bleibt bedienbar und bricht nicht um.
