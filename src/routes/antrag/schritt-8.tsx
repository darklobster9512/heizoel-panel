import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  NavButtons,
  ProgressBar,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-8")({
  head: () => ({ meta: [{ title: "Schritt 8: Ausgaben – smava Kreditanfrage" }] }),
  component: Step8,
});

function Step8() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={59} />

      <h1 className="mt-8 text-[24px] font-bold leading-[1.3] text-[#323232]">
        Ausgaben
      </h1>

      <WhyInfo text="Mit den Informationen zu Ihren Ausgaben berechnen wir Ihr frei verfügbares Einkommen und ermitteln somit passende Kreditangebote." />

      <div className="mt-6">
        <TextField
          id="miete"
          label="Warmmiete"
          placeholder="z.B. 750"
          suffix="€/Monat"
          hint="Hinweis für Mieter: Bitte geben Sie als Warmmiete den Betrag ein, den Sie monatlich an Ihren Vermieter überweisen. Hinweis, wenn Sie mietfrei oder bei den Eltern wohnen: Bitte geben Sie die Höhe der ggf. monatlich von Ihnen zu zahlenden Kosten ein."
          value={data.warmRent != null ? String(data.warmRent) : ""}
          onChange={(v) => {
            const n = Number(v.replace(/\D/g, ""));
            update(v !== "" && n >= 0 ? { warmRent: n } : {});
          }}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-7" nextTo="/antrag/schritt-9" />
      <TrustBlock />
    </div>
  );
}
