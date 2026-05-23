/** SeasonHeader — dark maroon banner with gold number */
const SHADE = [
  ["#8d1016","#2e0608"],["#7a1520","#2a0710"],["#9a1a1a","#2e0808"],
  ["#5c1a1b","#1e0808"],["#8d2a16","#2e0e08"],["#7b0d12","#280608"],
  ["#6b1010","#240808"],["#8d1630","#2e080c"],["#4a1515","#180808"],
  ["#9a1a2a","#2e0810"],["#6d1616","#240808"],["#3d0c0e","#140608"],
];

export default function SeasonHeader({ season, eventCount }) {
  const [from, to] = SHADE[(season.num - 1) % SHADE.length];

  return (
    <div className="flex items-center gap-5 px-6 py-5 relative overflow-hidden"
      style={{ background:`linear-gradient(135deg, ${from}, ${to})`, borderRadius:"16px 16px 0 0" }}>
      {/* Decorative */}
      <div style={{ position:"absolute", right:-24, top:-24, width:140, height:140, borderRadius:"50%", background:"rgba(255,202,0,0.05)", pointerEvents:"none" }}/>

      {/* Big number */}
      <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2.8rem,5vw,4rem)", lineHeight:1, color:"var(--gold)", minWidth:56, textAlign:"center", flexShrink:0, position:"relative", zIndex:1, textShadow:"0 2px 12px rgba(255,202,0,0.3)" }}>
        {String(season.num).padStart(2,"0")}
      </div>

      {/* Info */}
      <div className="flex-1 relative z-10 min-w-0">
        <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"rgba(255,202,0,0.4)", letterSpacing:"0.25em", textTransform:"uppercase", marginBottom:3 }}>
          SEASON {String(season.num).padStart(2,"0")} · பருவம்
        </div>
        <h2 className="truncate sm:whitespace-normal"
          style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(1.2rem,3vw,2rem)", lineHeight:1.15, color:"white", margin:0 }}>
          {season.label}
        </h2>
        {season.title && (
          <p className="hidden sm:block" style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, color:"rgba(255,255,255,0.45)", marginTop:3 }}>
            {season.title}
          </p>
        )}
        {season.period && (
          <span className="inline-block mt-2"
            style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"rgba(255,202,0,0.7)", background:"rgba(255,255,255,0.08)", borderRadius:999, padding:"2px 10px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            {season.period}
          </span>
        )}
      </div>

      {/* Event count */}
      <div className="shrink-0 text-center relative z-10">
        <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:"clamp(2rem,4vw,3rem)", lineHeight:1, color:"rgba(255,202,0,0.8)" }}>
          {eventCount}
        </div>
        <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"rgba(255,255,255,0.3)", letterSpacing:"0.18em", textTransform:"uppercase" }}>
          EVENTS
        </div>
      </div>
    </div>
  );
}
