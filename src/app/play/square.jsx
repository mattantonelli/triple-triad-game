import { useDrop } from "react-dnd";
import PlayCard from "./playCard";
import styles from "./styles.module.scss";

export default function Square({ index, card, color, flipped, playCard }) {
  function placeCard(placedCard, color) {
    playCard(placedCard, color, index);
  }

  function isEmpty() {
    return !card;
  }

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "card",
    drop: (item) => placeCard(item.card, item.color),
    canDrop: () => isEmpty(),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
  }), [index, card, color, playCard]);

  return (
    <div className={`${styles.playSquare} ${flipped ? styles[`${color}Flip`] : ""}`} ref={dropRef}
      style={{backgroundColor: isOver && isEmpty() ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}}>
      {card && <PlayCard card={card} color={color} isDraggable={false} isPlayed={true} isVisible={true} />}
    </div>
  );
}