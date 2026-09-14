export type EmailBranding = {
  shopName: string | null;
  companyName: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  registryCourt: string | null;
  commercialRegisterNumber: string | null;
  managingDirector: string | null;
  vatId: string | null;
  email: string | null;
  domain: string | null;
  logoUrl: string | null;
};

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

const GREEN = "#22C55E";
const GREEN_DARK = "#15803D";
const GREEN_SOFT = "#F2FCF5";
const GREEN_BORDER = "#BBF7D0";
const GOLD = "#F59E0B";
const TEXT = "#2E332F";
const HEADING = "#1A1F1C";
const MUTED = "#8A918B";
const LINE = "#E5E7EB";
const SURFACE = "#F7F8F7";
const FONT = "Roboto,Helvetica,Arial,sans-serif";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const number = new Intl.NumberFormat("de-DE");

function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function text(value: string | null, fallback: string) {
  return esc((value ?? "").trim() || fallback);
}

function hostname(domain: string | null, fallback: string) {
  if (!domain) return fallback;
  try {
    return new URL(domain.includes("://") ? domain : `https://${domain}`).hostname.replace(/^www\./, "");
  } catch {
    return domain;
  }
}

function stars(size: number, color = GOLD) {
  return `<span style="font:700 ${size}px/${size + 4}px ${FONT};color:${color};letter-spacing:2px">&#9733;&#9733;&#9733;&#9733;&#9733;</span>`;
}

function logoBlock(branding: EmailBranding, shop: string, big: boolean) {
  if (branding.logoUrl) {
    return `<img src="${esc(branding.logoUrl)}" alt="${shop}" width="${big ? 210 : 180}" style="display:block;max-width:${big ? 210 : 180}px;height:auto;border:0" />`;
  }
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td valign="middle" style="padding-right:12px"><div style="width:${big ? 14 : 12}px;height:${big ? 58 : 48}px;border-radius:3px;background:${GREEN};font-size:0;line-height:0">&nbsp;</div></td>
    <td valign="middle">
      <div style="font:700 ${big ? 34 : 28}px/${big ? 36 : 30}px ${FONT};color:${HEADING};letter-spacing:-.5px;text-transform:uppercase">${shop}</div>
      <div style="margin-top:4px">${stars(big ? 17 : 15)} <span style="font:700 ${big ? 17 : 15}px/20px ${FONT};color:${HEADING}">4,99</span></div>
    </td>
  </tr></table>`;
}

function section(inner: string, padding = "26px 32px", background = "#ffffff") {
  return `<tr><td style="padding:${padding};background:${background}">${inner}</td></tr>`;
}

function divider() {
  return `<tr><td style="padding:0 32px"><div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div></td></tr>`;
}

function progressCell(circle: string, label: string, state: "done" | "active" | "todo") {
  const bg = state === "done" ? GREEN : state === "active" ? "#FFFFFF" : "#E8EAE9";
  const color = state === "done" ? "#ffffff" : state === "active" ? GREEN_DARK : MUTED;
  const border = state === "active" ? `2px solid ${GREEN}` : "0";
  const labelColor = state === "todo" ? MUTED : GREEN_DARK;
  return `<td width="33%" align="center" valign="top">
    <div style="width:26px;height:26px;margin:0 auto 7px;border-radius:13px;background:${bg};border:${border};color:${color};font:700 12px/${state === "active" ? 22 : 26}px ${FONT};text-align:center">${circle}</div>
    <div style="font:700 10px/14px ${FONT};color:${labelColor};text-transform:uppercase;letter-spacing:.8px">${label}</div>
  </td>`;
}

function orderRow(label: string, value: string, zebra: boolean) {
  return `<tr>
    <td width="42%" style="padding:12px 16px;background:${zebra ? SURFACE : "#ffffff"};border-bottom:1px solid ${LINE};font:400 13px/18px ${FONT};color:${MUTED}">${label}</td>
    <td style="padding:12px 16px;background:${zebra ? SURFACE : "#ffffff"};border-bottom:1px solid ${LINE};font:700 13px/18px ${FONT};color:${HEADING}">${value}</td>
  </tr>`;
}

function trustCell(top: string, middle: string, bottom: string, borderLeft: boolean) {
  return `<td width="33%" valign="middle" align="center" style="padding:14px 12px;${borderLeft ? `border-left:1px solid ${LINE};` : ""}">
    <div style="font:700 11px/15px ${FONT};color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.6px">${top}</div>
    <div style="margin-top:4px;font:700 13px/18px ${FONT};color:${HEADING}">${middle}</div>
    <div style="margin-top:2px;font:400 12px/16px ${FONT};color:${MUTED}">${bottom}</div>
  </td>`;
}

function infoChip(top: string, middle: string) {
  return `<td valign="top" style="padding:0 5px">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${LINE};border-radius:6px;background:#ffffff">
      <tr><td align="center" style="padding:9px 10px">
        <div style="font:700 9px/13px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.8px">${top}</div>
        <div style="margin-top:3px;font:700 12px/16px ${FONT};color:${HEADING}">${middle}</div>
      </td></tr>
    </table>
  </td>`;
}

function addressBox(title: string, lines: string[], first: boolean) {
  return `<td width="50%" valign="top" style="padding-${first ? "right" : "left"}:9px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px">
      <tr><td style="padding:10px 14px;background:${SURFACE};border-bottom:1px solid ${LINE};font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">${title}</td></tr>
      <tr><td style="padding:14px;font:400 14px/22px ${FONT};color:${TEXT}">${lines.map((line) => esc(line)).join("<br />")}</td></tr>
    </table>
  </td>`;
}

function stepRow(circle: string, title: string, body: string, state: "done" | "active" | "todo", last: boolean) {
  const bg = state === "done" ? GREEN : state === "active" ? "#FACC15" : "#E8EAE9";
  const color = state === "done" ? "#ffffff" : state === "active" ? "#3F2D00" : MUTED;
  const titleColor = state === "todo" ? MUTED : HEADING;
  return `<tr>
    <td width="46" valign="top" style="padding:0 14px 0 0">
      <div style="width:30px;height:30px;border-radius:15px;background:${bg};color:${color};font:700 14px/30px ${FONT};text-align:center">${circle}</div>
      ${last ? "" : `<div style="width:1px;height:26px;margin:3px auto 0;background:${LINE};font-size:0;line-height:0">&nbsp;</div>`}
    </td>
    <td valign="top" style="padding:0 0 ${last ? 0 : 8}px 0">
      <div style="font:700 14px/22px ${FONT};color:${titleColor}">${title}</div>
      ${body ? `<div style="margin-top:2px;font:400 13px/19px ${FONT};color:${MUTED}">${body}</div>` : ""}
    </td>
  </tr>`;
}

function faq(question: string, answer: string, last: boolean) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${last ? "" : "margin-bottom:10px;"}border:1px solid ${LINE};border-radius:6px">
    <tr><td style="padding:13px 16px">
      <div style="font:700 14px/19px ${FONT};color:${HEADING}">${question}</div>
      <div style="margin-top:3px;font:400 13px/20px ${FONT};color:${MUTED}">${answer}</div>
    </td></tr>
  </table>`;
}

