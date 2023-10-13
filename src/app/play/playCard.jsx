import { useDrag } from "react-dnd";
import Card from "@/components/cards/card";
import styles from "./styles.module.scss";

export default function PlayCard({ card, color, isDraggable, isVisible }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { card: card, color: color },
    canDrag: isDraggable,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return (
    <div className={styles.playCard} ref={dragRef}
      style={{opacity: isDragging ? 0.5 : (isVisible ? 1 : 0), cursor: isDraggable ? "pointer" : "default"}}>
      <Card card={card} color={color} />
    </div>
  );
}