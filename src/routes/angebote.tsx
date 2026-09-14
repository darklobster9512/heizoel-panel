import { useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpDown,
  Check,
  ChevronRight,
  FileText,
  HelpCircle,
  Landmark,
  Search,
  Star,
  X,
} from "lucide-react";

import { TrustBlock, WizardFooter } from "@/components/wizard/ui";
import { Logo } from "@/components/landing/logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WizardData } from "@/lib/wizard-store";

import { useQuery } from "@tanstack/react-query";

import { bankLogoSrc } from "@/lib/bank-logos";
import { listActiveBanks, type Bank } from "@/lib/banks.functions";
import { createApplication } from "@/lib/application.functions";
import garantie from "@/assets/garantie.svg.asset.json";


export const Route = createFileRoute("/angebote")({
  head: () => ({
    meta: [
      { title: "Ihre Kreditangebote – smava" },
      {
        name: "description",
        content: "Ihre persönlichen Kreditangebote im Vergleich – kostenlos und SCHUFA-neutral.",
      },
      { property: "og:title", content: "Ihre Kreditangebote – smava" },
      {
        property: "og:description",
        content: "Ihre persönlichen Kreditangebote im Vergleich – kostenlos und SCHUFA-neutral.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OffersPage,
});

const STORAGE_KEY = "smava-wizard";

const LOADING_TEXTS = [
  "Ihre Angaben werden geprüft…",
  "Wir fragen die Banken an…",
  "Wir prüfen die besten Kreditangebote…",
  "Individuelle Angebote erhalten…",
];

const INSURANCES = ["keine Versicherung", "Einfacher Schutz", "Kombi-Schutz", "Komplett-Schutz"];

const TERMS = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];

function termLabel(months: number): string {
  const years = months / 12;
  return `${months} Monate (${years} ${years === 1 ? "Jahr" : "Jahre"})`;
}

function formatEuro(value: number, digits = 0): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function insuranceFromWizard(value: string | undefined): string {
  if (!value || value === "keine") return "keine Versicherung";
  return INSURANCES.includes(value) ? value : "keine Versicherung";
}

const INSURANCE_SURCHARGE: Record<string, number> = {
  "keine Versicherung": 0,
  "Einfacher Schutz": 0.03,
  "Kombi-Schutz": 0.055,
  "Komplett-Schutz": 0.08,
};

function monthlyRate(amount: number, months: number, effRate: number, insurance: string): number {
  if (!amount || !months) return 0;
  const i = effRate / 100 / 12;
  const base = (amount * i) / (1 - Math.pow(1 + i, -months));
  return base * (1 + (INSURANCE_SURCHARGE[insurance] ?? 0));
}

/* ------------------------------------------------------------------ */

function OffersPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(84);
  const [insurance, setInsurance] = useState("keine Versicherung");

  const [searchAmount, setSearchAmount] = useState(10000);
  const [searchTerm, setSearchTerm] = useState(84);
  const [searchInsurance, setSearchInsurance] = useState("keine Versicherung");
  const hydrated = useRef(false);

  // Angaben aus dem Antrag übernehmen
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = JSON.parse(
        window.sessionStorage.getItem(STORAGE_KEY) ?? "{}",
      ) as WizardData;
      const storedAmount =
        stored.loanAmountAdjust === "custom" && stored.loanAmountCustom
          ? stored.loanAmountCustom
          : stored.amount;
      if (storedAmount && storedAmount > 0) {
        setAmount(storedAmount);
        setSearchAmount(storedAmount);
      }
      if (stored.termMonths && stored.termMonths > 0) {
        const closest = TERMS.reduce((a, b) =>
          Math.abs(b - stored.termMonths!) < Math.abs(a - stored.termMonths!) ? b : a,
        );
        setTerm(closest);
        setSearchTerm(closest);
      }
      const storedInsurance = insuranceFromWizard(stored.insurance);
      setInsurance(storedInsurance);
      setSearchInsurance(storedInsurance);
    } catch {
      /* ignore */
    }
  }, []);

  // 10-Sekunden-Ladephase, startet neu, wenn loading auf true gesetzt wird
  useEffect(() => {
    if (!loading) return;
    setProgress(0);
    const start = Date.now();
    const id = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / 10000) * 100);
      setProgress(pct);
      if (pct >= 100) {
        window.clearInterval(id);
        setLoading(false);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [loading]);

  const handleSearch = () => {
    setSearchAmount(amount);
    setSearchTerm(term);
    setSearchInsurance(insurance);
    try {
      const stored = JSON.parse(
        window.sessionStorage.getItem(STORAGE_KEY) ?? "{}",
      ) as WizardData;
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...stored,
          amount,
          termMonths: term,
          insurance: insurance === "keine Versicherung" ? "keine" : insurance,
        }),
      );
    } catch {
      /* ignore */
    }
    void banksQuery.refetch();
    setLoading(true);
  };

  const loadingText =
    LOADING_TEXTS[Math.min(LOADING_TEXTS.length - 1, Math.floor(progress / 25))] ??
    LOADING_TEXTS[0];

  const banksQuery = useQuery({
    queryKey: ["active-banks"],
    queryFn: () => listActiveBanks(),
    staleTime: 0,
    gcTime: 0,
  });

  const offers = useMemo(() => {
    const list = (banksQuery.data ?? []) as Bank[];
    return list
      .filter(
        (b) =>
          searchAmount >= b.min_amount &&
          searchAmount <= b.max_amount &&
          searchTerm >= b.min_term &&
          searchTerm <= b.max_term,
      )
      .map((bank) => {
        const effRate = Number(bank.eff_rate);
        return { bank, effRate, rate: monthlyRate(searchAmount, searchTerm, effRate, searchInsurance) };
      })
      .sort((a, b) => a.rate - b.rate);
  }, [banksQuery.data, searchAmount, searchTerm, searchInsurance]);

  const selected = offers.find((o) => o.bank.id === selectedId) ?? null;

  const [applying, setApplying] = useState(false);

  async function goToApplication(offer: { bank: Bank; effRate: number; rate: number }) {
    if (applying) return;
    setApplying(true);
    try {
      let wizard: WizardData = {};
      try {
        wizard = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "{}") as WizardData;
      } catch {
        /* ignore */
      }
      const { id } = await createApplication({
        wizard,
        offer: {
          bankId: offer.bank.id,
          bankName: offer.bank.name,
          bankLogoKey: offer.bank.logo_key ?? null,
          amount: searchAmount,
          termMonths: searchTerm,
          effRate: offer.effRate,
          monthlyRate: offer.rate,
          totalAmount: offer.rate * searchTerm,
          insurance: searchInsurance,
        },
      });
      await navigate({ to: "/kreditantrag/$applicationId", params: { applicationId: id } });
    } catch {
      setApplying(false);
    }
  }


  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f6]">
      <header className="sticky top-0 z-20 bg-white shadow-header-strong">
        <div className="mx-auto flex h-[68px] max-w-[1160px] items-center justify-between px-5 md:px-8">
          <Link to="/" aria-label="smava Startseite" className="text-smava-logo">
            <Logo className="h-8 w-auto" />
          </Link>
          <span className="flex items-center gap-2 text-[15px] text-[#323232]">
            <HelpCircle className="size-[18px] text-[#5b5b5b]" />
            Hilfe und Support
          </span>
        </div>

        {loading ? (
          <div className="mx-auto max-w-[1160px] px-5 pb-4 md:px-8">
            <div className="h-[6px] w-full rounded-full bg-[#e6e7e8]">
              <div
                className="h-[6px] rounded-full bg-brand transition-[width] duration-100 ease-linear"
                style={{ width: `${Math.max(progress, 1)}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="mt-2 text-[15px] text-brand" role="status">
              {loadingText}
            </p>
          </div>
        ) : (
          <FilterBar
            amount={amount}
            setAmount={setAmount}
            term={term}
            setTerm={setTerm}
            insurance={insurance}
            setInsurance={setInsurance}
            searchAmount={searchAmount}
            searchTerm={searchTerm}
            searchInsurance={searchInsurance}
            onSearch={handleSearch}
          />
        )}
      </header>

      <main className="flex-1">
        {loading ? (
          <div className="mx-auto w-full max-w-[1160px] px-5 pb-10 md:px-8">
            <div className="mt-8 space-y-4">
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <GuaranteeNote />
            <TrustBlock />
          </div>
        ) : (
          <div
            className={
              selected ? "grid grid-cols-1 items-start md:grid-cols-[minmax(0,1fr)_475px]" : ""
            }
          >
            <div className="min-w-0 pb-10">
              <div
                className={`mx-auto w-full px-5 md:px-8 ${
                  selected ? "max-w-[860px]" : "max-w-[1160px]"
                }`}
              >
                <div className="mx-auto mt-6 flex w-full max-w-[770px] items-center justify-end gap-2 text-[15px] text-[#323232]">
                  <ArrowUpDown className="size-4" />
                  <span>
                    Sortieren:<sup className="text-brand">1</sup>
                  </span>
                  <span className="font-semibold text-brand">monatliche Rate</span>
                </div>

                {offers.length === 0 ? (
                  <p className="mx-auto mt-6 max-w-[770px] bg-white p-5 text-[15px] text-[#5b5b5b] shadow-sm">
                    Für Ihre Auswahl liegen aktuell keine Angebote vor. Bitte passen Sie
                    Kreditbetrag oder Laufzeit an.
                  </p>
                ) : (
                  offers.map(({ bank, effRate, rate }, index) => {
                    const isTop = index === 0;
                    const logo = bankLogoSrc(bank.logo_key, bank.logo_url);
                    return (
                      <div
                        key={bank.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(bank.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedId(bank.id);
                          }
                        }}
                        aria-label={`Angebotsdetails ${bank.name} öffnen`}
                        className={`mx-auto mt-4 max-w-[770px] cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ${
                          isTop
                            ? "border border-l-[5px] border-brand"
                            : "border border-[#e6e7e8]"
                        }`}
                      >
                        {isTop && (
                          <div className="flex items-center gap-2 bg-[#eff8f1] px-4 py-2.5">
                            <Star className="size-[18px] text-brand" />
                            <p className="text-[15px] text-[#323232]">Unsere Empfehlung für Sie</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_230px]">
                          <div className="px-5 py-5">
                            {logo ? (
                              <img
                                src={logo}
                                alt={bank.name}
                                className={
                                  bank.logo_key === "dkb"
                                    ? "h-9 w-auto -translate-x-3.5 object-contain object-left"
                                    : "h-6 w-auto"
                                }
                              />
                            ) : (
                              <p className="text-[17px] font-semibold text-[#323232]">
                                {bank.name}
                              </p>
                            )}

                            <div className="mt-5 grid grid-cols-3 gap-3">
                              <div>
                                <p className="flex items-center gap-1 text-[17px] font-semibold text-[#323232]">
                                  <ArrowDown className="size-4 text-[#323232]" />
                                  {formatEuro(searchAmount)} €
                                </p>
                                <p className="mt-0.5 text-[13px] text-[#5b5b5b]">Kreditbetrag</p>
                              </div>
                              <div>
                                <p className="flex items-center gap-1 text-[17px] font-semibold text-[#323232]">
                                  <ArrowDown className="size-4 text-[#323232]" />
                                  {searchTerm}
                                </p>
                                <p className="mt-0.5 text-[13px] text-[#5b5b5b]">Monate</p>
                              </div>
                              <div>
                                <p className="text-[17px] font-semibold text-brand">
                                  {effRate.toLocaleString("de-DE", { minimumFractionDigits: 2 })} %
                                </p>
                                <p className="mt-0.5 text-[13px] text-[#5b5b5b]">Zins (eff.)</p>
                              </div>
                            </div>

                            {bank.free_special_repayment && (
                              <p className="m-0 flex items-center gap-2 pt-5 font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] text-[10px] font-medium uppercase leading-[1.5rem] tracking-[1.5px] text-[#323232]">
                                <Check className="size-4 text-brand" strokeWidth={3} />
                                Kostenlose Sondertilgung
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col justify-center bg-[#eff8f1] px-5 py-5">
                            <div className="flex items-start justify-between text-left">
                              <div>
                                <p className="m-0 font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] text-[1rem] font-semibold leading-[1.5rem] tracking-normal text-brand">
                                  {formatEuro(rate, 2)} €
                                </p>
                                <p className="m-0 mt-0.5 font-['Roboto',-apple-system,BlinkMacSystemFont,sans-serif] text-[0.75rem] font-normal leading-[1.25rem] tracking-[0.03rem] text-[rgb(132,132,132)]">
                                  mtl. Rate
                                </p>
                              </div>
                              <ChevronRight className="size-5 text-[#9a9a9a]" />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                void goToApplication({ bank, effRate, rate });
                              }}
                              className="relative mt-0 mb-4 inline-flex w-full min-w-16 cursor-pointer items-center justify-center gap-2 border-0 bg-[rgb(57,169,73)] px-2 py-2 text-[14px] font-medium leading-[22px] text-white outline-0 [appearance:none] [user-select:none] [vertical-align:middle] hover:bg-brand-hover"
                              style={{
                                WebkitTapHighlightColor: "transparent",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
                                textTransform: "initial",
                                transition:
                                  "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                                margin: "6px 0px 16px",
                              }}
                            >
                              zum Antrag <ChevronRight className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}


                <GuaranteeNote />
                <TrustBlock />
              </div>
            </div>

            {selected && (
              <div className="w-full border-[#e6e7e8] bg-white md:fixed md:bottom-0 md:right-0 md:top-[152px] md:z-30 md:w-[475px] md:overflow-y-auto md:border-l">
                <OfferDetailsPanel
                  key={selected.bank.id}
                  bank={selected.bank}
                  onClose={() => setSelectedId(null)}
                  onApply={() => void goToApplication(selected)}
                  amount={searchAmount}
                  term={searchTerm}
                  effRate={selected.effRate}
                  rate={selected.rate}
                  insurance={searchInsurance}
                />
              </div>
            )}

          </div>
        )}
      </main>


      <WizardFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function OfferDetailsPanel({
  bank,
  onClose,
  onApply,
  amount,
  term,
  effRate,
  rate,
  insurance,
}: {
  bank: Bank;
  onClose: () => void;
  onApply: () => void;
  amount: number;
  term: number;
  effRate: number;
  rate: number;
  insurance: string;
}) {
  const docs = (bank.documents ?? "")
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);
  const logo = bankLogoSrc(bank.logo_key, bank.logo_url);

  const [tab, setTab] = useState<"info" | "kosten">("info");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const total = rate * term;
  const interest = Math.max(0, total - amount);

  return (
      <aside
        aria-label="Angebotsdetails"
        className="flex h-full w-full flex-col bg-white"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="grid size-8 shrink-0 place-items-center border border-[#dcdcdc] text-[#5b5b5b] transition-colors hover:bg-[#f4f5f6]"
          >
            <X className="size-4" />
          </button>
          {logo ? (
            <img
              src={logo}
              alt={bank.name}
              className={
                bank.logo_key === "dkb"
                  ? "h-7 w-auto object-contain object-left"
                  : "h-5 w-auto"
              }
            />
          ) : (
            <span className="text-[15px] font-semibold text-[#323232]">{bank.name}</span>
          )}

          <button
            type="button"
            onClick={onApply}
            className="relative m-0 ml-auto box-border inline-flex min-w-16 cursor-pointer select-none appearance-none items-center justify-center rounded-[2px] border-0 bg-[rgb(57,169,73)] px-[50px] py-4 align-middle text-[14px] font-medium leading-[22px] text-white no-underline outline-0 hover:bg-brand-hover"
            style={{
              WebkitTapHighlightColor: "transparent",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
              textTransform: "initial",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            zum Antrag
          </button>

        </div>

        <div className="grid grid-cols-2">
          {(
            [
              ["info", "Kreditinformationen"],
              ["kosten", "Finanzierungskosten"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`h-[52px] text-[15px] transition-colors ${
                tab === key
                  ? "border-b-2 border-brand bg-white font-semibold text-[#323232]"
                  : "bg-[#f4f5f6] text-[#5b5b5b]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === "info" ? (
            <>
              <p className="border-b border-[#e6e7e8] pb-4 text-[15px] text-[#323232]">
                <strong className="font-semibold">Auszahlung</strong>{" "}
                {bank.payout_days === 0 ? "sofort" : `in ${bank.payout_days} Tagen`}
              </p>

              <Section title={`Nur ${docs.length} Dokumente benötigt`}>
                {docs.map((doc, i) => (
                  <IconRow
                    key={doc}
                    icon={
                      i === 0 ? (
                        <Landmark className="size-5 text-[#5b5b5b]" />
                      ) : (
                        <FileText className="size-5 text-[#5b5b5b]" />
                      )
                    }
                    text={doc}
                  />
                ))}
              </Section>

              <Section title="Sie können online">
                <CheckRow text="Dokumente hochladen" negative={!bank.online_upload} />
                <CheckRow
                  text="Legitimation durchführen und unterschreiben"
                  negative={!bank.online_id}
                />
              </Section>

              <Section title="Ihre Sonderkonditionen">
                <CheckRow
                  text="Kostenlose Sondertilgung"
                  negative={!bank.free_special_repayment}
                />
                <CheckRow text="Kostenlose Gesamttilgung" negative={!bank.free_full_repayment} />
                <CheckRow text="Ratenpause" negative={!bank.payment_break} />
              </Section>

              <Section title="Online-Kredit von">
                <p className="text-[15px] leading-[1.7] text-[#323232]">
                  {bank.company_name ?? bank.name}
                  {bank.street ? (
                    <>
                      <br />
                      {bank.street}
                    </>
                  ) : null}
                  {bank.zip || bank.city ? (
                    <>
                      <br />
                      {[bank.zip, bank.city].filter(Boolean).join(" ")}
                    </>
                  ) : null}
                </p>
              </Section>

            </>
          ) : (
            <dl className="divide-y divide-[#e6e7e8]">
              <CostRow label="Kreditbetrag" value={`${formatEuro(amount)} €`} />
              <CostRow label="Laufzeit" value={`${term} Monate`} />
              <CostRow
                label="Effektiver Jahreszins"
                value={`${effRate.toLocaleString("de-DE", { minimumFractionDigits: 2 })} %`}
              />
              <CostRow label="Restschuldversicherung" value={insurance} />
              <CostRow label="Monatliche Rate" value={`${formatEuro(rate, 2)} €`} />
              <CostRow label="Gesamtbetrag" value={`${formatEuro(total, 2)} €`} />
              <CostRow label="Zinskosten" value={`${formatEuro(interest, 2)} €`} />
            </dl>
          )}
        </div>

        <div className="border-t border-[#e6e7e8] px-6 py-4">
          <button
            type="button"
            onClick={onApply}
            className="relative m-0 box-border inline-flex w-full min-w-16 cursor-pointer select-none appearance-none items-center justify-center rounded-[2px] border-0 bg-[rgb(57,169,73)] px-[50px] py-4 align-middle text-[14px] font-medium leading-[22px] text-white no-underline outline-0 hover:bg-brand-hover"
            style={{
              WebkitTapHighlightColor: "transparent",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
              textTransform: "initial",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            zum Antrag
          </button>
        </div>
      </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#e6e7e8] py-5 last:border-b-0">
      <p className="text-[15px] font-semibold text-[#323232]">{title}</p>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function IconRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-[15px] text-[#323232]">{text}</span>
    </div>
  );
}

function CheckRow({ text, negative = false }: { text: string; negative?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {negative ? (
        <X className="size-5 shrink-0 text-[#e02b2b]" strokeWidth={3} />
      ) : (
        <Check className="size-5 shrink-0 text-brand" strokeWidth={3} />
      )}
      <span className={`text-[15px] ${negative ? "text-[#9a9a9a]" : "text-[#323232]"}`}>
        {text}
      </span>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-[15px] text-[#5b5b5b]">{label}</dt>
      <dd className="text-[15px] font-semibold text-[#323232]">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function FilterBar({
  amount,
  setAmount,
  term,
  setTerm,
  insurance,
  setInsurance,
  searchAmount,
  searchTerm,
  searchInsurance,
  onSearch,
}: {
  amount: number;
  setAmount: (v: number) => void;
  term: number;
  setTerm: (v: number) => void;
  insurance: string;
  setInsurance: (v: string) => void;
  searchAmount: number;
  searchTerm: number;
  searchInsurance: string;
  onSearch: () => void;
}) {
  const dirty =
    amount !== searchAmount || term !== searchTerm || insurance !== searchInsurance;

  return (
    <div className="border-t border-[#eaebec]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-3 px-5 py-4 md:flex-row md:items-end md:px-8">
        <label className="relative flex h-[52px] flex-1 items-center border border-[#dcdcdc] bg-white px-3">
          <span className="absolute -top-2 left-2 bg-white px-1 text-[11px] text-[#5b5b5b]">
            Kreditbetrag
          </span>
          <input
            inputMode="numeric"
            value={formatEuro(amount)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setAmount(digits ? Number(digits) : 0);
            }}
            className="w-full bg-transparent text-[16px] text-[#323232] outline-none"
            aria-label="Kreditbetrag"
          />
          <span className="pl-2 text-[15px] text-[#5b5b5b]">€</span>
        </label>

        <div className="relative flex-1">
          <span className="absolute -top-2 left-2 z-10 bg-white px-1 text-[11px] text-[#5b5b5b]">
            Laufzeit in Monaten
          </span>
          <Select value={String(term)} onValueChange={(v) => setTerm(Number(v))}>
            <SelectTrigger className="h-[52px] w-full rounded-none border-[#dcdcdc] bg-white text-[16px] text-[#323232]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TERMS.map((t) => (
                <SelectItem key={t} value={String(t)}>
                  {termLabel(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1">
          <span className="absolute -top-2 left-2 z-10 bg-white px-1 text-[11px] text-[#5b5b5b]">
            Restschuldversicherung
          </span>
          <Select value={insurance} onValueChange={setInsurance}>
            <SelectTrigger className="h-[52px] w-full rounded-none border-[#dcdcdc] bg-white text-[16px] text-[#323232]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INSURANCES.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          onClick={onSearch}
          disabled={!dirty}
          aria-label="Angebote neu berechnen"
          className={`grid h-[52px] w-[52px] shrink-0 place-items-center transition-colors ${
            dirty
              ? "cursor-pointer bg-[#39a949] text-white hover:bg-[#1b5426]"
              : "bg-[#e6e7e8] text-[#5b5b5b]"
          } disabled:cursor-default`}
        >
          <Search className="size-5" />
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="mx-auto max-w-[770px] border border-[#e6e7e8] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
        <div className="px-5 py-6">
          <div className="h-4 w-32 animate-pulse rounded bg-[#e6e7e8]" />
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3.5 w-20 animate-pulse rounded bg-[#e6e7e8]" />
                <div className="h-3 w-14 animate-pulse rounded bg-[#e6e7e8]" />
              </div>
            ))}
          </div>
          <div className="mt-6 h-3.5 w-56 animate-pulse rounded bg-[#e6e7e8]" />
        </div>
        <div className="flex flex-col justify-center gap-3 bg-[#f4f5f6] px-5 py-6">
          <div className="h-3.5 w-16 animate-pulse rounded bg-[#e6e7e8]" />
          <div className="h-3 w-24 animate-pulse rounded bg-[#e6e7e8]" />
          <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#e6e7e8]" />
        </div>
      </div>
    </div>
  );
}

function GuaranteeNote() {
  return (
    <div className="mx-auto mt-6 flex max-w-[770px] items-start gap-4 px-1">
      <img src={garantie.url} alt="Günstiger geht nicht Garantie" className="h-[56px] w-auto" />
      <div>
        <p className="text-[15px] font-bold text-[#323232]">
          Woanders ein günstigeres Angebot gefunden? Kein Problem!
        </p>
        <p className="mt-1 text-[14px] leading-[1.6] text-[#5b5b5b]">
          Falls Sie woanders ein günstigeres Angebot erhalten haben, gleichen wir den Unterschied
          mit einer einmaligen Zahlung aus.{" "}
          <span className="font-semibold text-brand">weiterlesen &gt;</span>
        </p>
      </div>
    </div>
  );
}
