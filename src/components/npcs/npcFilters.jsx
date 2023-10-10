"use client";

import { useState } from "react";

export default function NPCFilters({ npcs, setNpcs, rules }) {
  const [filters, setFilters] = useState({});

  function setFilter(field, value) {
    let newFilters = filters;
    newFilters[field] = value;
    setFilters(newFilters);
    filterNpcs();
  }

  function filterNpcs() {
    let filteredNpcs = [...npcs];

    if (filters.rule) {
      filteredNpcs = filteredNpcs.filter((npc) => npc.rules.includes(filters.rule));
    }

    if (filters.name) {
      filteredNpcs = filteredNpcs.filter((npc) => npc.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    setNpcs(filteredNpcs);
  }

  return (
    <form>
      <div className="d-flex flex-inline">
        <div>
          <input type="text" className="form-control" placeholder="Name" onChange={e => setFilter('name', e.target.value)} />
        </div>
        <select className="form-select" onChange={e => setFilter('rule', e.target.value)}>
          <option value="">All Rules</option>
          {rules.map((value) => {
            return <option key={value} value={value}>{value}</option>;
          })}
        </select>
      </div>
    </form>
  );
}