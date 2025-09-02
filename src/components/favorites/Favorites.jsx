import { clsx } from "utils";
import styles from "./favorites.module.css";
import { WeatherCardPreview } from "..";
import { useFavorites } from "../../hooks";

export const Favorites = ({ onItemClick }) => {
  const { favorites } = useFavorites();
  const favoritesLength = favorites.length;

  return (
    <>
      {favorites.length > 0 && (
        <>
          <div className={styles.header}>
            <h3 className={styles.title}>Избранные</h3>
            <span className={styles.counter}>{favoritesLength}/5</span>
          </div>
          <ul className={clsx("list", styles.queriesList)}>
            {favorites.map((city) => (
              <li className={styles.item} key={`favorites-${city.name}`}>
                <WeatherCardPreview
                  city={city}
                  onItemClick={onItemClick}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
