/**
 * EmptyState — Shown when no events match the current year/party/search filter.
 *
 * Props:
 *   query   {string}         — current search query
 *   filter  {string|number}  — year number OR party key
 */
import config from "../../config";

export default function EmptyState({ query, filter }) {
  const isYear  = typeof filter === "number";
  const party   = !isYear && config.parties[filter];

  return (
    <div className="text-center py-24 px-8" style={{ animation:"fadeUp 0.5s ease forwards" }}>
      {/* Icon */}
      <div style={{ fontSize:48, marginBottom:16, opacity:0.4 }}>
        {query ? "🔍" : isYear ? "📅" : "🏛️"}
      </div>

      {/* Heading */}
      <h3 style={{ fontFamily:"'Teko'", fontSize:28, fontWeight:700, color:"var(--maroon)", marginBottom:8 }}>
        {query
          ? `"${query}" கிடைக்கவில்லை`
          : isYear
            ? `${filter} ஆண்டில் நிகழ்வுகள் இல்லை`
            : party
              ? `${party.en} நிகழ்வுகள் இல்லை`
              : "நிகழ்வுகள் இல்லை"}
      </h3>

      {/* Sub-text */}
      <p style={{ fontFamily:"'Noto Sans Tamil'", fontSize:14, color:"var(--text-dim)", lineHeight:2 }}>
        {query
          ? "வேறொரு வார்த்தை தேட முயற்சிக்கவும்."
          : "வேறொரு வடிகட்டியைத் தேர்ந்தெடுக்கவும்."}
      </p>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
