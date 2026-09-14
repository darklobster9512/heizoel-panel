import { createFileRoute } from "@tanstack/react-router";

import { useWizard, type SideJob } from "@/lib/wizard-store";
import {
  ChoiceTiles,
  CounterField,
  NavButtons,
  NoteBox,
  ProgressBar,
  SelectField,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-7")({
  head: () => ({ meta: [{ title: "Schritt 7: Weitere Einkommen – smava Kreditanfrage" }] }),
  component: Step7,
});

const yesNoOptions = [
  { value: true as boolean, label: "Ja" },
  { value: false as boolean, label: "Nein" },
];

const sideJobKinds = [
  "Angestellten- / Arbeitertätigkeit",
  "Selbst. Freiberufler/in",
  "Selbst. Gewerbetreibende/r",
  "Selbst. Geschäftsführer/in",
  "Sonstiges",
];

const propertyTypes = [
  { value: "Eigentumswohnung", label: "Eigentumswohnung" },
  { value: "Einfamilienhaus", label: "Einfamilienhaus" },
  { value: "Mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "Büro-/Geschäftsgebäude", label: "Büro-/Geschäftsgebäude" },
];

const labelClass = "text-[14px] text-[#323232]";
const hintClass = "mt-1.5 text-[12.5px] leading-[1.5] text-[#5b5b5b]";

function digits(v: string) {
  const n = Number(v.replace(/\D/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function Step7() {
  const { data, update } = useWizard();

  const count = data.sideJobCount ?? 1;
  const jobs: SideJob[] = data.sideJobs ?? [];

  function jobAt(i: number): SideJob {
    return jobs[i] ?? {};
  }

  function updateJob(i: number, patch: Partial<SideJob>) {
    const next = Array.from({ length: count }, (_, idx) => ({ ...(jobs[idx] ?? {}) }));
    next[i] = { ...next[i], ...patch };
    update({ sideJobs: next });
  }

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={45} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Weitere Einkommen
      </h1>

      <WhyInfo text="Beziehen Sie außerdem sonstige regelmäßige Einkünfte, z.B. aus Vermietung, Unterhalt oder Rente? Diese werden Ihrem Haupteinkommen hinzugerechnet und können sich positiv auf Ihre Kreditkonditionen auswirken." />

      <div className="mt-6 space-y-5">
        {/* Frage 1 */}
        <div>
          <p className={labelClass}>
            Gab es bei Ihrem Einkommen monatliche Abweichungen von mehr als 100 € in den letzten 3
            Monaten?
          </p>
          <ChoiceTiles
            options={yesNoOptions}
            value={data.incomeVariation}
            onChange={(v) => update({ incomeVariation: v })}
          />
        </div>

        {/* Frage 2 */}
        <div>
          <p className={labelClass}>Haben Sie berufliche Nebentätigkeiten?</p>
          <ChoiceTiles
            options={yesNoOptions}
            value={data.sideJob}
            onChange={(v) => update({ sideJob: v, sideJobCount: v ? (data.sideJobCount ?? 1) : 1 })}
          />
        </div>

        {data.sideJob ? (
          <div className="space-y-5">
            <NoteBox variant="green" icon="trend">
              Mit beruflichen Nebentätigkeiten können Sie mehr Angebote von den Banken erhalten.
            </NoteBox>

            <div>
              <p className={labelClass}>Anzahl beruflicher Nebentätigkeiten</p>
              <CounterField
                value={count}
                min={1}
                max={5}
                onChange={(v) => update({ sideJobCount: v, sideJobs: jobs.slice(0, v) })}
              />
            </div>

            {Array.from({ length: count }, (_, i) => {
              const job = jobAt(i);
              return (
                <div key={i} className="space-y-5">
                  <h2 className="text-[19px] font-bold leading-[1.3] text-[#323232]">
                    Ihre Nebentätigkeit {i + 1}
                  </h2>

                  <div>
                    <p className={labelClass}>Nettoeinkommen aus Nebentätigkeit</p>
                    <p className={hintClass}>
                      Bitte geben Sie das niedrigste Netto-Monatseinkommen der letzten 6 Monate aus
                      Ihrer Nebentätigkeit an.
                    </p>
                    <div className="mt-2">
                      <TextField
                        id={`sidejob-income-${i}`}
                        label=""
                        placeholder="z.B. 450"
                        suffix="€/Monat"
                        value={job.income != null ? String(job.income) : ""}
                        onChange={(v) => updateJob(i, { income: digits(v) })}
                      />
                    </div>
                  </div>

                  <div>
                    <p className={labelClass}>Sind die Einnahmen aus der Nebentätigkeit belegbar?</p>
                    <ChoiceTiles
                      options={yesNoOptions}
                      value={job.provable ?? false}
                      onChange={(v) => updateJob(i, { provable: v })}
                    />
                  </div>

                  {(job.provable ?? false) ? (
                    <>
                      <SelectField
                        id={`sidejob-kind-${i}`}
                        label="Um welche Art von Nebenbeschäftigung handelt es sich?"
                        placeholder="Um welche Art von Nebenbeschäftigung handelt es sich?"
                        options={sideJobKinds}
                        value={job.kind}
                        onChange={(v) => updateJob(i, { kind: v })}
                      />

                      <TextField
                        id={`sidejob-since-${i}`}
                        label="Seit wann üben Sie die Nebentätigkeit aus?"
                        placeholder="MM.JJJJ"
                        value={job.since ?? ""}
                        onChange={(v) => updateJob(i, { since: v })}
                      />

                      <div>
                        <p className={labelClass}>Ist Ihre Nebenbeschäftigung befristet?</p>
                        <ChoiceTiles
                          options={yesNoOptions}
                          value={job.temporary ?? false}
                          onChange={(v) => updateJob(i, { temporary: v })}
                        />
                      </div>

                      {job.temporary ? (
                        <TextField
                          id={`sidejob-until-${i}`}
                          label="Befristet bis"
                          placeholder="MM.JJJJ"
                          value={job.temporaryUntil ?? ""}
                          onChange={(v) => updateJob(i, { temporaryUntil: v })}
                        />
                      ) : null}

                      <div>
                        <p className={labelClass}>
                          Befinden Sie sich bei Ihrer Nebenbeschäftigung in der Probezeit?
                        </p>
                        <ChoiceTiles
                          options={yesNoOptions}
                          value={job.probation ?? false}
                          onChange={(v) => updateJob(i, { probation: v })}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Frage 3 */}
        <div>
          <p className={labelClass}>Sonstige Einkünfte?</p>
          <ChoiceTiles
            options={yesNoOptions}
            value={data.otherIncome}
            onChange={(v) => update({ otherIncome: v })}
          />
        </div>

        {data.otherIncome ? (
          <div className="space-y-5">
            <NoteBox variant="green" icon="trend">
              Mit weiteren Einkommen können Sie mehr Angebote von den Banken erhalten.
            </NoteBox>

            <div>
              <p className={labelClass}>Ehegattenunterhalt</p>
              <p className={hintClass}>
                Bitte geben Sie monatliche Einnahmen aus Ehegatten-Unterhaltszahlungen an. Wichtig:
                Die Zahlungen müssen nachweisbar sein, z.B. durch einen gerichtlichen
                Unterhaltstitel oder durch Ihre Kontoauszüge.
              </p>
              <div className="mt-2">
                <TextField
                  id="alimony-spouse"
                  label=""
                  suffix="€/Monat"
                  value={String(data.alimonySpouseAmount ?? 0)}
                  onChange={(v) => update({ alimonySpouseAmount: digits(v) })}
                />
              </div>
            </div>

            <div>
              <p className={labelClass}>Rente (netto)</p>
              <p className={hintClass}>
                Bitte tragen Sie hier die Summe Ihrer nachweisbaren zusätzlichen monatlichen
                Renteneinnahmen ein.
              </p>
              <div className="mt-2">
                <TextField
                  id="pension"
                  label=""
                  suffix="€/Monat"
                  value={String(data.pensionAmount ?? 0)}
                  onChange={(v) => update({ pensionAmount: digits(v) })}
                />
              </div>
            </div>

            <TextField
              id="child-support"
              label="Eingehender Kindesunterhalt"
              suffix="€/Monat"
              hint="Falls gerichtlich festgelegt ist, dass Sie Unterhalt für Kinder erhalten, geben Sie bitte die Gesamtsumme dieser monatlichen Unterhaltseinkünfte an."
              value={String(data.childSupportAmount ?? 0)}
              onChange={(v) => update({ childSupportAmount: digits(v) })}
            />
          </div>
        ) : null}

        {/* Frage 4 */}
        <div>
          <p className={labelClass}>Besitzen Sie Wohneigentum, das Sie vermieten?</p>
          <ChoiceTiles
            options={yesNoOptions}
            value={data.rentedProperty}
            onChange={(v) => update({ rentedProperty: v })}
          />
        </div>

        {data.rentedProperty ? (
          <div className="space-y-5">
            <NoteBox variant="green" icon="home">
              Vermietete Immobilien bedeuten mehr Einkommen – das wiederum bedeutet bessere
              Angebote.
            </NoteBox>

            <div>
              <p className={labelClass}>Welche Art von Immobilie vermieten Sie?</p>
              <ChoiceTiles
                options={propertyTypes}
                value={data.rentedPropertyType ?? "Eigentumswohnung"}
                onChange={(v) => update({ rentedPropertyType: v })}
              />
            </div>

            <TextField
              id="property-area"
              label="Fläche vermietete Immobilie"
              placeholder="z.B. 82"
              suffix="qm"
              value={data.rentedPropertyArea != null ? String(data.rentedPropertyArea) : ""}
              onChange={(v) => update({ rentedPropertyArea: digits(v) })}
            />

            <div>
              <p className={labelClass}>Einnahmen durch Vermietung (Warmmiete)</p>
              <p className={hintClass}>
                Falls Sie über monatliche Einnahmen aus der Vermietung von Immobilien verfügen,
                geben Sie bitte die Gesamtsumme aller Warmmieten in Euro an.
              </p>
              <div className="mt-2">
                <TextField
                  id="rental-income"
                  label=""
                  placeholder="z. B. 1.000"
                  suffix="€/Monat"
                  value={data.rentalIncome != null ? String(data.rentalIncome) : ""}
                  onChange={(v) => update({ rentalIncome: digits(v) })}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <NavButtons backTo="/antrag/schritt-6" nextTo="/antrag/schritt-8" />
      <TrustBlock />
    </div>
  );
}
