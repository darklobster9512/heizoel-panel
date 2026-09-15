import type { Order, OrderAddress } from "@/lib/orders.functions";

export type InvoiceCompany = {
  name: string;
  street: string;
  zipCity: string;
  email: string;
  registryCourt: string;
  registerNumber: string;
  vatId: string;
  logoUrl: string | null;
  shopName: string;
};

export type InvoiceBank = {
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
  amount: string;
  reference: string;
  isDeposit: boolean;
  remaining: string | null;
  note: string | null;
};

export type InvoiceModel = {
  invoiceNumber: string;
  customerNumber: string;
  date: string;
  paymentLabel: string;
  company: InvoiceCompany;
  bank: InvoiceBank;
  recipientLines: string[];
  salutation: string;
  deliveryWindow: string;
  deliveryAddressLine: string;
  itemTitle: string;
  itemSubtitle: string;
  quantityLabel: string;
  unitPriceLabel: string;
  lineTotal: number;
  net: number;
  vat: number;
  gross: number;
};

export type InvoiceBranding = {
  companyName: string | null;
  shopName: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  registryCourt: string | null;
  commercialRegisterNumber: string | null;
  vatId: string | null;
  email: string | null;
  logoUrl: string | null;
  accountHolder: string | null;
  iban: string | null;
  bankName: string | null;
  bic: string | null;
};

export const INVOICE_FALLBACK_BRANDING: InvoiceBranding = {
  companyName: "Muster-Energie GmbH",
  shopName: "Heizöl Online",
  streetAddress: "Unter den Linden 16",
  postalCode: "19357",
  city: "Karstädt",
  registryCourt: "Amtsgericht Neuruppin",
  commercialRegisterNumber: "HRB 10344",
  vatId: "DE289578199",
  email: "info@heizoel-online.com",
  logoUrl: null,
  accountHolder: "Muster-Energie GmbH",
  iban: "DE89 3704 0044 0532 0130 00",
  bankName: "Commerzbank AG",
  bic: "COBADEFFXXX",
};

export const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
export const number = new Intl.NumberFormat("de-DE");

const VARIANT_LABEL: Record<string, string> = { standard: "Heizöl Standard", premium: "Heizöl Premium" };

const PAYMENT_LABEL: Record<string, string> = {
  vorkasse: "Vorkasse",
  vorauskasse: "Vorkasse",
  ueberweisung: "Überweisung",
  barzahlung: "Barzahlung",
  ec: "EC-Karte",
};

const PERIOD_LABEL: Record<string, string> = {
  vormittag: "8:00 - 12:00 Uhr",
  nachmittag: "12:00 - 17:00 Uhr",
  telefon: "Termin wird telefonisch vereinbart",
};

function value(input: string | null | undefined, fallback: string) {
  const trimmed = (input ?? "").trim();
  return trimmed || fallback;
}

export function customerNumber(orderNumber: string) {
  let hash = 0;
  for (const char of orderNumber) hash = (hash * 31 + char.charCodeAt(0)) % 100000;
  return `K${String(hash).padStart(5, "0")}`;
}

