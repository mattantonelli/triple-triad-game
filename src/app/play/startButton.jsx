import { useRef } from "react";
import styles from "./styles.module.scss";

export default function StartButton({ isVisible, setCurrentPlayer, setCanPlay, setTurn, showMessage }) {
  const isPressed = useRef(false);

  // Chooses a random player and starts the game
  async function startGame() {
    // Hide the button on press
    isPressed.current = true;

    // The turn must be set before the current player to avoid weirdness in the turn state
    // when the AI goes first.
    setTurn(1);

    // Randomly determine the first player
    const firstPlayer = Math.random() < 0.5 ? "blue" : "red";
    setCurrentPlayer(firstPlayer);

    // and display a message indicating their turn
    await showMessage("turns", `${firstPlayer}_turn`);

    // Start play
    setCanPlay(true);

    // Reset button visibility for the next game
    isPressed.current = false;
  }

  if (isVisible && !isPressed.current) {
    return (
      <div className={`d-flex justify-content-center align-items-center ${styles.startButton}`}>
        <button type="button" className="btn btn-gray" onClick={() => startGame()}>Start Game</button>
      </div>
    );
  }
}