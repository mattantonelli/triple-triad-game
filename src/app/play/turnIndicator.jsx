import Image from "next/image";
import styles from "./styles.module.scss";

export default function TurnIndicator({ currentPlayer }) {
  return (
    <Image src={`/images/move_${currentPlayer}.png`} alt={`${currentPlayer}'s turn`} width="52" height="53"
      className={styles[`${currentPlayer}Turn`]} />
  );
}