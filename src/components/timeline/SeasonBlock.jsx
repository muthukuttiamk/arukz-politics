/** SeasonBlock — dark card body wrapping SeasonHeader + EventCard grid */
import { motion } from "framer-motion";
import SeasonHeader from "./SeasonHeader";
import EventCard from "./EventCard";

export default function SeasonBlock({ season, events, query, onCardClick, index }) {
  return (
    <motion.div
      id={`season-${season.num}`}
      className="scroll-mt-36"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25,0.46,0.45,0.94] }}
      style={{ borderRadius:16, overflow:"hidden", border:"1px solid var(--border)", boxShadow:"0 4px 24px rgba(0,0,0,0.35)" }}
    >
      <SeasonHeader season={season} eventCount={events.length} />

      <div style={{ background:"var(--surface-0)", padding:"20px 20px 24px" }}>
        {/* Flow connector */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ border:"2px solid var(--maroon-dim)", background:"var(--surface-0)" }}/>
          <div className="flex-1 border-t border-dashed" style={{ borderColor:"var(--border)" }}/>
          <span style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.16em", textTransform:"uppercase", flexShrink:0 }}>
            {events.length} நிகழ்வுகள்
          </span>
          <div className="flex-1 border-t border-dashed" style={{ borderColor:"var(--border)" }}/>
        </div>

        {/* 3-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} query={query} onClick={() => onCardClick(event)} />
          ))}
        </div>

        {/* Season footer */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop:"1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background:"var(--maroon-dim)" }}/>
            <span style={{ fontFamily:"'Instrument Sans'", fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em" }}>
              {season.period || "—"}
            </span>
          </div>
          <span style={{ fontFamily:"'Instrument Sans'", fontSize:11, color:"var(--text-dim)" }}>
            {events.length} incidents documented
          </span>
        </div>
      </div>
    </motion.div>
  );
}
