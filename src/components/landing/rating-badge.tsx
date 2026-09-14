import ekomi from "@/assets/ekomi.webp.asset.json";
import { useEffect, useState } from "react";

function Stars({ className = "", size = "size-4" }: { className?: string; size?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${size} fill-[#f1a319]`}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function formatToday() {
  const d = new Date();
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

export function RatingBadge({ compact = false }: { compact?: boolean }) {
  const [date, setDate] = useState("Stand 8.9.2026");

  useEffect(() => {
    setDate(`Stand ${formatToday()}`);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <img
        src={ekomi.url}
        alt="eKomi Kundenauszeichnung Gold"
        width={compact ? 28 : 36}
        height={compact ? 28 : 36}
        className={compact ? "size-7" : "size-9"}
      />
      <div>
        <p className="flex items-center gap-1">
          <Stars size={compact ? "size-3" : "size-4"} className="gap-0" />
          <span
            className={`tabular whitespace-nowrap font-semibold text-hero-text ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            4.9/5
          </span>
        </p>
        <p
          className={`text-hero-text ${
            compact
              ? "max-w-[130px] text-[9px] leading-tight"
              : "max-w-[190px] text-[11px]"
          }`}
        >
          aus 705 Bewertungen der letzten 12 Monate – {date}
        </p>
      </div>
    </div>
  );
}
