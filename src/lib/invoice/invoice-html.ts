import { euro, type InvoiceModel } from "./invoice-data";

const GREEN = "#22C55E";
const GREEN_SOFT = "#F2FCF5";
const GREEN_DARK = "#15803D";
const TEXT = "#2E332F";
const HEADING = "#1A1F1C";
const MUTED = "#8A918B";
const LINE = "#E5E7EB";
const FONT = "Roboto,Helvetica,Arial,sans-serif";

function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shopNameLogo(shop: string) {
  const match = shop.match(/^(.*?)(online)(.*)$/i);
  if (!match) return esc(shop);
  const prefix = match[1] ?? "";
  const online = match[2] ?? "";
  const suffix = match[3] ?? "";
  return `${esc(prefix)}<span style="font-weight:300">${esc(online)}</span>${esc(suffix)}`;
}

function logo(model: InvoiceModel) {
  if (model.company.logoUrl) {
    return `<img src="${esc(model.company.logoUrl)}" alt="${esc(model.company.shopName)}" style="max-height:52px;max-width:190px;display:block" />`;
  }
  return `<div style="display:flex;align-items:center;gap:9px">
    <span style="display:block;width:7px;height:34px;background:linear-gradient(to bottom,#000 0 33.3%,#DD0000 33.3% 66.6%,#FFCE00 66.6% 100%)"></span>
    <span style="font:700 24px/26px ${FONT};letter-spacing:-.5px;color:${HEADING}">${shopNameLogo(model.company.shopName)}</span>
  </div>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:2px 12px 2px 0;text-align:right;font:400 10px/16px ${FONT};color:${MUTED}">${esc(label)}</td>
    <td style="padding:2px 0;text-align:right;font:700 10px/16px ${FONT};color:${HEADING};white-space:nowrap">${esc(value)}</td>
  </tr>`;
}

function sumRow(label: string, value: string, strong: boolean) {
  return `<tr>
    <td style="padding:${strong ? "9px" : "4px"} 12px 4px 0;text-align:right;font:${strong ? "700 12px/18px" : "400 10.5px/16px"} ${FONT};color:${strong ? HEADING : TEXT}">${esc(label)}</td>
    <td style="padding:${strong ? "9px" : "4px"} 0 4px;text-align:right;width:110px;font:700 ${strong ? "13px/18px" : "10.5px/16px"} ${FONT};color:${HEADING};${strong ? `border-top:1px solid ${LINE}` : ""}">${esc(value)}</td>
  </tr>`;
}

