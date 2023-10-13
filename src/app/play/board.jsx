import { useState } from "react";
import Square from "./square";
import styles from "./styles.module.scss";

export default function Board({ playFromHand }) {
  const [squares, setSquares] = useState(Array(9).fill({}));

  function playCard(card, color, index) {
    console.log(`${color} played ${card.name} at (${index % 3}, ${Math.floor(index / 3)})`);

    let newSquares = [...squares];
    newSquares[index] = { color: color, card: card };
    setSquares(newSquares);

    playFromHand(card, color);
  }

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