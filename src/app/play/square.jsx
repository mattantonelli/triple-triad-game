import { useState } from "react";
import { useDrop } from "react-dnd";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Square({ playCard }) {
  const [card, setCard] = useState(null);
  const [color, setColor] = useState();

  function placeCard(placedCard, color) {
    setCard(placedCard);
    setColor(color);
    playCard(placedCard, color);
  }

  function isEmpty() {
    return card === null;
  }

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "card",
    drop: (item) => placeCard(item.card, item.color),
    canDrop: () => isEmpty(),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
  }), [card]);

  return (
    <div className={styles.playSquare} ref={dropRef}
      style={{backgroundColor: isOver && card === null ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}}>
      {card && <PlayCard card={card} color={color} isDraggable={false} isVisible={true} />}
    </div>
  );
}