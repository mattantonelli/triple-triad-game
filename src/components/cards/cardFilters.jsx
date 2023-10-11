"use client";

import { useEffect, useState } from "react";
import StatFilter from "./statFilter";

const stars = [1, 2, 3, 4, 5];
const types = ["Normal", "Primal", "Scion", "Beastman", "Garlean"];
const directions = ["top", "right", "bottom", "left"];
const defaultFilters = { name: "", stars: "", type: "", top: 0, right: 0, bottom: 0, left: 0 };

export default function CardFilters({ cards, setCards }) {
  const [filters, setFilters] = useState({...defaultFilters});

  // Update the filters when a form element changes
  function setFilter(field, value) {
    let newFilters = {...filters};
    newFilters[field] = value;
    setFilters(newFilters);
  }

  // Reset to the default filters
  function reset() {
    setFilters({...defaultFilters});
  }

  // Re-filter cards any time the cards or filters change
  useEffect(() => {
    function filterCards() {
      let filteredCards = [...cards];

      if (filters.stars) {
        filteredCards = filteredCards.filter((card) => card.stars == filters.stars);
      }

      if (filters.type) {
        filteredCards = filteredCards.filter((card) => card.type.name == filters.type);
      }

      if (filters.name) {
        filteredCards = filteredCards.filter((card) => card.name.toLowerCase().includes(filters.name.toLowerCase()));
      }

      for (const direction of directions) {
        if (filters[direction]) {
          filteredCards = filteredCards.filter((card) => card.stats.numeric[direction] >= parseInt(filters[direction]));
        }
      }

      setCards(filteredCards);
    }

    filterCards();
  }, [cards, filters, setCards]);

  return (
    <form>
      <div className="d-flex flex-inline flex-wrap mb-3">
        <div>
          <input type="text" className="form-control" placeholder="Name" value={filters.name} onChange={e => setFilter("name", e.target.value)} />
        </div>
        <select className="form-select" value={filters.stars} onChange={e => setFilter("stars", e.target.value)}>
          <option value="">All Stars</option>
          {stars.map((value) => {
            return <option key={value} value={value}>{value} Stars</option>;
          })}
        </select>
        <select className="form-select" value={filters.type} onChange={e => setFilter("type", e.target.value)}>
          <option value="">All Types</option>
          {types.map((value) => {
            return <option key={value} value={value}>{value}</option>;
          })}
        </select>
        <button type="button" className="btn btn-secondary" onClick={() => reset()}>Reset</button>
      </div>
      <div className="d-flex flex-inline flex-wrap ms-2">
        {directions.map((direction) => {
          return <StatFilter key={direction} direction={direction} value={filters[direction]} setFilter={setFilter} />;
        })}
      </div>
  </form>
  );
}