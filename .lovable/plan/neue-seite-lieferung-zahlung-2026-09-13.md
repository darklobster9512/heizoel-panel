# Neue Seite /lieferung-zahlung

## Ziel
Neue Seite „Lieferung & Zahlung" im Klaro-Design, inhaltlich angelehnt an fastenergy24.com/lieferung-zahlung.php, mit den 3 hochgeladenen Zahlungsarten-Bildern, CTA-Banner und Footer wie auf Landingpage/Preisrechner.

## Aufbau der Seite (oben → unten)

1. **SiteHeader** (wie Landingpage)
2. **Seitenkopf:** H1 „Lieferung & Zahlung" + Unterzeile „Alle Informationen zu Lieferzeiten, Zahlungsarten und Liefermodalitäten"
3. **4 USP-Kacheln** (Grid, Icons):
   - Schnelle Lieferung — ca. 7 Werktage deutschlandweit
   - Flexible Zahlung — Bar, EC-Karte, Vorauskasse
   - Festpreisgarantie — Preis des Bestelltages gilt
   - 50 € Entschädigung — Bei Lieferverspätung
4. **„So funktioniert die Lieferung"** — Textsektion (Tankflotte/Partnerhändler, Liefertermin, Sammelbestellungen 10 km / jede Abladestelle = 1 Lieferstelle, litergenaue Abrechnung zum Bestelltagespreis, separate Rechnungen, Hinweis auf Hilfeseite)
5. **Lieferfrist-Box:** Auslastungsanzeige mit „hoch"-Status (Badge/Skala, aktuell statisch)
6. **„Unsere Zahlungsarten"** (alle ohne Aufpreis):
   - Hinweistext zu regionalen Abweichungen / Anzahlung bei Neukunden / PLZ-abhängige Modalitäten
   - 3 Karten mit den hochgeladenen Bildern:
     - **Barzahlung** (barzahlung.png) — Zahlung in bar an Tankwagenfahrer, Bargeld vorrätig halten
     - **Vorauskasse** (vorauskasse.png) — Überweisung vor Lieferung, Kontodaten per Auftragsbestätigung/E-Mail, Erstattung bei Restmenge
     - **EC-Karte (Girocard)** (ec-karte.png) — mobiles Kartenlesegerät am Tankwagen, PIN, Hinweis Kartenlimit
7. **CTA-Banner:** vorhandene `ReferralBanner`-Komponente („Jetzt Heizöl günstiger bestellen! …")
8. **SiteFooter** (inkl. Städte-/Bundesländerbereich, identisch zu Landingpage/Preisrechner)

## Technische Umsetzung

- **Bilder als CDN-Assets:** `lovable-assets create` für `/mnt/user-uploads/barzahlung.png`, `vorauskasse.png`, `ec-karte.png` → Pointer unter `src/assets/`, Import der `.asset.json`, Binaries bleiben aus dem Repo.
- **Neue Route:** `src/routes/lieferung-zahlung.tsx` mit `createFileRoute("/lieferung-zahlung")`, eigener `head()` (Title „Lieferung & Zahlung | Klaro", Description, og:title/og:description, og:type, twitter:card).
- Seite nutzt bestehende Komponenten/Token (`SiteHeader`, `SiteFooter`, `ReferralBanner`, `bg-surface`, `border-line`, `text-ink`, `text-muted-custom`, Lucide-Icons) — keine neuen Farben.
- Texte 1:1 aus deiner Vorlage übernehmen.
- Verifikation: Build-Log prüfen + Playwright-Screenshots (Desktop/Mobil) von `/lieferung-zahlung`.

## Nicht enthalten
- Keine dynamische Lieferfrist (bleibt statisch „hoch")
- Keine Navbar-Erweiterung (nur falls gewünscht)
