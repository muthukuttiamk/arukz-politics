/**
 * Button — Three variants for dark documentary theme.
 *
 * Variants:
 *   "primary" — Deep maroon, main CTA
 *   "accent"  — Gold, secondary CTA
 *   "ghost"   — Dark outlined, tertiary action
 *
 * Props:
 *   variant   {"primary"|"accent"|"ghost"}
 *   onClick   {function}
 *   children  {ReactNode}
 *   className {string}
 */
export default function Button({ variant = "primary", onClick, children, className = "" }) {
  const base =
    "inline-flex items-center gap-2 font-instrument font-bold tracking-wider uppercase " +
    "transition-all duration-250 cursor-pointer border-none";

  const variants = {
    primary:
      "px-8 py-3.5 rounded-full text-[13px] text-white " +
      "bg-[#8d1016] shadow-[0_8px_32px_rgba(141,16,22,0.5)] " +
      "hover:bg-[#a01820] hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(141,16,22,0.65)]",

    accent:
      "px-7 py-3.5 rounded-full text-[13px] text-[#080508] " +
      "bg-[#ffca00] shadow-[0_6px_24px_rgba(255,202,0,0.35)] " +
      "hover:bg-[#ffe082] hover:translate-y-[-2px] hover:shadow-[0_10px_32px_rgba(255,202,0,0.5)]",

    ghost:
      "px-5 py-2 rounded-lg text-[11px] " +
      "text-[var(--text-muted)] bg-[var(--surface-2)] " +
      "border border-[var(--border)] " +
      "hover:border-[var(--maroon)] hover:text-[var(--maroon)] hover:bg-[rgba(141,16,22,0.08)]",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
