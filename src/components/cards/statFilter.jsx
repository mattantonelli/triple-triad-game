import styles from "./card.module.scss"

const labels = {
  "top": "↑",
  "right": "→",
  "bottom": "↓",
  "left": "←"
};

export default function StatFilter({ direction, setFilter }) {
  return (
    <div className="input-group">
      <span className="input-group-text">{labels[direction]}</span>
      <input type="number" className={`form-control ${styles.inputStat}`} min="0" max="10" defaultValue="0"
        onChange={e => setFilter(direction, e.target.value)} />
    </div>
  )
}