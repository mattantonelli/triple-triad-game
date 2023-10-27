import Image from "next/image";
import styles from "./styles.module.scss";

// This function eager loads all of the game's images in a hidden div
// so they can be displayed quickly when rendered by the game.
export default function MessagePreload() {
  return (
    <div className={styles.preLoad}>
      {["chaos", "fallen_ace", "order", "plus", "reverse", "same", "combo"].map((rule) => {
        return <Image key={rule} src={`/images/messages/rules/${rule}.png`} width="600" height="90"
          alt="Image preloaded for later use" aria-hidden="true" />;
      })}
    </div>
  );
}