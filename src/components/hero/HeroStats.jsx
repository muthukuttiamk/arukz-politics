/**
 * HeroStats — Animated statistics dashboard inside the Hero.
 *
 * Shows: Seasons · Events · Years · Categories · End Year
 * Each number counts up from 0 on mount.
 *
 * Props:
 *   seasons      {Array}
 *   totalEvents  {number}
 */
import AnimatedCounter from "../ui/AnimatedCounter";
import config from "../../config";

export default function HeroStats({ seasons, totalEvents }) {
  const stats = [
    { n: seasons.length,                                label: "SEASONS",    ta: "பருவங்கள்" },
    { n: totalEvents,                                   label: "EVENTS",     ta: "நிகழ்வுகள்" },
    { n: 11,                                            label: "YEARS",      ta: "ஆண்டுகள்" },
    { n: Object.keys(config.categories).length - 1,    label: "CATEGORIES", ta: "வகைகள்" },
    { n: 2026,                                          label: "END YEAR",   ta: "இறுதி ஆண்டு" },
  ];

  return (
    <div
      className="grid max-w-2xl mx-auto mb-8 overflow-hidden rounded-2xl"
      style={{
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(141,16,22,0.2)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center py-4 px-2"
          style={{ borderRight: i < stats.length - 1 ? "1px solid #eee" : "none" }}
        >
          <div
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#8d1016",
              lineHeight: 1,
            }}
          >
            <AnimatedCounter target={s.n} />
          </div>
          <div
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: "#bbb",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontFamily: "'Noto Sans Tamil', sans-serif",
              fontSize: 10,
              color: "#bbb",
              marginTop: 1,
            }}
          >
            {s.ta}
          </div>
        </div>
      ))}
    </div>
  );
}
