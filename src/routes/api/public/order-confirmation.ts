import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { renderOrderConfirmationEmail } from "@/lib/email-templates/order-confirmation";
import {
  confirmationDataFrom,
  emailBrandingFrom,
  smsBrandingFrom,
  smsDataFrom,
} from "@/lib/notify/order-payloads";
import { sendResendEmail, senderLine } from "@/lib/notify/resend.server";
import { normalizePhone, sendSevenSms } from "@/lib/notify/seven.server";
import { renderOrderConfirmationSms } from "@/lib/sms-templates";
import type { Order, OrderAddress } from "@/lib/orders.functions";

const schema = z.object({ orderId: z.string().uuid(), secret: z.string().min(1) });

const text = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value.trim() : null;
const num = (value: unknown): number => Number(value ?? 0) || 0;
const address = (value: unknown): OrderAddress =>
  value && typeof value === "object" ? (value as OrderAddress) : {};

export const Route = createFileRoute("/api/public/order-confirmation")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["ORDER_HOOK_SECRET"];
        let parsed: z.infer<typeof schema>;
        try {
          parsed = schema.parse(await request.json());
        } catch {
          return Response.json({ ok: false, error: "invalid_payload" }, { status: 400 });
        }
        if (!expected || parsed.secret !== expected) {
          return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: row, error } = await supabaseAdmin
          .from("orders")
          .select("*")
          .eq("id", parsed.orderId)
          .maybeSingle();
        if (error || !row) {
          return Response.json({ ok: false, error: "order_not_found" }, { status: 404 });
        }

        const raw = row as unknown as Record<string, unknown>;
        const brandingId = text(raw["branding_id"]);
        let brandingRaw: Record<string, unknown> | null = null;
        let logoUrl: string | null = null;
        if (brandingId) {
          const { data: brandingRow } = await supabaseAdmin
            .from("brandings")
            .select("*")
            .eq("id", brandingId)
            .maybeSingle();
          if (brandingRow) {
            brandingRaw = brandingRow as unknown as Record<string, unknown>;
            const logoPath = text(brandingRaw["logo_path"]);
            if (logoPath) {
              const signed = await supabaseAdmin.storage
                .from("branding-logos")
                .createSignedUrl(logoPath, 3600);
              logoUrl = signed.data?.signedUrl ?? null;
            }
          }
        }

        const apiKey = text(brandingRaw?.["resend_api_key"]);
        const from = text(brandingRaw?.["resend_sender_email"]);
        const to = text(raw["email"]);
        if (!apiKey || !from || !to) {
          return Response.json({ ok: false, error: "resend_not_configured" }, { status: 200 });
        }

        const order = {
          id: String(raw["id"]),
          orderNumber: String(raw["order_number"]),
          brandingId,
          brandingName: null,
          variant: text(raw["variant"]) ?? "standard",
          liters: num(raw["liters"]),
          deliveryPoints: num(raw["delivery_points"]),
          hose: text(raw["hose"]),
          truck: text(raw["truck"]),
          pricePer100: num(raw["price_per_100"]),
          total: num(raw["total"]),
          earliestDate: text(raw["earliest_date"]),
          slotDate: text(raw["slot_date"]),
          slotPeriod: text(raw["slot_period"]),
          email: to,
          phone: text(raw["phone"]),
          deliveryAddress: address(raw["delivery_address"]),
          billingAddress: raw["billing_address"] ? address(raw["billing_address"]) : null,
          notes: text(raw["notes"]),
          paymentMethod: text(raw["payment_method"]),
          status: "neu",
          internalNote: text(raw["internal_note"]),
          placedAt: String(raw["placed_at"] ?? raw["created_at"]),
          statusChangedAt: text(raw["status_changed_at"]),
          createdAt: String(raw["created_at"]),
        } as Order;

        let emailSent = false;
        let smsSent = false;

        try {
          const branding = emailBrandingFrom(brandingRaw, logoUrl);
          await sendResendEmail({
            apiKey,
            from: senderLine(text(brandingRaw?.["resend_sender_name"]), from),
            to,
            subject: `Ihre Bestellbestätigung ${order.orderNumber}`,
            html: renderOrderConfirmationEmail(branding, confirmationDataFrom(order)),
            replyTo: text(brandingRaw?.["email"]),
          });
          emailSent = true;
        } catch (caught) {
          console.error("[order-confirmation] send failed", caught);
          return Response.json({ ok: false, error: "send_failed", emailSent, smsSent }, { status: 502 });
        }

        const sevenApiKey = text(brandingRaw?.["seven_api_key"]);
        const phone = order.phone ? normalizePhone(order.phone) : null;
        if (sevenApiKey && phone) {
          try {
            await sendSevenSms({
              apiKey: sevenApiKey,
              to: phone,
              text: renderOrderConfirmationSms(smsBrandingFrom(brandingRaw), smsDataFrom(order)),
              from: text(brandingRaw?.["seven_sender_name"]),
            });
            smsSent = true;
          } catch (smsError) {
            console.error("[order-confirmation] sms failed", smsError);
          }
        } else {
          console.log("[order-confirmation] sms skipped: no seven api key or phone", {
            hasKey: !!sevenApiKey,
            phone: order.phone,
          });
        }

        return Response.json({ ok: true, emailSent, smsSent });
      },
    },
  },
});
