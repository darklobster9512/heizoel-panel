# FAQ-Sektion ersetzen durch „Heizölsorten im Überblick“

## Ziel
Die FAQ-Akkordeon-Sektion auf der Landingpage wird entfernt und durch eine Vergleichstabelle „Heizölsorten im Überblick“ ersetzt (Standard vs. Premium), angelehnt an den Referenz-Screenshot, aber im Stil der Landingpage (Design-Tokens, Brand-Grün, serifenlos, dezente Schatten).

## Änderungen

### 1. `src/components/landing/sections.tsx`
- **Entfernen:** `FAQS`-Array und `Faq()`-Komponente.
- **Neu:** Komponente `HeizoelSorten()` mit weißer Tabellen-Karte auf `bg-background`:
  - Überschrift: „Heizölsorten im Überblick“ (gleiche Headline-Größen wie andere Sektionen, zentriert).
  - Spalten: Merkmal (links) | „Heizöl Standard“ mit Untertitel „Das Günstige“ (Tropfen-Icon, Brand-Grün) | „Heizöl Premium“ mit Untertitel „Das Sparsame“ (Flammen-Icon).
  - 7 Zeilen mit Check-Icon (Brand-Grün) oder X-Icon (`text-destructive`) laut Tabelle unten. Info-Icon (Kreis-„i“, `text-muted-foreground`) neben jeder Zeile öffnet einen Tooltip (shadcn `Tooltip`) mit dem Info-Text.
  - Styling: `rounded-xl border border-line bg-card shadow-sm`, Zeilen durch feine `border-line`-Trenner, responsive (auf Mobil Spalten schmaler, Texte umbrechen).

**Tabellen-Inhalt:**

| Merkmal | Standard | Premium |
|---|---|---|
| mit anderen Heizölsorten mischbar | ✔ | ✔ |
| für alle Ölheizungen geeignet | ✔ | ✔ |
| geringerer Verbrauch | ✘ | ✔ |
| angenehmer Geruch | ✘ | ✔ |
| verbesserte Lagerfähigkeit | ✘ | ✔ |
| höhere Betriebssicherheit & Lebenszeit der Heizungsanlage | ✘ | ✔ |
| umweltschonende Biokomponenten | ✘ | ✘ |

**Tooltip-Texte (i-Punkte):**
1. „Mit anderen Ölsorten mischbar — Heizöl Standard und Premium lassen sich auch bei Restbeständen im Tank untereinander mischen. Mischbarkeit von Bioheizöl mit Heizöl Standard und Premium ist abhängig von Ihrer Heizanlage. Fragen Sie im Zweifelsfall den Hersteller Ihres Heizgerätes.“
2. „Für alle Ölheizungen geeignet — Einsatz für alle Ölheizungen inkl. Brennwerttechnik.“
3. „Reduzierter Verbrauch — Nahezu rückstandfreie Verbrennung führt zu höherer Effizienz und dadurch Reduzierung des Ölverbrauchs, verhindert Ablagerungen und sorgt so für eine bessere Wärme- bzw. Energieausbeute. Es bildet sich weniger Ruß und somit werden die Umwelt-Emissionen gesenkt.“
4. „Angenehmer Geruch — Geruchszusätze neutralisieren den typischen Ölgeruch und sorgen für angenehmen Duft, sowohl während der Betankung als auch im Regelbetrieb der Heizung.“
5. „Höhere Lagerstabilität des Heizöls — Stabilitätsverbesserer verhindern die Bildung von Sedimenten, Ablagerungen und Schlamm und verlangsamen somit die natürliche Alterung des Öls und machen es länger lagerfähig.“
6. „Höhere Betriebssicherheit & Lebenszeit der Heizung — Die Minimierung von Ablagerungen und Ruß reduziert nicht nur den Verbrauch, sondern schützt auch vor störungsbedingten Ausfällen. Spezielle Additive unterbinden beispielsweise die Rostbildung im Brennersystem. Eine erhöhte Schmierfähigkeit schützt die Förderpumpe. Insgesamt erhöht dies die Nutzungsdauer, schützt vor teuren Reparaturen und senkt den Wartungsaufwand.“
7. „Schwefelarmes Heizöl — Enthält Komponenten aus nachwachsenden Rohstoffen, meist durch Beimischung von Rapsöl oder anderen veresterten Pflanzenölen. Hierdurch wird eine Reduzierung der CO2-Emissionen erreicht.“

### 2. `src/routes/index.tsx`
- `<Faq />` im Seitenaufbau durch `<HeizoelSorten />` ersetzen (gleiche Position).
- FAQPage-JSON-LD-Script entfernen (FAQ gibt es nicht mehr); Importe `Faq`/`FAQS` ersetzen.

### 3. Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop (1280×1800) und Mobil (390×1800) der neuen Sektion, inkl. geöffnetem Tooltip.

## Technisch
- Icons: `Check`, `X`, `Info`, `Droplet`, `Flame` aus lucide-react; Tooltip über `@/components/ui/tooltip` (shadcn, bei Bedarf neu anlegen, falls nicht vorhanden).
- Keine Backend-/Routing-Änderungen; Antragsstrecke bleibt unberührt.
