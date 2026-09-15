import { writeFile } from "node:fs/promises";
import { buildInvoiceModel, DEMO_INVOICE_ORDER, INVOICE_FALLBACK_BRANDING } from "./src/lib/invoice/invoice-data";
import { renderInvoicePdfBytes } from "./src/lib/invoice/invoice-pdf.server";

async function main() {
  const model = buildInvoiceModel(DEMO_INVOICE_ORDER, INVOICE_FALLBACK_BRANDING);
  const bytes = await renderInvoicePdfBytes(model);
  await writeFile("/tmp/qa-invoice.pdf", bytes);
  console.log("PDF written to /tmp/qa-invoice.pdf");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
