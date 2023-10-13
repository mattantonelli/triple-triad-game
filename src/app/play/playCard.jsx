import { useDrag } from "react-dnd";
import Card from "@/components/cards/card";
import styles from "./styles.module.scss";

export default function PlayCard({ card, color, draggable = true }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { card: card, color: color },
    canDrag: draggable,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return (
    <div className={styles.playCard} ref={dragRef}
      style={{opacity: isDragging ? 0.5 : 1, cursor: draggable ? "pointer" : "default"}}>
      <Card card={card} color={color} />
    </div>
  );
}