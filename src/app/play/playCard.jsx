import { useDrag } from "react-dnd";
import Card from "@/components/cards/card";
import styles from "./styles.module.scss";

export default function PlayCard({ card, color, isDraggable, isVisible, isPlayed = false, isPlayable = true  }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { card: card, color: color },
    canDrag: isDraggable,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }), [isDraggable]);

  return (
    <div className={`${styles.playCard} ${(isDraggable ? styles.canDrag : "")}`} ref={dragRef} style={{
      cursor: isDraggable ? "pointer" : "default",
      filter: isPlayable || isPlayed ? "brightness(1.0)" : "brightness(0.7)",
      opacity: isDragging ? 0.5 : (isVisible ? 1 : 0)
    }}>
      <Card card={card} color={color} tooltip={false} />
    </div>
  );
}