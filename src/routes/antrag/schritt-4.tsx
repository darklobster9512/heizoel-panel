import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import { NavButtons, ProgressBar, SelectField, TrustBlock, WhyInfo } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-4")({
  head: () => ({ meta: [{ title: "Schritt 4: Haushalt – smava Kreditanfrage" }] }),
  component: Step4,
});

const HOUSING_OPTIONS = [
  "zur Miete",
  "mietfrei",
  "bei den Eltern",
  "im Wohneigentum",
];

function Step4() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={21} />

      <h1 className="mt-8 text-[18px] font-bold text-[#323232]">Haushalt</h1>

      <WhyInfo text="Ihre Wohnsituation wird bei der Kreditprüfung berücksichtigt. Dabei kann relevant sein, mit wie vielen Personen Sie zusammenleben und ob Sie zur Miete oder im Eigenheim wohnen. So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten." />

      <div className="mt-5">
        <SelectField
          id="housing"
          label="Wohnsituation"
          options={HOUSING_OPTIONS}
          value={data.housing ?? "zur Miete"}
          onChange={(v) => update({ housing: v })}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-3" nextTo="/antrag/schritt-5" />
      <TrustBlock />
    </div>
  );
}
