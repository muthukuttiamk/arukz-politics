/** SeasonPage — individual season deep-dive (/season/:num) */
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../config";
import EventCard from "../components/timeline/EventCard";

export default function SeasonPage({ events, seasons, onEventClick }) {
  const { num } = useParams();
  const seasonNum = parseInt(num, 10);
  const season = seasons.find(s => s.num === seasonNum);
  const seasonEvents = events.filter(e => e.seasonNum === seasonNum);

  if (!season) return (
    <div style={{ paddingTop:120, textAlign:"center", color:"var(--text-dim)", fontFamily:"'Instrument Sans'" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>404</div>
      <div>பருவம் {num} காணப்படவில்லை</div>
      <Link to="/timeline" style={{ color:"var(--maroon)", textDecoration:"none", marginTop:16, display:"inline-block" }}>← காலவரிசைக்குத் திரும்பு</Link>
    </div>
  );

  const parties = [...new Set(seasonEvents.flatMap(e => e.parties||[]).filter(p=>p!=="unknown"))];

  return (
    <div style={{ paddingTop:90, background:"var(--bg)", minHeight:"100vh" }}>
      {/* Season hero header */}
      <div style={{ background:`linear-gradient(180deg, rgba(141,16,22,0.12) 0%, var(--bg) 100%)`, borderBottom:"1px solid var(--border)", padding:"60px 24px 40px" }}>
        <div className="max-w-5xl mx-auto">
          <Link to="/timeline" style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", textDecoration:"none", letterSpacing:"0.15em", textTransform:"uppercase", display:"inline-flex", alignItems:"center", gap:6, marginBottom:20 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
            காலவரிசை
          </Link>
          <div style={{ display:"flex", alignItems:"flex-start", gap:24 }}>
            <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(5rem,12vw,10rem)", color:"rgba(141,16,22,0.2)", lineHeight:0.8, flexShrink:0 }}>
              {String(seasonNum).padStart(2,"0")}
            </div>
            <div>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>
                {season.period}
              </div>
              <h1 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2rem,5vw,4rem)", color:"white", lineHeight:1.05, marginBottom:12 }}>
                {season.title}
              </h1>
              {/* Party badges */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {parties.map(p => {
                  const party = config.parties[p];
                  if (!party) return null;
                  return (
                    <span key={p} style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", color:party.color, background:`${party.color}18`, border:`1px solid ${party.color}45`, borderRadius:999, padding:"3px 10px" }}>
                      {party.en}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:24, marginTop:32, flexWrap:"wrap" }}>
            {[
              { n:seasonEvents.length, label:"நிகழ்வுகள்", en:"Events" },
              { n:[...new Set(seasonEvents.map(e=>e.year).filter(Boolean))].length, label:"ஆண்டுகள்", en:"Years" },
              { n:parties.length, label:"கட்சிகள்", en:"Parties" },
            ].map(s => (
              <div key={s.en} style={{ background:"var(--surface-1)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 24px" }}>
                <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:40, color:"var(--maroon)", lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, color:"var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6" style={{ padding:"40px 24px" }}>
        <div style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:24 }}>
          {seasonEvents.length} EVENTS IN THIS SEASON
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seasonEvents.map((ev, i) => (
            <motion.div key={ev.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04, duration:0.4 }}>
              <EventCard event={ev} onClick={() => onEventClick(ev)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Season navigation */}
      <div className="max-w-5xl mx-auto px-6" style={{ borderTop:"1px solid var(--border)", padding:"32px 24px", display:"flex", justifyContent:"space-between" }}>
        {seasonNum > 1 && (
          <Link to={`/season/${seasonNum-1}`} style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--text-dim)", textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
            பருவம் {seasonNum-1}
          </Link>
        )}
        {seasonNum < seasons.length && (
          <Link to={`/season/${seasonNum+1}`} style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--text-dim)", textDecoration:"none", display:"flex", alignItems:"center", gap:6, marginLeft:"auto" }}>
            பருவம் {seasonNum+1}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        )}
      </div>
    </div>
  );
}
