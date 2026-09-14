# Vertrauen-Sektion verlinken + neue Seite /heizoel-wissen

## 1. Links in `TRUST_CARDS` (`src/components/landing/sections.tsx`) umziehen

| Link | Ziel |
|---|---|
| Heizöl Preisvergleich, Aktuelle Heizölpreise, Heizöl EL Standard, Premium-Heizöl | `/preisrechner` |
| Lieferzeiten, Expresslieferung, Zahlungsarten, Mindestbestellmenge | `/lieferung-zahlung` |
| Preisrechner, Händler in Ihrer Region | `/preisrechner` |
| Beratung | `/kontakt` |
| Häufige Fragen | `/faq` |
| Preisentwicklung, Heizöl im Sommer kaufen, Sammelbestellungen, Preisgarantie | `/faq` |
| Sorten im Vergleich, Tank richtig pflegen, Verbrauch senken, Heizöl-Glossar | `/heizoel-wissen` (mit Ankern `#sorten`, `#tank`, `#verbrauch`, `#glossar`) |

Links werden von `<a target="_blank">` auf interne `Link`-Navigation umgestellt (gleiche Optik, kein neuer Tab).

## 2. Neue Seite `/heizoel-wissen`

Neue Datei `src/routes/heizoel-wissen.tsx` im gewohnten Seitenaufbau: `SiteHeader`, grauer Seitenkopf mit grüner Bottomline, eigenem `head()` („Heizöl-Wissen für Ihr Zuhause | Klaro" + Meta/OG), `ReferralBanner compact`, `SiteFooter`.

Inhalt — 4 Wissensblöcke (jeweils eigene Sektion mit Anker-ID, abwechselnd weiß/grau, Icon + Text, seriös im bestehenden Stil):

1. **Sorten im Vergleich** (`#sorten`): Heizöl EL Standard vs. Premium-Heizöl (schwefelarm, Additive, Brennwert, Einsatzbereiche, für wen sich was lohnt).
2. **Tank richtig pflegen** (`#tank`): regelmäßige Prüfung, Tankinnenreinigung, Wasser-/Schlammbildung, Dichtheitsprüfung, Lebensdauer.
3. **Verbrauch senken** (`#verbrauch`): Heizungswartung, richtige Kesseleinstellung, hydraulischer Abgleich, Nachtabsenkung, Dämmung.
4. **Heizöl-Glossar** (`#glossar`): kompakte Begriffsliste (Heizöl EL, schwefelarm, Brennwert, Din-Spezifikation, Festpreis, Lieferstelle etc.) als Definition-List.

Am Ende jeder Sektion ein dezenter Link zum Preisrechner („Jetzt Heizölpreis berechnen").

## 3. Verifikation
- Build-Log prüfen.
- Playwright: Landingpage-Links prüfen (Ziele korrekt), Screenshots der neuen Seite Desktop + Mobil.
