# Plan: Neue Seite `/kontakt` + Navbar-Link „KONTAKT & HILFE"

## Ziel
Eine neue Kontaktseite unter `/kontakt` erstellen und im Header als einzelner, nicht aufklappbarer Navigationspunkt „KONTAKT & HILFE" verlinken.

## Inhaltliche Anforderungen (vom Nutzer geklärt)
- Kontaktdaten: Telefonnummer + E-Mail-Adresse
- Verweis auf die FAQ-Seite
- Kontaktformular als reines Mockup (kein Versand, keine Datenbank)
- Aufbau wie die anderen Content-Seiten: Seitenkopf, Content-Bereich, CTA-Banner, Footer

## Geplante Umsetzung

### 1. Neue Route `src/routes/kontakt.tsx`
- `createFileRoute("/kontakt")` mit eigenem `head()`:
  - `title`: „Kontakt & Hilfe | Klaro"
  - `description`, `og:title`, `og:description`, `og:type`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`
  - `links`: canonical `/kontakt`
- `component: KontaktPage`

### 2. Seitenkopf
- Grauer Hintergrund (`bg-surface`), grüne 3px-Bottomline (`border-b-[3px] border-b-brand`)
- Zentrierte Überschrift „Kontakt & Hilfe"
- Kurzer Untertitel, z. B. „Wir helfen Ihnen gerne — per Telefon, E-Mail oder über unser Kontaktformular."

### 3. Kontaktinformationen als 3-Kachel-Grid
- **Telefon**: Icon `Phone`, Platzhalter-Telefonnummer, Label „Kostenlos aus dem deutschen Festnetz" oder ähnlich
- **E-Mail**: Icon `Mail`, Platzhalter-E-Mail-Adresse (z. B. `service@klaro.de`), Label „Wir antworten schnellstmöglich"
- **FAQ**: Icon `HelpCircle`, Link zu `/faq`, Label „Antworten auf häufige Fragen"
- Kacheln mit `bg-surface`, `border-line`, `border-t-4 border-t-brand`, Schatten `shadow-card`

### 4. Kontaktformular (Mockup)
- Card mit `bg-surface`, `border-line`, grüner Topline
- Felder: Name, E-Mail, Telefon (optional), Betreff (Select oder Input), Nachricht (Textarea)
- Checkbox für Datenschutz-Einwilligung
- Button „Nachricht senden" (grün, dunkler Text)
- Beim Absenden nur visuelles Feedback (z. B. Button-Text ändert sich kurz zu „Gesendet" oder ein Toast über `sonner`)
- Keine Server-Funktion, kein E-Mail-Versand, keine Speicherung

### 5. CTA-Banner und Footer
- `<ReferralBanner compact />`
- `<SiteFooter />` (wie auf `/faq`, `/bewertungen`, `/lieferung-zahlung`)

### 6. Header aktualisieren (`src/components/landing/site-header.tsx`)
- Rechts neben den beiden Dropdowns einen einfachen `<Link to="/kontakt">` einfügen
- Styling wie die Dropdown-Trigger: `text-xs font-semibold uppercase tracking-wide text-ink`, Hover `text-brand-deep`
- Label: „KONTAKT & HILFE"
- Kein Dropdown, kein Chevron

## Technische Details
- Imports: `createFileRoute`, `Link` aus `@tanstack/react-router`; Icons `Phone`, `Mail`, `HelpCircle`, `Send` aus `lucide-react`; `SiteHeader`, `ReferralBanner`, `SiteFooter` aus den bestehenden Landing-Komponenten; `Input`, `Textarea`, `Button`, `Checkbox`/`Label` aus shadcn/ui
- Design-Tokens wie im restlichen Projekt: `bg-background`, `bg-surface`, `border-line`, `text-ink`, `text-muted-custom`, `text-brand-deep`, `bg-brand`, `shadow-card`
- Keine neuen Abhängigkeiten
- Responsiv: Grid 1 Spalte mobil, 3 Spalten ab `md`

## Akzeptanzkriterien
- `/kontakt` ist erreichbar und hat eigenen Seitentitel + Meta-Tags
- Header zeigt „KONTAKT & HILFE" als klickbaren Link
- Formular ist sichtbar, aber reines Mockup (kein Netzwerk-Request beim Absenden)
- Seite verwendet denselben Footer und CTA-Banner wie die anderen Content-Seiten
- Build läuft fehlerfrei
