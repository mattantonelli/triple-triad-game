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
import { processFlips } from "@/lib/game_logic";
import MessagePreload from "./messagePreload";
import { processAITurn } from "@/lib/ai_logic";
import OpponentSelect from "./opponentSelect";

// TODO: Refactor functions passed to children as useCallback hooks to avoid re-rendering children
// https://react.dev/reference/react/useCallback#usage
export default function Game({ cards, decks, environment }) {
  const [canPlay, setCanPlay] = useState(false);
  const [playerCards, setPlayerCards] = useState({ blue: [], red: [] });
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [rule, setRule] = useState("");
  const [playedCards, setPlayedCards] = useState({ blue: [], red: [] });
  const [scores, setScores] = useState({ blue: 5, red: 5 });
  const [squares, setSquares] = useState(Array(9).fill({}));
  const [message, setMessage] = useState(null);
  const [opponent, setOpponent] = useState("ai");

  // Set initial values for quick testing purposes in the dev environment
  useEffect(() => {
    if (environment === "development") {
      setCanPlay(true);
      setTurn(1);
      setCurrentPlayer("blue");
      setOpponent("ai"); // ai | global | local
      setRule("Plus");
      setPlayerCards(
        { blue: "338,92,233,341,251".split(",").map((id) => cards[id]),
          red:  "331,332,130,94,46".split(",").map((id) => cards[id]) }
      );
    }
  }, [setCanPlay, setTurn, setCurrentPlayer, setRule, setPlayedCards, cards, environment]);

  // Process the AI's turn if it is active and its current turn
  useEffect(() => {
    if (opponent === "ai" && currentPlayer === "red") {
      processAITurn(squares, rule, playableCards, playCard);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  // Reset all game parameters
  function resetGame() {
    setPlayedCards({ blue: [], red: [] });
    setScores({ blue: 5, red: 5 });
    setSquares(Array(9).fill({}));
    setTurn(0);
    setCurrentPlayer(null);
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

  // Determines the cards that can be played from a player's hand, based on the active rule
  function playableCards(color, skipPlayCheck = false) {
    // No cards are playable while play is paused, unless we choose to skip that check (for the AI)
    if (!canPlay && !skipPlayCheck) {
      return [];
    }

    // Start with a list of cards that are still in the player's hand
    const playable = playerCards[color].filter((card) => !playedCards[color].includes(card));

    if (rule === "Chaos") {
      // Chaos selects a random card from the deck
      const unplayed = playable.filter((card) => !playedCards[color].includes(card));
      const playableIndex = Math.floor(Math.random() * unplayed.length);
      return [unplayed[playableIndex]];
    } else if (rule === "Order") {
      // Order requires cards be played in deck order from first to last
      return [playable[0]];
    } else {
      // If no valid rule is active, all cards are playable
      return playable;
    }
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

    // Remove the card from the player's hand
    playFromHand(card, color);

    // Add the card to the board
    let newSquares = squares.map((square) => ({...square}));
    newSquares[index] = { color: color, card: card };
    setSquares(newSquares);

    // Try to flip its neighbors
    let newScores = {...scores};
    await processFlips(newSquares, setSquares, newScores, setScores, rule, index, showMessage);

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

      // Resume play if playing locally or if the non-local opponent's turn is over
      if (opponent === "local" || color === "red") {
        setCanPlay(true);
      }
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
      currentPlayer={currentPlayer} isPlayStarted={isPlayStarted()} canPlay={canPlay}
      decks={decks} color={color} playableCards={playableCards(color)} selectDeck={selectDeck} />;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`d-flex ${styles.topBar} justify-content-end`}>
        <OpponentSelect opponent={opponent} setOpponent={setOpponent} isPlayStarted={isPlayStarted} />
      </div>
      <div className={`d-flex ${styles.gameMat}`}>
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
      <MessagePreload />
    </DndProvider>
  );
}