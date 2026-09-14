import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { WizardProvider } from "@/lib/wizard-store";
import { WizardFooter } from "@/components/wizard/ui";
import { Logo } from "@/components/landing/logo";

const validateSearch = (search: Record<string, unknown>) => {
  const betrag = Number(search["betrag"]);
  const laufzeit = Number(search["laufzeit"]);
  const anzahlung = Number(search["anzahlung"]);
  const menge = Number(search["menge"]);
  const out: {
    zweck?: string;
    betrag?: number;
    laufzeit?: number;
    anzahlung?: number;
    plz?: string;
    menge?: number;
    abladestellen?: string;
  } = {};
  if (typeof search["zweck"] === "string" && search["zweck"]) out.zweck = search["zweck"];
  if (Number.isFinite(betrag) && betrag > 0) out.betrag = betrag;
  if (Number.isFinite(laufzeit) && laufzeit > 0) out.laufzeit = laufzeit;
  if (Number.isFinite(anzahlung) && anzahlung > 0) out.anzahlung = anzahlung;
  if (typeof search["plz"] === "string" && /^\d{5}$/.test(search["plz"])) out.plz = search["plz"];
  if (Number.isFinite(menge) && menge > 0) out.menge = menge;
  if (typeof search["abladestellen"] === "string" && search["abladestellen"]) out.abladestellen = search["abladestellen"];
  return out;
};

export const Route = createFileRoute("/antrag")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "smava Kreditanfrage – Jetzt Kreditangebote berechnen" },
      {
        name: "description",
        content:
          "Kostenlose smava Kreditanfrage: In wenigen Schritten Angaben machen und passende Kreditangebote von über 20 Banken erhalten – 100 % SCHUFA-neutral und kostenlos.",
      },
    ],
  }),
  component: WizardLayout,
});

function WizardLayout() {
  const search = Route.useSearch();
  return (
    <WizardProvider search={search}>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="sticky top-0 z-20 border-b border-border bg-white shadow-header-strong">
          <div className="mx-auto flex h-14 max-w-[1100px] items-center px-5 md:px-8">
            <Link to="/" aria-label="smava Startseite" className="text-smava-logo">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-16">
          <Outlet />
        </main>

        <WizardFooter />
      </div>
    </WizardProvider>
  );
}
