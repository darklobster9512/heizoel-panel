export type BrandingCountry = "DE" | "AT";

export const BRANDING_COUNTRIES: { value: BrandingCountry; label: string }[] = [
  { value: "DE", label: "Deutschland" },
  { value: "AT", label: "Österreich" },
];

export function normalizeCountry(value: unknown): BrandingCountry {
  return value === "AT" ? "AT" : "DE";
}

export function countryLabel(country: BrandingCountry | null | undefined) {
  return normalizeCountry(country) === "AT" ? "Österreich" : "Deutschland";
}

export function vatRateFor(country: BrandingCountry | null | undefined) {
  return normalizeCountry(country) === "AT" ? 0.2 : 0.19;
}

export function vatPercentFor(country: BrandingCountry | null | undefined) {
  return Math.round(vatRateFor(country) * 100);
}

/** Flaggenstreifen von oben nach unten (Hex). */
export function flagColorsFor(country: BrandingCountry | null | undefined): [string, string, string] {
  return normalizeCountry(country) === "AT"
    ? ["#C8102E", "#FFFFFF", "#C8102E"]
    : ["#000000", "#DD0000", "#FFCE00"];
}