export function renderOrderConfirmationEmail(branding: EmailBranding, order: OrderConfirmationData = DEMO_ORDER) {
  const shop = text(branding.shopName, "Heizöl Online");
  const company = text(branding.companyName, "Muster-Energie GmbH");
  const street = text(branding.streetAddress, "Musterstraße 1");
  const cityLine = text([branding.postalCode, branding.city].filter(Boolean).join(" "), "12345 Musterstadt");
  const host = esc(hostname(branding.domain, "shop-domain.de"));
  const mail = text(branding.email, "info@shop-domain.de");
  const register = `${text(branding.registryCourt, "Amtsgericht Musterstadt")} · HRB ${text(branding.commercialRegisterNumber, "00000")}`;
  const vat = text(branding.vatId, "DE000000000");
  const director = text(branding.managingDirector, "Max Mustermann");

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Bestellbestätigung ${esc(order.orderNumber)}</title></head>
<body style="margin:0;padding:0;background:${SURFACE};font-family:${FONT};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Ihre Bestellung ${esc(order.orderNumber)} über ${number.format(order.liters)} Liter ist eingegangen.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE}">
<tr><td align="center" style="padding:22px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid ${LINE};border-radius:8px;overflow:hidden">

<tr><td style="height:4px;background:${GREEN};line-height:4px;font-size:0">&nbsp;</td></tr>

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle">${logoBlock(branding, shop, false)}</td>
  <td align="right" valign="middle" style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:1.2px">Bestellbestätigung</td>
</tr></table>`, "22px 32px")}

<tr><td style="height:2px;background:${GREEN};line-height:2px;font-size:0">&nbsp;</td></tr>

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${progressCell("&#10003;", "Bestellt", "done")}
  ${progressCell("2", "Bestellprüfung", "active")}
  ${progressCell("3", "Lieferung", "todo")}
</tr></table>`, "16px 32px", SURFACE)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle" style="font:700 15px/21px ${FONT};color:${HEADING}"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:${GREEN};margin-right:9px"></span>Ihre Bestellung wurde aufgenommen</td>
  <td align="right" valign="middle"><span style="display:inline-block;padding:6px 12px;border-radius:5px;background:${SURFACE};font:600 12px/16px ${FONT};color:${MUTED}">Auftragsnr. ${esc(order.orderNumber)}</span></td>
