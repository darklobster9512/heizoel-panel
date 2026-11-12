import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

const addressSchema = z.object({
  salutation: z.string().max(40).optional().nullable(),
  company: z.string().max(160).optional().nullable(),
  firstName: z.string().max(120).optional().nullable(),
  lastName: z.string().max(120).optional().nullable(),
  street: z.string().max(200).optional().nullable(),
  streetNo: z.string().max(40).optional().nullable(),
  plz: z.string().max(10).optional().nullable(),
  city: z.string().max(120).optional().nullable(),
});

const bodySchema = z.object({
  brandingId: z.string().uuid(),
  variant: z.string().max(40).optional().default("standard"),
  liters: z.number().int().nonnegative(),
  deliveryPoints: z.number().int().positive().optional().default(1),
  hose: z.string().max(120).optional().nullable(),
  truck: z.string().max(120).optional().nullable(),
  pricePer100: z.number().nonnegative(),
  total: z.number().nonnegative(),
  earliestDate: z.string().max(20).optional().nullable(),
  slotDate: z.string().max(20).optional().nullable(),
  slotPeriod: z.enum(["vormittag", "nachmittag", "telefon"]).optional().nullable(),
  email: z.string().email().max(255),
  phone: z.string().max(60).optional().nullable(),
  deliveryAddress: addressSchema,
  billingAddress: addressSchema.optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
  paymentMethod: z.string().max(60).optional().nullable(),
  placedAt: z.string().max(40).optional().nullable(),
});

function makeOrderNumber(): string {
  const now = new Date();
  const berlin = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
  }).format(now);
  const prefix = berlin.replace(/\D/g, "");
  const digits = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `${prefix}-${digits}`;
}

export const Route = createFileRoute("/api/public/orders")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {


        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "Ungültiger Body." }, 400);
        }

        const parsed = bodySchema.safeParse(raw);
        if (!parsed.success) {
          return json({ ok: false, error: "Ungültige Bestelldaten.", issues: parsed.error.issues }, 400);
        }
        const data = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: branding, error: brandingError } = await supabaseAdmin
          .from("brandings")
          .select("id, shop_name, company_name")
          .or(`public_id.eq.${data.brandingId},id.eq.${data.brandingId}`)
          .maybeSingle();
        if (brandingError) return json({ ok: false, error: "Branding konnte nicht geprüft werden." }, 500);
        if (!branding) return json({ ok: false, error: "Unbekannte Branding-ID." }, 404);

        const payload = {
          branding_id: branding.id,
          variant: data.variant,
          liters: data.liters,
          delivery_points: data.deliveryPoints,
          hose: data.hose ?? null,
          truck: data.truck ?? null,
          price_per_100: data.pricePer100,
          total: data.total,
          earliest_date: data.earliestDate || null,
          slot_date: data.slotDate || null,
          slot_period: data.slotPeriod ?? null,
          email: data.email,
          phone: data.phone ?? null,
          delivery_address: data.deliveryAddress,
          billing_address: data.billingAddress ?? null,
          notes: data.notes ?? null,
          payment_method: data.paymentMethod ?? null,
          placed_at: data.placedAt || new Date().toISOString(),
        };

        for (let attempt = 0; attempt < 8; attempt++) {
          const orderNumber = makeOrderNumber();
          const { data: saved, error } = await supabaseAdmin
            .from("orders")
            .insert({ ...payload, order_number: orderNumber })
            .select("id, order_number")
            .single();
          if (!error && saved) {
            try {
              const { sendOrderNotification } = await import("@/lib/telegram/notify.server");
              const addr = data.deliveryAddress;
              const customerName = [addr.firstName, addr.lastName].filter(Boolean).join(" ") || addr.company || null;
              await sendOrderNotification({
                orderNumber: String(saved.order_number),
                brandingId: String(branding.id),
                brandingName: branding.shop_name ?? branding.company_name ?? null,
                customerName,
                email: data.email,
                phone: data.phone ?? null,
                liters: data.liters,
                variant: data.variant,
                total: data.total,
                pricePer100: data.pricePer100,
                postalCode: addr.plz ?? null,
                city: addr.city ?? null,
                paymentMethod: data.paymentMethod ?? null,
              });
            } catch (notifyError) {
              console.error("[orders] telegram notification failed", notifyError);
            }
            return json({ ok: true, orderNumber: saved.order_number, orderId: saved.id }, 201);
          }
          if (error && error.code !== "23505") {
            console.error("[orders] insert failed", error);
            return json({ ok: false, error: "Bestellung konnte nicht gespeichert werden." }, 500);
          }
        }

        return json({ ok: false, error: "Bestellnummer konnte nicht erzeugt werden." }, 500);
      },
    },
  },
});
