"use client";

import Card from "@/components/cards/card";
import CardFilters from "./cardFilters";
import { useEffect, useState } from "react";

const DATA_URL = "https://triad.raelys.com/api/cards";

export default function CardList() {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(DATA_URL, { next: { revalidate: 86400 }})
      .then((res) => res.json())
      .then((data) => {
        setAllCards(data.results);
        setCards(data.results);
      });
  }, []);

  return (
    <>
      <CardFilters cards={allCards} setCards={setCards} />
      <div className="d-flex flex-wrap mt-3">
        { cards.map((card) => <Card key={card.id} card={card} />) }
      </div>
    </>
  )
}