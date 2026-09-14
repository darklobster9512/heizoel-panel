# Uploads für nicht angemeldete Nutzer + "letzte 3" Dokumente

## 1. Upload-Berechtigung für nicht angemeldete Besucher

Der Antragslink soll ohne Anmeldung funktionieren. Damit das Hochladen in jedem Fall
erlaubt ist, werden die Zugriffsregeln des Dokumenten-Speichers und der Dokumententabelle
so ergänzt, dass Besucher ohne Konto Dateien ablegen und die zu ihrem Antrag gehörenden
Dateinamen sehen dürfen. Lesen fremder Dateien bleibt Admins vorbehalten; Downloads
laufen weiter nur über geschützte, zeitlich begrenzte Links.

## 2. Immer die letzten 3 Dokumente verlangen

Auf der Antragsseite:
- "Gehaltsabrechnung" – Hinweistext: "Die letzten drei Gehaltsabrechnungen"
- "Kontoauszüge" – Hinweistext: "fortlaufende Kontoauszüge der letzten 3 Monate"
- Beide Blöcke zeigen den Fortschritt als "(hochgeladen von 3)" an.
- Solange in einem Block weniger als 3 Dateien liegen, erscheint ein dezenter Hinweis
  ("Bitte laden Sie noch X Dokument(e) hoch"), und der Button "Weiter" ist deaktiviert.
  Erst mit 3 Gehaltsabrechnungen und 3 Kontoauszügen geht es zur Signatur weiter.
- Mehr als 3 Dateien pro Block bleiben erlaubt.

## Technische Hinweise

- Migration: zusätzliche Policies auf `storage.objects` für Rolle `anon`
  (INSERT bereits vorhanden, ergänzt werden SELECT/UPDATE beschränkt auf Bucket
  `application-documents`), sowie Absicherung, dass `application_documents`
  weiterhin per anon INSERT befüllt werden kann. Admin-Lesepolicies bleiben unverändert.
- `src/routes/kreditantrag.$applicationId.tsx`: `KINDS`-Texte anpassen, `REQUIRED = 3`
  einführen, Zähler/Hinweis in `UploadSection`, `Weiter`-Button abhängig von der
  erfüllten Mindestanzahl beider Blöcke.
