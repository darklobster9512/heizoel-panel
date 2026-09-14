# „Jetzt Preis berechnen"-Button in „Heizölsorten im Überblick" entfernen

## Ziel
In der Sektion „Heizölsorten im Überblick" soll der darunter stehende CTA-Button „Jetzt Preis berechnen" entfernt werden.

## Änderungen

### `src/components/landing/sections.tsx`
- In der Komponente `HeizoelSorten` den Button-Block unterhalb der Tabelle entfernen:
  ```text
  <div className="mt-12 flex justify-center">
    <Button asChild className="h-12 w-full max-w-[250px] text-[13px] font-bold !text-white shadow-md">
      <a href="#rechner">Jetzt Preis berechnen</a>
    </Button>
  </div>
  ```
- Der `Button`-Import bleibt bestehen, da er in `MatchingOffers` weiter verwendet wird.
- Tabelle, Überschrift, Eyebrow und Info-Popover bleiben unverändert.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der Sektion, um sicherzustellen, dass der Button entfernt ist und das Layout sauber aussieht.
