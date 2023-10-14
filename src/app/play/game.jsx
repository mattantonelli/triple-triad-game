"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import Player from "./player";
import Board from "./board";
import Score from "./score";
import Controls from "./controls";
import TurnIndicator from "./turnIndicator";

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

export default function Game({ cards, decks }) {
  const [playedCards, setPlayedCards] = useState({ blue: [], red: [] });
  const [scores, setScores] = useState({ blue: 5, red: 5 });
  const [squares, setSquares] = useState(Array(9).fill({}));
  const [turn, setTurn] = useState(1);

  // Updates a player's list of played cards when a card is played so we can toggle visibility
  function playFromHand(card, color) {
    let newCards = {...playedCards};
    newCards[color].push(card);
    setPlayedCards(newCards);
  }

  // Plays a card, adding it to the board and checking to flip its neighbors
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

    // And increment the turn #
    setTurn(turn + 1);
  }

  // Checks a card's neighbors to see if they can be flipped
  function checkFlips(newSquares, card, color, index) {
    let newScores = {...scores};

    adjacentIndexes[index].forEach((neighborIndex) => {
      const neighbor = newSquares[neighborIndex];

      if (neighbor.color && neighbor.color !== color) {
        // Translate the square indexes into usable coordinates to determine sides
        const [x1, y1] = indexToCoordinates(index);
        const [x2, y2] = indexToCoordinates(neighborIndex);

        // Based on the relative position of the squares, check if the placed card's
        // stats exceeds that of its neighbor
        const stats = card.stats.numeric;
        const neighborStats = neighbor.card.stats.numeric;

        if (
          (x1 > x2 && stats.left   > neighborStats.right)  ||
          (x1 < x2 && stats.right  > neighborStats.left)   ||
          (y1 > y2 && stats.top    > neighborStats.bottom) ||
          (y1 < y2 && stats.bottom > neighborStats.top)
        ) {
          // If so, flip the neighbor's color
          const neighborColor = neighbor.color;
          neighbor.color = color;

          // and update the scores
          newScores[color] += 1;
          newScores[neighborColor] -= 1;
        }
      }
    });

    setScores(newScores);
    return newSquares;
  }

  function currentPlayer() {
    return turn % 2 == 0 ? "red" : "blue";
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className={`d-flex ${styles.gameMat} mx-auto`}>
      <TurnIndicator currentPlayer={currentPlayer()} />
      <div className="d-flex flex-column">
        <Score scores={scores} />
        <Player allCards={cards} playedCards={playedCards.blue} decks={decks} currentPlayer={currentPlayer()} color="blue" />
      </div>
      <Board squares={squares} playCard={playCard} />
      <div className="d-flex flex-column">
        <Controls />
        <Player allCards={cards} playedCards={playedCards.red} decks={decks} currentPlayer={currentPlayer()} color="red" />
      </div>
    </div>
  </DndProvider>
  );
}