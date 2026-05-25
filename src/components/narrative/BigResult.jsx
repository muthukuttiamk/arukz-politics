/**
 * BigResult — மாபெரும் பகுப்பாய்வு
 * The explosive political chess analysis section.
 *
 * Visually large, cinematic, thrilling — shows the full BJP-TVK
 * chess game conclusion as the documentary's climax.
 */
import { useState } from "react";
import { motion } from "framer-motion";

const PHASES = [
  {
    num: "01",
    color: "#ff6600",
    party: "பாஜக",
    icon: "♟",
    title: "பாஜக-வின் மறைமுகத் திட்டம்",
    subtitle: "THE BJP MASTERPLAN",
    body: "பாஜக-வின் ஒரே இலக்கு: தமிழ்நாட்டில் 59 ஆண்டுகாலத் திராவிடக் கட்சிகளின் (திமுக, அதிமுக) பிடியை நிரந்தரமாக ஒழிப்பது. தாங்கள் நேரடியாக வந்து தமிழ்நாட்டில் ஆட்சியைப் பிடிக்க முடியாது என்பது தெரியும். எனவே, விஜய்யின் மக்கள் செல்வாக்கை ஒரு \"Proxy\" ஆயுதமாகப் பயன்படுத்தினர்.",
    points: [
      "மத்திய ஏஜென்சிகள் (ED, IT, CBI) மூலம் திமுக, அதிமுக தலைவர்களை முடக்கல்",
      "விஜய்க்கு சட்டதடை நீக்கி பாதையை உருவாக்கிக் கொடுத்தல்",
      "அதிமுக-வை உடைத்து வாக்கு வங்கியை தவெக-விடம் தள்ளுதல்",
      "24+ ஐடி ரெய்டுகள் — திராவிடக் கட்சிகளை பலவீனப்படுத்துதல்",
    ],
  },
  {
    num: "02",
    color: "#ffca00",
    party: "தவெக",
    icon: "♔",
    title: "தவெக செய்த 'டபுள் கேம்'",
    subtitle: "TVK OUTSMARTED BJP",
    body: "விஜய் மற்றும் அவரது ஆலோசகர்கள் பாஜக-வின் திட்டத்தைத் தங்களுக்குச் சாதகமாகப் பயன்படுத்திக் கொண்டனர். ஆனால், அவர்கள் பாஜக-வின் அடிமையாக மாறவில்லை — மாறாக, அதையே Checkmate-ஆக மாற்றினார்கள்!",
    points: [
      "பாஜக NDA கூட்டணியை உதாசீனப்படுத்தி மதச்சார்பற்ற அரசு அமைத்தல்",
      "திமுக கூட்டணியின் காங்கிரஸ், விசிக, IUML-ஐ தன் பக்கம் இழுத்தல்",
      "59 ஆண்டுகால திராவிட விதியை உடைத்து Power Sharing வழங்கல்",
      "சிறுபான்மையினர் + தலித் வாக்கு வங்கியை நிரந்தரமாகக் கைப்பற்றல்",
    ],
  },
  {
    num: "03",
    color: "#cc0000",
    party: "திமுக",
    icon: "♚",
    title: "திமுக கூட்டணி — முழு சிதைவு",
    subtitle: "DMK COALITION COLLAPSE",
    body: "8 ஆண்டுகாலம் வலுவாக இருந்த 'மதச்சார்பற்ற முற்போக்குக் கூட்டணி' (SPA) ஒரே மாதத்தில் சிதறியது. காங்கிரஸ், விசிக, IUML ஆகிய கட்சிகள் தவெக பக்கம் சென்றதால், திமுக தனிமையில் விட்டுவிடப்பட்டது.",
    points: [
      "காங்கிரஸ், விசிக, IUML — அனைத்தும் தவெக அமைச்சரவையில் இணைவு",
      "ஆ. ராசாவின் பகிரங்க கொந்தளிப்பு — கட்டுப்பாடு இழப்பு",
      "ஸ்டாலின் தலையீடு — விமர்சனங்களை நிறுத்திக் கொள்ளுமாறு கேட்டல்",
      "SPA கூட்டணி அதிகாரப்பூர்வமாக கலைந்தது",
    ],
  },
];

