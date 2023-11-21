import ReactDOM from "react-dom";
import prisma from "@/lib/prisma";
import DeckList from "@/components/decks/deckList";
import { getCardsById } from "@/lib/data";


export default async function Page() {
  ReactDOM.preload("https://triad.raelys.com/images/cards/large.png", { as: "image" });

  const decks = await prisma.deck.findMany({ include: { cards: true } });
  const cards = await getCardsById();

  return (
    <DeckList decks={decks} cards={cards} />
  );
}