import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const ORDER_STATUSES = [
  "neu",
  "mailbox",
  "kein_interesse",
  "moechte_rechnung",
  "rechnung_versendet",
  "ueberwiesen",
  "angekommen",
  "exchanged",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  neu: "Neu",
  mailbox: "Mailbox",
  kein_interesse: "Kein Interesse",
  moechte_rechnung: "Möchte Rechnung",
  rechnung_versendet: "Rechnung versendet",
  ueberwiesen: "Überwiesen",
  angekommen: "Angekommen",
  exchanged: "Exchanged",
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
  statusChangedAt: string | null;
  createdAt: string;
};

type OrdersContext = {
  supabase: {
    rpc: (
      name: "has_role",
      args: { _user_id: string; _role: "admin" | "caller" },
    ) => PromiseLike<{ data: boolean | null; error: unknown }>;
  };
  userId: string;
};

/** Admins und Caller dürfen Bestellungen sehen und Status/Notiz pflegen. */
async function requireOrdersAccess(context: OrdersContext): Promise<"admin" | "caller"> {
  const [admin, caller] = await Promise.all([
    context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
    context.supabase.rpc("has_role", { _user_id: context.userId, _role: "caller" }),
  ]);
  if (admin.error || caller.error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  if (admin.data === true) return "admin";
  if (caller.data === true) return "caller";
  throw new Error("Kein Zugriff auf die Bestellverwaltung.");
}

/** Caller dürfen die Branding-Tabelle nicht lesen — Namen serverseitig nachladen. */
async function attachBrandingNames(orders: Order[]): Promise<Order[]> {
  const ids = [...new Set(orders.map((o) => o.brandingId).filter((id): id is string => Boolean(id)))];
  if (ids.length === 0) return orders;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("brandings").select("id, shop_name, company_name").in("id", ids);
  const byId = new Map((data ?? []).map((row) => [String(row.id), row]));
  return orders.map((order) => {
    const row = order.brandingId ? byId.get(order.brandingId) : null;
    return row ? { ...order, brandingName: row.shop_name ?? row.company_name ?? null } : order;
  });
}

type Row = {
  id: unknown;
  order_number: unknown;
  branding_id: unknown;
  variant: unknown;
  liters: unknown;
  delivery_points: unknown;
  hose: unknown;
  truck: unknown;
  price_per_100: unknown;
  total: unknown;
  earliest_date: unknown;
  slot_date: unknown;
  slot_period: unknown;
  email: unknown;
  phone: unknown;
  delivery_address: unknown;
  billing_address: unknown;
  notes: unknown;
  payment_method: unknown;
  status: unknown;
  internal_note: unknown;
  placed_at: unknown;
  status_changed_at?: unknown;
  created_at: unknown;
  brandings?: { shop_name: string | null; company_name: string | null } | null;
};

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
    statusChangedAt: text(row.status_changed_at),
    createdAt: String(row.created_at),
  };
}

const SELECT = "*, brandings(shop_name, company_name)";

export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Order[]> => {
    const role = await requireOrdersAccess(context);
    const { data, error } = await context.supabase
      .from("orders")
      .select(SELECT)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error("Bestellungen konnten nicht geladen werden.");
    const orders = (data ?? []).map((row) => mapRow(row as Row));
    return role === "caller" ? attachBrandingNames(orders) : orders;
  });

export const getOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<Order | null> => {
    const role = await requireOrdersAccess(context);
    const { data: row, error } = await context.supabase
      .from("orders")
      .select(SELECT)
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error("Bestellung konnte nicht geladen werden.");
    if (!row) return null;
    const order = mapRow(row as Row);
    return role === "caller" ? (await attachBrandingNames([order]))[0]! : order;
  });

const addressSchema = z.object({
  salutation: z.string().trim().max(40).nullish(),
  company: z.string().trim().max(160).nullish(),
  firstName: z.string().trim().max(80).nullish(),
  lastName: z.string().trim().max(80).nullish(),
  street: z.string().trim().max(160).nullish(),
  streetNo: z.string().trim().max(20).nullish(),
  plz: z.string().trim().max(10).nullish(),
  city: z.string().trim().max(120).nullish(),
});

const optionalText = (max: number) => z.string().trim().max(max).nullish();
const optionalDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte ein gültiges Datum angeben.")
  .nullish();

