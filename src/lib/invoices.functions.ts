import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  buildInvoiceModel,
  INVOICE_FALLBACK_BRANDING,
  type InvoiceBranding,
  type InvoiceModel,
} from "@/lib/invoice/invoice-data";
import type { Order, OrderAddress } from "@/lib/orders.functions";

export type InvoiceRecord = {
  id: string;
  orderId: string;
  orderNumber: string;
  invoiceNumber: string;
  amount: number;
  customer: string;
  brandingName: string | null;
  bankAccountName: string | null;
  bankIban: string | null;
  createdAt: string;
};

export type BankAccountUsage = {
  id: string;
  name: string;
  iban: string;
  bic: string;
  bankName: string;
  limitAmount: number;
  usedAmount: number;
  invoiceCount: number;
};

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

const num = (value: unknown): number => (typeof value === "number" ? value : Number(value ?? 0) || 0);
const text = (value: unknown): string | null => (typeof value === "string" && value ? value : null);
const address = (value: unknown): OrderAddress =>
  value && typeof value === "object" ? (value as OrderAddress) : {};

function customerFrom(delivery: OrderAddress, billing: OrderAddress | null, email: string) {
  const a = billing ?? delivery;
  return [a.firstName, a.lastName].filter(Boolean).join(" ").trim() || (a.company ?? "").trim() || email;
}

export const listInvoices = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<InvoiceRecord[]> => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("invoices")
      .select(
        "id, order_id, invoice_number, amount, created_at, orders(order_number, email, delivery_address, billing_address), brandings(shop_name, company_name), bank_accounts(name, iban)",
      )
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error("Rechnungen konnten nicht geladen werden.");
    return (data ?? []).map((raw) => {
      const row = raw as unknown as {
        id: string;
        order_id: string;
        invoice_number: string;
        amount: unknown;
        created_at: string;
        orders: {
          order_number: string | null;
          email: string | null;
          delivery_address: unknown;
          billing_address: unknown;
        } | null;
        brandings: { shop_name: string | null; company_name: string | null } | null;
        bank_accounts: { name: string | null; iban: string | null } | null;
      };
      return {
        id: String(row.id),
        orderId: String(row.order_id),
        orderNumber: row.orders?.order_number ?? row.invoice_number,
        invoiceNumber: String(row.invoice_number),
        amount: num(row.amount),
        customer: customerFrom(
          address(row.orders?.delivery_address),
          row.orders?.billing_address ? address(row.orders.billing_address) : null,
          row.orders?.email ?? "",
        ),
        brandingName: row.brandings?.shop_name ?? row.brandings?.company_name ?? null,
        bankAccountName: row.bank_accounts?.name ?? null,
        bankIban: row.bank_accounts?.iban ?? null,
        createdAt: String(row.created_at),
      };
    });
  });

export const getBankAccountUsage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BankAccountUsage[]> => {
    await requireAdmin(context);
    const [accounts, invoices] = await Promise.all([
      context.supabase
        .from("bank_accounts")
        .select("id, name, iban, bic, bank_name, limit_amount")
        .eq("is_active", true)
        .order("created_at", { ascending: true }),
      context.supabase.from("invoices").select("bank_account_id, amount"),
    ]);
    if (accounts.error) throw new Error("Bankkonten konnten nicht geladen werden.");
    if (invoices.error) throw new Error("Rechnungen konnten nicht geladen werden.");

    const used = new Map<string, { amount: number; count: number }>();
    for (const entry of invoices.data ?? []) {
      const key = text((entry as { bank_account_id: unknown }).bank_account_id);
      if (!key) continue;
      const current = used.get(key) ?? { amount: 0, count: 0 };
      current.amount += num((entry as { amount: unknown }).amount);
      current.count += 1;
      used.set(key, current);
    }

    return (accounts.data ?? []).map((row) => {
      const stats = used.get(String(row.id)) ?? { amount: 0, count: 0 };
      return {
        id: String(row.id),
        name: String(row.name),
        iban: String(row.iban),
        bic: String(row.bic),
        bankName: String(row.bank_name),
        limitAmount: num(row.limit_amount),
        usedAmount: stats.amount,
        invoiceCount: stats.count,
      };
    });
  });

