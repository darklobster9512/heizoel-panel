import ntv from "@/assets/ntv-gesamtsieger-heizoel24-2025.png.asset.json";
import bild from "@/assets/bild-empfehlung-2026.png.asset.json";
import welt from "@/assets/die-welt-service-champion-2025.png.asset.json";
import dtgv from "@/assets/dtgv-testsieger.png.asset.json";
import guarantee from "@/assets/guarantee.svg.asset.json";
import { OfferCard } from "./offer-card";
import type { PriceSearchValues } from "./price-search-types";

const CHECKS = [
  { prefix: "Bis zu ", bold: "20% günstiger", suffix: " als der Marktdurchschnitt" },
  { prefix: "Über ", bold: "500 zertifizierte Händler", suffix: " deutschlandweit" },
  { prefix: "", bold: "Festpreis-Garantie", suffix: " — auch bei steigenden Ölpreisen" },
];

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 size-4 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M3 10.5l4.5 4.5L17 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero({ onSearch }: { onSearch: (values: PriceSearchValues) => void }) {
  const trustBadges = (
    <div className="flex flex-nowrap items-center justify-center gap-2 overflow-x-auto pb-1 md:justify-start md:gap-3">
      <img
        src={ntv.url}
        alt="ntv Gesamtsieger Heizöl-Preisvergleich 2025"
        width={124}
        height={124}
        className="h-16 w-auto max-w-[140px] shrink-0 object-contain md:h-20 md:max-w-[170px]"
      />
      <img
        src={bild.url}
        alt="Bild Höchste Empfehlung 2026"
        width={330}
        height={227}
        className="h-16 w-auto max-w-[140px] shrink-0 object-contain md:h-20 md:max-w-[170px]"
      />
      <img
        src={welt.url}
        alt="Die Welt Service-Champion 2025"
        width={124}
        height={154}
        className="h-16 w-auto max-w-[140px] shrink-0 object-contain md:h-20 md:max-w-[170px]"
      />
      <img
        src={dtgv.url}
        alt="DtGV Testsieger Heizölportale"
        width={330}
        height={161}
        className="h-16 w-auto max-w-[140px] shrink-0 object-contain md:h-20 md:max-w-[170px]"
      />
    </div>
  );

  return (
    <section id="top" className="relative bg-surface">
      <div className="relative mx-auto grid max-w-6xl items-start gap-6 px-5 pb-[53px] pt-[29px] md:gap-10 md:py-12 lg:grid-cols-[1fr_510px] lg:py-14">
        <div>
          <div className="mb-3 md:mb-4">
            <span className="inline-flex items-center rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white md:text-sm">
              Nr. 1 Heizöl-Preisvergleich in Deutschland
            </span>
          </div>

          <div className="grid grid-cols-[minmax(0,7fr)_minmax(68px,3fr)] items-center gap-3 md:block">
            <h1 className="min-w-0 max-w-[14ch] font-hero text-[28px] font-medium leading-[1.3] tracking-normal text-hero-text md:max-w-[13ch] md:text-[52px] md:font-bold md:leading-[1.12] md:tracking-tight">
              Günstiges Heizöl -{" "}
              <span>garantiert!</span>
            </h1>

            <img
              src={guarantee.url}
              alt="Günstiger-geht-nicht-Garantie"
              width={88}
              height={88}
              className="mx-auto size-[82px] object-contain md:hidden"
            />
          </div>

          <p className="mt-5 max-w-[55ch] text-[15px] leading-snug text-hero-text md:mt-6 md:text-base">
            Heizölpreise heute ab{" "}
            <strong className="font-semibold text-ink">128,78 €/100L</strong> —{" "}
            <strong className="font-semibold text-ink">über 25.000 Kunden</strong>{" "}
            sparen{" "}
            <strong className="font-semibold text-ink">Ø €247 pro Bestellung</strong>
            , direkt vom Händler, deutschlandweit.
          </p>

          <ul className="mt-5 space-y-3 md:mt-6 md:space-y-4">
            {CHECKS.map((c) => (
              <li key={c.bold} className="flex gap-2 text-[15px] leading-snug text-hero-text md:gap-3 md:text-[15px]">
                <Check />
                <span>
                  {c.prefix}
                  <strong className="font-semibold text-ink">{c.bold}</strong>
                  {c.suffix}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden md:block">{trustBadges}</div>
        </div>

        <div id="rechner" className="relative scroll-mt-24">
          <img
            src={guarantee.url}
            alt="Günstiger-geht-nicht-Garantie"
            width={88}
            height={88}
            className="pointer-events-none absolute -right-2 -top-8 z-10 hidden size-[86px] drop-shadow-sm md:block"
          />
          <OfferCard mobileTrust={trustBadges} onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}
