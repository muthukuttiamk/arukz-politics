/** HomePage — Hero section + intro only */
import { useRef } from "react";
import Hero from "../components/hero/Hero";
import NewsTicker from "../components/layout/NewsTicker";

export default function HomePage({ seasons, events }) {
  const timelineRef = useRef(null);
  const scrollToTimeline = () =>
    document.getElementById("timeline-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <NewsTicker />
      <Hero onStart={scrollToTimeline} seasons={seasons} totalEvents={events.length} />
    </>
  );
}
