/**
 * MindMapPage — Full-viewport dedicated mindmap screen.
 *
 * Opens when user clicks "வரைபடம்" in the header.
 * Covers the entire viewport with a cinematic dark shell + React Flow.
 *
 * Close with: ← Back button, or Escape key.
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  MarkerType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";

/* ── Layout constants ─────────────────────────────────── */
const SEA_W = 190, SEA_H = 100;
const SEA_GAP = 28;
const COL_W   = SEA_W + SEA_GAP;
const TOTAL_W = COL_W * 12;
const ROOT_W  = 230, ROOT_H = 140;
const SEA_Y   = 220;
const EV_W = 92, EV_H = 58, EV_GAP_X = 8, EV_GAP_Y = 10;
const EV_COLS = 2;
const EV_ROW_H   = EV_H + EV_GAP_Y;
const EV_START_Y = SEA_Y + SEA_H + 32;

function domParty(events) {
  const cnt = {};
  events.forEach(e => (e.parties||[]).forEach(p => { if (p!=="unknown") cnt[p]=(cnt[p]||0)+1; }));
  return Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0]?.[0] || "it_dept";
}
function partyColor(event) {
  const p = (event.parties||[]).find(p=>p!=="unknown");
  return config.parties[p]?.color || "#8d1016";
}

/* ── Custom Nodes ─────────────────────────────────────── */
function RootNode({ data }) {
  const words = config.title.split(" ");
  return (
    <div style={{
      width: ROOT_W, height: ROOT_H,
      background: "linear-gradient(135deg, #2e0608 0%, #8d1016 60%, #5c1a1b 100%)",
      border: "2px solid #ffca00", borderRadius: 20,
      boxShadow: "0 0 60px rgba(141,16,22,0.7), 0 0 100px rgba(255,202,0,0.12)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 3, padding: "14px 18px",
    }}>
      <img src="/logo.png" alt="logo" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid rgba(255,202,0,0.5)", marginBottom: 4 }} />
      <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:26, color:"white", lineHeight:0.9, textAlign:"center" }}>{words[0]}</div>
      <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:26, color:"#ffca00", lineHeight:0.9, textAlign:"center" }}>{words[1]}</div>
      <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.35)", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:6 }}>
        {data.totalEvents} EVENTS · 2015–2026
      </div>
    </div>
  );
}

function SeasonNode({ data }) {
  const color = config.parties[data.domParty]?.color || "#8d1016";
  const isExp = data.expanded;
  return (
    <div onClick={data.onToggle} style={{
      width: SEA_W, height: SEA_H, borderRadius: 14, cursor: "pointer",
      background: isExp ? `${color}1f` : "#1a0d0f",
      border: `2px solid ${isExp ? color : "rgba(141,16,22,0.35)"}`,
      boxShadow: isExp ? `0 6px 30px ${color}50` : "0 2px 8px rgba(0,0,0,0.5)",
      padding: "10px 14px", transition: "all 0.3s",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:36, color: isExp ? color : "#ffca00", lineHeight:1 }}>
          {String(data.num).padStart(2,"0")}
        </span>
        <span style={{ width:24, height:24, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Instrument Sans'", fontSize:16, fontWeight:900, color: isExp ? color : "rgba(141,16,22,0.5)", background: isExp ? `${color}22` : "rgba(141,16,22,0.08)" }}>
          {isExp ? "−" : "+"}
        </span>
      </div>
      {data.period && <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:700, color:"rgba(237,229,227,0.3)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{data.period}</div>}
      <div style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color: isExp ? color : "rgba(141,16,22,0.5)" }}>
        {data.eventCount} events {isExp ? "▲" : "▼"}
      </div>
    </div>
  );
}

function EventNode({ data }) {
  const color = partyColor(data.event);
  return (
    <div onClick={() => data.onEventClick(data.event)}
      style={{ width:EV_W, height:EV_H, borderRadius:8, cursor:"pointer", background:"#110a0b", border:`1px solid ${color}45`, borderLeft:`3px solid ${color}`, padding:"7px 9px", display:"flex", flexDirection:"column", gap:4, transition:"all 0.2s", boxShadow:"0 2px 8px rgba(0,0,0,0.6)" }}
      onMouseEnter={e=>{ e.currentTarget.style.background="#241215"; e.currentTarget.style.boxShadow=`0 4px 20px ${color}45`; }}
      onMouseLeave={e=>{ e.currentTarget.style.background="#110a0b"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.6)"; }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Teko'", fontSize:13, fontWeight:700, color }}> #{String(data.event.id).padStart(2,"0")}</span>
        {data.event.year && <span style={{ fontFamily:"'Teko'", fontSize:11, color:"rgba(255,202,0,0.65)", fontWeight:700 }}>{data.event.year}</span>}
      </div>
      <div style={{ fontFamily:"'Noto Sans Tamil'", fontSize:8.5, lineHeight:1.35, color:"rgba(237,229,227,0.72)", overflow:"hidden" }}>
        {data.event.title.slice(0,24)}{data.event.title.length>24?"…":""}
      </div>
    </div>
  );
}

