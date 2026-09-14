# DKB-Logo auf `/angebote` linksbündig mit ING ausrichten

## Ziel

Auf der `/angebote`-Seite beginnt das DKB-Logo aktuell weiter rechts als die anderen Banklogos (z. B. ING), weil das SVG einen internen Leerabstand enthält. Der linke sichtbare Rand des DKB-Logos soll mit dem der anderen Logos auf einer Linie starten.

## Was entsteht

### 1. DKB-spezifische Korrektur in der Angebotskarte

In `src/routes/angebote.tsx` wird der Logo-Block angepasst:

- Bei `bank.logo_key === "dkb"` wird dem `<img>` eine horizontale Verschiebung nach links gegeben (z. B. `-translate-x-3.5` / ca. 14 px), sodass der sichtbare Inhalt mit ING & Co. beginnt.
- Höhe bleibt bei `h-9`, damit die bisherige Skalierung erhalten bleibt.
- Andere Banklogos bleiben unverändert.

### 2. Detailpanel bleibt unverändert

Die Korrektur betrifft ausschließlich die Angebotskarten auf `/angebote`, nicht die Sidebar/Detailansicht.

## Validierung

- Playwright-Screenshot der `/angebote`-Kartenliste nach der 10-Sekunden-Ladephase.
- Visueller Vergleich: linker Rand des DKB-Schriftzugs liegt auf einer Linie mit ING, TARGOBANK, Santander etc.
- Kurze Mobile-Prüfung, damit die Verschiebung nicht über den Kartenrand hinausragt.

## Nicht im Scope

- Änderungen an Zinsen, Sortierung, Filterfeldern, Sidebar-Inhalten oder anderen Logos.
- Neuanlage/Bearbeitung von Bankdaten.
