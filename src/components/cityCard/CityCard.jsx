import { clsx } from "../../utils";
import styles from "./cityCard.module.css";
import { CityCardSkeleton, Icon } from "..";
import { useWeather, useClockUpdate } from "../../hooks";

export const CityCard = () => {
  const { isLoading, isPanelOpen, data } = useWeather();
  const { text: timeText } = useClockUpdate(
    data?.current?.timezone,
    isPanelOpen
  );

  if (isLoading) return <CityCardSkeleton />;

  const { city, temperature, feelsLike, icon, date, description } =
    data?.current;

  return (
    <section className={styles.cityCardBox}>
      <header className={styles.header}>
        <h2 className={clsx("title section-title", styles.city)}>{city}</h2>
        <span className={styles.date}>{date}</span>
        <time className={styles.time} dateTime={timeText}>
          {timeText}
        </time>
      </header>
      <main className={styles.main}>
        <span className={styles.temperature}>{temperature}°</span>
      </main>
      <footer className={styles.footer}>
        <span className={styles.condition}>
          <Icon className={styles.icon} name={icon} />
          <span>{description}</span>
        </span>
        <span className={styles.feel}>Ощущается как {feelsLike}°</span>
      </footer>
    </section>
  );
};
