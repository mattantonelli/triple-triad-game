/* eslint-disable @next/next/no-img-element */
import styles from "./card.module.scss";

export default function Card({ card, color }) {
  const stats = Object.values(card.stats.formatted).join(" ");

  // If a color is provided, add the colored card class. Otherwise, render without color.
  let className;
  switch (color) {
    case "blue":
      className = `${styles.card} ${styles.blueCard}`;
      break;
    case "red":
      className = `${styles.card} ${styles.redCard}`;
      break;
    default:
      className = styles.card;
  }

  return (
    <img src="/images/blank.png" alt={`${card.name} (${stats})`} title={card.name}
      className={className} style={{backgroundPosition: `-${(card.id - 1) * 104}px 0`}} />
  );
}