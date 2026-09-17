export type NormalizedPaymentMethod = "vorkasse" | "ec" | "barzahlung" | "rechnung" | "other";

const compact = (value: string | null | undefined) =>
  (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[^a-z0-9]/g, "");

export function normalizePaymentMethod(value: string | null | undefined): NormalizedPaymentMethod {
  const method = compact(value);
  if (["bar", "barzahlung", "cash"].includes(method)) return "barzahlung";
  if (["ec", "eckarte", "eczahlung", "kartenzahlung", "karte"].includes(method)) return "ec";
  if (["rechnung", "aufrechnung", "kaufaufrechnung", "perrechnung"].includes(method)) {
    return "rechnung";
  }
  if (["vorkasse", "vorauszahlung", "vorauskasse", "ueberweisung", "uberweisung"].includes(method)) {
    return "vorkasse";
  }
  return "other";
}

export function paymentMethodLabel(value: string | null | undefined): string {
  const normalized = normalizePaymentMethod(value);
  if (normalized === "barzahlung") return "Barzahlung";
  if (normalized === "ec") return "EC-Karte";
  if (normalized === "rechnung") return "Rechnung";
  if (normalized === "vorkasse") return "Vorkasse";
  return value?.trim() || "Vorkasse";
}

export type PaymentTerms = {
  method: NormalizedPaymentMethod;
  label: string;
  isDeposit: boolean;
  paymentAmount: number;
  remainingAmount: number;
  restText: string | null;
};

const cents = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const REST_TEXT: Partial<Record<NormalizedPaymentMethod, string>> = {
  ec: "bei Lieferung vor Ort per EC-Karte",
  barzahlung: "bei Lieferung vor Ort in bar",
  rechnung: "nach Lieferung per Rechnung innerhalb der Zahlungsfrist",
};

export function paymentTerms(value: string | null | undefined, total: number): PaymentTerms {
  const method = normalizePaymentMethod(value);
  const isDeposit = method === "ec" || method === "barzahlung" || method === "rechnung";
  const paymentAmount = isDeposit ? cents(total / 2) : cents(total);
  return {
    method,
    label: paymentMethodLabel(value),
    isDeposit,
    paymentAmount,
    remainingAmount: cents(total - paymentAmount),
    restText: REST_TEXT[method] ?? null,
  };
}

/** Kurztext für den Restbetrag, abgeleitet aus Zahlungsart oder Label. */
export function restTextFor(value: string | null | undefined): string | null {
  return REST_TEXT[normalizePaymentMethod(value)] ?? null;
}

/** Kompakte Variante für enge Layouts (PDF). */
const REST_TEXT_SHORT: Partial<Record<NormalizedPaymentMethod, string>> = {
  ec: "bei Lieferung per EC-Karte",
  barzahlung: "bei Lieferung in bar",
  rechnung: "per Rechnung nach Lieferung",
};

export function restTextShortFor(value: string | null | undefined): string | null {
  return REST_TEXT_SHORT[normalizePaymentMethod(value)] ?? null;
}
