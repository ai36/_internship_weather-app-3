import { clsx } from "../../utils";
import styles from "./location.module.css";
import { Button, WeatherCardPreview } from "..";
import { useWeather, useLocation } from "../../hooks";
import { APP_RELOAD } from "constants";

export const Location = ({ onItemClick }) => {
  const { cityInfo } = useWeather();
  const { setHomeTown, setIsGeoLocation } = useLocation();

  return cityInfo ? (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Вы находитесь в этом городе?</h3>
      </div>
      <ul className={clsx("list", styles.queriesList)}>
        <li className={styles.item} key={`cityInfo-${cityInfo.name}`}>
          <WeatherCardPreview
            city={cityInfo}
            onItemClick={onItemClick}
            favoriteControl={false}
          />
        </li>
      </ul>
      <div className={styles.buttonBox}>
        <Button variant="secondary" handleClick={APP_RELOAD}>
          Нет
        </Button>
        <Button
          handleClick={() => {
            setHomeTown({
              name: cityInfo.name,
              lat: cityInfo.lat,
              lon: cityInfo.lon,
            });
            onItemClick(cityInfo);
            setIsGeoLocation(false);
          }}
        >
          Да
        </Button>
      </div>
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
