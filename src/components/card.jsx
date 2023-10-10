/* eslint-disable @next/next/no-img-element */
import styles from './card.module.scss';

export default function Card({ card }) {
  const stats = Object.values(card.stats.formatted).join(' ');

  return (
    <div className="m-1">
      <img src="/images/blank.png" alt={`${card.name} (${card.stats})`} title={card.name}
        className={styles.card} style={{backgroundPosition: `-${(card.id - 1) * 104}px 0`}} />
    </div>
  )
}