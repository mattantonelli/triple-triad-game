"use client";

import PlayCard from "./playCard";

export default function Deck({ cards, color, startDrag }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex">
        {cards.slice(0, 3).map((card) => <PlayCard key={card.id} card={card} color={color} startDrag={startDrag} />)}
      </div>
      <div className="d-flex">
        {cards.slice(3).map((card) => <PlayCard key={card.id} card={card} color={color} startDrag={startDrag} />)}
      </div>
    </div>
  );
}