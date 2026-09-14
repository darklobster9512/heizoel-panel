# /kontakt — Anliegen-abhängige Inhalte statt vollem Formular

## Änderungen an `src/routes/kontakt.tsx`

### 1. Überschrift & Untertitel (mittig)
- Überschrift: „Wählen Sie Ihr Anliegen" statt „Kontaktformular"
- Untertitel: „Bitte füllen Sie das Formular aus. Sie erhalten umgehend eine Antwort."
- Beides mittig zentriert (`text-center`).

### 2. Verhalten je nach gewähltem Anliegen

Das bisherige vollständige Kontaktformular (Anrede, Name, E-Mail, Telefon, PLZ, Stadt, Nachricht) erscheint **nur** bei „Mein Anliegen ist hier nicht ausgeführt".

Für alle anderen Anliegen gilt:

**„Ich möchte einen Liefertermin vereinbaren"** — nur Hinweistext, kein Formular:
> Unmittelbar nach Ihrer Bestellung haben Sie eine Bestellbestätigung per E-Mail erhalten. Darin finden Sie auch die Kontaktdaten des zuständigen Lieferanten in Ihrer Region. Bitte wenden Sie sich direkt an den Lieferanten, um einen Liefertermin zu vereinbaren.

**Alle übrigen Anliegen** (Heizölpreis erfahren, Preisangebot, Heizöl bestellen, Lieferzeit, Lieferant) — Hinweistext + Mini-Preisrechner-Formular:
- Text je Anliegen (exakt wie vom Nutzer vorgegeben, s. Texte unten).
- 3 Eingabefelder: **Postleitzahl**, **Liefermenge in Liter**, **Anzahl der Lieferstellen** (Lieferstellen als Dropdown oder Zahlenfeld, optisch wie auf Landingpage/Preisrechner).
- Button **„Heizölpreis berechnen"** → Weiterleitung zu `/preisrechner` (mit den eingegebenen Werten als URL-Suchparameter, falls die Preisrechner-Seite diese bereits unterstützt — sonst schlichte Weiterleitung).

Texte je Anliegen (Kästchen mit grüner Sideline, wie Hinweis-Boxen bisher):
- Preis erfahren: „Den aktuellen Heizölpreis erfahren Sie ausschließlich über unseren Heizöl-Preisrechner. …"
- Preisangebot: „Die Erstellung eines Heizöl-Angebotes ist ausschließlich über unseren Heizöl-Preisrechner möglich. …"
- Bestellen: „Eine Heizöl-Bestellung ist nur online möglich. …"
- Lieferzeit: „Die aktuelle Lieferzeit wird Ihnen im Heizöl-Preisrechner angezeigt. Nach erfolgter Bestellung wird sich unser zuständiger Partnerhändler in Ihrer Region mit Ihnen in Verbindung setzen, um einen Liefertermin zu vereinbaren. …"
- Lieferant: „Unser Partnerhändler in Ihrer Region wird Ihnen im Heizöl-Preisrechner angezeigt. Nach erfolgter Bestellung erhalten Sie umgehend eine Bestellbestätigung mit den Kontaktdaten des Lieferanten. Sie können dann den Lieferanten auch sofort selbst kontaktieren, um individuelle Absprachen zu treffen. …"

Gemeinsamer Schluss bei allen Formular-Varianten: „Bitte geben Sie dazu in nachfolgendes Formular PLZ, Liefermenge und Anzahl der Lieferstellen ein, um den aktuellen Heizölpreis zu berechnen. Sie haben anschließend die Möglichkeit, sofort zum angezeigten Preis verbindlich zu bestellen."

## Technik
- Neuer `topic`-State steuert, welcher Block unter dem Dropdown gerendert wird (`full | info-only | calculator`).
- Mini-Rechner: lokale States für PLZ/Menge/Lieferstellen, Button navigiert via `useNavigate()` zu `/preisrechner`.
- Keine Backend-Änderungen, kein Versand.
- Verifikation: Build-Log prüfen, Playwright-Screenshots für jede Variante.
