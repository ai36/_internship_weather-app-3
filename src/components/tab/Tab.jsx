import { clsx } from "utils";
import styles from "./tab.module.css";
import { TABS_LIST } from "../../constants";

export const Tab = ({ id, activeTab, onTabChange }) => {
  return (
    <button
      className={clsx(styles.switchBtn, activeTab === id && styles.active)}
      type="button"
      onClick={() => onTabChange(id)}
    >
      {TABS_LIST[id]}
    </button>
  );
};
