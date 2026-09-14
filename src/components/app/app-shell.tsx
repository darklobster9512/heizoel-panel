import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/mock-auth";

export function AppShell({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <header className="bg-white shadow-header-strong">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" aria-label="Zur Startseite">
            <Logo className="h-auto w-[104px] text-smava-logo md:w-[124px]" />
          </Link>
          <div className="flex items-center gap-3">
            {badge ? (
              <span className="hidden rounded-[4px] bg-[#eff8f1] px-2.5 py-1 text-[12px] font-medium text-[#39a949] sm:inline-block">
                {badge}
              </span>
            ) : null}
            <Button variant="outline" onClick={handleSignOut} className="h-9 text-[14px]">
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-[24px] font-medium text-[#323232] md:text-[30px]">{title}</h1>
        {subtitle ? <p className="mt-1 text-[15px] text-[#5b5b5b]">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
