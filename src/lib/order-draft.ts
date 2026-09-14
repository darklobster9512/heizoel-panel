export type OrderDraft = {
  plz: string;
  city: string | null;
  liters: number;
  points: number;
  hose: string;
  truck: string;
  /** ISO date (yyyy-mm-dd) des frühesten Liefertermins */
  earliestDate: string;
  variant: "standard" | "premium";
  pricePer100: number;
  total: number;
  /** Gewählter Termin (Schritt 1) */
  slot?: {
    date: string;
    period: "vormittag" | "nachmittag" | "telefon";
  };
};

const KEY = "klaro.order.v1";

export function saveOrderDraft(draft: OrderDraft): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    /* localStorage nicht verfügbar — Bestellung läuft trotzdem weiter */
  }
}

export function loadOrderDraft(): OrderDraft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OrderDraft>;
    if (typeof parsed.liters !== "number" || typeof parsed.pricePer100 !== "number") return null;
    return parsed as OrderDraft;
  } catch {
    return null;
  }
}

export type ConfirmationAddress = {
  salutation: string;
  company?: string;
  firstName: string;
  lastName: string;
  street: string;
  streetNo: string;
  plz: string;
  city: string;
};

export type OrderConfirmation = OrderDraft & {
  orderNo: string;
  email: string;
  phone: string;
  delivery: ConfirmationAddress;
  billing?: ConfirmationAddress;
  notes: string;
  payment: string;
  placedAt: string;
};

const CONFIRM_KEY = "klaro.order.confirmed.v1";

export function saveOrderConfirmation(data: OrderConfirmation): void {
  try {
    localStorage.setItem(CONFIRM_KEY, JSON.stringify(data));
  } catch {
    /* localStorage nicht verfügbar */
  }
}

export function loadOrderConfirmation(): OrderConfirmation | null {
  try {
    const raw = localStorage.getItem(CONFIRM_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OrderConfirmation>;
    if (!parsed.orderNo || typeof parsed.liters !== "number") return null;
    return parsed as OrderConfirmation;
  } catch {
    return null;
  }
}
