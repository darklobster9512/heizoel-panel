import { writeFile } from "node:fs/promises";
import { buildInvoiceModel, DEMO_INVOICE_ORDER, INVOICE_FALLBACK_BRANDING } from "./src/lib/invoice/invoice-data";
import { renderInvoiceHtml } from "./src/lib/invoice/invoice-html";

async function main() {
  const model = buildInvoiceModel(DEMO_INVOICE_ORDER, INVOICE_FALLBACK_BRANDING);
  const html = renderInvoiceHtml(model);
  await writeFile("/tmp/qa-invoice.html", html);
  console.log("HTML written to /tmp/qa-invoice.html");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
