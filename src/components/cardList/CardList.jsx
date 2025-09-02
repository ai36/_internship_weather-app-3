import { clsx } from "../../utils";
import styles from "./cardList.module.css";
import { Card, CardSkeleton } from "..";
import { useWeather } from "../../hooks";

export const CardList = () => {
  const { isLoading, data } = useWeather();

  const details = data?.details;

  return (Array.isArray(details) && !isLoading) ? (
    <ul className={clsx("list", styles.list)}>
      {details.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          img={item.img}
          value={item.value}
          pbValue={item.pbValue}
          units={item.units}
          min={item.min}
          max={item.max}
          gradientPb={item.gradientPb}
          description={item.description}
        />
      ))}
    </ul>
  ) : (
    <ul className={clsx("list", styles.list)}>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </ul>
  );
};
