import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders.functions";

export type AdminRecentOrder = {
  id: string;
  orderNumber: string;
  placedAt: string;
  customer: string;
  city: string;
  liters: number;
  total: number;
  status: OrderStatus;
};

export type AdminBrandingStat = {
  id: string;
  name: string;
  shopName: string | null;
  status: "draft" | "active";
  orders: number;
};

export type AdminStats = {
  ordersToday: number;
  ordersYesterday: number;
  ordersTotal: number;
  revenueMonth: number;
  revenuePrevMonth: number;
  litersMonth: number;
  openOrders: number;
  avgPricePer100: number;
  statusCounts: Record<OrderStatus, number>;
  recentOrders: AdminRecentOrder[];
  brandings: AdminBrandingStat[];
};

type OrderRow = {
  id: string;
  order_number: string;
  placed_at: string | null;
  created_at: string;
  total: number | string | null;
  liters: number | string | null;
  price_per_100: number | string | null;
  status: string;
  branding_id: string | null;
  delivery_address: unknown;
};

const num = (value: unknown): number =>
  typeof value === "number" ? value : Number(value ?? 0) || 0;

function customerFrom(address: unknown): string {
  if (!address || typeof address !== "object") return "—";
  const a = address as Record<string, unknown>;
  const parts = [a["firstName"], a["lastName"]].filter(
    (v): v is string => typeof v === "string" && v.trim() !== "",
  );
  if (parts.length) return parts.join(" ");
  if (typeof a["company"] === "string" && a["company"]) return a["company"];
  return "—";
}

function cityFrom(address: unknown): string {
  if (!address || typeof address !== "object") return "—";
  const a = address as Record<string, unknown>;
  const plz = typeof a["plz"] === "string" ? a["plz"] : "";
  const city = typeof a["city"] === "string" ? a["city"] : "";
  const label = [plz, city].filter(Boolean).join(" ");
  return label || "—";
}

function berlinDayKey(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminStats> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
    if (isAdmin !== true) throw new Error("Kein Zugriff auf die Übersicht.");

    const [ordersRes, brandingsRes] = await Promise.all([
      context.supabase
        .from("orders")
        .select(
          "id, order_number, placed_at, created_at, total, liters, price_per_100, status, branding_id, delivery_address",
        )
        .order("placed_at", { ascending: false })
        .limit(2000),
      context.supabase
        .from("brandings")
        .select("id, company_name, shop_name, status")
        .order("created_at", { ascending: true }),
    ]);

    if (ordersRes.error) throw new Error("Bestelldaten konnten nicht geladen werden.");
    if (brandingsRes.error) throw new Error("Brandings konnten nicht geladen werden.");

    const rows = (ordersRes.data ?? []) as unknown as OrderRow[];

    const now = new Date();
    const todayKey = berlinDayKey(now.toISOString());
    const yesterdayKey = berlinDayKey(new Date(now.getTime() - 86_400_000).toISOString());
    const monthKey = todayKey.slice(0, 7);
    const prevMonthDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 15));
    const prevMonthKey = berlinDayKey(prevMonthDate.toISOString()).slice(0, 7);

    const statusCounts = Object.fromEntries(ORDER_STATUSES.map((s) => [s, 0])) as Record<
      OrderStatus,
      number
    >;

    let ordersToday = 0;
    let ordersYesterday = 0;
    let revenueMonth = 0;
    let revenuePrevMonth = 0;
    let litersMonth = 0;
    let priceSum = 0;
    let priceCount = 0;
    const ordersPerBranding = new Map<string, number>();

    for (const row of rows) {
      const placedAt = row.placed_at ?? row.created_at;
      const dayKey = berlinDayKey(placedAt);
      const mKey = dayKey.slice(0, 7);
      const total = num(row.total);
      const liters = num(row.liters);
      const price = num(row.price_per_100);

      if (dayKey === todayKey) ordersToday += 1;
      if (dayKey === yesterdayKey) ordersYesterday += 1;
      if (mKey === monthKey) {
        revenueMonth += total;
        litersMonth += liters;
      }
      if (mKey === prevMonthKey) revenuePrevMonth += total;
      if (price > 0) {
        priceSum += price;
        priceCount += 1;
      }
      const status = (ORDER_STATUSES as readonly string[]).includes(row.status)
        ? (row.status as OrderStatus)
        : "neu";
      statusCounts[status] += 1;
      if (row.branding_id) {
        ordersPerBranding.set(row.branding_id, (ordersPerBranding.get(row.branding_id) ?? 0) + 1);
      }
    }

    const recentOrders: AdminRecentOrder[] = rows.slice(0, 6).map((row) => ({
      id: String(row.id),
      orderNumber: String(row.order_number),
      placedAt: String(row.placed_at ?? row.created_at),
      customer: customerFrom(row.delivery_address),
      city: cityFrom(row.delivery_address),
      liters: num(row.liters),
      total: num(row.total),
      status: (ORDER_STATUSES as readonly string[]).includes(row.status)
        ? (row.status as OrderStatus)
        : "neu",
    }));

    const brandings: AdminBrandingStat[] = (brandingsRes.data ?? []).map((b) => {
      const row = b as { id: string; company_name: string | null; shop_name: string | null; status: string };
      return {
        id: String(row.id),
        name: row.company_name ?? row.shop_name ?? "Ohne Namen",
        shopName: row.shop_name,
        status: row.status === "active" ? "active" : "draft",
        orders: ordersPerBranding.get(String(row.id)) ?? 0,
      };
    });

    return {
      ordersToday,
      ordersYesterday,
      ordersTotal: rows.length,
      revenueMonth,
      revenuePrevMonth,
      litersMonth,
      openOrders: statusCounts.neu,
      avgPricePer100: priceCount ? priceSum / priceCount : 0,
      statusCounts,
      recentOrders,
      brandings,
    };
  });
