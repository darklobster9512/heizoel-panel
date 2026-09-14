import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Mail, PhoneCall } from "lucide-react";

import { useWizard } from "@/lib/wizard-store";
import { TrustBlock } from "@/components/wizard/ui";
import schufaneutral from "@/assets/schufaneutral.svg.asset.json";

export const Route = createFileRoute("/antrag/fertig")({
  head: () => ({ meta: [{ title: "Anfrage erhalten – smava Kreditanfrage" }] }),
  component: DonePage,
});

const NEXT_STEPS = [
  {
    icon: Mail,
    title: "Angebote per E-Mail",
    text: "Sie erhalten Ihre persönlichen Kreditangebote in Kürze per E-Mail.",
  },
  {
    icon: PhoneCall,
    title: "Persönliche Beratung",
    text: "Unsere Kreditspezialisten melden sich bei Rückfragen telefonisch bei Ihnen.",
  },
];

function DonePage() {
  const navigate = useNavigate();
  const { reset } = useWizard();

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <div className="mt-4 flex justify-center">
        <img src={schufaneutral.url} alt="100 % SCHUFA-neutral" className="h-[90px] w-auto" />
      </div>

      <h1 className="mt-6 text-center text-[24px] font-bold leading-[1.3] text-[#323232]">
        Vielen Dank, Ihre Anfrage ist eingegangen!
      </h1>
      <p className="mt-2 text-center text-[15px] leading-[1.6] text-[#5b5b5b]">
        Wir erstellen jetzt Ihre persönlichen Kreditangebote. Der Vergleich ist für Sie{" "}
        <strong className="font-semibold text-[#323232]">100 % kostenlos</strong> und{" "}
        <strong className="font-semibold text-[#323232]">SCHUFA-neutral</strong>.
      </p>

      <p className="mt-3 text-center text-[13px] text-[#5b5b5b]" role="status">
        Ihre Anfrage wurde entgegengenommen.
      </p>

      <div className="mt-8 space-y-3">
        {NEXT_STEPS.map((s) => (
          <div key={s.title} className="flex items-start gap-4 border border-[#dcdcdc] bg-white p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eff8f1]">
              <s.icon className="size-5 text-brand" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-[#323232]">{s.title}</p>
              <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[#5b5b5b]">{s.text}</p>
            </div>
          </div>
        ))}
        <div className="flex items-start gap-4 border border-[#dcdcdc] bg-white p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eff8f1]">
            <CheckCircle2 className="size-5 text-brand" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-[#323232]">Angebot auswählen</p>
            <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[#5b5b5b]">
              Wählen Sie das passende Angebot und schließen Sie den Antrag bequem online ab.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            reset();
            void navigate({ to: "/antrag/schritt-1", search: {} });
          }}
          className="flex h-[46px] items-center justify-center border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1]"
        >
          Neue Anfrage starten
        </button>
        <Link
          to="/"
          className="flex h-[46px] items-center justify-center bg-brand text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover"
        >
          Zur Startseite
        </Link>
      </div>

      <TrustBlock />
    </div>
  );
}
