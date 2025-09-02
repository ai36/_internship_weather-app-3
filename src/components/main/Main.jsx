import styles from "./main.module.css";
import { CardList, CityCard, Slider, TryAgain } from "..";
import { useWeather } from "../../hooks";
import { APP_RELOAD } from "../../constants";

export const Main = () => {
  const { isError } = useWeather();

  return (
    <main className={styles.main}>
      <h1 className="visually-hidden">WeatherApp - интерактивное погодное приложение</h1>
      {isError ? (
        <TryAgain variant="main" onClick={APP_RELOAD} />
      ) : (
        <>
          <CityCard />
          <CardList />
        </>
      )}
    <Slider />
    </main>
  );
};
