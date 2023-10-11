"use client";

import { useEffect, useState } from "react";

const defaultFilters = { name: "", rule: "" };

export default function NPCFilters({ npcs, setNpcs, rules }) {
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

  // Re-filter NPCs any time the cards or filters change
  useEffect(() => {
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

    filterNpcs();
  }, [filters, npcs, setNpcs]);

  return (
    <form>
      <div className="d-flex flex-inline">
        <div>
          <input type="text" className="form-control" placeholder="Name" value={filters.name} onChange={e => setFilter("name", e.target.value)} />
        </div>
        <select className="form-select" value={filters.rule} onChange={e => setFilter("rule", e.target.value)}>
          <option value="">All Rules</option>
          {rules.map((value) => {
            return <option key={value} value={value}>{value}</option>;
          })}
        </select>
        <button type="button" className="btn btn-secondary" onClick={() => reset()}>Reset</button>
      </div>
    </form>
  );
}