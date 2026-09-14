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
  accountHolder: string | null;
  iban: string | null;
  bankName: string | null;
  bic: string | null;
};

export const GREEN = "#22C55E";
export const GREEN_DARK = "#15803D";
export const GREEN_SOFT = "#F2FCF5";
export const GREEN_BORDER = "#BBF7D0";
export const GOLD = "#F59E0B";
export const BLACK = "#000000";
export const RED = "#DD0000";
export const GERMAN_GOLD = "#FFCE00";
export const TEXT = "#2E332F";
export const HEADING = "#1A1F1C";
export const MUTED = "#8A918B";
export const LINE = "#E5E7EB";
export const SURFACE = "#F7F8F7";
export const FONT = "Roboto,Helvetica,Arial,sans-serif";

export const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
export const number = new Intl.NumberFormat("de-DE");

export function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function text(value: string | null, fallback: string) {
  return esc((value ?? "").trim() || fallback);
}

export function hostname(domain: string | null, fallback: string) {
  if (!domain) return fallback;
  try {
    return new URL(domain.includes("://") ? domain : `https://${domain}`).hostname.replace(/^www\./, "");
  } catch {
    return domain;
  }
}

export function stars(size: number, color = GOLD) {
  return `<span style="font:700 ${size}px/${size + 4}px ${FONT};color:${color};letter-spacing:2px">&#9733;&#9733;&#9733;&#9733;&#9733;</span>`;
}

export function flagBar(big: boolean) {
  const w = big ? 14 : 12;
  const h1 = big ? 19 : 16;
  const h2 = big ? 20 : 16;
  const h3 = big ? 19 : 16;
  return `<div style="width:${w}px;height:${big ? 58 : 48}px;border-radius:3px;overflow:hidden;font-size:0;line-height:0">
    <div style="width:${w}px;height:${h1}px;background:${BLACK};font-size:0;line-height:0">&nbsp;</div>
    <div style="width:${w}px;height:${h2}px;background:${RED};font-size:0;line-height:0">&nbsp;</div>
    <div style="width:${w}px;height:${h3}px;background:${GERMAN_GOLD};font-size:0;line-height:0">&nbsp;</div>
  </div>`;
}

export function logoBlock(branding: EmailBranding, shop: string, big: boolean) {
  if (branding.logoUrl) {
    return `<img src="${esc(branding.logoUrl)}" alt="${shop}" width="${big ? 210 : 180}" style="display:block;max-width:${big ? 210 : 180}px;height:auto;border:0" />`;
  }
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td valign="middle" style="padding-right:12px">${flagBar(big)}</td>
    <td valign="middle">
      <div style="font:700 ${big ? 34 : 28}px/${big ? 36 : 30}px ${FONT};color:${HEADING};letter-spacing:-.5px;text-transform:uppercase">${shop}</div>
      <div style="margin-top:4px">${stars(big ? 17 : 15)} <span style="font:700 ${big ? 17 : 15}px/20px ${FONT};color:${HEADING}">4,9</span></div>
    </td>
  </tr></table>`;
}

export function section(inner: string, padding = "26px 32px", background = "#ffffff") {
  return `<tr><td style="padding:${padding};background:${background}">${inner}</td></tr>`;
}

export function divider() {
  return `<tr><td style="padding:0 32px"><div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div></td></tr>`;
}

export function progressCell(circle: string, label: string, state: "done" | "active" | "todo") {
  const bg = state === "done" ? GREEN : state === "active" ? "#FFFFFF" : "#E8EAE9";
  const color = state === "done" ? "#ffffff" : state === "active" ? GREEN_DARK : MUTED;
  const border = state === "active" ? `2px solid ${GREEN}` : "0";
  const labelColor = state === "todo" ? MUTED : GREEN_DARK;
  return `<td width="33%" align="center" valign="top">
    <div style="width:26px;height:26px;margin:0 auto 7px;border-radius:13px;background:${bg};border:${border};color:${color};font:700 12px/${state === "active" ? 22 : 26}px ${FONT};text-align:center">${circle}</div>
    <div style="font:700 10px/14px ${FONT};color:${labelColor};text-transform:uppercase;letter-spacing:.8px">${label}</div>
  </td>`;
}

export function orderRow(label: string, value: string, zebra: boolean) {
  return `<tr>
    <td width="42%" style="padding:12px 16px;background:${zebra ? SURFACE : "#ffffff"};border-bottom:1px solid ${LINE};font:400 13px/18px ${FONT};color:${MUTED}">${label}</td>
    <td style="padding:12px 16px;background:${zebra ? SURFACE : "#ffffff"};border-bottom:1px solid ${LINE};font:700 13px/18px ${FONT};color:${HEADING}">${value}</td>
  </tr>`;
}

export function trustCell(top: string, middle: string, bottom: string, borderLeft: boolean) {
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

export function addressBox(title: string, lines: string[], first: boolean) {
  return `<td width="50%" valign="top" style="padding-${first ? "right" : "left"}:9px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px">
      <tr><td style="padding:10px 14px;background:${SURFACE};border-bottom:1px solid ${LINE};font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">${title}</td></tr>
      <tr><td style="padding:14px;font:400 14px/22px ${FONT};color:${TEXT}">${lines.map((line) => esc(line)).join("<br />")}</td></tr>
    </table>
  </td>`;
}

export function stepRow(circle: string, title: string, body: string, state: "done" | "active" | "todo", last: boolean) {
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

export function faq(question: string, answer: string, last: boolean) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${last ? "" : "margin-bottom:10px;"}border:1px solid ${LINE};border-radius:6px">
    <tr><td style="padding:13px 16px">
      <div style="font:700 14px/19px ${FONT};color:${HEADING}">${question}</div>
      <div style="margin-top:3px;font:400 13px/20px ${FONT};color:${MUTED}">${answer}</div>
    </td></tr>
  </table>`;
}

