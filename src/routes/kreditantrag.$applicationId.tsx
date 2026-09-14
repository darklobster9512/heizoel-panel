import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  AtSign,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileSignature,
  FileText,
  FileUp,
  HelpCircle,
  IdCard,
  Landmark,
  Loader2,
  Mail,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";

import { Logo } from "@/components/landing/logo";
import { WizardFooter } from "@/components/wizard/ui";
import { bankLogoSrc } from "@/lib/bank-logos";
import {
  deleteApplicationDocument,
  getApplication,
  listApplicationDocuments,
  registerApplicationDocument,
  submitApplicationDocuments,
  type ApplicationSummary,
} from "@/lib/application.functions";

export const Route = createFileRoute("/kreditantrag/$applicationId")({
  head: () => ({
    meta: [
      { title: "Ihr Kreditantrag – Dokumente hochladen | smava" },
      {
        name: "description",
        content:
          "Laden Sie Ihre Gehaltsabrechnungen und Kontoauszüge hoch und schließen Sie Ihren Kreditantrag online ab.",
      },
      { property: "og:title", content: "Ihr Kreditantrag – Dokumente hochladen | smava" },
      {
        property: "og:description",
        content: "Dokumente hochladen und Kreditantrag online abschließen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ApplicationPage,
});

const ACCEPT = ".pdf,.jpg,.jpeg,.png,.tif,.tiff,.heic";
const MAX_SIZE = 10 * 1024 * 1024;

const REQUIRED_DOCS = 3;

const KINDS = [
  {
    key: "gehaltsabrechnung",
    title: "Gehaltsabrechnung",
    subtitle: "Die letzten drei Gehaltsabrechnungen",
  },
  {
    key: "kontoauszug",
    title: "Kontoauszüge",
    subtitle: "fortlaufende Kontoauszüge der letzten 3 Monate",
  },
] as const;

function formatEuro(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined) return "—";
  return `${value.toLocaleString("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

function formatSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toLocaleString("de-DE", { maximumFractionDigits: 1 })} MB`;
}

function ApplicationPage() {
  const { applicationId } = Route.useParams();
  const queryClient = useQueryClient();

  const application = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => getApplication({ id: applicationId }),
  });

  const documents = useQuery({
    queryKey: ["application-documents", applicationId],
    queryFn: () => listApplicationDocuments({ applicationId }),
  });

  const [tab, setTab] = useState<"dokumente" | "signatur" | "auszahlung">("dokumente");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const submit = useMutation({
    mutationFn: () => submitApplicationDocuments({ applicationId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["application", applicationId] }),
  });

  const app = application.data;
  const submitted = app?.status === "dokumente_eingereicht";
  const logo = app ? bankLogoSrc(app.bankLogoKey, null) : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f6]">
      <header className="sticky top-0 z-20 bg-white shadow-header-strong">
        <div className="mx-auto flex h-[58px] max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link to="/" aria-label="smava Startseite" className="text-smava-logo">
            <Logo className="h-8 w-auto" />
          </Link>
          <span className="flex items-center gap-2 text-[15px] text-[#323232]">
            <HelpCircle className="size-[18px] text-[#5b5b5b]" />
            Hilfe und Support
          </span>
        </div>
      </header>

      <main className={`flex-1 transition-[padding] ${detailsOpen ? "lg:pr-[440px]" : ""}`}>
        <div className="mx-auto w-full max-w-[790px] px-4 pb-10">
          <Link
            to="/angebote"
            className="mt-5 inline-flex items-center gap-2 text-[14px] text-[#5b5b5b] hover:text-[#323232]"
          >
            <ArrowLeft className="size-4" />
            zurück zu den Angeboten
          </Link>

          {application.isPending ? (
            <p className="mt-6 bg-white p-5 text-[15px] text-[#5b5b5b]">Antrag wird geladen …</p>
          ) : !app ? (
            <p className="mt-6 bg-white p-5 text-[15px] text-[#5b5b5b]">
              Dieser Antrag wurde nicht gefunden. Bitte starten Sie erneut über die
              Angebotsübersicht.
            </p>
          ) : (
            <>
              {/* Angebotskarte */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Kreditinformationen öffnen"
                onClick={() => setDetailsOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setDetailsOpen(true);
                  }
                }}
                className="group mt-3 cursor-pointer rounded-[8px] border border-[#e6e7e8] bg-white outline-none transition-colors hover:border-brand focus-visible:border-brand"
              >
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="min-w-0 flex-1">
                    {logo ? (
                      <img
                        src={logo}
                        alt={app.bankName ?? "Bank"}
                        className={
                          app.bankLogoKey === "dkb"
                            ? "h-9 w-auto object-contain object-left"
                            : "h-6 w-auto object-contain object-left"
                        }
                      />
                    ) : (
                      <p className="text-[17px] font-semibold text-[#323232]">
                        {app.bankName ?? "Ihre Bank"}
                      </p>
                    )}

                    <div className="mt-5 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
                      <Fact value={formatEuro(app.amount)} label="Kreditbetrag" />
                      <Fact value={`${app.termMonths ?? "—"}`} label="Monate" />
                      <Fact
                        value={
                          app.effRate === null
                            ? "—"
                            : `${app.effRate.toLocaleString("de-DE", {
                                minimumFractionDigits: 2,
                              })} %`
                        }
                        label="Zins (eff.)"
                      />
                      <Fact value={formatEuro(app.monthlyRate, 2)} label="mtl. Rate" />
                    </div>
                  </div>
                   <ChevronRight className="size-6 shrink-0 text-[#9a9a9a] transition-colors group-hover:text-brand" />
                </div>

              </div>

              {/* Letzter Schritt */}
              <div className="mt-6 rounded-[8px] bg-white px-6 pb-8 pt-7 md:px-10">
                <h1 className="text-[22px] font-bold leading-[1.3] text-[#323232]">
                  Letzter Schritt und Ihr Geld ist auf dem Weg
                </h1>

                <div className="mt-4 grid grid-cols-3 border-b border-[#e6e7e8]">
                  {(
                    [
                      ["dokumente", "DOKUMENTE", <FileUp key="a" className="size-5" />, false],
                      ["signatur", "SIGNATUR", <FileSignature key="b" className="size-5" />, true],
                      [
                        "auszahlung",
                        "AUSZAHLUNG",
                        <CircleDollarSign key="c" className="size-5" />,
                        true,
                      ],
                    ] as const
                  ).map(([key, label, icon, disabled]) => (
                    <button
                      key={key}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && setTab(key)}
                      className={`-mb-px flex flex-col items-center gap-2 border-b-2 pb-3 pt-2 text-[13px] tracking-[0.6px] ${
                        disabled
                          ? "cursor-default border-transparent text-[#c0c0c0]"
                          : tab === key
                            ? "border-brand text-brand"
                            : "border-transparent text-[#9a9a9a] transition-colors hover:text-[#5b5b5b]"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>

                {tab === "dokumente" && submitted && (
                  <div className="mt-6">
                    <div className="flex flex-col items-center rounded-[8px] border border-[#c9e2cd] bg-[#f4fbf5] px-6 py-8 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-brand text-white">
                        <Check className="size-7" />
                      </span>
                      <h2 className="mt-4 text-[19px] font-bold text-[#323232]">
                        Vielen Dank! Ihre Dokumente wurden übermittelt.
                      </h2>
                      <p className="mt-2 max-w-[460px] text-[15px] leading-[1.5] text-[#5b5b5b]">
                        Ihre Unterlagen befinden sich jetzt in Prüfung. Wir melden uns in Kürze bei
                        Ihnen.
                      </p>
                      <p className="mt-4 text-[13px] text-[#9a9a9a]">
                        Antragsnummer: {applicationId}
                      </p>
                      <p className="mt-1 text-[13px] text-[#9a9a9a]">
                        Sie können diese Seite jederzeit über den Link wieder aufrufen.
                      </p>
                    </div>

                    <h3 className="mt-7 text-[15px] font-bold text-[#323232]">
                      Übermittelte Dokumente
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {(documents.data ?? []).map((doc) => (
                        <li
                          key={doc.id}
                          className="flex items-center gap-2 rounded-[6px] bg-[#f7f8f9] px-3 py-2 text-[14px] text-[#323232]"
                        >
                          <FileText className="size-4 shrink-0 text-[#9a9a9a]" />
                          <span className="truncate">{doc.fileName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tab === "dokumente" && !submitted && (
                  <div className="mt-6">
                    <h2 className="text-[19px] font-bold text-[#323232]">Dokumente einreichen</h2>

                    <div className="mt-4 space-y-5">
                      {KINDS.map((kind) => (
                        <UploadSection
                          key={kind.key}
                          applicationId={applicationId}
                          kind={kind.key}
                          title={kind.title}
                          subtitle={kind.subtitle}
                          documents={(documents.data ?? []).filter((d) => d.kind === kind.key)}
                          onChanged={() =>
                            queryClient.invalidateQueries({
                              queryKey: ["application-documents", applicationId],
                            })
                          }
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={
                        submit.isPending ||
                        !KINDS.every(
                          (k) =>
                            (documents.data ?? []).filter((d) => d.kind === k.key).length >=
                            REQUIRED_DOCS,
                        )
                      }
                      onClick={() => submit.mutate()}
                      className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[2px] border border-[#c9e2cd] bg-white py-3 text-[14px] font-medium text-brand transition-colors hover:bg-[#f4fbf5] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submit.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <>
                          Dokumente einreichen
                          <ChevronRight className="size-4" />
                        </>
                      )}
                    </button>

                    <div className="mt-5 flex flex-wrap items-center justify-around gap-4">
                      <ActionLink
                        icon={<AtSign className="size-[18px]" />}
                        label="An E-Mail senden und später fortfahren"
                        green
                      />
                    </div>
                  </div>
                )}

                {tab === "signatur" && (
                  <div className="mt-6">
                    <h2 className="flex items-baseline gap-2 text-[19px] font-bold text-[#323232]">
                      Signatur mit
                      <span className="text-[20px] font-extrabold tracking-tight text-[#1b1b1b]">
                        WebID
                      </span>
                    </h2>

                    <div className="mt-4 space-y-4">
                      <SignRow
                        icon={<IdCard className="size-5" />}
                        text="Ausweis/Reisepass bereithalten"
                      />
                      <SignRow
                        icon={<Video className="size-5" />}
                        text="Per Video-Anruf identifizieren"
                      />
                      <SignRow
                        icon={<FileSignature className="size-5" />}
                        text="Vertrag digital unterschreiben"
                      />
                    </div>

                    <p className="mt-6 text-[13.5px] font-bold leading-[1.6] text-[#5b5b5b]">
                      Die Identifikation und Signatur wird im Auftrag der{" "}
                      {app.bankName ?? "Bank"} durch unseren Partner die WebID GmbH durchgeführt.
                    </p>
                    <p className="mt-3 text-[13.5px] leading-[1.6] text-[#9a9a9a]">
                      Für die Identifikation und die anschließende Vertragsunterzeichnung senden wir
                      entsprechend der{" "}
                      <span className="text-brand underline underline-offset-2">
                        Datenschutzerklärung
                      </span>{" "}
                      Ihre Antragsdaten an die WebID GmbH.
                    </p>

                    <button
                      type="button"
                      className="mt-5 w-full cursor-pointer rounded-[2px] border-0 bg-[rgb(57,169,73)] py-4 text-[14px] font-bold leading-[22px] text-white transition-colors hover:bg-brand-hover"
                    >
                      Zur digitalen Unterschrift
                    </button>

                    <div className="mt-6 flex items-center gap-4">
                      <span className="h-px flex-1 bg-[#e6e7e8]" />
                      <span className="text-[14px] text-[#5b5b5b]">oder</span>
                      <span className="h-px flex-1 bg-[#e6e7e8]" />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-around gap-4">
                      <ActionLink
                        icon={<AtSign className="size-[18px]" />}
                        label="An E-Mail senden und später fortfahren"
                        green
                      />
                      <ActionLink
                        icon={<Mail className="size-[18px]" />}
                        label="Unterschreiben und per Post senden"
                        green
                      />
                    </div>
                  </div>
                )}

                {tab === "auszahlung" && (
                  <div className="mt-6 space-y-4">
                    <p className="text-[15px] leading-[1.6] text-[#323232]">
                      Nach erfolgreicher Prüfung überweist Ihnen{" "}
                      <strong className="font-semibold">{app.bankName ?? "Ihre Bank"}</strong> den
                      Kreditbetrag von {formatEuro(app.amount)} auf Ihr angegebenes Konto.
                    </p>
                    <div className="space-y-4">
                      <SignRow
                        icon={<CircleDollarSign className="size-5" />}
                        text="Auszahlung meist innerhalb weniger Werktage"
                      />
                      <SignRow
                        icon={<FileText className="size-5" />}
                        text={`Monatliche Rate: ${formatEuro(app.monthlyRate, 2)} über ${
                          app.termMonths ?? "—"
                        } Monate`}
                      />
                      <SignRow
                        icon={<FileText className="size-5" />}
                        text={`Gesamtbetrag: ${formatEuro(app.totalAmount, 2)}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {app && detailsOpen ? (
        <ApplicationDetailsPanel app={app} logo={logo} onClose={() => setDetailsOpen(false)} />
      ) : null}

      <WizardFooter />
    </div>
  );
}

function ApplicationDetailsPanel({
  app,
  logo,
  onClose,
}: {
  app: ApplicationSummary;
  logo: string | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"info" | "kosten">("info");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const bank = app.bank;
  const docs = (bank?.documents ?? "Kontoauszug, Gehaltsabrechnung")
    .split(",")
    .map((document) => document.trim())
    .filter(Boolean);
  const interest = Math.max(0, (app.totalAmount ?? 0) - (app.amount ?? 0));

  return (
    <aside
      aria-label="Kreditdetails"
      className="fixed inset-y-0 right-0 z-40 flex w-full flex-col bg-white sm:w-[440px] lg:top-[58px]"
    >
      <div className="relative flex h-[56px] shrink-0 items-center justify-center border-b border-[#e6e7e8] px-5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Schließen"
          className="absolute left-4 grid size-7 cursor-pointer place-items-center rounded-md border border-[#e6e7e8] bg-white text-[#777] shadow-sm transition-colors hover:text-[#323232]"
        >
          <X className="size-4" />
        </button>
        {logo ? (
          <img
            src={logo}
            alt={app.bankName ?? "Bank"}
            className={app.bankLogoKey === "dkb" ? "h-7 w-auto object-contain" : "h-5 w-auto object-contain"}
          />
        ) : (
          <span className="text-[15px] font-semibold text-[#323232]">{app.bankName}</span>
        )}
      </div>

      <div className="mt-3 grid shrink-0 grid-cols-2">
        <DetailTab active={tab === "info"} onClick={() => setTab("info")}>Kreditinformationen</DetailTab>
        <DetailTab active={tab === "kosten"} onClick={() => setTab("kosten")}>Finanzierungskosten</DetailTab>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "info" ? (
          <>
            <div className="border-b border-[#dfe3e6] px-7 py-5 text-[14px] text-[#323232]">
              <strong className="font-bold">Auszahlung</strong>{" "}
              {bank?.payoutDays === 0 ? "sofort" : `in ${bank?.payoutDays ?? 5} Tagen`}
            </div>

            <DetailSection title={`Nur ${docs.length} Dokumente benötigt`}>
              {docs.map((document, index) => (
                <DetailIconRow
                  key={document}
                  icon={index === 0 ? <Landmark className="size-[19px]" /> : <FileText className="size-[19px]" />}
                  text={document}
                />
              ))}
            </DetailSection>

            <DetailSection title="Sie können online">
              <DetailCheckRow text="Dokumente hochladen" enabled={bank?.onlineUpload ?? true} />
              <DetailCheckRow
                text="Legitimation durchführen und unterschreiben"
                enabled={bank?.onlineId ?? true}
              />
            </DetailSection>

            <DetailSection title="Ihre Sonderkonditionen">
              <DetailCheckRow
                text="Kostenlose Sondertilgung"
                enabled={bank?.freeSpecialRepayment ?? true}
              />
              <DetailCheckRow
                text="Kostenlose Gesamttilgung"
                enabled={bank?.freeFullRepayment ?? false}
              />
              <DetailCheckRow text="Ratenpause" enabled={bank?.paymentBreak ?? true} />
            </DetailSection>

            <DetailSection title="Online-Kredit von">
              <p className="text-[14px] leading-[1.55] text-[#323232]">
                {bank?.companyName ?? app.bankName ?? "Ihre Bank"}
                {bank?.street ? <><br />{bank.street}</> : null}
                {bank?.zip || bank?.city ? <><br />{[bank.zip, bank.city].filter(Boolean).join(" ")}</> : null}
              </p>
            </DetailSection>
          </>
        ) : (
          <dl className="divide-y divide-[#e6e7e8] px-7 py-3">
            <DetailCostRow label="Kreditbetrag" value={formatEuro(app.amount)} />
            <DetailCostRow label="Laufzeit" value={`${app.termMonths ?? "—"} Monate`} />
            <DetailCostRow
              label="Effektiver Jahreszins"
              value={app.effRate === null ? "—" : `${app.effRate.toLocaleString("de-DE", { minimumFractionDigits: 2 })} %`}
            />
            <DetailCostRow label="Monatliche Rate" value={formatEuro(app.monthlyRate, 2)} />
            <DetailCostRow label="Gesamtbetrag" value={formatEuro(app.totalAmount, 2)} />
            <DetailCostRow label="Zinskosten" value={formatEuro(interest, 2)} />
          </dl>
        )}
      </div>

      <div className="grid shrink-0 grid-cols-2 border-y border-[#dfe3e6] bg-white">
        <button type="button" className="flex h-[52px] items-center justify-center gap-2 text-[13px] text-brand hover:bg-[#f7faf7]">
          <Download className="size-4" /> Download
        </button>
        <button type="button" className="flex h-[52px] items-center justify-center gap-2 text-[13px] text-brand hover:bg-[#f7faf7]">
          <Mail className="size-4" /> Per Post
        </button>
      </div>
    </aside>
  );
}

function DetailTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[56px] cursor-pointer border-b-[3px] text-[13px] transition-colors ${active ? "border-brand bg-white font-semibold text-[#323232]" : "border-transparent bg-[#f4f5f6] text-[#5b5b5b]"}`}
    >
      {children}
    </button>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#dfe3e6] px-7 py-5">
      <h2 className="text-[14px] font-bold text-[#323232]">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function DetailIconRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-center gap-4 text-[#666]"><span>{icon}</span><span className="text-[14px] text-[#323232]">{text}</span></div>;
}

function DetailCheckRow({ text, enabled }: { text: string; enabled: boolean }) {
  return (
    <div className="flex items-center gap-4">
      {enabled ? <Check className="size-[18px] shrink-0 text-brand" strokeWidth={2} /> : <X className="size-[18px] shrink-0 text-[#e00000]" strokeWidth={2} />}
      <span className={`text-[14px] ${enabled ? "text-[#323232]" : "text-[#a3a3a3]"}`}>{text}</span>
    </div>
  );
}

function DetailCostRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-5 py-4"><dt className="text-[14px] text-[#5b5b5b]">{label}</dt><dd className="text-right text-[14px] font-semibold text-[#323232]">{value}</dd></div>;
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[16px] font-bold text-[#323232]">{value}</p>
      <p className="mt-0.5 text-[13px] text-[#9a9a9a]">{label}</p>
    </div>
  );
}

function ActionLink({
  icon,
  label,
  green,
}: {
  icon: React.ReactNode;
  label: string;
  green?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center gap-2 text-[14px] ${
        green ? "text-brand" : "text-[#323232]"
      }`}
    >
      <span className={green ? "text-brand" : "text-[#5b5b5b]"}>{icon}</span>
      {label}
    </button>
  );
}

function SignRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-brand">{icon}</span>
      <span className="text-[15px] text-[#323232]">{text}</span>
    </div>
  );
}

function UploadSection({
  applicationId,
  kind,
  title,
  subtitle,
  footer,
  documents,
  onChanged,
}: {
  applicationId: string;
  kind: string;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  documents: { id: string; fileName: string; fileSize: number | null }[];
  onChanged: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [open, setOpen] = useState(true);


  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      for (const file of files) {
        if (file.size > MAX_SIZE) {
          throw new Error(`„${file.name}" ist größer als 10 MB.`);
        }
        await registerApplicationDocument({
          applicationId,
          kind,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type || "application/octet-stream",
          url: URL.createObjectURL(file),
        });
      }
    },
    onSuccess: () => {
      setError(null);
      onChanged();
    },
    onError: (e: Error) => setError(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteApplicationDocument({ id, applicationId }),
    onSuccess: onChanged,
  });

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    upload.mutate([...list]);
  }

  return (
    <section className="rounded-[4px] bg-[#f7f8f8] px-5 pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <span className="text-[15px] font-bold text-[#323232]">
          {title} ({documents.length} von {REQUIRED_DOCS})
        </span>
        <ChevronDown
          className={`size-5 text-[#5b5b5b] transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      <p className="mt-1 text-[14px] text-brand">{subtitle}</p>
      {documents.length < REQUIRED_DOCS ? (
        <p className="mt-1 text-[13px] text-[#5b5b5b]">
          Bitte laden Sie noch {REQUIRED_DOCS - documents.length}{" "}
          {REQUIRED_DOCS - documents.length === 1 ? "Dokument" : "Dokumente"} hoch.
        </p>
      ) : null}


      {open && (
        <>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`mt-4 flex flex-col items-center justify-center gap-4 border border-dashed px-5 py-10 text-center transition-colors ${
              dragOver ? "border-brand bg-[#eff8f1]" : "border-[#c9cacb]"
            }`}
          >
            <p className="text-[15px] text-[#5b5b5b]">Sie können Ihre Dateien hier ablegen oder</p>

            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              disabled={upload.isPending}
              onClick={() => inputRef.current?.click()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[2px] border-0 bg-[rgb(57,169,73)] px-6 py-3 text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-brand-hover disabled:opacity-70"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
              }}
            >
              {upload.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              Dateien hochladen
            </button>

            <p className="text-[12px] text-[#5b5b5b]">
              JPEG, HEIC, PNG, TIFF oder PDF - Max: 10MB
            </p>
          </div>

          {error ? <p className="mt-2 text-[13px] text-[#e02b2b]">{error}</p> : null}

          {documents.length > 0 && (
            <ul className="mt-4 space-y-2">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center gap-3 border border-[#e6e7e8] bg-white px-4 py-3"
                >
                  <FileText className="size-5 shrink-0 text-[#5b5b5b]" />
                  <span className="min-w-0 flex-1 truncate text-[14px] text-[#323232]">
                    {doc.fileName}
                  </span>
                  <span className="text-[12.5px] text-[#5b5b5b]">{formatSize(doc.fileSize)}</span>
                  <button
                    type="button"
                    aria-label={`${doc.fileName} entfernen`}
                    onClick={() => remove.mutate(doc.id)}
                    className="cursor-pointer text-[#9a9a9a] transition-colors hover:text-[#e02b2b]"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="mt-4">{footer ?? <div className="h-4" />}</div>
    </section>
  );
}
