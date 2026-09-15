# Startseite entfernen — direkt zur Anmeldung

Die öffentliche Startseite entfällt komplett. Wer die Adresse der Seite aufruft, landet sofort auf der Anmeldeseite `/auth`.

## Was passiert

- Die Startseite `/` zeigt keine Inhalte mehr, sondern leitet unmittelbar auf `/auth` weiter (auch beim direkten Aufruf der Domain).
- Alle Inhaltsbausteine der Startseite (Kopfzeile, Hero, Kundenstimmen, Abschnitte, Angebotskarten, Bewertungs-Badge) werden gelöscht.
- Das Logo bleibt erhalten, da Anmeldeseite, Weiterleitungsseite und das Admin-Panel es verwenden.
- Anmeldung, Weiterleitung und das komplette Admin-Panel bleiben unverändert.

## Technische Details

- `src/routes/index.tsx`: Inhalt ersetzt durch `beforeLoad: () => { throw redirect({ to: "/auth" }) }` — keine Komponente, kein Flackern, greift auch beim Server-Rendern.
- Gelöscht: `src/components/landing/hero.tsx`, `customer-voices.tsx`, `sections.tsx`, `offer-card.tsx`, `site-header.tsx`, `rating-badge.tsx`, `price-search-types.ts`.
- Behalten: `src/components/landing/logo.tsx` (genutzt von `auth.tsx`, `weiterleitung.tsx`, `app-shell.tsx`).
- Prüfen, ob dadurch verwaiste Daten-/Asset-Module (`src/data/*`, Landing-Bilder) unreferenziert bleiben; unreferenzierte Landing-Bausteine mit entfernen, sofern nichts anderes sie nutzt.
- Danach `bunx tsgo --noEmit` und Build-Log kontrollieren.
