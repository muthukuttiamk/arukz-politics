/**
 * EventCard — Dark-themed clickable incident card.
 *
 * Tags show: YEAR badge + PARTY badges (replaces old category tags).
 * News link opens Google News search for the event.
 * Search query highlights matched text in gold.
 */
import { motion } from "framer-motion";
import config from "../../config";
import CatIcon from "../ui/CatIcon";

/* ── Highlight matched text ───────────────────────────── */
function Highlight({ text, query }) {
  if (!query?.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: "#ffca00", color: "#080508", borderRadius: 2, padding: "0 2px" }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ── Google News link ─────────────────────────────────── */
function newsUrl(event) {
  const q = encodeURIComponent(`${event.newsQuery || event.title} Tamil Nadu`);
  return `https://www.google.com/search?q=${q}&gl=IN&hl=ta`;
}

export default function EventCard({ event, index, query = "", onClick }) {
  const cat    = config.categories[event.filter] || config.categories.all;
  const year   = event.year;
  const parties = (event.parties || []).slice(0, 3); // show max 3

  return (
    <motion.div
      className="group relative cursor-pointer rounded-xl overflow-hidden"
      style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{
        y: -4,
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border-light)",
        boxShadow: "0 12px 40px rgba(141,16,22,0.25), 0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Left accent on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "var(--maroon)" }}
      />

      <div className="p-4">
        {/* Row 1: id + category icon */}
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily:"'Teko'", fontSize:12, fontWeight:700, color:"var(--maroon)", letterSpacing:"0.12em" }}>
            #{String(event.id).padStart(2,"0")}
          </span>
          <CatIcon name={cat.icon} size={16} color="var(--text-dim)" />
        </div>

        {/* Date */}
        <div style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--maroon)", marginBottom:6 }}>
          {event.date}
        </div>

        {/* Title */}
        <h3
          className="group-hover:!text-[#ffca00] transition-colors duration-200"
          style={{ fontFamily:"'Teko'", fontSize:"clamp(1rem,2vw,1.2rem)", fontWeight:600, lineHeight:1.25, color:"var(--text)", marginBottom:8 }}
        >
          <Highlight text={event.title} query={query} />
        </h3>

        {/* Description preview */}
        <p
          className="font-tamil"
          style={{
            fontSize:12, lineHeight:"1.8", color:"var(--text-muted)", marginBottom:12,
            display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden",
          }}
        >
          <Highlight text={event.desc} query={query} />
        </p>

        {/* Year + Party tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {/* Year badge */}
          {year && (
            <span style={{
              fontFamily:"'Teko'", fontSize:13, fontWeight:700, lineHeight:1,
              color:"var(--gold)", background:"rgba(255,202,0,0.12)",
              border:"1px solid rgba(255,202,0,0.25)", borderRadius:4, padding:"2px 8px",
            }}>
              {year}
            </span>
          )}
          {/* Party badges */}
          {parties.map((p) => {
            const party = config.parties[p];
            if (!party) return null;
            return (
              <span key={p} style={{
                fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800,
                letterSpacing:"0.12em", textTransform:"uppercase",
                color: party.color,
                background: party.bg,
                border: `1px solid ${party.color}40`,
                borderRadius:4, padding:"2px 7px",
              }}>
                {party.en}
              </span>
            );
          })}
        </div>

        {/* Footer: news link + CTA */}
        <div className="flex items-center justify-between gap-2 pt-2.5" style={{ borderTop:"1px solid var(--border)" }}>
          {/* Google News link */}
          <a
            href={newsUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.1em" }}
            title="Search on Google News"
          >
            <CatIcon name="link" size={11} color="var(--text-dim)" />
            News
          </a>

          {/* CTA */}
          <button
            onClick={onClick}
            style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", textTransform:"uppercase", letterSpacing:"0.1em", background:"none", border:"none", cursor:"pointer" }}
          >
            விவரம் →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
