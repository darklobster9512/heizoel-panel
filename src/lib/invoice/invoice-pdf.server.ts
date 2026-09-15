import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import { euro, type InvoiceModel } from "./invoice-data";

const A4 = { width: 595.28, height: 841.89 };
const M = 46; // Seitenrand
const GREEN = rgb(0.13, 0.77, 0.37);
const GREEN_SOFT = rgb(0.949, 0.988, 0.961);
const GREEN_DARK = rgb(0.082, 0.502, 0.239);
const HEADING = rgb(0.102, 0.122, 0.11);
const TEXT = rgb(0.18, 0.2, 0.185);
const MUTED = rgb(0.541, 0.569, 0.545);
const LINE = rgb(0.898, 0.906, 0.918);

type Ctx = { page: PDFPage; regular: PDFFont; bold: PDFFont };

function draw(ctx: Ctx, value: string, x: number, y: number, size: number, bold = false, color = TEXT) {
  ctx.page.drawText(value.replace(/\u00a0/g, " "), { x, y, size, font: bold ? ctx.bold : ctx.regular, color });
}

function drawRight(ctx: Ctx, value: string, right: number, y: number, size: number, bold = false, color = TEXT) {
  const font = bold ? ctx.bold : ctx.regular;
  const text = value.replace(/\u00a0/g, " ");
  draw(ctx, text, right - font.widthOfTextAtSize(text, size), y, size, bold, color);
}

function drawShopName(ctx: Ctx, shop: string, x: number, y: number, size: number, color = HEADING) {
  const match = shop.match(/^(.*?)(online)(.*)$/i);
  if (!match) {
    draw(ctx, shop, x, y, size, true, color);
    return;
  }
  const prefix = match[1] ?? "";
  const online = match[2] ?? "";
  const suffix = match[3] ?? "";
  let offset = 0;
  if (prefix) {
    const text = prefix.replace(/\u00a0/g, " ");
    draw(ctx, text, x, y, size, true, color);
    offset += ctx.bold.widthOfTextAtSize(text, size);
  }
  if (online) {
    const text = online.replace(/\u00a0/g, " ");
    draw(ctx, text, x + offset, y, size, false, color);
    offset += ctx.regular.widthOfTextAtSize(text, size);
  }
  if (suffix) {
    const text = suffix.replace(/\u00a0/g, " ");
    draw(ctx, text, x + offset, y, size, true, color);
  }
}

async function embedLogo(doc: PDFDocument, url: string | null) {
  if (!url) return null;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    const type = response.headers.get("content-type") ?? "";
    if (type.includes("png")) return await doc.embedPng(bytes);
    if (type.includes("jpeg") || type.includes("jpg")) return await doc.embedJpg(bytes);
    return null;
  } catch {
    return null;
  }
}