export type ResolvedBranding = {
  shop: string;
  company: string;
  street: string;
  cityLine: string;
  host: string;
  mail: string;
  register: string;
  vat: string;
  director: string;
};

export function resolveBranding(branding: EmailBranding): ResolvedBranding {
  return {
    shop: text(branding.shopName, "Heizöl Online"),
    company: text(branding.companyName, "Muster-Energie GmbH"),
    street: text(branding.streetAddress, "Musterstraße 1"),
    cityLine: text([branding.postalCode, branding.city].filter(Boolean).join(" "), "12345 Musterstadt"),
    host: esc(hostname(branding.domain, "shop-domain.de")),
    mail: text(branding.email, "info@shop-domain.de"),
    register: `${text(branding.registryCourt, "Amtsgericht Musterstadt")} · HRB ${text(branding.commercialRegisterNumber, "00000")}`,
    vat: text(branding.vatId, "DE000000000"),
    director: text(branding.managingDirector, "Max Mustermann"),
  };
}

/** Äußere E-Mail-Hülle: Doctype, Hintergrund, 640-px-Karte, grüne Top-Linie. */
export function emailShell(title: string, previewText: string, content: string) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${title}</title></head>
<body style="margin:0;padding:0;background:${SURFACE};font-family:${FONT};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${previewText}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SURFACE}">
<tr><td align="center" style="padding:22px 12px">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid ${LINE};border-radius:8px;overflow:hidden">

<tr><td style="height:4px;background:${GREEN};line-height:4px;font-size:0">&nbsp;</td></tr>

${content}

</table>
</td></tr></table>
</body></html>`;
}

/** Gemeinsamer Kopf: Logo links, Dokument-Label rechts, darunter die Akzentlinie. */
export function emailHeader(branding: EmailBranding, resolved: ResolvedBranding, label: string) {
  return `${section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td valign="middle">${logoBlock(branding, resolved.shop, false)}</td>
  <td align="right" valign="middle" style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:1.2px">${label}</td>
</tr></table>`, "22px 32px")}

<tr><td style="height:2px;background:${GREEN};line-height:2px;font-size:0">&nbsp;</td></tr>`;
}

