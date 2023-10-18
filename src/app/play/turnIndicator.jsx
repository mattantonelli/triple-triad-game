import Image from "next/image";
import styles from "./styles.module.scss";

export default function TurnIndicator({ currentPlayer }) {
  return (
    <>
      {["blue", "red"].map((color) => {
        return <Image key={color} src={`/images/move_${color}.png`} alt={`${color}'s turn`} width="52" height="53"
          className={`${styles.turnIndicator} ${styles[`${color}Turn`]} ${currentPlayer === color && styles.activeTurn}`} />;
      })}
    </>
  );
}