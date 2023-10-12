/* eslint-disable @next/next/no-img-element */
import styles from "./card.module.scss";

export default function Card({ card, color }) {
  const stats = Object.values(card.stats.formatted).join(" ");

  // If a color is provided, add the colored card class. Otherwise, render without color.
  let className;
  if (color) {
    className = `${styles.card} ${styles[`${color}Card`]}`;
  } else {
    className = styles.card;
  }

  return (
    <img src="/images/blank.png" alt={`${card.name} (${stats})`} title={card.name}
      className={className} style={{backgroundPosition: `-${(card.id - 1) * 104}px 0`}} />
  );
}