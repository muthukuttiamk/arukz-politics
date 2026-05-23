/**
 * ============================================================
 *  DOCUMENTARY CONFIGURATION — "மர்ம அரசியல்"
 *
 *  Change ONLY this file to create a new documentary.
 *  All components read from this via imports.
 * ============================================================
 */

const config = {
  /* ── Identity ─────────────────────────────────────────── */
  title:       "மர்ம அரசியல்",
  titleEn:     "MURMA ARASIYAL",
  subtitle:    "Tamil Nadu Political Chronicle",
  tagline:     "ஒரு சினிமாட்டிக் அரசியல் ஆவணம்",
  taglineEn:   "A Cinematic Political Documentary",
  dateRange:   "2015 – 2026",
  archiveId:   "TN-POL",

  /* ── Color Palette — Dark Theme ────────────────────────── */
  colors: {
    bg:          "#080508",   // near-black
    surface0:    "#110a0b",   // deepest surface
    surface1:    "#1a0d0f",   // card bg
    surface2:    "#241215",   // hover
    surface3:    "#2e1819",   // lighter hover
    maroon:      "#8d1016",
    maroonHover: "#a01820",
    maroonDim:   "#5c1a1b",
    maroonDeep:  "#3d0c0e",
    gold:        "#ffca00",
    goldDim:     "#c8a000",
    text:        "#ede5e3",   // warm white
    textMuted:   "#a08890",
    textDim:     "#6a5558",
    border:      "#2d1a1c",
    borderLight: "#3d2425",
  },

  /* ── Political Parties ────────────────────────────────── */
  parties: {
    bjp:      { label: "பாஜக",      en: "BJP",      color: "#ff6600", bg: "rgba(255,102,0,0.15)" },
    dmk:      { label: "திமுக",     en: "DMK",      color: "#cc0000", bg: "rgba(204,0,0,0.12)"   },
    aiadmk:   { label: "அதிமுக",   en: "AIADMK",   color: "#006400", bg: "rgba(0,100,0,0.12)"   },
    tvk:      { label: "தவெக",      en: "TVK",      color: "#ffca00", bg: "rgba(255,202,0,0.12)" },
    it_dept:  { label: "ஐடி துறை", en: "IT Dept",  color: "#4a90d9", bg: "rgba(74,144,217,0.12)"},
    ed:       { label: "ஈடி",       en: "ED",       color: "#9b59b6", bg: "rgba(155,89,182,0.12)"},
    cbi:      { label: "சிபிஐ",     en: "CBI",      color: "#1abc9c", bg: "rgba(26,188,156,0.12)"},
    pmk:      { label: "பமக",       en: "PMK",      color: "#e67e22", bg: "rgba(230,126,34,0.12)"},
    congress: { label: "காங்கிரஸ்", en: "Congress", color: "#3498db", bg: "rgba(52,152,219,0.12)"},
    unknown:  { label: "பொது",      en: "General",  color: "#888",    bg: "rgba(136,136,136,0.1)"},
  },

  /* ── Categories (kept for backward compat) ────────────── */
  categories: {
    all:      { label: "அனைத்தும்",  en: "All",      icon: "all",      color: "#8d1016" },
    raid:     { label: "ரெய்டு",     en: "Raid",     icon: "raid",     color: "#c2400a" },
    election: { label: "தேர்தல்",    en: "Election", icon: "election", color: "#15803d" },
    oath:     { label: "பதவியேற்பு", en: "Oath",     icon: "oath",     color: "#1d4ed8" },
    crisis:   { label: "நெருக்கடி",  en: "Crisis",   icon: "crisis",   color: "#8d1016" },
    alliance: { label: "கூட்டணி",    en: "Alliance", icon: "alliance", color: "#6d28d9" },
    verdict:  { label: "தீர்ப்பு",   en: "Verdict",  icon: "verdict",  color: "#b45309" },
    protest:  { label: "போராட்டம்",  en: "Protest",  icon: "protest",  color: "#be185d" },
  },

  /* ── Years range (for filter bar) ─────────────────────── */
  yearRange: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],

  /* ── Audience targets ──────────────────────────────────── */
  audiences: [
    { icon: "news",   label: "செய்தி சேனல்கள்",  en: "News Channels" },
    { icon: "law",    label: "அதிகாரிகள்",        en: "Officials"     },
    { icon: "film",   label: "இயக்குனர்கள்",       en: "Directors"     },
    { icon: "govt",   label: "ஆட்சியர்கள்",        en: "Administrators"},
    { icon: "public", label: "பொது மக்கள்",        en: "Public"        },
  ],

  /* ── News ticker ───────────────────────────────────────── */
  tickerItems: [
    "130 ஆவணப்படுத்தப்பட்ட சம்பவங்கள் · 130 Documented Incidents",
    "12 பருவங்களில் 11 ஆண்டு அரசியல் வரலாறு",
    "மத்திய அரசின் தலையீடு · 24 ஐடி ரெய்டுகள் ஆவணப்படுத்தப்பட்டன",
    "BJP · DMK · AIADMK · TVK · அரசியல் சதுரங்கம்",
    "Official Evidence Archive · Verified Documentary",
  ],

  /* ── BJP / Central Govt Narrative ─────────────────────── */
  bjpNarrative: {
    title:    "மத்திய அரசின் தலையீடு",
    titleEn:  "CENTRAL GOVERNMENT INTERFERENCE",
    subtitle: "BJP & Central Agencies in Tamil Nadu Politics — Documented Evidence",
    stats: [
      { n: 24,  label: "IT ரெய்டுகள்",   en: "IT Raids",        party: "it_dept" },
      { n: 6,   label: "ED வழக்குகள்",   en: "ED Cases",        party: "ed"      },
      { n: 3,   label: "CBI விசாரணை",    en: "CBI Probes",      party: "cbi"     },
      { n: 11,  label: "ஆண்டுகள்",        en: "Years Documented", party: "bjp"     },
      { n: 9,   label: "தேர்தல் சுழல்கள்", en: "Election Cycles", party: "dmk"     },
    ],
    evidencePoints: [
      {
        year: 2015,
        title: "ஐடி ரெய்டு — விஜய்யை குறிவைத்தல்",
        desc:  "தேர்தலுக்கு முன் மத்திய ஐடி துறை நடிகர் விஜய் வீட்டில் சோதனை. மத்திய அரசின் நேரடி அழுத்தம் என்று விமர்சிக்கப்பட்டது.",
        agency: "it_dept", connected: "bjp",
      },
      {
        year: 2016,
        title: "CBDT ஆபரேஷன் — சேகர் ரெட்டி வீட்டில் மெகா ரெய்டு",
        desc:  "ஜெயலலிதா மரணத்திற்கு 3 நாட்களில் மத்திய ஐடி அதிகாரிகள் நடத்திய ரெய்டு. அதிமுக-பாஜக உறவை வலுப்படுத்தும் முயற்சி என கூறப்படுகிறது.",
        agency: "it_dept", connected: "bjp",
      },
      {
        year: 2017,
        title: "Operation Clean Money — சசிகலா குடும்பத்தை முடக்குதல்",
        desc:  "CBDT தலைமையிலான தேசிய அளவிலான ரெய்டு. சசிகலா நெட்வொர்க்கை தொடர்ந்து அரசியல் நிரந்தரமாக ஒதுக்க மத்திய அரசு திட்டமிட்டதாக ஆதாரங்கள் தெரிவிக்கின்றன.",
        agency: "it_dept", connected: "bjp",
      },
      {
        year: 2019,
        title: "ED வழக்கு — அதிமுகவுக்கு எதிரான பொருளாதார அழுத்தம்",
        desc:  "அதிமுக-பாஜக கூட்டணி உறுதியாகிய பின்னர் ED வழக்குகள் தொடர்ந்து மழுங்கடிக்கப்பட்டன. உறவு தகர்ந்தவுடன் வழக்குகள் மீண்டும் தீவிரமடைந்தன.",
        agency: "ed", connected: "bjp",
      },
      {
        year: 2020,
        title: "ஐடி ரெய்டு — விஜய் மீண்டும் குறிவைக்கப்படுகிறார்",
        desc:  "'மாஸ்டர்' படத்தில் கோடிக்கணக்கான ரூபாய் வரி ஏய்ப்பு என்று மத்திய ஐடி துறை குற்றம் சாட்டியது. TVK கட்சி தொடங்கும் அச்சுறுத்தல் பின்னணியில் இருந்தது என்று கூறப்படுகிறது.",
        agency: "it_dept", connected: "bjp",
      },
      {
        year: 2023,
        title: "செந்தில் பாலாஜி கைது — மத்திய ED நடவடிக்கை",
        desc:  "திமுக அமைச்சர் செந்தில் பாலாஜியை ED கைது செய்தது. மத்திய அரசின் ED-ஐ பயன்படுத்தி மாநில ஆட்சியை அச்சுறுத்துவது என்று கூறப்படுகிறது.",
        agency: "ed", connected: "bjp",
      },
    ],
  },

  /* ── Disclaimers ───────────────────────────────────────── */
  disclaimerTa: "இந்த நிகழ்வு மர்ம அரசியல் ஆவணக்காப்பகத்தில் பதிவு செய்யப்பட்டுள்ளது. செய்தி ஊடகங்கள், அரசு அதிகாரிகள், ஆராய்ச்சியாளர்கள் மற்றும் திரைப்பட தயாரிப்பாளர்களுக்கான ஆதாரமாக பயன்படுத்தப்படலாம்.",
  disclaimerEn: "Documented in மர்ம அரசியல் Political Archive (2015–2026). May be used as reference by news channels, officials, researchers, and filmmakers.",

  /* ── Footer ─────────────────────────────────────────────── */
  footerDesc: "தமிழ்நாட்டின் 11 ஆண்டு அரசியல் வரலாற்றின் சினிமாட்டிக் ஆவணம். 130 நிகழ்வுகள், 12 பருவங்களில் ஆவணப்படுத்தப்பட்டது.",
};

export default config;
