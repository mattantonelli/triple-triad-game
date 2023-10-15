import { useState } from "react";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Player({ allCards, playedCards, decks, currentPlayer, currentTurn, color, canPlay }) {
  const [cards, setCards] = useState([]);

  function selectDeck(selected) {
    const deckCards = selected.split(",").map((id) => allCards[id]);
    setCards(deckCards);
  }

  function isCardPlayed(card) {
    return playedCards.map((card) => card.id).includes(card.id);
  }

  function isPlayerTurn() {
    return currentPlayer === color;
  }

  function isPlayStarted() {
    return currentTurn > 1;
  }

  return (
    <div className={`d-flex flex-column ${styles.player}`}>
      <select className="form-select" key={color} onChange={e => selectDeck(e.target.value)} disabled={isPlayStarted()}>
        <option value="">Select a deck</option>
        {decks.map((deck, i) => {
          return <option key={i} value={deck.cards}>{deck.name}</option>;
        })}
      </select>

      <div className="d-flex flex-wrap justify-content-center mt-4">
        {cards.map((card) => {
          const isPlayed = isCardPlayed(card);
          return <PlayCard key={card.id} card={card} color={color} isVisible={!isPlayed}
            isDraggable={canPlay && isPlayerTurn() && !isPlayed } />;
        })}
      </div>
    </div>
  );
}