export function formatDate(input: string | null | undefined) {
  if (!input) return "—";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatWeekday(input: string | null | undefined) {
  if (!input) return null;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function addressLines(address: OrderAddress): string[] {
  const name = [address.firstName, address.lastName].filter(Boolean).join(" ").trim();
  const street = [address.street, address.streetNo].filter(Boolean).join(" ").trim();
  const city = [address.plz, address.city].filter(Boolean).join(" ").trim();
  return [address.salutation ?? "", address.company ?? "", name, street, city]
    .map((line) => line.trim())
    .filter(Boolean);
}

function addressOneLine(address: OrderAddress) {
  const street = [address.street, address.streetNo].filter(Boolean).join(" ").trim();
  const city = [address.plz, address.city].filter(Boolean).join(" ").trim();
  return [street, city].filter(Boolean).join(", ") || "—";
}

function salutationFor(address: OrderAddress) {
  const last = (address.lastName ?? "").trim();
  const salutation = (address.salutation ?? "").trim().toLowerCase();
  if (last && salutation === "herr") return `Sehr geehrter Herr ${last}`;
  if (last && salutation === "frau") return `Sehr geehrte Frau ${last}`;
  if (last) return `Sehr geehrte/r ${last}`;
  return "Sehr geehrte Damen und Herren";
}

export type InvoiceBankOverride = {
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
};

function bankFor(
  order: Order,
  branding: InvoiceBranding,
  gross: number,
  override?: InvoiceBankOverride | null,
): InvoiceBank {
  const deposit = order.paymentMethod === "ec" || order.paymentMethod === "barzahlung";
  const half = Math.round((gross / 2) * 100) / 100;
  const restLabel =
    order.paymentMethod === "ec"
      ? "bei Lieferung vor Ort per EC-Karte"
      : order.paymentMethod === "barzahlung"
        ? "bei Lieferung vor Ort in bar"
        : null;
  return {
    accountHolder: override
      ? override.accountHolder
      : value(branding.accountHolder, value(branding.companyName, "Muster-Energie GmbH")),
    bankName: override ? override.bankName : value(branding.bankName, "Commerzbank AG"),
    iban: override ? override.iban : value(branding.iban, "DE89 3704 0044 0532 0130 00"),
    bic: override ? override.bic : value(branding.bic, "COBADEFFXXX"),
    amount: euro.format(deposit ? half : gross),
    reference: order.orderNumber,
    isDeposit: deposit,
    remaining: deposit && restLabel ? euro.format(gross - half) : null,
    note:
      deposit && restLabel
        ? `Anzahlung (50 % von ${euro.format(gross)}) — Restbetrag ${euro.format(gross - half)} ${restLabel}`
        : null,
  };
}

export function buildInvoiceModel(
  order: Order,
  branding: InvoiceBranding,
  bankOverride?: InvoiceBankOverride | null,
): InvoiceModel {
  const billing = order.billingAddress ?? order.deliveryAddress;
  const gross = order.total;
  const net = gross / 1.19;
  const weekday = formatWeekday(order.slotDate);
  const period = order.slotPeriod ? (PERIOD_LABEL[order.slotPeriod] ?? order.slotPeriod) : null;
  const variantLabel = VARIANT_LABEL[order.variant] ?? "Heizöl Standard";
  const zipCity = [value(branding.postalCode, ""), value(branding.city, "")].filter(Boolean).join(" ");

  return {
    invoiceNumber: order.orderNumber,
    customerNumber: customerNumber(order.orderNumber),
    date: formatDate(order.placedAt),
    paymentLabel: order.paymentMethod
      ? (PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod)
      : "Vorkasse",
    company: {
      name: value(branding.companyName, "Muster-Energie GmbH"),
      street: value(branding.streetAddress, "Unter den Linden 16"),
      zipCity: zipCity || "19357 Karstädt",
      email: value(branding.email, "info@heizoel-online.com"),
      registryCourt: value(branding.registryCourt, "—"),
      registerNumber: value(branding.commercialRegisterNumber, "—"),
      vatId: value(branding.vatId, "—"),
      logoUrl: branding.logoUrl,
      shopName: value(branding.shopName, value(branding.companyName, "Heizöl Online")),
    },
    bank: bankFor(order, branding, gross),
    recipientLines: addressLines(billing),
    salutation: salutationFor(billing),
    deliveryWindow: weekday ? [weekday, period].filter(Boolean).join(" ") : "Termin wird abgestimmt",
    deliveryAddressLine: addressOneLine(order.deliveryAddress),
    itemTitle: variantLabel,
    itemSubtitle: `DIN 51603-1 · inkl. Lieferung · Tagespreis vom ${formatDate(order.placedAt)}`,
    quantityLabel: `${number.format(order.liters)} L`,
    unitPriceLabel: `${euro.format(order.pricePer100)} / 100 L`,
    lineTotal: gross,
    net,
    vat: gross - net,
    gross,
  };
}

export const DEMO_INVOICE_ORDER: Order = {
  id: "demo",
  orderNumber: "2609-74568",
  brandingId: null,
  brandingName: null,
  variant: "standard",
  liters: 2000,
  deliveryPoints: 1,
  hose: null,
  truck: null,
  pricePer100: 128.07,
  total: 2561.4,
  earliestDate: "2026-09-22",
  slotDate: "2026-09-22",
  slotPeriod: "vormittag",
  email: "fabian.schmidt@example.com",
  phone: "017035829853",
  deliveryAddress: {
    salutation: "Herr",
    firstName: "Fabian",
    lastName: "Schmidt",
    street: "Hauptstr.",
    streetNo: "15",
    plz: "50667",
    city: "Köln",
  },
  billingAddress: null,
  notes: null,
  paymentMethod: "vorkasse",
  status: "neu",
  internalNote: null,
  placedAt: "2026-09-13T10:00:00.000Z",
  createdAt: "2026-09-13T10:00:00.000Z",
};
