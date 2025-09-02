import styles from "./logo.module.css";
import { Icon } from "components";

export const Logo = () => {
  return (
    <a href="/" className={styles.logoBox} onClick={e => e.preventDefault()}>
      <Icon className={styles.logo} name="logo" />
      <Icon className={styles.logoMobile} name="logo-mobile" />
    </a>
  );
}
