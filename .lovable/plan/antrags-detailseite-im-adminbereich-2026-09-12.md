# Antrags-Detailseite im Adminbereich

Statt des Popups bekommt jeder Antrag eine eigene Detailseite mit allen Angaben und allen hochgeladenen Dokumenten.

## Neue Seite `/admin/antrag/<Antragsnummer>`

Aufbau von oben nach unten:

- Kopfbereich: Kunde, E-Mail, Telefon, Antragsnummer, Datum, Status, Bank, Kreditbetrag, Laufzeit, Zins, Monatsrate, Gesamtbetrag, Versicherung. Dazu ein Zurück-Link zum Admin-Panel.
- Alle Antragsangaben in den bestehenden Gruppen (Kreditwunsch, Person, Anschrift, Haushalt, Einkommen, Ausgaben, Beschäftigung, Bankverbindung usw.) — dieselben Felder wie bisher in der aufgeklappten Ansicht, nur größer und zweispaltig.
- Nebentätigkeiten und bestehende Kredite wie bisher darunter.
- Dokumentenbereich: links die Dateiliste (nach Gehaltsabrechnungen und Kontoauszügen gruppiert), rechts die Vorschau der ausgewählten Datei (Bilder direkt, PDFs eingebettet, sonst Hinweis + Download), darunter „In neuem Tab öffnen“ und „Herunterladen“. Sind keine Dokumente vorhanden, steht dort ein Hinweis.

## Änderungen im Admin-Panel

- Reiter „Kreditanfragen“: „anzeigen“ führt jetzt auf die Detailseite statt die Angaben unterhalb der Tabelle aufzuklappen. Die alte Inline-Ansicht entfällt.
- Reiter „Dokumente“: Klick auf eine Antragsgruppe öffnet dieselbe Detailseite. Das bisherige Popup wird entfernt.

## Technische Umsetzung

- Neue Route `src/routes/_authenticated/admin.antrag.$applicationId.tsx` mit `createFileRoute("/_authenticated/admin/antrag/$applicationId")`, gerendert in der bestehenden `AppShell`, `robots: noindex`.
- Neue admin-geschützte Serverfunktion `getApplicationAdmin` in `src/lib/applications.functions.ts` (Muster wie `listLoanApplications`: `requireSupabaseAuth` + `has_role`-Prüfung): liefert die komplette `loan_applications`-Zeile plus die zugehörigen Dokumente inklusive `mimeType`, `fileSize` und signierter URL (Batch über `createSignedUrls`, 2 h). Aufruf über `useServerFn` + `useQuery` in der Komponente (kein Loader, da geschützt).
- Die Feldgruppen-Definition `GROUPS` und `formatValue` wandern aus `admin.tsx` in ein gemeinsames Modul (z. B. `src/lib/application-fields.tsx`), damit beide Seiten sie nutzen.
- Aus `src/routes/_authenticated/admin.tsx` entfallen `DocumentsDialog`, `openDocGroupId`, `openId`/`selected` und die Dialog-Importe; stattdessen `Link`-Navigation zur neuen Route.
- Keine Datenbank- oder Storage-Änderungen; Zugriff bleibt rein admin-geschützt.
