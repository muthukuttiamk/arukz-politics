/**
 * AudienceRow — "For: News · Officials · Directors…" badges.
 *
 * Reads from config.audiences.
 * Icons use SVG via CatIcon (icon key stored in config).
 * Used in Hero section.
 */
import config from "../../config";
import CatIcon from "../ui/CatIcon";

export default function AudienceRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <span style={{
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>
        For:
      </span>
      {config.audiences.map((a) => (
        <span
          key={a.en}
          className="inline-flex items-center gap-1.5"
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: "3px 10px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <CatIcon name={a.icon} size={12} color="rgba(255,255,255,0.4)" />
          {a.label}
        </span>
      ))}
    </div>
  );
}
