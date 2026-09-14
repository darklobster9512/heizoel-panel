# Antragsseite mit eigener Antrags-ID und Dokumenten-Upload

## 1. Klick auf „zum Antrag"

Alle drei Buttons („zum Antrag" in der Angebotskarte und die zwei in der Detail-Sidebar) machen künftig dasselbe:

- Der Antrag wird sofort in der Datenbank angelegt und bekommt eine eigene ID (wie eine Checkout-ID).
- Gespeichert werden dabei alle Wizard-Angaben (persönliche Daten, Haushalt, Einkommen, Beschäftigung, bestehende Kredite, Bankverbindung) **plus** die Angebotsdaten: gewählte Bank, Kreditbetrag, Laufzeit, effektiver Zins, monatliche Rate, Gesamtbetrag und Restschuldversicherung.
- Danach Weiterleitung auf `/antrag/<ID>`. Diese Adresse kann jederzeit wieder aufgerufen werden und zeigt denselben Stand inkl. bereits hochgeladener Dokumente.

## 2. Die Antragsseite (1:1 zu den Screenshots)

Kopfbereich:
- Header mit Logo und „Hilfe und Support" rechts.
- „← zurück zu den Angeboten".
- Angebotskarte: Banklogo, Kreditbetrag, Monate, Zins (eff.), mtl. Rate, Pfeil rechts.
- Leiste darunter: „So können Sie Ihren Kreditantrag erhalten:" mit Herunterladen / E-Mail / per Post.

Hauptkarte „Letzter Schritt und Ihr Geld ist auf dem Weg" mit drei Reitern: DOKUMENTE (aktiv, grün unterstrichen), SIGNATUR, AUSZAHLUNG (grau).

Reiter DOKUMENTE:
- „Dokumente einreichen"
- Block „Gehaltsabrechnung (n)" – Hinweis „Die letzten drei Gehaltsabrechnungen", gestrichelte Dropzone, „Sie können Ihre Dateien hier ablegen oder", grüner Button „Dateien hochladen", Formathinweis „JPEG, HEIC, PNG, TIFF oder PDF - Max: 10MB".
- Block „Kontoauszüge (n)" – Hinweis „fortlaufende Kontoauszüge der letzten 3 Monate", gleiche Dropzone, darunter „oder Digitalen Kontoblick nutzen".
- Hochgeladene Dateien werden pro Block als Liste mit Namen und Entfernen-Möglichkeit angezeigt; der Zähler in der Überschrift steigt mit.
- Button „Weiter ›" (Outline), darunter „An E-Mail senden und später fortfahren" und „Per Post erledigen".

Reiter SIGNATUR (Screenshot 3):
- „Signatur mit IDnow.", drei Punkte mit Icons (Ausweis/Reisepass bereithalten, Per Video-Anruf identifizieren, Vertrag digital unterschreiben), die beiden Hinweistexte inkl. Link „Datenschutzerklärung", grüner Button „Zur digitalen Unterschrift", Trenner „oder", darunter „An E-Mail senden und später fortfahren" und „Unterschreiben und per Post senden".

Reiter AUSZAHLUNG: schlichte Abschlussansicht (Auszahlung nach Prüfung, Auszahlungsdauer der gewählten Bank).

Unten der bekannte Footer.

## 3. Dokumente im Adminpanel

- Neuer Reiter „Dokumente": alle Uploads, gruppiert nach Antrag (ID, Name, Bank, Betrag, Datum).
- Je Antrag Auflistung der Dateien mit Typ (Gehaltsabrechnung/Kontoauszug), Dateiname, Größe, Upload-Datum und Download-Link.
- Auch in der Detailansicht einer Anfrage erscheinen die zugehörigen Dokumente.

## Technische Hinweise

- Migration: `public.loan_applications` erhält `bank_id`, `bank_name`, `eff_rate`, `monthly_rate`, `total_amount`, `insurance`, `status`. Neue Tabelle `public.application_documents` (application_id, kind, file_path, file_name, file_size, mime_type) mit Grants, RLS (Anlegen für anon/authenticated, Lesen nur für Admins bzw. Eigentümer).
- Privater Storage-Bucket `application-documents`, Pfad `<application_id>/<kind>/<uuid>-<name>`; Upload-Policy für anon/authenticated, Lesen nur Admin (signierte URLs über eine admin-geschützte Serverfunktion).
- Neue Route `src/routes/antrag/$applicationId.tsx` (öffentlich, `noindex`), lädt den Antrag über eine öffentliche Serverfunktion, die nur nicht-sensible Anzeigefelder (Bank, Betrag, Laufzeit, Zins, Rate) zurückgibt — Zugriff nur mit Kenntnis der ID.
- `/angebote`: `zum Antrag` ruft eine Serverfunktion `createApplication` auf (Insert inkl. `full_data`), danach `navigate({ to: "/antrag/$applicationId" })`. Die bisherige Speicherung auf `/antrag/fertig` bleibt als Fallback bestehen.
- Client-seitige Validierung der Uploads: max. 10 MB, JPEG/HEIC/PNG/TIFF/PDF.
- Admin: Serverfunktion `listApplicationDocuments` mit `has_role`-Prüfung und signierten Download-URLs.
