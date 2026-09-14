import { createFileRoute } from "@tanstack/react-router";

import schufaneutral from "@/assets/schufaneutral.svg.asset.json";
import { useWizard } from "@/lib/wizard-store";
import { ChoiceTiles, NavButtons, NoteBox, ProgressBar, TrustBlock } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-1")({
  head: () => ({ meta: [{ title: "Schritt 1: Anzahl Kreditnehmer – smava Kreditanfrage" }] }),
  component: Step1,
});

function Step1() {
  const { data, update } = useWizard();
  const twoBorrowers = data.borrowers === 2;

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={9} />

      <div className="mt-6 flex items-start justify-between gap-4">
        <h1 className="text-[22px] font-bold leading-[1.3] text-[#323232]">
          Ihr verlässlicher Kreditüberblick von über 20 Banken
        </h1>
        <img
          src={schufaneutral.url}
          alt="100 % SCHUFA-neutral"
          className="h-[74px] w-auto shrink-0"
        />
      </div>

      <p className="mt-3 text-[14px] leading-[1.6] text-[#5b5b5b]">
        Um die besten Kreditangebote für Sie zu ermitteln, benötigt smava einige Informationen zu
        Ihrer Person und Ihrer finanziellen Situation.
      </p>

      <p className="mt-6 text-[17px] font-semibold text-[#323232]">Anzahl Kreditnehmer</p>

      <ChoiceTiles
        options={[
          { value: 1, label: "1 Person" },
          { value: 2, label: "2 Personen" },
        ]}
        value={data.borrowers}
        onChange={(value) => update({ borrowers: value })}
      />

      {twoBorrowers ? (
        <>
          <NoteBox icon="user">
            Super! Mit einem zweiten Kreditnehmer erhöhen sich Ihre Chancen auf einen günstigen
            Kredit.
          </NoteBox>

          <p className="mt-6 text-[17px] font-semibold text-[#323232]">Verhältnis der Kreditnehmer</p>

          <ChoiceTiles
            options={[
              { value: "Ehepartner", label: "Ehepartner" },
              { value: "Lebenspartner", label: "Lebenspartner" },
              { value: "anderes Verhältnis", label: "anderes Verhältnis" },
            ]}
            value={data.relationship}
            onChange={(value) => update({ relationship: value })}
          />
        </>
      ) : null}

      <NavButtons backTo="/" nextTo="/antrag/schritt-2" />
      <TrustBlock />
    </div>
  );
}
