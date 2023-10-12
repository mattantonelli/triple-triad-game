import Image from "next/image";
import styles from "./styles.module.scss";

export default function PlayCard({ card, color, startDrag }) {
  const image = color == "red" ? card.image_red : card.image_blue;

  return (
    <Image src={image} alt={card.name} className={styles.card} width="104" height="128"
      onDragStart={(e) => startDrag(e)} draggable="true" />
  );
}