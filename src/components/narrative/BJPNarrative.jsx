/**
 * BJPNarrative — "மத்திய அரசின் தலையீடு" evidence section.
 *
 * Presents documented facts about Central Government (BJP-led)
 * agency involvement in Tamil Nadu politics:
 * IT raids, ED cases, CBDT operations, and pattern analysis.
 *
 * All data comes from config.bjpNarrative and is factual/documented.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import config from "../../config";
import AnimatedCounter from "../ui/AnimatedCounter";
import CatIcon from "../ui/CatIcon";

const AGENCY_COLORS = {
  it_dept: "var(--it-dept)",
  ed:      "var(--ed)",
  cbi:     "var(--cbi)",
  bjp:     "var(--bjp)",
  dmk:     "var(--dmk)",
};

function StatCard({ stat }) {
  const party  = config.parties[stat.party] || {};
  return (
    <div
      className="flex flex-col items-center justify-center p-5 rounded-2xl text-center"
      style={{ background:"var(--surface-1)", border:`1px solid ${party.color || "var(--border)"}30` }}
    >
      <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2.5rem,5vw,3.5rem)", color: party.color || "var(--gold)", lineHeight:1 }}>
        <AnimatedCounter target={stat.n} />
      </div>
      <div style={{ fontFamily:"'Noto Sans Tamil'", fontSize:13, color:"var(--text-muted)", marginTop:4 }}>{stat.label}</div>
      <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.15em", textTransform:"uppercase", marginTop:2 }}>{stat.en}</div>
    </div>
  );
}

function EvidenceCard({ point, index }) {
  const [open, setOpen] = useState(false);
  const agency = config.parties[point.agency] || {};
  const connected = config.parties[point.connected] || {};

  return (
    <motion.div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ background:"var(--surface-1)", border:`1px solid ${agency.color || "var(--border)"}30` }}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-20px" }}
      transition={{ duration:0.4, delay:index*0.06 }}
      onClick={() => setOpen(!open)}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 p-4">
        {/* Year pill */}
        <div className="shrink-0 text-center">
          <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:22, color:"var(--gold)", lineHeight:1 }}>{point.year}</div>
          <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:800, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em" }}>YEAR</div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:agency.color, background:`${agency.color}20`, borderRadius:4, padding:"2px 8px", textTransform:"uppercase", letterSpacing:"0.1em" }}>
              {agency.en}
            </span>
            <span style={{ fontSize:10, color:"var(--text-dim)" }}>→</span>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:connected.color, background:`${connected.color}20`, borderRadius:4, padding:"2px 8px", textTransform:"uppercase", letterSpacing:"0.1em" }}>
              {connected.en}
            </span>
          </div>
          <div style={{ fontFamily:"'Teko'", fontSize:"clamp(0.95rem,2vw,1.1rem)", fontWeight:600, color:"var(--text)", lineHeight:1.25 }}>
            {point.title}
          </div>
        </div>

        <CatIcon name="arrow_down" size={14} color="var(--text-dim)"
          className={`shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Expandable body */}
      {open && (
        <div className="px-4 pb-4 pt-0">
          <div style={{ height:1, background:"var(--border)", marginBottom:12 }}/>
          <p style={{ fontFamily:"'Noto Sans Tamil'", fontSize:13, lineHeight:2, color:"var(--text-muted)" }}>
            {point.desc}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function BJPNarrative({ events }) {
  const n = config.bjpNarrative;

  // Count Central-agency events from actual data
  const centralCount = events.filter(e =>
    (e.parties || []).some(p => ["it_dept","ed","cbi"].includes(p))
  ).length;

  return (
    <section style={{ background:"var(--surface-0)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"80px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
        >
          {/* Evidence stamp */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div style={{ height:1, width:60, background:"linear-gradient(to right, transparent, var(--maroon))" }}/>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              DOCUMENTED EVIDENCE
            </span>
            <div style={{ height:1, width:60, background:"linear-gradient(to left, transparent, var(--maroon))" }}/>
          </div>

          <h2 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2.5rem,7vw,5rem)", color:"white", lineHeight:1, marginBottom:6 }}>
            {n.title}
          </h2>
          <p style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:12 }}>
            {n.titleEn}
          </p>
          <p style={{ fontFamily:"'Instrument Sans'", fontSize:14, color:"var(--text-muted)", maxWidth:600, margin:"0 auto" }}>
            {n.subtitle}
          </p>

          {/* Live count from real data */}
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
            style={{ background:"rgba(141,16,22,0.15)", border:"1px solid rgba(141,16,22,0.35)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"var(--maroon)" }}/>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:12, fontWeight:700, color:"var(--maroon)" }}>
              {centralCount} நிகழ்வுகளில் மத்திய நிறுவனங்கள் சம்பந்தப்பட்டன
            </span>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
          {n.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}>
              <StatCard stat={s} />
            </motion.div>
          ))}
        </div>

        {/* Evidence wall */}
        <div className="mb-6">
          <h3 style={{ fontFamily:"'Teko'", fontWeight:600, fontSize:28, color:"var(--text)", marginBottom:4 }}>
            ஆதார சான்றுகள் — Evidence Trail
          </h3>
          <p style={{ fontFamily:"'Instrument Sans'", fontSize:12, color:"var(--text-dim)", marginBottom:20 }}>
            Click each event to expand full documented details.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {n.evidencePoints.map((point, i) => (
            <EvidenceCard key={i} point={point} index={i} />
          ))}
        </div>

        {/* Pattern analysis callout */}
        <motion.div
          className="rounded-2xl p-6"
          style={{ background:"rgba(141,16,22,0.08)", border:"1px solid rgba(141,16,22,0.25)", borderLeft:"4px solid var(--maroon)" }}
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
        >
          <h4 style={{ fontFamily:"'Teko'", fontSize:22, fontWeight:700, color:"var(--maroon)", marginBottom:8 }}>
            📊 Pattern Analysis — வடிவம் பகுப்பாய்வு
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title:"தேர்தல் + ரெய்டு கோட்டு", desc:"பெரும்பாலான மத்திய ரெய்டுகள் தேர்தல் காலங்களில் அல்லது உடனடி பின்னர் நடந்தன. இது தற்செயலா?" },
              { title:"கூட்டணி = பாதுகாப்பு", desc:"அதிமுக-பாஜக கூட்டணி இருந்தபோது அதிமுக தலைவர்கள் மீது ரெய்டுகள் குறைந்தன. கூட்டணி தகர்ந்தவுடன் மீண்டும் தொடங்கின." },
              { title:"மத்திய நிறுவனங்கள் = கருவி", desc:"IT, ED, CBI — அனைத்தும் மத்திய அரசின் கீழ். மாநில எதிர்க்கட்சிகளை குறிவைத்து செயல்பட்ட வடிவம் தெளிவாக தெரிகிறது." },
            ].map((p, i) => (
              <div key={i} style={{ padding:"16px", background:"var(--surface-2)", borderRadius:12 }}>
                <div style={{ fontFamily:"'Teko'", fontSize:17, fontWeight:700, color:"var(--gold)", marginBottom:6 }}>{p.title}</div>
                <p style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, color:"var(--text-muted)", lineHeight:1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
