import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { getAdminNav } from "@/components/internal/admin-nav";
import { InternalShell } from "@/components/internal/app-shell";
import { getMyAccount } from "@/lib/roles.functions";

export function AdminPageShell({ children, active = "brandings" }: { children: ReactNode; active?: "overview" | "brandings" | "bank" | "orders" | "invoice" | "emails" | "sms" | "telegram" }) {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const { data, isPending } = useQuery({ queryKey: ["my-account"], queryFn: () => fetchAccount({}) });

  useEffect(() => {
    if (data && data.role !== "admin") navigate({ to: "/weiterleitung", replace: true });
  }, [data, navigate]);

  if (isPending || !data || data.role !== "admin") {
    return <div className="flex min-h-screen items-center justify-center bg-surface"><Loader2 className="size-6 animate-spin text-brand" /></div>;
  }

  return <InternalShell role="Admin" name={data.fullName ?? "Admin"} email={data.email ?? ""} nav={getAdminNav(active)}><div className="pb-16 lg:pb-0">{children}</div></InternalShell>;
}