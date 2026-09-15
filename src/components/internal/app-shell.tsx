import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export type NavItem = { label: string; icon: ReactNode; to?: "/admin" | "/admin/brandings" | "/admin/bankkonten" | "/admin/bestellungen" | "/admin/settings"; active?: boolean };

export function InternalShell({
  role,
  name,
  email,
  nav,
  children,
}: {
  role: string;
  name: string;
  email: string;
  nav: NavItem[];
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

      <aside className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="max-h-[96vh] w-max overflow-y-auto rounded-l-none rounded-r-2xl bg-brand p-3 shadow-xl">
          <div className="flex flex-col items-start gap-2 px-1 pb-3">
            <Link to="/" className="rounded-md">
              <Logo className="h-auto w-[104px] text-white" />
            </Link>
            <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
              {role}
            </span>
          </div>

          <div className="h-px bg-white/20" />

          <nav className="flex flex-col gap-1 py-3">
            {nav.map((item) => {
              const base = "flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-[14px] transition-colors";
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

          <div className="h-px bg-white/20" />

          <div className="flex items-center gap-2 px-1 pt-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold text-brand">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">{name}</p>
              <p className="truncate text-[11px] text-white/70">{email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-[14px] text-white/90 transition-colors hover:bg-white/10"
          >
            <LogOut className="size-4" />
            Abmelden
          </button>
        </div>
      </aside>

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-stretch gap-5 px-4 py-6 lg:pl-[16rem] lg:pr-5">
        <main className="min-w-0 flex-1 space-y-6">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-1 overflow-x-auto border-t border-line bg-background px-3 py-2 lg:hidden">
        {nav.filter((item) => item.to).map((item) => (
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
