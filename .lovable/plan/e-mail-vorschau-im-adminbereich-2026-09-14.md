# E-Mail-Vorschau im Adminbereich

Neuer Reiter `/admin/emails`, auf dem fertige E-Mail-Vorlagen angesehen werden können — zum Start die Auftragsbestätigung im Stil der hochgeladenen Beispielmail, aber in unseren Farben.

## Was entsteht

**Neuer Menüpunkt "E-Mails"** in der Admin-Navigation, direkt unter Brandings.

**Vorschauseite**
- Links eine Auswahl: welche Vorlage (aktuell nur "Auftragsbestätigung", weitere folgen später) und welches Branding.
- Die Branding-Auswahl lädt alle angelegten Brandings (Entwürfe und aktive). Logo, Unternehmensname, Shopname, Anschrift, Amtsgericht, Handelsregisternummer, USt-IdNr., E-Mail und Domain werden direkt in die E-Mail eingesetzt — so sieht man sofort, wie die Mail für jeden Shop aussieht.
- Umschalten zwischen Desktop- und Handy-Breite, damit beide Darstellungen prüfbar sind.
- Die Mail wird in einem abgetrennten Rahmen angezeigt, damit das Seiten-Design die Mail nicht beeinflusst.
- Beispieldaten (Auftragsnummer, Kunde, Menge, Preise, Liefertermin) sind fest hinterlegte Musterwerte.

**Die Vorlage "Auftragsbestätigung"** übernimmt den Aufbau der Beispielmail:
Kopf mit Logo und Betreffzeile, Fortschrittsleiste (Bestellt / Bestellprüfung / Lieferung), Bestätigungszeile mit Auftragsnummer, Anrede, Hinweis "Fast geschafft — es kommt noch eine E-Mail", Bestellübersicht als Tabelle, drei Vertrauens-Kacheln (Preisgarantie, Kundenbewertungen, Lieferung inklusive), Rechnungs- und Lieferadresse, Ablauf in vier Schritten, Hinweisbox, vier häufige Fragen, Kontaktbox, Dankesgruß, Über-uns-Block mit Registergericht/USt-IdNr./Bewertung, Zahlungshinweis, Siegel-Zeile, Abschluss-Fußzeile mit vollständigen Firmenangaben.

**Farben:** statt des Goldtons der Beispielmail unser Grün (#22C55E) als Akzent, dazu Weiß, neutrales Grau und dunkler Text — ruhig und seriös, passend zum Portal. Wenn du lieber den Goldton behalten willst, sag Bescheid, dann tausche ich den Akzent.

## Technische Details

- `src/lib/email-templates/order-confirmation.tsx` (oder `.ts`): reine Funktion, die aus Branding-Daten + Bestelldaten tabellenbasiertes, inline-gestyltes E-Mail-HTML erzeugt (kein Flexbox/Grid, maximale Client-Kompatibilität, max. 640 px Breite).
- Typen für Branding-Daten und Bestelldaten in derselben Datei, damit ein späterer echter Versand dieselbe Funktion nutzen kann.
- `src/routes/_authenticated/admin_.emails.tsx`: nutzt `AdminPageShell`, lädt Brandings über die bestehende `listBrandings`-Serverfunktion (inkl. signierter Logo-URL), rendert das HTML in einem `iframe` mit `srcDoc`; head() mit noindex.
- `admin-nav.tsx`: `getAdminNav` erhält den zusätzlichen Wert `"emails"`, `NavItem["to"]` um `/admin/emails` erweitert; Aufrufer in admin.tsx und den Brandings-Seiten bleiben unverändert.
- Kein Versand, keine neuen Tabellen, keine Datenbankänderung.
