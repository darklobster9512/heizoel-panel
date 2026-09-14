# CTA-Sektion visuell überarbeiten

## Ausgangslage
Die aktuelle grüne CTA-Card zwischen „Heizölsorten im Überblick" und „Vertrauen Sie auf Klaro" wirkt unprofessionell. Der Nutzer hat die Richtung „Professional green enterprise CTA" gewählt.

## Ziel
Die CTA-Sektion bekommt einen ruhigen, seriösen Enterprise-Look mit weißem Text auf einem kräftigen, aber nicht verspielten grünen Hintergrund.

## Design-Entscheidungen
- **Hintergrund:** Volle Breite, kräftiges Grün mit ausreichend Kontrast für weißen Text. Wir verwenden ein leicht dunkleres Grün als den normalen Button-Grün-Ton, damit weiße Schrift gut lesbar ist, ohne in ein dunkles Tannengrün abzurutschen.
- **Textfarbe:** Weiß (`text-white`) für Headline, Subline und Vertrauenszeile.
- **Typografie:** Größere, fettgedruckte Headline, mittig zentriert, ausreichend Whitespace.
- **Buttons:**
  - Primär: weißer Hintergrund, grüner Text, dezenter Schatten.
  - Sekundär: transparenter Hintergrund, weißer Rahmen, weißer Text.
- **Vertrauenszeile:** Drei kurze Punkte mit kleinen Check-Icons statt einfacher Bullet-Trenner, visuell aufgelockert.
- **Hintergrunddetail:** Sehr dezentes, weißes Grid-Pattern mit niedriger Opazität, um Tiefe zu erzeugen ohne Glas-/Blur-Effekte.
- **Mobile:** Buttons untereinander, Texte umbrechen sauber, Abstände angepasst.

## Technische Umsetzung
1. `src/components/landing/sections.tsx`: Bestehende `CtaCard`-Komponente ersetzen/erweitern.
   - Neues semantisches Token für den dunkleren CTA-Hintergrund in `src/styles.css` hinzufügen (z. B. `--cta-bg`).
   - Inline-SVG-Grid-Pattern als Hintergrunddekor.
   - Check-Icon für die Vertrauenszeile (Lucide `Check` oder eigenes SVG).
2. `src/routes/index.tsx`: Keine Änderung nötig, Einbindung bleibt.
3. Build prüfen und Desktop/Mobile-Screenshots erstellen.
