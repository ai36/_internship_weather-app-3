import { clsx } from "../../utils";
import styles from "./searchResult.module.css";
import { WeatherCardPreview } from "..";
import { useWeather } from "../../hooks";

export const SearchResult = ({ onItemClick }) => {
  const { cityInfo } = useWeather();

  return cityInfo ? (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Результат поиска</h3>
      </div>
      <ul className={clsx("list", styles.queriesList)}>
        <li className={styles.item} key={`cityInfo-${cityInfo.name}`}>
          <WeatherCardPreview city={cityInfo} onItemClick={onItemClick} />
        </li>
      </ul>
    </>
  ) : (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Упс! Город не найден</h3>
      </div>
      <p className={styles.emptyMessage}>Попробуйте другое название.</p>
    </>
  );
};
