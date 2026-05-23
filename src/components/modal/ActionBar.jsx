/**
 * ActionBar — dark print/copy/share + Google News link
 */
import { useState } from "react";
import CatIcon from "../ui/CatIcon";

function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); }); };
  return [copied, copy];
}

function Btn({ icon, label, successIcon, successLabel, onClick, isSuccess, href }) {
  const style = {
    display:"inline-flex", alignItems:"center", gap:6,
    fontFamily:"'Instrument Sans',sans-serif", fontSize:10, fontWeight:700,
    letterSpacing:"0.12em", textTransform:"uppercase",
    padding:"8px 14px", borderRadius:7, cursor:"pointer", transition:"all 0.2s",
    border: isSuccess ? "1.5px solid #16a34a" : "1.5px solid var(--border)",
    background: isSuccess ? "rgba(22,163,74,0.1)" : "var(--surface-2)",
    color: isSuccess ? "#16a34a" : "var(--text-muted)",
    textDecoration:"none",
  };
  const hover = (e) => { if (!isSuccess) { e.currentTarget.style.borderColor="var(--maroon)"; e.currentTarget.style.color="var(--maroon)"; }};
  const leave = (e) => { if (!isSuccess) { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text-muted)"; }};

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={hover} onMouseLeave={leave}>
        <CatIcon name={icon} size={13} color={isSuccess ? "#16a34a" : "var(--text-muted)"} />
        <span>{label}</span>
      </a>
    );
  }
  return (
    <button style={style} onClick={onClick} onMouseEnter={hover} onMouseLeave={leave}>
      <CatIcon name={isSuccess ? icon : icon} size={13} color={isSuccess ? "#16a34a" : "var(--text-muted)"} />
      <span>{isSuccess ? successLabel : label}</span>
    </button>
  );
}

export default function ActionBar({ event, onPrint }) {
  const evidenceText =
    `மர்ம அரசியல் — VERIFIED ARCHIVE\n` +
    `நிகழ்வு #${String(event.id).padStart(2,"0")} · ${event.season}\n` +
    `தேதி: ${event.date}\n${event.title}\n\n${event.desc}`;

  const shareUrl = `${window.location.origin}${window.location.pathname}#event-${event.id}`;
  const newsUrl  = `https://www.google.com/search?q=${encodeURIComponent((event.newsQuery || event.title) + " Tamil Nadu")}&gl=IN&hl=ta`;

  const [copiedEvidence, copyEvidence] = useCopy(evidenceText);
  const [copiedUrl,      copyUrl]      = useCopy(shareUrl);

  return (
    <div className="flex flex-wrap gap-2">
      <Btn icon="print"  label="Print / PDF"     onClick={onPrint}     isSuccess={false} />
      <Btn icon="copy"   label="Copy Evidence"    successLabel="Copied!" onClick={copyEvidence} isSuccess={copiedEvidence} />
      <Btn icon="share"  label="Share URL"        successLabel="URL Copied!" onClick={copyUrl}      isSuccess={copiedUrl} />
      <Btn icon="link"   label="Google News →"    href={newsUrl} isSuccess={false} />
    </div>
  );
}
