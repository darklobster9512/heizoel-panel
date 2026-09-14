import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  ChoiceTiles,
  NavButtons,
  ProgressBar,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-9")({
  head: () => ({ meta: [{ title: "Schritt 9: Weitere Ausgaben – smava Kreditanfrage" }] }),
  component: Step9,
});

const yesNo = [
  { value: true, label: "Ja" },
  { value: false, label: "Nein" },
];

function Question({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[15px] text-[#323232]">{label}</p>
      <div className="mt-2">
        <ChoiceTiles options={yesNo} value={value} onChange={onChange} />
      </div>
      {value === true && children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

function moneyProps(value: number | undefined, key: "privateHealthAmount" | "alimonySpouseAmount" | "alimonyChildAmount", update: (p: Record<string, unknown>) => void) {
  return {
    suffix: "€/Monat",
    value: value != null ? String(value) : "",
    onChange: (v: string) => {
      const n = Number(v.replace(/\D/g, ""));
      update(v !== "" && n >= 0 ? { [key]: n } : { [key]: undefined });
    },
  };
}

function Step9() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={63} />

      <h1 className="mt-8 text-[24px] font-bold leading-[1.3] text-[#323232]">
        Weitere Ausgaben
      </h1>

      <WhyInfo text="Mit den Informationen zu Ihren Ausgaben berechnen wir Ihr frei verfügbares Einkommen und ermitteln somit passende Kreditangebote." />

      <div className="mt-8 space-y-7">
        <Question
          label="Sind Sie privat krankenversichert? (ohne Zusatzversicherungen)"
          value={data.privateHealth}
          onChange={(v) => update({ privateHealth: v })}
        >
          <TextField
            id="privateHealthAmount"
            label="Private Krankenversicherung"
            placeholder="0"
            hint="Nennen Sie uns bitte den monatlichen Beitrag für Ihre private Krankenversicherung, den Sie als Arbeitnehmer selbst zahlen. Wichtig: Nicht gemeint sind hier private Zusatzversicherungen für gesetzlich Versicherte."
            {...moneyProps(data.privateHealthAmount, "privateHealthAmount", update)}
          />
        </Question>

        <Question
          label="Zahlen Sie Ehegattenunterhalt?"
          value={data.alimonySpouse}
          onChange={(v) => update({ alimonySpouse: v })}
        >
          <TextField
            id="alimonySpouseAmount"
            label="Ehegattenunterhalt (nach Scheidung)"
            placeholder="0"
            hint="Falls Sie Unterhalt für frühere Partner/innen zahlen, geben Sie bitte die monatliche Gesamtsumme dieser Unterhaltsverpflichtungen an."
            {...moneyProps(data.alimonySpouseAmount, "alimonySpouseAmount", update)}
          />
        </Question>

        <Question
          label="Zahlen Sie Kinderunterhalt?"
          value={data.alimonyChild}
          onChange={(v) => update({ alimonyChild: v })}
        >
          <TextField
            id="alimonyChildAmount"
            label="Zu zahlender Kindesunterhalt"
            placeholder="0"
            hint="Falls gerichtlich festgelegt ist, dass Sie Unterhalt für Kinder zahlen müssen, geben Sie bitte die Gesamtsumme dieser monatlichen Unterhaltsverpflichtungen an."
            {...moneyProps(data.alimonyChildAmount, "alimonyChildAmount", update)}
          />
        </Question>

        <Question
          label="Besitzen Sie einen PKW?"
          value={data.ownsCar}
          onChange={(v) => update({ ownsCar: v })}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-8" nextTo="/antrag/schritt-10" />
      <TrustBlock />
    </div>
  );
}