const VERDICT = {
  bjp: {
    color: "#ff6600",
    label: "பாஜக-வுக்கு கிடைத்தது",
    en: "BJP GOT:",
    points: [
      "திமுக, அதிமுக என இரண்டும் நிரந்தரமாக வீழ்ச்சி",
      "திராவிட கட்சிகள் மீண்டும் எழ முடியாத நிலை",
      "எதிர்காலத்தில் பிரதான எதிர்க்கட்சியாக வளர வாய்ப்பு",
    ],
    lost: "தவெக-வை கட்டுப்படுத்த முடியவில்லை — Plan Backfired!",
  },
  tvk: {
    color: "#ffca00",
    label: "தவெக-வுக்கு கிடைத்தது",
    en: "TVK GOT:",
    points: [
      "வலுவான மதச்சார்பற்ற கூட்டணி அரசு",
      "சிறுபான்மையினர் + தலித் வாக்கு வங்கி",
      "5 ஆண்டுகால ஸ்திரமான ஆட்சி — எந்த அச்சுறுத்தலும் இல்லை",
    ],
    won: "பாஜக-விற்கே Checkmate! ♔",
  },
};

export default function BigResult() {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <section style={{ background: "var(--bg)", padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
      {/* Dramatic background glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(141,16,22,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(141,16,22,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(141,16,22,0.04) 40px)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ position: "relative", zIndex: 1 }}>

        {/* ── SECTION HEADER ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <div style={{ fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 800, color: "var(--maroon)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>
            ♟ THE FINAL MOVE
          </div>
          <h2 style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(3rem,8vw,7rem)", color: "white", lineHeight: 0.88, marginBottom: 12 }}>
            மாபெரும்<br />
            <span style={{ color: "var(--gold)" }}>பகுப்பாய்வு</span>
          </h2>
          <p style={{ fontFamily: "'Instrument Sans'", fontSize: 13, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            BJP · TVK · ரகசிய அரசியல் · CHESS ENDGAME
          </p>
          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, var(--maroon))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--maroon)" }} />
            <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, var(--maroon))" }} />
          </div>
        </motion.div>

        {/* ── THESIS BOX ── */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ background: "linear-gradient(135deg, rgba(141,16,22,0.15) 0%, rgba(8,5,8,0.8) 100%)", border: "1px solid rgba(141,16,22,0.4)", borderRadius: 20, padding: "32px 40px", marginBottom: 48, textAlign: "center", boxShadow: "0 0 60px rgba(141,16,22,0.15)" }}
        >
          <div style={{ fontFamily: "'Teko'", fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 12 }}>
            "பாஜக தான் தவெக-வை உருவாக்கியது" —
            <span style={{ color: "var(--gold)" }}> உண்மைதான்!</span>
          </div>
          <p style={{ fontFamily: "'Noto Sans Tamil'", fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.9, color: "var(--text-muted)", maxWidth: 780, margin: "0 auto" }}>
            ஆனால் விஜய் அதையே <strong style={{ color: "var(--gold)" }}>Checkmate</strong>-ஆக மாற்றினார்!
            பாஜக தீட்டிய திட்டத்தை, விஜய் மிகச் சரியாகப் பயன்படுத்தி முதல்வராகிவிட்டார்.
            தற்போது அதே விஜய் காங்கிரஸ், விசிக-வுடன் இணைந்து
            <strong style={{ color: "#3498db" }}> பாஜக-விற்கே செக் வைத்துவிட்டார்!</strong>
          </p>
        </motion.div>

        {/* ── THREE PHASES ── */}
        <div className="big-result-phases" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem 1.5rem", marginBottom:48 }}>
          {PHASES.map((ph, i) => (
            <motion.div key={ph.num}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
              onClick={() => setOpenPhase(openPhase === i ? null : i)}
              style={{
                background: openPhase === i ? `${ph.color}12` : "var(--surface-1)",
                border: `1.5px solid ${openPhase === i ? ph.color : "var(--border)"}`,
                borderRadius: 16, padding: "28px 26px", cursor: "pointer",
                boxShadow: openPhase === i ? `0 8px 40px ${ph.color}30` : "0 2px 12px rgba(0,0,0,0.4)",
                transition: "all 0.35s",
              }}
            >
              {/* Phase header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 800, color: ph.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                    PHASE {ph.num} · {ph.party}
                  </div>
                  <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "white", lineHeight: 1 }}>
                    {ph.title}
                  </div>
                  <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: ph.color, letterSpacing: "0.15em", marginTop: 3 }}>
                    {ph.subtitle}
                  </div>
                </div>
                <span style={{ fontSize: 36, opacity: 0.7, userSelect: "none" }}>{ph.icon}</span>
              </div>

              {/* Body */}
              <p style={{ fontFamily: "'Noto Sans Tamil'", fontSize: 13, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 16 }}>
                {ph.body}
              </p>

              {/* Points (expand on click) */}
              {openPhase === i && (
                <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {ph.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Noto Sans Tamil'", fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: ph.color, marginTop: 8, flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </motion.ul>
              )}

              {/* Click hint */}
              <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 700, color: openPhase === i ? ph.color : "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 12 }}>
                {openPhase === i ? "▲ Collapse" : "▼ See details"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── VERDICT CARDS ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="big-result-verdict grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* BJP verdict */}
          <div style={{ background: "var(--surface-1)", border: `1.5px solid ${VERDICT.bjp.color}40`, borderRadius: 16, padding: "28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: VERDICT.bjp.color, display: "inline-block", boxShadow: `0 0 12px ${VERDICT.bjp.color}` }} />
              <div>
                <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 800, color: VERDICT.bjp.color, letterSpacing: "0.2em", textTransform: "uppercase" }}>BJP — இறுதி இலக்கு</div>
                <div style={{ fontFamily: "'Teko'", fontSize: 20, fontWeight: 700, color: "white" }}>{VERDICT.bjp.en}</div>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {VERDICT.bjp.points.map((p, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Noto Sans Tamil'", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: VERDICT.bjp.color, fontWeight: 900, marginTop: 1 }}>✓</span> {p}
                </li>
              ))}
            </ul>
            <div style={{ background: "rgba(255,102,0,0.08)", border: "1px solid rgba(255,102,0,0.25)", borderRadius: 10, padding: "10px 14px", fontFamily: "'Instrument Sans'", fontSize: 11, fontWeight: 700, color: "#ff6600", letterSpacing: "0.08em" }}>
              ⚠ {VERDICT.bjp.lost}
            </div>
          </div>

          {/* TVK verdict */}
          <div style={{ background: "linear-gradient(135deg, rgba(255,202,0,0.05), var(--surface-1))", border: `2px solid ${VERDICT.tvk.color}60`, borderRadius: 16, padding: "28px 26px", boxShadow: `0 8px 40px ${VERDICT.tvk.color}15` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: VERDICT.tvk.color, display: "inline-block", boxShadow: `0 0 16px ${VERDICT.tvk.color}` }} />
              <div>
                <div style={{ fontFamily: "'Instrument Sans'", fontSize: 9, fontWeight: 800, color: VERDICT.tvk.color, letterSpacing: "0.2em", textTransform: "uppercase" }}>TVK — இறுதி இலக்கு</div>
                <div style={{ fontFamily: "'Teko'", fontSize: 20, fontWeight: 700, color: "white" }}>{VERDICT.tvk.en}</div>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {VERDICT.tvk.points.map((p, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Noto Sans Tamil'", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  <span style={{ color: VERDICT.tvk.color, fontWeight: 900, marginTop: 1 }}>✓</span> {p}
                </li>
              ))}
            </ul>
            <div style={{ background: "rgba(255,202,0,0.08)", border: "1px solid rgba(255,202,0,0.3)", borderRadius: 10, padding: "10px 14px", fontFamily: "'Teko'", fontSize: 18, fontWeight: 700, color: VERDICT.tvk.color, letterSpacing: "0.04em" }}>
              {VERDICT.tvk.won}
            </div>
          </div>
        </motion.div>

        {/* ── FINAL CINEMATIC STATEMENT ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", padding: "48px 24px", background: "linear-gradient(135deg, rgba(141,16,22,0.08), rgba(8,5,8,0.6), rgba(255,202,0,0.05))", border: "1px solid rgba(141,16,22,0.3)", borderRadius: 20 }}
        >
          <div style={{ fontFamily: "'Teko'", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,3.5rem)", color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            இதுதான் தற்போதைய தமிழக அரசியலின்<br />
            <span style={{ color: "var(--gold)" }}>உச்சகட்ட த்ரில்லர்!</span>
          </div>
          <p style={{ fontFamily: "'Noto Sans Tamil'", fontSize: "clamp(14px,1.8vw,16px)", lineHeight: 2, color: "var(--text-muted)", maxWidth: 700, margin: "0 auto 24px" }}>
            சுருக்கமாகச் சொன்னால்: திராவிடக் கட்சிகளை அழிக்கப் பாஜக தீட்டிய திட்டத்தை,
            விஜய் மிகச் சரியாகப் பயன்படுத்தி முதல்வராகிவிட்டார். ஆனால், தற்போது அதே விஜய்
            காங்கிரஸ், விசிக-வுடன் இணைந்து ஒரு மாபெரும் மதச்சார்பற்ற கூட்டணியை உருவாக்கி,
            <strong style={{ color: "var(--maroon)" }}> பாஜக-விற்கே செக் வைத்துவிட்டார்!</strong>
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(141,16,22,0.5))" }} />
            <span style={{ fontFamily: "'Instrument Sans'", fontSize: 10, fontWeight: 800, color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              அரசியல் சதுரங்கம் · ARUKZ DIGITAL
            </span>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(141,16,22,0.5))" }} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
