import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckSquare } from "lucide-react";

import { RatingBadge } from "./rating-badge";

export interface PriceSearchValues {
  plz: string;
  menge: number;
  abladestellen: number;
}

const STEPS = [
  "Aktuelle Marktdaten eingelesen",
  "Günstigsten Lieferanten gefunden",
  "Tagesaktueller Preis berechnet",
];

export function PriceSearchLoading({ values }: { values: PriceSearchValues }) {
  const navigate = useNavigate();
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showTrust, setShowTrust] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setVisibleSteps(1), 850),
      window.setTimeout(() => setVisibleSteps(2), 1900),
      window.setTimeout(() => setVisibleSteps(3), 3000),
      window.setTimeout(() => setShowTrust(true), 3900),
      window.setTimeout(() => {
        void navigate({
          to: "/preisrechner/ergebnis",
          search: values,
        });
      }, 5000),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [navigate, values]);

  return (
    <main
      className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-background px-5 py-14 md:min-h-[calc(100vh-112px)]"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-[330px] text-center">
        <div className="mx-auto size-12 animate-spin rounded-full border-[3px] border-line border-b-brand" aria-hidden="true" />

        <h1 className="mt-5 text-[17px] font-semibold text-hero-text">
          Besten Preis suchen…
        </h1>
        <p className="mt-2 text-[13px] text-muted-custom">
          für PLZ <strong className="font-semibold text-hero-text">{values.plz}</strong>
          {" · "}
          {values.menge.toLocaleString("de-DE")} Liter
        </p>

        <ul className="mt-6 space-y-3 text-center">
          {STEPS.map((step, index) => (
            <li
              key={step}
              className={`inline-flex min-h-6 items-center justify-center gap-3 text-[14px] leading-6 transition-all duration-500 motion-reduce:transition-none ${
                index < visibleSteps
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <CheckSquare className="size-4 shrink-0 text-brand" strokeWidth={2.4} aria-hidden="true" />
              <span className="text-muted-custom">{step}</span>
            </li>
          ))}
        </ul>

        <div
          className={`mt-5 border-t border-line pt-4 transition-all duration-500 motion-reduce:transition-none ${
            showTrust ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex justify-center">
            <RatingBadge compact />
          </div>
        </div>
      </div>
    </main>
  );
}