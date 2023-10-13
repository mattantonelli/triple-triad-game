import { useState } from "react";
import { useDrop } from "react-dnd";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Square({ playCard }) {
  const [card, setCard] = useState();
  const [color, setColor] = useState();

  function placeCard(card, color) {
    setCard(card);
    setColor(color);
    playCard(card, color);
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
      style={{backgroundColor: isOver ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}}>
      {card && <PlayCard card={card} color={color} isDraggable={false} isVisible={true} />}
    </div>
  );
}