/**
 * AnimatedCounter — Counts from 0 to `target` when mounted.
 *
 * Props:
 *   target    {number}  — the final number
 *   duration  {number}  — animation duration in ms (default 1400)
 */
import { useEffect, useState } from "react";

export default function AnimatedCounter({ target, duration = 1400 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    let start      = 0;
    const steps    = 60;
    const step     = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}
