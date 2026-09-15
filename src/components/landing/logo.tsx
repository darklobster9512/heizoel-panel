export function Logo({ className = "h-auto w-[139px]" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-hero text-[28px] font-bold leading-none tracking-tight ${className}`}
      role="img"
      aria-label="HEIZKING"
    >
      klaro<span className="text-brand">.</span>
    </span>
  );
}
