import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const ORDER_STATUSES = [
  "neu",
  "in_bearbeitung",
  "bestaetigt",
  "geliefert",
  "storniert",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
  bestaetigt: "Bestätigt",
  geliefert: "Geliefert",
  storniert: "Storniert",
};

export type OrderAddress = {
  salutation?: string | null;
  company?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  streetNo?: string | null;
  plz?: string | null;
  city?: string | null;
};

export type Order = {
  id: string;
  orderNumber: string;
  brandingId: string | null;
  brandingName: string | null;
  variant: string;
  liters: number;
  deliveryPoints: number;
  hose: string | null;
  truck: string | null;
  pricePer100: number;
  total: number;
  earliestDate: string | null;
  slotDate: string | null;
  slotPeriod: string | null;
  email: string;
  phone: string | null;
  deliveryAddress: OrderAddress;
  billingAddress: OrderAddress | null;
  notes: string | null;
  paymentMethod: string | null;
  status: OrderStatus;
  internalNote: string | null;
  placedAt: string;
  createdAt: string;
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
  if (data !== true) throw new Error("Kein Zugriff auf die Bestellverwaltung.");
}

type Row = Record<string, unknown> & { brandings?: { shop_name: string | null; company_name: string | null } | null };

const text = (value: unknown): string | null => (typeof value === "string" && value ? value : null);
const num = (value: unknown): number => (typeof value === "number" ? value : Number(value ?? 0) || 0);
const address = (value: unknown): OrderAddress =>
  value && typeof value === "object" ? (value as OrderAddress) : {};

function mapRow(row: Row): Order {
  const branding = row.brandings ?? null;
  return {
    id: String(row.id),
    orderNumber: String(row.order_number),
    brandingId: text(row.branding_id),
    brandingName: branding ? (branding.shop_name ?? branding.company_name ?? null) : null,
    variant: text(row.variant) ?? "standard",
    liters: num(row.liters),
    deliveryPoints: num(row.delivery_points),
    hose: text(row.hose),
    truck: text(row.truck),
    pricePer100: num(row.price_per_100),
    total: num(row.total),
    earliestDate: text(row.earliest_date),
    slotDate: text(row.slot_date),
    slotPeriod: text(row.slot_period),
    email: text(row.email) ?? "",
    phone: text(row.phone),
    deliveryAddress: address(row.delivery_address),
    billingAddress: row.billing_address ? address(row.billing_address) : null,
    notes: text(row.notes),
    paymentMethod: text(row.payment_method),
    status: (ORDER_STATUSES as readonly string[]).includes(String(row.status))
      ? (row.status as OrderStatus)
      : "neu",
    internalNote: text(row.internal_note),
    placedAt: String(row.placed_at ?? row.created_at),
    createdAt: String(row.created_at),
  };
}

const SELECT = "*, brandings(shop_name, company_name)";

export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Order[]> => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("orders")
      .select(SELECT)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error("Bestellungen konnten nicht geladen werden.");
    return (data ?? []).map((row) => mapRow(row as Row));
  });

export const getOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<Order | null> => {
    await requireAdmin(context);
    const { data: row, error } = await context.supabase
      .from("orders")
      .select(SELECT)
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error("Bestellung konnte nicht geladen werden.");
    return row ? mapRow(row as Row) : null;
  });

export const updateOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status?: OrderStatus; internalNote?: string }) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(ORDER_STATUSES).optional(),
        internalNote: z.string().max(4000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const payload: { status?: OrderStatus; internal_note?: string | null } = {};
    if (data.status) payload.status = data.status;
    if (data.internalNote !== undefined) payload.internal_note = data.internalNote || null;
    const { error } = await context.supabase.from("orders").update(payload).eq("id", data.id);
    if (error) throw new Error("Bestellung konnte nicht aktualisiert werden.");
    return { ok: true };
  });
