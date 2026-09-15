import { formatIban } from "@/lib/iban";
import {
  addressBox,
  contactBox,
  divider,
  emailFooter,
  emailHeader,
  emailShell,
  esc,
  euro,
  faq,
  FONT,
  GREEN,
  GREEN_BORDER,
  GREEN_DARK,
  GREEN_SOFT,
  HEADING,
  LINE,
  MUTED,
  number,
  orderRow,
  progressCell,
  resolveBranding,
  section,
  stepRow,
  SURFACE,
  TEXT,
  trustBar,
  type EmailBranding,
} from "./email-shared";

export type BankDetails = {
  accountHolder: string;
  iban: string;
  bic: string;
};

export const DEMO_BANK: BankDetails = {
  accountHolder: "Muster-Energie GmbH",
  iban: "DE89 3704 0044 0532 0130 00",
  bic: "COBADEFFXXX",
};

export type OrderInvoiceData = {
  invoiceNumber: string;
  invoiceDate: string;
  orderNumber: string;
  salutation: string;
  customerName: string;
  billingAddress: string[];
  deliveryAddress: string[];
  product: string;
  liters: number;
  pricePer100L: number;
  deliveryWindow: string;
  totalPrice: number;
  phone: string;
  /** "vorkasse" | "ec" | "barzahlung" — steuert Anzahlung vs. voller Betrag. */
  paymentMethod?: string | null;
};

export const DEMO_INVOICE: OrderInvoiceData = {
  invoiceNumber: "RE-2609-74568",
  invoiceDate: "14.09.2026",
  orderNumber: "2609-74568",
  salutation: "Sehr geehrter Herr Schmidt",
  customerName: "Fabian Schmidt",
  billingAddress: ["Fabian Schmidt", "Hauptstr. 15", "50667 Köln"],
  deliveryAddress: ["Fabian Schmidt", "Hauptstr. 15", "50667 Köln"],
  product: "Heizöl Standard",
  liters: 2000,
  pricePer100L: 128.07,
  deliveryWindow: "Di 22.09.2026 8:00 - 12:00 Uhr",
  totalPrice: 2561.4,
  phone: "017035829853",
};

function bankFrom(branding: EmailBranding): BankDetails {
  const iban = (branding.iban ?? "").trim();
  const accountHolder = (branding.accountHolder ?? branding.companyName ?? "").trim();
  const bic = (branding.bic ?? "").trim();
  if (!iban || !accountHolder) return { ...DEMO_BANK, iban: formatIban(DEMO_BANK.iban) };
  return { accountHolder, iban: formatIban(iban), bic: bic || DEMO_BANK.bic };
}

function bankRow(label: string, value: string) {
  return `<tr>
    <td width="38%" style="padding:8px 16px;font:400 13px/18px ${FONT};color:${GREEN_DARK}">${label}</td>
    <td style="padding:8px 16px;font:700 13px/18px ${FONT};color:${HEADING}">${value}</td>
  </tr>`;
}

