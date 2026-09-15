export function formatIban(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 34);
  return cleaned.replace(/(.{4})(?!$)/g, "$1 ");
}

/**
 * Bereinigt eine Handelsregisternummer: Mehrfach-Leerzeichen und ein versehentlich
 * doppelt eingegebenes Präfix ("HRB HRB 123", "HRA HRA 45") werden zu einem
 * einfachen Präfix zusammengeführt.
 */
export function cleanRegisterNumber(value: string): string {
  const collapsed = value.replace(/\s+/g, " ").trim();
  return collapsed.replace(/^(HR[AB])\s+\1\s+/i, "$1 ");
}
