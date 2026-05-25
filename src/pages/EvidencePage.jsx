/** EvidencePage — BJP Narrative + BigResult analysis.
 *  No duplicate header — BJPNarrative has its own styled section header.
 */
import BJPNarrative from "../components/narrative/BJPNarrative";
import BigResult    from "../components/narrative/BigResult";

export default function EvidencePage({ events, onEventClick }) {
  return (
    <div style={{ paddingTop: 82 }}>
      <BJPNarrative events={events} onEventClick={onEventClick} />
      <BigResult />
    </div>
  );
}
