import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Image,
  Megaphone,
  Monitor,
  Play,
  Radio,
  Save,
  Search,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useWizard } from "@/lib/wizard-store";
import { TrustBlock } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-17")({
  head: () => ({
    meta: [{ title: "Schritt 17: Woher kennen Sie uns? – smava Kreditanfrage" }],
  }),
  component: Step17,
});

const SOURCES = [
  { value: "Soziale Medien (z.B. Facebook)", icon: Share2 },
  { value: "TV-Werbung", icon: Monitor },
  { value: "Außenwerbung (z.B. Plakate)", icon: Image },
  { value: "Radio-Werbung", icon: Radio },
  { value: "Youtube", icon: Play },
  { value: "Empfohlen oder bekannte Marke", icon: Users },
  { value: "Suchmaschine (z.B. Google)", icon: Search },
  { value: "Banner-Werbung im Internet", icon: Megaphone },
  { value: "KI-Suche (z.B. ChatGPT, Gemini, Claude)", icon: Sparkles },
];

function Step17() {
  const { data, update } = useWizard();
  const navigate = useNavigate();

  function save() {
    try {
      window.sessionStorage.setItem("smava-wizard", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <h1 className="text-[22px] font-bold leading-[1.3] text-[#323232]">
        Woher kennen Sie uns?
      </h1>

      <p className="mt-1 text-[15px] text-[#323232]">
        Wie sind Sie auf smava aufmerksam geworden?
      </p>
      <p className="mt-1 text-[13px] text-[#5b5b5b]">Optional</p>

      <div className="mt-5 space-y-2.5">
        {SOURCES.map((s) => {
          const active = data.referralSource === s.value;
          return (
            <button
              key={s.value}
              type="button"
              aria-pressed={active}
              onClick={() =>
                update({ referralSource: active ? "" : s.value })
              }
              className={cn(
                "flex h-[52px] w-full items-center justify-between border px-4 text-left text-[15px] transition-colors",
                active
                  ? "border-brand bg-[#eff8f1] font-medium text-[#323232]"
                  : "border-[#dcdcdc] bg-white text-[#323232] hover:bg-[#f7f7f7]",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "relative flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    active ? "border-brand" : "border-[#9a9a9a]",
                  )}
                >
                  {active && (
                    <span className="size-2.5 rounded-full bg-brand" />
                  )}
                </span>
                {s.value}
              </div>
              <s.icon className="size-5 shrink-0 text-brand" />
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-2.5">
        <div className="grid grid-cols-[150px_1fr] gap-2.5">
          <button
            type="button"
            onClick={save}
            className="flex h-[42px] items-center justify-center gap-2 border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1]"
          >
            <Save className="size-4" /> Speichern
          </button>
          <button
            type="button"
            onClick={() =>
              void navigate({ to: "/antrag/schritt-18", search: {} }).catch(
                (e) => console.error("nav", e),
              )
            }
            className="flex h-[42px] items-center justify-center gap-2 bg-brand text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover"
          >
            Weiter <ArrowRight className="size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            void navigate({ to: "/antrag/schritt-16", search: {} }).catch(
              (e) => console.error("nav", e),
            )
          }
          className="flex h-[42px] w-full items-center justify-center gap-2 border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1]"
        >
          <ArrowLeft className="size-4" /> Zurück
        </button>
      </div>

      <TrustBlock />
    </div>
  );
}
