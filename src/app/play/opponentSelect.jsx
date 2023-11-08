export default function OpponentSelect({ opponent, setOpponent, isPlayStarted }) {
  return (
    <select className="form-select" value={opponent} onChange={e => setOpponent(e.target.value)} disabled={isPlayStarted()}>
      <option value="ai">AI Player</option>
      <option value="local">Local Player</option>
    </select>
  );
}