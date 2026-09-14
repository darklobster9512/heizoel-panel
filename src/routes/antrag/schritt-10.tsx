import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import ingdiba from "@/assets/ingdiba.svg.asset.json";
import dkb from "@/assets/dkb.svg.asset.json";
import targobank from "@/assets/targobank.svg.asset.json";
import { useWizard } from "@/lib/wizard-store";
import { NavButtons, ProgressBar, TrustBlock } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-10")({
  head: () => ({ meta: [{ title: "Schritt 10: Angebote – smava Kreditanfrage" }] }),
  component: Step10,
});

const OFFERS = [
  { name: "ING", src: ingdiba.url, h: "h-6", logoClass: "" },
  { name: "DKB", src: dkb.url, h: "h-7", logoClass: "-ml-3" },
  { name: "TARGOBANK", src: targobank.url, h: "h-4", logoClass: "" },
];

function SkeletonOfferCard({
  name,
  src,
  h,
  logoClass,
}: {
  name: string;
  src: string;
  h: string;
  logoClass: string;
}) {
  return (
    <div className="rounded-[4px] border border-[#e3e3e3] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
      <div className="px-3 pt-2.5">
        <img
          src={src}
          alt={name}
          className={`${h} ${logoClass} w-auto max-w-[110px] object-contain object-left`}
        />
      </div>
      <div className="mt-3 flex min-h-[56px]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-1 flex-col gap-1.5 px-3 py-3">
            <span className="h-3 w-12 rounded-full bg-[#e9e9e9]" />
            <span className="h-2 w-8 rounded-full bg-[#f0f0f0]" />
          </div>
        ))}
        <div className="flex flex-1 flex-col gap-1.5 border-l border-[#efefef] bg-[#f6f6f6] px-3 py-3">
          <span className="h-3 w-12 rounded-full bg-[#e9e9e9]" />
          <span className="h-2 w-8 rounded-full bg-[#f0f0f0]" />
        </div>
      </div>
    </div>
  );
}

function Step10() {
  const { data } = useWizard();
  const navigate = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => {
      void navigate({ to: "/antrag/schritt-11", search: {} }).catch((e) =>
        console.error("nav", e),
      );
    }, 3500);
    return () => window.clearTimeout(t);
  }, [navigate]);

  const rows: [string, string][] = [
    ["Anzahl Kreditnehmer", String(data.borrowers ?? 1)],
    ["Familienstand", data.maritalStatus ?? "ledig"],
    ["Wohnsituation", data.housing ?? "zur Miete"],
    ["Erwachsene im Haushalt (ab 18 Jahre)", String(data.adults ?? 1)],
    ["Kinder im Haushalt (unter 18 Jahre)", String(data.children ?? 0)],
    [
      "Vermietete Immobilie",
      data.rentedProperty ? "Vermietete Immobilie" : "Kein Immobilienbesitz",
    ],
    ["Beruf", data.profession ?? "Angestellte/r"],
    [
      "Nettoeinkommen",
      data.netIncome != null ? data.netIncome.toLocaleString("de-DE") : "–",
    ],
  ];

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={64} />

      <h1 className="mt-6 text-center text-[18px] font-bold leading-[1.3] text-[#323232]">
        Fast geschafft! Einen Augenblick noch.
      </h1>

      <p className="mt-4 text-[14px] text-[#323232]">Ihre Angaben:</p>
      <dl className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-6 text-[14px]">
            <dt className="text-[#323232]">{label}</dt>
            <dd className="text-right text-[#323232]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-3">
        {OFFERS.map((o) => (
          <SkeletonOfferCard key={o.name} {...o} />
        ))}
      </div>

      <div className="mt-4">
        <TrustBlock />
      </div>

      <NavButtons backTo="/antrag/schritt-9" nextTo="/antrag/schritt-11" withSave disabled />
    </div>
  );
}
