Kreditart-Dropdown in Schritt 15 anpassen

Ziel: Das Dropdown „Kreditart“ pro bestehendem Kredit in `/antrag/schritt-15` soll exakt die vom Nutzer vorgegebene Liste enthalten.

1. Öffne `src/routes/antrag/schritt-15.tsx`.
2. Ersetze das bestehende `loanKinds`-Array durch:
   - Konsumentenkredit
   - 0% Finanzierung
   - Autokredit
   - Rahmenkredit
   - Kreditkarte
   - Dispositionskredit
   - Geschäftskredit
   - Leasing
   - Arbeitgeberdarlehen
   - Ballonfinanzierung / Schlussratenfinanzierung
3. Behalte „Konsumentenkredit“ als Standardwert für neue Kredite.
4. Füge optional eine Fallback-Behandlung hinzu: Ist ein gespeichertes `loan.kind` nicht mehr in der neuen Liste, wird es beim Anzeigen auf „Konsumentenkredit" zurückgesetzt, damit das Select keinen ungültigen Wert anzeigt.
5. Baue den Dev-Build, um TypeScript-/Syntax-Fehler auszuschließen.

Nicht im Scope: Änderungen an Speicherformat, anderen Schritten oder dem Datenmodell.
