import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export type NavItem = { label: string; icon: ReactNode; to?: "/admin" | "/admin/caller" | "/admin/brandings" | "/admin/bankkonten" | "/admin/bestellungen" | "/admin/settings"; active?: boolean };

export function InternalShell({
  role,
  name,
  email,
  nav,
  subDock,
  children,
}: {
  role: string;
  name: string;
  email: string;
  nav: NavItem[];
  subDock?: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "K";

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-background px-4 py-3 lg:hidden">
        <Link to="/" className="rounded-md">
          <Logo className="h-auto w-[92px] text-smava-logo" />
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="border-line text-[13px] text-conditions"
        >
          <LogOut className="size-4" />
          Abmelden
        </Button>
      </div>

      {/* Desktop top dock */}
      <header className="fixed top-4 left-1/2 z-50 hidden w-max max-w-[95vw] -translate-x-1/2 lg:block">
        <div className="flex items-center gap-2 rounded-[1.75rem] bg-brand px-3 py-2 shadow-xl">
          <Link to="/" className="shrink-0 rounded-md">
            <Logo className="h-auto w-[92px] text-white" />
          </Link>
          <span className="rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
            {role}
          </span>

          <div className="mx-1 h-6 w-px bg-white/20" />

          <nav className="flex items-center gap-1">
            {nav.map((item) => {
              const base =
                "flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] transition-colors";
              const className = item.active
                ? `${base} bg-white font-semibold text-brand shadow-sm`
                : `${base} text-white/90 hover:bg-white/10`;
              return item.to ? (
                <Link key={item.label} to={item.to} className={className}>
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className={`${className} cursor-default`}>
                  {item.icon}
                  {item.label}
                </span>
              );
            })}
          </nav>

          <div className="mx-1 h-6 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold text-brand">
              {initials}
            </span>
            <div className="hidden min-w-0 xl:block">
              <p className="truncate text-[13px] font-semibold text-white">{name}</p>
              <p className="truncate text-[11px] text-white/70">{email}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              title="Abmelden"
              className="flex items-center justify-center rounded-xl p-2 text-white/90 transition-colors hover:bg-white/10"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {subDock ? (
        <div className="fixed top-[4.75rem] left-1/2 z-40 hidden w-max max-w-[95vw] -translate-x-1/2 lg:block">
          <div className="flex items-center gap-1 rounded-[1.75rem] bg-brand px-3 py-2 shadow-xl">{subDock}</div>
        </div>
      ) : null}

      <div className={`mx-auto min-h-screen w-full px-4 py-6 pb-20 lg:px-8 lg:pb-8 ${subDock ? "lg:pt-36" : "lg:pt-24"}`}>
        <main className="min-w-0 space-y-6">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-1 overflow-x-auto border-t border-line bg-background px-3 py-2 lg:hidden">
        {nav
          .filter((item) => item.to)
          .map((item) => (
            <Link
              key={item.label}
              to={item.to ?? "/admin"}
              className={`flex min-w-24 flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-[12px] ${item.active ? "bg-brand-soft font-semibold text-brand-hover" : "text-muted-custom"}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
      </nav>
    </div>
  );
}
