import styles from "./styles.module.scss";

// TODO: Implement all of these to start
// const rules = ["Chaos", "Fallen Ace", "Order", "Plus", "Reverse", "Same"];
const rules = ["Fallen Ace"];

export default function Rules({ rule, selectRule, isPlayStarted }) {
 return (
  <div className={`d-flex flex-column ${styles.rules}`}>
    <select className="form-select" value={rule} onChange={e => selectRule(e.target.value)} disabled={isPlayStarted()}>
      <option value="">Select a rule</option>
      {rules.map((val, i) => {
        return <option key={i} value={val}>{val}</option>;
      })}
    </select>
  </div>
 );
}