import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Clock, Loader2, LogOut } from "lucide-react";
import { useEffect } from "react";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getMyAccount } from "@/lib/roles.functions";

export const Route = createFileRoute("/_authenticated/weiterleitung")({
  head: () => ({
    meta: [
      { title: "Anmeldung wird geprüft — HEIZKING" },
      { name: "description", content: "Interner Zwischenschritt nach der Anmeldung." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Anmeldung wird geprüft — HEIZKING" },
      { property: "og:description", content: "Interner Zwischenschritt nach der Anmeldung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RedirectPage,
});

function RedirectPage() {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => fetchAccount({}),
    retry: 1,
  });

  useEffect(() => {
    if (!data) return;
    if (data.role === "admin") navigate({ to: "/admin", replace: true });
    else if (data.role === "caller") navigate({ to: "/admin/bestellungen", replace: true });
  }, [data, navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isPending || data?.role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-5">
      <div className="w-full max-w-md rounded-xl border border-line bg-card p-8 text-center shadow-sm">
        <Logo className="mx-auto h-auto w-[110px] text-smava-logo" />
        <span className="mx-auto mt-6 flex size-12 items-center justify-center rounded-full bg-brand-soft">
          <Clock className="size-6 text-brand-hover" />
        </span>
        <h1 className="mt-5 text-[20px] font-bold text-hero-text">
          Dein Zugang wartet auf Freischaltung
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-conditions">
          Dein Konto ({data?.email ?? "unbekannt"}) ist angelegt. Ein Admin muss dir noch die Rolle
          Admin oder Caller zuweisen. Danach steht dir dein Arbeitsbereich zur Verfügung.
        </p>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="mt-6 border-line text-conditions"
        >
          <LogOut className="size-4" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}
