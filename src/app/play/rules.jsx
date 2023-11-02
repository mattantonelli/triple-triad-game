import styles from "./styles.module.scss";

const rules = ["Chaos", "Fallen Ace", "Order", "Plus", "Reverse", "Same"];

export default function Rules({ rule, selectRule, isPlayStarted }) {
 return (
  <div className={`d-flex flex-column ${styles.rules}`}>
    <select className="form-select" value={rule} onChange={e => selectRule(e.target.value)} disabled={isPlayStarted()}>
      <option value="">No Rule</option>
      {rules.map((val, i) => {
        return <option key={i} value={val}>{val}</option>;
      })}
    </select>
  </div>
 );
}