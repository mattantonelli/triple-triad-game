import Game from "./game";
import { getCardsById, getNpcDecks } from "@/lib/data";

export default async function Play() {
  const decks = await getNpcDecks();
  const cards = await getCardsById();

  return (
    <Game cards={cards} decks={decks} />
  );
}