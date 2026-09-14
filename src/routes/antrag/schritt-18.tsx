import { createFileRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { useWizard } from "@/lib/wizard-store";
import {
  NavButtons,
  ProgressBar,
  SelectField,
  TextField,
  TrustBlock,
} from "@/components/wizard/ui";

import ssl from "@/assets/ssl.png.asset.json";
import tuevSiegel from "@/assets/tuev-siegel.svg.asset.json";

export const Route = createFileRoute("/antrag/schritt-18")({
  head: () => ({
    meta: [
      { title: "Schritt 18: Bankverbindung – smava Kreditanfrage" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Step18,
});

const BANK_COUNTRIES = ["Deutschland", "Anderes Land"];

function sanitizeIban(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function formatIban(raw: string): string {
  const sanitized = sanitizeIban(raw);
  return sanitized.match(/.{1,4}/g)?.join(" ") ?? sanitized;
}

function BankTile({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex h-[52px] w-full items-center gap-3 border px-4 text-left text-[15px] transition-colors",
        active
          ? "border-brand bg-[#eff8f1] font-medium text-[#323232]"
          : "border-[#dcdcdc] bg-white text-[#323232] hover:bg-[#f7f7f7]",
      )}
    >
      <span
        className={cn(
          "relative flex size-5 shrink-0 items-center justify-center rounded-full border-2",
          active ? "border-brand" : "border-[#9a9a9a]",
        )}
      >
        {active && <span className="size-2.5 rounded-full bg-brand" />}
      </span>
      {label}
    </button>
  );
}

function Step18() {
  const { data, update } = useWizard();
  const type = data.bankDetailType ?? "iban";

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={95} label="Nur noch 2 Schritte" />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Ihre Angebote werden jetzt bei den Banken abgefragt
      </h1>

      <p className="mt-3 text-[15px] leading-[1.6] text-[#323232]">
        Dafür wird von den Banken ein Konto in Ihrem Namen vorausgesetzt. So
        schützen die Banken Sie und sich selbst vor Betrug.
      </p>

      <p className="mt-6 text-[14px] text-[#323232]">
        Bankverbindung zur Kreditauszahlung
      </p>
      <div className="mt-1.5 grid grid-cols-2 gap-2.5">
        <BankTile
          label="IBAN"
          active={type === "iban"}
          onClick={() => update({ bankDetailType: "iban" })}
        />
        <BankTile
          label="Konto-Nr. & BLZ"
          active={type === "konto"}
          onClick={() => update({ bankDetailType: "konto" })}
        />
      </div>

      {type === "iban" ? (
        <div className="mt-5">
          <TextField
            id="iban"
            label="IBAN"
            placeholder="z.B. DE44 5001 0517 8247 8177 38"
            value={formatIban(data.bankIban ?? "")}
            onChange={(v) => update({ bankIban: sanitizeIban(v) })}
            maxLength={42}
          />
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <SelectField
            id="bankCountry"
            label="Land"
            options={BANK_COUNTRIES}
            value={data.bankCountry ?? "Deutschland"}
            onChange={(v) => update({ bankCountry: v })}
          />
          <TextField
            id="bankAccountNumber"
            label="Kontonummer"
            placeholder="z.B. 0648489890"
            value={data.bankAccountNumber ?? ""}
            onChange={(v) => update({ bankAccountNumber: v.replace(/\D/g, "") })}
            inputMode="numeric"
            maxLength={12}
          />
          <TextField
            id="bankCode"
            label="Bankleitzahl"
            placeholder="z.B. 50010517"
            value={data.bankCode ?? ""}
            onChange={(v) => update({ bankCode: v.replace(/\D/g, "") })}
            inputMode="numeric"
            maxLength={8}
          />
        </div>
      )}

      <div className="mt-7 flex items-center gap-4">
        <img
          src={tuevSiegel.url}
          alt="TÜV Saarland – Geprüfter Datenschutz"
          className="h-[52px] w-auto"
        />
        <img
          src={ssl.url}
          alt="SSL – Datensicherheit"
          className="size-[52px]"
        />
        <p className="text-[13px] leading-[1.5] text-[#5b5b5b]">
          TÜV-geprüfte und SSL-verschlüsselte Verbindung
        </p>
      </div>

      <NavButtons
        withSave
        backTo="/antrag/schritt-17"
        nextTo="/angebote"
        nextLabel="Weiter"
      />

      <TrustBlock />
    </div>
  );
}
