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
const GREEN_SOFT = "#F0FDF4";
const TEXT = "#1A1F1C";
const MUTED = "#6B7280";
const LINE = "#E5E7EB";
const SURFACE = "#F7F8F7";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const number = new Intl.NumberFormat("de-DE");

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function section(inner: string, padding = "28px 32px", background = "#ffffff") {
  return `<tr><td style="padding:${padding};background:${background}">${inner}</td></tr>`;
}

function divider() {
  return `<tr><td style="padding:0 32px"><div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div></td></tr>`;
}

function step(index: string, title: string, body: string, active: boolean, done: boolean) {
  const bg = done ? GREEN : active ? GREEN_SOFT : SURFACE;
  const color = done ? "#ffffff" : active ? GREEN_DARK : MUTED;
  const border = active && !done ? `2px solid ${GREEN}` : "0";
  return `<tr>
    <td width="40" valign="top" style="padding:0 14px 18px 0">
      <div style="width:28px;height:28px;border-radius:14px;background:${bg};border:${border};color:${color};font:700 13px/28px Roboto,Arial,sans-serif;text-align:center">${done ? "&#10003;" : index}</div>
    </td>
    <td valign="top" style="padding:0 0 18px 0">
      <div style="font:700 14px/20px Roboto,Arial,sans-serif;color:${done || active ? TEXT : MUTED}">${title}</div>
      ${body ? `<div style="margin-top:3px;font:400 13px/19px Roboto,Arial,sans-serif;color:${MUTED}">${body}</div>` : ""}
    </td>
  </tr>`;
}

