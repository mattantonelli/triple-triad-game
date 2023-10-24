import Image from "next/image";
import styles from "./styles.module.scss";

export default function Message({ type, message, resetGame }) {
  if (message) {
    const path = `/images/messages/${type}/${message}.png`;

    // If a victory message is displayed, clicking the board resets the game.
    return (
      <div className={styles.message}
        style={{
          pointerEvents: type === "victory" ? "all" : "none",
          cursor: type === "victory" ? "pointer" : "default"
        }}
        onClick={() => type === "victory" && resetGame()}>
        <Image src={path} alt={message} width="600" height="90" />
      </div>
    );
  }
}