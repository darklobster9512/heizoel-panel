# Plan: Zentrierung der Kreditangebote-Sektion und Branding auf „smava"

## Ziel
1. Die Sektion „Mit Klaro zu passenden Kreditangeboten" (rechte Spalte) soll in ihrer Hälfte vertikal zentriert wirken.
2. Der Button „Jetzt Kreditvergleich starten" soll mittig unter den Vorteilen stehen, weißen Text haben und einen leichten Schatteneffekt erhalten.
3. Alle Vorkommen von „Klaro"/„klaro" im Frontend-Code werden durch „smava"/„smava" ersetzt (Sichtbarer Name, Meta-Tags, Twitter-Handle, Fließtexte, Footer, Logo).

## Technische Schritte

### 1. Sektion `MatchingOffers` in `src/components/landing/sections.tsx` justieren
- Rechte Text-/Vorteils-Spalte (`order-1`) vertikal in der verfügbaren Höhe zentrieren, damit Überschrift, Raster und Button optisch in der Mitte ihrer Hälfte stehen.
- Button entfernen von der linksbündigen Offset-Position (`md:ml-[102px]`) und horizontal zentrieren.
- Button-Styling: weiße Schrift (`text-white`) und leichter Schatten (`shadow-md` oder äquivalente Tailwind-Klasse).
- Sicherstellen, dass Desktop-Höhe (`md:h-[557px]`) weiterhin sauber greift und Mobil nicht gebrochen wird.

### 2. Branding-Replacement „Klaro" → „smava"
Folgende Dateien werden durchsucht und alle nutzersichtlichen Vorkommen von „Klaro"/„klaro" durch „smava"/„smava" ersetzt:
- `src/routes/index.tsx` – Page-Title, Meta `og:title`, `twitter:title`.
- `src/routes/__root.tsx` – Root-Title, Description, Author, OG/Twitter-Tags, `@klaro` Handle.
- `src/components/landing/sections.tsx` – Sektionsüberschriften (`Warum Klaro`), Vorteilstexte (`Klaro Kreditvergleich`), Footer-Firmierung (`Klaro Finance GmbH`), Copyright.
- `src/components/landing/logo.tsx` – Logo-Text.

Hinweis: Platzhalter wie „Klaro Finance GmbH" werden zu „smava Finance GmbH" geändert, da der Nutzer „überall" explizit angefordert hat.

## Validierung
- `bunx tsgo --noEmit` ausführen.
- Playwright-Check: Desktop-Ansicht (1280×1800) der Landingpage, um zu prüfen, dass die Sektion zentriert ist, der Button mittig mit weißem Text und Schatten erscheint und kein „Klaro" mehr sichtbar ist.