function faq(question: string, answer: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;border:1px solid ${LINE};border-radius:8px">
    <tr><td style="padding:14px 16px">
      <div style="font:700 14px/19px Roboto,Arial,sans-serif;color:${TEXT}">${question}</div>
      <div style="margin-top:4px;font:400 13px/19px Roboto,Arial,sans-serif;color:${MUTED}">${answer}</div>
    </td></tr>
  </table>`;
}

function row(label: string, value: string, strong = false) {
  return `<tr>
    <td style="padding:11px 16px;border-bottom:1px solid ${LINE};font:400 13px/18px Roboto,Arial,sans-serif;color:${MUTED}">${label}</td>
    <td align="right" style="padding:11px 16px;border-bottom:1px solid ${LINE};font:${strong ? "700 17px" : "600 13px"}/22px Roboto,Arial,sans-serif;color:${TEXT}">${value}</td>
  </tr>`;
}

function badge(top: string, middle: string, bottom: string) {
  return `<td width="33%" valign="top" style="padding:14px 10px;border:1px solid ${LINE};border-radius:8px;text-align:center">
    <div style="font:700 11px/15px Roboto,Arial,sans-serif;color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.5px">${top}</div>
    <div style="margin-top:4px;font:700 13px/18px Roboto,Arial,sans-serif;color:${TEXT}">${middle}</div>
    <div style="margin-top:2px;font:400 12px/16px Roboto,Arial,sans-serif;color:${MUTED}">${bottom}</div>
  </td>`;
}

function addressBox(title: string, lines: string[]) {
  return `<td width="50%" valign="top" style="padding-right:8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:8px">
      <tr><td style="padding:9px 14px;background:${SURFACE};border-bottom:1px solid ${LINE};font:700 10px/14px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.8px">${title}</td></tr>
      <tr><td style="padding:14px;font:400 14px/21px Roboto,Arial,sans-serif;color:${TEXT}">${lines.map((line) => esc(line)).join("<br />")}</td></tr>
    </table>
  </td>`;
}

export function renderOrderConfirmationEmail(branding: EmailBranding, order: OrderConfirmationData = DEMO_ORDER) {
  const shop = text(branding.shopName, "Heizöl Shop");
  const company = text(branding.companyName, "Musterfirma GmbH");
  const street = text(branding.streetAddress, "Musterstraße 1");
  const cityLine = text([branding.postalCode, branding.city].filter(Boolean).join(" "), "12345 Musterstadt");
  const host = esc(hostname(branding.domain, "shop-domain.de"));
  const mail = text(branding.email, "info@shop-domain.de");
  const register = `${text(branding.registryCourt, "Amtsgericht Musterstadt")} · HRB ${text(branding.commercialRegisterNumber, "00000")}`;
  const vat = text(branding.vatId, "DE000000000");
  const director = text(branding.managingDirector, "Max Mustermann");

  const logo = branding.logoUrl
    ? `<img src="${esc(branding.logoUrl)}" alt="${shop}" width="150" style="display:block;max-width:150px;height:auto;border:0" />`
    : `<div style="font:700 22px/26px Roboto,Arial,sans-serif;color:${TEXT}">${shop}</div>`;

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Bestellbestätigung ${esc(order.orderNumber)}</title></head>
<body style="margin:0;padding:0;background:${SURFACE};font-family:Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Ihre Bestellung ${esc(order.orderNumber)} über ${number.format(order.liters)} Liter ist eingegangen.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid ${LINE};border-radius:10px;overflow:hidden">

<tr><td style="height:4px;background:${GREEN};line-height:4px;font-size:0">&nbsp;</td></tr>

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle">${logo}</td>
  <td align="right" valign="middle" style="font:700 11px/15px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:1px">Bestellbestätigung</td>
</tr></table>`, "22px 32px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td width="33%" align="center" style="font:700 11px/15px Roboto,Arial,sans-serif;color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.6px"><div style="width:26px;height:26px;margin:0 auto 6px;border-radius:13px;background:${GREEN};color:#ffffff;font:700 13px/26px Roboto,Arial,sans-serif">&#10003;</div>Bestellt</td>
  <td width="33%" align="center" style="font:700 11px/15px Roboto,Arial,sans-serif;color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.6px"><div style="width:26px;height:26px;margin:0 auto 6px;border-radius:13px;background:${GREEN_SOFT};border:2px solid ${GREEN};color:${GREEN_DARK};font:700 12px/22px Roboto,Arial,sans-serif">2</div>Bestellprüfung</td>
  <td width="33%" align="center" style="font:700 11px/15px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.6px"><div style="width:26px;height:26px;margin:0 auto 6px;border-radius:13px;background:${SURFACE};color:${MUTED};font:700 13px/26px Roboto,Arial,sans-serif">3</div>Lieferung</td>
</tr></table>`, "18px 32px", SURFACE)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle" style="font:700 15px/21px Roboto,Arial,sans-serif;color:${TEXT}"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:${GREEN};margin-right:8px"></span>Ihre Bestellung wurde aufgenommen</td>
  <td align="right" valign="middle"><span style="display:inline-block;padding:6px 12px;border-radius:6px;background:${SURFACE};font:600 12px/16px Roboto,Arial,sans-serif;color:${MUTED}">Auftragsnr. ${esc(order.orderNumber)}</span></td>
</tr></table>`, "22px 32px 6px")}

${section(`<p style="margin:0 0 12px;font:400 15px/23px Roboto,Arial,sans-serif;color:${TEXT}">${esc(order.salutation)},</p>
<p style="margin:0;font:400 15px/23px Roboto,Arial,sans-serif;color:${TEXT}">vielen Dank für Ihre Heizölbestellung bei <strong>${shop}</strong>. Ihr Auftrag ist erfolgreich bei uns eingegangen und der vereinbarte Preis ist für Sie <strong>garantiert</strong>.</p>`, "6px 32px 22px")}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border-left:4px solid ${GREEN};border-radius:6px"><tr><td style="padding:16px 18px">
  <div style="font:700 10px/14px Roboto,Arial,sans-serif;color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.8px">Nächster Schritt</div>
  <div style="margin-top:4px;font:700 15px/21px Roboto,Arial,sans-serif;color:${TEXT}">Fast geschafft — es kommt noch eine E-Mail</div>
  <div style="margin-top:6px;font:400 13px/20px Roboto,Arial,sans-serif;color:${MUTED}">Ihre Bestellung wird jetzt geprüft. In wenigen Minuten erhalten Sie eine zweite E-Mail zur Bestätigung Ihres Liefertermins — das ist online in einer Minute erledigt. Nur wenn etwas unklar sein sollte, melden wir uns telefonisch unter ${esc(order.phone)}. Sie müssen sonst nichts tun.</div>