const nodeTypes = { root: RootNode, season: SeasonNode, event: EventNode };

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════════ */
export default function MindMapPage({ allEvents, allSeasons, onClose, onEventClick }) {
  const [expanded, setExpanded] = useState(new Set());

  /* Escape to close */
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const toggleSeason = useCallback((num) => {
    setExpanded(prev => { const n = new Set(prev); n.has(num) ? n.delete(num) : n.add(num); return n; });
  }, []);

  /* Build nodes + edges */
  const { nodes, edges } = useMemo(() => {
    const nodes = [], edges = [];
    const rootX = TOTAL_W / 2 - ROOT_W / 2;
    nodes.push({ id:"root", type:"root", position:{ x:rootX, y:0 }, data:{ totalEvents:allEvents.length }, draggable:false });

    allSeasons.forEach((season, idx) => {
      const seaEvents = allEvents.filter(e => e.seasonNum === season.num);
      const dp = domParty(seaEvents);
      const color = config.parties[dp]?.color || "#8d1016";
      const seaX = idx * COL_W;
      const isExp = expanded.has(season.num);
      const seaId = `season-${season.num}`;

      nodes.push({ id:seaId, type:"season", position:{ x:seaX, y:SEA_Y }, draggable:false,
        data:{ num:season.num, label:season.label, period:season.period, eventCount:seaEvents.length, domParty:dp, expanded:isExp, onToggle:()=>toggleSeason(season.num) } });

      edges.push({ id:`root-${seaId}`, source:"root", target:seaId, type:"smoothstep", animated:isExp,
        style:{ stroke:`${color}${isExp?"cc":"55"}`, strokeWidth: isExp ? 2 : 1.5 },
        markerEnd:{ type:MarkerType.ArrowClosed, color, width:10, height:10 } });

      if (isExp) {
        seaEvents.forEach((ev, j) => {
          const evCol = j % EV_COLS, evRow = Math.floor(j / EV_COLS);
          const totalEvW = EV_COLS * EV_W + (EV_COLS-1) * EV_GAP_X;
          const evX = seaX + (SEA_W - totalEvW)/2 + evCol*(EV_W+EV_GAP_X);
          const evY = EV_START_Y + evRow * EV_ROW_H;
          const evId = `event-${ev.id}`;
          nodes.push({ id:evId, type:"event", position:{ x:evX, y:evY }, draggable:false, data:{ event:ev, onEventClick } });
          if (evCol === 0) edges.push({ id:`${seaId}-${evId}`, source:seaId, target:evId, type:"smoothstep", style:{ stroke:`${partyColor(ev)}40`, strokeWidth:1 } });
        });
      }
    });
    return { nodes, edges };
  }, [allSeasons, allEvents, expanded, onEventClick, toggleSeason]);

  const expandedEventCount = [...expanded].reduce((s, n) => s + allEvents.filter(e => e.seasonNum === n).length, 0);

  return (
    <AnimatePresence>
      <motion.div
        key="mindmap-page"
        initial={{ opacity:0, scale:0.97 }}
        animate={{ opacity:1, scale:1 }}
        exit={{ opacity:0, scale:0.97 }}
        transition={{ duration:0.3, ease:"easeOut" }}
        style={{
          position:"fixed", inset:0, zIndex:1000,
          background:"var(--bg)",
          display:"flex", flexDirection:"column",
        }}
      >
        {/* ── TOP BAR ── */}
        <div style={{
          height: 64, flexShrink:0,
          background:"rgba(8,5,8,0.97)",
          borderBottom:"1px solid var(--border)",
          backdropFilter:"blur(20px)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 24px", gap:16,
        }}>
          {/* Back */}
          <button onClick={onClose}
            style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", color:"var(--text-dim)", fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em", padding:"6px 12px", borderRadius:8, transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.background="rgba(141,16,22,0.15)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.color="var(--text-dim)"; e.currentTarget.style.background="none"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
            Back
          </button>

          {/* BIG TITLE */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.8rem,4vw,3rem)", color:"white", lineHeight:0.9, letterSpacing:"0.02em" }}>
              வரைபடம்
            </div>
            <div style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {config.title} · POLITICAL EVIDENCE MAP
            </div>
          </div>

          {/* Controls */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <button onClick={() => setExpanded(new Set(allSeasons.map(s=>s.num)))}
              style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", cursor:"pointer", color:"var(--text-dim)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:6, padding:"5px 12px", transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--maroon)"; e.currentTarget.style.color="var(--maroon)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-dim)"; }}
            >Expand All</button>
            <button onClick={() => setExpanded(new Set())}
              style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", cursor:"pointer", color:"var(--text-dim)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:6, padding:"5px 12px", transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--maroon)"; e.currentTarget.style.color="var(--maroon)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-dim)"; }}
            >Collapse All</button>
            {expanded.size > 0 && (
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--maroon)", background:"rgba(141,16,22,0.12)", border:"1px solid rgba(141,16,22,0.3)", borderRadius:6, padding:"5px 12px" }}>
                {expanded.size} seasons · {expandedEventCount} events
              </div>
            )}
          </div>
        </div>

        {/* ── REACT FLOW CANVAS (full remaining height) ── */}
        <div style={{ flex:1, overflow:"hidden" }}>
          <ReactFlow
            nodes={nodes} edges={edges} nodeTypes={nodeTypes}
            fitView fitViewOptions={{ padding:0.08 }}
            minZoom={0.04} maxZoom={2.5}
            proOptions={{ hideAttribution:true }}
            style={{ background:"transparent" }}
          >
            <Background variant={BackgroundVariant.Dots} gap={32} size={1.5} color="rgba(141,16,22,0.18)" />
            <MiniMap
              nodeColor={n => {
                if (n.type==="root") return "#8d1016";
                if (n.type==="season") return expanded.has(n.data.num) ? (config.parties[n.data.domParty]?.color||"#8d1016") : "#2d1a1c";
                return partyColor(n.data.event);
              }}
              maskColor="rgba(8,5,8,0.85)"
              style={{ background:"#110a0b", border:"1px solid #2d1a1c", borderRadius:10, bottom:24, right:24 }}
            />
            <Controls style={{ background:"#1a0d0f", border:"1px solid #2d1a1c", borderRadius:8, bottom:24, left:24 }} />

            {/* Party legend bottom center */}
            <Panel position="bottom-center">
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:"6px 16px", padding:"8px 20px", background:"rgba(8,5,8,0.85)", border:"1px solid var(--border)", borderRadius:10, backdropFilter:"blur(8px)" }}>
                {Object.entries(config.parties).filter(([k])=>k!=="unknown").map(([k,p])=>(
                  <span key={k} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ width:8, height:8, borderRadius:"50%", background:p.color, display:"inline-block" }}/>
                    <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"rgba(237,229,227,0.55)", textTransform:"uppercase", letterSpacing:"0.07em" }}>{p.en}</span>
                  </span>
                ))}
              </div>
            </Panel>

            {/* Instructions */}
            <Panel position="top-left">
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, color:"var(--text-dim)", background:"rgba(8,5,8,0.7)", padding:"5px 10px", borderRadius:6, border:"1px solid var(--border)" }}>
                Click season to expand · Scroll to zoom · Drag to pan · Esc to close
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* ── BOTTOM COPYRIGHT ── */}
        <div style={{ height:36, flexShrink:0, borderTop:"1px solid var(--border)", background:"rgba(8,5,8,0.97)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", textTransform:"uppercase", letterSpacing:"0.12em", textDecoration:"none" }}
          >© {new Date().getFullYear()} ARUKZ DIGITAL</a>
          <span style={{ color:"var(--border)", fontSize:10 }}>·</span>
          <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'Instrument Sans'", fontSize:10, color:"var(--text-dim)", textDecoration:"none" }}
          >www.arukz.com</a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
