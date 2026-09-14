import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { InvoiceModel } from "@/lib/invoice/invoice-data";

const modelSchema = z.object({
  invoiceNumber: z.string().min(1).max(64),
  customerNumber: z.string().min(1).max(32),
  date: z.string().min(1).max(32),
  paymentLabel: z.string().min(1).max(64),
  company: z.object({
    name: z.string().max(200),
    street: z.string().max(200),
    zipCity: z.string().max(200),
    email: z.string().max(200),
    registryCourt: z.string().max(200),
    registerNumber: z.string().max(200),
    vatId: z.string().max(200),
    logoUrl: z.string().url().nullable(),
    shopName: z.string().max(200),
  }),
  recipientLines: z.array(z.string().max(200)).max(8),
  salutation: z.string().max(200),
  deliveryWindow: z.string().max(200),
  deliveryAddressLine: z.string().max(200),
  itemTitle: z.string().max(120),
  itemSubtitle: z.string().max(200),
  quantityLabel: z.string().max(60),
  unitPriceLabel: z.string().max(60),
  lineTotal: z.number(),
  net: z.number(),
  vat: z.number(),
  gross: z.number(),
});

async function requireAdmin(context: {
  supabase: {
    rpc: (
      name: "has_role",
      args: { _user_id: string; _role: "admin" },
    ) => PromiseLike<{ data: boolean | null; error: unknown }>;
  };
  userId: string;
}) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  if (data !== true) throw new Error("Kein Zugriff auf die Rechnungen.");
}

export const renderInvoicePdf = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { model: InvoiceModel }) => z.object({ model: modelSchema }).parse(input))
  .handler(async ({ data, context }): Promise<{ fileName: string; base64: string }> => {
    await requireAdmin(context);
    const { renderInvoicePdfBytes } = await import("@/lib/invoice/invoice-pdf.server");
    const bytes = await renderInvoicePdfBytes(data.model as InvoiceModel);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { fileName: `Rechnung_${data.model.invoiceNumber}.pdf`, base64: btoa(binary) };
  });
