import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import { NavButtons, ProgressBar, SelectField, TrustBlock, WhyInfo } from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-3")({
  head: () => ({ meta: [{ title: "Schritt 3: Berufsgruppe – smava Kreditanfrage" }] }),
  component: Step3,
});

const PROFESSIONS = [
  "Angestellte/r",
  "Angestellte/r in Kurzarbeit",
  "Arbeiter/in",
  "Angestellte/r im öffent. Dienst",
  "Facharbeiter/in",
  "Leitende/r Angestellte/r",
  "Rentner/in",
  "Pensionär/in",
  "Angestellte/r in Elternzeit",
  "Angestellte/r über Zeitarbeitsfirma",
  "Angestellte/r im Ausland",
  "Angestelltes ärztliches Fachpersonal",
  "Angestellte/r (Minijob 603 EUR Basis)",
  "Angestellte/r (im Krankenstand / Krankengeldbezug)",
  "Arbeiter/in im öffent. Dienst",
  "Arbeiter/in in Elternzeit",
  "Arbeitslose, Sozialhilfeempfänger, ohne Beschäftigung",
  "Auszubildende/r",
  "Beamte/r im einfachen Dienst",
  "Beamte/r im gehobenen Dienst",
  "Beamte/r im höheren Dienst",
  "Beamte/r im mittleren Dienst",
  "Hausfrau/-mann",
  "Hilfsarbeite/r",
  "Schüler/in",
  "Selbst. Freiberuflerin",
  "Selbst. Geschäftsführer/in",
  "Selbst. Gewerbetreibende/r",
  "Soldat/in",
  "Soldat/in auf Zeit",
  "Studierende/r",
  "Vorstand, Geschäftsführer/in",
  "Wehrdienstleistende/r",
];

function Step3() {
  const { data, update } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={17} />

      <h1 className="mt-8 text-[18px] font-bold text-[#323232]">Beruf</h1>

      <WhyInfo text="Wenn Sie einer bestimmten Berufsgruppe angehören, profitieren Sie von Sonderkonditionen wie niedrigen Zinssätzen, hohen Kreditsummen oder langen Laufzeiten." />

      <div className="mt-5">
        <SelectField
          id="profession"
          label="Berufsgruppe"
          options={PROFESSIONS}
          value={data.profession ?? "Angestellte/r"}
          onChange={(v) => update({ profession: v })}
        />
      </div>

      <NavButtons backTo="/antrag/schritt-2" nextTo="/antrag/schritt-4" />
      <TrustBlock />
    </div>
  );
}
