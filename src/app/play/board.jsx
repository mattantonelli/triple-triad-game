import Square from "./square";
import styles from "./styles.module.scss";

export default function Board({ squares, playCard }) {
  return (
    <div className={styles.board}>
      <div className={`d-flex flex-wrap ${styles.playArea}`}>
        {squares.map((square, i) => {
          return <Square key={i} index={i} card={square.card} color={square.color} playCard={playCard} />;
        })}
      </div>
    </div>
  );
}