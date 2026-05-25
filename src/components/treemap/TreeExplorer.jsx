/**
 * TreeExplorer — Interactive political event tree.
 *
 * Two modes:
 *  "explorer" — Drill-down: Root → Seasons → Events → Drawer
 *  "fulltree" — All seasons expanded simultaneously (full 130-event accordion tree)
 *
 * Toggle between modes with the mode switch buttons at the top.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";
import CatIcon from "../ui/CatIcon";

/* ── Slide variants ─────────────────────────────────────── */
const slide = {
  enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
};

/* ── Root card ────────────────────────────────────────── */
function RootCard({ onClick }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-10 rounded-3xl cursor-pointer mx-auto"
      style={{ maxWidth: 400, background: "var(--surface-1)", border: "2px solid var(--maroon)", boxShadow: "0 0 40px rgba(141,16,22,0.25)" }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(141,16,22,0.4)" }}
      onClick={onClick}
    >
      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(3rem,8vw,5rem)", color: "white", lineHeight: 0.95, marginBottom: 8 }}>
        {config.title.split(" ")[0]}
      </div>
      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(3rem,8vw,5rem)", lineHeight: 0.95, background: "linear-gradient(135deg, #ffca00, #c8a000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 16 }}>
        {config.title.split(" ")[1]}
      </div>
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: 20 }}>
        {config.subtitle}
      </div>
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: "var(--maroon)" }}>
        <CatIcon name="tree" size={16} color="white" />
        <span style={{ fontFamily: "'Instrument Sans'", fontSize: 12, fontWeight: 700, color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>Explore Timeline</span>
      </div>
    </motion.div>
  );
}

/* ── Season card (explorer mode) ─────────────────────── */
function SeasonNode({ season, eventCount, onClick }) {
  return (
    <motion.div className="p-4 rounded-xl cursor-pointer"
      style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
      whileHover={{ y: -4, backgroundColor: "var(--surface-2)", borderColor: "var(--maroon-dim)", boxShadow: "0 8px 32px rgba(141,16,22,0.25)" }}
      onClick={onClick}
    >
      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 48, lineHeight: 1, color: "var(--gold)", marginBottom: 4 }}>
        {String(season.num).padStart(2, "0")}
      </div>
      <div style={{ fontFamily: "'Teko'", fontSize: 16, fontWeight: 600, color: "var(--text)", lineHeight: 1.25, marginBottom: 6 }}>{season.label}</div>
      {season.period && <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{season.period}</div>}
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, color: "var(--maroon)", fontWeight: 700 }}>{eventCount} events</span>
        <CatIcon name="chevron_right" size={14} color="var(--maroon-dim)" />
      </div>
    </motion.div>
  );
}

/* ── Event leaf (explorer mode) ──────────────────────── */
function EventNode({ event, index, onClick }) {
  const parties = (event.parties || []).slice(0, 2);
  return (
    <motion.div className="p-4 rounded-xl cursor-pointer"
      style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}
      whileHover={{ y: -3, backgroundColor: "var(--surface-2)", borderColor: "var(--border-light)", boxShadow: "0 6px 24px rgba(141,16,22,0.2)" }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span style={{ fontFamily: "'Teko'", fontSize: 13, fontWeight: 700, color: "var(--maroon)" }}>#{String(event.id).padStart(2, "0")}</span>
        {event.year && <span style={{ fontFamily: "'Teko'", fontSize: 13, fontWeight: 700, color: "var(--gold)", background: "rgba(255,202,0,0.1)", borderRadius: 4, padding: "1px 6px" }}>{event.year}</span>}
      </div>
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--maroon)", marginBottom: 4 }}>{event.date}</div>
      <h4 style={{ fontFamily: "'Teko'", fontSize: 15, fontWeight: 600, lineHeight: 1.25, color: "var(--text)", marginBottom: 8 }}>{event.title}</h4>
      <div className="flex flex-wrap gap-1">
        {parties.map(p => {
          const party = config.parties[p];
          return party ? <span key={p} style={{ fontFamily: "'Instrument Sans'", fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: party.color, background: party.bg, border: `1px solid ${party.color}40`, borderRadius: 3, padding: "1px 6px" }}>{party.en}</span> : null;
        })}
      </div>
    </motion.div>
  );
}

