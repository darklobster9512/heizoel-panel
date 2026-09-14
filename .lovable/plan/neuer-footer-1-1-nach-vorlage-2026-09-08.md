# Neuer Footer (1:1 nach Vorlage)

Der bestehende dunkle Footer wird komplett ersetzt durch einen hellen Footer nach der Vorlage.

## Aufbau

1. **Vier Spalten** (Desktop, heller Hintergrund, grüne verlinkte Überschriften):
   - **Unternehmen**: Unternehmen, Karriere, Presse, Hilfe, Unsere Partner, Kontakt, Digital Services Act (DSA)
   - **Kredit aufnehmen**: Kredit aufnehmen, Kreditvergleich, Sofortkredit, Privatkredit, Autokredit, Umschuldung, Baufinanzierung
   - **Service**: Service, Kreditrechner, Glossar, Nachrichten, Partnerprogramm, smava Gutschein, Freunde werben Freunde
   - **Kostenlose Beratung**: „Wir beraten Sie gerne telefonisch unter:", Telefonnummer 0800 000 98 00 als Anruf-Link, darunter „Montag – Freitag: 8:00 – 20:00 Uhr" und „Samstag: 10:00 – 15:00 Uhr"
2. **Mobil**: Die vier Blöcke werden zu aufklappbaren Bereichen mit Pfeil-Symbol (standardmäßig geschlossen).
3. **Untere Zeile**: Logo links, rechts fünf grüne Social-Icons (YouTube, LinkedIn, Instagram, Facebook, X) als Inline-SVGs in der Markenfarbe.
4. **Abschluss**: Links Datenschutz, AGB, Impressum, Cookies, Widerruf sowie
   „© 2026 smava.de | Palisadenstraße 90 | 10243 Berlin".

## Links

Alle Ziele werden exakt aus der Vorlage übernommen (externe smava.de-, jobs.smava.de-, zendesk-, aklamio-Adressen sowie /kontakt/ und /digital-services-act/). Externe Links öffnen in neuem Tab mit `rel="noopener noreferrer"`.

## Technisches

- `SiteFooter` in `src/components/landing/sections.tsx` wird ersetzt; bestehende Einbindung in `src/routes/index.tsx` bleibt.
- Aufklappbereiche über die vorhandene Accordion-Komponente, Farben über bestehende Design-Tokens (Akzentgrün, neutraler Hintergrund).
- Der alte PAngV-Beispieltext im Footer entfällt, da die Vorlage ihn nicht enthält.
