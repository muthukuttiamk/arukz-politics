/** Footer — dark three-column footer */
import config from "../../config";
import CatIcon from "../ui/CatIcon";

export default function Footer({ totalEvents, seasons }) {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", background:"var(--surface-0)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px" style={{ background:"linear-gradient(to right, transparent, rgba(141,16,22,0.3))" }}/>
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0"
            style={{ border: "1.5px solid var(--maroon)", boxShadow: "0 4px 16px rgba(141,16,22,0.4)" }}>
            <img src="/logo.png" alt={config.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="flex-1 h-px" style={{ background:"linear-gradient(to left, transparent, rgba(141,16,22,0.3))" }}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:36, color:"var(--maroon)", lineHeight:1, marginBottom:6 }}>{config.title}</h3>
            <p style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:14 }}>
              {config.subtitle} · {config.dateRange}
            </p>
            <p style={{ fontFamily:"'Noto Sans Tamil'", fontSize:13, lineHeight:1.9, color:"var(--text-muted)" }}>
              {config.footerDesc}
            </p>
          </div>

          {/* Stats */}
          <div className="md:text-center">
            <p style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:14 }}>ARCHIVE STATS</p>
            <div className="grid grid-cols-2 gap-3">
              {[[seasons.length,"பருவங்கள்"],[totalEvents,"நிகழ்வுகள்"],[11,"ஆண்டுகள்"],[Object.keys(config.parties).length-1,"கட்சிகள்"]].map(([v,l]) => (
                <div key={l} className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                  style={{ background:"var(--surface-2)", border:"1px solid var(--border)" }}>
                  <span style={{ fontFamily:"'Teko'", fontSize:24, fontWeight:700, color:"var(--maroon)", lineHeight:1 }}>{v}</span>
                  <span style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, color:"var(--text-muted)" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline + Party tags */}
          <div>
            <p style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:14 }}>PARTIES COVERED</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(config.parties).filter(([k])=>k!=="unknown").map(([k,p]) => (
                <span key={k} style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em",
                  color:p.color, background:p.bg, border:`1px solid ${p.color}40`, borderRadius:4, padding:"3px 8px" }}>
                  {p.en}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop:"1px solid var(--border)" }}>
          <p style={{ fontFamily:"'Instrument Sans'", fontSize:11, color:"var(--text-dim)" }}>{config.title} · {config.subtitle}</p>
          <p style={{ fontFamily:"'Instrument Sans'", fontSize:11, color:"var(--text-dim)" }}>{config.dateRange} · {totalEvents} events</p>
        </div>
      </div>

      {/* ARUKZ DIGITAL copyright bar */}
      <div style={{ borderTop: "1px solid var(--border)", background: "#0a0506", padding: "12px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 800, color: "var(--maroon)", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--maroon)"}
        >
          © {new Date().getFullYear()} ARUKZ DIGITAL
        </a>
        <span style={{ color: "var(--border)", fontSize: 10 }}>·</span>
        <a href={config.copyrightUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
        >www.arukz.com</a>
        <span style={{ color: "var(--border)", fontSize: 10 }}>·</span>
        <span style={{ fontFamily: "'Noto Sans Tamil'", fontSize: 10, color: "var(--text-dim)" }}>அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை</span>
      </div>
    </footer>
  );
}
