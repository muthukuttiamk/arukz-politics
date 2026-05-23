/**
 * MindMap — மர்மவரைபடம்
 * React Flow powered top-down political evidence tree.
 *
 * Layout (Root → Seasons → Events):
 *   Row 0: Root node (centered)
 *   Row 1: 12 Season nodes (chronological left → right)
 *   Row 2+: Event cards (2-col grid under each season, expand on click)
 *
 * Tech: React Flow v11 — HTML nodes, built-in MiniMap, Controls, Background
 */
import { useState, useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import config from "../../config";
import CatIcon from "../ui/CatIcon";

/* ── Layout constants ───────────────────────────────── */
const SEA_W = 178, SEA_H = 96;
const SEA_GAP = 24;               // horizontal gap between seasons
const SEA_COLS = 12;
const COL_W = SEA_W + SEA_GAP;   // 202px per season column
const TOTAL_W = COL_W * SEA_COLS;
const ROOT_W = 220, ROOT_H = 130;

const SEA_Y = 200;
const EV_W = 86, EV_H = 54, EV_GAP_X = 6, EV_GAP_Y = 8;
const EV_COLS = 2;
const EV_ROW_H = EV_H + EV_GAP_Y;
const EV_START_Y = SEA_Y + SEA_H + 28;

/* ── Dominant party for a season ────────────────────── */
function domParty(events) {
  const cnt = {};
  events.forEach(e => (e.parties || []).forEach(p => { if (p !== "unknown") cnt[p] = (cnt[p] || 0) + 1; }));
  return Object.entries(cnt).sort((a, b) => b[1] - a[1])[0]?.[0] || "it_dept";
}

function partyColor(event) {
  const p = (event.parties || []).find(p => p !== "unknown");
  return config.parties[p]?.color || "#8d1016";
}

/* ── Custom: Root node ────────────────────────────────── */
function RootNode({ data }) {
  const words = config.title.split(" ");
  return (
    <div style={{
      width: ROOT_W, height: ROOT_H,
      background: "linear-gradient(135deg, #2e0608 0%, #8d1016 60%, #5c1a1b 100%)",
      border: "2px solid #ffca00", borderRadius: 18,
      boxShadow: "0 0 48px rgba(141,16,22,0.6), 0 0 80px rgba(255,202,0,0.15)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 2, padding: "12px 16px",
    }}>
      <img src="/logo.png" alt="logo" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid rgba(255,202,0,0.5)", marginBottom: 4 }} />
      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 22, color: "white", lineHeight: 0.95, textAlign: "center" }}>{words[0]}</div>
      <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 22, color: "#ffca00", lineHeight: 0.95, textAlign: "center" }}>{words[1]}</div>
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>
        {data.totalEvents} EVENTS · 2015–2026
      </div>
    </div>
  );
}