</tr></table>`, "24px 32px 4px")}

${section(`<p style="margin:0 0 14px;font:400 15px/23px ${FONT};color:${TEXT}">${esc(order.salutation)},</p>
<p style="margin:0;font:400 15px/23px ${FONT};color:${TEXT}">vielen Dank für Ihre Heizölbestellung bei <strong style="color:${HEADING}">${shop}</strong>. Ihr Auftrag ist erfolgreich bei uns eingegangen und der vereinbarte Preis ist für Sie <strong style="color:${HEADING}">garantiert</strong>.</p>`, "8px 32px 22px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border-left:4px solid ${GREEN}"><tr><td style="padding:16px 18px">
  <div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Nächster Schritt</div>
  <div style="margin-top:4px;font:700 15px/21px ${FONT};color:${HEADING}">Fast geschafft — es kommt noch eine E-Mail</div>
  <div style="margin-top:8px;font:400 13px/21px ${FONT};color:${MUTED}">Ihre Bestellung ist bei uns eingegangen und wird jetzt geprüft. In wenigen Minuten erhalten Sie eine zweite E-Mail zur Bestätigung Ihres Liefertermins — das ist online in einer Minute erledigt. Nur wenn etwas unklar sein sollte, melden wir uns telefonisch unter ${esc(order.phone)}. Sie müssen sonst nichts tun.</div>
</td></tr></table>`, "0 32px 24px")}

