import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  CounterField,
  NavButtons,
  NoteBox,
  ProgressBar,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-5")({
  head: () => ({ meta: [{ title: "Schritt 5: Haushalt – smava Kreditanfrage" }] }),
  component: Step5,
});

function Step5() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={29} />

      <h1 className="mt-8 text-[18px] font-bold text-[#323232]">Haushalt</h1>

      <WhyInfo text="Ihre Wohnsituation wird bei der Kreditprüfung berücksichtigt. Dabei kann relevant sein, mit wie vielen Personen Sie zusammenleben und ob Sie zur Miete oder im Eigenheim wohnen. So ist es bspw. möglich, dass Sie als Eigenheimbesitzer besonders günstige Kreditkonditionen erhalten." />

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-[15px] text-[#323232]">Anzahl Erwachsene im Haushalt (ab 18 Jahre)</p>
          <CounterField
            value={data.adults ?? 1}
            min={1}
            max={5}
            onChange={(v) => update({ adults: v })}
          />
          <NoteBox icon="user">
            Mehr Erwachsene bedeutet weniger Kosten pro Kopf und mehr frei verfügbares Einkommen.
          </NoteBox>
        </div>

        <div>
          <p className="text-[15px] text-[#323232]">Anzahl Kinder im Haushalt (unter 18 Jahre)</p>
          <CounterField
            value={data.children ?? 0}
            max={10}
            onChange={(v) => {
              const currentChildren = data.children ?? 0;
              const currentKindergeld = data.childrenKindergeld ?? 0;
              update({
                children: v,
                childrenKindergeld:
                  v > currentChildren ? v : Math.min(v, currentKindergeld),
              });
            }}
          />
        </div>

        <div>
          <p className="text-[15px] text-[#323232]">Anzahl kindergeldberechtigter Kinder</p>
          <CounterField
            value={data.childrenKindergeld ?? 0}
            max={data.children ?? 0}
            onChange={(v) => update({ childrenKindergeld: v })}
          />
        </div>
      </div>

      <NavButtons backTo="/antrag/schritt-4" nextTo="/antrag/schritt-6" />
      <TrustBlock />
    </div>
  );
}
