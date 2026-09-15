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
      <header className="sticky top-0 z-40 border-b border-line bg-background">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 pl-3 pr-5">
          <div className="flex items-center gap-3">
            <Link to="/" className="rounded-md">
              <Logo className="h-auto w-[100px] text-smava-logo" />
            </Link>
            <span className="hidden rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold tracking-wide text-conditions uppercase sm:inline">
              {role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-semibold text-conditions">{name}</p>
              <p className="text-[12px] text-muted-custom">{email}</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-[12px] font-bold text-brand-hover">
              {initials}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-line text-[13px] text-conditions"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Abmelden</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1440px] items-stretch gap-5 px-4 py-6 lg:pl-0 lg:pr-5">
        <aside className="hidden w-max shrink-0 lg:block">
          <div className="sticky top-[50vh] w-max -translate-y-1/2 rounded-r-2xl rounded-l-none bg-brand p-2 shadow-xl">
            <nav className="flex flex-col gap-1">
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
          </div>
        </aside>

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
