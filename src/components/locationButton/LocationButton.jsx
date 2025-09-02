import styles from "./locationButton.module.css";
import { Button, Icon } from "..";
import { useLocation } from "../../hooks";

export const LocationButton = () => {
  const { fetchGeo } = useLocation();

  return (
    <Button
      className={styles.geoBtn}
      type="button"
      handleClick={fetchGeo}
    >
      <Icon className={styles.geoIcon} name="location" />
    </Button>
  );
};
