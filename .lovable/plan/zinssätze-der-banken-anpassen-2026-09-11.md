# Zinssätze der Banken anpassen

## Ziel
DKB und Deutsche Bank sollen mit 2,99 % die attraktivsten Angebote sein und dadurch automatisch ganz oben auf der `/angebote`-Seite stehen. Alle anderen Banken erhalten unterschiedliche Zinssätze ab 3,99 % aufwärts.

## Umsetzung

### 1. Zinssätze in der Datenbank aktualisieren (Datenänderung, kein Schema)
Per `run_sql` die Spalte `eff_rate` aller 14 Banken setzen:

- **DKB: 2,99 %**
- **Deutsche Bank: 2,99 %**
- Alle übrigen 12 Banken: unterschiedliche Werte ab 3,99 % aufwärts, z. B.:
  - TARGOBANK 3,99 %, ING 4,09 %, Santander 4,19 %, Postbank 4,29 %, Commerzbank 4,39 %, HypoVereinsbank 4,49 %, Bank of Scotland 4,59 %, Consors Finanz 4,69 %, CreditPlus 4,79 %, auxmoney 4,89 %, S-Kredit-per-Klick 4,99 %, Vereinigte Volksbank 5,09 %

### 2. Sortierung prüfen
Die Angebotsliste sortiert bereits nach monatlicher Rate aufsteigend (`src/routes/angebote.tsx:194`). Da DKB und Deutsche Bank den niedrigsten Zins haben, stehen sie dadurch automatisch an Position 1 und 2 und erhalten die „Bestes Angebot"-Markierung. Es ist keine Codeänderung nötig.

### 3. Verifizieren
- Die aktualisierten Zinssätze per Abfrage prüfen.
- Auf `/angebote` sicherstellen, dass DKB und Deutsche Bank oben stehen und die Zinsen korrekt angezeigt werden.

## Technische Details
- Betroffene Tabelle: `public.banks`, Spalte `eff_rate` (numeric)
- Keine Migration (nur Daten), kein Code-Edit
- Hinweis: Die genauen Werte der übrigen Banken können später im Adminpanel unter „Banken" jederzeit angepasst werden.
