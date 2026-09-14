# Plan: Abschnitt „Persönliche Angaben" durch „Heizöl günstig einkaufen" ersetzen

## Ziel
Der aktuelle Abschnitt `PersonalDataInfo` in `src/components/landing/sections.tsx` wird inhaltlich ersetzt. Statt der Erklärung zu persönlichen Daten erscheint ein kurzer, gut lesbarer Text über „Heizöl günstig einkaufen" mit sinnvollen Fettdruck-Hervorhebungen.

## Umsetzung
### 1. `src/components/landing/sections.tsx`
- `PersonalDataInfo`-Komponente beibehalten, aber Text und Überschrift austauschen.
- Neue Überschrift: **„Heizöl günstig einkaufen"**
- Neuer Text (kürzer, mit passenden Bold-Stellen):
  - Absatz 1: **Heizöl** ist neben Gas der wichtigste Energieträger – besonders in der kalten Jahreszeit spielen die **Heizölpreise** eine große Rolle.
  - Absatz 2: Die Preise für Heizöl schwanken stark. Sie hängen ab vom **Dollarkurs**, der weltweiten **Ölnachfrage** und der politischen Lage in den ölfördernden Ländern.
  - Absatz 3: Deshalb lohnt es sich, das ganze Jahr über die Marktentwicklung zu beobachten und bei **günstigen Preisen** zuzugreifen.
  - Absatz 4: Vor einer Bestellung sollten Verbraucher die Angebote mit einem **Heizölrechner vergleichen** – denn auch zwischen den Händlern gibt es deutliche Unterschiede.
- Formatierung: Kurze Absätze mit ausreichend Zeilenabstand, wichtige Begriffe fett, Gesamtlänge deutlich kürzer als das Beispiel des Nutzers.
- Bild (`coupleOnCouch`) und Layout (zweispaltig, Bild rechts) bleiben unverändert.

### 2. Keine weiteren Änderungen
- Keine neuen Assets, keine Backend- oder Routing-Änderungen.
- Andere Sektionen (TrustBar, Steps, Testimonials, FAQ, Footer) bleiben unverändert.

## Verifikation
- Build prüfen.
- Screenshot Desktop und Mobil der neuen Sektion prüfen: Text gut lesbar, Fettdruck-Stellen sichtbar, Layout intakt.