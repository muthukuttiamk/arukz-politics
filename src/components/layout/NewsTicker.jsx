/**
 * NewsTicker — Animated maroon headline banner.
 *
 * Reads ticker items from config.tickerItems.
 * Duplicates items for seamless loop. Pauses on hover.
 */
import config from "../../config";

export default function NewsTicker() {
  const items = [...config.tickerItems, ...config.tickerItems];

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{ background: "#5c1a1b", padding: "6px 0", borderBottom: "1px solid rgba(141,16,22,0.6)" }}
    >
      <div
        style={{ display: "inline-block", animation: "tickerScroll 55s linear infinite" }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>
            <span style={{ color: "#ffca00", margin: "0 20px", fontWeight: 900 }}>◆</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
