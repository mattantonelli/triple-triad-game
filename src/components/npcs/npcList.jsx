"use client";

import NPC from "./npc";
import { useEffect, useState } from "react";
import NPCFilters from "./npcFilters";

export default function NPCList({ npcs: allNpcs }) {
  const [npcs, setNpcs] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    // Create a set of unique rules available across all NPCs
    let rules = new Set();
    allNpcs.forEach((npc) => npc.rules.forEach((rule) => rules.add(rule)));
    setRules([...rules].sort());
  }, [allNpcs]);

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