/**
 * MindMap — Radial SVG mind map of the full documentary.
 *
 * Visual hierarchy (Root → Season → Events):
 *   [Root] ─── 12 Season nodes (equally spaced radially)
 *                   └── Event nodes (fan around each season)
 *
 * Interactions:
 *   Click season node    → expand/collapse its events
 *   Click event node     → open IncidentDrawer
 *   Scroll wheel         → zoom in/out
 *   Mouse drag           → pan
 *   Double-click         → reset view
 *   Expand All / Collapse All / Reset View buttons
 *
 * Design:
 *   - Pure SVG + React (no D3, no external graph lib)
 *   - Framer Motion animated connections and nodes
 *   - Party-color-coded event nodes
 *   - Hover tooltip showing full event title
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";
import CatIcon from "../ui/CatIcon";

/* ─────────────────────────────────────────────────────────
   LAYOUT CONSTANTS
   ───────────────────────────────────────────────────────── */
const CW = 2600;           // canvas width
const CH = 2600;           // canvas height
const CX = CW / 2;        // center x
const CY = CH / 2;        // center y
const SEASON_R  = 440;    // distance from center to season nodes
const EVENT_R   = 230;    // distance from season to event nodes

/* ─────────────────────────────────────────────────────────
   MATH HELPERS
   ───────────────────────────────────────────────────────── */
function seasonAngle(idx, total) {
  return (idx / total) * 2 * Math.PI - Math.PI / 2; // start from top
}

function seasonPos(idx, total) {
  const a = seasonAngle(idx, total);
  return { x: CX + SEASON_R * Math.cos(a), y: CY + SEASON_R * Math.sin(a), angle: a };
}

function eventPos(sp, evIdx, evTotal) {
  // Fan the events around the season's outward direction
  const maxFan = Math.PI * 0.65;                    // max 117° spread
  const fan    = Math.min(evTotal * 0.18, maxFan);
  const step   = evTotal > 1 ? fan / (evTotal - 1) : 0;
  const a      = sp.angle - fan / 2 + step * evIdx;
  return { x: sp.x + EVENT_R * Math.cos(a), y: sp.y + EVENT_R * Math.sin(a) };
}

// Smooth cubic bezier between two points
function bezier(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  return `M${x1},${y1} C${x1 + dx * 0.42},${y1 + dy * 0.1} ${x1 + dx * 0.58},${y2 - dy * 0.1} ${x2},${y2}`;
}

/* ─────────────────────────────────────────────────────────
   TOOLTIP
   ───────────────────────────────────────────────────────── */
