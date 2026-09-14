# Plan: Bankenlogos im Handy-Mockup durch Heizöl-Anbieter-Logos ersetzen

## Ziel
In der Sektion „Mit Klaro zum günstigsten Heizölpreis" zeigt das Handy-Bild (Angebotsliste, `fake-offer-list.svg`) noch Bankenlogos. Diese werden durch die vier hochgeladenen Heizöl-Anbieter-Logos ersetzt: Aral, Montana, team und TotalEnergies.

## Umsetzung

### 1. Bild bearbeiten
- Die bestehende Angebotsliste (CDN-URL aus `src/assets/fake-offer-list.svg.asset.json`) zusammen mit den vier hochgeladenen Logos (`/mnt/user-uploads/aral_logo-2.webp`, `montana-2.jpg`, `team-2.png`, `total_energies-2.png`) an das Bild-Bearbeitungs-Tool geben.
- Auftrag: Die Bankenlogos in den Angebots-Zeilen durch die vier Heizöl-Anbieter-Logos ersetzen (eine Zeile pro Anbieter, Reihenfolge wie in der Liste), Rest des Mockups (Handy-Rahmen, Preise, Sterne, Layout) unverändert lassen.
- Ergebnis als PNG speichern und visuell prüfen (QA): Logos korrekt platziert, keine Bankennamen mehr sichtbar, keine Verzerrungen.

### 2. Neues Bild einbinden
- Bearbeitetes PNG als CDN-Asset anlegen: `lovable-assets create --file <png> --filename heizoel-offer-list.png > src/assets/heizoel-offer-list.png.asset.json`.
- In `src/components/landing/sections.tsx` den Import `fake-offer-list.svg.asset.json` durch `heizoel-offer-list.png.asset.json` ersetzen (Variable `offerList` zeigt auf das neue Asset).
- Falls das neue Bild andere Proportionen hat, `width`/`height`-Attribute am `<img>` anpassen.

### 3. Verifikation
- Build prüfen.
- Screenshot der Sektion auf Desktop und Mobil: Heizöl-Logos sichtbar, keine Bankenlogos mehr, Bild sauber dargestellt.

## Hinweis
Das alte SVG-Asset bleibt vorerst bestehen (wird nicht mehr referenziert); es kann später bei Bedarf gelöscht werden.
