import type { EmailBranding } from "@/lib/email-templates/email-shared";
import type { OrderConfirmationData } from "@/lib/email-templates/order-confirmation";
import type { OrderInvoiceData } from "@/lib/email-templates/order-invoice";
import type { SmsBranding, SmsDemoData } from "@/lib/sms-templates";
import type { Order, OrderAddress } from "@/lib/orders.functions";
import { invoiceNumberFor } from "@/lib/iban";
import { paymentMethodLabel } from "@/lib/payment-method";

const VARIANT_LABEL: Record<string, string> = {
  standard: "Heizöl Standard",
  premium: "Heizöl Premium",
};

export const PAYMENT_LABEL: Record<string, string> = {
  vorkasse: "Vorkasse",
  vorauskasse: "Vorkasse",
  ueberweisung: "Überweisung",
  barzahlung: "Barzahlung",
  bar: "Barzahlung",
  ec: "EC-Karte",
};

const PERIOD_LABEL: Record<string, string> = {
  vormittag: "8:00 - 12:00 Uhr",
  nachmittag: "12:00 - 17:00 Uhr",
  telefon: "Termin wird telefonisch vereinbart",
};

export type BrandingRow = Record<string, unknown>;

const str = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value.trim() : null;

export function emailBrandingFrom(row: BrandingRow | null, logoUrl: string | null): EmailBranding {
  return {
    shopName: str(row?.["shop_name"]),
    companyName: str(row?.["company_name"]),
    streetAddress: str(row?.["street_address"]),
    postalCode: str(row?.["postal_code"]),
    city: str(row?.["city"]),
    registryCourt: str(row?.["registry_court"]),
    commercialRegisterNumber: str(row?.["commercial_register_number"]),
    managingDirector: str(row?.["managing_director"]),
    vatId: str(row?.["vat_id"]),
    email: str(row?.["email"]),
    domain: str(row?.["domain"]),
    logoUrl,
    accountHolder: str(row?.["account_holder"]),
    iban: str(row?.["iban"]),
    bankName: str(row?.["bank_name"]),
    bic: str(row?.["bic"]),
  };
}

export function smsBrandingFrom(row: BrandingRow | null): SmsBranding {
  return {
    shopName: str(row?.["shop_name"]) ?? str(row?.["company_name"]),
    email: str(row?.["email"]),
    sevenSenderName: str(row?.["seven_sender_name"]),
  };
}

export function smsDataFrom(order: Order): SmsDemoData {
  return { orderNumber: order.orderNumber, invoiceNumber: invoiceNumberFor(order.orderNumber) };
}

function addressLines(address: OrderAddress): string[] {
  const name = [address.firstName, address.lastName].filter(Boolean).join(" ").trim();
  const street = [address.street, address.streetNo].filter(Boolean).join(" ").trim();
  const city = [address.plz, address.city].filter(Boolean).join(" ").trim();
  return [address.company ?? "", name, street, city].map((line) => line.trim()).filter(Boolean);
}

function salutationFor(address: OrderAddress): string {
  const last = (address.lastName ?? "").trim();
  const salutation = (address.salutation ?? "").trim().toLowerCase();
  if (last && salutation === "herr") return `Sehr geehrter Herr ${last}`;
  if (last && salutation === "frau") return `Sehr geehrte Frau ${last}`;
  if (last) return `Sehr geehrte/r ${last}`;
  return "Sehr geehrte Damen und Herren";
}

function customerName(address: OrderAddress, fallback: string): string {
  const name = [address.firstName, address.lastName].filter(Boolean).join(" ").trim();
  return name || (address.company ?? "").trim() || fallback;
}

function deliveryWindow(order: Order): string {
  if (!order.slotDate) return "Termin wird abgestimmt";
  const date = new Date(order.slotDate);
  if (Number.isNaN(date.getTime())) return "Termin wird abgestimmt";
  const day = new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const period = order.slotPeriod ? (PERIOD_LABEL[order.slotPeriod] ?? order.slotPeriod) : null;
  return [day, period].filter(Boolean).join(" ");
}

function formatDate(input: string | null | undefined): string {
  const date = input ? new Date(input) : new Date();
  const safe = Number.isNaN(date.getTime()) ? new Date() : date;
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(safe);
}

function base(order: Order) {
  const billing = order.billingAddress ?? order.deliveryAddress;
  return {
    salutation: salutationFor(billing),
    customerName: customerName(billing, order.email),
    billingAddress: addressLines(billing),
    deliveryAddress: addressLines(order.deliveryAddress),
    product: VARIANT_LABEL[order.variant] ?? "Heizöl Standard",
    liters: order.liters,
    pricePer100L: order.pricePer100,
    deliveryWindow: deliveryWindow(order),
    totalPrice: order.total,
    phone: order.phone ?? "",
  };
}

export function invoiceDataFrom(order: Order, invoiceNumber: string): OrderInvoiceData {
  return {
    ...base(order),
    invoiceNumber,
    invoiceDate: formatDate(null),
    orderNumber: order.orderNumber,
    paymentMethod: order.paymentMethod,
  };
}

export function confirmationDataFrom(order: Order): OrderConfirmationData {
  return {
    ...base(order),
    orderNumber: order.orderNumber,
    paymentMethod: paymentMethodLabel(order.paymentMethod),
  };
}
