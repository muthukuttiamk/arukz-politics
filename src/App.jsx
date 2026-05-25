/**
 * App — Root with React Router v6 multi-page routing.
 *
 * Routes:
 *  /            → HomePage    (Hero + ticker only)
 *  /timeline    → TimelinePage (FilterBar + full timeline)
 *  /evidence    → EvidencePage (BJP Narrative + BigResult)
 *  /map         → MapPage     (Full-screen D3 MindMap)
 *  /season/:num → SeasonPage  (single season deep-dive)
 *
 * Shared chrome (Header, Footer, ProgressBar, IncidentDrawer)
 * lives here and wraps all routes.
 */
import { useRef, useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ── Data ────────────────────────────────────────────── */
import { events as allEvents, seasons as allSeasons } from "./data";

/* ── Layout ──────────────────────────────────────────── */
import ProgressBar from "./components/layout/ProgressBar";
import NewsTicker  from "./components/layout/NewsTicker";
import Header      from "./components/layout/Header";
import Footer      from "./components/layout/Footer";

/* ── Drawer ──────────────────────────────────────────── */
import IncidentDrawer from "./components/modal/IncidentDrawer";

/* ── Pages ───────────────────────────────────────────── */
import HomePage    from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import EvidencePage from "./pages/EvidencePage";
import MapPage      from "./pages/MapPage";
import SeasonPage   from "./pages/SeasonPage";

/* ── Page transition ─────────────────────────────────── */
const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

export default function App() {
  const navigate = useNavigate();

  /* ── Drawer state ─────────────────────────────────── */
  const [drawerEvent, setDrawerEvent] = useState(null);

  /* ── Filter state (shared, TimelinePage reads via props) */
  const [yearFilter,  setYearFilter]  = useState(null);
  const [partyFilter, setPartyFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Scroll helpers ─────────────────────────────────── */
  const scrollToSeason = (num) => {
    // If not on timeline page, navigate there first
    navigate("/timeline");
    setTimeout(() =>
      document.getElementById(`season-${num}`)?.scrollIntoView({ behavior:"smooth", block:"start" }), 400);
  };

  const clearFilters = () => { setYearFilter(null); setPartyFilter(null); };

  /* ── Event count breakdown ───────────────────────────── */
  const counts = useMemo(() => {
    const year = {}, party = {};
    allEvents.forEach(e => {
      if (e.year) year[e.year] = (year[e.year] || 0) + 1;
      (e.parties || []).forEach(p => { party[p] = (party[p] || 0) + 1; });
    });
    return { year, party };
  }, []);

  /* ── Shared props ─────────────────────────────────────── */
  const sharedProps = {
    events: allEvents,
    seasons: allSeasons,
    onEventClick: setDrawerEvent,
  };

  const filterProps = {
    yearFilter, partyFilter, searchQuery,
    onYearChange: setYearFilter,
    onPartyChange: setPartyFilter,
    onSearchChange: setSearchQuery,
    onClear: clearFilters,
    counts,
  };

  return (
    <div className="relative min-h-screen" style={{ background:"var(--bg)" }}>

      {/* ── Fixed chrome ─────────────────────────────── */}
      <ProgressBar />
      <NewsTicker />
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMindmap={() => navigate("/map")}
        onSeasonSelect={scrollToSeason}
        seasons={allSeasons}
        totalEvents={allEvents.length}
      />

      {/* ── Routed pages ─────────────────────────────── */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <HomePage {...sharedProps} />
            </PageWrapper>
          }/>
          <Route path="/timeline" element={
            <PageWrapper>
              <TimelinePage {...sharedProps} {...filterProps} />
            </PageWrapper>
          }/>
          <Route path="/evidence" element={
            <PageWrapper>
              <EvidencePage {...sharedProps} />
            </PageWrapper>
          }/>
          <Route path="/map" element={
            <PageWrapper>
              <MapPage {...sharedProps} />
            </PageWrapper>
          }/>
          <Route path="/season/:num" element={
            <PageWrapper>
              <SeasonPage {...sharedProps} />
            </PageWrapper>
          }/>
          {/* Fallback */}
          <Route path="*" element={
            <PageWrapper>
              <HomePage {...sharedProps} />
            </PageWrapper>
          }/>
        </Routes>
      </AnimatePresence>

      <Footer totalEvents={allEvents.length} seasons={allSeasons} />

      {/* ── Slide-over evidence drawer ─────────────── */}
      <AnimatePresence>
        {drawerEvent && (
          <IncidentDrawer
            event={drawerEvent}
            onClose={() => setDrawerEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