export async function renderInvoicePdfBytes(model: InvoiceModel): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([A4.width, A4.height]);
  const ctx: Ctx = {
    page,
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const right = A4.width - M;
  let y = A4.height - M - 18;

  // Kopf
  const logo = await embedLogo(doc, model.company.logoUrl);
  if (logo) {
    const scale = Math.min(150 / logo.width, 44 / logo.height);
    page.drawImage(logo, { x: M, y: y - logo.height * scale + 18, width: logo.width * scale, height: logo.height * scale });
  } else {
    page.drawRectangle({ x: M, y: y - 4, width: 5, height: 8, color: rgb(1, 0.808, 0) });
    page.drawRectangle({ x: M, y: y + 4, width: 5, height: 8, color: rgb(0.867, 0, 0) });
    page.drawRectangle({ x: M, y: y + 12, width: 5, height: 8, color: rgb(0, 0, 0) });
    draw(ctx, model.company.shopName, M + 12, y + 2, 17, true, HEADING);
  }

  drawRight(ctx, model.company.name, right, y + 14, 8.5, true, HEADING);
  drawRight(ctx, model.company.street, right, y + 3, 8, false, MUTED);
  drawRight(ctx, model.company.zipCity, right, y - 8, 8, false, MUTED);
  drawRight(ctx, model.company.email, right, y - 19, 8, false, MUTED);

  y -= 64;
  page.drawRectangle({ x: M, y, width: right - M, height: 1.6, color: GREEN });

  // Empfänger + Infoblock
  y -= 26;
  draw(ctx, `${model.company.name} · ${model.company.street}, ${model.company.zipCity}`, M, y, 6.5, false, MUTED);
  page.drawRectangle({ x: M, y: y - 5, width: 220, height: 0.6, color: LINE });

  let ry = y - 20;
  model.recipientLines.forEach((line, index) => {
    if (index === 1) {
      draw(ctx, line, M, ry, 12.5, true, HEADING);
      ry -= 18;
    } else {
      draw(ctx, line, M, ry, index === 0 ? 9 : 10, false, TEXT);
      ry -= index === 0 ? 14 : 15;
    }
  });

  let iy = y - 20;
  const info: [string, string][] = [
    ["Rechnungs-Nr.", model.invoiceNumber],
    ["Kunden-Nr.", model.customerNumber],
    ["Datum", model.date],
    ["Zahlungsart", model.paymentLabel],
  ];
  for (const [label, value] of info) {
    drawRight(ctx, label, right - 96, iy, 8, false, MUTED);
    drawRight(ctx, value, right, iy, 8.5, true, HEADING);
    iy -= 14;
  }

  // Titel + Anschreiben
  y = Math.min(ry, iy) - 34;
  draw(ctx, "Rechnung", M, y, 15, true, HEADING);
  draw(ctx, `Nr. ${model.invoiceNumber}`, M + ctx.bold.widthOfTextAtSize("Rechnung", 15) + 7, y + 1, 10, false, MUTED);

  y -= 24;
  const restText =
    model.paymentLabel === "EC-Karte" ? "bei Lieferung vor Ort per EC-Karte" : "bei Lieferung vor Ort in bar";
  const paragraphs = [
    `${model.salutation},`,
    "vielen Dank für Ihre Bestellung. Mit der Vorauszahlung sichern Sie sich den heutigen Tagespreis.",
    ...(model.bank.isDeposit
      ? [
          `Wir bitten um eine Anzahlung von 50 % (${model.bank.amount}) unter Angabe der Rechnungsnummer`,
          `${model.invoiceNumber} auf das unten genannte Konto (IBAN ${model.bank.iban}).`,
          `Den Restbetrag von ${model.bank.remaining ?? ""} zahlen Sie ${restText}.`,
        ]
      : [
          `Bitte überweisen Sie den Gesamtbetrag von ${model.bank.amount} unter Angabe der`,
          `Rechnungsnummer ${model.invoiceNumber} auf das unten genannte Konto (IBAN ${model.bank.iban}).`,
        ]),
  ];
  for (const line of paragraphs) {
    draw(ctx, line, M, y, 9.5, false, TEXT);
    y -= line.endsWith(",") ? 20 : 14;
  }

  // Liefertermin
  y -= 14;
  const boxHeight = 56;
  page.drawRectangle({ x: M, y: y - boxHeight, width: right - M, height: boxHeight, color: GREEN_SOFT });
  page.drawRectangle({ x: M, y: y - boxHeight, width: 2.5, height: boxHeight, color: GREEN });
  draw(ctx, "BESTÄTIGTER LIEFERTERMIN", M + 12, y - 16, 7, true, GREEN_DARK);
  draw(ctx, model.deliveryWindow, M + 12, y - 32, 11, true, HEADING);
  draw(ctx, `Lieferadresse: ${model.deliveryAddressLine} · Menge: ${model.quantityLabel} ${model.itemTitle}`, M + 12, y - 46, 8, false, TEXT);
  y -= boxHeight + 34;

  // Positionstabelle
  const colQty = right - 236;
  const colUnit = right - 118;
  page.drawRectangle({ x: M, y: y - 7, width: right - M, height: 0.6, color: LINE });
  draw(ctx, "POS.", M, y, 7, true, MUTED);
  draw(ctx, "BESCHREIBUNG", M + 36, y, 7, true, MUTED);
  drawRight(ctx, "MENGE", colQty, y, 7, true, MUTED);
  drawRight(ctx, "EINZELPREIS", colUnit, y, 7, true, MUTED);
  drawRight(ctx, "GESAMT", right, y, 7, true, MUTED);

  y -= 24;
  draw(ctx, "1", M, y, 9.5, false, TEXT);
  draw(ctx, model.itemTitle, M + 36, y, 10, true, HEADING);
  draw(ctx, model.itemSubtitle, M + 36, y - 12, 7.5, false, MUTED);
  drawRight(ctx, model.quantityLabel, colQty, y, 9.5, true, HEADING);
  drawRight(ctx, model.unitPriceLabel, colUnit, y, 9.5, false, TEXT);
  drawRight(ctx, euro.format(model.lineTotal), right, y, 9.5, true, HEADING);
  y -= 24;
  page.drawRectangle({ x: M, y, width: right - M, height: 0.6, color: LINE });

  // Summen
  y -= 22;
  drawRight(ctx, "Nettobetrag", right - 118, y, 9, false, TEXT);
  drawRight(ctx, euro.format(model.net), right, y, 9, true, HEADING);
  y -= 15;
  drawRight(ctx, "zzgl. 19 % MwSt.", right - 118, y, 9, false, TEXT);
  drawRight(ctx, euro.format(model.vat), right, y, 9, true, HEADING);
  y -= 12;
  page.drawRectangle({ x: right - 118, y, width: 118, height: 0.6, color: LINE });
  y -= 16;
  drawRight(ctx, "Gesamtbetrag inkl. MwSt.", right - 118, y, 11, true, HEADING);
  drawRight(ctx, euro.format(model.gross), right, y, 11.5, true, HEADING);

  // Zahlungsdaten
  y -= 26;
  const bankHeight = model.bank.isDeposit ? 92 : 78;
  page.drawRectangle({ x: M, y: y - bankHeight, width: right - M, height: bankHeight, color: GREEN_SOFT });
  page.drawRectangle({ x: M, y: y - bankHeight, width: 2.5, height: bankHeight, color: GREEN });
  draw(
    ctx,
    model.bank.isDeposit
      ? "ZAHLUNGSDATEN · 50 % ANZAHLUNG AUF FOLGENDES KONTO"
      : "ZAHLUNGSDATEN · BITTE ÜBERWEISEN SIE AUF FOLGENDES KONTO",
    M + 12,
    y - 16,
    7,
    true,
    GREEN_DARK,
  );
  const bankCols: [string, string, number][] = [
    ["Empfänger", model.bank.accountHolder, M + 12],
    ["Bank", model.bank.bankName, M + 150],
    ["IBAN", model.bank.iban, M + 270],
    ["BIC", model.bank.bic, M + 430],
  ];
  for (const [label, value, x] of bankCols) {
    draw(ctx, label, x, y - 34, 7, false, MUTED);
    draw(ctx, value, x, y - 47, 9, true, HEADING);
  }
  page.drawRectangle({ x: M + 12, y: y - 56, width: right - M - 24, height: 0.6, color: GREEN });
  draw(ctx, `Verwendungszweck: ${model.bank.reference}`, M + 12, y - 70, 8.5, false, TEXT);
  drawRight(ctx, model.bank.amount, right - 12, y - 70, 11, true, GREEN_DARK);
  if (model.bank.isDeposit) {
    drawRight(ctx, "Anzahlung (50 %)", right - 12, y - 81, 6.5, false, MUTED);
    draw(ctx, model.bank.note ?? "", M + 12, y - 84, 8, false, GREEN_DARK);
  }
  y -= bankHeight;

  // Fußzeile
  const fy = M + 52;
  page.drawRectangle({ x: M, y: fy, width: right - M, height: 0.6, color: LINE });
  const cols: [number, string[]][] = [
    [M, [model.company.name, model.company.street, model.company.zipCity, model.company.email]],
    [M + 165, ["Handelsregister", model.company.registryCourt, model.company.registerNumber, `USt-IdNr. ${model.company.vatId}`]],
    [M + 330, ["Zahlung", model.bank.accountHolder, model.bank.bankName, `IBAN ${model.bank.iban}`]],
  ];
  for (const [x, lines] of cols) {
    let cy = fy - 12;
    lines.forEach((line, index) => {
      draw(ctx, line, x, cy, index === 0 ? 7 : 6.5, index === 0, index === 0 ? HEADING : MUTED);
      cy -= 10;
    });
  }

  return await doc.save();
}
