/** EvidenceMetaTable — dark themed metadata table */
import config from "../../config";

export default function EvidenceMetaTable({ event }) {
  const cat    = config.categories[event.filter];
  const parties = (event.parties||[]).filter(p=>p!=="unknown");

  const rows = [
    { key:"நிகழ்வு எண்", value:`${config.archiveId}-${String(event.id).padStart(4,"0")}`, mono:true },
    { key:"தேதி",          value:event.date, bold:true },
    { key:"ஆண்டு",         value:event.year ? String(event.year) : "—" },
    { key:"பருவம்",        value:event.season },
    { key:"வகை",           value:cat?.label || event.filter },
    { key:"கட்சிகள்",     value:(
      <div className="flex flex-wrap gap-1">
        {parties.length ? parties.map(p=>{
          const party=config.parties[p];
          return party ? (
            <span key={p} style={{ fontFamily:"'Instrument Sans'", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", color:party.color, background:party.bg, border:`1px solid ${party.color}40`, borderRadius:4, padding:"2px 7px" }}>{party.en}</span>
          ) : null;
        }) : <span style={{ color:"var(--text-dim)" }}>—</span>}
      </div>
    )},
    { key:"நிலை",          value:<span style={{ color:"#16a34a", fontWeight:700, fontSize:12 }}>✓ ஆவணப்படுத்தப்பட்டது</span> },
    { key:"ஆவணம்",         value:new Date().toLocaleDateString("ta-IN") + " அன்று பதிவிறக்கம்" },
  ];

  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Instrument Sans',sans-serif", fontSize:12 }}>
      <tbody>
        {rows.map((row,i)=>(
          <tr key={i}>
            <td style={{ padding:"9px 12px", borderBottom:`1px solid var(--border)`, fontWeight:700, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.08em", fontSize:10, width:140, verticalAlign:"top", whiteSpace:"nowrap" }}>
              {row.key}
            </td>
            <td style={{ padding:"9px 12px", borderBottom:`1px solid var(--border)`, color:"var(--text)", fontFamily:row.mono?"monospace":"'Instrument Sans',sans-serif", fontWeight:row.bold?700:400, verticalAlign:"top" }}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
