/** SearchBox — dark theme */
import CatIcon from "./CatIcon";

export default function SearchBox({ value, onChange, placeholder = "தேடுக...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <CatIcon name="search" size={14} color="var(--text-dim)" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:"100%", paddingLeft:36, paddingRight: value ? 32 : 14, paddingTop:9, paddingBottom:9,
          borderRadius:999, background:"var(--surface-2)", border:"1px solid var(--border)",
          fontFamily:"'Instrument Sans',sans-serif", fontSize:13, color:"var(--text)",
          outline:"none", transition:"all 0.2s", boxShadow:"none",
        }}
        onFocus={(e) => { e.target.style.borderColor="var(--maroon)"; e.target.style.boxShadow="0 0 0 3px rgba(141,16,22,0.2)"; }}
        onBlur={(e)  => { e.target.style.borderColor="var(--border)";  e.target.style.boxShadow="none"; }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
          style={{ background:"none", border:"none", cursor:"pointer" }}
        >
          <CatIcon name="close" size={12} color="var(--text-dim)" />
        </button>
      )}
      <style>{`input::placeholder{color:var(--text-dim)}`}</style>
    </div>
  );
}
