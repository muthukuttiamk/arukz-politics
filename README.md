# மர்ம அரசியல் — MURMA ARASIYAL
### Tamil Nadu Political Documentary Platform (2015 – 2026)

> **A cinematic, world-class political archive — built as a reusable documentary framework.**

---

## 📖 What is this?

**மர்ம அரசியல்** (Mysterious Politics) is a production-grade **React documentary platform** that archives 11 years (2015–2026) of Tamil Nadu political events across **12 chapters (பருவங்கள்)** and **130 documented incidents**.

Built for:
- 📰 **News Channels** — verified source material
- ⚖️ **Officials & Lawyers** — evidence-grade documentation
- 🎬 **Directors & Filmmakers** — structured narrative content
- 🏛️ **Administrators** — political pattern analysis
- 👥 **Public** — transparent political history

---

## ✨ Features

### 🌑 Dark Cinematic Theme
- Near-black `#080508` background with deep maroon accents
- CSS custom properties — entire palette swappable via `:root` variables
- `Teko` (headers) · `Instrument Sans` (UI) · `Noto Sans Tamil` (content)

### 🎬 Hero Section
- Cinematic parliament background image with dark gradient overlay
- Animated `Teko` title: "மர்ம" (white) + "அரசியல்" (gold gradient)
- Party preview pills with colour-coded party identities
- Animated stats dashboard (`AnimatedCounter`)
- "VERIFIED DOCUMENTARY ARCHIVE" seal

### 🏛️ BJP / Central Government Narrative
A dedicated evidence section documenting Central agency involvement:
- **24 IT Dept raids** · **6 ED cases** · **3 CBI probes** documented
- Expandable evidence cards with agency → connection chain
- Pattern analysis: *Election + Raid correlation, Alliance = Protection, Central Agencies as tools*
- Live event count computed from real data

### 🌳 Political Tree Explorer
Interactive 3-level drill-down:
```
Root: மர்ம அரசியல்
  └── Level 1: 12 பருவங்கள் (Season grid)
        └── Level 2: Events in selected season
              └── Level 3: IncidentModal with full evidence
```
- Breadcrumb navigation (`மர்ம அரசியல் > பருவங்கள் > பருவம் 02`)
- Framer Motion slide transitions (left/right direction-aware)
- "← Back" button at each level

### 📅 Year + Party Filter System
Two filter rows (replacing old category-only filter):
- **Year tabs**: `ALL · 2015 · 2016 · ... · 2026` with live event counts
- **Party pills**: `BJP · DMK · AIADMK · TVK · IT Dept · ED · CBI · Congress · PMK`
- Each pill shows event count and colour-coded by party identity
- Clear all button when any filter is active

### 🗂️ Evidence Modal
Professional evidence overlay for each incident:
- Maroon header with **EvidenceSeal**, date, title, party badges
- Full Tamil description (`Noto Sans Tamil`)
- Evidence metadata table: ID · Date · Year · Season · Category · Parties · Status
- Action buttons: **Print/PDF** · **Copy Evidence** · **Share URL** · **Google News →**
- Official bilingual disclaimer (Tamil + English)

### 📰 Google News Links
Every event card and modal includes a live Google News search link:
```
https://news.google.com/search?q={event title + year}&hl=ta&gl=IN&ceid=IN:ta
```

### 🎴 SVG Icon Library (`CatIcon.jsx`)
20+ inline SVG icons replacing all platform-inconsistent emojis:
`raid · election · oath · crisis · alliance · verdict · protest`
`link · print · copy · share · news · law · film · tree · close · search · chevron_right`

### Other Features
- **Reading progress bar** (maroon→gold gradient, fixed top)
- **News ticker** (scrolling documentary facts, pauses on hover)
- **QuickNav** (floating season dots, auto-highlights on scroll)
- **Search with gold highlight** on matched text
- **Print stylesheet** for clean evidence document output
- **Keyboard navigation** (Escape closes modals)

