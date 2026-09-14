import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWizard } from "@/lib/wizard-store";
import {
  CheckboxRow,
  NavButtons,
  ProgressBar,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

import komplettschutz from "@/assets/komplettschutz.svg.asset.json";
import kombischutz from "@/assets/kombischutz.svg.asset.json";
import einfacherschutz from "@/assets/einfacherschutz.svg.asset.json";

export const Route = createFileRoute("/antrag/schritt-16")({
  head: () => ({
    meta: [{ title: "Schritt 16: Restschuldversicherung – smava Kreditanfrage" }],
  }),
  component: Step16,
});

const FEATURES = ["Arbeitslosigkeit", "Arbeitsunfähigkeit", "Todesfall"] as const;

const PLANS: {
  value: string;
  icon: string;
  title: string;
  included: readonly (typeof FEATURES)[number][];
}[] = [
  {
    value: "Komplett-Schutz",
    icon: komplettschutz.url,
    title: "Komplett-Schutz",
    included: ["Arbeitslosigkeit", "Arbeitsunfähigkeit", "Todesfall"],
  },
  {
    value: "Kombi-Schutz",
    icon: kombischutz.url,
    title: "Kombi-Schutz",
    included: ["Arbeitsunfähigkeit", "Todesfall"],
  },
  {
    value: "Einfacher Schutz",
    icon: einfacherschutz.url,
    title: "Einfacher Schutz",
    included: ["Todesfall"],
  },
];

function Step16() {
  const { data, update } = useWizard();
  const none = data.insurance === "keine";

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={89} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Restschuldversicherung
      </h1>

      <WhyInfo text="Möchten Sie sich und Ihre Familie im Falle einer Arbeitslosigkeit, Arbeitsunfähigkeit oder auch im Todesfall absichern, lohnt ein Versicherungsschutz. Im Risikofall übernimmt die Versicherung die Zahlung Ihrer offenen Kreditraten. Ihre Auswahl können Sie jederzeit ändern." />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {PLANS.map((p) => {
          const active = data.insurance === p.value;
          return (
            <div
              key={p.value}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              onClick={() => update({ insurance: p.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  update({ insurance: p.value });
                }
              }}
              className={cn(
                "flex cursor-pointer flex-col border p-4 transition-colors",
                active ? "border-brand bg-[#eff8f1]" : "border-[#dcdcdc] bg-white",
              )}
            >
              <img src={p.icon} alt="" className="h-12 w-12 object-contain" />
              <p className="mt-3 text-[15px] font-semibold text-[#323232]">{p.title}</p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {FEATURES.map((f) => {
                  const included = p.included.includes(f);
                  return (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#5b5b5b]">
                      {included ? (
                        <Check className="size-3.5 shrink-0 text-brand" strokeWidth={3} />
                      ) : (
                        <X className="size-3.5 shrink-0 text-[#9a9a9a]" strokeWidth={3} />
                      )}
                      {f}
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                aria-pressed={active}
                className={cn(
                  "mt-4 h-[42px] w-full border text-[14px] font-semibold transition-colors",
                  active
                    ? "border-brand bg-[#eff8f1] text-brand hover:bg-[#e3f3e8]"
                    : "border-brand bg-white text-brand hover:bg-[#eff8f1]",
                )}
              >
                {active ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="size-4" strokeWidth={3} />
                    Ausgewählt
                  </span>
                ) : (
                  "Wählen"
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <CheckboxRow checked={none} onChange={(v) => update(v ? { insurance: "keine" } : {})}>
          <span className="font-bold text-[#323232]">Keine Versicherung</span>
          {" - Ich wähle keinen Versichungsschutz und trage das Risiko möglicher Zahlungsausfälle selbst."}
        </CheckboxRow>
      </div>

      <NavButtons backTo="/antrag/schritt-15" nextTo="/antrag/schritt-17" />
      <TrustBlock />
    </div>
  );
}
