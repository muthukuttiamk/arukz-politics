/**
 * Header — Mobile-first dark glass navigation.
 * Full hamburger menu on mobile, desktop nav on lg+.
 */
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import config from "../../config";
import SearchBox from "../ui/SearchBox";
import CatIcon from "../ui/CatIcon";

const NAV = [
  { to:"/",         label:"முகப்பு",    en:"Home",     icon:"⌂" },
  { to:"/timeline", label:"காலவரிசை",   en:"Timeline", icon:"📅" },
  { to:"/evidence", label:"ஆதாரங்கள்",  en:"Evidence", icon:"⚖" },
  { to:"/map",      label:"வரைபடம்",    en:"Map",      icon:"🗺" },
];

export default function Header({ searchQuery, onSearchChange, onSeasonSelect, seasons, totalEvents, theme, toggleTheme }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mobileSearch,setMobileSearch]= useState(false);
  const dropRef  = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll  = () => setScrolled(window.scrollY > 60);
    const onOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    document.addEventListener("mousedown", onOutside);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  /* Close mobile nav on route change */
  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [location.pathname]);

  const isActive = (to) => to === "/"
    ? location.pathname === "/"
    : location.pathname.startsWith(to);

  return (
    <>
      <header
        style={{
          position:"fixed", left:0, right:0, top:26, zIndex:50,
          background: scrolled ? "var(--header-bg-scroll)" : "var(--header-bg)",
          backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          borderBottom:`1px solid ${scrolled?"var(--border)":"rgba(45,26,28,0.2)"}`,
          boxShadow: scrolled ? "0 2px 32px var(--shadow-color)" : "none",
          transition:"all 0.3s",
        }}
      >
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56, gap:8 }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0, minWidth:0 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", overflow:"hidden", border:"1.5px solid var(--maroon)", boxShadow:"0 4px 16px rgba(141,16,22,0.5)", flexShrink:0 }}>
              <img src="/logo.png" alt="logo" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontFamily:"'Teko'", fontWeight:700, fontSize:16, color:"var(--maroon)", letterSpacing:"0.04em", lineHeight:1.1, whiteSpace:"nowrap" }}>
                {config.title}
              </div>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.18em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                {config.dateRange}
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{ display:"none" }} className="lg-nav">
            {NAV.map(link => (
              <Link key={link.to} to={link.to}
                style={{ fontFamily:"'Teko'", fontSize:17, fontWeight:700, letterSpacing:"0.06em", color:isActive(link.to)?"var(--maroon)":"var(--text-dim)", textDecoration:"none", padding:"5px 12px", borderRadius:8, transition:"all 0.2s", background:isActive(link.to)?"rgba(141,16,22,0.1)":"transparent", borderBottom:isActive(link.to)?"2px solid var(--maroon)":"2px solid transparent" }}
                onMouseEnter={e=>{if(!isActive(link.to)){e.currentTarget.style.color="var(--text)";e.currentTarget.style.background="var(--hover-bg)";}}}
                onMouseLeave={e=>{if(!isActive(link.to)){e.currentTarget.style.color="var(--text-dim)";e.currentTarget.style.background="transparent";}}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {/* Search — hidden on mobile */}
            <div style={{ display:"none" }} className="md-search">
              <SearchBox value={searchQuery} onChange={onSearchChange} />
            </div>

            {/* Mobile search toggle */}
            <button onClick={()=>setMobileSearch(!mobileSearch)}
              style={{ width:34, height:34, borderRadius:"50%", border:"1px solid var(--border)", background:"var(--surface-1)", color:"var(--text-muted)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
              className="sm-only"
            >
              <CatIcon name="search" size={13} color="var(--text-muted)" />
            </button>

            {/* Season dropdown */}
            <div style={{ position:"relative" }} ref={dropRef}>
              <button onClick={()=>setDropOpen(!dropOpen)}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:999, border:`1px solid ${dropOpen?"var(--maroon)":"var(--border)"}`, background:dropOpen?"rgba(141,16,22,0.15)":"var(--surface-1)", color:dropOpen?"var(--maroon)":"var(--text-dim)", fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s" }}
              >
                <span style={{ display:"none" }} className="sm-inline">பருவம்</span>
                <span style={{ background:dropOpen?"rgba(141,16,22,0.3)":"rgba(141,16,22,0.18)", color:dropOpen?"white":"var(--maroon)", borderRadius:999, padding:"1px 6px", fontSize:10, fontWeight:700 }}>{seasons.length}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform:dropOpen?"rotate(180deg)":"none", transition:"0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>

              {dropOpen && (
                <div style={{ position:"absolute", right:0, top:"calc(100% + 8px)", width:280, borderRadius:16, background:"var(--surface-2)", border:"1px solid var(--border)", boxShadow:"0 20px 60px rgba(0,0,0,0.6)", zIndex:60, maxHeight:380, overflowY:"auto", animation:"slideDown 0.2s ease" }}>
                  <div style={{ padding:"10px 16px 8px", borderBottom:"1px solid var(--border)" }}>
                    <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase" }}>பருவம் தேர்வு</div>
                  </div>
                  {seasons.map(s => (
                    <button key={s.num} onClick={()=>{ onSeasonSelect(s.num); setDropOpen(false); }}
                      style={{ width:"100%", textAlign:"left", padding:"10px 16px", display:"flex", alignItems:"center", gap:12, background:"transparent", border:"none", cursor:"pointer", transition:"background 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.background="var(--surface-3)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    >
                      <span style={{ fontFamily:"'Teko'", fontSize:26, fontWeight:700, color:"var(--maroon)", minWidth:32, lineHeight:1 }}>{String(s.num).padStart(2,"0")}</span>
                      <div>
                        <div style={{ fontFamily:"'Teko'", fontSize:15, fontWeight:600, color:"var(--text)", lineHeight:1.2 }}>{s.label}</div>
                        <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.period}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* வரைபடம் CTA — desktop only */}
            <Link to="/map"
              style={{ display:"none", alignItems:"center", gap:6, padding:"6px 16px", background:"var(--maroon)", borderRadius:999, color:"white", fontFamily:"'Teko'", fontSize:16, fontWeight:700, letterSpacing:"0.04em", textDecoration:"none", boxShadow:"0 4px 20px rgba(141,16,22,0.5)", transition:"all 0.2s", lineHeight:1, whiteSpace:"nowrap" }}
              className="lg-mapbtn"
              onMouseEnter={e=>{e.currentTarget.style.background="#a01820";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--maroon)";e.currentTarget.style.transform="none";}}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>
              வரைபடம்
            </Link>

            {/* Event count pill */}
            <div style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", background:"var(--surface-1)", border:"1px solid var(--border)", borderRadius:999 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--gold)", display:"inline-block" }}/>
              <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-muted)" }}>{totalEvents}</span>
            </div>

            {/* Theme Toggle Button */}
            <button onClick={toggleTheme}
              style={{ width:34, height:34, borderRadius:"50%", border:"1px solid var(--border)", background:"var(--surface-1)", color:"var(--text-muted)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
              title={theme === "light" ? "இருண்ட தீம்" : "ஒளி தீம்"}
              onMouseEnter={e=>{ e.currentTarget.style.color="var(--maroon)"; e.currentTarget.style.borderColor="var(--maroon)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="var(--text-muted)"; e.currentTarget.style.borderColor="var(--border)"; }}
            >
              {theme === "light" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button onClick={()=>setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ width:36, height:36, borderRadius:8, border:"1px solid var(--border)", background:mobileOpen?"rgba(141,16,22,0.2)":"var(--surface-1)", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, padding:8, transition:"all 0.2s" }}
              className="lg-hide"
            >
              <span style={{ width:18, height:2, background:mobileOpen?"var(--maroon)":"var(--text-dim)", borderRadius:2, transform:mobileOpen?"rotate(45deg) translateY(6px)":"none", transition:"0.25s", display:"block" }}/>
              <span style={{ width:18, height:2, background:mobileOpen?"var(--maroon)":"var(--text-dim)", borderRadius:2, opacity:mobileOpen?0:1, transition:"0.25s", display:"block" }}/>
              <span style={{ width:18, height:2, background:mobileOpen?"var(--maroon)":"var(--text-dim)", borderRadius:2, transform:mobileOpen?"rotate(-45deg) translateY(-6px)":"none", transition:"0.25s", display:"block" }}/>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearch && (
          <div style={{ padding:"0 16px 12px", animation:"slideDown 0.2s ease" }}>
            <SearchBox value={searchQuery} onChange={onSearchChange} />
          </div>
        )}

        <style>{`
          @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
          @keyframes slideIn  { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
          @media(min-width:1024px){
            .lg-nav  { display:flex!important; align-items:center; gap:2px; }
            .lg-mapbtn { display:flex!important; }
            .lg-hide { display:none!important; }
          }
          @media(min-width:768px){
            .md-search { display:block!important; }
            .sm-only   { display:none!important; }
          }
          @media(min-width:640px){
            .sm-inline { display:inline!important; }
          }
        `}</style>
      </header>

      {/* ── Mobile full-screen nav drawer ── */}
      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:45, display:"flex" }}>
          {/* Backdrop */}
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.7)" }} onClick={()=>setMobileOpen(false)} />

          {/* Drawer */}
          <div style={{ position:"relative", marginLeft:"auto", width:260, height:"100%", background:"var(--surface-2)", borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column", paddingTop:80, animation:"slideIn 0.25s ease" }}>
            {/* Nav links */}
            <nav style={{ padding:"8px 16px", display:"flex", flexDirection:"column", gap:2 }}>
              {NAV.map(link => (
                <Link key={link.to} to={link.to}
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:12, background:isActive(link.to)?"rgba(141,16,22,0.15)":"transparent", border:isActive(link.to)?"1px solid rgba(141,16,22,0.3)":"1px solid transparent", color:isActive(link.to)?"white":"var(--text-muted)", textDecoration:"none", fontFamily:"'Teko'", fontSize:22, fontWeight:700, letterSpacing:"0.04em", transition:"all 0.2s" }}
                >
                  <span style={{ fontSize:18 }}>{link.icon}</span>
                  <div>
                    <div>{link.label}</div>
                    <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--text-dim)" }}>{link.en}</div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Season list in drawer */}
            <div style={{ margin:"16px", borderTop:"1px solid var(--border)", paddingTop:16, flex:1, overflowY:"auto" }}>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"var(--text-dim)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:8 }}>பருவங்கள்</div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                {seasons.map(s => (
                  <Link key={s.num} to={`/season/${s.num}`}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, textDecoration:"none", transition:"background 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--surface-3)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                  >
                    <span style={{ fontFamily:"'Teko'", fontSize:20, fontWeight:700, color:"var(--maroon)", minWidth:28, lineHeight:1 }}>{String(s.num).padStart(2,"0")}</span>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontFamily:"'Teko'", fontSize:13, color:"var(--text)", lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.title}</div>
                      <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.period}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer in drawer */}
            <div style={{ padding:16, borderTop:"1px solid var(--border)", textAlign:"center" }}>
              <a href="https://www.arukz.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Instrument Sans'", fontSize:9, fontWeight:800, color:"var(--maroon)", textTransform:"uppercase", letterSpacing:"0.15em", textDecoration:"none" }}>ARUKZ DIGITAL</a>
              <div style={{ fontFamily:"'Instrument Sans'", fontSize:8, color:"var(--text-dim)", marginTop:2 }}>{totalEvents} events · {seasons.length} seasons</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
