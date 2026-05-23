/**
 * CatIcon — SVG icons for each category.
 * Replaces emojis for a professional, cross-platform look.
 *
 * Props:
 *   name  {string}  — icon key from config (raid/election/oath/crisis/alliance/verdict/protest/all)
 *   size  {number}  — width/height in px (default 16)
 *   color {string}  — stroke/fill color
 */
const PATHS = {
  all: (
    <g>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" fill="none"/>
      <path d="M12 7v5l3 3" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
  ),
  raid: (
    <g>
      <circle cx="10" cy="10" r="6" strokeWidth="1.8" fill="none"/>
      <line x1="14.5" y1="14.5" x2="20" y2="20" strokeWidth="2.2" strokeLinecap="round"/>
    </g>
  ),
  election: (
    <g>
      <rect x="5" y="8" width="14" height="11" rx="1.5" strokeWidth="1.8" fill="none"/>
      <path d="M9 8V6a3 3 0 016 0v2" strokeWidth="1.8" fill="none"/>
      <line x1="9" y1="13" x2="15" y2="13" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="9" y1="16" x2="13" y2="16" strokeWidth="1.6" strokeLinecap="round"/>
    </g>
  ),
  oath: (
    <g>
      <path d="M12 4v8M9 7l3-3 3 3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M7 13h10l-1 5a1 1 0 01-1 1h-6a1 1 0 01-1-1l-1-5z" strokeWidth="1.6" fill="none"/>
    </g>
  ),
  crisis: (
    <g>
      <path d="M12 3L4 20h16L12 3z" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      <line x1="12" y1="10" x2="12" y2="14" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="0.8" fill="currentColor"/>
    </g>
  ),
  alliance: (
    <g>
      <path d="M6 12c0-2 1.5-3 3-3s3 2 3 2 1.5-2 3-2 3 1 3 3" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M7.5 16.5c1.5 1.5 3.5 2 4.5 2s3-0.5 4.5-2" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
    </g>
  ),
  verdict: (
    <g>
      <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="5" y1="6" x2="19" y2="6" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M6 6l-3 7a4 4 0 008 0L6 6z" strokeWidth="1.6" fill="none"/>
      <path d="M18 6l3 7a4 4 0 01-8 0l5-7z" strokeWidth="1.6" fill="none"/>
    </g>
  ),
  protest: (
    <g>
      <path d="M9 5.5C9 4.1 10.1 3 11.5 3S14 4.1 14 5.5v.5H9v-.5z" fill="currentColor"/>
      <rect x="9" y="6" width="5" height="8" rx="1" strokeWidth="1.6" fill="none"/>
      <path d="M9 8H7a1 1 0 000 2h2M14 8h2a1 1 0 010 2h-2" strokeWidth="1.5" fill="none"/>
      <line x1="11.5" y1="14" x2="11.5" y2="20" strokeWidth="2" strokeLinecap="round"/>
    </g>
  ),
  /* utility icons */
  news: (
    <g>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" fill="none"/>
      <line x1="7" y1="9" x2="17" y2="9" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="7" y1="13" x2="13" y2="13" strokeWidth="1.6" strokeLinecap="round"/>
    </g>
  ),
  law: (
    <g>
      <circle cx="12" cy="7" r="3" strokeWidth="1.8" fill="none"/>
      <path d="M6 21v-2a6 6 0 0112 0v2" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </g>
  ),
  film: (
    <g>
      <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.8" fill="none"/>
      <path d="M16 12l-6 4V8l6 4z" strokeWidth="1.6" fill="currentColor"/>
    </g>
  ),
  govt: (
    <g>
      <path d="M3 21h18M3 18h18M6 18V10M10 18V10M14 18V10M18 18V10M12 3L3 10h18L12 3z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </g>
  ),
  public: (
    <g>
      <circle cx="9" cy="7" r="3" strokeWidth="1.8" fill="none"/>
      <circle cx="17" cy="9" r="2" strokeWidth="1.6" fill="none"/>
      <path d="M3 21v-1a6 6 0 0112 0v1" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M19 21v-1a4 4 0 00-3-3.8" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </g>
  ),
  link: (
    <g>
      <path d="M10 13a5 5 0 007.5.7l2-2a5 5 0 00-7-7l-1.1 1.1" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M14 11a5 5 0 00-7.5-.7l-2 2a5 5 0 007 7l1.1-1.1" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </g>
  ),
  print: (
    <g>
      <rect x="6" y="14" width="12" height="8" rx="1" strokeWidth="1.7" fill="none"/>
      <path d="M6 14V8a2 2 0 012-2h8a2 2 0 012 2v6" strokeWidth="1.7" fill="none"/>
      <line x1="9" y1="17" x2="15" y2="17" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="20" x2="13" y2="20" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  ),
  copy: (
    <g>
      <rect x="9" y="9" width="12" height="12" rx="2" strokeWidth="1.7" fill="none"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="1.7" fill="none"/>
    </g>
  ),
  share: (
    <g>
      <circle cx="18" cy="5" r="2.5" strokeWidth="1.7" fill="none"/>
      <circle cx="6" cy="12" r="2.5" strokeWidth="1.7" fill="none"/>
      <circle cx="18" cy="19" r="2.5" strokeWidth="1.7" fill="none"/>
      <line x1="8.4" y1="10.8" x2="15.6" y2="6.2" strokeWidth="1.6"/>
      <line x1="8.4" y1="13.2" x2="15.6" y2="17.8" strokeWidth="1.6"/>
    </g>
  ),
  tree: (
    <g>
      <circle cx="12" cy="4" r="2.5" strokeWidth="1.7" fill="none"/>
      <circle cx="4" cy="18" r="2.5" strokeWidth="1.7" fill="none"/>
      <circle cx="20" cy="18" r="2.5" strokeWidth="1.7" fill="none"/>
      <line x1="12" y1="6.5" x2="12" y2="12" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 12L4 15.5M12 12l8 3.5" strokeWidth="1.6" strokeLinecap="round"/>
    </g>
  ),
  close: (
    <g>
      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
    </g>
  ),
  arrow_down: (
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  ),
  search: (
    <g>
      <circle cx="10" cy="10" r="6" strokeWidth="1.8" fill="none"/>
      <line x1="14.5" y1="14.5" x2="20" y2="20" strokeWidth="2.2" strokeLinecap="round"/>
    </g>
  ),
  chevron_right: (
    <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  ),
};

export default function CatIcon({ name = "all", size = 16, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name] || PATHS.all}
    </svg>
  );
}
