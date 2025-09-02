import { useId } from "react";
import { clsx } from "../../utils";
import styles from "./favoriteControl.module.css";
import { Icon } from "..";
import { useFavorites } from "../../hooks";
import { FAVORITES_MAX } from "../../constants";

export const FavoriteControl = ({ city }) => {
  const { favorites = [], addFavorite, removeFavorite } = useFavorites();

  const isChecked = favorites.some((f) => f.name === city.name);
  const favoritesLength = favorites.length;

  const toggleFavorite = (e) => {
    e?.stopPropagation();
    if (isChecked) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  const id = useId();

  return (
    <>
      <label
        className={clsx(
          styles.favorite,
          favoritesLength >= FAVORITES_MAX && !isChecked ? styles.disabled : ""
        )}
        htmlFor={id}
      >
        <Icon
          className={styles.icon}
          name={isChecked ? "heart" : "heart-feel"}
        />
      </label>
      <input
        id={id}
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        disabled={favoritesLength >= FAVORITES_MAX && !isChecked}
        onChange={toggleFavorite}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFavorite();
          }
        }}
      />
    </>
  );
};
