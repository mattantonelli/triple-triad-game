"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import Player from "./player";
import Board from "./board";
import Score from "./score";
import Rules from "./rules";
import TurnIndicator from "./turnIndicator";
import Message from "./message";
import StartButton from "./startButton";
import { checkFlips } from "@/lib/game_logic";

export default function Game({ cards, decks, environment }) {
  const [canPlay, setCanPlay] = useState(false);
  const [playerCards, setPlayerCards] = useState({ blue: [], red: [] });
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [rule, setRule] = useState();
  const [playedCards, setPlayedCards] = useState({ blue: [], red: [] });
  const [scores, setScores] = useState({ blue: 5, red: 5 });
  const [squares, setSquares] = useState(Array(9).fill({}));
  const [message, setMessage] = useState(null);

  // Set initial values for quick testing purposes in the dev environment
  useEffect(() => {
    if (environment === "development") {
      setCanPlay(true);
      setTurn(1);
      setCurrentPlayer("blue");
      setRule("Fallen Ace");
      setPlayerCards(
        { blue: "66,52,43,48,42".split(",").map((id) => cards[id]),
          red:  "64,61,47,42,31".split(",").map((id) => cards[id]) }
      );
    }
  }, [setCanPlay, setTurn, setCurrentPlayer, setRule, setPlayedCards, cards, environment]);

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

  // Returns true if play has started
  function isPlayStarted() {
    return turn > 0;
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

  // Selects the rule to be used
  function selectRule(rule) {
    setRule(rule);
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
    checkFlips(newSquares, newScores, rule, index, showMessage);

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
      currentPlayer={currentPlayer} isPlayStarted={isPlayStarted} canPlay={canPlay}
      decks={decks} color={color} selectDeck={selectDeck} />;
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
        <Rules rule={rule} selectRule={selectRule} isPlayStarted={isPlayStarted} />
        {players[1]}
      </div>
    </div>
  </DndProvider>
  );
}