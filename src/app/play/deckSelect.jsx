"use client";

import styles from "./styles.module.scss";

export default function DeckSelect({ decks, selectDeck }) {
  return (
    <div className={`d-flex justify-content-between ${styles.deckSelect}`}>
      {["blue", "red"].map((color) => {
        return (
          <select className="form-select" key={color} onChange={e => selectDeck(e.target.value, color)}>
            <option value="">Select a deck</option>
            {decks.map((deck, i) => {
              return <option key={i} value={deck.cards}>{deck.name}</option>;
            })}
          </select>
        );
      })}
    </div>
  );
}