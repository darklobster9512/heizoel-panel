import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import { COUNTRY_OPTIONS, countryOptionsWithout } from "@/lib/countries";
import {
  CheckboxRow,
  CountrySelectField,
  NavButtons,
  ProgressBar,
  TextField,
  TrustBlock,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-12")({
  head: () => ({ meta: [{ title: "Schritt 12: Geburtsdaten – smava Kreditanfrage" }] }),
  component: Step12,
});

function formatBirthdate(input: string, previous: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  let out = parts.join(".");
  // Punkt sofort anhängen, sobald Tag bzw. Monat vollständig getippt sind
  const typingForward = input.length >= previous.length;
  if (typingForward && (digits.length === 2 || digits.length === 4)) out += ".";
  return out;
}

function Step12() {
  const { data, update } = useWizard();
  const secondNationalityOptions = useMemo(
    () => countryOptionsWithout(data.nationality),
    [data.nationality],
  );

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={66} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Persönliche Angaben
      </h1>

      <div className="mt-5 space-y-4">
        <TextField
          id="geburtsdatum"
          label="Geburtsdatum"
          placeholder="TT.MM.JJJJ"
          inputMode="numeric"
          maxLength={10}
          persistentFocusHint="Hiermit können Sie sich jederzeit anmelden und Ihre Angebote einsehen. Ihre Angaben sollten mit Ihrem Ausweis übereinstimmen."
          persistentHintIcon="login"
          value={data.birthdate ?? ""}
          onChange={(v) => update({ birthdate: formatBirthdate(v, data.birthdate ?? "") })}
        />
        <TextField
          id="geburtsort"
          label="Geburtsort"
          placeholder="z.B. Musterstadt"
          value={data.birthplace ?? ""}
          onChange={(v) => update({ birthplace: v })}
        />
        <CountrySelectField
          id="geburtsland"
          label="Geburtsland"
          options={COUNTRY_OPTIONS}
          value={data.birthcountry}
          onChange={(v: string) => update({ birthcountry: v })}
        />
        <CountrySelectField
          id="staatsangehoerigkeit"
          label="Staatsangehörigkeit"
          options={COUNTRY_OPTIONS}
          value={data.nationality}
          onChange={(v: string) =>
            update({
              nationality: v,
              ...(data.secondNationality === v ? { secondNationality: "" } : {}),
            })
          }
        />
        <CheckboxRow
          checked={data.moreNationalities ?? false}
          onChange={(v) =>
            update({
              moreNationalities: v,
              ...(v ? {} : { secondNationality: "" }),
            })
          }
        >
          Ich habe weitere Staatsangehörigkeiten
        </CheckboxRow>

        {data.moreNationalities ? (
          <CountrySelectField
            id="weitere-staatsangehoerigkeit"
            label="Weitere Staatsangehörigkeit"
            options={secondNationalityOptions}
            value={data.secondNationality}
            onChange={(v: string) => update({ secondNationality: v })}
          />
        ) : null}
      </div>

      <NavButtons backTo="/antrag/schritt-11" nextTo="/antrag/schritt-13" />
      <TrustBlock />
    </div>
  );
}