</td></tr></table>`, "0 32px 24px")}

${divider()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:8px;overflow:hidden">
  <tr><td colspan="2" style="padding:11px 16px;background:${GREEN};font:700 11px/15px Roboto,Arial,sans-serif;color:#ffffff;text-transform:uppercase;letter-spacing:.8px">Ihre Bestellübersicht</td></tr>
  ${row("Produkt", esc(order.product))}
  ${row("Menge", `${number.format(order.liters)} Liter`)}
  ${row("Preis / 100 L", euro.format(order.pricePer100L))}
  ${row("Zahlungsart", esc(order.paymentMethod))}
  ${row("Liefertermin", esc(order.deliveryWindow))}
  <tr><td style="padding:14px 16px;font:700 14px/20px Roboto,Arial,sans-serif;color:${TEXT}">Gesamtpreis</td><td align="right" style="padding:14px 16px;font:700 19px/24px Roboto,Arial,sans-serif;color:${TEXT}">${euro.format(order.totalPrice)}</td></tr>
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${badge("Festpreis", "Preisgarantie", "Ihr Preis bleibt fest")}
  <td width="10">&nbsp;</td>
  ${badge("★★★★★", "33.000+ Kunden", "4,99 von 5 Sternen")}
  <td width="10">&nbsp;</td>
  ${badge("ab 500 Liter", "Lieferung inklusive", "Deutschlandweit")}
</tr></table>`, "0 32px 26px")}

${divider()}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${addressBox("Rechnungsadresse", order.billingAddress)}
  ${addressBox("Lieferadresse", order.deliveryAddress)}
</tr></table>`)}

${divider()}

${section(`<div style="font:700 10px/14px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.8px;margin-bottom:16px">So geht es weiter</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${step("1", "Bestellung eingegangen", "", false, true)}
  ${step("2", "Bestellprüfung", "Unser Team prüft Ihre Bestellung auf Vollständigkeit.", true, false)}
  ${step("3", "Terminbestätigung (1–3 Werktage)", "Ein Mitarbeiter ruft Sie persönlich an, um Ihren Liefertermin zu bestätigen.", false, false)}
  ${step("4", "Lieferung", "Ihr Heizöl wird zum vereinbarten Termin zuverlässig geliefert.", false, false)}
</table>`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE};border-radius:8px"><tr><td style="padding:16px 18px;font:400 13px/22px Roboto,Arial,sans-serif;color:${TEXT}">
  • Bitte bleiben Sie in den nächsten 1–3 Werktagen <strong>telefonisch erreichbar</strong><br />
  • Stellen Sie sicher, dass am Liefertag <strong>jemand vor Ort ist</strong><br />
  • Bei Fragen antworten Sie einfach auf diese E-Mail
</td></tr></table>`, "0 32px 26px")}

${divider()}

${section(`<div style="font:700 10px/14px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px">Häufige Fragen</div>
${faq("Ist meine Bestellung verbindlich?", "Sie haben ein 14-tägiges Widerrufsrecht. Eine kostenlose Stornierung ist jederzeit vor der Lieferung möglich — antworten Sie einfach auf diese E-Mail.")}
${faq("Wann werde ich kontaktiert?", "Innerhalb von 1–3 Werktagen meldet sich ein Mitarbeiter persönlich bei Ihnen, um Ihren Liefertermin zu bestätigen.")}
${faq("Wer liefert mein Heizöl?", "Wir arbeiten mit erfahrenen, regionalen Lieferpartnern zusammen. Der Fahrer meldet sich ca. 1 Stunde vor Ankunft bei Ihnen.")}
${faq("Was passiert, wenn ich nicht da bin?", "Kein Problem — wir vereinbaren einen neuen Termin. Es entstehen keine zusätzlichen Kosten.")}`)}

