import ReactDOM from "react-dom";
import NPCList from "@/components/npcs/npcList";
import { getNpcs } from "@/lib/data";

export const metadata = {
  title: "NPCs"
};

export default async function NPCs() {
  ReactDOM.preload("https://triad.raelys.com/images/cards/large.png", { as: "image" });

  const npcs = await getNpcs();

  return (
    <NPCList npcs={npcs} />
  );
}