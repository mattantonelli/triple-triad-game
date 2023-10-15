import Image from "next/image";
import styles from "./styles.module.scss";

export default function Message({ type, message }) {
  if (message) {
    const path = `/images/${type}/${message}.png`;

    return (
      <div className={styles.message}>
        <Image src={path} alt={message} width="600" height="90" />
      </div>
    );
  }
}