import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Player({ cards, playedCards, playableCards, decks, selectDeck, currentPlayer, color, isPlayStarted, canPlay }) {
  // Returns true if the card has already been played
  function isCardPlayed(card) {
    return playedCards.map((card) => card.id).includes(card.id);
  }

  // Returns true if the card is in the list of playable cards
  function isCardPlayable(card) {
    return playableCards.includes(card);
  }

  // Returns true if it is this player's turn
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
        {cards.map((card, i) => {
          const [isPlayed, isPlayable] = [isCardPlayed(card), isCardPlayable(card)];
          return <PlayCard key={card.id} card={card} color={color} isVisible={!isPlayed}
            isDraggable={!isPlayed && canPlay && isPlayable && isPlayerTurn()}
            isPlayable={isPlayerTurn() && isPlayable} />;
        })}
      </div>
    </div>
  );
}