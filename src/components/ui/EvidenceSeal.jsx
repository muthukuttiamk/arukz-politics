/**
 * EvidenceSeal — Circular "VERIFIED ARCHIVE" stamp
 *
 * Props:
 *   light  {boolean}  — if true, uses white/gold on dark backgrounds
 *   size   {number}   — diameter in px (default 64)
 */
export default function EvidenceSeal({ light = false, size = 64 }) {
  const border = light
    ? "rgba(255,202,0,0.4)"
    : "rgba(141,16,22,0.3)";
  const color = light
    ? "rgba(255,202,0,0.7)"
    : "rgba(141,16,22,0.5)";

  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: "50%",
        border: `2px dashed ${border}`,
        color,
        fontSize: Math.floor(size / 9),
        fontFamily: "'Instrument Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.35,
        textAlign: "center",
        flexShrink: 0,
      }}
    >
      <span>VERIFIED</span>
      <span>ARCHIVE</span>
      <span style={{ fontSize: size / 6 }}>✦</span>
    </div>
  );
}
