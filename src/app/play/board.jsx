import Square from "./square";
import styles from "./styles.module.scss";

export default function Board({ playCard }) {
  return (
    <div className={styles.board}>
      <div className={`d-flex flex-wrap ${styles.playArea}`}>
        {Array(9).fill().map((_, i) => {
          return <Square key={i} playCard={playCard} />;
        })}
      </div>
    </div>
  );
}