export const generateInvoice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { orderId: string; bankAccountId: string }) =>
    z.object({ orderId: z.string().uuid(), bankAccountId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }): Promise<{ id: string; invoiceNumber: string }> => {
    await requireAdmin(context);

    const { data: orderRow, error: orderError } = await context.supabase
      .from("orders")
      .select("*")
      .eq("id", data.orderId)
      .maybeSingle();
    if (orderError || !orderRow) throw new Error("Bestellung konnte nicht geladen werden.");

    const { data: bankRow, error: bankError } = await context.supabase
      .from("bank_accounts")
      .select("*")
      .eq("id", data.bankAccountId)
      .maybeSingle();
    if (bankError || !bankRow) throw new Error("Bankkonto konnte nicht geladen werden.");

    const brandingId = text(orderRow.branding_id);
    let branding: InvoiceBranding = INVOICE_FALLBACK_BRANDING;
    let brandingRaw: Record<string, unknown> | null = null;
    let brandingLogoUrl: string | null = null;
    if (brandingId) {
      const { data: brandingRow } = await context.supabase
        .from("brandings")
        .select("*")
        .eq("id", brandingId)
        .maybeSingle();
      if (brandingRow) {
        brandingRaw = brandingRow as unknown as Record<string, unknown>;
        const logoPath = text(brandingRow.logo_path);
        const signed = logoPath
          ? await context.supabase.storage.from("branding-logos").createSignedUrl(logoPath, 3600)
          : null;
        brandingLogoUrl = signed?.data?.signedUrl ?? null;
        branding = {
          companyName: text(brandingRow.company_name),
          shopName: text(brandingRow.shop_name),
          streetAddress: text(brandingRow.street_address),
          postalCode: text(brandingRow.postal_code),
          city: text(brandingRow.city),
          registryCourt: text(brandingRow.registry_court),
          commercialRegisterNumber: text(brandingRow.commercial_register_number),
          vatId: text(brandingRow.vat_id),
          email: text(brandingRow.email),
          logoUrl: signed?.data?.signedUrl ?? null,
          accountHolder: text(brandingRow.account_holder),
          iban: text(brandingRow.iban),
          bankName: text(brandingRow.bank_name),
          bic: text(brandingRow.bic),
        };
      }
    }

    const order: Order = {
      id: String(orderRow.id),
      orderNumber: String(orderRow.order_number),
      brandingId,
      brandingName: null,
      variant: text(orderRow.variant) ?? "standard",
      liters: num(orderRow.liters),
      deliveryPoints: num(orderRow.delivery_points),
      hose: text(orderRow.hose),
      truck: text(orderRow.truck),
      pricePer100: num(orderRow.price_per_100),
      total: num(orderRow.total),
      earliestDate: text(orderRow.earliest_date),
      slotDate: text(orderRow.slot_date),
      slotPeriod: text(orderRow.slot_period),
      email: text(orderRow.email) ?? "",
      phone: text(orderRow.phone),
      deliveryAddress: address(orderRow.delivery_address),
      billingAddress: orderRow.billing_address ? address(orderRow.billing_address) : null,
      notes: text(orderRow.notes),
      paymentMethod: text(orderRow.payment_method),
      status: "neu",
      internalNote: text(orderRow.internal_note),
      placedAt: String(orderRow.placed_at ?? orderRow.created_at),
      createdAt: String(orderRow.created_at),
    };

    const model: InvoiceModel = buildInvoiceModel(order, branding, {
      accountHolder: String(bankRow.name),
      bankName: String(bankRow.bank_name),
      iban: String(bankRow.iban),
      bic: String(bankRow.bic),
    });

    const { renderInvoicePdfBytes } = await import("@/lib/invoice/invoice-pdf.server");
    const bytes = await renderInvoicePdfBytes(model);
    const pdfPath = `${order.id}.pdf`;
    const upload = await context.supabase.storage
      .from("invoices")
      .upload(pdfPath, new Blob([new Uint8Array(bytes)], { type: "application/pdf" }), {
        contentType: "application/pdf",
        upsert: true,
      });
    if (upload.error) throw new Error("Das PDF konnte nicht gespeichert werden.");

    const payload = {
      order_id: order.id,
      bank_account_id: data.bankAccountId,
      branding_id: brandingId,
      invoice_number: order.orderNumber,
      amount: order.total,
      pdf_path: pdfPath,
      model: JSON.parse(JSON.stringify(model)),
      created_by: context.userId,
    };

    const { data: saved, error } = await context.supabase
      .from("invoices")
      .upsert(payload, { onConflict: "order_id" })
      .select("id")
      .single();
    if (error) throw new Error("Die Rechnung konnte nicht gespeichert werden.");

    const warnings: string[] = [];
    let emailSent = false;
    let smsSent = false;

    // E-Mail mit Rechnung über Resend-Daten des Brandings
    const resendKey = str(brandingRaw?.["resend_api_key"]);
    const resendFrom = str(brandingRaw?.["resend_sender_email"]);
    if (!resendKey || !resendFrom) {
      warnings.push("E-Mail nicht versendet: Resend-Daten fehlen beim Branding.");
    } else if (!order.email) {
      warnings.push("E-Mail nicht versendet: Die Bestellung hat keine E-Mail-Adresse.");
    } else {
      try {
        const { sendResendEmail, senderLine, toBase64 } = await import("@/lib/notify/resend.server");
        const emailBranding = emailBrandingFrom(brandingRaw, brandingLogoUrl);
        const html = renderOrderInvoiceEmail(emailBranding, invoiceDataFrom(order, order.orderNumber), {
          accountHolder: String(bankRow.name),
          iban: String(bankRow.iban),
          bic: String(bankRow.bic),
        });
        await sendResendEmail({
          apiKey: resendKey,
          from: senderLine(str(brandingRaw?.["resend_sender_name"]), resendFrom),
          to: order.email,
          subject: `Ihre Rechnung ${order.orderNumber}`,
          html,
          replyTo: str(brandingRaw?.["email"]),
          attachments: [{ filename: `Rechnung_${order.orderNumber}.pdf`, content: toBase64(bytes) }],
        });
        emailSent = true;
      } catch (caught) {
        console.error("[invoice] email failed", caught);
        warnings.push("Die Rechnungs-E-Mail konnte nicht versendet werden.");
      }
    }

    // SMS über Seven.io-Daten des Brandings
    const sevenKey = str(brandingRaw?.["seven_api_key"]);
    if (!sevenKey) {
      warnings.push("SMS nicht versendet: Seven.io-Daten fehlen beim Branding.");
    } else if (!order.phone) {
      warnings.push("SMS nicht versendet: Die Bestellung hat keine Telefonnummer.");
    } else {
      try {
        const { sendSevenSms } = await import("@/lib/notify/seven.server");
        const smsBranding = smsBrandingFrom(brandingRaw);
        await sendSevenSms({
          apiKey: sevenKey,
          to: order.phone,
          from: smsSender(smsBranding),
          text: renderOrderConfirmationSms(smsBranding, smsDataFrom(order)),
        });
        smsSent = true;
      } catch (caught) {
        console.error("[invoice] sms failed", caught);
        warnings.push("Die SMS konnte nicht versendet werden.");
      }
    }

    const { error: statusError } = await context.supabase
      .from("orders")
      .update({ status: "rechnung_versendet" })
      .eq("id", order.id);
    if (statusError) warnings.push("Der Status konnte nicht aktualisiert werden.");

    return { id: String(saved.id), invoiceNumber: order.orderNumber, emailSent, smsSent, warnings };
  });

export const downloadInvoice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ fileName: string; url: string }> => {
    await requireAdmin(context);
    const { data: row, error } = await context.supabase
      .from("invoices")
      .select("invoice_number, pdf_path")
      .eq("id", data.id)
      .maybeSingle();
    if (error || !row?.pdf_path) throw new Error("Rechnung konnte nicht gefunden werden.");
    const signed = await context.supabase.storage.from("invoices").createSignedUrl(row.pdf_path, 300, {
      download: `Rechnung_${row.invoice_number}.pdf`,
    });
    if (!signed.data?.signedUrl) throw new Error("Download-Link konnte nicht erstellt werden.");
    return { fileName: `Rechnung_${row.invoice_number}.pdf`, url: signed.data.signedUrl };
  });

export const deleteInvoice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { data: row } = await context.supabase
      .from("invoices")
      .select("pdf_path")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.pdf_path) await context.supabase.storage.from("invoices").remove([row.pdf_path]);
    const { error } = await context.supabase.from("invoices").delete().eq("id", data.id);
    if (error) throw new Error("Rechnung konnte nicht gelöscht werden.");
    return { ok: true };
  });
