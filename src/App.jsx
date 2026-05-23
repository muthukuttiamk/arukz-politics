/**
 * App — Root component.
 *
 * Sections (top → bottom):
 *  1. ProgressBar          — reading progress bar (fixed top)
 *  2. NewsTicker           — scrolling headline banner
 *  3. Header               — sticky dark glass nav
 *  4. Hero                 — cinematic opening
 *  5. BJPNarrative         — "மத்திய அரசின் தலையீடு" evidence wall
 *  6. TreeExplorer         — interactive political tree (Explorer + Full Tree modes)
 *  7. FilterBar            — Year tabs + Party pills
 *  8. Timeline             — event card grid
 *  9. Footer               — dark 3-column footer
 *
 * Modal pattern:
 *  Uses IncidentDrawer (slide-over right panel) instead of a centered popup.
 *  Any component that wants to show an event detail calls onEventClick(event).
 *
 * To reuse for a new documentary:
 *  1. Edit src/config.js
 *  2. Edit src/data.js
 *  Done — all components adapt automatically.
 */
import { useRef, useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";

/* ── Data ────────────────────────────────────────────── */
import { events, seasons } from "./data";

/* ── Layout ──────────────────────────────────────────── */
import ProgressBar from "./components/layout/ProgressBar";
import NewsTicker  from "./components/layout/NewsTicker";
import Header      from "./components/layout/Header";
import Footer      from "./components/layout/Footer";

/* ── Sections ────────────────────────────────────────── */
import Hero         from "./components/hero/Hero";
import BJPNarrative from "./components/narrative/BJPNarrative";
import TreeExplorer  from "./components/treemap/TreeExplorer";
import MindMap      from "./components/treemap/MindMap";
import MindMapPage  from "./components/treemap/MindMapPage";

/* ── Filter + Timeline ───────────────────────────────── */
import FilterBar from "./components/filters/FilterBar";
import Timeline  from "./components/timeline/Timeline";

/* ── Slide-over drawer (replaces centered modal) ─────── */
import IncidentDrawer from "./components/modal/IncidentDrawer";

export default function App() {
  /* ── Filter state ──────────────────────────────────── */
  const [yearFilter,  setYearFilter]  = useState(null);
  const [partyFilter, setPartyFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Drawer state ──────────────────────────────────── */
  const [drawerEvent,    setDrawerEvent]    = useState(null);
  const [showMindmap,    setShowMindmap]    = useState(false);

  const timelineRef = useRef(null);

  /* ── Filter counts ─────────────────────────────────── */
  const counts = useMemo(() => {
    const year  = {};
    const party = {};
    events.forEach(e => {
      if (e.year) year[e.year] = (year[e.year] || 0) + 1;
      (e.parties || []).forEach(p => { party[p] = (party[p] || 0) + 1; });
    });
    return { year, party };
  }, []);

  /* ── Scroll helpers ────────────────────────────────── */
  const scrollToTimeline = () =>
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToSeason = (num) =>
    document.getElementById(`season-${num}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const clearFilters = () => { setYearFilter(null); setPartyFilter(null); };

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)" }}>

      {/* ── Fixed chrome ─────────────────────────────── */}
      <ProgressBar />
      <NewsTicker />

      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMindmap={() => setShowMindmap(true)}
        onSeasonSelect={scrollToSeason}
        seasons={seasons}
        totalEvents={events.length}
      />

      {/* ── Page sections ────────────────────────────── */}
      <Hero onStart={scrollToTimeline} seasons={seasons} totalEvents={events.length} />

      <BJPNarrative events={events} />

      <TreeExplorer
        allEvents={events}
        allSeasons={seasons}
        onEventClick={setDrawerEvent}
      />

      <MindMap
        allEvents={events}
        allSeasons={seasons}
        onEventClick={setDrawerEvent}
      />

      <div ref={timelineRef}>
        <FilterBar
          yearFilter={yearFilter}
          partyFilter={partyFilter}
          onYearChange={setYearFilter}
          onPartyChange={setPartyFilter}
          onClear={clearFilters}
          counts={counts}
        />
        <Timeline
          yearFilter={yearFilter}
          partyFilter={partyFilter}
          searchQuery={searchQuery}
          allEvents={events}
          allSeasons={seasons}
          onCardClick={setDrawerEvent}
        />
      </div>

      <Footer totalEvents={events.length} seasons={seasons} />

      {/* ── Full-page Mindmap overlay ─────────────────── */}
      <AnimatePresence>
        {showMindmap && (
          <MindMapPage
            allEvents={events}
            allSeasons={seasons}
            onClose={() => setShowMindmap(false)}
            onEventClick={(ev) => { setShowMindmap(false); setDrawerEvent(ev); }}
          />
        )}
      </AnimatePresence>

      {/* ── Slide-over evidence drawer ────────────────── */}
      <AnimatePresence>
        {drawerEvent && (
          <IncidentDrawer
            key={drawerEvent.id}
            event={drawerEvent}
            onClose={() => setDrawerEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
