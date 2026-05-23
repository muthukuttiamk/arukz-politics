/**
 * Hero — Full-screen cinematic opening section.
 *
 * Features:
 *  - Background image (public/hero-bg.png) with dark gradient overlay
 *  - Animated title: மர்ம (white) + அரசியல் (gold gradient)
 *  - VERIFIED ARCHIVE badge
 *  - Animated stats dashboard (HeroStats)
 *  - Category pills preview
 *  - Dual CTAs: "ஆவணத்தை ஆரம்பி" + "EXPLORE ARCHIVE"
 *  - Audience row
 *  - Scroll indicator
 *
 * Props:
 *   onStart      {function}   — scroll to timeline
 *   seasons      {Array}
 *   totalEvents  {number}
 */
import { motion } from "framer-motion";
import config from "../../config";
import HeroStats from "./HeroStats";
import AudienceRow from "./AudienceRow";
import Button from "../ui/Button";
import EvidenceSeal from "../ui/EvidenceSeal";

/* ── Framer Motion variants ─────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero({ onStart, seasons, totalEvents }) {
  const partyKeys = Object.keys(config.parties).filter((k) => k !== "unknown");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        paddingTop: "calc(100px + 1rem)",
        paddingBottom: "4rem",
        /* Background: documentary image + maroon gradient overlay */
        background: `
          linear-gradient(
            180deg,
            rgba(4,2,4,0.90) 0%,
            rgba(141,16,22,0.65) 40%,
            rgba(8,5,8,0.97) 100%
          ),
          url('/hero-bg.png') center center / cover no-repeat
        `,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: "linear-gradient(90deg, #5c1a1b, #8d1016, #ffca00)" }}
      />

      {/* Left/right vertical labels — visible on XL screens only */}
      {["Tamil Nadu Political Archive", "2015 — 2026"].map((text, i) => (
        <div
          key={i}
          className="hidden xl:flex absolute flex-col items-center gap-2"
          style={{ [i === 0 ? "left" : "right"]: 24, top: "50%", transform: "translateY(-50%)" }}
        >
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))" }} />
          <span
            style={{
              fontFamily: "'Teko', sans-serif",
              fontSize: 9,
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: i === 0 ? "rotate(180deg)" : "none",
            }}
          >
            {text}
          </span>
          <div className="w-px h-16" style={{ background: "linear-gradient(to top, transparent, rgba(255,255,255,0.2))" }} />
        </div>
      ))}

      {/* ── Main content ────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Evidence stamp + seal */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
          <EvidenceSeal light size={52} />
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffca00] animate-pulse" />
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              VERIFIED DOCUMENTARY ARCHIVE
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={scaleIn} className="mb-3">
          <h1
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(5rem, 16vw, 12rem)",
              lineHeight: 0.95,
              color: "white",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            {config.title.split(" ")[0]}
          </h1>
          <h1
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(5rem, 16vw, 12rem)",
              lineHeight: 0.95,
              background: "linear-gradient(135deg, #ffca00 0%, #ffe082 50%, #c8a000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 24px rgba(255,202,0,0.45))",
              marginTop: "-0.1em",
            }}
          >
            {config.title.split(" ")[1]}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-28" style={{ background: "rgba(255,255,255,0.2)" }} />
          <span
            style={{
              fontFamily: "'Teko', sans-serif",
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              letterSpacing: "0.5em",
              fontWeight: 400,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
            }}
          >
            {config.subtitle}
          </span>
          <div className="h-px flex-1 max-w-28" style={{ background: "rgba(255,255,255,0.2)" }} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            lineHeight: 2,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 600,
            margin: "0 auto 2.5rem",
          }}
        >
          {totalEvents} முக்கிய நிகழ்வுகளின் தொகுப்பு — தேர்தல்கள், கூட்டணிகள், நெருக்கடிகள்,
          திருப்புமுனைகள் — 12 பருவங்களில் 11 ஆண்டு{" "}
          <span style={{ fontWeight: 700, color: "#ffca00" }}>அரசியல் வரலாற்றின் முழு ஆவணம்.</span>
        </motion.p>

        {/* Stats */}
        <motion.div variants={fadeUp}>
          <HeroStats seasons={seasons} totalEvents={totalEvents} />
        </motion.div>

        {/* Party preview pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-8">
          {partyKeys.map((k) => {
            const p = config.parties[k];
            return (
              <span
                key={k}
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  background: `${p.color}20`,
                  border: `1px solid ${p.color}50`,
                  color: p.color,
                }}
              >
                {p.en}
              </span>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" onClick={onStart}>
            ஆவணத்தை ஆரம்பி
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          <Button variant="accent" onClick={onStart}>
            📋 EXPLORE ARCHIVE
          </Button>
        </motion.div>

        {/* Audience tags */}
        <motion.div variants={fadeUp}>
          <AudienceRow />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ animation: "heroFloat 2.5s ease-in-out infinite" }}
      >
        <span
          style={{
            fontFamily: "'Instrument Sans'",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          SCROLL
        </span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
