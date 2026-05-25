/**
 * Hero — ஆட்சி மாற்றம் 2026
 * Clean, cinematic, minimal-text Netflix-style hero.
 * Mobile-first responsive design.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import config from "../../config";
import AnimatedCounter from "../ui/AnimatedCounter";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

/* Key stats for the strip */
const STATS = [
  { n: 139,  ta: "நிகழ்வுகள்",  en: "EVENTS"   },
  { n: 13,   ta: "பருவங்கள்",   en: "SEASONS"  },
  { n: 12,   ta: "ஆண்டுகள்",   en: "YEARS"    },
  { n: 2026, ta: "இறுதி ஆண்டு", en: "END YEAR" },
];

export default function Hero({ seasons, totalEvents }) {
  const partyKeys = Object.keys(config.parties).filter(k => k !== "unknown");

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "40px",
        background: `
          var(--hero-gradient),
          url('/hero-bg.png') center 30% / cover no-repeat
        `,
      }}
    >
      {/* Accent bar */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#3d0c0e,#8d1016 40%,#ffca00 70%,#8d1016)", zIndex:10 }} />

      {/* Subtle grid overlay */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(141,16,22,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(141,16,22,0.07) 1px,transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }} />

      {/* ── Content ── */}
      <div style={{ position:"relative", zIndex:5, width:"100%", maxWidth:900, margin:"0 auto", padding:"0 20px", textAlign:"center" }}>

         {/* Badge */}
        <motion.div {...fade(0)} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:24 }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 14px", background:"rgba(141,16,22,0.18)", border:"1px solid rgba(141,16,22,0.45)", borderRadius:999, backdropFilter:"blur(8px)" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#ffca00", display:"inline-block", animation:"pulse 1.8s infinite" }} />
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, letterSpacing:"0.25em", color:"var(--hero-text)", textTransform:"uppercase" }}>
              VERIFIED DOCUMENTARY ARCHIVE · ARUKZ DIGITAL
            </span>
          </span>
        </motion.div>

        {/* H1 — two lines */}
        <motion.div {...fade(0.1)} style={{ marginBottom:8 }}>
          <h1 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2.8rem,8vw,6.5rem)", lineHeight:0.88, color:"var(--hero-h1)", margin:0, textShadow:"0 4px 60px rgba(0,0,0,0.7)" }}>
            {config.heroH1line1}
          </h1>
          <h1 style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2.8rem,8vw,6.5rem)", lineHeight:0.88, margin:0, marginTop:"0.05em", background:"linear-gradient(135deg,#ff5040 0%,#ff8040 30%,#ffca00 65%,#ff6020 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", filter:"drop-shadow(0 2px 20px rgba(255,80,0,0.45))" }}>
            {config.heroH1line2}
          </h1>
        </motion.div>

        {/* Tagline sub-line */}
        <motion.p {...fade(0.22)} style={{ fontFamily:"'Noto Sans Tamil'", fontSize:"clamp(12px,2vw,16px)", color:"var(--hero-text-dim)", margin:"14px auto 0", maxWidth:580, lineHeight:1.65 }}>
          {config.heroH1sub}
        </motion.p>

        {/* Stats strip — 4-col desktop, 2×2 mobile */}
        <motion.div {...fade(0.32)} className="hero-stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, maxWidth:580, margin:"28px auto 0", background:"var(--hero-glass)", border:"1px solid var(--hero-glass-border)", borderRadius:14, overflow:"hidden", backdropFilter:"blur(12px)" }}>
          {STATS.map((s, i) => (
            <div key={s.en} style={{ padding:"16px 8px", borderRight: i < STATS.length-1 ? "1px solid var(--hero-glass-border)" : "none", display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.6rem,4vw,2.8rem)", color:"var(--maroon)", lineHeight:1 }}>
                <AnimatedCounter target={s.n} />
              </div>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:800, color:"var(--hero-text-muted)", letterSpacing:"0.18em", textTransform:"uppercase", marginTop:2 }}>
                {s.en}
              </div>
              <div style={{ fontFamily:"'Noto Sans Tamil'", fontSize:10, color:"var(--hero-text-dim)", marginTop:1 }}>
                {s.ta}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fade(0.42)} style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:12, marginTop:28 }}>
          <Link to="/timeline"
            style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"'Teko'", fontSize:"clamp(18px,3vw,22px)", fontWeight:700, letterSpacing:"0.05em", color:"white", background:"linear-gradient(135deg,#8d1016,#b01a22)", borderRadius:12, padding:"13px 32px", textDecoration:"none", boxShadow:"0 8px 32px rgba(141,16,22,0.55)", transition:"all 0.25s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(141,16,22,0.75)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(141,16,22,0.55)";}}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            {config.heroCTA1}
          </Link>

          <Link to="/timeline#season-13"
            style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"'Teko'", fontSize:"clamp(18px,3vw,22px)", fontWeight:700, letterSpacing:"0.05em", color:"var(--gold)", background:"var(--hero-glass)", border:"1.5px solid var(--gold)", borderRadius:12, padding:"13px 32px", textDecoration:"none", transition:"all 0.25s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(141,16,22,0.15)";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="var(--hero-glass)";e.currentTarget.style.transform="none";}}
          >
            ♟ {config.heroCTA2}
          </Link>
        </motion.div>

        {/* Party pills — compact */}
        <motion.div {...fade(0.52)} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"6px 8px", marginTop:20 }}>
          {partyKeys.map(k => {
            const p = config.parties[k];
            return (
              <span key={k} style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 10px", background:`${p.color}14`, border:`1px solid ${p.color}40`, color:p.color, borderRadius:999 }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:p.color, display:"inline-block" }} />
                {p.en}
              </span>
            );
          })}
        </motion.div>

        {/* Quick nav chips */}
        <motion.div {...fade(0.58)} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginTop:14 }}>
          {[
            { to:"/timeline", label:"📋 காலவரிசை" },
            { to:"/evidence", label:"⚖️ ஆதாரங்கள்" },
            { to:"/map",      label:"🗺 வரைபடம்" },
          ].map(l => (
            <Link key={l.to} to={l.to}
              style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, fontWeight:600, color:"var(--hero-text-dim)", background:"var(--hero-glass)", border:"1px solid var(--hero-glass-border)", borderRadius:8, padding:"5px 14px", textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.color="var(--maroon)";e.currentTarget.style.borderColor="var(--maroon)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="var(--hero-text-dim)";e.currentTarget.style.borderColor="var(--hero-glass-border)";}}
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:4, animation:"heroFloat 2.5s ease-in-out infinite" }}>
        <span style={{ fontFamily:"'Instrument Sans'", fontSize:7, fontWeight:700, letterSpacing:"0.4em", color:"var(--hero-text-muted)", textTransform:"uppercase" }}>SCROLL</span>
        <div style={{ width:1, height:28, background:"linear-gradient(to bottom, var(--border), transparent)" }} />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.6; transform:scale(1.3); }
        }
      `}</style>
    </section>
  );
}
