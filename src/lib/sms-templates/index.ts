export interface SmsBranding {
  shopName: string | null;
  email: string | null;
  sevenSenderName: string | null;
}

export interface SmsDemoData {
  orderNumber: string;
  invoiceNumber: string;
}

export const DEMO_SMS: SmsDemoData = {
  orderNumber: "2609-74568",
  invoiceNumber: "RE-2609-74568",
};

export const SMS_FALLBACK_BRANDING: SmsBranding = {
  shopName: "Heizöl Online",
  email: "info@heizoel-online.com",
  sevenSenderName: null,
};

function shop(branding: SmsBranding): string {
  return branding.shopName || "Heizöl Online";
}

export function smsSender(branding: SmsBranding): string {
  const sender = branding.sevenSenderName?.trim();
  return sender || shop(branding);
}

export function renderOrderConfirmationSms(branding: SmsBranding, data: SmsDemoData = DEMO_SMS): string {
  const contact = branding.email ? ` Fragen? ${branding.email}` : "";
  return `Ihre Bestellung ${data.orderNumber} bei ${shop(branding)} ist eingegangen. Vielen Dank!${contact}`;
}

export function renderOrderInvoiceSms(branding: SmsBranding, data: SmsDemoData = DEMO_SMS): string {
  return `Ihre Rechnung ${data.invoiceNumber} zur Bestellung ${data.orderNumber} wurde soeben per E-Mail versendet. Vielen Dank für Ihren Einkauf bei ${shop(branding)}!`;
}

// GSM-7 Grundzeichensatz (vereinfacht): Steuert die Segmentberechnung.
const GSM7_RE = /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ\u001BÆæßÉ !"#¤%&'()*+,\-./0-9:;<=>?¡A-ZÄÖÑܧ¿a-zäöñüà^{}\\\[~|€]*$/;

export function smsSegments(text: string): { segments: number; perSegment: number; isGsm: boolean } {
  const isGsm = GSM7_RE.test(text);
  const single = isGsm ? 160 : 70;
  const concat = isGsm ? 153 : 67;
  if (text.length === 0) return { segments: 0, perSegment: single, isGsm };
  if (text.length <= single) return { segments: 1, perSegment: single, isGsm };
  return { segments: Math.ceil(text.length / concat), perSegment: concat, isGsm };
}