${divider()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px;overflow:hidden">
  <tr><td colspan="2" style="padding:11px 16px;background:${GREEN};font:700 11px/15px ${FONT};color:#ffffff;text-transform:uppercase;letter-spacing:.9px">Ihre Bestellübersicht</td></tr>
  ${orderRow("Produkt", esc(order.product), false)}
  ${orderRow("Menge", `${number.format(order.liters)} Liter`, true)}
  ${orderRow("Preis / 100 L", euro.format(order.pricePer100L), false)}
  ${orderRow("Zahlungsart", esc(order.paymentMethod), true)}
  ${orderRow("Liefertermin", esc(order.deliveryWindow), false)}
  <tr>
    <td style="padding:16px;font:700 15px/20px ${FONT};color:${HEADING}">Gesamtpreis</td>
    <td align="right" style="padding:16px;font:700 20px/24px ${FONT};color:${HEADING}">${euro.format(order.totalPrice)}</td>
  </tr>
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px"><tr>
  ${trustCell("Festpreis", "Preisgarantie", "Ihr Preis bleibt fest", false)}
  ${trustCell(stars(13), "33.000+ Kunden", "4,99 von 5 Sternen", true)}
  ${trustCell("ab 500 Liter", "Lieferung inklusive", "Deutschlandweit", true)}
</tr></table>`, "0 32px 26px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${addressBox("Rechnungsadresse", order.billingAddress, true)}
  ${addressBox("Lieferadresse", order.deliveryAddress, false)}
</tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:18px">So geht es weiter</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${stepRow("&#10003;", "Bestellung eingegangen", "", "done", false)}
  ${stepRow("2", "Bestellprüfung", "Unser Team prüft Ihre Bestellung auf Vollständigkeit.", "active", false)}
  ${stepRow("3", "Terminbestätigung (1–3 Werktage)", "Ein Mitarbeiter ruft Sie persönlich an, um Ihren Liefertermin zu bestätigen.", "todo", false)}
  ${stepRow("4", "Lieferung", "Ihr Heizöl wird zum vereinbarten Termin zuverlässig geliefert.", "todo", true)}
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE};border-radius:6px"><tr><td style="padding:18px 20px;font:400 13px/24px ${FONT};color:${TEXT}">
  • Bitte bleiben Sie in den nächsten 1–3 Werktagen <strong style="color:${HEADING}">telefonisch erreichbar</strong><br />
  • Stellen Sie sicher, dass am Liefertag <strong style="color:${HEADING}">jemand vor Ort ist</strong><br />
  • Bei Fragen antworten Sie einfach auf diese E-Mail
</td></tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px;margin-bottom:14px">Häufige Fragen</div>
${faq("Ist meine Bestellung verbindlich?", `Sie haben ein <strong style="color:${HEADING}">14-tägiges Widerrufsrecht</strong>. Eine kostenlose Stornierung ist jederzeit vor der Lieferung möglich — antworten Sie einfach auf diese E-Mail.`, false)}
${faq("Wann werde ich kontaktiert?", "Innerhalb von 1–3 Werktagen meldet sich ein Mitarbeiter persönlich bei Ihnen, um Ihren Liefertermin zu bestätigen.", false)}
${faq("Wer liefert mein Heizöl?", "Wir arbeiten mit erfahrenen, regionalen Lieferpartnern zusammen. Der Fahrer meldet sich ca. 1 Stunde vor Ankunft bei Ihnen.", false)}
${faq("Was passiert, wenn ich nicht da bin?", "Kein Problem — wir vereinbaren einen neuen Termin. Es entstehen keine zusätzlichen Kosten.", true)}`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border:1px solid ${GREEN_BORDER};border-radius:6px"><tr><td align="center" style="padding:20px">
  <div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Fragen?</div>
  <div style="margin-top:6px;font:700 15px/21px ${FONT};color:${HEADING}">Antworten Sie direkt auf diese E-Mail</div>
  <div style="margin-top:3px;font:400 13px/19px ${FONT};color:${MUTED}">oder schreiben Sie an <a href="mailto:${mail}" style="color:${GREEN_DARK};font-weight:700;text-decoration:none">${mail}</a></div>
</td></tr></table>`, "0 32px 26px")}

${section(`<div style="height:2px;width:48px;margin:0 auto 16px;background:${GREEN};font-size:0;line-height:0">&nbsp;</div>
<div style="text-align:center;font:700 15px/21px ${FONT};color:${HEADING}">Vielen Dank für Ihr Vertrauen.</div>
<div style="text-align:center;margin-top:3px;font:400 13px/19px ${FONT};color:${MUTED}">Ihr Team von ${shop}</div>`, "0 32px 28px")}

${section(`<div style="text-align:center;font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Über ${shop}</div>
<p style="margin:10px 0 16px;text-align:center;font:400 13px/21px ${FONT};color:${MUTED}">${shop} ist ein Onlineshop der <strong style="color:${HEADING}">${company}</strong> mit Sitz in ${cityLine}.<br />Günstige, zuverlässige Heizöl-Lieferung deutschlandweit.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${infoChip("Registriert", register)}
  ${infoChip("USt-IdNr.", vat)}
  ${infoChip("Bewertungen", `${stars(11)} 4,99 / 5`)}
</tr></table>
<p style="margin:16px 0 18px;text-align:center;font:400 11px/18px ${FONT};color:#A3A9A4">Bei Neukunden kann je nach Zahlungsart eine Teilzahlung vor Lieferung anfallen. Details besprechen wir mit Ihnen persönlich im Bestätigungsgespräch.</p>
<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
  <td style="padding:7px 14px;border:1px solid ${GREEN_BORDER};border-radius:20px;background:#ffffff;font:700 12px/16px ${FONT};color:${GREEN_DARK}">&#10003; SSL-verschlüsselt</td>
  <td width="10">&nbsp;</td>
  <td style="padding:7px 14px;border:1px solid ${LINE};border-radius:20px;background:#ffffff;font:700 12px/16px ${FONT};color:${MUTED}">&#9733; Trusted Shops</td>
</tr></table>
<p style="margin:14px 0 0;text-align:center;font:400 12px/17px ${FONT};color:${MUTED}">${stars(12)} <strong style="color:${HEADING}">4,99 / 5</strong> — 33.000+ Bewertungen</p>`, "24px 32px", SURFACE)}

${section(`<div style="text-align:center">
  <table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr><td>${logoBlock(branding, shop, true)}</td></tr></table>
  <p style="margin:12px 0 0;font:400 12px/18px ${FONT};color:${MUTED}">Heizöl günstig bestellen · Tagesaktuelle Preise, deutschlandweite Lieferung.</p>
</div>`, "24px 32px 20px")}

${divider()}

${section(`<p style="margin:0;text-align:center;font:400 11px/19px ${FONT};color:#A3A9A4">
  <strong style="color:${MUTED}">${company}</strong> · ${street} · ${cityLine}<br />
  ${register} · USt-IdNr. ${vat} · Geschäftsführer: ${director}<br />
  E-Mail: <a href="mailto:${mail}" style="color:#A3A9A4;text-decoration:none">${mail}</a> · ${host}
</p>`, "18px 32px 26px")}

</table>
</td></tr></table>
</body></html>`;
}
