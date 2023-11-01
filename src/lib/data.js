const CARD_DATA_URL = "https://triad.raelys.com/api/cards";
const DECK_DATA_URL = "https://triad.raelys.com/api/npcs?deck=1";

// Returns a list of cards from the ATTT API
export async function getCards() {
  const res =  await fetch(CARD_DATA_URL, { next: { revalidate: 86400 }});
  const data = await res.json();

  // Sort the cards by their in-game order and return the required fields
  return data.results
    .sort((a, b) => (a.order_group - b.order_group) || (a.order - b.order))
    .map((card) => {
      return {
        id: card.id,
        name: card.name,
        stats: card.stats,
        stars: card.stars,
        type: card.type
      };
    });
}

// Returns a dictionary of cards organized by ID for easy lookups
export async function getCardsById() {
  const cards = await getCards();
  let cardsById = {};

  for(const card of cards) {
    cardsById[card.id] = card;
  }

  return cardsById;
}

// Returns a list of NPCs from the ATTT API
export async function getNpcs() {
  const res = await fetch(DECK_DATA_URL, { next: { revalidate: 86400 }});
  let data = await res.json();

  // Sort the NPCs alphabetically by name
  return data.results.sort((a, b) => a.name < b.name ? -1 : 0);
}

// Returns a list of NPC decks
export async function getNpcDecks() {
  const npcs = await getNpcs();

  // Create a list of selectable decks by NPC
  return npcs.map((npc) => {
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