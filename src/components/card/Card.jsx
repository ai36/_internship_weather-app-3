import { useLayoutEffect, useState } from "react";
import { clsx, getWeatherWindDirection } from "../../utils";
import styles from "./card.module.css";
import { Icon, ProgressBar } from "..";

export const Card = ({
  title,
  img,
  value,
  pbValue,
  units,
  min,
  max,
  gradientPb,
  description,
}) => {
  const [progressValue, setProgressValue] = useState("50%");

  let windRotation = 0;
  if (title === "Сила ветра")
    windRotation = getWeatherWindDirection(description);

  useLayoutEffect(() => {
    if (pbValue) {
      setProgressValue(pbValue);
    }
  }, [pbValue]);

  return (
    <li className={styles.item}>
      <article className={clsx("card", styles.card)}>
        <h2 className={clsx("title", styles.title)}>{title}</h2>
        <Icon
          className={styles.img}
          name={img.split("/")[3].split(".")[0]}
          style={{ transform: `rotate(${windRotation}deg)` }}
        />
        <span className={styles.value}>
          {value}
          {units ? " " + units : ""}
        </span>
        <div className={styles.bottom}>
          {pbValue && <ProgressBar current={progressValue} type={gradientPb} />}
          <div
            className={clsx(
              styles.info,
              typeof min === "number" &&
                typeof max === "number" &&
                styles.interval
            )}
          >
            {typeof min === "number" && typeof max === "number" ? (
              <>
                <span>0%</span>
                <span>100%</span>
              </>
            ) : (
              description
            )}
          </div>
        </div>
      </article>
    </li>
  );
};
