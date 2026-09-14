import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/app/app-shell";
import { getApplicationAdmin } from "@/lib/applications.functions";
import { GROUPS, formatBytes, formatValue } from "@/lib/application-fields";

export const Route = createFileRoute("/_authenticated/admin/antrag/$applicationId")({
  head: () => ({
    meta: [
      { title: "Antragsdetails — smava" },
      { name: "description", content: "Alle Angaben und Dokumente einer Kreditanfrage." },
      { property: "og:title", content: "Antragsdetails — smava" },
      { property: "og:description", content: "Alle Angaben und Dokumente einer Kreditanfrage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminApplicationPage,
});

function AdminApplicationPage() {
  const { applicationId } = Route.useParams();
  const detail = useQuery({
    queryKey: ["admin-application", applicationId],
    queryFn: () => getApplicationAdmin({ applicationId }),
  });

  const documents = detail.data?.documents ?? [];
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDocId((prev) =>
      prev && documents.some((d) => d.id === prev) ? prev : (documents[0]?.id ?? null),
    );
  }, [documents]);

  const app = detail.data?.application ?? null;
  const doc = documents.find((d) => d.id === selectedDocId) ?? documents[0] ?? null;

  const customer = app
    ? [app.first_name, app.last_name].filter(Boolean).join(" ") || app.email || "—"
    : "—";

  const sections: [string, typeof documents][] = [
    ["Gehaltsabrechnungen", documents.filter((d) => d.kind === "gehaltsabrechnung")],
    ["Kontoauszüge", documents.filter((d) => d.kind !== "gehaltsabrechnung")],
  ];

  return (
    <AppShell
      title={`Antrag ${applicationId.slice(0, 8).toUpperCase()}`}
      subtitle={customer}
      badge="Administrator"
    >
      <Link to="/admin" className="text-[13.5px] font-medium text-[#39a949] hover:underline">
        ← Zurück zum Admin-Panel
      </Link>

      {detail.isPending ? (
        <p className="mt-6 text-[14px] text-[#5b5b5b]">Wird geladen …</p>
      ) : !app ? (
        <p className="mt-6 text-[14px] text-[#5b5b5b]">Dieser Antrag wurde nicht gefunden.</p>
      ) : (
        <>
          <section className="mt-4 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[18px] font-medium text-[#323232]">Übersicht</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Kunde", customer],
                ["E-Mail", app.email ?? "—"],
                ["Telefon", app.phone ?? "—"],
                ["Eingegangen am", new Date(app.created_at).toLocaleDateString("de-DE")],
                ["Status", app.status ?? "—"],
                ["Bank", app.bank_name ?? "—"],
                ["Kreditbetrag", app.amount ? `${app.amount.toLocaleString("de-DE")} €` : "—"],
                ["Laufzeit", app.term_months ? `${app.term_months} Monate` : "—"],
                [
                  "Effektivzins",
                  app.eff_rate === null ? "—" : `${Number(app.eff_rate).toFixed(2).replace(".", ",")} %`,
                ],
                [
                  "Monatsrate",
                  app.monthly_rate === null
                    ? "—"
                    : `${Number(app.monthly_rate).toLocaleString("de-DE", { maximumFractionDigits: 2 })} €`,
                ],
                [
                  "Gesamtbetrag",
                  app.total_amount === null
                    ? "—"
                    : `${Number(app.total_amount).toLocaleString("de-DE", { maximumFractionDigits: 2 })} €`,
                ],
                ["Versicherung", app.selected_insurance ?? "—"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-[#e5e7eb] p-3">
                  <p className="text-[12px] text-[#5b5b5b]">{label}</p>
                  <p className="mt-1 text-[14px] text-[#323232]">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[18px] font-medium text-[#323232]">Alle Angaben der Anfrage</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[#5b5b5b]">
                    {group.title}
                  </p>
                  <dl className="mt-2 space-y-1.5">
                    {group.fields.map(([key, label]) => (
                      <div key={String(key)} className="flex justify-between gap-4 text-[13.5px]">
                        <dt className="text-[#5b5b5b]">{label}</dt>
                        <dd className="text-right text-[#323232]">
                          {formatValue(key, app[key])}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {(app.side_jobs || app.loans) && (
              <div className="mt-6">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-[#5b5b5b]">
                  Nebentätigkeiten &amp; bestehende Kredite
                </p>
                <pre className="mt-2 overflow-x-auto bg-[#f7f7f7] p-3 text-[12px] text-[#323232]">
                  {JSON.stringify({ side_jobs: app.side_jobs, loans: app.loans }, null, 2)}
                </pre>
              </div>
            )}
          </section>

          <section className="mt-6 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-[18px] font-medium text-[#323232]">Dokumente</h2>
            {documents.length === 0 ? (
              <p className="mt-4 text-[14px] text-[#5b5b5b]">
                Für diesen Antrag wurden noch keine Dokumente hochgeladen.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-[280px_1fr]">
                <div className="rounded-[8px] border border-[#e5e7eb] p-3">
                  {sections.map(([title, items]) =>
                    items.length === 0 ? null : (
                      <div key={title} className="mb-4 last:mb-0">
                        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#5b5b5b]">
                          {title}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {items.map((item) => (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => setSelectedDocId(item.id)}
                                className={`w-full rounded-[6px] px-3 py-2 text-left text-[13.5px] transition-colors ${
                                  doc?.id === item.id
                                    ? "bg-[#eef8ef] text-[#1b5426]"
                                    : "text-[#323232] hover:bg-[#f5f6f7]"
                                }`}
                              >
                                <span className="block truncate">{item.fileName}</span>
                                <span className="mt-0.5 block text-[12px] text-[#5b5b5b]">
                                  {new Date(item.createdAt).toLocaleDateString("de-DE")}
                                  {formatBytes(item.fileSize)
                                    ? ` · ${formatBytes(item.fileSize)}`
                                    : ""}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>

                <div className="flex min-h-[480px] flex-col rounded-[8px] border border-[#e5e7eb]">
                  <div className="min-h-0 flex-1 overflow-auto rounded-t-[8px] bg-[#f5f6f7] p-4">
                    {!doc ? (
                      <p className="text-[14px] text-[#5b5b5b]">Keine Datei ausgewählt.</p>
                    ) : !doc.url ? (
                      <p className="text-[14px] text-[#c0392b]">
                        Vorschau nicht verfügbar – die Datei konnte nicht geladen werden.
                      </p>
                    ) : (doc.mimeType ?? "").startsWith("image/") ? (
                      <img
                        src={doc.url}
                        alt={doc.fileName}
                        className="mx-auto max-w-full rounded-[6px] bg-white shadow-sm"
                      />
                    ) : (doc.mimeType ?? "").includes("pdf") ||
                      doc.fileName.toLowerCase().endsWith(".pdf") ? (
                      <iframe
                        src={doc.url}
                        title={doc.fileName}
                        className="h-full min-h-[420px] w-full rounded-[6px] bg-white"
                      />
                    ) : (
                      <p className="text-[14px] text-[#5b5b5b]">
                        Für dieses Dateiformat ist keine Vorschau möglich. Bitte laden Sie die
                        Datei herunter.
                      </p>
                    )}
                  </div>

                  {doc?.url ? (
                    <div className="flex flex-wrap items-center gap-4 border-t border-[#e5e7eb] px-4 py-3">
                      <span className="min-w-0 flex-1 truncate text-[13.5px] text-[#323232]">
                        {doc.fileName}
                      </span>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-medium text-[#39a949] hover:underline"
                      >
                        In neuem Tab öffnen
                      </a>
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        className="text-[13px] font-medium text-[#39a949] hover:underline"
                      >
                        Herunterladen
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </AppShell>
  );
}
