# Dokumenten-Detailansicht im Adminbereich

Im Adminbereich unter "Dokumente" wird jede Antragsgruppe anklickbar. Ein Klick öffnet eine Detailansicht, in der alle hochgeladenen Dateien direkt angesehen werden können — ohne sie erst herunterladen zu müssen.

## Übersichtsliste

- Jede Gruppe (ein Antrag) bleibt als Karte sichtbar, zeigt aber nur noch Kunde, Bank/Betrag, Antragsnummer und die Anzahl der Dateien je Art (z. B. "3 Gehaltsabrechnungen, 3 Kontoauszüge").
- Die ganze Karte ist klickbar (Hover: grüner Rahmen) und öffnet die Detailansicht.

## Detailansicht

- Öffnet sich als großes Fenster über der Liste, mit Kopfzeile (Kunde, E-Mail, Bank, Betrag, Antragsnummer, Datum) und Schließen-Kreuz; Escape schließt ebenfalls.
- Links eine Dateiliste (nach Art gruppiert: Gehaltsabrechnungen, Kontoauszüge) mit Dateiname, Datum und Größe. Die ausgewählte Datei ist grün markiert.
- Rechts die Vorschau der ausgewählten Datei:
  - Bilder (JPG/PNG/HEIC-Fallback) werden direkt angezeigt.
  - PDFs werden eingebettet dargestellt.
  - Andere Formate zeigen einen Hinweis plus Download-Button.
- Unter der Vorschau: "In neuem Tab öffnen" und "Herunterladen".
- Beim Öffnen ist automatisch die erste Datei ausgewählt.

## Technische Umsetzung

- `src/lib/applications.functions.ts`: `listApplicationDocumentsAdmin` liefert zusätzlich `mimeType` und `filePath` pro Dokument (Spalte `mime_type` existiert bereits). Signierte URLs weiterhin über den Admin-Client, Laufzeit von 1 h auf 2 h erhöht, damit die Vorschau nicht mitten in der Sichtung abläuft. Signierte URLs werden über `createSignedUrls` (Batch pro Bucket) statt pro Datei erzeugt, um viele Einzel-Roundtrips zu vermeiden.
- `src/routes/_authenticated/admin.tsx`: neuer lokaler State `openGroupId`; Detailansicht als `Dialog` aus `@/components/ui/dialog` (max. Breite ~1100px, Höhe ~85vh, zweispaltiges Grid, rechte Spalte scrollbar).
- Vorschau-Rendering nach `mimeType`: `image/*` → `<img>`, `application/pdf` → `<iframe>` mit `title`, sonst Fallback-Text. Bei fehlender signierter URL wird eine Fehlermeldung statt einer leeren Vorschau gezeigt.
- Keine Datenbank- oder Storage-Änderungen nötig; Zugriff bleibt admin-geschützt.
