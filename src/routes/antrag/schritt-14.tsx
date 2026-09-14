import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  ChoiceTiles,
  NavButtons,
  NoteBox,
  ProgressBar,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-14")({
  head: () => ({ meta: [{ title: "Schritt 14: Arbeitsverhältnis – smava Kreditanfrage" }] }),
  component: Step14,
});

/** Formatiert Eingaben zu MM.JJJJ – Punkt erscheint sofort nach dem 2. Monats-Zeichen. */
function formatMonthYear(input: string, previous: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 6);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 6));
  let out = parts.join(".");
  const typingForward = input.length >= previous.length;
  if (typingForward && digits.length === 2) out += ".";
  return out;
}

/** Prüft, ob ein MM.JJJJ-Datum mindestens 3 Jahre in der Vergangenheit liegt. */
function isAtLeast3YearsAgo(monthYear: string): boolean {
  const match = monthYear.match(/^(\d{2})\.(\d{4})$/);
  if (!match) return false;
  const [, monthStr, yearStr] = match;
  const month = parseInt(monthStr!, 10);
  const year = parseInt(yearStr!, 10);
  if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) return false;
  const now = new Date();
  const diffMonths = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return diffMonths >= 36;
}

function Step14() {
  const { data, update } = useWizard();
  const [showSeniorityHint, setShowSeniorityHint] = useState(false);

  useEffect(() => {
    setShowSeniorityHint(isAtLeast3YearsAgo(data.employedSince ?? ""));
  }, [data.employedSince]);

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={73} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Arbeitsverhältnis
      </h1>

      <WhyInfo text="Ihre Angaben zu Ihrem Arbeitsverhältnis werden benötigt, um sicherzustellen, dass Sie sich in einem festen Beschäftigungsverhältnis befinden. Ihr Arbeitgeber wird von uns nicht kontaktiert." />

      <div className="mt-6 space-y-5">
        <TextField
          id="arbeitgeber"
          label="Name Arbeitgeber"
          placeholder="z.B. Mustermann GmbH"
          hint="Die Angabe dient der Bank zum Abgleich mit Ihrem Einkommensnachweis. Ihr Arbeitgeber wird über Ihre Kreditabsichten zu keinem Zeitpunkt von smava informiert."
          value={data.employer ?? ""}
          onChange={(v) => update({ employer: v })}
        />

        <TextField
          id="beschaeftigt-seit"
          label="Beschäftigt seit"
          placeholder="MM.JJJJ"
          inputMode="numeric"
          focusHint="Wenn Sie Ihre aktuelle berufliche Tätigkeit seit weniger als 2 Jahren ausüben, möchten die Banken zusätzlich die Angaben zu Ihrer vorherigen Beschäftigung kennen."
          value={data.employedSince ?? ""}
          onChange={(v) => update({ employedSince: formatMonthYear(v, data.employedSince ?? "") })}
        />
        {showSeniorityHint ? (
          <NoteBox variant="green" icon="briefcase" compact>
            Banken schätzen es, wenn Sie schon mehrere Jahre berufstätig sind.
          </NoteBox>
        ) : null}



        <div>
          <p className="text-[14px] text-[#323232]">Arbeiten Sie in Teilzeit?</p>
          <ChoiceTiles
            options={[
              { value: true, label: "Ja" },
              { value: false, label: "Nein" },
            ]}
            value={data.partTime ?? false}
            onChange={(v) => update({ partTime: v })}
          />
          {data.partTime ? (
            <div className="mt-5">
              <p className="text-[14px] text-[#323232]">Teilzeit oder Kurzarbeit?</p>
              <ChoiceTiles
                options={[
                  { value: "teilzeit", label: "Teilzeit" },
                  { value: "kurzarbeit", label: "Kurzarbeit" },
                ]}
                value={data.partTimeType ?? "teilzeit"}
                onChange={(v) => update({ partTimeType: v })}
              />
              <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#5b5b5b]">
                Bitte geben Sie hier an, wenn Sie aktuell in Kurzarbeit sind. Dies ist wichtig,
                damit Banken Ihnen passende Angebote machen können.
              </p>
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-[14px] text-[#323232]">Ist Ihr Arbeitsverhältnis befristet?</p>
          <ChoiceTiles
            options={[
              { value: true, label: "Ja" },
              { value: false, label: "Nein" },
            ]}
            value={data.temporaryContract ?? false}
            onChange={(v) => update({ temporaryContract: v })}
          />
          <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#5b5b5b]">
            <span className="font-semibold">Wichtig:</span> Steht auf Ihrer Gehaltsabrechnung ein
            Austrittsdatum (Renteneintritt ausgenommen), dann liegt aus Sicht der Bank ein
            befristetes Arbeitsverhältnis vor. Bei einem unbefristeten Arbeitsverhältnis bieten
            Banken meist günstigere Zinssätze an.
          </p>

          {data.temporaryContract ? (
            <div className="mt-5 space-y-5">
              <TextField
                id="befristet-bis"
                label="Beschäftigung befristet bis"
                placeholder="MM.JJJJ"
                inputMode="numeric"
                hint="Wieso fragen wir das? Aufgrund dessen, kann ein optimales Angebot für Sie ermittelt werden."
                value={data.temporaryContractUntil ?? ""}
                onChange={(v) =>
                  update({ temporaryContractUntil: formatMonthYear(v, data.temporaryContractUntil ?? "") })
                }
              />
              <div>
                <p className="text-[14px] text-[#323232]">
                  Wurde Ihr Arbeitsvertrag beim aktuellen Arbeitgeber schon mindestens einmal
                  verlängert?
                </p>
                <ChoiceTiles
                  options={[
                    { value: true, label: "Ja" },
                    { value: false, label: "Nein" },
                  ]}
                  value={data.contractExtended ?? false}
                  onChange={(v) => update({ contractExtended: v })}
                />
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <NoteBox variant="green" icon="briefcase" compact>
                Sehr gut! In einem unbefristeten Arbeitsverhältnis sind Ihre Chancen auf einen
                Kredit doppelt so hoch.
              </NoteBox>
            </div>
          )}
        </div>
      </div>

      <NavButtons backTo="/antrag/schritt-13" nextTo="/antrag/schritt-15" />
      <TrustBlock />
    </div>
  );
}