/* ── Custom: Season node ─────────────────────────────── */
function SeasonNode({ data }) {
  const color = config.parties[data.domParty]?.color || "#8d1016";
  const isExp = data.expanded;
  return (
    <div
      onClick={data.onToggle}
      style={{
        width: SEA_W, height: SEA_H, borderRadius: 12, cursor: "pointer",
        background: isExp ? `${color}1a` : "#1a0d0f",
        border: `1.5px solid ${isExp ? color : "rgba(141,16,22,0.4)"}`,
        boxShadow: isExp ? `0 4px 24px ${color}40` : "0 2px 8px rgba(0,0,0,0.4)",
        padding: "10px 14px",
        transition: "all 0.3s",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: 30, color: isExp ? color : "#ffca00", lineHeight: 1 }}>
          {String(data.num).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "'Instrument Sans'", fontSize: 14, fontWeight: 900,
          color: isExp ? color : "rgba(141,16,22,0.5)",
          background: isExp ? `${color}20` : "rgba(141,16,22,0.1)",
          width: 22, height: 22, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{isExp ? "−" : "+"}</span>
      </div>
      {data.period && (
        <div style={{ fontFamily: "'Instrument Sans'", fontSize: 8, fontWeight: 700, color: "rgba(237,229,227,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {data.period}
        </div>
      )}
      <div style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: isExp ? color : "rgba(141,16,22,0.5)" }}>
        {data.eventCount} events {isExp ? "↑" : "↓"}
      </div>
    </div>
  );
}

/* ── Custom: Event node ──────────────────────────────── */
function EventNode({ data }) {
  const color = partyColor(data.event);
  return (
    <div
      onClick={() => data.onEventClick(data.event)}
      style={{
        width: EV_W, height: EV_H, borderRadius: 8, cursor: "pointer",
        background: "#110a0b",
        border: `1px solid ${color}45`,
        borderLeft: `3px solid ${color}`,
        padding: "6px 8px",
        display: "flex", flexDirection: "column", gap: 3,
        transition: "all 0.2s",
        boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#241215"; e.currentTarget.style.boxShadow = `0 4px 16px ${color}40`; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#110a0b"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.5)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Teko'", fontSize: 12, fontWeight: 700, color }}>
          #{String(data.event.id).padStart(2, "0")}
        </span>
        {data.event.year && (
          <span style={{ fontFamily: "'Teko'", fontSize: 10, color: "rgba(255,202,0,0.6)", fontWeight: 700 }}>
            {data.event.year}
          </span>
        )}
      </div>
      <div style={{ fontFamily: "'Noto Sans Tamil'", fontSize: 8.5, lineHeight: 1.3, color: "rgba(237,229,227,0.7)", overflow: "hidden" }}>
        {data.event.title.slice(0, 22)}{data.event.title.length > 22 ? "…" : ""}
      </div>
    </div>
  );
}

const nodeTypes = { root: RootNode, season: SeasonNode, event: EventNode };

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */
export default function MindMap({ allEvents, allSeasons, onEventClick }) {
  const [expanded,   setExpanded]   = useState(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRef = useRef(null);

  const toggleSeason = useCallback((num) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  /* ── Build nodes + edges ─────────────────────────── */
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];

    // Root node
    const rootX = TOTAL_W / 2 - ROOT_W / 2;
    nodes.push({
      id: "root",
      type: "root",
      position: { x: rootX, y: 0 },
      data: { totalEvents: allEvents.length },
      draggable: false,
    });

    allSeasons.forEach((season, idx) => {
      const seaEvents = allEvents.filter(e => e.seasonNum === season.num);
      const dp = domParty(seaEvents);
      const color = config.parties[dp]?.color || "#8d1016";
      const seaX = idx * COL_W;
      const seaY = SEA_Y;
      const isExp = expanded.has(season.num);
      const seaId = `season-${season.num}`;

      // Season node
      nodes.push({
        id: seaId,
        type: "season",
        position: { x: seaX, y: seaY },
        data: {
          num: season.num,
          label: season.label,
          period: season.period,
          eventCount: seaEvents.length,
          domParty: dp,
          expanded: isExp,
          onToggle: () => toggleSeason(season.num),
        },
        draggable: false,
      });

      // Root → Season edge
      edges.push({
        id: `root-${seaId}`,
        source: "root",
        target: seaId,
        type: "smoothstep",
        animated: false,
        style: { stroke: `${color}60`, strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color, width: 10, height: 10 },
      });

      // Event nodes (only when expanded)
      if (isExp) {
        seaEvents.forEach((ev, j) => {
          const evCol  = j % EV_COLS;
          const evRow  = Math.floor(j / EV_COLS);
          const totalEvW = EV_COLS * EV_W + (EV_COLS - 1) * EV_GAP_X;
          const evX = seaX + (SEA_W - totalEvW) / 2 + evCol * (EV_W + EV_GAP_X);
          const evY = EV_START_Y + evRow * EV_ROW_H;
          const evId = `event-${ev.id}`;
          const ec = partyColor(ev);

          nodes.push({
            id: evId,
            type: "event",
            position: { x: evX, y: evY },
            data: { event: ev, onEventClick },
            draggable: false,
          });

          // Season → Event edge (only first col to avoid clutter)
          if (evCol === 0) {
            edges.push({
              id: `${seaId}-${evId}`,
              source: seaId,
              target: evId,
              type: "smoothstep",
              style: { stroke: `${ec}40`, strokeWidth: 1 },
            });
          }
        });
      }
    });

    return { nodes, edges };
  }, [allSeasons, allEvents, expanded, onEventClick, toggleSeason]);

  /* ── React Flow state ─────────────────────────────── */
  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, , onEdgesChange] = useEdgesState(edges);

  // Sync external nodes to RF state when expanded changes
  const currentNodes = nodes;
  const currentEdges = edges;

  return (
    <section
      id="mindmap-section"
      ref={sectionRef}
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: isFullscreen ? "24px" : "80px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div style={{ height: 1, width: 50, background: "linear-gradient(to right, transparent, var(--gold-dim))" }} />
            <CatIcon name="tree" size={18} color="var(--gold)" />
            <div style={{ height: 1, width: 50, background: "linear-gradient(to left, transparent, var(--gold-dim))" }} />
          </div>
          <h2 style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)", color: "white", lineHeight: 1 }}>
            மர்மவரைபடம்
          </h2>
          <p style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>
            POLITICAL EVIDENCE MAP · CLICK SEASONS TO EXPAND
          </p>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {[
            { label: "Expand All",   fn: () => setExpanded(new Set(allSeasons.map(s => s.num))) },
            { label: "Collapse All", fn: () => setExpanded(new Set()) },
          ].map(b => (
            <button key={b.label} onClick={b.fn}
              style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 16px", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--maroon)"; e.currentTarget.style.color = "var(--maroon)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-dim)"; }}
            >{b.label}</button>
          ))}
          {/* Fullscreen toggle */}
          <button onClick={toggleFullscreen}
            style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", color: isFullscreen ? "var(--gold)" : "var(--text-dim)", background: isFullscreen ? "rgba(255,202,0,0.1)" : "var(--surface-2)", border: `1px solid ${isFullscreen ? "var(--gold)" : "var(--border)"}`, borderRadius: 6, padding: "6px 16px", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 }}
          >
            {isFullscreen ? "⊡ Exit Fullscreen" : "⛶ Full Screen"}
          </button>
          <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, color: "var(--text-dim)" }}>
            Scroll · Drag · ⛶ for fullscreen
          </span>
        </div>

        {/* React Flow canvas */}
        <div style={{ height: isFullscreen ? "calc(100vh - 280px)" : "calc(100vh - 120px)", minHeight: 560, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface-0)" }}>
          <ReactFlow
            nodes={currentNodes}
            edges={currentEdges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1 }}
            minZoom={0.05}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
            style={{ background: "transparent" }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={28}
              size={1.2}
              color="rgba(141,16,22,0.2)"
            />
            <MiniMap
              nodeColor={n => {
                if (n.type === "root") return "#8d1016";
                if (n.type === "season") return expanded.has(n.data.num) ? (config.parties[n.data.domParty]?.color || "#8d1016") : "#2d1a1c";
                return partyColor(n.data.event);
              }}
              maskColor="rgba(8,5,8,0.8)"
              style={{ background: "#110a0b", border: "1px solid #2d1a1c", borderRadius: 8 }}
            />
            <Controls
              style={{ background: "#1a0d0f", border: "1px solid #2d1a1c", borderRadius: 8 }}
            />
            {/* Expanded count badge */}
            <Panel position="top-left">
              {expanded.size > 0 && (
                <div style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--maroon)", background: "rgba(141,16,22,0.12)", border: "1px solid rgba(141,16,22,0.3)", borderRadius: 6, padding: "4px 12px" }}>
                  {expanded.size} season{expanded.size > 1 ? "s" : ""} · {[...expanded].reduce((s, n) => s + allEvents.filter(e => e.seasonNum === n).length, 0)} events visible
                </div>
              )}
            </Panel>
          </ReactFlow>
        </div>

        {/* Party legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5">
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
