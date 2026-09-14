import { useState, type ReactNode } from "react";
import { Check, Shield } from "lucide-react";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { PriceSearchValues } from "./price-search-loading";

const DELIVERY_POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const fieldClass =
  "mt-1 w-full rounded-md border border-line bg-background px-3 py-3.5 text-[13px] text-hero-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:px-4 md:py-3 md:text-[15px]";

const selectTriggerClass =
  "mt-1 w-full rounded-md border border-line bg-background px-3 py-3.5 text-[13px] text-hero-text focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-2 md:px-4 md:py-3 md:text-[15px]";

export function OfferCard({
  mobileTrust,
  bordered = true,
  initialPlz = "",
  onSearch,
}: {
  mobileTrust?: ReactNode;
  bordered?: boolean;
  initialPlz?: string;
  onSearch: (values: PriceSearchValues) => void;
}) {
  const [plz, setPlz] = useState(initialPlz);
  const [quantity, setQuantity] = useState(3000);
  const [deliveryPoints, setDeliveryPoints] = useState<number>(DELIVERY_POINTS[0] ?? 1);

  return (
    <div
      className={
        bordered
          ? "bg-transparent px-0 py-1 md:rounded-md md:border md:border-line md:bg-background md:p-9 md:shadow-card"
          : "bg-transparent px-0 py-1"
      }
    >
      <div className="mb-4 md:mb-5">
        <h2 className="font-hero text-lg font-semibold text-hero-text md:text-xl">
          Heizölpreis sofort berechnen
        </h2>
        <p className="mt-1 text-[13px] text-hero-text/70 md:text-sm">
          Kostenlos & unverbindlich — Ergebnis in Sekunden
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <div>
          <label htmlFor="plz" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Postleitzahl
          </label>

          <input
            id="plz"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="z. B. 10115"
            value={plz}
            onChange={(e) => setPlz(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className={`${fieldClass} tabular`}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Menge in Litern
          </label>

          <input
            id="quantity"
            type="text"
            inputMode="numeric"
            min={1500}
            max={32000}
            placeholder="z. B. 3000"
            value={quantity || ""}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              setQuantity(digits ? Number(digits) : 0);
            }}
            onBlur={() => {
              if (!quantity || quantity < 1500) setQuantity(1500);
              else if (quantity > 32000) setQuantity(32000);
            }}
            className={`${fieldClass} tabular`}
          />
        </div>

        <div>
          <label htmlFor="delivery-points" className="text-[13px] font-normal text-hero-text md:text-sm md:font-medium">
            Abladestellen
          </label>

          <Select
            value={String(deliveryPoints)}
            onValueChange={(value) => setDeliveryPoints(Number(value))}
          >
            <SelectTrigger id="delivery-points" className={selectTriggerClass}>
              <SelectValue placeholder="Abladestellen wählen" />
            </SelectTrigger>
            <SelectContent>
              {DELIVERY_POINTS.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="button"
        disabled={!/^\d{5}$/.test(plz) || quantity < 1500 || quantity > 32000}
        onClick={() =>
          onSearch({
            plz,
            menge: quantity,
            abladestellen: deliveryPoints,
          })
        }
        className="mt-4 inline-flex h-[46px] w-full items-center justify-center rounded-[4px] bg-brand px-5 py-0 text-xs font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:mt-7 md:shadow-none md:text-[15px]"
      >
        Jetzt Heizölpreise vergleichen
      </Button>

      <div className="mt-3 flex flex-nowrap items-center justify-center gap-2 text-[11px] text-hero-text/70 md:mt-4 md:text-xs">
        <span className="inline-flex items-center gap-1">
          <Shield className="size-3.5 shrink-0" />
          100% sicher & kostenlos
        </span>
        <span className="text-muted/60" aria-hidden="true">•</span>
        <span className="inline-flex items-center gap-1">
          <Check className="size-3.5 shrink-0" />
          Keine versteckten Kosten
        </span>
      </div>

      {mobileTrust ? <div className="mt-4 md:hidden">{mobileTrust}</div> : null}
    </div>
  );
}