/** Gemeinsamer Vertrauensbalken. */
export function trustBar() {
  return section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:6px"><tr>
  ${trustCell("Festpreis", "Preisgarantie", "Ihr Preis bleibt fest", false)}
  ${trustCell(stars(13), "25.000+ Kunden", "4,9 von 5 Sternen", true)}
  ${trustCell("ab 1500 Liter", "Lieferung inklusive", "Deutschlandweit", true)}
</tr></table>`, "0 32px 26px");
}

/** Gemeinsamer Kontakt-Kasten „Fragen?". */
export function contactBox(mail: string) {
  return section(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GREEN_SOFT};border:1px solid ${GREEN_BORDER};border-radius:6px"><tr><td align="center" style="padding:20px">
  <div style="font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Fragen?</div>
  <div style="margin-top:6px;font:700 15px/21px ${FONT};color:${HEADING}">Antworten Sie direkt auf diese E-Mail</div>
  <div style="margin-top:3px;font:400 13px/19px ${FONT};color:${MUTED}">oder schreiben Sie an <a href="mailto:${mail}" style="color:${GREEN_DARK};font-weight:700;text-decoration:none">${mail}</a></div>
</td></tr></table>`, "0 32px 26px");
}

/** Gemeinsamer Fuß: Dank, Über-Block, Siegel, Bewertung, Logo, Firmenangaben. */
export function emailFooter(branding: EmailBranding, r: ResolvedBranding) {
  return `${section(`<div style="height:2px;width:48px;margin:0 auto 16px;background:${GREEN};font-size:0;line-height:0">&nbsp;</div>
<div style="text-align:center;font:700 15px/21px ${FONT};color:${HEADING}">Vielen Dank für Ihr Vertrauen.</div>
<div style="text-align:center;margin-top:3px;font:400 13px/19px ${FONT};color:${MUTED}">Ihr Team von ${r.shop}</div>`, "0 32px 28px")}

${section(`<div style="text-align:center;font:700 10px/14px ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.9px">Über ${r.shop}</div>
<p style="margin:10px 0 16px;text-align:center;font:400 13px/21px ${FONT};color:${MUTED}">${r.shop} ist ein Onlineshop der <strong style="color:${HEADING}">${r.company}</strong> mit Sitz in ${r.cityLine}.<br />Günstige, zuverlässige Heizöl-Lieferung deutschlandweit.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  ${infoChip("Registriert", r.register)}
  ${infoChip("USt-IdNr.", r.vat)}
  ${infoChip("Bewertungen", `${stars(11)} 4,9 / 5`)}
</tr></table>
<p style="margin:16px 0 18px;text-align:center;font:400 11px/18px ${FONT};color:#A3A9A4">Bei Neukunden kann je nach Zahlungsart eine Teilzahlung vor Lieferung anfallen. Details besprechen wir mit Ihnen persönlich im Bestätigungsgespräch.</p>
<table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
  <td style="padding:7px 14px;border:1px solid ${GREEN_BORDER};border-radius:20px;background:#ffffff;font:700 12px/16px ${FONT};color:${GREEN_DARK}">&#10003; SSL-verschlüsselt</td>
  <td width="10">&nbsp;</td>
  <td style="padding:7px 14px;border:1px solid ${LINE};border-radius:20px;background:#ffffff;font:700 12px/16px ${FONT};color:${MUTED}">&#9733; Trusted Shops</td>
</tr></table>
<p style="margin:14px 0 0;text-align:center;font:400 12px/17px ${FONT};color:${MUTED}">${stars(12)} <strong style="color:${HEADING}">4,9 / 5</strong> — 25.000+ Bewertungen</p>`, "24px 32px", SURFACE)}

${section(`<div style="text-align:center">
  <table role="presentation" cellpadding="0" cellspacing="0" align="center"><tr><td>${logoBlock(branding, r.shop, true)}</td></tr></table>
  <p style="margin:12px 0 0;font:400 12px/18px ${FONT};color:${MUTED}">Heizöl günstig bestellen · Tagesaktuelle Preise, deutschlandweite Lieferung.</p>
</div>`, "24px 32px 20px")}

${divider()}

${section(`<p style="margin:0;text-align:center;font:400 11px/19px ${FONT};color:#A3A9A4">
  <strong style="color:${MUTED}">${r.company}</strong> · ${r.street} · ${r.cityLine}<br />
  ${r.register} · USt-IdNr. ${r.vat} · Geschäftsführer: ${r.director}<br />
  E-Mail: <a href="mailto:${r.mail}" style="color:#A3A9A4;text-decoration:none">${r.mail}</a> · ${r.host}
</p>`, "18px 32px 26px")}`;
}
