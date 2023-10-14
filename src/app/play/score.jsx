import Image from "next/image";
import styles from "./styles.module.scss";

export default function Score({ scores }) {
  const score = [...Array(scores.blue).fill("blue"), ...Array(scores.red).fill("red")];

  return (
    <div className={`d-flex flex-wrap ${styles.score}`}>
      {score.map((color, i) => {
        return <Image key={i} src={`/images/score_${color}.png`} alt={`${color} point`} width="32" height="34" />;
      })}
    </div>
  );
}