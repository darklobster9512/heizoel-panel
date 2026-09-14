# Landingpage: Von Kreditvergleich zu Heizöl-Preisvergleich

Die Startseite wird von "smava Kreditvergleich" auf eine Heizöl-Preisvergleichsplattform unter dem Namen **Klaro** umgestellt. Design, Layout, Farben und Schrift bleiben exakt gleich — es ändern sich nur Inhalte, Texte und die Auswahlfelder in der Hero-Karte. Antragsstrecke, Angebotsseite und Dashboard bleiben unverändert.

## Änderungen im Detail

### Hero-Bereich
- Überschrift: "Günstige Kredite - garantiert!" → z. B. "Günstiges Heizöl - garantiert!"
- Checkliste: Heizöl-typische Punkte (Angebote von über 300 Händlern, kostenlos & unverbindlich, Preise aktuell aus der Region)
- **Hero-Karte**: Statt Verwendung/Betrag/Laufzeit neue Auswahl:
  - Postleitzahl (Eingabefeld)
  - Menge in Litern (Auswahl: 500–10.000 Liter, Standard 3.000)
  - Sorte (Auswahl: Heizöl EL Standard / schwefelarm / Premium)
  - Button: "Jetzt Heizölpreise vergleichen" — verlinkt vorerst auf die bestehende Antragsstrecke mit den neuen Parametern (PLZ, Liter, Sorte)
- Trust-Badges (TÜV, eKomi, Bewertung) bleiben als Platzhalter bestehen

### Weitere Sektionen der Startseite (Texte auf Heizöl umgeschrieben)
- **Konditionen-Box** → "Heizöl Preis-Übersicht" (Literpreis-Beispielwerte, Liefermengen statt Zinsen/Laufzeiten)
- **Partnerleiste**: Bankenlogos entfernen; stattdessen Platzhalter-Namen für Heizölhändler als Textlogos (gleiche Raster-Anordnung)
- **Kundenstimmen**: Namen/Texte auf Heizöl-Bestellungen umschreiben
- **Schritte**: "In 3 Schritten zum Wunschkredit" → "In 3 Schritten zum günstigen Heizöl" (Anfrage, Angebote vergleichen, Lieferung bestellen)
- **Persönliche Daten erklärt**: Text auf Heizöl-Anfrage anpassen (PLZ für regionale Preise, keine Bonitätsprüfung)
- **Passende Angebote**: Heizöl-Angebotskarten mit Literpreis statt Zinssatz
- **FAQ**: Fragen/Antworten komplett auf Heizöl (Lieferzeit, Mindestmenge, Zahlungsarten, Preisgarantie)
- **Vertrauenslinks / Empfehlungsbanner / Footer**: Texte auf Klaro & Heizöl umstellen

### Header, Logo & Metadaten
- Logo: "smava"-Schriftzug → "Klaro" (gleicher Look, gleiche Position)
- Navigation: Kredit-Begriffe → Heizöl-Begriffe (z. B. Heizöl, Preise, Lieferung, Service)
- Seitentitel & Beschreibung (SEO): "Klaro — Heizöl-Preisvergleich für Deutschland", FAQ-Strukturdaten entsprechend angepasst

## Was sich NICHT ändert
- Farben, Typografie, Abstände, Schatten, Komponenten-Struktur
- Routen `/antrag/*`, `/angebote`, `/dashboard`, `/admin` bleiben funktional wie bisher

## Technische Hinweise
- Betroffene Dateien: `src/routes/index.tsx`, `src/components/landing/hero.tsx`, `offer-card.tsx`, `sections.tsx`, `customer-voices.tsx`, `site-header.tsx`, `logo.tsx`
- Preis- und Händlerangaben bleiben Platzhalter (wie bisher Firmenname/Zinssätze)
- Banken-Logo-Bilder werden nicht mehr importiert; Händlernamen als Text dargestellt
