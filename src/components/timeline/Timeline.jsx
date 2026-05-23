/**
 * Timeline — dark orchestrator with year + party filter logic.
 */
import { motion, AnimatePresence } from "framer-motion";
import SeasonBlock from "./SeasonBlock";
import EmptyState from "./EmptyState";
import QuickNav from "../layout/QuickNav";

export default function Timeline({ yearFilter, partyFilter, searchQuery, allEvents, allSeasons, onCardClick }) {

  /* ── Filter logic ───────────────────────────────────── */
  let filtered = allEvents;

  if (yearFilter)   filtered = filtered.filter((e) => e.year === yearFilter);
  if (partyFilter)  filtered = filtered.filter((e) => (e.parties || []).includes(partyFilter));
  if (searchQuery?.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filtered = filtered.filter((e) =>
      e.title.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q)
    );
  }

  /* ── Group by season ─────────────────────────────────── */
  const grouped = {};
  filtered.forEach((e) => {
    if (!grouped[e.seasonNum]) grouped[e.seasonNum] = [];
    grouped[e.seasonNum].push(e);
  });
  const seasonNums = Object.keys(grouped).map(Number).sort((a, b) => a - b);

  const getSeasonObj = (num) =>
    allSeasons.find((s) => s.num === num) || { num, label:`பருவம் ${String(num).padStart(2,"0")}`, period:"", title:"" };

  return (
    <>
      {seasonNums.length > 0 && <QuickNav seasonNums={seasonNums} />}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Result summary */}
        <motion.div
          key={`${yearFilter}-${partyFilter}-${searchQuery}`}
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="flex-1 h-px" style={{ background:"linear-gradient(to right, rgba(141,16,22,0.5), transparent)" }}/>
          <span style={{ fontFamily:"'Instrument Sans'", fontSize:11, fontWeight:700, color:"var(--text-dim)", letterSpacing:"0.14em", textTransform:"uppercase" }}>
            {filtered.length} நிகழ்வுகள் · {seasonNums.length} பருவங்கள்
          </span>
          <div className="flex-1 h-px" style={{ background:"linear-gradient(to left, rgba(141,16,22,0.5), transparent)" }}/>
        </motion.div>

        {filtered.length === 0 && <EmptyState query={searchQuery} filter={partyFilter || yearFilter} />}

        <div className="flex flex-col gap-10">
          {seasonNums.map((num, idx) => (
            <SeasonBlock
              key={num}
              season={getSeasonObj(num)}
              events={grouped[num]}
              query={searchQuery}
              onCardClick={onCardClick}
              index={idx}
            />
          ))}
        </div>

        {filtered.length > 0 && (
          <motion.div className="text-center mt-16 pb-4" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-20 h-px" style={{ background:"linear-gradient(to right, transparent, rgba(141,16,22,0.5), transparent)" }}/>
              <span style={{ fontFamily:"'Teko'", fontSize:18, fontWeight:600, color:"var(--text-dim)", letterSpacing:"0.3em", textTransform:"uppercase" }}>
                · End of Archive ·
              </span>
              <p style={{ fontFamily:"'Noto Sans Tamil'", fontSize:12, color:"var(--text-dim)" }}>
                {filtered.length} நிகழ்வுகள் · {seasonNums.length} பருவங்கள் · 2015–2026
              </p>
              <div className="w-20 h-px" style={{ background:"linear-gradient(to right, transparent, rgba(141,16,22,0.5), transparent)" }}/>
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
}
