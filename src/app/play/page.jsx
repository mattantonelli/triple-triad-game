import Game from "./game";

const CARD_DATA_URL = "https://triad.raelys.com/api/cards";
const DECK_DATA_URL = "https://triad.raelys.com/api/npcs?deck=1";

async function getCards() {
  const res =  await fetch(CARD_DATA_URL, { next: { revalidate: 86400 }});
  const data = await res.json();

  let cardsById = {};

  for(const card of data.results) {
    cardsById[card.id] = card;
  }

  return cardsById;
}

async function getDecks() {
  const res = await fetch(DECK_DATA_URL, { next: { revalidate: 86400 }});
  let data = await res.json();

  // Sort the NPCs alphabetically by name
  data = data.results.sort((a, b) => a.name < b.name ? -1 : 0);

  // Create a list of selectable decks by NPC
  return data.map((npc) => {
    // Initialize the deck with the list of fixed cards
    let deck = npc.fixed_cards;

    // Add random variable cards to the deck until it is full
    while (deck.length < 5) {
      deck = [
        ...deck,
        ...npc.variable_cards.splice(Math.floor(Math.random * npc.variable_cards.length), 1)
      ];
    }

    // Condense the decks into a list of card IDs so we can easily pass them around
    return { name: npc.name, cards: deck.map((card) => card.id).join(",") };
  });
}

export default async function Play() {
  const cards = await getCards();
  const decks = await getDecks();

  return (
    <Game cards={cards} decks={decks} />
  );
}