import { clsx } from "../../utils";
import styles from "./weatherCardSkeleton.module.css";

export const WeatherCardSkeleton = () => {
  return (
    <div className={styles.queryItem}>
      <button className={clsx("btn", styles.queryBtn)} type="button" disabled>
        <div className={styles.city}></div>
        <div className={styles.temperature}></div>
        <div className={styles.time}></div>
        <div className={styles.feel}></div>
      </button>
    </div>
  );
};