---

## 🏗️ Project Architecture

```
src/
│
├── config.js                 ← 🔑 CHANGE THIS for a new documentary
├── data.js                   ← 📦 All events + seasons (single source of truth)
├── App.jsx                   ← 🎯 Root orchestrator (clean, ~80 lines)
├── index.css                 ← 🎨 CSS variables + base reset
│
└── components/
    ├── ui/                   ← Reusable primitives
    │   ├── AnimatedCounter.jsx   Count-up animation
    │   ├── Badge.jsx             Party/category label
    │   ├── Button.jsx            primary / accent / ghost variants
    │   ├── CatIcon.jsx           SVG icon library (20+ icons)
    │   ├── Divider.jsx           Decorative separator
    │   ├── EvidenceSeal.jsx      Circular "VERIFIED ARCHIVE" stamp
    │   └── SearchBox.jsx         Dark search input
    │
    ├── layout/               ← Persistent chrome
    │   ├── Header.jsx            Dark glass sticky nav
    │   ├── Footer.jsx            3-column dark footer
    │   ├── NewsTicker.jsx        Scrolling headline banner
    │   ├── ProgressBar.jsx       Reading progress (top)
    │   └── QuickNav.jsx          Floating season navigator
    │
    ├── hero/                 ← Opening section
    │   ├── Hero.jsx              Full-screen cinematic hero
    │   ├── HeroStats.jsx         Animated stats dashboard
    │   └── AudienceRow.jsx       "For: News · Officials · Directors…"
    │
    ├── narrative/            ← Evidence sections
    │   └── BJPNarrative.jsx      Central Govt / BJP interference wall
    │
    ├── treemap/              ← Interactive navigation
    │   └── TreeExplorer.jsx      3-level drill-down tree
    │
    ├── filters/              ← Filter controls
    │   └── FilterBar.jsx         Year tabs + Party pills
    │
    ├── timeline/             ← Main archive view
    │   ├── Timeline.jsx          Orchestrator + filter logic
    │   ├── SeasonBlock.jsx       One chapter (பருவம்) card
    │   ├── SeasonHeader.jsx      Maroon chapter banner
    │   ├── EventCard.jsx         Individual incident card
    │   └── EmptyState.jsx        No-results message
    │
    └── modal/                ← Evidence overlay
        ├── IncidentModal.jsx     Full evidence viewer
        ├── EvidenceMetaTable.jsx Structured metadata table
        └── ActionBar.jsx         Print / Copy / Share / News
```

---

## 📊 Data Schema (`src/data.js`)

### Event Object
```js
{
  id:         11,                         // Unique sequential ID
  season:     "பருவம் 02",               // Chapter label
  seasonNum:  2,                          // Chapter number (for grouping)
  date:       "டிசம்பர் 8, 2016",        // Display date (Tamil)
  title:      "சேகர் ரெட்டி வீட்டில் மெகா ரெய்டு",
  filter:     "raid",                     // Legacy category key
  tags:       [["ரெய்டு","red"], ["சேகர் ரெட்டி","gray"]],
  desc:       "...",                      // Full Tamil description
  // Auto-added by data-enrichment script:
  year:       2016,                       // Extracted from date
  parties:    ["it_dept", "aiadmk"],      // Detected party keys
  newsQuery:  "சேகர் ரெட்டி வீட்டில் மெகா ரெய்டு 2016", // Google News query
}
```

### Season Object
```js
{
  num:    2,
  label:  "பருவம் 02",
  title:  "வருமான வரித்துறையின் பிடியில் தமிழகம்",
  period: "டிசம்பர் 2016 – பிப்ரவரி 2017",
}
```

---

## ⚙️ Configuration (`src/config.js`)

**To create a new documentary — change only this file:**

