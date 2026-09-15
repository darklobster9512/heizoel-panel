import { Building2, Landmark, LayoutDashboard, Settings, ShoppingCart } from "lucide-react";

import type { NavItem } from "@/components/internal/app-shell";

export type AdminNavKey = "overview" | "brandings" | "bank" | "orders" | "settings";

export function getAdminNav(active: AdminNavKey, role: "admin" | "caller" = "admin"): NavItem[] {
  const orders: NavItem = {
    label: "Bestellungen",
    icon: <ShoppingCart className="size-4" />,
    to: "/admin/bestellungen",
    active: active === "orders",
  };

  if (role === "caller") return [orders];

  return [
    { label: "Übersicht", icon: <LayoutDashboard className="size-4" />, to: "/admin", active: active === "overview" },
    { label: "Brandings", icon: <Building2 className="size-4" />, to: "/admin/brandings", active: active === "brandings" },
    { label: "Bankkonten", icon: <Landmark className="size-4" />, to: "/admin/bankkonten", active: active === "bank" },
    orders,
    { label: "Einstellungen", icon: <Settings className="size-4" />, to: "/admin/settings", active: active === "settings" },
  ];
}
