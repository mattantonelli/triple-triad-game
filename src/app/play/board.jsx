import { useEffect, useRef } from "react";
import Square from "./square";
import styles from "./styles.module.scss";

export default function Board({ squares, playCard }) {
  const previousSquares = useRef(Array(9).fill({}));

  // Track the squares from the previous render so we can see which ones were flipped
  useEffect(() => {
    // We need to create a deep copy since squares is an array of objects
    previousSquares.current = squares.map((square) => ({...square}));
  });

  // Returns true if a square occupied in the last render had a different color
  function isFlipped(i) {
    return previousSquares.current[i].color &&
      (squares[i].color !== previousSquares.current[i].color);
  }

  return (
    <div className={styles.board}>
      <div className={`d-flex flex-wrap ${styles.playArea}`}>
        {squares.map((square, i) => {
          return <Square key={i} index={i} card={square.card} color={square.color}
            flipped={isFlipped(i)} playCard={playCard} />;
        })}
      </div>
    </div>
  );
}