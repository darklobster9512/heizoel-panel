import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import { NavButtons, ProgressBar, SelectField, TrustBlock } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-2")({
  head: () => ({ meta: [{ title: "Schritt 2: Familienstand – smava Kreditanfrage" }] }),
  component: Step2,
});

const STATUSES = [
  "ledig",
  "verheiratet",
  "verwitwet",
  "geschieden",
  "eheähnliche Lebensgemeinschaft",
  "getrennt lebend",
];

function Step2() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={13} />

      <h1 className="mt-8 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Persönliche Angaben
      </h1>

      <div className="mt-5">
        <SelectField
          id="familienstand"
          label="Familienstand"
          options={STATUSES}
          value={data.maritalStatus ?? "ledig"}
          onChange={(v) => update({ maritalStatus: v })}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-1" nextTo="/antrag/schritt-3" />
      <TrustBlock />
    </div>
  );
}
