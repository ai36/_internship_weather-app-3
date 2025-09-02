import styles from "./header.module.css";
import { Logo, WeatherSearch } from "..";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <WeatherSearch className={styles.weatherSearch} />
    </header>
  );
};
