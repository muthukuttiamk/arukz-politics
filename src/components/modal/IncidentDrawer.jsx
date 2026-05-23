/**
 * IncidentDrawer — Slide-in right panel replacing the old centered modal.
 *
 * Modern "slide-over" pattern (used by Linear, Notion, GitHub):
 *  - Slides from the right edge at 680px wide
 *  - Main content remains visible on the left (dimmed backdrop)
 *  - Keyboard: Escape to close
 *  - Scroll independent from main page
 *
 * Replaces IncidentModal everywhere.
 */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "../../config";
import EvidenceSeal from "../ui/EvidenceSeal";
import EvidenceMetaTable from "./EvidenceMetaTable";
import ActionBar from "./ActionBar";
import CatIcon from "../ui/CatIcon";

function buildPrintWindow(event) {
  const cat = config.categories[event.filter];
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html lang="ta"><head><meta charset="UTF-8"/>
  <title>மர்ம அரசியல் — ${event.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Teko:wght@700&display=swap" rel="stylesheet"/>
  <style>body{font-family:'Noto Sans Tamil',sans-serif;padding:48px 60px;max-width:820px;margin:0 auto;background:#fff;color:#1a1a1f;}
  .header{background:linear-gradient(135deg,#3d0c0e,#8d1016);color:white;padding:28px 36px;border-radius:12px;margin-bottom:28px;-webkit-print-color-adjust:exact;}
  .title{font-family:'Teko',sans-serif;font-size:32px;font-weight:700;color:white;}
  .date{font-family:'Teko',sans-serif;font-size:22px;font-weight:700;color:#ffca00;margin-bottom:6px;}
  .body{line-height:2.2;font-size:15px;white-space:pre-wrap;margin-bottom:28px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px;}
  td,th{padding:9px 12px;border-bottom:1px solid #eee;text-align:left;}
  th{font-size:10px;font-weight:700;text-transform:uppercase;color:#888;letter-spacing:.08em;}
  .disclaimer{border-left:4px solid #8d1016;padding:14px 18px;background:rgba(141,16,22,.04);font-size:12px;line-height:1.8;margin-bottom:24px;}
  .footer{border-top:2px solid #8d1016;margin-top:32px;padding-top:14px;font-size:11px;color:#bbb;text-align:center;}
  </style></head><body>
  <div class="header"><div class="date">📅 ${event.date}</div><div class="title">${event.title}</div></div>
  <div class="body">${event.desc.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
  <table><tr><th>Field</th><th>Value</th></tr>
  <tr><td>ID</td><td>${config.archiveId}-${String(event.id).padStart(4,"0")}</td></tr>
  <tr><td>தேதி</td><td>${event.date}</td></tr>
  <tr><td>பருவம்</td><td>${event.season}</td></tr>
  <tr><td>வகை</td><td>${cat?.label||event.filter}</td></tr>
  <tr><td>Parties</td><td>${(event.parties||[]).join(" · ")}</td></tr></table>
  <div class="disclaimer"><strong>Disclaimer:</strong> ${config.disclaimerEn}</div>
  <div class="footer">${config.title} · ${config.dateRange}</div>
  </body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 600);
}

export default function IncidentDrawer({ event, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const cat = config.categories[event.filter];
  const parties = (event.parties || []).filter(p => p !== "unknown");
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent((event.newsQuery || event.title) + " Tamil Nadu")}&gl=IN&hl=ta`;

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="drawer-backdrop"
        style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(4,2,4,0.7)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* ── Slide-over panel ── */}
      <motion.aside
        key="drawer-panel"
        id={`event-${event.id}`}
        style={{
          position: "fixed", right: 0, top: 0, bottom: 0,
          width: "min(700px, 95vw)",
          zIndex: 901,
          background: "var(--surface-0)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-16px 0 60px rgba(0,0,0,0.6), -4px 0 20px rgba(141,16,22,0.2)",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--maroon) var(--surface-1)",
          display: "flex",
          flexDirection: "column",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "105%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
      >
        {/* ── Progress stripe ── */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #3d0c0e, #8d1016, #ffca00)", flexShrink: 0 }} />

        {/* ── Top bar: breadcrumb + close ── */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px", borderBottom: "1px solid var(--border)",
            background: "var(--surface-1)", flexShrink: 0, gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.18em", textTransform: "uppercase", flexShrink: 0 }}>
              Evidence
            </span>
            <CatIcon name="chevron_right" size={12} color="var(--text-dim)" />
            <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700, color: "var(--maroon)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
              #{String(event.id).padStart(2, "0")} · {event.season}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 8,
              border: "1px solid var(--border)", background: "var(--surface-2)",
              color: "var(--text-muted)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--maroon)"; e.currentTarget.style.borderColor = "var(--maroon)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            title="Close (Esc)"
          >
            <CatIcon name="close" size={14} color="inherit" />
          </button>
        </div>

        {/* ── Maroon header band ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #2e0608 0%, #8d1016 60%, #5c1a1b 100%)",
            padding: "28px 28px 24px",
            position: "relative", overflow: "hidden", flexShrink: 0,
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,202,0,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 60, bottom: -60, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

          {/* Seal + category */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, position: "relative", zIndex: 1 }}>
            <EvidenceSeal light size={48} />
            <div>
              <span style={{
                fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999, padding: "3px 12px", color: "rgba(255,255,255,0.75)",
                display: "inline-block",
              }}>
                {cat?.label || event.filter}
              </span>
              <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: "rgba(255,202,0,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>
                VERIFIED ARCHIVE
              </div>
            </div>
          </div>

          {/* Date */}
          <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.4rem)", color: "var(--gold)", marginBottom: 6, position: "relative", zIndex: 1 }}>
            📅 {event.date}
          </div>

          {/* Title */}
          <h2 style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", lineHeight: 1.15, color: "white", margin: 0, position: "relative", zIndex: 1 }}>
            {event.title}
          </h2>

          {/* Party badges */}
          {parties.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, position: "relative", zIndex: 1 }}>
              {parties.map(p => {
                const party = config.parties[p];
                return party ? (
                  <span key={p} style={{
                    fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    color: party.color, background: `${party.color}25`,
                    border: `1px solid ${party.color}50`, borderRadius: 4, padding: "2px 8px",
                  }}>{party.en}</span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, padding: "24px 28px 40px", overflow: "visible" }}>

          {/* Document ID row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 20 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              border: "1.5px solid rgba(141,16,22,0.35)", borderRadius: 6,
              padding: "4px 12px", background: "rgba(141,16,22,0.08)",
              fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--maroon)",
            }}>
              ✦ {config.archiveId}-{String(event.id).padStart(4, "0")}
            </div>
            <a href={searchUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 700,
                color: "var(--text-dim)", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.1em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
            >
              <CatIcon name="link" size={12} color="inherit" />
              Google Search →
            </a>
          </div>

          {/* Full Tamil description */}
          <div style={{
            fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: 15,
            lineHeight: 2.1, color: "var(--text)", whiteSpace: "pre-line", marginBottom: 24,
          }}>
            {event.desc}
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)", marginBottom: 20 }} />

          {/* Metadata */}
          <h4 style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            📋 EVIDENCE METADATA
          </h4>
          <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
            <EvidenceMetaTable event={event} />
          </div>

          {/* Action buttons */}
          <div style={{ marginBottom: 20 }}>
            <ActionBar event={event} onPrint={() => buildPrintWindow(event)} />
          </div>

          <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)", marginBottom: 20 }} />

          {/* Disclaimer */}
          <div style={{
            borderLeft: "4px solid var(--maroon)", padding: "14px 18px",
            background: "rgba(141,16,22,0.06)", borderRadius: "0 8px 8px 0",
          }}>
            <p style={{ fontFamily: "'Instrument Sans'", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 6 }}>
              <strong style={{ color: "var(--maroon)" }}>ஆவண உத்தரவாதம்: </strong>{config.disclaimerTa}
            </p>
            <p style={{ fontFamily: "'Instrument Sans'", fontSize: 10, color: "var(--text-dim)", lineHeight: 1.7 }}>
              <strong>Disclaimer: </strong>{config.disclaimerEn}
            </p>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
