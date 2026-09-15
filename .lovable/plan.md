# Seitentitel, Beschreibung, Favicon und Lovable-Hinweise

## Ziel

Die Seite bekommt überall passende Titel und Beschreibungen (HEIZKING statt der alten Kredit-Texte), ein eigenes Favicon, und alle sichtbaren Lovable-Hinweise verschwinden aus dem Projekt.

## Titel & Beschreibungen

Standardwerte (`__root.tsx`) stehen noch auf einem alten Kreditvergleich-Text („smava — Kreditvergleich"). Die werden ersetzt durch HEIZKING-Angaben (Seitenname, Autor, Social-Vorschau-Typ).

Jede Unterseite bekommt einen eigenen Titel und eine eigene Beschreibung:

- Anmeldung (`/auth`) — „Anmeldung — HEIZKING Panel"
- Panel-Übersicht (`/admin`)
- Bestellungen, Brandings (Liste, neu, bearbeiten), Bankkonten, E-Mail-Vorlagen, Rechnung, SMS, Telegram, Einstellungen, Caller
- Weiterleitungsseite

Alle internen Panel-Seiten bekommen zusätzlich `noindex`, damit sie nicht in Suchmaschinen landen. Die Startseite bleibt indexierbar und behält ihren bestehenden Text.

## Favicon

Ein neues Zeichen wird erzeugt: ein schlichtes quadratisches Brandmark mit dem Buchstaben „H" und dem grünen Akzent (#22C55E) des Projekts, hell und ruhig, gut lesbar bei kleiner Größe. Es wird auf 64x64 verkleinert als `public/favicon.png` abgelegt und im Kopfbereich verlinkt; das bisherige `public/favicon.svg` wird gelöscht.

## Lovable-Hinweise

Entfernt wird alles Sichtbare:

- `README.md` wird durch eine kurze HEIZKING-Projektbeschreibung ersetzt
- Der Lovable-Block in `AGENTS.md` entfällt
- Kommentarzeile in `vite.config.ts`

Nicht entfernt werden die technischen Bausteine, die das Projekt zum Laufen braucht (Build-Paket, Fehlerprotokoll, Supabase-Anbindung) — ein Entfernen würde die App unbrauchbar machen. Diese sind für Besucher der Seite nicht sichtbar.

## Technische Details

- `head()` je Route in `src/routes/**`, Titel als `meta`-Eintrag; `og:title`, `og:description`, `og:type`, `twitter:card` je Seite; `robots: noindex, nofollow` auf allen `_authenticated`-Routen und `/auth`.
- Kein `og:image`, da keine absolute Bild-URL vorliegt.
- Favicon per imagegen, mit `magick` auf 64x64 quadratisch skaliert, `{ rel: "icon", type: "image/png", href: "/favicon.png" }` in `__root.tsx`.
- `src/lib/lovable-error-reporting.ts`, `@lovable.dev/vite-tanstack-config` und `src/integrations/supabase/*` bleiben unverändert.
