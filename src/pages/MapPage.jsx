/** MapPage — Full-screen D3 mindmap page (/map route) */
import { useNavigate } from "react-router-dom";
import D3MindMap from "../components/treemap/D3MindMap";
import config from "../config";

export default function MapPage({ events, seasons, onEventClick }) {
  const navigate = useNavigate();

  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, background:"var(--bg)", display:"flex", flexDirection:"column" }}>
      {/* Top bar */}
      <div style={{ height:60, flexShrink:0, background:"rgba(8,5,8,0.97)", borderBottom:"1px solid var(--border)", backdropFilter:"blur(20px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px" }}>
        <button onClick={() => navigate(-1)}
          style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", color:"var(--text-dim)", fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em", padding:"6px 12px", borderRadius:8, transition:"all 0.2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.background="rgba(141,16,22,0.15)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.color="var(--text-dim)"; e.currentTarget.style.background="none"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
          Back
        </button>

        <div style={{ flex:1, textAlign:"center" }}>
          <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.6rem,4vw,2.8rem)", color:"white", lineHeight:0.9 }}>
            மர்மவரைபடம்
          </div>
          <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
            {config.title} · POLITICAL EVIDENCE TREE · {events.length} EVENTS
          </div>
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", background:"rgba(141,16,22,0.1)", border:"1px solid rgba(141,16,22,0.25)", borderRadius:6, padding:"5px 12px" }}>
            {seasons.length} பருவங்கள்
          </div>
        </div>
      </div>

      {/* D3 tree takes remaining height */}
      <div style={{ flex:1, overflow:"hidden" }}>
        <D3MindMap allEvents={events} allSeasons={seasons} onEventClick={onEventClick} />
      </div>

      {/* Bottom copyright */}
      <div style={{ height:34, flexShrink:0, borderTop:"1px solid var(--border)", background:"rgba(8,5,8,0.97)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", textTransform:"uppercase", letterSpacing:"0.12em", textDecoration:"none" }}>
          © {new Date().getFullYear()} ARUKZ DIGITAL
        </a>
        <span style={{ color:"var(--border)", fontSize:10 }}>·</span>
        <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"'Instrument Sans'", fontSize:10, color:"var(--text-dim)", textDecoration:"none" }}>
          www.arukz.com
        </a>
      </div>
    </div>
  );
}
