# Branding speichern: Domain-Eingabe ohne "https://" zulassen

Das Speichern scheitert nicht am Logo, sondern am Feld **Domain**: Es akzeptiert derzeit nur vollständige Adressen mit `https://`. Eine Eingabe wie `heizoel-deutschland.com` wird abgelehnt, und die Oberfläche zeigt nur die allgemeine Meldung "Das Branding konnte nicht gespeichert werden."

Bestätigt über das Fehlerprotokoll: Validierungsfehler `Invalid url` im Feld `domain` beim Speichern.

## Was sich ändert

- Domains dürfen künftig auch ohne `https://` eingegeben werden (`heizoel-deutschland.com`, `www.shop.de`, mit oder ohne Pfad). Vorangestelltes `http://`/`https://` bleibt weiterhin erlaubt.
- Eine echt fehlerhafte Eingabe (Leerzeichen, fehlende Punkt-Endung) wird weiterhin abgelehnt.
- Statt der pauschalen Meldung zeigt das Formular künftig, welches Feld nicht stimmt (z. B. "Bitte eine gültige Domain angeben." oder "Bitte eine gültige E-Mail-Adresse angeben.").
- Der Hinweis am Domain-Feld wird angepasst, damit klar ist, dass die reine Domain genügt.

## Technisch

- `src/lib/brandings.functions.ts`: `domain` von `z.string().url()` auf eine Regex-Prüfung für Hostnamen umstellen (optionales Schema, optionales `www.`, Label + TLD, optionaler Pfad), leere Werte weiterhin als `null`. Analog Speicherung des eingegebenen Werts unverändert (kein erzwungenes `https://`-Präfix).
- `src/components/internal/branding-form.tsx`: Im `catch` die Fehlermeldung aus der Server-Antwort auswerten — wenn ein Zod-Fehlerpfad (`domain`, `email`, `vatId`, `resendSenderEmail`, `sevenSenderName`) erkennbar ist, eine feldbezogene deutsche Meldung anzeigen, sonst die bisherige allgemeine Meldung. Placeholder/Hilfetext des Domain-Felds anpassen.
- Abschluss: Typecheck und Build prüfen, danach Speichern des bestehenden Brandings über die Oberfläche nachvollziehen.
