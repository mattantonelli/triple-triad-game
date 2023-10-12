import { useState } from "react";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";
import { useDrop } from "react-dnd";

export default function PlaySquare() {
  const [card, setCard] = useState();
  const [color, setColor] = useState();

  function placeCard(card, color) {
    setCard(card);
    setColor(color);
  }

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "card",
    drop: (item) => placeCard(item.card, item.color),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className={styles.playSquare} ref={dropRef}
      style={{backgroundColor: isOver ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)"}}>
      {card && <PlayCard card={card} color={color} draggable={false} />}
    </div>
  );
}