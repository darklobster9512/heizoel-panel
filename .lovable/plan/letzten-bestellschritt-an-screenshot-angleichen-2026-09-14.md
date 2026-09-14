# Letzten Bestellschritt an Screenshot angleichen

## Ziel
Den zweiten und letzten Schritt von `/bestellen` im unteren Bereich wie die Referenz strukturieren: Zahlungsmethoden, Vertrauensnachweise und anschließend eine klare Bestellübersicht.

## Änderungen

### 1. Zahlungsmethoden inhaltlich anpassen
Die vier auswählbaren Zeilen erhalten exakt diese Inhalte:

- **Vorkasse (Banküberweisung)**
  - „Überweisung vor Lieferung. Sie erhalten die Rechnung per E-Mail."
  - Badge „Beliebt"
- **Barzahlung bei Lieferung**
  - „Bezahlen Sie bequem bar an den Fahrer bei Lieferung."
  - Hinweis „50% Anzahlung sichert Tagespreis"
- **EC-Karte bei Lieferung**
  - „Kartenzahlung direkt beim Fahrer bei Lieferung."
  - Hinweis „50% Anzahlung sichert Tagespreis"
- **Rechnung nach Lieferung**
  - „Rechnung per E-Mail, Zahlung nach Lieferung."
  - Hinweis „Nur für Bestandskunden"

Die Karten bleiben auswählbar und übernehmen die klare Zeilenstruktur des Screenshots: Radiokreis, Zahlungsbild, Titel, Beschreibung und kleiner Hinweis beziehungsweise Badge.

### 2. Vertrauens- und Siegelkarten verschieben
- Im letzten Schritt werden die Bereiche mit „4,9 / 5", „Über 25.000 zufriedene Kunden", „Bestellung jederzeit kostenlos stornierbar", „Sichere Bestellung" und „Geprüft & sicher" nicht mehr oben angezeigt.
- Sie erscheinen direkt unter der Zahlungsmethoden-Karte.
- Gestaltung kompakter und näher am Screenshot: ruhige weiße Karten, klare Trennung der Vertrauensargumente und vorhandene Siegelbilder.
- Im ersten Terminschritt bleiben die bisherigen Vertrauenselemente oben bestehen.

### 3. Bestellübersicht ergänzen
Unter den Vertrauenskarten wird eine neue Bestellübersicht wie im Screenshot eingefügt:

- Heizölsorte und Liefermenge
- Lieferort mit PLZ und Stadt
- Lieferkosten „inklusive"
- Trennlinie
- Gesamtpreis
- Hinweis „inkl. 19% MwSt. & Lieferung — Tagespreis bindend bei Bestellung"

Alle Werte kommen aus der bereits gespeicherten Auswahl und passen sich automatisch an Standard/Premium, Menge, Ort und Preis an.

### 4. Reihenfolge im letzten Schritt
```text
Zahlungsmethode
Vertrauen und geprüfte Sicherheit
Bestellübersicht
Jetzt verbindlich bestellen
```

Die bestehende untere Preisleiste und die Bestellfunktion bleiben unverändert.

## Prüfung
- Zweiten Schritt mit gespeicherter Auswahl öffnen.
- Texte und Hinweise aller vier Zahlungsmethoden prüfen.
- Sicherstellen, dass die Vertrauenskarten im zweiten Schritt nur unter den Zahlungsarten erscheinen.
- Bestellübersicht mit Sorte, Menge, Lieferort und Gesamtpreis prüfen.
- Desktop- und Mobilansicht visuell mit dem Screenshot vergleichen.
