import { Building2, LayoutDashboard, Mail, MessageSquareText, ShoppingCart } from "lucide-react";

import type { NavItem } from "@/components/internal/app-shell";

export function getAdminNav(active: "overview" | "brandings" | "orders" | "emails" | "sms"): NavItem[] {
  return [
    { label: "Übersicht", icon: <LayoutDashboard className="size-4" />, to: "/admin", active: active === "overview" },
    { label: "Brandings", icon: <Building2 className="size-4" />, to: "/admin/brandings", active: active === "brandings" },
    { label: "Bestellungen", icon: <ShoppingCart className="size-4" />, to: "/admin/bestellungen", active: active === "orders" },
    { label: "E-Mails", icon: <Mail className="size-4" />, to: "/admin/emails", active: active === "emails" },
    { label: "SMS", icon: <MessageSquareText className="size-4" />, to: "/admin/sms", active: active === "sms" },
  ];
}
