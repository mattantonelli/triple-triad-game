import NPCList from "@/components/npcs/npcList";
import { getNpcs } from "@/lib/data";

export const metadata = {
  title: "Triple Triad Online - NPCs",
  openGraph: {
    title: "Triple Triad Online - NPCs"
  }
};

export default async function NPCs() {
  const npcs = await getNpcs();

  return (
    <>
      <link rel="preload" as="image" href="https://triad.raelys.com/images/cards/large.png" / >

      <NPCList npcs={npcs} />;
    </>
  );
}