"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./styles.module.scss";
import Player from "./player";
import Board from "./board";

export default function Game({ cards, decks }) {
  const [playedCards, setPlayedCards] = useState({ blue: [], red: [] });

  function playFromHand(card, color) {
    let newCards = {...playedCards};
    newCards[color].push(card);
    setPlayedCards(newCards);
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className={`d-flex ${styles.gameMat} mx-auto`}>
      {/* TODO: Render status (# flipped cards) here. Reduce height of Player component to compensate. */}
      <Player allCards={cards} playedCards={playedCards.blue} decks={decks} color="blue" />
      <Board playFromHand={playFromHand} />
      {/* TODO: Render buttons like Reset here, same height as the status component. */}
      <Player allCards={cards} playedCards={playedCards.red} decks={decks} color="red" />
    </div>
  </DndProvider>
  );
}