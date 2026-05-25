/** TimelinePage — FilterBar + full season timeline */
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterBar   from "../components/filters/FilterBar";
import Timeline    from "../components/timeline/Timeline";
import TreeExplorer from "../components/treemap/TreeExplorer";

export default function TimelinePage({
  events, seasons, onEventClick,
  yearFilter, partyFilter, searchQuery,
  onYearChange, onPartyChange, onSearchChange,
  onClear, counts,
}) {
  const location = useLocation();
  const timelineRef = useRef(null);

  /* Scroll to season anchor after navigation */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior:"smooth", block:"start" }), 300);
    }
  }, [location.hash]);

  return (
    <div style={{ paddingTop: 90 }}>
      {/* Explorer / accordion nav */}
      <TreeExplorer allEvents={events} allSeasons={seasons} onEventClick={onEventClick} />

      {/* Filter bar */}
      <div id="timeline-section" ref={timelineRef}>
        <FilterBar
          yearFilter={yearFilter} partyFilter={partyFilter}
          onYearChange={onYearChange} onPartyChange={onPartyChange}
          onClear={onClear} counts={counts}
        />
        <Timeline
          yearFilter={yearFilter} partyFilter={partyFilter}
          searchQuery={searchQuery}
          allEvents={events} allSeasons={seasons}
          onCardClick={onEventClick}
        />
      </div>
    </div>
  );
}
