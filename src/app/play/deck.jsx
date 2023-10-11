"use client";

import Card from "@/components/cards/card";

export default function Deck({ cards }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex">
        {cards.slice(0, 3).map((card) => <Card key={card.id} card={card} />)}
      </div>
      <div className="d-flex">
        {cards.slice(3).map((card) => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );
}