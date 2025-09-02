import { clsx } from "utils";
import styles from "./cityList.module.css";
import { useWeather } from "../../hooks";

export const CityList = ({ onItemClickInCityList }) => {
  const { inputValue, cityList } = useWeather();

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>Города по запросу</h3>
      </div>
      {cityList.length > 0 && (
        <ul className={clsx("list", styles.queriesList)}>
          {cityList.map((city, index) => (
            <li className={styles.queryItem} key={cityList[index].place_id}>
              <button
                className={clsx("btn", styles.queryBtn)}
                type="button"
                onClick={() => onItemClickInCityList(city)}
              >
                <p className={styles.city}>
                  {city?.name.toLowerCase().indexOf(inputValue.toLowerCase()) === 0 ? (
                    <>
                      <span>{inputValue}</span>
                      {city?.name.slice(inputValue.length)}
                    </>
                  ) : (
                    city?.name
                  )}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