export function renderOrderInvoiceEmail(
  branding: EmailBranding,
  invoice: OrderInvoiceData = DEMO_INVOICE,
  bankOverride?: BankDetails | null,
) {
  const bank = bankOverride
    ? { ...bankOverride, iban: formatIban(bankOverride.iban) }
    : bankFrom(branding);
  const r = resolveBranding(branding, bank.accountHolder);
  const net = invoice.totalPrice / 1.19;
  const vatAmount = invoice.totalPrice - net;
  const method = (invoice.paymentMethod ?? "").toLowerCase();
  const isDeposit = method === "ec" || method === "barzahlung";
  const payAmount = isDeposit ? Math.round((invoice.totalPrice / 2) * 100) / 100 : invoice.totalPrice;
  const remaining = Math.round((invoice.totalPrice - payAmount) * 100) / 100;
  const restText = method === "ec" ? "vor Ort per EC-Karte" : "vor Ort in bar";
  const payTitle = isDeposit ? "Bitte überweisen Sie als Anzahlung" : "Bitte überweisen Sie";
  const payHint = isDeposit
    ? `Es ist eine <strong style="color:${HEADING}">Anzahlung von 50 %</strong> (${euro.format(payAmount)}) per Überweisung fällig. Der Restbetrag von <strong style="color:${HEADING}">${euro.format(remaining)}</strong> wird bei der Lieferung ${restText} bezahlt.`
    : `Ihre Lieferung wird <strong style="color:${HEADING}">nach Zahlungseingang</strong> disponiert. Bitte geben Sie unbedingt den Verwendungszweck an, damit wir Ihre Zahlung zuordnen können.`;
  const intro = isDeposit
    ? `vielen Dank für Ihre Bestellung bei <strong style="color:${HEADING}">${r.shop}</strong>. Anbei erhalten Sie Ihre Rechnung. Bitte überweisen Sie die Anzahlung von 50 % auf das unten genannte Konto — den Restbetrag begleichen Sie bei der Lieferung ${restText}.`
    : `vielen Dank für Ihre Bestellung bei <strong style="color:${HEADING}">${r.shop}</strong>. Anbei erhalten Sie Ihre Rechnung. Bitte überweisen Sie den Rechnungsbetrag auf das unten genannte Konto.`;

  const content = `${emailHeader(branding, r, "Rechnung")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${progressCell("&#10003;", "Bestellt", "done")}
  ${progressCell("&#10003;", "Bestellprüfung", "done")}
  ${progressCell("&#10003;", "Rechnung", "done")}
</tr></table>`, "16px 32px", SURFACE)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle" style="font:700 15px/21px ${FONT};color:${HEADING}"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:${GREEN};margin-right:9px"></span>Ihre Rechnung ist da</td>
  <td align="right" valign="middle"><span style="display:inline-block;padding:6px 12px;border-radius:5px;background:${SURFACE};font:600 12px/16px ${FONT};color:${MUTED}">${esc(invoice.invoiceNumber)}</span></td>
</tr></table>`, "24px 32px 4px")}

${section(`<p style="margin:0 0 14px;font:400 15px/23px ${FONT};color:${TEXT}">${esc(invoice.salutation)},</p>
<p style="margin:0;font:400 15px/23px ${FONT};color:${TEXT}">${intro}</p>`, "8px 32px 22px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px"><tr>
  <td width="33%" align="center" style="padding:12px 8px">
    <div style="font:700 9px/13px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.8px">Rechnungsnr.</div>
    <div style="margin-top:3px;font:700 13px/17px ${FONT};color:${HEADING}">${esc(invoice.invoiceNumber)}</div>
  </td>
  <td width="33%" align="center" style="padding:12px 8px;border-left:1px solid ${LINE}">
    <div style="font:700 9px/13px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.8px">Rechnungsdatum</div>
    <div style="margin-top:3px;font:700 13px/17px ${FONT};color:${HEADING}">${esc(invoice.invoiceDate)}</div>
  </td>
  <td width="33%" align="center" style="padding:12px 8px;border-left:1px solid ${LINE}">
    <div style="font:700 9px/13px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.8px">Auftragsnr.</div>
    <div style="margin-top:3px;font:700 13px/17px ${FONT};color:${HEADING}">${esc(invoice.orderNumber)}</div>
  </td>
</tr></table>`, "0 32px 24px")}

