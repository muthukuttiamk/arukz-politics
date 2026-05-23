/**
 * Header — Dark glass sticky navigation.
 */
import { useEffect, useState, useRef } from "react";
import config from "../../config";
import SearchBox from "../ui/SearchBox";
import CatIcon from "../ui/CatIcon";

export default function Header({ searchQuery, onSearchChange, onSeasonSelect, onOpenMindmap, seasons, totalEvents }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll   = () => setScrolled(window.scrollY > 60);
    const onOutside  = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onOutside);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("mousedown", onOutside); };
  }, []);

  return (
    <header
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: 26,
        background: scrolled ? "rgba(8,5,8,0.97)" : "rgba(8,5,8,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "rgba(45,26,28,0.5)"}`,
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0"
            style={{ border: "1.5px solid var(--maroon)", boxShadow: "0 4px 16px rgba(141,16,22,0.5)" }}>
            <img src="/logo.png" alt="மர்ம அரசியல் logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
            <div>
              <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:17, color:"var(--maroon)", letterSpacing:"0.04em", lineHeight:1.15 }}>
                {config.title}
              </div>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase" }}>
                {config.dateRange} DOCUMENTARY
              </div>
            </div>
          </div>

          {/* Live badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background:"var(--surface-1)", border:"1px solid var(--border)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background:"var(--maroon)" }}/>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background:"var(--maroon)" }}/>
            </span>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              LIVE ARCHIVE
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block w-52 lg:w-64">
              <SearchBox value={searchQuery} onChange={onSearchChange} />
            </div>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border transition-colors"
              style={{ border:"1px solid var(--border)", background:"var(--surface-1)", color:"var(--text-muted)" }}
              onClick={() => setMobileSearch(!mobileSearch)}
            >
              <CatIcon name="search" size={15} color="var(--text-muted)" />
            </button>

            {/* Season dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border font-instrument text-xs font-bold tracking-wider uppercase transition-all"
                style={dropOpen
                  ? { background:"var(--maroon)", color:"white", borderColor:"var(--maroon)" }
                  : { background:"var(--surface-1)", color:"var(--text-muted)", borderColor:"var(--border)" }
                }
              >
                <span className="hidden sm:inline">பருவங்கள்</span>
                <span className="rounded-full px-1.5 text-xs font-bold"
                  style={{ background: dropOpen ? "rgba(255,255,255,0.2)" : "rgba(141,16,22,0.2)", color: dropOpen ? "white" : "var(--maroon)" }}>
                  {seasons.length}
                </span>
                <CatIcon name="arrow_down" size={12} color={dropOpen ? "white" : "var(--text-dim)"}
                  className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
              </button>

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl py-2 z-50 max-h-96 overflow-y-auto scrollbar-none"
                  style={{ background:"var(--surface-2)", border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", animation:"slideDown 0.25s ease" }}>
                  <div className="px-4 py-2 mb-1" style={{ borderBottom:"1px solid var(--border)" }}>
                    <p style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase" }}>
                      Jump to பருவம்
                    </p>
                  </div>
                  {seasons.map((s) => (
                    <button key={s.num} onClick={() => { onSeasonSelect(s.num); setDropOpen(false); }}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 group transition-colors"
                      style={{ background:"transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ fontFamily:"'Teko'", fontSize:28, fontWeight:700, color:"var(--maroon-dim)", minWidth:36, textAlign:"center", lineHeight:1 }}>
                        {String(s.num).padStart(2,"0")}
                      </span>
                      <div className="min-w-0">
                        <div style={{ fontFamily:"'Teko'", fontSize:17, fontWeight:600, lineHeight:1.2, color:"var(--text)" }} className="truncate">
                          {s.label}
                        </div>
                        <div style={{ fontFamily:"'Instrument Sans'", fontSize:10, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
                          {s.period}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mindmap nav button — prominent */}
            <button
              onClick={onOpenMindmap}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-all"
              style={{ background:"var(--maroon)", border:"none", color:"white", fontFamily:"'Teko'", fontSize:18, fontWeight:700, letterSpacing:"0.04em", cursor:"pointer", boxShadow:"0 4px 20px rgba(141,16,22,0.5)", lineHeight:1 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#a01820"; e.currentTarget.style.boxShadow="0 6px 28px rgba(141,16,22,0.7)"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="var(--maroon)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(141,16,22,0.5)"; e.currentTarget.style.transform="none"; }}
              title="Open Full Mind Map"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>
              வரைபடம்
            </button>

            {/* Event count */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background:"var(--surface-1)", border:"1px solid var(--border)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--gold)" }}/>
              <span style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--text-muted)" }}>{totalEvents}</span>
            </div>
          </div>

        </div>

        {mobileSearch && (
          <div className="md:hidden pb-3" style={{ animation:"slideDown 0.25s ease" }}>
            <SearchBox value={searchQuery} onChange={onSearchChange} className="w-full" />
          </div>
        )}
      </div>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </header>
  );
}
