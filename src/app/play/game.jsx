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
import Message from "./message";
import StartButton from "./startButton";

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
  // For quick testing purposes
  // const [canPlay, setCanPlay] = useState(true);
  // const [turn, setTurn] = useState(1);
  // const [currentPlayer, setCurrentPlayer] = useState("blue");
  // const [playerCards, setPlayerCards] = useState(
  //   { blue: "327,234,233,169,111".split(",").map((id) => cards[id]),
  //     red:  "298,299,208,180,250".split(",").map((id) => cards[id]) }
  // );

  const [canPlay, setCanPlay] = useState(false);
  const [playerCards, setPlayerCards] = useState({ blue: [], red: [] });
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [playedCards, setPlayedCards] = useState({ blue: [], red: [] });
  const [scores, setScores] = useState({ blue: 5, red: 5 });
  const [squares, setSquares] = useState(Array(9).fill({}));
  const [message, setMessage] = useState(null);

  // Reset all game parameters
  function resetGame() {
    setPlayedCards({ blue: [], red: [] });
    setScores({ blue: 5, red: 5 });
    setSquares(Array(9).fill({}));
    setTurn(0);
    setCanPlay(false);
    setMessage(null);
  }

  // Returns true if play has not started and both players have selected a deck
  function canStart() {
    return !canPlay && turn === 0 && playerCards.blue.length > 0 && playerCards.red.length > 0;
  }

  // Selects the deck to be used by a player
  function selectDeck(color, cardIds) {
    // Ensure we actually have cards to select
    if (!cardIds) {
      return;
    }

    const selectedCards = cardIds.split(",").map((id) => cards[id]);

    let newPlayerCards = {...playerCards};
    newPlayerCards[color] = selectedCards;
    setPlayerCards(newPlayerCards);
  }

  // Updates a player's list of played cards when a card is played so we can toggle visibility
  function playFromHand(card, color) {
    let newCards = {...playedCards};
    newCards[color].push(card);
    setPlayedCards(newCards);
  }

  // Plays a card, adding it to the board and checking to flip its neighbors
  async function playCard(card, color, index) {
    // Disable play while the placed card is evaluated
    setCanPlay(false);

    // Add the card to the board
    let newSquares = [...squares];
    newSquares[index] = { color: color, card: card };

    // Try to flip its neighbors
    let newScores = {...scores};
    [newSquares, newScores] = checkFlips(newSquares, newScores, card, color, index);

    // Update the squares and scores
    setSquares(newSquares);
    setScores(newScores);

    // Remove the card from the player's hand
    playFromHand(card, color);

    if (turn === 9) {
      // If the game is over, calculate a winner and display the winning message
      if (newScores.blue > newScores.red) {
        showMessage("victory", "blue_wins", null);
      } else if (newScores.red > newScores.blue) {
        showMessage("victory", "red_wins", null);
      } else {
        showMessage("victory", "draw", null);
      }
    } else {
      // Otherwise, move to the next turn
      incrementTurn();

      // Re-enable play
      setCanPlay(true);
    }
  }

  // Checks a card's neighbors to see if they can be flipped
  function checkFlips(newSquares, newScores, card, color, index) {
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

    return [newSquares, newScores];
  }

  // Increments the turn # and switches play to the opposite color
  function incrementTurn() {
    setTurn(turn + 1);
    setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
  }

  // Shows the given message for a short duration
  async function showMessage(type, message, clearAfter = 750) {
    setMessage({ type: type, message: message });

    // If the message needs to be cleared after a time, set up a timer
    // and return a Promise so we can signal when the message is cleared.
    if (clearAfter) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setMessage(null);
          resolve();
        }, clearAfter);
      });
    }
  }

  const players = ["blue", "red"].map((color) => {
    return <Player key={color} cards={playerCards[color]} playedCards={playedCards[color]}
      currentPlayer={currentPlayer} turn={turn}
      decks={decks} selectDeck={selectDeck}
      color={color} canPlay={canPlay} />;
  });

  return (
    <DndProvider backend={HTML5Backend}>
    <div className={`d-flex ${styles.gameMat} mx-auto`}>
      <StartButton isVisible={canStart()} setCanPlay={setCanPlay} setCurrentPlayer={setCurrentPlayer}
        setTurn={setTurn} showMessage={showMessage} />
      <Message {...message} resetGame={resetGame} />
      <TurnIndicator currentPlayer={currentPlayer} />
      <div className="d-flex flex-column">
        <Score scores={scores} />
        {players[0]}
      </div>
      <Board squares={squares} playCard={playCard} />
      <div className="d-flex flex-column">
        <Controls />
        {players[1]}
      </div>
    </div>
  </DndProvider>
  );
}