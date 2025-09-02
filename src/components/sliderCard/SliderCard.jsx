import { forwardRef } from "react";
import { clsx } from "../../utils";
import styles from "./sliderCard.module.css";
import { Icon } from "..";
import { useWeather } from "../../hooks";

export const SliderCard = forwardRef(({ data, active }, slideRef) => {
  const { isLoading } = useWeather();

  return (
    <li
      className={clsx(styles.sliderItem, isLoading && styles.skeleton)}
      ref={active ? slideRef : null}
    >
      <article className={`${styles.card} ${styles.sliderCard}`}>
        <h3 className={`${styles.title} ${styles.cardTitle}`}>
          {data?.date || data?.time || ""}
        </h3>

        {data?.img ? (
          <Icon className={styles.cardImg} name={data?.img}/>
        ) : (
          <span className={styles.cardImg}></span>
        )}
        <p className={styles.cardTemp}>{data?.temp || ""}</p>
      </article>
    </li>
  );
});