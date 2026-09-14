# Brandings im Adminbereich

## Ziel
Im Adminbereich entsteht unter `/admin/brandings` eine zentrale Verwaltung für mehrere Heizöl-Shops. Jedes Branding erhält beim ersten Speichern automatisch eine dauerhafte, öffentlich teilbare UUID, die später in einer externen Edge Function zur Identifikation hinterlegt werden kann. Eine öffentliche Schnittstelle wird jetzt noch nicht gebaut.

## Seiten und Bedienung
- Den bestehenden Admin-Menüpunkt **Brandings** als echten Link ergänzen und auf allen Adminseiten korrekt hervorheben.
- `/admin/brandings` als Übersicht mit detaillierten, responsiven Shop-Karten bauen.
- Jede Karte zeigt Logo, Unternehmens- und Shopname, Anschrift, Domain, Status, öffentliche Branding-ID, Aktualisierungsdatum sowie den Konfigurationsstatus von Resend und Seven.io.
- Aktionen pro Karte: **Bearbeiten** und **ID kopieren**.
- Leerer Zustand mit klarer Aktion **Branding hinzufügen**.
- Separate Seite `/admin/brandings/neu` für neue Brandings.
- Separate Seite `/admin/brandings/:brandingId` zum Weiterbearbeiten bestehender Brandings.
- Ruhige Enterprise-Gestaltung passend zum bestehenden hellen Klaro-Adminbereich; auf Mobilgeräten werden Navigation, Karten und Formular sauber gestapelt.

## Branding-Formular
Abschnitte mit klarer Gliederung und Fortschritt:
1. **Marke**: Logo-Upload, Unternehmensname, Shopname
2. **Firmensitz**: Straße & Hausnummer, PLZ, Stadt
3. **Rechtliches**: Amtsgericht, Handelsregisternummer, Geschäftsführer, USt-ID
4. **Kontakt**: E-Mail, Domain
5. **Resend (optional)**: API-Key, Absender-E-Mail, Absendername
6. **Seven.io (optional)**: API-Key, Absendername mit maximal 11 Zeichen

- Zwei Speichermöglichkeiten: **Als Entwurf speichern** und **Aktivieren**.
- Entwürfe dürfen unvollständig sein und später weiterbearbeitet werden.
- Aktivierung ist erst möglich, wenn Logo und alle allgemeinen Unternehmensdaten vollständig und gültig sind; beide Dienstekonfigurationen bleiben optional.
- E-Mail, Domain, USt-ID und maximale Länge des Seven.io-Absendernamens werden verständlich validiert.
- Bereits gespeicherte API-Schlüssel werden beim Bearbeiten verdeckt angezeigt und nur bei bewusster Änderung ersetzt.
- Ungespeicherte Änderungen und Upload-/Speicherzustände werden sichtbar behandelt.

## Daten und Zugriff
- Neue Tabelle `brandings` mit interner ID, stabiler `public_id`, Status `draft | active`, allen genannten Firmendaten sowie den ausdrücklich gewünschten Resend- und Seven.io-Werten im Klartext.
- Die Zugangsdaten bleiben vollständig aus Karten, URLs, Browser-Logs und der späteren öffentlichen Identifikation ausgeschlossen. Wegen der gewünschten Klartextspeicherung können sie dennoch von berechtigten Datenbank-/Serverzugriffen und Sicherungen gelesen werden.
- Nur angemeldete Benutzer mit Rolle **admin** dürfen Brandings sehen, anlegen oder bearbeiten; Caller erhalten keinen Zugriff.
- Änderungen erhalten Erstellungs- und Aktualisierungszeit sowie den Admin, der den Datensatz angelegt beziehungsweise zuletzt geändert hat.
- Neue private Logo-Ablage mit Bildtyp- und Größenbegrenzung; ausschließlich Admins dürfen Dateien hochladen oder ändern.
- Die öffentliche Branding-ID ist in der Adminoberfläche sichtbar und kopierbar, aber es entsteht in diesem Schritt noch kein öffentlicher Abruf-Endpunkt.

## Technische Umsetzung
- Geschützte Server-Funktionen für Liste, Detailansicht, Anlegen und Aktualisieren; jede Funktion prüft serverseitig die Adminrolle.
- Datenbankregeln spiegeln dieselbe Adminbeschränkung, statt sich nur auf die sichtbare Seite zu verlassen.
- Logo-Uploads verwenden Supabase Storage; beim Ersetzen wird der Datensatz auf das neue Objekt aktualisiert.
- TanStack-Query lädt und aktualisiert die Übersicht und Detailansicht; Erfolgs- und Fehlermeldungen werden in der Oberfläche angezeigt.
- Jede neue Seite erhält eigene interne `noindex`-Metadaten.

## Prüfung
- Entwurf mit wenigen Angaben anlegen, ID kopieren, Seite verlassen und später vollständig weiterbearbeiten.
- Vollständiges Branding inklusive Logo und optionaler Resend-/Seven.io-Angaben aktivieren.
- Validierung ungültiger E-Mail, Domain und zu langem Seven.io-Absender testen.
- Prüfen, dass Caller weder Daten lesen noch Funktionen direkt ausführen können.
- Desktop- und Mobilansicht sowie aktueller Typecheck und Vorschau-Build prüfen.