/* ── Full Tree accordion row ─────────────────────────── */
function FullTreeSeason({ season, events, onEventClick, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
      {/* Season row */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "12px 18px", background: open ? "rgba(141,16,22,0.12)" : "var(--surface-1)",
          border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "var(--surface-2)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "var(--surface-1)"; }}
      >
        {/* Big season number */}
        <span style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 28, color: open ? "var(--gold)" : "var(--maroon-dim)", lineHeight: 1, minWidth: 44, textAlign: "center", flexShrink: 0 }}>
          {String(season.num).padStart(2, "0")}
        </span>

        {/* Season info */}
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "'Teko'", fontSize: 17, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{season.label}</div>
          {season.period && <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{season.period}</div>}
        </div>

        {/* Event count + chevron */}
        <div className="flex items-center gap-3 shrink-0">
          <span style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", background: "var(--surface-3)", borderRadius: 999, padding: "2px 10px" }}>
            {events.length}
          </span>
          <CatIcon name="arrow_down" size={14} color="var(--text-dim)"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Event cards */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="events"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "12px 16px 16px", background: "var(--surface-0)", borderTop: "1px solid var(--border)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {events.map((event, i) => (
                  <motion.div key={event.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                    className="p-3 rounded-lg cursor-pointer group"
                    style={{ background: "var(--surface-1)", border: "1px solid var(--border)" }}
                    whileHover={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border-light)", y: -2 }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontFamily: "'Teko'", fontSize: 12, fontWeight: 700, color: "var(--maroon)" }}>#{String(event.id).padStart(2, "0")}</span>
                      {event.year && <span style={{ fontFamily: "'Teko'", fontSize: 11, fontWeight: 700, color: "var(--gold)" }}>{event.year}</span>}
                    </div>
                    <div style={{ fontFamily: "'Teko'", fontSize: 14, fontWeight: 600, lineHeight: 1.2, color: "var(--text)", marginBottom: 6 }}
                      className="group-hover:text-[var(--gold)] transition-colors">
                      {event.title}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(event.parties || []).slice(0, 2).map(p => {
                        const party = config.parties[p];
                        return party ? <span key={p} style={{ fontFamily: "'Instrument Sans'", fontSize: 7, fontWeight: 800, textTransform: "uppercase", color: party.color, background: party.bg, border: `1px solid ${party.color}40`, borderRadius: 3, padding: "1px 5px" }}>{party.en}</span> : null;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   Main TreeExplorer component
   ════════════════════════════════════════════════════════ */
export default function TreeExplorer({ allEvents, allSeasons, onEventClick }) {
  const [mode, setMode]         = useState("explorer"); // "explorer" | "fulltree"
  const [level, setLevel]       = useState(0);
  const [selSeason, setSelSeason] = useState(null);
  const [dir, setDir]           = useState(1);
  const [expandAll, setExpandAll] = useState(false);

  const navigate = (newLevel, season = null) => {
    setDir(newLevel > level ? 1 : -1);
    setLevel(newLevel);
    if (season !== null) setSelSeason(season);
  };

  const seasonEvents = (num) => allEvents.filter(e => e.seasonNum === num);

  const crumbs = [
    { label: "மர்ம அரசியல்", level: 0 },
    ...(level >= 1 ? [{ label: "பருவங்கள்", level: 1 }] : []),
    ...(level >= 2 && selSeason ? [{ label: selSeason.label, level: 2 }] : []),
  ];

  return (
    <section style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ height: 1, width: 50, background: "linear-gradient(to right, transparent, var(--gold-dim))" }} />
            <CatIcon name="tree" size={18} color="var(--gold)" />
            <div style={{ height: 1, width: 50, background: "linear-gradient(to left, transparent, var(--gold-dim))" }} />
          </div>
          <h2 style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)", color: "white", lineHeight: 1 }}>
            அரசியல் வரைபடம்
          </h2>
          <p style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>
            POLITICAL TREE EXPLORER
          </p>
        </div>

        {/* Mode switch */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: "explorer", icon: "search",  label: "Explorer Mode" },
            { key: "fulltree", icon: "tree",    label: "Full Tree — All 139 Events" },
          ].map(m => (
            <button key={m.key} onClick={() => setMode(m.key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all"
              style={{
                fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                background: mode === m.key ? "var(--maroon)" : "var(--surface-1)",
                color:      mode === m.key ? "white"         : "var(--text-muted)",
                border:     `1px solid ${mode === m.key ? "var(--maroon)" : "var(--border)"}`,
                boxShadow:  mode === m.key ? "0 4px 20px rgba(141,16,22,0.4)" : "none",
              }}>
              <CatIcon name={m.icon} size={14} color="inherit" />
              {m.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            EXPLORER MODE
            ═══════════════════════════════════════ */}
        {mode === "explorer" && (
          <>
            {level > 0 && (
              <div className="flex items-center gap-2 mb-8">
                {crumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <CatIcon name="chevron_right" size={12} color="var(--text-dim)" />}
                    <button onClick={() => navigate(c.level)}
                      style={{ fontFamily: "'Instrument Sans'", fontSize: 12, fontWeight: 700, color: i === crumbs.length - 1 ? "var(--gold)" : "var(--text-dim)", background: "none", border: "none", cursor: "pointer" }}>
                      {c.label}
                    </button>
                  </span>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={level + (selSeason?.num || "")} custom={dir}
                variants={slide} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                {level === 0 && (
                  <div className="flex flex-col items-center gap-8">
                    <RootCard onClick={() => navigate(1)} />
                    <div className="flex items-center gap-3">
                      <div style={{ height: 1, width: 80, background: "var(--border)" }} />
                      <span style={{ fontFamily: "'Instrument Sans'", fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                        {allSeasons.length} seasons · {allEvents.length} events
                      </span>
                      <div style={{ height: 1, width: 80, background: "var(--border)" }} />
                    </div>
                  </div>
                )}

                {level === 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {allSeasons.map((s, i) => (
                      <motion.div key={s.num} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <SeasonNode season={s} eventCount={seasonEvents(s.num).length} onClick={() => navigate(2, s)} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {level === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 22, color: "var(--gold)" }}>
                        {selSeason?.label} — {seasonEvents(selSeason.num).length} நிகழ்வுகள்
                      </div>
                      {selSeason?.period && (
                        <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", background: "var(--surface-2)", borderRadius: 999, padding: "3px 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {selSeason.period}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {seasonEvents(selSeason.num).map((event, i) => (
                        <EventNode key={event.id} event={event} index={i} onClick={() => onEventClick(event)} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {level > 0 && (
              <div className="flex justify-center mt-10">
                <button onClick={() => navigate(level - 1)} className="flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all"
                  style={{ fontFamily: "'Instrument Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", background: "var(--surface-1)", border: "1px solid var(--border)", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--maroon)"; e.currentTarget.style.color = "var(--maroon)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  ← Back
                </button>
              </div>
            )}
          </>
        )}

        {/* ═══════════════════════════════════════
            FULL TREE MODE — All 139 events
            ═══════════════════════════════════════ */}
        {mode === "fulltree" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div style={{ fontFamily: "'Instrument Sans'", fontSize: 12, color: "var(--text-dim)" }}>
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>{allEvents.length}</span> events across{" "}
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>{allSeasons.length}</span> seasons — click any season to expand
              </div>
              <div className="flex gap-2">
                <button onClick={() => setExpandAll(true)}
                  style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--maroon)", background: "rgba(141,16,22,0.1)", border: "1px solid rgba(141,16,22,0.3)", borderRadius: 6, padding: "5px 14px", cursor: "pointer" }}>
                  Expand All
                </button>
                <button onClick={() => setExpandAll(false)}
                  style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "5px 14px", cursor: "pointer" }}>
                  Collapse All
                </button>
              </div>
            </div>

            {/* Accordion tree */}
            <div>
              {allSeasons.map((season, i) => (
                <motion.div key={season.num} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <FullTreeSeason
                    season={season}
                    events={seasonEvents(season.num)}
                    onEventClick={onEventClick}
                    defaultOpen={expandAll}
                    key={`${season.num}-${expandAll}`}
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <span style={{ fontFamily: "'Instrument Sans'", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                · {allEvents.length} events · {allSeasons.length} seasons · 2015–2026 ·
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
