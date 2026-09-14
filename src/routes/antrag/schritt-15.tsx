import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Euro, Percent } from "lucide-react";

import { useWizard, type LoanEntry } from "@/lib/wizard-store";
import {
  ChoiceTiles,
  CounterField,
  NavButtons,
  NoteBox,
  ProgressBar,
  SelectField,
  TextField,
  TrustBlock,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-15")({
  head: () => ({ meta: [{ title: "Schritt 15: Bestehende Kredite – smava Kreditanfrage" }] }),
  component: Step15,
});

const yesNoOptions = [
  { value: true as boolean, label: "Ja" },
  { value: false as boolean, label: "Nein" },
];

const loanKinds = [
  "Konsumentenkredit",
  "0% Finanzierung",
  "Autokredit",
  "Rahmenkredit",
  "Kreditkarte",
  "Dispositionskredit",
  "Geschäftskredit",
  "Leasing",
  "Arbeitgeberdarlehen",
  "Ballonfinanzierung / Schlussratenfinanzierung",
];


const bankDetailOptions = [
  { value: "iban" as const, label: "IBAN" },
  { value: "konto" as const, label: "Konto-Nr. & BLZ" },
];

const termOptions = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((m) => `${m} Monate`);

const labelClass = "text-[14px] text-[#323232]";
const hintClass = "mt-1.5 text-[12.5px] leading-[1.5] text-[#5b5b5b]";

const BENEFITS = [
  { icon: CreditCard, text: "Monatliche Rate neu wählen" },
  { icon: Euro, text: "Höhere Kreditsumme beantragen" },
  { icon: Percent, text: "Kredite mit günstigerem Zins ablösen" },
];

