# FAQ-Kontakt-Button: weißer Text & Icon

## Ziel
Der „Kontakt aufnehmen"-Button am Ende der `/faq`-Seite soll weißen Text und ein weißes Mail-Icon erhalten, damit er besser zum grünen Button-Hintergrund passt.

## Änderung an `src/routes/faq.tsx`
- Im Abschnitt „Ihre Frage war nicht dabei?" den Button-Link anpassen:
  - Textfarbe von `text-ink` auf `text-white` ändern.
  - Icon-Farbe ebenfalls auf weiß setzen (z. B. `text-white` oder `stroke-white` am `<Mail />`).
- Keine weiteren inhaltlichen oder strukturellen Änderungen.