export function renderInvoiceHtml(model: InvoiceModel) {
  const recipient = model.recipientLines
    .map((line, index) =>
      index === 0
        ? `<div style="font:400 11px/17px ${FONT};color:${TEXT}">${esc(line)}</div>`
        : index === 1
          ? `<div style="font:700 15px/22px ${FONT};color:${HEADING}">${esc(line)}</div>`
          : `<div style="font:400 12px/19px ${FONT};color:${TEXT}">${esc(line)}</div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" />
<title>Rechnung ${esc(model.invoiceNumber)}</title>
<style>
  @page { size: A4; margin: 0; }
  html,body { margin:0; padding:0; background:#eef0ee; }
  .page { width:210mm; min-height:297mm; background:#ffffff; margin:0 auto; padding:18mm 16mm 14mm; box-sizing:border-box; display:flex; flex-direction:column; font-family:${FONT}; color:${TEXT}; }
  @media print { html,body { background:#fff; } .page { margin:0; box-shadow:none; } }
</style></head>
<body><div class="page">

  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:24px">
    <div>${logo(model)}</div>
    <div style="text-align:right;font:400 10px/16px ${FONT};color:${MUTED}">
      <div style="font:700 11px/17px ${FONT};color:${HEADING}">${esc(model.company.name)}</div>
      <div>${esc(model.company.street)}</div>
      <div>${esc(model.company.zipCity)}</div>
      <div>${esc(model.company.email)}</div>
    </div>
  </div>

  <div style="margin-top:16mm;height:2px;background:${GREEN}"></div>

  <div style="margin-top:6mm;display:flex;justify-content:space-between;gap:24px;align-items:flex-start">
    <div style="flex:1;min-width:0">
      <div style="font:400 8px/12px ${FONT};color:${MUTED};border-bottom:1px solid ${LINE};padding-bottom:4px;margin-bottom:10px">${esc(model.company.name)} · ${esc(model.company.street)}, ${esc(model.company.zipCity)}</div>
      ${recipient}
    </div>
    <table style="border-collapse:collapse">${infoRow("Rechnungs-Nr.", model.invoiceNumber)}${infoRow("Kunden-Nr.", model.customerNumber)}${infoRow("Datum", model.date)}${infoRow("Zahlungsart", model.paymentLabel)}</table>
  </div>

  <div style="margin-top:16mm">
    <div style="font:700 17px/24px ${FONT};color:${HEADING}">Rechnung <span style="font:400 12px/24px ${FONT};color:${MUTED}">Nr. ${esc(model.invoiceNumber)}</span></div>
    <p style="margin:10px 0 0;font:400 11.5px/19px ${FONT};color:${TEXT}">${esc(model.salutation)},</p>
    <p style="margin:8px 0 0;font:400 11.5px/19px ${FONT};color:${TEXT}">${model.bank.isDeposit ? "Vielen Dank für Ihre Bestellung. Mit der erforderlichen Anzahlung von 50 % sichern Sie sich den vereinbarten Tagespreis." : "Vielen Dank für Ihre Bestellung. Mit der Vorauszahlung sichern Sie sich den vereinbarten Tagespreis."}</p>
    ${
      model.bank.isDeposit
        ? `<p style="margin:8px 0 0;font:400 11.5px/19px ${FONT};color:${TEXT}">Zur Sicherung des Tagespreises ist eine Anzahlung von 50 % (<strong>${esc(model.bank.amount)}</strong>) erforderlich. Bitte überweisen Sie diese unter Angabe der Rechnungsnummer <strong>${esc(model.invoiceNumber)}</strong> auf das unten genannte Konto (IBAN ${esc(model.bank.iban)}). Den Restbetrag von <strong>${esc(model.bank.remaining ?? "")}</strong> zahlen Sie ${model.paymentLabel === "EC-Karte" ? "bei Lieferung vor Ort per EC-Karte" : "bei Lieferung vor Ort in bar"}.</p>`
        : `<p style="margin:8px 0 0;font:400 11.5px/19px ${FONT};color:${TEXT}">Bitte überweisen Sie den Gesamtbetrag von <strong>${esc(model.bank.amount)}</strong> unter Angabe der Rechnungsnummer <strong>${esc(model.invoiceNumber)}</strong> auf das unten genannte Konto (IBAN ${esc(model.bank.iban)}).</p>`
    }
  </div>

  <div style="margin-top:7mm;background:${GREEN_SOFT};border-left:3px solid ${GREEN};padding:12px 14px">
    <div style="font:700 8.5px/13px ${FONT};color:${GREEN_DARK};letter-spacing:.8px;text-transform:uppercase">Bestätigter Liefertermin</div>
    <div style="margin-top:4px;font:700 13px/19px ${FONT};color:${HEADING}">${esc(model.deliveryWindow)}</div>
    <div style="margin-top:3px;font:400 10px/16px ${FONT};color:${TEXT}">Lieferadresse: ${esc(model.deliveryAddressLine)} · Menge: ${esc(model.quantityLabel)} ${esc(model.itemTitle)}</div>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-top:8mm">
    <tr style="border-bottom:1px solid ${LINE}">
      <th style="text-align:left;padding:0 0 7px;font:700 8.5px/13px ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase;width:40px">Pos.</th>
      <th style="text-align:left;padding:0 0 7px;font:700 8.5px/13px ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase">Beschreibung</th>
      <th style="text-align:right;padding:0 0 7px;font:700 8.5px/13px ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase">Menge</th>
      <th style="text-align:right;padding:0 0 7px;font:700 8.5px/13px ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase">Einzelpreis</th>
      <th style="text-align:right;padding:0 0 7px;font:700 8.5px/13px ${FONT};color:${MUTED};letter-spacing:.8px;text-transform:uppercase">Gesamt</th>
    </tr>
    <tr style="border-bottom:1px solid ${LINE}">
      <td style="padding:12px 0;vertical-align:top;font:400 11px/17px ${FONT};color:${TEXT}">1</td>
      <td style="padding:12px 0;vertical-align:top">
        <div style="font:700 11.5px/17px ${FONT};color:${HEADING}">${esc(model.itemTitle)}</div>
        <div style="margin-top:3px;font:400 9px/14px ${FONT};color:${MUTED}">${esc(model.itemSubtitle)}</div>
      </td>
      <td style="padding:12px 0;text-align:right;vertical-align:top;font:700 11px/17px ${FONT};color:${HEADING};white-space:nowrap">${esc(model.quantityLabel)}</td>
      <td style="padding:12px 0 12px 16px;text-align:right;vertical-align:top;font:400 11px/17px ${FONT};color:${TEXT};white-space:nowrap">${esc(model.unitPriceLabel)}</td>
      <td style="padding:12px 0 12px 16px;text-align:right;vertical-align:top;font:700 11px/17px ${FONT};color:${HEADING};white-space:nowrap">${esc(euro.format(model.lineTotal))}</td>
    </tr>
  </table>

  <table style="border-collapse:collapse;margin:5mm 0 0 auto">
    ${sumRow("Nettobetrag", euro.format(model.net), false)}
    ${sumRow("zzgl. 19 % MwSt.", euro.format(model.vat), false)}
    ${sumRow("Gesamtbetrag inkl. MwSt.", euro.format(model.gross), true)}
  </table>

  <div style="margin-top:7mm;background:${GREEN_SOFT};border-left:3px solid ${GREEN};padding:12px 14px">
    <div style="font:700 8.5px/13px ${FONT};color:${GREEN_DARK};letter-spacing:.8px;text-transform:uppercase">${model.bank.isDeposit ? "Zahlungsdaten · 50 % Anzahlung zur Sicherung des Tagespreises" : "Zahlungsdaten · Bitte überweisen Sie auf folgendes Konto"}</div>
    <div style="margin-top:8px;display:flex;gap:24px">
      <div style="flex:1">
        <div style="font:400 8.5px/13px ${FONT};color:${MUTED}">Empfänger</div>
        <div style="font:700 11px/17px ${FONT};color:${HEADING}">${esc(model.bank.accountHolder)}</div>
      </div>
      <div style="flex:1">
        <div style="font:400 8.5px/13px ${FONT};color:${MUTED}">Bank</div>
        <div style="font:700 11px/17px ${FONT};color:${HEADING}">${esc(model.bank.bankName)}</div>
      </div>
      <div style="flex:1.4">
        <div style="font:400 8.5px/13px ${FONT};color:${MUTED}">IBAN</div>
        <div style="font:700 11px/17px ${FONT};color:${HEADING}">${esc(model.bank.iban)}</div>
      </div>
      <div style="flex:1">
        <div style="font:400 8.5px/13px ${FONT};color:${MUTED}">BIC</div>
        <div style="font:700 11px/17px ${FONT};color:${HEADING}">${esc(model.bank.bic)}</div>
      </div>
    </div>
    <div style="margin-top:9px;padding-top:8px;border-top:1px solid ${GREEN}33;display:flex;justify-content:space-between;align-items:center">
      <div style="font:400 10px/16px ${FONT};color:${TEXT}">Verwendungszweck: <strong>${esc(model.bank.reference)}</strong></div>
      <div style="text-align:right">
        <div style="font:700 13px/19px ${FONT};color:${GREEN_DARK}">${esc(model.bank.amount)}</div>
        ${model.bank.isDeposit ? `<div style="font:400 8.5px/13px ${FONT};color:${MUTED}">Anzahlung (50 %)</div>` : ""}
      </div>
    </div>
    ${model.bank.note ? `<div style="margin-top:6px;font:400 9.5px/15px ${FONT};color:${GREEN_DARK}">${esc(model.bank.note)}</div>` : ""}
  </div>

  <div style="flex:1"></div>

  <div style="border-top:1px solid ${LINE};padding-top:9px;display:flex;gap:18px">
    <div style="flex:1;font:400 8px/13px ${FONT};color:${MUTED}">
      <div style="font:700 8.5px/13px ${FONT};color:${HEADING}">${esc(model.company.name)}</div>
      <div>${esc(model.company.street)}</div><div>${esc(model.company.zipCity)}</div><div>${esc(model.company.email)}</div>
    </div>
    <div style="flex:1;font:400 8px/13px ${FONT};color:${MUTED}">
      <div style="font:700 8.5px/13px ${FONT};color:${HEADING}">Handelsregister</div>
      <div>${esc(model.company.registryCourt)}</div><div>${esc(model.company.registerNumber)}</div><div>USt-IdNr. ${esc(model.company.vatId)}</div><div>Geschäftsführer: ${esc(model.company.director)}</div>
    </div>
    <div style="flex:1;font:400 8px/13px ${FONT};color:${MUTED}">
      <div style="font:700 8.5px/13px ${FONT};color:${HEADING}">Zahlung</div>
      <div>${esc(model.bank.accountHolder)}</div><div>${esc(model.bank.bankName)}</div><div>IBAN ${esc(model.bank.iban)}</div>
    </div>
  </div>

</div></body></html>`;
}
