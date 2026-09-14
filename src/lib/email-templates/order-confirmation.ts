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
  GREEN,
  GREEN_BORDER,
  GREEN_DARK,
  GREEN_SOFT,
  HEADING,
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

export type { EmailBranding } from "./email-shared";

export type OrderConfirmationData = {
  orderNumber: string;
  salutation: string;
  customerName: string;
  billingAddress: string[];
  deliveryAddress: string[];
  product: string;
  liters: number;
  pricePer100L: number;
  paymentMethod: string;
  deliveryWindow: string;
  totalPrice: number;
  phone: string;
};

export const DEMO_ORDER: OrderConfirmationData = {
  orderNumber: "2609-74568",
  salutation: "Sehr geehrter Herr Schmidt",
  customerName: "Fabian Schmidt",
  billingAddress: ["Fabian Schmidt", "Hauptstr. 15", "50667 Köln"],
  deliveryAddress: ["Fabian Schmidt", "Hauptstr. 15", "50667 Köln"],
  product: "Heizöl Standard",
  liters: 2000,
  pricePer100L: 128.07,
  paymentMethod: "Vorkasse",
  deliveryWindow: "Di 22.09.2026 8:00 - 12:00 Uhr",
  totalPrice: 2561.4,
  phone: "017035829853",
};

export function renderOrderConfirmationEmail(branding: EmailBranding, order: OrderConfirmationData = DEMO_ORDER) {
  const r = resolveBranding(branding);

  const content = `${emailHeader(branding, r, "Bestellbestätigung")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${progressCell("&#10003;", "Bestellt", "done")}
  ${progressCell("2", "Bestellprüfung", "active")}
  ${progressCell("3", "Lieferung", "todo")}
</tr></table>`, "16px 32px", SURFACE)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle" style="font:700 15px/21px ${FONT_STACK};color:${HEADING}"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:${GREEN};margin-right:9px"></span>Ihre Bestellung wurde aufgenommen</td>
  <td align="right" valign="middle"><span style="display:inline-block;padding:6px 12px;border-radius:5px;background:${SURFACE};font:600 12px/16px ${FONT_STACK};color:${MUTED}">Auftragsnr. ${esc(order.orderNumber)}</span></td>
</tr></table>`, "24px 32px 4px")}

${section(`<p style="margin:0 0 14px;font:400 15px/23px ${FONT_STACK};color:${TEXT}">${esc(order.salutation)},</p>
<p style="margin:0;font:400 15px/23px ${FONT_STACK};color:${TEXT}">vielen Dank für Ihre Heizölbestellung bei <strong style="color:${HEADING}">${r.shop}</strong>. Ihr Auftrag ist erfolgreich bei uns eingegangen und der vereinbarte Preis ist für Sie <strong style="color:${HEADING}">garantiert</strong>.</p>`, "8px 32px 22px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border-left:4px solid ${GREEN}"><tr><td style="padding:16px 18px">
  <div style="font:700 10px/14px ${FONT_STACK};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Nächster Schritt</div>
  <div style="margin-top:4px;font:700 15px/21px ${FONT_STACK};color:${HEADING}">Fast geschafft — es kommt noch eine E-Mail</div>
  <div style="margin-top:8px;font:400 13px/21px ${FONT_STACK};color:${MUTED}">Ihre Bestellung ist bei uns eingegangen und wird jetzt geprüft. In wenigen Minuten erhalten Sie eine zweite E-Mail zur Bestätigung Ihres Liefertermins — das ist online in einer Minute erledigt. Nur wenn etwas unklar sein sollte, melden wir uns telefonisch unter ${esc(order.phone)}. Sie müssen sonst nichts tun.</div>
</td></tr></table>`, "0 32px 24px")}

${divider()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE_COLOR};border-radius:6px;overflow:hidden">
  <tr><td colspan="2" style="padding:11px 16px;background:${GREEN};font:700 11px/15px ${FONT_STACK};color:#ffffff;text-transform:uppercase;letter-spacing:.9px">Ihre Bestellübersicht</td></tr>
  ${orderRow("Produkt", esc(order.product), false)}
  ${orderRow("Menge", `${number.format(order.liters)} Liter`, true)}
  ${orderRow("Preis / 100 L", euro.format(order.pricePer100L), false)}
  ${orderRow("Zahlungsart", esc(order.paymentMethod), true)}
  ${orderRow("Liefertermin", esc(order.deliveryWindow), false)}
  <tr>
    <td style="padding:16px;font:700 15px/20px ${FONT_STACK};color:${HEADING}">Gesamtpreis</td>
    <td align="right" style="padding:16px;font:700 20px/24px ${FONT_STACK};color:${HEADING}">${euro.format(order.totalPrice)}</td>
  </tr>
</table>`)}

${trustBar()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${addressBox("Rechnungsadresse", order.billingAddress, true)}
  ${addressBox("Lieferadresse", order.deliveryAddress, false)}
</tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT_STACK};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:18px">So geht es weiter</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${stepRow("&#10003;", "Bestellung eingegangen", "", "done", false)}
  ${stepRow("2", "Bestellprüfung", "Unser Team prüft Ihre Bestellung auf Vollständigkeit.", "active", false)}
  ${stepRow("3", "Terminbestätigung (1–3 Werktage)", "Ein Mitarbeiter ruft Sie persönlich an, um Ihren Liefertermin zu bestätigen.", "todo", false)}
  ${stepRow("4", "Lieferung", "Ihr Heizöl wird zum vereinbarten Termin zuverlässig geliefert.", "todo", true)}
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE};border-radius:6px"><tr><td style="padding:18px 20px;font:400 13px/24px ${FONT_STACK};color:${TEXT}">
  • Bitte bleiben Sie in den nächsten 1–3 Werktagen <strong style="color:${HEADING}">telefonisch erreichbar</strong><br />
  • Stellen Sie sicher, dass am Liefertag <strong style="color:${HEADING}">jemand vor Ort ist</strong><br />
  • Bei Fragen antworten Sie einfach auf diese E-Mail
</td></tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT_STACK};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:14px">Häufige Fragen</div>
${faq("Ist meine Bestellung verbindlich?", `Sie haben ein <strong style="color:${HEADING}">14-tägiges Widerrufsrecht</strong>. Eine kostenlose Stornierung ist jederzeit vor der Lieferung möglich — antworten Sie einfach auf diese E-Mail.`, false)}
${faq("Wann werde ich kontaktiert?", "Innerhalb von 1–3 Werktagen meldet sich ein Mitarbeiter persönlich bei Ihnen, um Ihren Liefertermin zu bestätigen.", false)}
${faq("Wer liefert mein Heizöl?", "Wir arbeiten mit erfahrenen, regionalen Lieferpartnern zusammen. Der Fahrer meldet sich ca. 1 Stunde vor Ankunft bei Ihnen.", false)}
${faq("Was passiert, wenn ich nicht da bin?", "Kein Problem — wir vereinbaren einen neuen Termin. Es entstehen keine zusätzlichen Kosten.", true)}`)}

${contactBox(r.mail)}

${emailFooter(branding, r)}`;

  return emailShell(
    `Bestellbestätigung ${esc(order.orderNumber)}`,
    `Ihre Bestellung ${esc(order.orderNumber)} über ${number.format(order.liters)} Liter ist eingegangen.`,
    content,
  );
}

// Lokale Aliasse, damit die Template-Literal oben lesbar bleiben.
import { FONT as FONT_STACK, LINE as LINE_COLOR } from "./email-shared";
void GREEN_BORDER;
void GREEN_DARK;