${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border:1px solid #BBF7D0;border-radius:8px"><tr><td align="center" style="padding:20px">
  <div style="font:700 10px/14px Roboto,Arial,sans-serif;color:${GREEN_DARK};text-transform:uppercase;letter-spacing:.8px">Fragen?</div>
  <div style="margin-top:5px;font:700 15px/21px Roboto,Arial,sans-serif;color:${TEXT}">Antworten Sie direkt auf diese E-Mail</div>
  <div style="margin-top:3px;font:400 13px/19px Roboto,Arial,sans-serif;color:${MUTED}">oder schreiben Sie an <a href="mailto:${mail}" style="color:${GREEN_DARK};font-weight:600;text-decoration:none">${mail}</a></div>
</td></tr></table>`, "0 32px 24px")}

${section(`<div style="height:2px;width:44px;margin:0 auto 16px;background:${GREEN}"></div>
<div style="text-align:center;font:700 15px/21px Roboto,Arial,sans-serif;color:${TEXT}">Vielen Dank für Ihr Vertrauen.</div>
<div style="text-align:center;margin-top:3px;font:400 13px/19px Roboto,Arial,sans-serif;color:${MUTED}">Ihr Team von ${shop}</div>`, "0 32px 28px")}

${section(`<div style="text-align:center;font:700 10px/14px Roboto,Arial,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:.8px">Über ${shop}</div>
<p style="margin:10px 0 16px;text-align:center;font:400 13px/20px Roboto,Arial,sans-serif;color:${MUTED}">${shop} ist ein Onlineshop der <strong style="color:${TEXT}">${company}</strong> mit Sitz in ${cityLine}. Günstige, zuverlässige Heizöl-Lieferung deutschlandweit.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${badge("Registriert", register, `Geschäftsführer: ${director}`)}
  <td width="10">&nbsp;</td>
  ${badge("USt-IdNr.", vat, "Deutschland")}
  <td width="10">&nbsp;</td>
  ${badge("Bewertungen", "★ 4,99 / 5", "33.000+ Bewertungen")}
</tr></table>
<p style="margin:16px 0 0;text-align:center;font:400 11px/17px Roboto,Arial,sans-serif;color:#9CA3AF">Bei Neukunden kann je nach Zahlungsart eine Teilzahlung vor Lieferung anfallen. Details besprechen wir mit Ihnen persönlich im Bestätigungsgespräch.</p>`, "24px 32px", SURFACE)}

${section(`<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
  <td style="padding:7px 14px;border:1px solid #BBF7D0;border-radius:20px;font:600 12px/16px Roboto,Arial,sans-serif;color:${GREEN_DARK}">&#10003; SSL-verschlüsselt</td>
  <td width="10">&nbsp;</td>
  <td style="padding:7px 14px;border:1px solid ${LINE};border-radius:20px;font:600 12px/16px Roboto,Arial,sans-serif;color:${MUTED}">★ Trusted Shops</td>
</tr></table>`, "20px 32px 8px")}

${section(`<p style="margin:0;text-align:center;font:400 11px/18px Roboto,Arial,sans-serif;color:#9CA3AF">
  ${company} · ${street} · ${cityLine}<br />
  ${register} · USt-IdNr. ${vat}<br />
  E-Mail: <a href="mailto:${mail}" style="color:#9CA3AF;text-decoration:none">${mail}</a> · ${host}
</p>`, "8px 32px 26px")}

</table>
</td></tr></table>
</body></html>`;
}
