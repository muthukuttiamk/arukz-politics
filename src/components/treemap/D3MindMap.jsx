/**
 * D3MindMap — Advanced collapsible tree visualization.
 *
 * Built with D3.js v7:
 *  - d3.tree() top-down layout
 *  - Smooth expand/collapse via d3.transition()
 *  - d3.zoom() for smooth pan/zoom
 *  - Party-color-coded SVG nodes (rect + text)
 *  - Curved link paths (d3.linkVertical)
 *  - Click event node → opens IncidentDrawer
 *  - Controls: Fit view, +/- zoom, Expand All, Collapse All
 *
 * Root → 13 Seasons → Events (each season expandable)
 */
import { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";
import config from "../../config";

/* ── Helpers ──────────────────────────────────────────── */
function domParty(events) {
  const cnt = {};
  events.forEach(e => (e.parties||[]).forEach(p => {
    if (p !== "unknown") cnt[p] = (cnt[p]||0) + 1;
  }));
  return Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0]?.[0] || "bjp";
}
function partyColor(parties = []) {
  const p = parties.find(p => p !== "unknown");
  return config.parties[p]?.color || "#8d1016";
}

/* ── Node dimensions ──────────────────────────────────── */
const ROOT_W = 200, ROOT_H = 72;
const SEA_W  = 160, SEA_H  = 60;
const EV_W   = 110, EV_H   = 44;

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */
export default function D3MindMap({ allEvents, allSeasons, onEventClick }) {
  const svgRef    = useRef(null);
  const gRootRef  = useRef(null);   // main <g> inside SVG
  const zoomRef   = useRef(null);   // d3.zoom instance
  const treeRef   = useRef(null);   // mutable tree data
  const [expandedSeasons, setExpandedSeasons] = useState(new Set());

  /* ── Build hierarchical data ────────────────────────── */
  const buildTree = useCallback((expandedSet) => ({
    id: "root",
    kind: "root",
    label: config.title,
    children: allSeasons.map(season => {
      const seaEvents = allEvents.filter(e => e.seasonNum === season.num);
      const expanded  = expandedSet.has(season.num);
      const dp        = domParty(seaEvents);
      return {
        id: `season-${season.num}`,
        kind: "season",
        label: `${String(season.num).padStart(2,"0")}`,
        sublabel: season.period || "",
        count: seaEvents.length,
        domParty: dp,
        color: config.parties[dp]?.color || "#8d1016",
        seasonNum: season.num,
        _expanded: expanded,
        children: expanded ? seaEvents.map(ev => ({
          id: `event-${ev.id}`,
          kind: "event",
          label: ev.title.slice(0, 28) + (ev.title.length > 28 ? "…" : ""),
          year: ev.year,
          color: partyColor(ev.parties),
          event: ev,
        })) : [],
      };
    }),
  }), [allEvents, allSeasons]);

  /* ── D3 render / update ─────────────────────────────── */
  const render = useCallback((expandedSet) => {
    const svg = d3.select(svgRef.current);
    const width  = svgRef.current.clientWidth  || 1200;
    const height = svgRef.current.clientHeight || 800;

    const data     = buildTree(expandedSet);
    const root     = d3.hierarchy(data);
    const treeLayout = d3.tree()
      .nodeSize([180, 140])
      .separation((a, b) => {
        if (a.data.kind === "event" && b.data.kind === "event") return 1.1;
        return a.parent === b.parent ? 1.4 : 2;
      });
    treeLayout(root);
    treeRef.current = root;

    const gRoot = d3.select(gRootRef.current);
    const dur = 450;

    /* ── Links ── */
    const links = gRoot.select(".links")
      .selectAll("path.link")
      .data(root.links(), d => d.target.data.id);

    const linkEnter = links.enter().append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke-width", d => d.target.data.kind === "event" ? 1 : 1.8)
      .attr("opacity", 0)
      .attr("d", d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y)
      );

    links.merge(linkEnter)
      .attr("stroke", d => {
        if (d.target.data.kind === "root") return "#8d1016";
        return d.target.data.color + "88";
      })
      .transition().duration(dur)
      .attr("opacity", 1)
      .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y));

    links.exit().transition().duration(dur).attr("opacity", 0).remove();

    /* ── Nodes ── */
    const nodes = gRoot.select(".nodes")
      .selectAll("g.node")
      .data(root.descendants(), d => d.data.id);

    const nodeEnter = nodes.enter().append("g")
      .attr("class", d => `node node-${d.data.kind}`)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("opacity", 0)
      .style("cursor", d => d.data.kind === "season" || d.data.kind === "event" ? "pointer" : "default");

    /* Root node */
    const rootG = nodeEnter.filter(d => d.data.kind === "root");
    rootG.append("rect")
      .attr("x", -ROOT_W/2).attr("y", -ROOT_H/2)
      .attr("width", ROOT_W).attr("height", ROOT_H)
      .attr("rx", 14)
      .attr("fill", "url(#rootGrad)")
      .attr("stroke", "#ffca00").attr("stroke-width", 2)
      .attr("filter", "url(#glow)");
    rootG.append("image")
      .attr("href", "/logo.png")
      .attr("x", -16).attr("y", -ROOT_H/2 + 8)
      .attr("width", 32).attr("height", 32)
      .style("border-radius", "50%");
    rootG.append("text")
      .attr("y", 8).attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "'Teko'").attr("font-size", 22).attr("font-weight", 700)
      .text(d => d.data.label.split(" ")[0]);
    rootG.append("text")
      .attr("y", 28).attr("text-anchor", "middle")
      .attr("fill", "#ffca00")
      .attr("font-family", "'Teko'").attr("font-size", 22).attr("font-weight", 700)
      .text(d => d.data.label.split(" ").slice(1).join(" "));

    /* Season nodes */
    const seaG = nodeEnter.filter(d => d.data.kind === "season");
    seaG.append("rect")
      .attr("x", -SEA_W/2).attr("y", -SEA_H/2)
      .attr("width", SEA_W).attr("height", SEA_H)
      .attr("rx", 10)
      .attr("fill", d => d.data._expanded ? `${d.data.color}22` : "#1a0d0f")
      .attr("stroke", d => d.data._expanded ? d.data.color : "rgba(141,16,22,0.4)")
      .attr("stroke-width", 1.5);
    seaG.append("text")
      .attr("y", -8).attr("text-anchor", "middle")
      .attr("fill", d => d.data._expanded ? d.data.color : "#ffca00")
      .attr("font-family", "'Teko'").attr("font-size", 30).attr("font-weight", 700)
      .text(d => d.data.label);
    seaG.append("text")
      .attr("y", 10).attr("text-anchor", "middle")
      .attr("fill", "rgba(237,229,227,0.4)")
      .attr("font-family", "'Instrument Sans'").attr("font-size", 9).attr("font-weight", 700)
      .text(d => d.data.sublabel);
    seaG.append("text")
      .attr("y", 24).attr("text-anchor", "middle")
      .attr("fill", d => d.data._expanded ? d.data.color : "rgba(141,16,22,0.5)")
      .attr("font-family", "'Instrument Sans'").attr("font-size", 9).attr("font-weight", 700)
      .text(d => `${d.data.count} events ${d.data._expanded?"▲":"▼"}`);
    seaG.on("click", (event, d) => {
      event.stopPropagation();
      setExpandedSeasons(prev => {
        const n = new Set(prev);
        n.has(d.data.seasonNum) ? n.delete(d.data.seasonNum) : n.add(d.data.seasonNum);
        return n;
      });
    });

    /* Event nodes */
    const evG = nodeEnter.filter(d => d.data.kind === "event");
    evG.append("rect")
      .attr("x", -EV_W/2).attr("y", -EV_H/2)
      .attr("width", EV_W).attr("height", EV_H)
      .attr("rx", 7)
      .attr("fill", "#110a0b")
      .attr("stroke", d => `${d.data.color}50`)
      .attr("stroke-width", 1);
    evG.append("rect") // left bar accent
      .attr("x", -EV_W/2).attr("y", -EV_H/2)
      .attr("width", 4).attr("height", EV_H)
      .attr("rx", 2)
      .attr("fill", d => d.data.color);
    evG.append("text")
      .attr("x", -EV_W/2 + 12).attr("y", -8)
      .attr("fill", d => d.data.color)
      .attr("font-family", "'Teko'").attr("font-size", 13).attr("font-weight", 700)
      .text(d => `${d.data.year || ""}`);
    evG.append("text")
      .attr("x", -EV_W/2 + 12).attr("y", 8)
      .attr("fill", "rgba(237,229,227,0.75)")
      .attr("font-family", "'Noto Sans Tamil'").attr("font-size", 8)
      .text(d => d.data.label);
    evG.on("click", (event, d) => {
      event.stopPropagation();
      onEventClick?.(d.data.event);
    })
    .on("mouseenter", function(event, d) {
      d3.select(this).select("rect").attr("fill", "#241215");
    })
    .on("mouseleave", function(event, d) {
      d3.select(this).select("rect").attr("fill", "#110a0b");
    });

    /* Merge + animate all */
    nodes.merge(nodeEnter)
      .transition().duration(dur)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("opacity", 1);

    nodes.exit().transition().duration(dur).attr("opacity", 0).remove();

    /* Update season rect fill on re-render */
    gRoot.select(".nodes").selectAll("g.node-season").each(function(d) {
      d3.select(this).select("rect:first-child")
        .transition().duration(dur)
        .attr("fill", d.data._expanded ? `${d.data.color}22` : "#1a0d0f")
        .attr("stroke", d.data._expanded ? d.data.color : "rgba(141,16,22,0.4)");
    });

  }, [buildTree, onEventClick]);

  /* ── Initial setup ──────────────────────────────────── */
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width  = svgRef.current.clientWidth  || 1200;
    const height = svgRef.current.clientHeight || 800;

    svg.attr("width", "100%").attr("height", "100%");

    /* Defs */
    const defs = svg.append("defs");
    const grad = defs.append("linearGradient").attr("id", "rootGrad")
      .attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","100%");
    grad.append("stop").attr("offset","0%").attr("stop-color","#2e0608");
    grad.append("stop").attr("offset","60%").attr("stop-color","#8d1016");
    grad.append("stop").attr("offset","100%").attr("stop-color","#5c1a1b");
    const filter = defs.append("filter").attr("id","glow");
    filter.append("feGaussianBlur").attr("stdDeviation","4").attr("result","coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in","coloredBlur");
    feMerge.append("feMergeNode").attr("in","SourceGraphic");

    /* Main group */
    const g = svg.append("g").attr("class", "d3-root");
    gRootRef.current = g.node();
    g.append("g").attr("class", "links");
    g.append("g").attr("class", "nodes");

    /* Dot background */
    const bg = svg.insert("g","g").attr("class","bg-dots");
    const dotSpacing = 30;
    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);
    for (let r = 0; r < rows + 40; r++) {
      for (let c = 0; c < cols + 40; c++) {
        bg.append("circle")
          .attr("cx", c * dotSpacing - 300)
          .attr("cy", r * dotSpacing - 300)
          .attr("r", 0.8)
          .attr("fill", "rgba(141,16,22,0.2)");
      }
    }

    /* Zoom */
    const zoom = d3.zoom()
      .scaleExtent([0.05, 3])
      .on("zoom", e => {
        g.attr("transform", e.transform);
        bg.attr("transform", e.transform);
      });
    zoomRef.current = zoom;
    svg.call(zoom);

    render(new Set());

    /* Fit to view after first render */
    setTimeout(() => fitView(), 600);

    return () => { svg.selectAll("*").remove(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Re-render on expand changes ─────────────────────── */
  useEffect(() => {
    if (!gRootRef.current) return;
    render(expandedSeasons);
    setTimeout(() => fitView(), 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedSeasons]);

  /* ── Fit view ──────────────────────────────────────────── */
  const fitView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current || !treeRef.current) return;
    const svg   = d3.select(svgRef.current);
    const w = svgRef.current.clientWidth;
    const h = svgRef.current.clientHeight;
    const nodes = treeRef.current.descendants();
    const xs = nodes.map(d => d.x);
    const ys = nodes.map(d => d.y);
    const x0 = Math.min(...xs) - 100, x1 = Math.max(...xs) + 100;
    const y0 = Math.min(...ys) - 80,  y1 = Math.max(...ys) + 80;
    const dw = x1 - x0, dh = y1 - y0;
    const scale = Math.min(w / dw, h / dh, 1.5) * 0.85;
    const tx = (w - scale * (x0 + x1)) / 2;
    const ty = (h - scale * (y0 + y1)) / 2;
    svg.transition().duration(700)
      .call(zoomRef.current.transform, d3.zoomIdentity.translate(tx,ty).scale(scale));
  }, []);

  const expandAll  = () => setExpandedSeasons(new Set(allSeasons.map(s => s.num)));
  const collapseAll= () => setExpandedSeasons(new Set());
  const zoomIn  = () => d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.4);
  const zoomOut = () => d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 0.7);

  /* ── Controls styling ─────────────────────────────────── */
  const btnStyle = { fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", cursor:"pointer", color:"var(--text-dim)", background:"rgba(8,5,8,0.85)", border:"1px solid var(--border)", borderRadius:6, padding:"6px 14px", transition:"all 0.2s", backdropFilter:"blur(8px)" };

  return (
    <div style={{ position:"relative", width:"100%", height:"100%", background:"var(--bg)" }}>
      {/* SVG canvas */}
      <svg ref={svgRef} style={{ width:"100%", height:"100%", display:"block" }} />

      {/* Floating controls */}
      <div style={{ position:"absolute", top:16, left:16, display:"flex", gap:6, flexWrap:"wrap" }}>
        <button style={btnStyle} onClick={expandAll}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--maroon)";e.currentTarget.style.color="var(--maroon)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-dim)";}}>
          ▼ Expand All
        </button>
        <button style={btnStyle} onClick={collapseAll}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--maroon)";e.currentTarget.style.color="var(--maroon)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-dim)";}}>
          ▲ Collapse All
        </button>
        <button style={btnStyle} onClick={fitView}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-dim)";}}>
          ⊡ Fit View
        </button>
      </div>

      {/* Zoom controls */}
      <div style={{ position:"absolute", bottom:20, left:16, display:"flex", flexDirection:"column", gap:4 }}>
        <button style={{ ...btnStyle, fontSize:14, padding:"6px 12px" }} onClick={zoomIn}>+</button>
        <button style={{ ...btnStyle, fontSize:14, padding:"6px 12px" }} onClick={zoomOut}>−</button>
      </div>

      {/* Legend */}
      <div style={{ position:"absolute", bottom:16, right:16, display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 14px", padding:"8px 14px", background:"rgba(8,5,8,0.88)", border:"1px solid var(--border)", borderRadius:10, backdropFilter:"blur(10px)", maxWidth:340 }}>
        {Object.entries(config.parties).filter(([k])=>k!=="unknown").map(([k,p])=>(
          <span key={k} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:p.color, display:"inline-block" }}/>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:700, color:"rgba(237,229,227,0.5)", textTransform:"uppercase", letterSpacing:"0.07em" }}>{p.en}</span>
          </span>
        ))}
      </div>

      {/* Expanded indicator */}
      {expandedSeasons.size > 0 && (
        <div style={{ position:"absolute", top:16, right:16, fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--maroon)", background:"rgba(141,16,22,0.12)", border:"1px solid rgba(141,16,22,0.3)", borderRadius:6, padding:"5px 12px", backdropFilter:"blur(8px)" }}>
          {expandedSeasons.size} seasons expanded · {[...expandedSeasons].reduce((s,n)=>s+allEvents.filter(e=>e.seasonNum===n).length,0)} events visible
        </div>
      )}

      {/* Instructions */}
      <div style={{ position:"absolute", top:60, left:16, fontFamily:"'Instrument Sans'", fontSize:8, color:"var(--text-dim)", background:"rgba(8,5,8,0.7)", padding:"4px 10px", borderRadius:5, border:"1px solid var(--border)" }}>
        Click season node to expand · Scroll to zoom · Drag to pan
      </div>
    </div>
  );
}
