import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Player({ cards, playedCards, decks, selectDeck, currentPlayer, color, isPlayStarted, canPlay }) {
  function isCardPlayed(card) {
    return playedCards.map((card) => card.id).includes(card.id);
  }

  function isPlayerTurn() {
    return currentPlayer === color;
  }

  return (
    <div className={`d-flex flex-column ${styles.player}`}>
      <select className="form-select" onChange={e => selectDeck(color, e.target.value)} disabled={isPlayStarted()}>
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