function digits(v: string) {
  const n = Number(v.replace(/\D/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMonthYear(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 6);
  if (d.length <= 2) return d.length === 2 ? `${d}.` : d;
  return `${d.slice(0, 2)}.${d.slice(2)}`;
}

function Step15() {
  const { data, update } = useWizard();

  const count = data.existingLoans ?? 0;
  const loans: LoanEntry[] = data.loans ?? [];
  const amount = data.amount ?? 30000;
  const amountLabel = `${amount.toLocaleString("de-DE")}€`;

  function loanAt(i: number): LoanEntry {
    const loan = loans[i] ?? { kind: "Konsumentenkredit", bankDetailType: "iban" };
    if (!loanKinds.includes(loan.kind ?? "")) {
      loan.kind = "Konsumentenkredit";
    }
    return loan;
  }


  function updateLoan(i: number, patch: Partial<LoanEntry>) {
    const next = Array.from({ length: count }, (_, idx) => ({ ...loanAt(idx), ...(idx === i ? patch : {}) }));
    update({ loans: next });
  }

  const anyRefinance = Array.from({ length: count }, (_, i) => loanAt(i)).some((l) => l.refinance);

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={81} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Dank Umschuldung zu besseren Kreditkonditionen
      </h1>

      <p className="mt-4 text-[15px] leading-[1.6] text-[#323232]">
        Banken bewerten es positiv, wenn Sie Ihre bestehenden Kredite ablösen und nur noch einen
        einzigen Kredit zurückzahlen müssen.
      </p>

      <div className="mt-4 space-y-3">
        {BENEFITS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-[15px] text-[#323232]">
            <span className="grid size-[26px] shrink-0 place-items-center bg-[#d9efdd]">
              <Icon className="size-[15px] text-brand" />
            </span>
            {text}
          </div>
        ))}
      </div>

      <NoteBox variant="blue">
        Eine Umschuldung spart Ihnen Geld und kann Ihre Bonität verbessern. Banken bieten für
        Umschuldungen oft günstige Zinssätze an.
      </NoteBox>

      <h2 className="mt-6 text-[19px] font-bold leading-[1.3] text-[#323232]">
        Bestehende Kredite
      </h2>

      <div className="mt-4">
        <p className={labelClass}>Anzahl Bestehende Kredite</p>
        <CounterField
          value={count}
          min={0}
          max={6}
          onChange={(v) =>
            update({
              existingLoans: v,
              loans: Array.from({ length: v }, (_, idx) => loans[idx] ?? {
                kind: "Konsumentenkredit",
                bankDetailType: "iban",
              }),
            })
          }
        />
        <p className={hintClass}>
          Wichtig: Baufinanzierungen zählen hier NICHT dazu. Bitte geben Sie hier vorhandene
          Ratenkredite, Dispos, Leasing und Rahmenkredite an.
        </p>
      </div>

      {Array.from({ length: count }, (_, i) => {
        const loan = loanAt(i);
        return (
          <div key={i} className="mt-6 space-y-5">
            <h2 className="text-[19px] font-bold leading-[1.3] text-[#323232]">
              Bestehender Kredit {i + 1}
            </h2>

            <SelectField
              id={`kredit-art-${i}`}
              label="Kreditart"
              options={loanKinds}
              value={loan.kind ?? "Konsumentenkredit"}
              onChange={(v) => updateLoan(i, { kind: v })}
            />

            <TextField
              id={`kredit-betrag-${i}`}
              label="Ursprünglicher Kreditbetrag"
              placeholder="z.B. 10.000"
              suffix="€"
              inputMode="numeric"
              value={loan.originalAmount ? String(loan.originalAmount) : ""}
              onChange={(v) => updateLoan(i, { originalAmount: digits(v) })}
            />

            <TextField
              id={`kredit-rate-${i}`}
              label="Monatliche Rate"
              placeholder="z.B. 100"
              suffix="€"
              inputMode="numeric"
              value={loan.monthlyRate ? String(loan.monthlyRate) : ""}
              onChange={(v) => updateLoan(i, { monthlyRate: digits(v) })}
            />

            <TextField
              id={`kredit-beginn-${i}`}
              label="Kreditbeginn"
              placeholder="MM.JJJJ"
              inputMode="numeric"
              maxLength={7}
              value={loan.startDate ?? ""}
              onChange={(v) => updateLoan(i, { startDate: formatMonthYear(v) })}
            />

            <TextField
              id={`kredit-ende-${i}`}
              label="Restlaufzeit bis"
              placeholder="MM.JJJJ"
              inputMode="numeric"
              maxLength={7}
              value={loan.endDate ?? ""}
              onChange={(v) => updateLoan(i, { endDate: formatMonthYear(v) })}
            />

            <div>
              <p className={labelClass}>Wollen Sie diesen Kredit umschulden?</p>
              <ChoiceTiles
                options={yesNoOptions}
                value={loan.refinance}
                onChange={(v) => updateLoan(i, { refinance: v })}
              />
              {loan.refinance ? (
                <p className={hintClass}>
                  Durch eine Umschuldung können Sie häufig Ihre Ausgaben senken. Das spart Ihnen
                  Geld und verbessert Ihre Haushaltsrechnung – und damit Ihre Bonität. Deshalb
                  vergeben Banken hier oft besonders günstige Zinssätze.
                </p>
              ) : null}
            </div>

            {loan.refinance ? (
              <>
                <TextField
                  id={`kredit-restschuld-${i}`}
                  label="Geschätzte Restschuld"
                  placeholder="z.B. 1.250"
                  suffix="€"
                  inputMode="numeric"
                  value={loan.remainingDebt ? String(loan.remainingDebt) : ""}
                  onChange={(v) => updateLoan(i, { remainingDebt: digits(v) })}
                />

                <div className="border border-[#c9c9c9] p-4">
                  <span className="inline-block bg-[#efefef] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5b5b5b]">
                    Optional
                  </span>
                  <p className={`mt-3 ${labelClass}`}>Angabe zur Bankverbindung</p>
                  <ChoiceTiles
                    options={bankDetailOptions}
                    value={loan.bankDetailType ?? "iban"}
                    onChange={(v) => updateLoan(i, { bankDetailType: v })}
                  />

                  {(loan.bankDetailType ?? "iban") === "iban" ? (
                    <div className="mt-4">
                      <TextField
                        id={`kredit-iban-${i}`}
                        label="IBAN"
                        placeholder="z.B. DE44 5001 0517 8247 8177 38"
                        value={loan.iban ?? ""}
                        onChange={(v) => updateLoan(i, { iban: v })}
                        hint="Ihre 22-stellige Kreditkontonummer finden Sie in Ihrem Online Banking/Ihrer Umsatzanzeige in der Detailansicht der abgebuchten Rate."
                      />
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <TextField
                        id={`kredit-kontonr-${i}`}
                        label="Kontonummer"
                        placeholder="z.B. 1234567890"
                        inputMode="numeric"
                        value={loan.accountNumber ?? ""}
                        onChange={(v) => updateLoan(i, { accountNumber: v.replace(/\D/g, "") })}
                      />
                      <TextField
                        id={`kredit-blz-${i}`}
                        label="BLZ"
                        placeholder="z.B. 50010517"
                        inputMode="numeric"
                        value={loan.bankCode ?? ""}
                        onChange={(v) => updateLoan(i, { bankCode: v.replace(/\D/g, "") })}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        );
      })}

      {anyRefinance ? (
        <div className="mt-8 space-y-5">
          <h2 className="text-[22px] font-bold leading-[1.3] text-[#323232]">
            Kreditbetrag anpassen
          </h2>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <AdjustTile
              selected={data.loanAmountAdjust === "keep"}
              onSelect={() => update({ loanAmountAdjust: "keep" })}
            >
              <span className="font-medium">{amountLabel}</span>
              <br />
              Kreditbetrag nicht anpassen
            </AdjustTile>
            <AdjustTile
              selected={(data.loanAmountAdjust ?? "increase") === "increase"}
              onSelect={() => update({ loanAmountAdjust: "increase" })}
            >
              <span className="font-medium">{amountLabel}</span>
              <br />
              Ursprünglich ausgewählten Kreditbetrag um Restschuld der umzuschuldenden Kredite
              erhöhen
            </AdjustTile>
            <AdjustTile
              selected={data.loanAmountAdjust === "custom"}
              onSelect={() => update({ loanAmountAdjust: "custom" })}
            >
              Anderen Kreditbetrag angeben
            </AdjustTile>
          </div>

          {data.loanAmountAdjust === "custom" ? (
            <TextField
              id="kredit-eigener-betrag"
              label="Gewünschter Kreditbetrag"
              placeholder="z.B. 35.000"
              suffix="€"
              inputMode="numeric"
              value={data.loanAmountCustom ? String(data.loanAmountCustom) : ""}
              onChange={(v) => update({ loanAmountCustom: digits(v) })}
            />
          ) : null}

          <SelectField
            id="kredit-laufzeit"
            label="Kreditlaufzeit"
            options={termOptions}
            value={`${data.termMonths ?? 84} Monate`}
            onChange={(v) => update({ termMonths: digits(v) })}
          />
        </div>
      ) : null}

      <NavButtons backTo="/antrag/schritt-14" nextTo="/antrag/schritt-16" withSave />
      <TrustBlock />
    </div>
  );
}

function AdjustTile({
  selected,
  onSelect,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 border p-4 text-left text-[14px] leading-[1.5] transition-colors ${
        selected
          ? "border-brand bg-[#eff8f1] text-[#323232]"
          : "border-[#c9c9c9] bg-white text-[#323232] hover:bg-[#f7f7f7]"
      }`}
    >
      <span
        className={`grid size-[18px] shrink-0 place-items-center rounded-full border-2 ${
          selected ? "border-brand" : "border-[#c9c9c9]"
        }`}
      >
        {selected ? <span className="size-2 rounded-full bg-brand" /> : null}
      </span>
      <span>{children}</span>
    </button>
  );
}
