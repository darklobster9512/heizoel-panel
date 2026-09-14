# Freundlichere Zahlungshinweise

## Ziel
Die Hinweise „Neukunden: 50 % Anzahlung" und „Nur für Bestandskunden" bei den Zahlungsarten wirken aktuell zu aggressiv/negativ und sollen freundlicher gestaltet werden.

## Änderungen in `src/routes/bestellen.tsx`

### 1. Farbgebung der Hinweise anpassen
- Hintergrund von knalligem Orange (`bg-[#fff7ed]`) auf einen dezenten, freundlichen Ton wechseln, z. B. `bg-brand/10` (hellgrünlich) oder `bg-surface`.
- Textfarbe von dunklem Orange (`text-[#c2410c]`) auf `text-brand` oder `text-muted-custom` umstellen.
- Schrift weiterhin klein und dezent (`text-[11px] font-semibold`), damit die Hinweise sichtbar, aber nicht aufdringlich bleiben.

### 2. Optional: Hinweistexte leicht entschärfen
- Prüfen, ob „Nur für Bestandskunden" in einen einladenderen Wortlaut geändert werden soll (z. B. „Für Bestandskunden"). Wird nur auf Wunsch umgesetzt — primär geht es um die Farbe.

## Prüfung
- Screenshot Schritt 2: Zahlungshinweise wirken deutlich freundlicher und weniger warnend.
- Build/Typecheck läuft sauber durch.
