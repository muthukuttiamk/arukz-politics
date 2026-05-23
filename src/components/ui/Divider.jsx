/**
 * Divider — Decorative horizontal separator
 *
 * Props:
 *   label  {string}  — optional center text
 *   color  {"maroon"|"gold"|"muted"}
 */
export default function Divider({ label, color = "maroon" }) {
  const lineColor = {
    maroon: "rgba(141,16,22,0.25)",
    gold:   "rgba(255,202,0,0.4)",
    muted:  "rgba(0,0,0,0.1)",
  }[color] || "rgba(141,16,22,0.25)";

  const textColor = {
    maroon: "text-[#8d1016]",
    gold:   "text-[#c8a000]",
    muted:  "text-gray-400",
  }[color] || "text-[#8d1016]";

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${lineColor})` }} />
      {label && (
        <span className={`font-instrument text-[10px] font-bold tracking-widest uppercase shrink-0 ${textColor}`}>
          {label}
        </span>
      )}
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${lineColor})` }} />
    </div>
  );
}
