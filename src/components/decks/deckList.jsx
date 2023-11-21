import Deck from "@/components/decks/deck";

export default function DeckList({ decks, cards }) {
  return (
    <div className="row row-cols-2 g-4 col-12 col-xl-8 offset-xl-2">
      {decks.map((deck) => {
        const deckCards = deck.cards.map((card) => cards[card.cardId]);
        return <Deck key={deck.id} name={deck.name} cards={deckCards} />;
      })}
    </div>
  );
}