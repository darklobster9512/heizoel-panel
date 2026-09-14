import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  NavButtons,
  ProgressBar,
  SelectField,
  TextField,
  TrustBlock,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-13")({
  head: () => ({ meta: [{ title: "Schritt 13: Aktuelle Wohnanschrift – smava Kreditanfrage" }] }),
  component: Step13,
});

const COUNTRIES = [
  "Belgien",
  "Deutschland",
  "Dänemark",
  "Frankreich",
  "Luxemburg",
  "Niederlande",
  "Österreich",
  "Polen",
  "Schweiz",
  "Tschechische Republik",
  "Anderes Land",
];

function Step13() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={69} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Aktuelle Wohnanschrift
      </h1>

      <div className="mt-6 space-y-4">
        <TextField
          id="plz"
          label="PLZ"
          placeholder="z.B. 11011"
          value={data.zip ?? ""}
          onChange={(v) => update({ zip: v.replace(/\D/g, "").slice(0, 5) })}
        />

        <TextField
          id="ort"
          label="Wohnort"
          placeholder="z.B. Musterstadt"
          value={data.city ?? ""}
          onChange={(v) => update({ city: v })}
        />

        <div className="grid grid-cols-[1fr_120px] items-start gap-4">
          <TextField
            id="strasse"
            label="Straße"
            placeholder="z.B. Musterstraße"
            focusHint="Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt."
            value={data.street ?? ""}
            onChange={(v) => update({ street: v })}
          />
          <div className="flex h-full flex-col justify-end">
            <TextField
              id="hausnummer"
              label="Hausnummer"
              placeholder="z.B. 73"
              value={data.houseNumber ?? ""}
              onChange={(v) => update({ houseNumber: v })}
            />
          </div>
        </div>

        <SelectField
          id="land"
          label="Land"
          options={COUNTRIES}
          value={data.country}
          onChange={(v) => update({ country: v })}
        />

        <TextField
          id="wohnhaft-seit"
          label="Dort wohnhaft seit (Jahr)"
          placeholder="JJJJ"
          value={data.residentSince ?? ""}
          onChange={(v) => update({ residentSince: v.replace(/\D/g, "").slice(0, 4) })}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-12" nextTo="/antrag/schritt-14" />
      <TrustBlock />
    </div>
  );
}
