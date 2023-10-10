"use client";

import NPC from "./npc";
import { useEffect, useState } from "react";
import NPCFilters from "./npcFilters";

const DATA_URL = "https://triad.raelys.com/api/npcs?deck=1";

export default function NPCList() {
  const [allNpcs, setAllNpcs] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetch(DATA_URL, { next: { revalidate: 86400 }})
      .then((res) => res.json())
      .then((data) => {
        setAllNpcs(data.results);
        setNpcs(data.results);

        // Create a set of unique rules available across all NPCs
        let rules = new Set();
        data.results.forEach((npc) => npc.rules.forEach((rule) => rules.add(rule)));
        setRules([...rules].sort());
      });
  }, []);

  return (
    <>
      <div className="row mb-3">
        <div className="col-10 offset-1">
          <div className="mx-2">
            <NPCFilters npcs={allNpcs} setNpcs={setNpcs} rules={rules} />
          </div>
        </div>
      </div>
      <div className="row row-cols-2 g-4 col-10 offset-1">
        {npcs.map((npc) => <NPC key={npc.id} npc={npc} />)}
      </div>
    </>
  );
}