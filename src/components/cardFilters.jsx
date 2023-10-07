"use client";

import { useState } from "react";

export default function CardFilters({ cards, setCards }) {
  const [filters, setFilters] = useState({});

  function setFilter(field, value) {
    let newFilters = filters;
    newFilters[field] = value;
    setFilters(newFilters);
    filterCards();
  }

  function filterCards() {
    let filteredCards = [...cards];

    if (filters.stars) {
      filteredCards = filteredCards.filter((card) => card.stars == filters.stars);
    }

    if (filters.type) {
      filteredCards = filteredCards.filter((card) => card.type.name == filters.type);
    }

    setCards(filteredCards);
  }

  return (
    <form>
      <div className="d-flex flex-inline">
        <select className="form-select" onChange={e => setFilter('stars', e.target.value)}>
          <option value="">All Stars</option>
          {[1, 2, 3, 4, 5].map((value) => {
            return <option key={value} value={value}>{value} Stars</option>
          })}
        </select>
        <select className="form-select" onChange={e => setFilter('type', e.target.value)}>
          <option value="">All Types</option>
          {['Normal', 'Primal', 'Scion', 'Beastman', 'Garlean'].map((value) => {
            return <option key={value} value={value}>{value}</option>
          })}
        </select>
      </div>
    </form>
  )
}