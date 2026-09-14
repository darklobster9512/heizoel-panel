import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AppShell } from "@/components/app/app-shell";
import { Progress } from "@/components/ui/progress";
import { getMyAccount } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Mein Kundenbereich — smava" },
      { name: "description", content: "Übersicht über Ihre Kreditanfragen und Ihr smava Konto." },
      { property: "og:title", content: "Mein Kundenbereich — smava" },
      { property: "og:description", content: "Übersicht über Ihre Kreditanfragen und Ihr smava Konto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const requests = [
  { id: "KR-100482", purpose: "Umschuldung", amount: "15.000 €", term: "48 Monate", rate: "329,40 €", status: "In Prüfung", progress: 60 },
  { id: "KR-100317", purpose: "Autokredit", amount: "24.500 €", term: "60 Monate", rate: "441,10 €", status: "Angebot erhalten", progress: 80 },
  { id: "KR-100108", purpose: "Modernisierung", amount: "8.000 €", term: "36 Monate", rate: "234,70 €", status: "Abgeschlossen", progress: 100 },
];

function DashboardPage() {
  const { data, isPending } = useQuery({ queryKey: ["account"], queryFn: () => getMyAccount() });
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.role === "admin") {
      navigate({ to: "/admin", replace: true });
    }
  }, [data?.role, navigate]);

  return (
    <AppShell
      title={isPending ? "Willkommen" : `Willkommen, ${data?.email ?? "Kunde"}`}
      subtitle="Hier sehen Sie den Status Ihrer Kreditanfragen. (Beispieldaten)"
      badge="Kundenkonto"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Offene Anfragen", value: "2" },
          { label: "Beste Kondition", value: "4,29 % eff." },
          { label: "Angefragtes Volumen", value: "47.500 €" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 shadow-sm">
            <p className="text-[13px] text-[#5b5b5b]">{kpi.label}</p>
            <p className="mt-1 text-[24px] font-medium text-[#323232]">{kpi.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[18px] font-medium text-[#323232]">Meine Kreditanfragen</h2>
        <ul className="mt-4 space-y-4">
          {requests.map((r) => (
            <li key={r.id} className="border border-[#e5e7eb] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[15px] font-medium text-[#323232]">
                    {r.purpose} · {r.amount}
                  </p>
                  <p className="text-[13px] text-[#5b5b5b]">
                    {r.id} · {r.term} · mtl. {r.rate}
                  </p>
                </div>
                <span className="bg-[#eff8f1] px-2.5 py-1 text-[12px] font-medium text-[#39a949]">
                  {r.status}
                </span>
              </div>
              <Progress value={r.progress} className="mt-3 h-1.5" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[18px] font-medium text-[#323232]">Meine Daten</h2>
        <dl className="mt-4 grid gap-3 text-[14px] sm:grid-cols-2">
          <div>
            <dt className="text-[#5b5b5b]">E-Mail</dt>
            <dd className="text-[#323232]">{data?.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[#5b5b5b]">Rolle</dt>
            <dd className="text-[#323232]">{data?.role === "admin" ? "Administrator" : "Nutzer"}</dd>
          </div>
          <div>
            <dt className="text-[#5b5b5b]">Kunde seit</dt>
            <dd className="text-[#323232]">
              {data?.createdAt ? new Date(data.createdAt).toLocaleDateString("de-DE") : "—"}
            </dd>
          </div>
        </dl>
      </section>
    </AppShell>
  );
}
