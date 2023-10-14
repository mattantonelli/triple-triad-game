"use client";

import Card from "@/components/cards/card";
import CardFilters from "./cardFilters";
import { useState } from "react";

export default function CardList({ cards : allCards }) {
  const [cards, setCards] = useState([]);

  return (
    <>
      <CardFilters cards={allCards} setCards={setCards} />
      <div className="d-flex flex-wrap mt-3">
        { cards.map((card) => <Card key={card.id} card={card} />) }
      </div>
    </>
  );
}