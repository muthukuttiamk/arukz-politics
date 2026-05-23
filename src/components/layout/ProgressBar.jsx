/**
 * ProgressBar — Shows reading progress as the user scrolls.
 * Renders a thin bar fixed at the very top of the viewport.
 */
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h    = document.documentElement;
      const pct  = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: `${progress}%`,
        height: 3,
        background: "linear-gradient(90deg, #5c1a1b, #8d1016, #ffca00)",
        boxShadow: "0 0 8px rgba(141,16,22,0.5)",
        zIndex: 9999,
        transition: "width 0.1s linear",
      }}
    />
  );
}
