import NPCList from "@/components/npcs/npcList";
import { getNpcs } from "@/lib/data";

export default async function NPCs() {
  const npcs = await getNpcs();

  return <NPCList npcs={npcs} />;
}