import { clsx } from "../../utils";
import styles from "./history.module.css";
import { Icon, WeatherCardPreview } from "..";
import { useHistory } from "../../hooks";

export const History = ({
  onItemClick,
}) => {
  const { history = [], clearHistory } = useHistory();

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Недавно смотрели</h3>
        <button
          className={clsx("btn", styles.clearBtn)}
          type="button"
          onClick={clearHistory}
          disabled={!history.length}
          aria-label="Очистить историю"
        >
          <Icon className={styles.icon} name="delete" />
        </button>
      </div>
      {history.length > 0 && (
        <ul className={clsx("list", styles.queriesList)}>
          {history.map((city) => (
            <li className={styles.item} key={`history-${city.name}`}>
              <WeatherCardPreview city={city} onItemClick={onItemClick} />
            </li>
          ))}
        </ul>
      )}
      {!history.length && (
        <p className={styles.emptyMessage}>История поиска пустая.</p>
      )}
    </>
  );
};
