export function formatIban(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 34);
  return cleaned.replace(/(.{4})(?!$)/g, "$1 ");
}
