# Logo-Farbe in Auth, Dashboard und Admin an Landingpage angleichen

## Ziel
Das smava-Logo im Header der Seiten `/auth`, `/dashboard` und `/admin` soll grün dargestellt werden, genau wie auf der Landingpage.

## Aktueller Zustand
- `src/components/landing/site-header.tsx` verwendet `<Logo className="... text-smava-logo ..." />` → grün.
- `src/routes/auth.tsx` und `src/components/app/app-shell.tsx` verwenden `<Logo className="... text-[#323232] ..." />` → dunkelgrau.
- `AppShell` wird von `/dashboard` und `/admin` gemeinsam genutzt.

## Änderungen
1. `src/routes/auth.tsx`: Logo-Klasse von `text-[#323232]` auf `text-smava-logo` ändern.
2. `src/components/app/app-shell.tsx`: Logo-Klasse von `text-[#323232]` auf `text-smava-logo` ändern.

## Validierung
- Typecheck mit `bunx tsgo --noEmit`.
- Visuelle Prüfung per Playwright auf `/auth`, `/dashboard` und `/admin`, dass das Logo grün erscheint.