export type UpdateOrderInput = {
  id: string;
  status?: OrderStatus;
  internalNote?: string;
  variant?: string;
  liters?: number;
  pricePer100?: number;
  deliveryPoints?: number;
  hose?: string | null;
  truck?: string | null;
  paymentMethod?: string | null;
  email?: string;
  phone?: string | null;
  earliestDate?: string | null;
  slotDate?: string | null;
  slotPeriod?: string | null;
  notes?: string | null;
  deliveryAddress?: OrderAddress;
  billingAddress?: OrderAddress | null;
};

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(ORDER_STATUSES).optional(),
  internalNote: z.string().max(4000).optional(),
  variant: z.enum(["standard", "premium"]).optional(),
  liters: z.number().int().min(1, "Die Menge muss größer als 0 sein.").max(1_000_000).optional(),
  pricePer100: z.number().min(0, "Der Preis darf nicht negativ sein.").max(100_000).optional(),
  deliveryPoints: z.number().int().min(1).max(20).optional(),
  hose: optionalText(80),
  truck: optionalText(80),
  paymentMethod: optionalText(40),
  email: z.string().trim().email("Bitte eine gültige E-Mail-Adresse angeben.").max(200).optional(),
  phone: optionalText(40),
  earliestDate: optionalDate,
  slotDate: optionalDate,
  slotPeriod: optionalText(40),
  notes: optionalText(4000),
  deliveryAddress: addressSchema.optional(),
  billingAddress: addressSchema.nullish(),
});

const clean = (value: string | null | undefined): string | null =>
  value === undefined || value === null || value === "" ? null : value;

const cleanAddress = (value: OrderAddress): OrderAddress =>
  Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, typeof entry === "string" && entry ? entry : null]),
  ) as OrderAddress;

export const updateOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: UpdateOrderInput) => updateSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireOrdersAccess(context);

    const payload: Record<string, unknown> = {};
    if (data.status) payload["status"] = data.status;
    if (data.internalNote !== undefined) payload["internal_note"] = data.internalNote || null;
    if (data.variant !== undefined) payload["variant"] = data.variant;
    if (data.liters !== undefined) payload["liters"] = data.liters;
    if (data.pricePer100 !== undefined) payload["price_per_100"] = data.pricePer100;
    if (data.deliveryPoints !== undefined) payload["delivery_points"] = data.deliveryPoints;
    if (data.hose !== undefined) payload["hose"] = clean(data.hose);
    if (data.truck !== undefined) payload["truck"] = clean(data.truck);
    if (data.paymentMethod !== undefined) payload["payment_method"] = clean(data.paymentMethod);
    if (data.email !== undefined) payload["email"] = data.email;
    if (data.phone !== undefined) payload["phone"] = clean(data.phone);
    if (data.earliestDate !== undefined) payload["earliest_date"] = clean(data.earliestDate);
    if (data.slotDate !== undefined) payload["slot_date"] = clean(data.slotDate);
    if (data.slotPeriod !== undefined) payload["slot_period"] = clean(data.slotPeriod);
    if (data.notes !== undefined) payload["notes"] = clean(data.notes);
    if (data.deliveryAddress !== undefined) payload["delivery_address"] = cleanAddress(data.deliveryAddress);
    if (data.billingAddress !== undefined) {
      payload["billing_address"] = data.billingAddress ? cleanAddress(data.billingAddress) : null;
    }

    // Gesamtpreis immer serverseitig aus Menge und Preis pro 100 L berechnen.
    if (data.liters !== undefined || data.pricePer100 !== undefined) {
      const { data: current, error: readError } = await context.supabase
        .from("orders")
        .select("liters, price_per_100")
        .eq("id", data.id)
        .maybeSingle();
      if (readError || !current) throw new Error("Bestellung konnte nicht geladen werden.");
      const liters = data.liters ?? num(current.liters);
      const pricePer100 = data.pricePer100 ?? num(current.price_per_100);
      payload["total"] = Math.round(((liters / 100) * pricePer100 + Number.EPSILON) * 100) / 100;
    }

    const { error } = await context.supabase.from("orders").update(payload).eq("id", data.id);
    if (error) throw new Error("Bestellung konnte nicht aktualisiert werden.");
    return { ok: true };
  });