function Tooltip({ event, svgX, svgY, zoom, pan }) {
  if (!event) return null;
  // Convert SVG coords to screen coords
  const screenX = svgX * zoom + pan.x;
  const screenY = svgY * zoom + pan.y;
  const parties = (event.parties || []).filter(p => p !== "unknown").slice(0, 2);
  return (
    <div style={{
      position: "absolute", left: screenX + 12, top: screenY - 20, zIndex: 10,
      background: "var(--surface-0)", border: "1px solid var(--maroon)",
      borderRadius: 10, padding: "10px 14px", maxWidth: 260, pointerEvents: "none",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
    }}>
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 800, color: "var(--maroon)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
        #{String(event.id).padStart(2, "0")} · {event.date}
      </div>
      <div style={{ fontFamily: "'Teko'", fontSize: 15, fontWeight: 600, lineHeight: 1.25, color: "var(--text)", marginBottom: 6 }}>
        {event.title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {parties.map(p => {
          const party = config.parties[p];
          return party ? (
            <span key={p} style={{ fontFamily: "'Instrument Sans'", fontSize: 8, fontWeight: 800, textTransform: "uppercase", color: party.color, background: `${party.color}25`, border: `1px solid ${party.color}40`, borderRadius: 3, padding: "1px 6px" }}>
              {party.en}
            </span>
          ) : null;
        })}
      </div>
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, color: "var(--text-dim)", marginTop: 6 }}>Click to open evidence →</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */
export default function MindMap({ allEvents, allSeasons, onEventClick }) {
  const [expanded, setExpanded]     = useState(new Set());
  const [hovered,  setHovered]      = useState(null); // { event, svgX, svgY }
  const [zoom,     setZoom]         = useState(0.36);
  const [pan,      setPan]          = useState({ x: 0, y: 0 });
  const [dragging, setDragging]     = useState(false);
  const dragOrigin = useRef(null);
  const containerRef = useRef(null);

  // Centre the SVG when it first mounts
  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setPan({ x: width / 2 - CX * 0.36, y: height / 2 - CY * 0.36 });
  }, []);

  /* ── Toggle season expansion ── */
  const toggleSeason = useCallback((num) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }, []);

  /* ── Pan ── */
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    dragOrigin.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const onMouseMove = useCallback((e) => {
    if (!dragging || !dragOrigin.current) return;
    setPan({ x: e.clientX - dragOrigin.current.x, y: e.clientY - dragOrigin.current.y });
  }, [dragging]);
  const onMouseUp = () => setDragging(false);

  /* ── Zoom ── */
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.93;
    setZoom(z => Math.min(2, Math.max(0.15, z * factor)));
  }, []);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  /* ── Reset view ── */
  const resetView = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setZoom(0.36);
    setPan({ x: width / 2 - CX * 0.36, y: height / 2 - CY * 0.36 });
  };

  /* ── Pre-compute positions ── */
  const total = allSeasons.length;
  const seasonData = allSeasons.map((season, idx) => {
    const pos    = seasonPos(idx, total);
    const events = allEvents.filter(e => e.seasonNum === season.num);
    // Dominant party = most frequent non-unknown party
    const partyCounts = {};
    events.forEach(e => (e.parties || []).forEach(p => { if (p !== "unknown") partyCounts[p] = (partyCounts[p] || 0) + 1; }));
    const domParty = Object.entries(partyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";
    const color = config.parties[domParty]?.color || "var(--maroon)";
    return { season, pos, events, domParty, color };
  });

  /* ── Party color for an event ── */
  const eventColor = (event) => {
    const p = (event.parties || []).find(p => p !== "unknown");
    return p ? (config.parties[p]?.color || "#8d1016") : "#8d1016";
  };

  return (
    <section style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section title ── */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ height: 1, width: 50, background: "linear-gradient(to right, transparent, var(--gold-dim))" }} />
            <CatIcon name="tree" size={18} color="var(--gold)" />
            <div style={{ height: 1, width: 50, background: "linear-gradient(to left, transparent, var(--gold-dim))" }} />
          </div>
          <h2 style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)", color: "white", lineHeight: 1 }}>
            மனவரைபடம்
          </h2>
          <p style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>
            DOCUMENTARY MIND MAP · CLICK SEASON NODES TO EXPAND
          </p>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {[
            { label: "Expand All",   action: () => setExpanded(new Set(allSeasons.map(s => s.num))) },
            { label: "Collapse All", action: () => setExpanded(new Set()) },
            { label: "Reset View",   action: resetView },
          ].map(btn => (
            <button key={btn.label} onClick={btn.action}
              style={{
                fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer",
                color: "var(--text-dim)", background: "var(--surface-2)",
                border: "1px solid var(--border)", borderRadius: 6, padding: "6px 16px",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--maroon)"; e.currentTarget.style.color = "var(--maroon)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-dim)"; }}
            >{btn.label}</button>
          ))}
          <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, color: "var(--text-dim)", marginLeft: 8 }}>
            Scroll to zoom · Drag to pan · Double-click to reset
          </span>
        </div>

        {/* ── Canvas ── */}
        <div
          ref={containerRef}
          style={{ position: "relative", height: 620, borderRadius: 16, overflow: "hidden", background: "var(--surface-0)", border: "1px solid var(--border)", cursor: dragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onDoubleClick={resetView}
        >
          <svg
            width={CW} height={CH}
            viewBox={`0 0 ${CW} ${CH}`}
            style={{ position: "absolute", top: 0, left: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "0 0", transition: dragging ? "none" : "transform 0.1s ease", overflow: "visible" }}
          >
            <defs>
              {/* Radial glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              {/* Subtle grid pattern */}
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(141,16,22,0.07)" strokeWidth="1"/>
              </pattern>
            </defs>

            {/* Background grid */}
            <rect width={CW} height={CH} fill="url(#grid)" />

            {/* Outer decorative ring */}
            <circle cx={CX} cy={CY} r={SEASON_R + 100} fill="none" stroke="rgba(141,16,22,0.08)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx={CX} cy={CY} r={SEASON_R - 80} fill="none" stroke="rgba(141,16,22,0.06)" strokeWidth="1" strokeDasharray="3 9" />

            {/* ── Root → Season connections ── */}
            {seasonData.map(({ pos, color }) => (
              <path
                key={`root-line-${pos.x}`}
                d={bezier(CX, CY, pos.x, pos.y)}
                fill="none" stroke="rgba(141,16,22,0.35)" strokeWidth="1.5" strokeDasharray="none"
                style={{ transition: "stroke 0.3s" }}
              />
            ))}

            {/* ── Season → Event connections (only when expanded) ── */}
            {seasonData.map(({ season, pos, events }) =>
              expanded.has(season.num) && events.map((ev, i) => {
                const ep = eventPos(pos, i, events.length);
                const col = eventColor(ev);
                return (
                  <path key={`ev-line-${ev.id}`}
                    d={bezier(pos.x, pos.y, ep.x, ep.y)}
                    fill="none" stroke={`${col}55`} strokeWidth="1"
                  />
                );
              })
            )}

            {/* ── Event nodes (only when season expanded) ── */}
            {seasonData.map(({ season, pos, events }) =>
              expanded.has(season.num) && events.map((ev, i) => {
                const ep = eventPos(pos, i, events.length);
                const col = eventColor(ev);
                const W = 110, H = 34;
                return (
                  <g key={`ev-node-${ev.id}`}
                    style={{ cursor: "pointer" }}
                    onClick={e => { e.stopPropagation(); onEventClick(ev); }}
                    onMouseEnter={() => setHovered({ event: ev, svgX: ep.x + W/2, svgY: ep.y })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Glow halo */}
                    <rect x={ep.x - W/2 - 3} y={ep.y - H/2 - 3} width={W + 6} height={H + 6} rx="8"
                      fill={`${col}15`} />
                    {/* Card bg */}
                    <rect x={ep.x - W/2} y={ep.y - H/2} width={W} height={H} rx="6"
                      fill="var(--surface-1)" stroke={`${col}60`} strokeWidth="1.5"
                      style={{ transition: "fill 0.2s" }}
                    />
                    {/* Left accent bar */}
                    <rect x={ep.x - W/2} y={ep.y - H/2 + 2} width="3" height={H - 4} rx="2" fill={col} />
                    {/* Event ID */}
                    <text x={ep.x - W/2 + 10} y={ep.y - 4} fontFamily="'Teko'" fontSize="11" fontWeight="700" fill={col}>
                      #{String(ev.id).padStart(2, "0")}
                    </text>
                    {/* Year */}
                    {ev.year && (
                      <text x={ep.x + W/2 - 6} y={ep.y - 4} fontFamily="'Teko'" fontSize="10" fontWeight="700" fill="rgba(255,202,0,0.7)" textAnchor="end">
                        {ev.year}
                      </text>
                    )}
                    {/* Short title */}
                    <text x={ep.x - W/2 + 10} y={ep.y + 10} fontFamily="'Noto Sans Tamil'" fontSize="8.5" fill="rgba(237,229,227,0.75)">
                      {ev.title.slice(0, 16)}{ev.title.length > 16 ? "…" : ""}
                    </text>
                  </g>
                );
              })
            )}

            {/* ── Season nodes ── */}
            {seasonData.map(({ season, pos, events, color }, idx) => {
              const isExp = expanded.has(season.num);
              const RX = 62, RY = 36;
              return (
                <g key={season.num}
                  style={{ cursor: "pointer" }}
                  onClick={e => { e.stopPropagation(); toggleSeason(season.num); }}
                >
                  {/* Glow ring when expanded */}
                  {isExp && (
                    <ellipse cx={pos.x} cy={pos.y} rx={RX + 10} ry={RY + 10}
                      fill={`${color}18`} filter="url(#glow)" />
                  )}
                  {/* Main ellipse */}
                  <ellipse cx={pos.x} cy={pos.y} rx={RX} ry={RY}
                    fill={isExp ? `${color}28` : "var(--surface-1)"}
                    stroke={isExp ? color : "rgba(141,16,22,0.5)"}
                    strokeWidth={isExp ? "2.5" : "1.5"}
                    style={{ transition: "all 0.3s" }}
                  />
                  {/* Season number */}
                  <text x={pos.x} y={pos.y - 5} textAnchor="middle" dominantBaseline="middle"
                    fontFamily="'Teko'" fontSize="22" fontWeight="700"
                    fill={isExp ? color : "rgba(255,202,0,0.8)"}
                    style={{ transition: "fill 0.3s" }}>
                    {String(season.num).padStart(2, "0")}
                  </text>
                  {/* Event count badge */}
                  <text x={pos.x} y={pos.y + 14} textAnchor="middle"
                    fontFamily="'Instrument Sans'" fontSize="9" fontWeight="700"
                    fill={isExp ? color : "rgba(237,229,227,0.4)"}>
                    {events.length} events
                  </text>
                  {/* Chevron indicator */}
                  <text x={pos.x + RX - 10} y={pos.y}
                    fontFamily="'Instrument Sans'" fontSize="8"
                    fill={isExp ? color : "rgba(141,16,22,0.5)"}>
                    {isExp ? "−" : "+"}
                  </text>
                </g>
              );
            })}

            {/* ── Root node ── */}
            <g style={{ cursor: "default" }}>
              {/* Outer glow ring */}
              <ellipse cx={CX} cy={CY} rx={100} ry={68}
                fill="rgba(141,16,22,0.15)" filter="url(#glow)" />
              {/* Outer ring */}
              <ellipse cx={CX} cy={CY} rx={92} ry={60}
                fill="none" stroke="rgba(255,202,0,0.3)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Main node */}
              <ellipse cx={CX} cy={CY} rx={82} ry={52}
                fill="linear-gradient(135deg, #3d0c0e, #8d1016)"
                style={{ fill: "#3d0c0e" }}
                stroke="#8d1016" strokeWidth="2.5"
              />
              {/* Gradient overlay via rect */}
              <ellipse cx={CX} cy={CY} rx={82} ry={52}
                fill="url(#rootGrad)" opacity="0.8"
              />
              {/* Documentary title */}
              <text x={CX} y={CY - 14} textAnchor="middle"
                fontFamily="'Teko'" fontSize="26" fontWeight="700" fill="white">
                மர்ம
              </text>
              <text x={CX} y={CY + 16} textAnchor="middle"
                fontFamily="'Teko'" fontSize="26" fontWeight="700" fill="#ffca00">
                அரசியல்
              </text>
              <text x={CX} y={CY + 38} textAnchor="middle"
                fontFamily="'Instrument Sans'" fontSize="8" fontWeight="700"
                fill="rgba(255,255,255,0.35)" letterSpacing="3">
                2015 – 2026
              </text>
            </g>
          </svg>

          {/* ── Hover tooltip (DOM overlay) ── */}
          {hovered && (
            <Tooltip event={hovered.event} svgX={hovered.svgX} svgY={hovered.svgY} zoom={zoom} pan={pan} />
          )}

          {/* ── Zoom indicator ── */}
          <div style={{ position: "absolute", bottom: 14, right: 16, fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.1em", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "3px 10px" }}>
            {Math.round(zoom * 100)}%
          </div>

          {/* ── Expanded count badge ── */}
          {expanded.size > 0 && (
            <div style={{ position: "absolute", bottom: 14, left: 16, fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--maroon)", letterSpacing: "0.1em", background: "rgba(141,16,22,0.12)", border: "1px solid rgba(141,16,22,0.3)", borderRadius: 6, padding: "3px 10px" }}>
              {expanded.size} season{expanded.size > 1 ? "s" : ""} expanded · {[...expanded].reduce((sum, num) => sum + allEvents.filter(e => e.seasonNum === num).length, 0)} events visible
            </div>
          )}
        </div>

        {/* ── Party colour legend ── */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">
          <span style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.18em" }}>Legend:</span>
          {Object.entries(config.parties).filter(([k]) => k !== "unknown").map(([k, p]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, display: "inline-block" }} />
              <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{p.en}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