```js
const config = {
  title:      "மர்ம அரசியல்",     // Documentary title
  subtitle:   "Tamil Nadu Political Chronicle",
  dateRange:  "2015 – 2026",
  archiveId:  "TN-POL",           // Used in evidence IDs (TN-POL-0011)

  colors: { /* dark palette CSS values */ },
  parties: { /* party keys with color/label */ },
  categories: { /* event type keys */ },
  yearRange: [2015, 2016, ..., 2026],
  audiences: [ /* target audience rows */ ],
  tickerItems: [ /* news ticker strings */ ],
  bjpNarrative: { /* BJP section data */ },
  disclaimerTa: "...",
  disclaimerEn: "...",
};
```

---

## 🎨 Dark Theme Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080508` | Page background |
| `--surface-0` | `#110a0b` | Section backgrounds |
| `--surface-1` | `#1a0d0f` | Card backgrounds |
| `--surface-2` | `#241215` | Hover states |
| `--maroon` | `#8d1016` | Primary brand |
| `--gold` | `#ffca00` | Accent / numbers |
| `--text` | `#ede5e3` | Primary text |
| `--text-muted` | `#a08890` | Secondary text |
| `--border` | `#2d1a1c` | Borders |

---

## 🏛️ Political Parties Covered

| Key | Tamil | English | Colour |
|---|---|---|---|
| `bjp` | பாஜக | BJP | `#ff6600` |
| `dmk` | திமுக | DMK | `#cc0000` |
| `aiadmk` | அதிமுக | AIADMK | `#006400` |
| `tvk` | தவெக | TVK | `#ffca00` |
| `it_dept` | ஐடி துறை | IT Dept | `#4a90d9` |
| `ed` | ஈடி | ED | `#9b59b6` |
| `cbi` | சிபிஐ | CBI | `#1abc9c` |
| `pmk` | பமக | PMK | `#e67e22` |
| `congress` | காங்கிரஸ் | Congress | `#3498db` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run
```bash
# Clone the repository
git clone <repo-url>
cd social

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173/
```

### Build for Production
```bash
npm run build
npm run preview
```

### Assets Required
Place in `public/`:
```
public/
  hero-bg.png    ← Cinematic background image (parliament / political scene)
```

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | Component framework |
| Vite | 4.4 | Build tool + HMR |
| Tailwind CSS | 3.4 | Utility classes |
| Framer Motion | 12 | Animations + transitions |
| Google Fonts | — | Teko · Instrument Sans · Noto Sans Tamil |

---

## 📜 Content Coverage

| பருவம் | Period | Events |
|---|---|---|
| 01 | 2015–2016 | 10 |
| 02 | Dec 2016 – Feb 2017 | 12 |
| 03 | Feb – Apr 2017 | 10 |
| 04 | Apr – Sep 2017 | 11 |
| 05 | Nov 2017 – Sep 2018 | 14 |
| 06 | Feb – Nov 2019 | 9 |
| 07 | Feb 2020 – May 2021 | 12 |
| 08 | Jun 2021 – Mar 2023 | 9 |
| 09 | May – Oct 2023 | 9 |
| 10 | Dec 2024 – Mar 2025 | 15 |
| 11 | Apr – Nov 2025 | 9 |
| 12 | Jan – Jun 2026 | 13 |
| **Total** | **2015–2026** | **130** |

---

## 🔄 Reusing This for a New Documentary

This codebase is architected as a **reusable documentary template**. To create a completely different documentary:

1. **Edit `src/config.js`** — Change title, colors, parties, audiences, ticker
2. **Replace `src/data.js`** — Add your events and seasons following the schema
3. **Replace `public/hero-bg.png`** — Add your hero background image
4. **Done** — All components auto-adapt

No component code changes needed.

---

## 📋 Evidence & Disclaimer

All events documented in this platform are based on publicly reported news and official records. This archive is intended for:
- Journalistic reference
- Academic research
- Legal/administrative documentation
- Filmmaking and content production

**மர்ம அரசியல் · Tamil Nadu Political Archive · 2015–2026**
