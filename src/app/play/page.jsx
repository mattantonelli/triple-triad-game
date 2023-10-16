import Game from "./game";
import { getCardsById, getNpcDecks } from "@/lib/data";

export default async function Play() {
  const decks = await getNpcDecks();
  const cards = await getCardsById();

  return (
    <div className="d-flex flex-column">
      <Game cards={cards} decks={decks} />
      <div className="card mx-auto mt-3">
        <h5 className="card-header">How to play</h5>
        <div className="card-body pb-0">
          <ul>
            <li>Select a deck for each player.</li>
            <li>Players take turns placing their cards on the board.</li>
            <li>Flip your opponent&apos;s cards by playing a higher value on an adjacent side.</li>
            <li>The player with the most flipped cards wins!</li>
            <li>Click anywhere on the board to start a new game.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}