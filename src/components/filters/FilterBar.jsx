/**
 * FilterBar — Year tabs + Party filter pills (dark theme).
 * Replaces old category filter with more meaningful year and party dimensions.
 *
 * Props:
 *   filterMode  {"year"|"party"|"all"}
 *   yearFilter  {number|null}
 *   partyFilter {string|null}
 *   onYearChange  {function}
 *   onPartyChange {function}
 *   onClear       {function}
 *   counts        {object}  — { year: {2015:n,...}, party: {bjp:n,...} }
 */
import config from "../../config";
import CatIcon from "../ui/CatIcon";

export default function FilterBar({ yearFilter, partyFilter, onYearChange, onPartyChange, onClear, counts = {} }) {
  const yearCounts  = counts.year  || {};
  const partyCounts = counts.party || {};
  const hasFilter   = yearFilter || partyFilter;

  return (
    <div
      className="sticky z-40"
      style={{ top:90, background:"rgba(8,5,8,0.95)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", borderBottom:"1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-2">

        {/* Row 1: Year tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-dim)", flexShrink:0 }}>
            ஆண்டு:
          </span>
          {/* All years pill */}
          <button
            onClick={() => onYearChange(null)}
            style={{
              fontFamily:"'Teko'", fontWeight:700, fontSize:14, padding:"4px 12px",
              borderRadius:999, border:"1px solid",
              background: !yearFilter ? "var(--maroon)" : "var(--surface-2)",
              color:       !yearFilter ? "white"        : "var(--text-dim)",
              borderColor: !yearFilter ? "var(--maroon)": "var(--border)",
              cursor:"pointer", transition:"all 0.18s", flexShrink:0,
            }}
          >
            ALL
          </button>
          {config.yearRange.map((y) => {
            const cnt    = yearCounts[y] || 0;
            const active = yearFilter === y;
            return (
              <button key={y} onClick={() => onYearChange(y)}
                style={{
                  fontFamily:"'Teko'", fontWeight:700, fontSize:14, padding:"4px 10px",
                  borderRadius:999, border:"1px solid",
                  background: active ? "var(--maroon)"  : "var(--surface-2)",
                  color:      active ? "white"           : cnt ? "var(--text-muted)" : "var(--text-dim)",
                  borderColor:active ? "var(--maroon)"  : "var(--border)",
                  cursor: cnt ? "pointer" : "default",
                  opacity: cnt ? 1 : 0.35,
                  transition:"all 0.18s", flexShrink:0,
                }}
              >
                {y}
                {cnt > 0 && (
                  <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, marginLeft:4, opacity:0.7 }}>
                    {cnt}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Row 2: Party pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--text-dim)", flexShrink:0 }}>
            கட்சி:
          </span>
          <button
            onClick={() => onPartyChange(null)}
            style={{
              fontFamily:"'Instrument Sans'", fontWeight:700, fontSize:10, padding:"5px 14px",
              borderRadius:999, border:"1px solid",
              background: !partyFilter ? "var(--maroon)" : "var(--surface-2)",
              color:      !partyFilter ? "white"         : "var(--text-dim)",
              borderColor:!partyFilter ? "var(--maroon)" : "var(--border)",
              cursor:"pointer", transition:"all 0.18s", flexShrink:0, letterSpacing:"0.1em", textTransform:"uppercase",
            }}
          >
            அனைத்தும்
          </button>
          {Object.entries(config.parties).filter(([k]) => k !== "unknown").map(([key, party]) => {
            const cnt    = partyCounts[key] || 0;
            const active = partyFilter === key;
            return (
              <button key={key} onClick={() => onPartyChange(key)}
                style={{
                  fontFamily:"'Instrument Sans'", fontWeight:700, fontSize:10, padding:"5px 12px",
                  borderRadius:999, border:`1px solid ${active ? party.color : "var(--border)"}`,
                  background: active ? party.bg  : "var(--surface-2)",
                  color:      active ? party.color: cnt ? "var(--text-muted)" : "var(--text-dim)",
                  cursor: cnt ? "pointer" : "default",
                  opacity: cnt ? 1 : 0.35,
                  transition:"all 0.18s", flexShrink:0, letterSpacing:"0.08em", textTransform:"uppercase",
                  boxShadow: active ? `0 4px 16px ${party.color}33` : "none",
                }}
              >
                {party.en}
                {cnt > 0 && (
                  <span style={{ fontFamily:"'Instrument Sans'", fontSize:9, marginLeft:4, opacity:0.7 }}>
                    {cnt}
                  </span>
                )}
              </button>
            );
          })}

          {/* Clear */}
          {hasFilter && (
            <button onClick={onClear}
              className="flex items-center gap-1 ml-2"
              style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, color:"var(--maroon)", textTransform:"uppercase", letterSpacing:"0.12em", cursor:"pointer", background:"none", border:"none", flexShrink:0 }}
            >
              <CatIcon name="close" size={10} color="var(--maroon)" /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
