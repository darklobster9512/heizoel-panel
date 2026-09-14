# Plan: Footer-Farbstruktur & Bewertungs-Icons anpassen

Der Footer wird farblich neu geschichtet und die Markenspalte bekommt die drei Bewertungs-Icons aus der Testimonial-Sektion.

## Änderungen

1. **Oberer Footer-Block (Marke, Services, Rechtliches, Zahlungsarten/Bewertung):**
   - Hintergrund von `bg-surface` (grau) auf weiß (`bg-card`/`bg-background`)
   - Oberhalb eine Trennlinie (`border-t border-line`), damit der Footer von der Sektion darüber abgegrenzt ist
   - Unter dem Marken-Text („Heizöl online günstig bestellen. Tagesaktuelle Preise, deutschlandweite Lieferung, über 33.000 zufriedene Kunden.") eine Zeile mit den drei Bewertungs-Icons aus der Testimonial-Sektion: eKomi (`ekomi.webp`), Google (`google-icon.webp`), Trusted Shops (`trusted-shops-icon.png`) — kleine, inline angeordnete Logos wie im Referenz-Screenshot

2. **Auszeichnungen & Vertrauen:**
   - Hintergrund von weiß auf grau (`bg-surface`), mit Trennlinien oben und unten

3. **Fußleiste unten (Copyright + Impressum/Datenschutz/AGB):**
   - Hintergrund weiß

## Technische Details

- Datei: `src/components/landing/sections.tsx` (nur `SiteFooter` plus neue Icon-Imports `eKomiLogo`, `googleIcon`, `trustedShopsIcon` aus den vorhandenen Asset-Pointern unter `@/assets/`)
- Keine Änderungen an Links, Texten oder Layout-Struktur der Spalten
- Verifikation: Build-Log prüfen, danach Screenshots Desktop/Mobile des Footers
