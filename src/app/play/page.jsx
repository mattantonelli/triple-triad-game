import { Fragment } from "react";
import Game from "./game";
import { getCardsById, getNpcDecks } from "@/lib/data";

export const metadata = {
  title: "Triple Triad Online - Play",
  openGraph: {
    title: "Triple Triad Online - Play"
  }
};

export default async function Play() {
  const decks = await getNpcDecks();
  const cards = await getCardsById();

  return (
    <>
      {["red", "blue"].map((color) => {
        return (
          <Fragment key={color}>
            <link rel="preload" as="image" href={`https://triad.raelys.com/images/cards/large_${color}.png`} />
            <link rel="preload" as="image" href={`/images/messages/turns/${color}_turn.png`} />
          </Fragment>
        );
      })}

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
    </>
  );
}