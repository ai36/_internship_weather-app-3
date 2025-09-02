import { clsx, getBackground } from "../../utils";
import styles from "./weatherCard.module.css";
import { FavoriteControl } from "..";
import { useTheme, useClockUpdate } from "../../hooks";

export const WeatherCard = ({
  city,
  onItemClick,
  preview,
  favoriteControl = true,
}) => {
  const { theme } = useTheme();
  const { text: timeText } = useClockUpdate(preview?.timezone);

  const styleBackground = preview?.icon
    ? {
        "--background-image-item": `image-set(
      url("/${theme}-${getBackground(preview.icon)}.avif") type("image/avif"),
      url("/${theme}-${getBackground(preview.icon)}.webp") type("image/webp"),
      url("/${theme}-${getBackground(preview.icon)}.jpg") type("image/jpeg")
    )`,
      }
    : undefined;

  return (
    <div className={styles.queryItem}>
      <button
        className={clsx(
          "btn",
          styles.queryBtn,
          !favoriteControl ? styles.noFavoriteControl : ""
        )}
        type="button"
        onClick={() => onItemClick(city)}
        style={styleBackground}
      >
        <div className={styles.row}>
          <h3 className={styles.city}>{preview?.name}</h3>
          <span className={styles.temperature}>{preview?.temperature}°</span>
        </div>
        <div className={styles.row}>
          <time className={styles.time} dateTime={timeText}>
            {timeText}
          </time>
          <span className={styles.feel}>{preview?.feel}</span>
        </div>
      </button>
      {favoriteControl && <FavoriteControl city={city} />}
    </div>
  );
};
