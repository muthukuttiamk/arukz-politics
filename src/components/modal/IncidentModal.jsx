/**
 * IncidentModal — dark evidence overlay with Google News link.
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
  w.document.write(`<!DOCTYPE html><html lang="ta"><head><meta charset="UTF-8"/><title>மர்ம அரசியல் — ${event.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Teko:wght@700&display=swap" rel="stylesheet"/>
  <style>body{font-family:'Noto Sans Tamil',sans-serif;padding:48px 60px;max-width:820px;margin:0 auto;background:#fff;color:#1a1a1f;}
  .header{background:linear-gradient(135deg,#3d0c0e,#8d1016);color:white;padding:28px 36px;border-radius:12px;margin-bottom:28px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  .title{font-family:'Teko',sans-serif;font-size:32px;font-weight:700;color:white;}
  .date{font-family:'Teko',sans-serif;font-size:22px;font-weight:700;color:#ffca00;margin-bottom:6px;}
  .body{line-height:2.2;font-size:15px;white-space:pre-wrap;margin-bottom:28px;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:28px;}
  td,th{padding:9px 12px;border-bottom:1px solid #eee;text-align:left;}th{font-size:10px;font-weight:700;text-transform:uppercase;color:#888;letter-spacing:.08em;}
  .disclaimer{border-left:4px solid #8d1016;padding:14px 18px;background:rgba(141,16,22,.04);font-size:12px;line-height:1.8;margin-bottom:24px;}
  .footer{border-top:2px solid #8d1016;margin-top:32px;padding-top:14px;font-size:11px;color:#bbb;text-align:center;font-family:'Instrument Sans',sans-serif;}</style></head>
  <body>
  <div class="header"><div class="date">📅 ${event.date}</div><div class="title">${event.title}</div></div>
  <div class="body">${event.desc.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>
  <table><tr><th>Field</th><th>Value</th></tr>
  <tr><td>ID</td><td>${config.archiveId}-${String(event.id).padStart(4,"0")}</td></tr>
  <tr><td>தேதி</td><td>${event.date}</td></tr>
  <tr><td>பருவம்</td><td>${event.season}</td></tr>
  <tr><td>வகை</td><td>${cat?.label||event.filter}</td></tr>
  <tr><td>Tags</td><td>${(event.parties||[]).join(" · ")}</td></tr></table>
  <div class="disclaimer"><strong>Disclaimer:</strong> ${config.disclaimerEn}</div>
  <div class="footer">${config.title} · ${config.dateRange}</div>
  </body></html>`);
  w.document.close();
  setTimeout(() => w.print(), 600);
}

export default function IncidentModal({ event, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const cat = config.categories[event.filter];
  const parties = (event.parties || []);
  const newsUrl = `https://news.google.com/search?q=${encodeURIComponent(event.newsQuery||event.title)}&hl=ta&gl=IN&ceid=IN:ta`;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(4,2,4,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          id={`event-${event.id}`}
          style={{ background:"var(--surface-0)", borderRadius:20, maxWidth:720, width:"100%", maxHeight:"90vh", overflowY:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.6), 0 8px 32px rgba(141,16,22,0.2)", scrollbarWidth:"thin", scrollbarColor:"var(--maroon) var(--surface-1)", border:"1px solid var(--border)" }}
          initial={{ opacity:0, y:60, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:40, scale:0.96 }}
          transition={{ duration:0.38, ease:[0.25,0.46,0.45,0.94] }}
        >
          {/* Maroon header */}
          <div style={{ background:"linear-gradient(135deg, #2e0608, #8d1016)", padding:"28px 32px 22px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-32, top:-32, width:160, height:160, borderRadius:"50%", background:"rgba(255,202,0,0.06)" }}/>

            {/* Close */}
            <button onClick={onClose}
              style={{ position:"absolute", top:16, right:16, width:36, height:36, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.1)", color:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.2)"; e.currentTarget.style.transform="rotate(90deg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.transform="rotate(0deg)"; }}
            >
              <CatIcon name="close" size={14} color="white" />
            </button>

            {/* Seal + meta */}
            <div className="flex items-start gap-4 mb-4 relative z-10">
              <EvidenceSeal light size={56} />
              <div>
                <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"rgba(255,202,0,0.55)", letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:6 }}>
                  நிகழ்வு {String(event.id).padStart(2,"0")} · {event.season}
                </div>
                <span style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:999, padding:"3px 12px", color:"rgba(255,255,255,0.75)", display:"inline-block" }}>
                  {cat?.icon} {cat?.label}
                </span>
              </div>
            </div>

            {/* Date */}
            <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.2rem,2.5vw,1.6rem)", color:"var(--gold)", marginBottom:6, position:"relative", zIndex:1 }}>
              📅 {event.date}
            </div>

            {/* Title */}
            <h2 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.5rem,3.5vw,2.3rem)", lineHeight:1.15, color:"white", margin:0, position:"relative", zIndex:1 }}>
              {event.title}
            </h2>

            {/* Parties bar */}
            {parties.filter(p=>p!=="unknown").length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
                {parties.filter(p=>p!=="unknown").map((p) => {
                  const party = config.parties[p];
                  if (!party) return null;
                  return (
                    <span key={p} style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:party.color, background:party.bg, border:`1px solid ${party.color}40`, borderRadius:4, padding:"2px 8px" }}>
                      {party.en}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ padding:"24px 32px 28px" }}>

            {/* Document ID + news link */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, border:"1.5px solid rgba(141,16,22,0.3)", borderRadius:6, padding:"4px 10px", background:"rgba(141,16,22,0.08)", fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--maroon)" }}>
                ✦ {config.archiveId}-{String(event.id).padStart(4,"0")}
              </div>
              <a href={newsUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.1em" }}>
                <CatIcon name="link" size={12} color="var(--text-dim)" />
                Google News →
              </a>
            </div>

            {/* Full Tamil desc */}
            <div style={{ fontFamily:"'Noto Sans Tamil'", fontSize:15, lineHeight:2.1, color:"var(--text)", whiteSpace:"pre-line", marginBottom:24 }}>
              {event.desc}
            </div>

            <div style={{ height:1, background:"linear-gradient(to right, transparent, var(--border), transparent)", marginBottom:20 }}/>

            {/* Metadata */}
            <h4 style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>
              📋 ஆவண விவரங்கள் (EVIDENCE METADATA)
            </h4>
            <div style={{ border:"1px solid var(--border)", borderRadius:10, overflow:"hidden", marginBottom:20 }}>
              <EvidenceMetaTable event={event} />
            </div>

            {/* Actions */}
            <div style={{ marginBottom:20 }}>
              <ActionBar event={event} onPrint={() => buildPrintWindow(event)} />
            </div>

            <div style={{ height:1, background:"linear-gradient(to right, transparent, var(--border), transparent)", marginBottom:20 }}/>

            {/* Disclaimer */}
            <div style={{ borderLeft:"4px solid var(--maroon)", padding:"14px 18px", background:"rgba(141,16,22,0.06)", border:"1px solid rgba(141,16,22,0.15)", borderLeftWidth:4, borderLeftColor:"var(--maroon)", borderRadius:"0 8px 8px 0", marginBottom:16 }}>
              <p style={{ fontFamily:"'Instrument Sans'", fontSize:11, color:"var(--text-muted)", lineHeight:1.7, marginBottom:6 }}>
                <strong style={{ color:"var(--maroon)" }}>ஆவண உத்தரவாதம்: </strong>{config.disclaimerTa}
              </p>
              <p style={{ fontFamily:"'Instrument Sans'", fontSize:10, color:"var(--text-dim)", lineHeight:1.7 }}>
                <strong>Disclaimer: </strong>{config.disclaimerEn}
              </p>
            </div>

            <div className="flex justify-end">
              <button onClick={onClose} style={{ fontFamily:"'Instrument Sans'", fontSize:12, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-dim)", border:"none", background:"none", cursor:"pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--maroon)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              >
                ✕ மூடு / Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
