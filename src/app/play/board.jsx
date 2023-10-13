import { useState } from "react";
import Square from "./square";
import styles from "./styles.module.scss";

// Returns a list of adjacent indexes for checking flips.
// 0 1 2
// 3 4 5
// 6 7 8
const adjacentIndexes = [
  [1, 3],
  [0, 2, 4],
  [1, 5],
  [0, 4, 6],
  [1, 5, 7, 3],
  [2, 4, 8],
  [3, 7],
  [4, 6, 8],
  [5, 7]
];

// Returns [x, y] coordinates corresponding to the square's index on the board
function indexToCoordinates(index) {
  return [index % 3, Math.floor(index / 3)];
}

export default function Board({ playFromHand }) {
  const [squares, setSquares] = useState(Array(9).fill({}));

  function playCard(card, color, index) {
    console.log(`${color} played ${card.name} at (${indexToCoordinates(index).join(", ")})`);

    // Add the card to the board
    let newSquares = [...squares];
    newSquares[index] = { color: color, card: card };

    // Try to flip its neighbors
    newSquares = checkFlips(newSquares, card, color, index);
    setSquares(newSquares);

    // Remove it from the player's hand
    playFromHand(card, color);
  }

  // Checks a card's neighbors to see if they can be flipped
  function checkFlips(newSquares, card, color, index) {
    adjacentIndexes[index].forEach((neighborIndex) => {
      const neighbor = newSquares[neighborIndex];
      if (neighbor.color && neighbor.color !== color) {
        // Translate the square indexes into usable coordinates to determine sides
        const [x1, y1] = indexToCoordinates(index);
        const [x2, y2] = indexToCoordinates(neighborIndex);

        // Based on the relative position of the squares, check if the placed card's
        // stats exceeds that of its neighbor
        if (
          (x1 > x2 && card.stats.numeric.left > neighbor.card.stats.numeric.right) ||
          (x1 < x2 && card.stats.numeric.right > neighbor.card.stats.numeric.left) ||
          (y1 > y2 && card.stats.numeric.top > neighbor.card.stats.numeric.bottom) ||
          (y1 < y2 && card.stats.numeric.bottom > neighbor.card.stats.numeric.top)
        ) {
          // If so, flip the neighbor's color
          newSquares[neighborIndex].color = color;
        }
      }
    });

    return newSquares;
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