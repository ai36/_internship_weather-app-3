import { clsx } from "utils";
import styles from "./loader.module.css";
import { WeatherCardSkeleton } from "components";

export const Loader = () => {
  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Ищем...</h3>
      </div>
      <ul className={clsx("list", styles.queriesList)}>
        <WeatherCardSkeleton />
      </ul>
    </>
  );
};
