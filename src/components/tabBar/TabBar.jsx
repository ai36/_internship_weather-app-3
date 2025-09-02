import styles from "./tabBar.module.css";
import { Tab } from "..";
import { TABS_LIST } from "../../constants";

export const TabBar = ({ ...props }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {Object.keys(TABS_LIST).map((item) => (
          <li key={item}>
            <Tab id={item} {...props} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
