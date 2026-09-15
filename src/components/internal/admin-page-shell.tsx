import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { getAdminNav, type AdminNavKey } from "@/components/internal/admin-nav";
import { InternalShell } from "@/components/internal/app-shell";
import { getMyAccount } from "@/lib/roles.functions";

export function AdminPageShell({
  children,
  active = "brandings",
  subDock,
  allowCaller = false,
}: {
  children: ReactNode;
  active?: AdminNavKey;
  subDock?: ReactNode;
  allowCaller?: boolean;
}) {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const { data, isPending } = useQuery({ queryKey: ["my-account"], queryFn: () => fetchAccount({}) });

  const role = data?.role ?? null;
  const allowed = role === "admin" || (allowCaller && role === "caller");

  useEffect(() => {
    if (!data || allowed) return;
    if (data.role === "caller") navigate({ to: "/admin/bestellungen", replace: true });
    else navigate({ to: "/weiterleitung", replace: true });
  }, [data, allowed, navigate]);

  if (isPending || !data || !allowed) {
    return <div className="flex min-h-screen items-center justify-center bg-surface"><Loader2 className="size-6 animate-spin text-brand" /></div>;
  }

  const isCaller = role === "caller";

  return (
    <InternalShell
      role={isCaller ? "Caller" : "Admin"}
      name={data.fullName ?? (isCaller ? "Caller" : "Admin")}
      email={data.email ?? ""}
      nav={getAdminNav(active, isCaller ? "caller" : "admin")}
      subDock={isCaller ? undefined : subDock}
    >
      <div className="pb-16 lg:pb-0">{children}</div>
    </InternalShell>
  );
}
