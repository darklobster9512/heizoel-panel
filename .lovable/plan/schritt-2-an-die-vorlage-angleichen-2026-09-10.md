# Schritt 2 an die Vorlage angleichen

Schritt 2 zeigt aktuell eine Kachel-Liste mit sechs Auswahlfeldern, eine Zwischenüberschrift und den Aufklapptext „Warum benötigen wir diese Information?“. In der Vorlage ist es eine schlichte Seite mit einer Überschrift, einem Label und einem Auswahlmenü.

## So soll die Seite aussehen

- Fortschrittsbalken oben: 13 % geschafft (bleibt).
- Überschrift: **Persönliche Angaben** (fett, wie in der Vorlage) — die bisherige Kleinschrift-Zeile darüber und die Frage „Was ist Ihr Familienstand?“ entfallen.
- Darunter das Label **Familienstand** und ein Auswahlmenü mit den Optionen:
  ledig, verheiratet, verwitwet, geschieden, eheähnliche Lebensgemeinschaft, getrennt lebend.
  Vorausgewählt ist „ledig“.
- Danach direkt die Schaltflächen **Zurück** und **Weiter**; der Abschnitt „Warum benötigen wir diese Information?“ wird auf dieser Seite entfernt.
- Vertrauensblock (TÜV/Garantie/eKomi) und Fußzeile bleiben unverändert.

## Technische Details

- `src/routes/antrag/schritt-2.tsx`: Kachel-Liste (`STATUSES`, Buttons, Icons) und `WhyInfo` entfernen; stattdessen `SelectField` aus `@/components/wizard/ui` mit den sechs Optionen und `data.maritalStatus` verwenden.
- Standardwert `maritalStatus: "ledig"` im Wizard-Store (`src/lib/wizard-store.tsx`) setzen, damit das Menü wie in der Vorlage vorbelegt ist.
- Auswahlmenü-Optik (kantige Ränder, grauer Pfeil rechts) kommt aus dem bestehenden `SelectField`; Höhe/Breite an die Vorlage angepasst.
- Andere Schritte und die Desktop-/Mobil-Struktur bleiben unberührt.