${divider()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px;overflow:hidden">
  <tr><td colspan="2" style="padding:11px 16px;background:${GREEN};font:700 11px/15px ${FONT};color:#ffffff;text-transform:uppercase;letter-spacing:.9px">Rechnungsübersicht</td></tr>
  ${orderRow("Produkt", esc(invoice.product), false)}
  ${orderRow("Menge", `${number.format(invoice.liters)} Liter`, true)}
  ${orderRow("Preis / 100 L", euro.format(invoice.pricePer100L), false)}
  ${orderRow("Zwischensumme (netto)", euro.format(net), true)}
  ${orderRow("Umsatzsteuer (19 %)", euro.format(vatAmount), false)}
  <tr>
    <td style="padding:16px;font:700 15px/20px ${FONT};color:${HEADING}">Rechnungsbetrag</td>
    <td align="right" style="padding:16px;font:700 20px/24px ${FONT};color:${HEADING}">${euro.format(invoice.totalPrice)}</td>
  </tr>
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border:1px solid ${GREEN_BORDER};border-radius:8px;overflow:hidden">
  <tr><td style="padding:18px 18px 10px">
    <div style="font:700 10px/14px ${FONT};color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.9px">${payTitle}</div>
    <div style="margin-top:4px;font:700 22px/28px ${FONT};color:${GREEN_DARK}">${euro.format(payAmount)}</div>
  </td></tr>
  <tr><td style="padding:4px 2px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${bankRow("Zahlungsempfänger", esc(bank.accountHolder))}
      ${bankRow("IBAN", esc(bank.iban))}
      ${bankRow("BIC", esc(bank.bic))}
      <tr>
        <td style="padding:8px 16px;font:400 13px/18px ${FONT};color:${GREEN_DARK}">Verwendungszweck</td>
        <td style="padding:8px 16px"><span style="display:inline-block;padding:4px 10px;border-radius:5px;background:${GREEN_BORDER};font:700 14px/18px 'Courier New',monospace;color:${GREEN_DARK}">${esc(invoice.orderNumber)}</span></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:8px 18px 18px;font:400 12px/19px ${FONT};color:${GREEN_DARK}">Ihre Lieferung wird <strong style="color:${HEADING}">nach Zahlungseingang</strong> disponiert. Bitte geben Sie unbedingt den Verwendungszweck an, damit wir Ihre Zahlung zuordnen können.</td></tr>
</table>`, "0 32px 26px")}

${trustBar()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${addressBox("Rechnungsadresse", invoice.billingAddress, true)}
  ${addressBox("Lieferadresse", invoice.deliveryAddress, false)}
</tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:18px">So geht es weiter</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${stepRow("&#10003;", "Bestellung eingegangen", "", "done", false)}
  ${stepRow("&#10003;", "Rechnung erhalten", "", "done", false)}
  ${stepRow("3", "Zahlung", "Überweisen Sie den Rechnungsbetrag unter Angabe des Verwendungszwecks.", "active", false)}
  ${stepRow("4", "Lieferung", `Nach Zahlungseingang liefern wir zum vereinbarten Termin: ${esc(invoice.deliveryWindow)}.`, "todo", true)}
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE};border-radius:6px"><tr><td style="padding:18px 20px;font:400 13px/24px ${FONT};color:${TEXT}">
  • Bitte überweisen Sie <strong style="color:${HEADING}">selbstständig</strong> — es erfolgt kein Bankeinzug<br />
  • Geben Sie als Verwendungszweck Ihre <strong style="color:${HEADING}">Auftragsnummer ${esc(invoice.orderNumber)}</strong> an<br />
  • Stellen Sie sicher, dass am Liefertag <strong style="color:${HEADING}">jemand vor Ort ist</strong><br />
  • Bei Fragen antworten Sie einfach auf diese E-Mail
</td></tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:14px">Häufige Fragen</div>
${faq("Wann wird geliefert?", "Ihre Lieferung wird nach Zahlungseingang disponiert. Der Fahrer meldet sich ca. 1 Stunde vor Ankunft bei Ihnen.", false)}
${faq("Was muss ich bei der Überweisung beachten?", `Bitte geben Sie unbedingt den Verwendungszweck <strong style="color:${HEADING}">${esc(invoice.orderNumber)}</strong> an, damit wir Ihre Zahlung zuordnen können.`, false)}
${faq("Kann ich die Bestellung noch stornieren?", `Sie haben ein <strong style="color:${HEADING}">14-tägiges Widerrufsrecht</strong>. Eine kostenlose Stornierung ist jederzeit vor der Lieferung möglich — antworten Sie einfach auf diese E-Mail.`, false)}
${faq("Was passiert, wenn ich nicht da bin?", "Kein Problem — wir vereinbaren einen neuen Termin. Es entstehen keine zusätzlichen Kosten.", true)}`)}

${contactBox(r.mail)}

${emailFooter(branding, r)}`;

  return emailShell(
    `Rechnung ${esc(invoice.invoiceNumber)}`,
    `Ihre Rechnung ${esc(invoice.invoiceNumber)} über ${euro.format(invoice.totalPrice)}.`,
    content,
  );
}
