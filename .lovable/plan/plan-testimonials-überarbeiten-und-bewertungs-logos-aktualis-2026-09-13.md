# Plan: Testimonials überarbeiten und Bewertungs-Logos aktualisieren

## Ziel
Die Kundenstimmen-Sektion wird inhaltlich und visuell aufgeräumt: keine Altersangaben mehr, stattdessen volle Namen, fünf Karussell-Seiten statt drei, ansprechendere Karten. Darunter werden die Bewertungs-Logos aktualisiert (Google-Icon, Trusted-Shops-Icon, größeres eKomi-Logo) und die vierte Spalte entfernt.

## Umsetzung

### 1. Assets anlegen
- `google_g_icon.webp` aus `/mnt/user-uploads/` als CDN-Asset in `src/assets/google-icon.webp.asset.json` anlegen.
- `trust2.png` aus `/mnt/user-uploads/` als CDN-Asset in `src/assets/trusted-shops-icon.png.asset.json` anlegen.

### 2. `src/components/landing/customer-voices.tsx`

#### Testimonials
- `author` in allen Einträgen ändern von „Vorname B., Alter" zu vollständigen Namen (z. B. „Gisela Schmidt", „Sabrina Gärtner" usw.).
- Bestand 9 Stimmen um 6 weitere plausible deutsche Stimmen erweitern, damit 15 Einträge vorhanden sind.
- `PAGES` auf fünf Seiten à 3 Karten aufteilen (`slice(0,3)`, `slice(3,6)`, `slice(6,9)`, `slice(9,12)`, `slice(12,15)`).
- Punkte-Navigation zeigt dadurch automatisch 5 Punkte.

#### Karten-Styling (dezent, im bestehenden Enterprise-Look)
- Ecken etwas runder: `rounded-lg` statt `rounded-[4px]`.
- Schatten dezenter und weicher: `shadow-[0_2px_8px_rgba(0,0,0,0.06)]`.
- Oben eine 2 px grüne Akzentlinie (`bg-brand`) als ruhiger Farbakzent.
- Padding leicht erhöht: `p-7` statt `p-6`.
- Blockquote-Zeilenabstand und Farbe beibehalten, minimale Höhe anpassen.
- Avatar-Bild weiterhin verwenden.

#### Bewertungsübersicht
- `RATINGS` auf 3 Einträge reduzieren:
  1. **eKomi** – Logo größer darstellen (`h-[26px]` statt `h-[18px]`, proportional `w-auto`), Wert/Count beibehalten.
  2. **Trusted Shops** – Label „Trusted Shops", neues Icon (`trust2.png`) statt Trustpilot, Wert und Count beibehalten.
  3. **Google** – Label „Google", neues Icon (`google_g_icon.webp`) statt Text, Wert und Count beibehalten.
- Vierte Spalte „Kundenbewertung" entfernen.
- Layout-Grid anpassen: `md:grid-cols-3` statt `md:grid-cols-4`.

### 3. Keine weiteren Änderungen
- Hero, OfferCard, TrustBar, Header und Rest der Seite bleiben unverändert.
- Keine Backend- oder Routing-Änderungen nötig.

## Verifikation
- Typecheck/Build prüfen.
- Screenshot Desktop und Mobil der Testimonial-Sektion prüfen: 5 Punkte sichtbar, Karten mit vollem Namen, keine Altersangaben, 3 Spalten in der Bewertungsübersicht.