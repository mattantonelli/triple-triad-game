import { useState } from "react";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Player({ allCards, playedCards, decks, currentPlayer, color }) {
  const [cards, setCards] = useState([]);

  function selectDeck(selected) {
    const deckCards = selected.split(",").map((id) => allCards[id]);
    setCards(deckCards);
  }

  function isCardPlayed(card) {
    return playedCards.map((card) => card.id).includes(card.id);
  }

  return (
    <div className={`d-flex flex-column ${styles.player}`}>
      <select className="form-select" key={color} onChange={e => selectDeck(e.target.value)}>
        <option value="">Select a deck</option>
        {decks.map((deck, i) => {
          return <option key={i} value={deck.cards}>{deck.name}</option>;
        })}
      </select>

      <div className="d-flex flex-wrap justify-content-center mt-4">
        {cards.map((card) => {
          const isPlayed = isCardPlayed(card);
          return <PlayCard key={card.id} card={card} color={color} isVisible={!isPlayed}
            isDraggable={!isPlayed && currentPlayer === color } />;
        })}
      </div>
    </div>
  );
}