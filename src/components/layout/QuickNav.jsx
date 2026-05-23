/** QuickNav — dark floating season navigator */
import { useEffect, useState } from "react";

export default function QuickNav({ seasonNums }) {
  const [active, setActive] = useState(seasonNums[0]);

  useEffect(() => {
    const observers = [];
    seasonNums.forEach((num) => {
      const el = document.getElementById(`season-${num}`);
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(num); }, { rootMargin:"-40% 0px -40% 0px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [seasonNums]);

  const scrollTo = (num) => {
    document.getElementById(`season-${num}`)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <div
      className="hidden xl:flex flex-col gap-1 fixed z-40"
      style={{ right:12, top:"50%", transform:"translateY(-50%)", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"8px 5px", boxShadow:"0 4px 24px rgba(0,0,0,0.4)" }}
    >
      <span style={{ fontFamily:"'Instrument Sans'", fontSize:7, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-dim)", textAlign:"center", display:"block", marginBottom:4 }}>P</span>
      {seasonNums.map((num) => {
        const isActive = num === active;
        return (
          <button key={num} onClick={() => scrollTo(num)} title={`பருவம் ${String(num).padStart(2,"0")}`}
            style={{ width:26, height:26, borderRadius:7, border:`1.5px solid ${isActive ? "var(--maroon)" : "transparent"}`,
              background: isActive ? "var(--maroon)" : "transparent",
              color: isActive ? "white" : "var(--text-dim)",
              fontFamily:"'Teko'", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s",
              display:"flex", alignItems:"center", justifyContent:"center", transform: isActive ? "scale(1.1)" : "scale(1)" }}
            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background="rgba(141,16,22,0.2)"; e.currentTarget.style.color="var(--maroon)"; }}}
            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--text-dim)"; }}}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
