import ReactDOM from "react-dom";
import Game from "./game";
import { getCardsById, getNpcDecks } from "@/lib/data";

export const metadata = {
  title: "Play"
};

export default async function Play() {
  // Preload large card images from ATTT before decks are selected
  ReactDOM.preload("https://triad.raelys.com/images/cards/large_blue.png", { as: "image" });
  ReactDOM.preload("https://triad.raelys.com/images/cards/large_red.png",  { as: "image" });

  // Fetch the decks and cards from the ATTT API
  const decks = await getNpcDecks();
  const cards = await getCardsById();

  return (
    <div className="d-flex flex-column">
      <Game cards={cards} decks={decks} environment={process.env.NODE_ENV} />
      <div className="card mx-auto mt-3">
        <h5 className="card-header">How to play</h5>
        <div className="card-body pb-0">
          <ul>
            <li>Select a deck for each player.</li>
            <li>
              Optionally, select a rule. The rules are explained&nbsp;
              <a href="https://na.finalfantasyxiv.com/lodestone/playguide/contentsguide/goldsaucer/tripletriad#anchor_004" target="_blank">here</a>.
            </li>
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