/**
 * Badge — Colour-coded category label
 *
 * Props:
 *   category  {string}  — key from config.categories (e.g. "raid")
 *   size      {"sm"|"md"}  — default "sm"
 */

import config from "../../config";

const SIZE = {
  sm: "text-[9px] px-2 py-0.5",
  md: "text-[11px] px-3 py-1",
};

const BG = {
  raid:     "bg-orange-50  text-orange-700  border-orange-200",
  election: "bg-green-50   text-green-700   border-green-200",
  crisis:   "bg-red-50     text-red-700     border-red-200",
  oath:     "bg-blue-50    text-blue-700    border-blue-200",
  alliance: "bg-purple-50  text-purple-700  border-purple-200",
  verdict:  "bg-amber-50   text-amber-700   border-amber-200",
  protest:  "bg-pink-50    text-pink-700    border-pink-200",
  default:  "bg-gray-50    text-gray-600    border-gray-200",
};

export default function Badge({ category, size = "sm" }) {
  const cat  = config.categories[category];
  const bg   = BG[category] || BG.default;
  const icon = cat?.icon || "•";
  const text = cat?.label || category;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border font-instrument font-bold
        tracking-widest uppercase leading-none
        ${bg} ${SIZE[size]}
      `}
    >
      <span>{icon}</span>
      <span className="font-tamil">{text}</span>
    </span>
  );
}
