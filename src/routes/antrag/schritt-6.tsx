import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  NavButtons,
  NoteBox,
  ProgressBar,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-6")({
  head: () => ({ meta: [{ title: "Schritt 6: Einkommen – smava Kreditanfrage" }] }),
  component: Step6,
});

function Step6() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={41} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">Einkommen</h1>

      <WhyInfo text="Damit Sie einen Kredit erhalten, müssen Sie über ein regelmäßiges und bestenfalls gleich bleibendes Einkommen verfügen." />

      <div className="mt-6">
        <label htmlFor="netto" className="text-[14px] text-[#323232]">
          Nettoeinkommen
        </label>

        <div className="mt-4">
          <TextField
            id="netto"
            label=""
            placeholder="z.B. 2.270"
            suffix="€/Monat"
            value={data.netIncome != null ? String(data.netIncome) : ""}
            onChange={(v) => {
              const n = Number(v.replace(/\D/g, ""));
              update(n > 0 ? { netIncome: n } : {});
            }}
          />
        </div>
      </div>

      {data.netIncome != null && data.netIncome >= 2500 ? (
        <NoteBox variant="green" icon="money">
          Dank Ihres hohen Einkommens gehören Sie zu den Top 30 % aller Kreditnehmer.
        </NoteBox>
      ) : null}

      <NavButtons backTo="/antrag/schritt-5" nextTo="/antrag/schritt-7" />
      <TrustBlock />
    </div>
  );
}
