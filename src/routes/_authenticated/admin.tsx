import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app/app-shell";
import { BanksAdmin } from "@/components/app/banks-admin";
import { listApplicationDocumentsAdmin, listLoanApplications } from "@/lib/applications.functions";
import { getMyAccount, listAllUsers } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin-Panel — smava" },
      { name: "description", content: "Interne Verwaltung von Nutzern und Kreditanfragen." },
      { property: "og:title", content: "Admin-Panel — smava" },
      { property: "og:description", content: "Interne Verwaltung von Nutzern und Kreditanfragen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const account = useQuery({ queryKey: ["account"], queryFn: () => getMyAccount() });
  const isAdmin = account.data?.role === "admin";

  useEffect(() => {
    if (account.data && !isAdmin) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [account.data, isAdmin, navigate]);

  const users = useQuery({
    queryKey: ["all-users"],
    queryFn: () => listAllUsers(),
    enabled: isAdmin,
  });

  const apps = useQuery({
    queryKey: ["loan-applications"],
    queryFn: () => listLoanApplications(),
    enabled: isAdmin,
  });

  const docs = useQuery({
    queryKey: ["application-documents-admin"],
    queryFn: () => listApplicationDocumentsAdmin(),
    enabled: isAdmin,
  });

  const [tab, setTab] = useState<"users" | "apps" | "banks" | "docs">("users");



  return (
    <AppShell
      title="Admin-Panel"
      subtitle="Verwaltung von Nutzern und Kreditanfragen."
      badge="Administrator"
    >
      {!isAdmin ? (
        <p className="text-[15px] text-[#5b5b5b]">Zugriff wird geprüft …</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Registrierte Nutzer", value: String(users.data?.length ?? "—") },
              { label: "Kreditanfragen", value: String(apps.data?.length ?? "—") },
              { label: "Vermitteltes Volumen", value: "53.000 €" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white p-5 shadow-sm">
                <p className="text-[13px] text-[#5b5b5b]">{kpi.label}</p>
                <p className="mt-1 text-[24px] font-medium text-[#323232]">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2 border-b border-[#e5e7eb]">
            {(
              [
                ["users", "Nutzer"],
                ["apps", "Kreditanfragen"],
                ["banks", "Banken"],
                ["docs", "Dokumente"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`-mb-px border-b-2 px-4 py-2 text-[14px] transition-colors ${
                  tab === key
                    ? "border-[#39a949] font-medium text-[#323232]"
                    : "border-transparent text-[#5b5b5b] hover:text-[#323232]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "banks" && <div className="mt-6"><BanksAdmin /></div>}

          {tab === "docs" && (
            <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-[18px] font-medium text-[#323232]">
                Hochgeladene Dokumente
              </h2>
              {docs.isPending ? (
                <p className="mt-4 text-[14px] text-[#5b5b5b]">Wird geladen …</p>
              ) : (docs.data ?? []).length === 0 ? (
                <p className="mt-4 text-[14px] text-[#5b5b5b]">
                  Es wurden noch keine Dokumente hochgeladen.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {(docs.data ?? []).map((group) => {
                    const salary = group.documents.filter(
                      (d) => d.kind === "gehaltsabrechnung",
                    ).length;
                    const statements = group.documents.length - salary;
                    return (
                      <Link
                        key={group.applicationId}
                        to="/admin/antrag/$applicationId"
                        params={{ applicationId: group.applicationId }}
                        className="block w-full rounded-[8px] border border-[#e5e7eb] p-4 text-left transition-colors hover:border-[#39a949]"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-[15px] font-medium text-[#323232]">
                            {group.customer}
                            {group.email ? (
                              <span className="ml-2 text-[13px] text-[#5b5b5b]">{group.email}</span>
                            ) : null}
                          </p>
                          <p className="text-[13px] text-[#5b5b5b]">
                            {group.bankName ?? "—"}
                            {group.amount ? ` · ${group.amount.toLocaleString("de-DE")} €` : ""} ·
                            Antrag {group.applicationId.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                        <p className="mt-2 text-[13.5px] text-[#5b5b5b]">
                          {salary} Gehaltsabrechnung{salary === 1 ? "" : "en"} · {statements}{" "}
                          Kontoauszug{statements === 1 ? "" : "e"}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          )}



          {tab === "users" && (
          <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[18px] font-medium text-[#323232]">Nutzer</h2>
            <div className="mt-4 overflow-x-auto">

              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#e5e7eb] text-[13px] text-[#5b5b5b]">
                    <th className="py-2 pr-4 font-medium">E-Mail</th>
                    <th className="py-2 pr-4 font-medium">Rolle</th>
                    <th className="py-2 font-medium">Registriert am</th>
                  </tr>
                </thead>
                <tbody>
                  {users.isPending ? (
                    <tr>
                      <td colSpan={3} className="py-3 text-[#5b5b5b]">
                        Wird geladen …
                      </td>
                    </tr>
                  ) : (
                    (users.data ?? []).map((u) => (
                      <tr key={u.id} className="border-b border-[#f0f1f2] last:border-0">
                        <td className="py-3 pr-4 text-[#323232]">{u.email ?? "—"}</td>
                        <td className="py-3 pr-4">
                          <span
                            className={
                              u.role === "admin"
                                ? "bg-[#eff8f1] px-2 py-1 text-[12px] font-medium text-[#39a949]"
                                : "bg-[#f3f4f6] px-2 py-1 text-[12px] font-medium text-[#5b5b5b]"
                            }
                          >
                            {u.role === "admin" ? "Administrator" : "Nutzer"}
                          </span>
                        </td>
                        <td className="py-3 text-[#5b5b5b]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString("de-DE") : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
          )}

          {tab === "apps" && (
          <section className="mt-6 bg-white p-5 shadow-sm md:p-6">

            <h2 className="text-[18px] font-medium text-[#323232]">Kreditanfragen</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#e5e7eb] text-[13px] text-[#5b5b5b]">
                    <th className="py-2 pr-4 font-medium">Datum</th>
                    <th className="py-2 pr-4 font-medium">Kunde</th>
                    <th className="py-2 pr-4 font-medium">Zweck</th>
                    <th className="py-2 pr-4 font-medium">Betrag</th>
                    <th className="py-2 font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.isPending ? (
                    <tr>
                      <td colSpan={5} className="py-3 text-[#5b5b5b]">
                        Wird geladen …
                      </td>
                    </tr>
                  ) : (apps.data ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 text-[#5b5b5b]">
                        Noch keine Kreditanfragen vorhanden.
                      </td>
                    </tr>
                  ) : (
                    (apps.data ?? []).map((a) => (
                      <tr key={a.id} className="border-b border-[#f0f1f2] last:border-0">
                        <td className="py-3 pr-4 text-[#5b5b5b]">
                          {new Date(a.created_at).toLocaleDateString("de-DE")}
                        </td>
                        <td className="py-3 pr-4 text-[#323232]">
                          {[a.first_name, a.last_name].filter(Boolean).join(" ") || a.email || "—"}
                        </td>
                        <td className="py-3 pr-4 text-[#5b5b5b]">{a.purpose ?? "—"}</td>
                        <td className="py-3 pr-4 text-[#323232]">
                          {a.amount ? `${a.amount.toLocaleString("de-DE")} €` : "—"}
                        </td>
                        <td className="py-3">
                          <Link
                            to="/admin/antrag/$applicationId"
                            params={{ applicationId: a.id }}
                            className="text-[13px] font-medium text-[#39a949] hover:underline"
                          >
                            anzeigen
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </section>
          )}
        </>

      )}
    </AppShell>
  );
}
